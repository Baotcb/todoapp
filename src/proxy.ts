import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./utils/JwtToken";


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
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);

    if (token && isExpired) {
      loginUrl.searchParams.set("reason", "session-expired");
    }

    const response = NextResponse.redirect(loginUrl);

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


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
