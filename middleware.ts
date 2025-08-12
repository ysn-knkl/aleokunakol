import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['de', 'en', 'tr', 'ro'] as const;
const defaultLocale = 'de';

function detectLocale(req: NextRequest): string {
  // 1) Kullanıcı seçim çerezi öncelikli
  const cookie = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && locales.includes(cookie as any)) return cookie;

  // 2) Tarayıcı Accept-Language eşleştir
  const al = req.headers.get('accept-language') || '';
  const raw = al.split(',').map(p => p.split(';')[0].trim().toLowerCase());
  for (const lang of raw) {
    if (locales.includes(lang as any)) return lang;
    const base = lang.split('-')[0];
    if (locales.includes(base as any)) return base;
  }

  // 3) Varsayılan
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Statik dosyalar, API, Next internalleri hariç
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Yolun başında locale var mı?
  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocalePrefix) return NextResponse.next();

  // Yoksa uygun locale'e yönlendir
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Middleware hangi yolları dinleyecek
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
