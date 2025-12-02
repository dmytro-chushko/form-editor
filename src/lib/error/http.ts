import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import { ZodError } from 'zod';

import { auth } from '../auth';

import { AppError, UnauthorizedError } from './errors';

export type Handler<T = unknown> = (
  req: NextRequest
) => Promise<Response | NextResponse<T>>;

export function withErrors(handler: Handler): Handler {
  return async (req) => {
    try {
      return await handler(req);
    } catch (e: unknown) {
      // TODO: integrate logger later
      // Prisma ORM errors
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Map common Prisma error codes to HTTP statuses
        // https://www.prisma.io/docs/orm/reference/error-reference
        switch (e.code) {
          case 'P2002':
            // Unique constraint failed
            return NextResponse.json(
              { error: 'Conflict', code: 'P2002' },
              { status: 409 }
            );
          case 'P2003':
            // Foreign key constraint failed
            return NextResponse.json(
              { error: 'Invalid reference', code: 'P2003' },
              { status: 400 }
            );
          case 'P2025':
            // Record not found
            return NextResponse.json(
              { error: 'Not found', code: 'P2025' },
              { status: 404 }
            );
          case 'P2000':
            // Value too long
            return NextResponse.json(
              { error: 'Invalid payload', code: 'P2000' },
              { status: 400 }
            );
          case 'P2001':
            // Record does not exist
            return NextResponse.json(
              { error: 'Not found', code: 'P2001' },
              { status: 404 }
            );
          default:
            return NextResponse.json(
              { error: 'Database error', code: e.code },
              { status: 500 }
            );
        }
      }

      if (e instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json(
          { error: 'Invalid payload', code: 'PRISMA_VALIDATION' },
          { status: 400 }
        );
      }

      if (
        e instanceof Prisma.PrismaClientInitializationError ||
        e instanceof Prisma.PrismaClientRustPanicError ||
        e instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        return NextResponse.json(
          { error: 'Database error', code: 'PRISMA_RUNTIME' },
          { status: 500 }
        );
      }

      if (e instanceof AppError) {
        return NextResponse.json(
          { error: e.message, code: e.code },
          { status: e.status }
        );
      }

      if (e instanceof ZodError) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }

      return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
  };
}

type HandlerWithAuth<T = unknown> = (
  req: NextRequest,
  ctx: { session: Session }
) => Promise<Response | NextResponse<T>>;

export function withAuth<T = unknown>(handler: HandlerWithAuth<T>) {
  return withErrors(async (req: NextRequest) => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new UnauthorizedError();
    }

    return handler(req, { session });
  });
}
