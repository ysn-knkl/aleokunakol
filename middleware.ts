// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/** Desteklenen diller */
const locales = ["tr", "en", "de", "ro"] as const;
const defaultLocale = "de";

function detectLocale(req: NextRequest): string {
  // 1) Cookie öncelikli
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  // 2) Accept-Language
  const al = req.headers.get("accept-language") || "";
  const raw = al.split(",").map((p) => p.split(";")[0].trim().toLowerCase());
  for (const lang of raw) {
    if ((locales as readonly string[]).includes(lang)) return lang;
    const base = lang.split("-")[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }

  // 3) Varsayılan
  return defaultLocale;
}

function getLocaleFromPath(pathname: string): string | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && (locales as readonly string[]).includes(seg)) return seg;
  return null;
}

/** /admin veya /:locale/admin yakalama */
function isAdminPath(pathname: string): boolean {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true;
  const first = pathname.split("/").filter(Boolean)[0];
  const second = pathname.split("/").filter(Boolean)[1];
  return !!first && (locales as readonly string[]).includes(first) && second === "admin";
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) Next internalleri, API ve statikler: dokunma
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // /fonts, /images gibi
  ) {
    return NextResponse.next();
  }

  // 2) Auth yolları: dokunma
  if (pathname.endsWith("/login") || pathname.includes("/api/auth")) {
    return NextResponse.next();
  }

  // 3) Admin guard — locale rewrite'ten önce de devreye girmeli
  if (isAdminPath(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const currentLocale = getLocaleFromPath(pathname) || detectLocale(req);

    if (!token?.email) {
      // giriş yok → login'e yönlendir
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      url.searchParams.set("callbackUrl", pathname + (search || ""));
      return NextResponse.redirect(url);
    }

    // jwt callback'inde token.role set edildiğini varsayıyoruz
    if ((token as any).role !== "admin") {
      // 403 sayfan yoksa ana sayfaya "forbidden=1" ile gidebilirsin
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/403`;
      return NextResponse.redirect(url);
      // alternatif:
      // url.pathname = `/${currentLocale}`;
      // url.searchParams.set("forbidden", "1");
      // return NextResponse.redirect(url);
    }
  }

  // 4) Locale rewrite (senin mevcut davranışın)
  const hasLocale = !!getLocaleFromPath(pathname);
  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const res = NextResponse.rewrite(url);
  res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};