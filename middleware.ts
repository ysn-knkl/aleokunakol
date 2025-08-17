// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en', 'de', 'ro'] as const;
const defaultLocale = 'de';

function detectLocale(req: NextRequest): string {
  // 1) Cookie öncelikli
  const cookie = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && locales.includes(cookie as any)) return cookie as string;

  // 2) Accept-Language
  const al = req.headers.get('accept-language') || '';
  const raw = al.split(',').map(p => p.split(';')[0].trim().toLowerCase());
  for (const lang of raw) {
    if (locales.includes(lang as any)) return lang as string;
    const base = lang.split('-')[0];
    if (locales.includes(base as any)) return base as string;
  }

  // 3) Varsayılan
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Next internalleri, API ve statikler: dokunma
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')    // /fonts/... /images/... vb
  ) {
    return NextResponse.next();
  }

  // 2) Login ve auth yolları: dokunma
  if (pathname.endsWith('/login') || pathname.includes('/api/auth')) {
    return NextResponse.next();
  }

  // 3) Zaten locale prefix var mı?
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // 4) Locale yoksa URL'i rewrite et (redirect değil → döngü riski yok)
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const res = NextResponse.rewrite(url);
  // tercih edilen locale’i hatırla
  res.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return res;
}

// Middleware tüm yolları dinlesin ama zaten üstte filtreliyoruz.
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};