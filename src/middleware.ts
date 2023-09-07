import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;

  console.log(user);

  const loginUrl = new URL("/login", request.url);
  const aldermanUrl = new URL("/alderman", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }

  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(aldermanUrl);
  }
}

export const config = {
  matcher: ["/", "/login", "/alderman/:path*"],
};
