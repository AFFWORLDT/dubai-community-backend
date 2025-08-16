import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  const accessToken = cookies().get('accessToken');

  // If no target URL provided, redirect to home
  if (!targetUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is authenticated, redirect directly to target URL
  if (accessToken) {
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // If not authenticated, redirect to login with return URL
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('returnUrl', targetUrl);
  return NextResponse.redirect(loginUrl);
}
