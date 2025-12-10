import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// On utilise createBrowserClient pour que les cookies soient gérés automatiquement
export const supabase = createBrowserClient(supabaseUrl, supabaseKey)