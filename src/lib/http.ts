import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { AppError, BadRequestError } from './errors';

export type Handler<T = any> = (req: Request) => Promise<NextResponse<T>>;

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
