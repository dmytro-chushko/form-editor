import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import prisma from '@/src/lib/prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        if (!user.emailVerified) throw new Error('Email not verified');

        const isValid = await compare(credentials.password, user.passwordHash);

        if (!isValid) return null;

        return { id: user.id, email: user.email };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 7,
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },

  callbacks: {
    async session({ session, user }) {
      session.user = {
        id: user.id,
        email: session.user?.email || null,
      };

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }

      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
