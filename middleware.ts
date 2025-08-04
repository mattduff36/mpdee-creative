import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// JWT secret key
const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key-for-development'
);

const COOKIE_NAME = 'auth-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page and API routes (except protected ones)
  if (pathname === '/accounts/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Check if the request is for a protected accounts route
  if (pathname.startsWith('/accounts')) {
    try {
      // Get the session token from cookies
      const token = request.cookies.get(COOKIE_NAME)?.value;

      if (!token) {
        // Redirect to login if no token
        const loginUrl = new URL('/accounts/login', request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Verify the JWT token
      const { payload } = await jwtVerify(token, JWT_SECRET);

      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        // Token expired, redirect to login
        const loginUrl = new URL('/accounts/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        // Clear the expired cookie
        response.cookies.delete(COOKIE_NAME);
        return response;
      }

      // Token is valid, allow the request to continue
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/accounts/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clear the invalid cookie
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 