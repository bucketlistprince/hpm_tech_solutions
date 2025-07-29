import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '../../../../lib/db';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
