import { createClient } from '@supabase/supabase-js';

const SUPABASE_DOMAIN = process.env.NEXT_PUBLIC_SUPABASE_DOMAIN;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_DOMAIN) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_DOMAIN. Please set it in .env.local file.');
}
if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Please set it in .env.local file.');
}

const SUPABASE_URL = `https://${SUPABASE_DOMAIN}`;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
