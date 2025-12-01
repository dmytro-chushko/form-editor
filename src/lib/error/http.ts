import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import { ZodError } from 'zod';

import { auth } from '../auth';

import { AppError } from './errors';

export type Handler<T = any> = (
  req: NextRequest
) => Promise<Response | NextResponse<T>>;

export function withErrors(handler: Handler): Handler {
  return async (req) => {
    try {
      return await handler(req);
    } catch (e: any) {
      // TODO: integrate logger later
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, { session });
  });
}
