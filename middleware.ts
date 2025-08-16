import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privateRoutes = ['/listings', '/order', '/profile']

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken') 
  const path = request.nextUrl.pathname

  // Handle Gmail redirects - check if this is coming from Google's safe redirect
  const referer = request.headers.get('referer')
  const isGmailRedirect = referer?.includes('google.com/url') || 
                         referer?.includes('mail.google.com') ||
                         request.nextUrl.searchParams.get('utm_source') === 'gmail'

  // If this is a Gmail redirect to a private route and user has token, 
  // preserve the authentication state
  if (isGmailRedirect) {
    const isPrivateRoute = privateRoutes.some(route => 
      path === route || path.startsWith(`${route}/`)
    )
    
    if (isPrivateRoute && accessToken) {
      // Create a response that preserves the URL but ensures authentication
      const response = NextResponse.next()
      
      // Add a header to indicate this was a Gmail redirect
      response.headers.set('x-gmail-redirect', 'true')
      
      return response
    }
  }

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
      // For Gmail redirects, redirect to login with return URL
      if (isGmailRedirect) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(loginUrl)
      }
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
