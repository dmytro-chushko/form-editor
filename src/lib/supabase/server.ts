import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseApiKey = process.env.SUPABASE_ANON_API_KEY;

  if (!supabaseUrl || !supabaseApiKey) {
    throw new Error('Supabase env vars are missing');
  }

  return createClient(supabaseUrl, supabaseApiKey, {
    auth: { persistSession: false },
  });
}
