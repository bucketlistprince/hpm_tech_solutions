import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prisma = new PrismaClient();

process.on('SIGTERM', () => {
  prisma.$disconnect();
});

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/', // Redirect to home for sign-in
    error: '/',  // Redirect to home for auth errors
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user) {
            throw new Error('Invalid credentials');
          }

          const isPasswordValid = await compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          console.error('Authentication error:', error.message);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role
        };
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  events: {
    async signIn({ user }) {
      console.log('Sign in event:', user);
    },
    async signOut({ session }) {
      console.log('Sign out event:', session);
    },
    async createUser({ user }) {
      console.log('Create user event:', user);
    },
    async updateUser({ user }) {
      console.log('Update user event:', user);
    },
    async linkAccount({ account, profile }) {
      console.log('Link account event:', account, profile);
    },
    async session({ session, token }) {
      console.log('Session event:', session, token);
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
