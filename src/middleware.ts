import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === "development" &&
    request.nextUrl.hostname === "127.0.0.1"
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "localhost";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
