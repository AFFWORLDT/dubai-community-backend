import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privateRoutes = ['/listings', '/order', '/profile']

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken') 
  const path = request.nextUrl.pathname

  if (path === '/login' || path === '/signup') {
    if (accessToken) {
      return NextResponse.redirect(new URL('/properties', request.url))
    }
    return NextResponse.next() 
  }

  const isPrivateRoute = privateRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  )

  if (isPrivateRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url)) 
    }
    return NextResponse.next() 
  }

  return NextResponse.next() 
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', 
  ],
}
