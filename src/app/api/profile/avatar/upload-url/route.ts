import { NextResponse } from 'next/server';

import { withAuth } from '@/lib/error/http';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export const POST = withAuth(async (req, { session }) => {
  const BUCKET = process.env.SUPABASE_BUCKET || 'dev-dc-portfolio-bucket';
  const { filename, contentType, directory } = (await req.json()) as {
    filename?: string;
    contentType?: string;
    directory?: string;
  };

  if (!filename || !contentType || !contentType.startsWith('image/')) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // sanitize filename to avoid path traversal
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const objectPath = `${directory || 'avatars'}/${session.user.id}-${Date.now()}-${safeName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(objectPath);

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: 'Failed to create upload URL' },
      { status: 500 }
    );
  }

  // Public URL (if bucket is public)
  const pub = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
  const publicUrl = pub?.data?.publicUrl;

  return NextResponse.json({
    uploadUrl: data.signedUrl,
    objectPath,
    url: publicUrl,
  });
});
