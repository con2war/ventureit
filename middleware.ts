import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin-token')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  // Allow access to login page if not authenticated
  if (isLoginPage && !adminToken) {
    return NextResponse.next()
  }

  // Redirect to login if accessing admin routes without auth
  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Redirect to admin dashboard if accessing login page while authenticated
  if (isLoginPage && adminToken) {
    return NextResponse.redirect(new URL('/admin/blog/manage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ]
}