import { NextResponse } from 'next/server';
import { Session } from 'next-auth';

import { BadRequestError } from '@/lib/error/errors';
import { withAuth } from '@/lib/error/http';
import prisma from '@/lib/prisma';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export const PATCH = withAuth(
  async (req, _ctx, { session }: { session: Session }) => {
    const BUCKET = process.env.SUPABASE_BUCKET || 'avatars';
    const body = (await req.json()) as { image?: string; objectPath?: string };
    let imageUrl = body.image;

    if (!imageUrl && body.objectPath) {
      const supabase = getSupabaseAdmin();
      const pub = supabase.storage.from(BUCKET).getPublicUrl(body.objectPath);
      imageUrl = pub?.data?.publicUrl || (null as any);
    }

    if (!imageUrl) {
      throw new BadRequestError('Invalid payload');
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
      select: { id: true, image: true },
    });

    return NextResponse.json({ ok: true, image: user.image });
  }
);
