import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./models/User";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userString = request.cookies.get("user")?.value;

  // Verifique se userString é uma string não vazia antes de fazer o parse
  const user: User | null = userString ? JSON.parse(userString) : null;

  const loginUrl = new URL("/login", request.url);
  const aldermanUrl = new URL("/alderman", request.url);
  const adminUrl = new URL("/admin", request.url);

  console.log(token);

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }

  switch (user?.tipo) {
    case "vereador": {
      if (request.nextUrl.pathname === "/admin") {
        return NextResponse.redirect(aldermanUrl);
      }

      if (request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(aldermanUrl);
      }
    }
    case "mesaria": {
      if (request.nextUrl.pathname === "/alderman") {
        return NextResponse.redirect(adminUrl);
      }

      if (request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(adminUrl);
      }
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/alderman/:path*", "/admin:path*"],
};
