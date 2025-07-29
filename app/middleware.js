import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Only protect API routes
  if (pathname.startsWith('/api/')) {
    const token = await getToken({ req });
    
    // If there's no token and it's an API route, return 401
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
  return NextResponse.next();
}

// Only run middleware on API routes
export const config = {
  matcher: ['/api/:path*'],
};
