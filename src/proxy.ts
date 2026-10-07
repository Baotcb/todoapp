import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy này chạy trước mọi request
// Hiện tại để trống — có thể mở rộng sau (auth guard, locale, v.v.)
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Chỉ áp dụng cho các route sau (bỏ qua _next, static files)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
