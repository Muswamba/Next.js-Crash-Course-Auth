import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   // Get the authentication token from cookies
   const token = request.cookies.get("authToken");

   // Skip middleware for static assets and API routes
   if (
      request.nextUrl.pathname.startsWith("/_next/") ||
      request.nextUrl.pathname.startsWith("/api")
   ) {
      return NextResponse.next();
   }

   // Redirect unauthenticated users
   if (!token) {
      const loginUrl = new URL("/auth", request.url);
      loginUrl.searchParams.set("action", "login");
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
   }

   return NextResponse.next(); // Allow access
}

export const config = {
   matcher: ["/dashboard/:path*", "/settings/:path*"], // Update matchers as needed
};
