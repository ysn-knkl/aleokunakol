// middleware.ts (always start in German + admin guard)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const LOCALES = ["de", "en", "tr", "ro"] as const;
const DEFAULT_LOCALE = "de";

function isStaticLike(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  );
}

function isAuthPath(pathname: string) {
  return pathname.endsWith("/login") || pathname.includes("/api/auth");
}

function isAdminPath(pathname: string) {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true;
  const [seg1, seg2] = pathname.split("/").filter(Boolean);
  return !!seg1 && LOCALES.includes(seg1 as any) && seg2 === "admin";
}

function getLocaleFromPath(pathname: string): string | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  return LOCALES.includes(seg as any) ? seg : null;
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1) Statik / API / auth yollarına dokunma
  if (isStaticLike(pathname) || isAuthPath(pathname)) {
    return NextResponse.next();
  }

  // 2) Admin guard
  if (isAdminPath(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const locale = getLocaleFromPath(pathname) || DEFAULT_LOCALE;

    if (!token?.email) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      const callback =
        pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      url.searchParams.set("callbackUrl", callback);
      return NextResponse.redirect(url);
    }

    if ((token as any).role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/403`;
      return NextResponse.redirect(url);
    }
  }

  // 3) Eğer path locale ile başlamıyorsa → Almanca'ya yönlendir
  if (!getLocaleFromPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};