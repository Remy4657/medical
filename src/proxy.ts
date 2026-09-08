import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  console.log("sessionCookie", sessionCookie);
  if (!sessionCookie) {
    const loginUrl = new URL("/", request.url);

    // loginUrl.searchParams.set(
    //   "callbackUrl",
    //   request.nextUrl.pathname + request.nextUrl.search,
    // );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ca-nhan/:path*"],
};
