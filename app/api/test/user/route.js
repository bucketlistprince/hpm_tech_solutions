import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    const users = await prisma.user.findMany();
    return Response.json({ users });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
