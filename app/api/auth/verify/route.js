import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: 'No session found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(session), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('JWT verification error:', error);
    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
