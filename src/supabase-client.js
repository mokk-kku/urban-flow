import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './config.js';

export const isSupabaseConfigured = Boolean(
    SUPABASE_URL
    && SUPABASE_PUBLISHABLE_KEY
    && !SUPABASE_PUBLISHABLE_KEY.includes('PUT_YOUR_')
);

export const supabase = isSupabaseConfigured
    ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    })
    : null;

export function requireSupabase() {
    if (!supabase) {
        throw new Error('Supabase is not configured. Add SUPABASE_PUBLISHABLE_KEY in src/config.js.');
    }
    return supabase;
}
