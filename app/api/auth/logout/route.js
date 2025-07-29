import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Clear cookies
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('next-auth.csrf-token');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
