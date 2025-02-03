import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export let supabase: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
};
