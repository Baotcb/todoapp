import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PUBLIC_ROUTES = ["/login", "/login/mezon-callback"] as const;
const PROTECTED_ROUTES = ["/todos"] as const;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) || pathname === "/";
  const isExpired = token ? isTokenExpired(token) : true;
  const isValidAuth = !!token && !isExpired;

  if (isProtectedRoute && !isValidAuth) {
    const response = NextResponse.redirect(new URL(`/login?redirect=${pathname}${search}`, request.url));
    if (token && isExpired) {
      response.cookies.delete("access_token");
    }
    return response;
  }

  if (isPublicRoute && isValidAuth) {
    return NextResponse.redirect(new URL("/todos", request.url));
  }




  return NextResponse.next();
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload?.exp || typeof payload.exp !== "number") {
    return true;
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);


  return payload.exp < currentTimestamp - 10;
}



function parseJwt(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}





export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
