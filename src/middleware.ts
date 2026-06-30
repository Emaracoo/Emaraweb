import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { proxy } from "@/lib/locale";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Admin routes are handled by the authorized callback in authConfig
  if (pathname.startsWith("/admin")) return NextResponse.next();

  // Locale redirect for public pages
  const redirect = proxy(req);
  if (redirect) return redirect;

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)", "/admin/:path*"],
};
