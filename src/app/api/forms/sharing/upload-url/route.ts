import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

import { withValidToken } from '@/lib/error/http';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export const POST = withValidToken(async (req: NextRequest) => {
  const BUCKET = process.env.SUPABASE_BUCKET || 'dev-dc-portfolio-bucket';
  const { fileName, contentType, directory } = (await req.json()) as {
    fileName?: string;
    contentType?: string;
    directory?: string;
  };

  if (!fileName || !contentType || !directory) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // sanitize filename to avoid path traversal
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const objectPath = `${directory}/${nanoid()}-${Date.now()}-${safeName}`;

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
