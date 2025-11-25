import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import prisma from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }
        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        if (!user.emailVerified) throw new Error('Email not verified');

        if (user?.passwordHash) {
          const isValid = await compare(password, user.passwordHash);

          if (!isValid) return null;
        }

        return { id: user.id, email: user.email };
      },
    }),
    Google,
    GitHub,
  ],
  // debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 7,
  },
});

export const { GET, POST } = handlers;
