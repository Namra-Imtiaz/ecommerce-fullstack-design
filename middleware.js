import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request) {
  const secret = process.env.NEXTAUTH_SECRET || "your-secret-key"
  const token = await getToken({ req: request, secret })

  // Check if the route is for the admin area
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // If not logged in or not an admin, redirect to login
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

