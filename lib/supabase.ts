// Configuration Supabase (placeholder)
// À compléter avec les vraies valeurs d'environnement

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Client Supabase pour le serveur
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client Supabase pour le navigateur (à utiliser dans les composants client)
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

