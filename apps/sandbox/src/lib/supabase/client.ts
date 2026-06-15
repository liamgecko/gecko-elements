import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { getSupabaseEnv, isSupabaseConfigured } from "./env"
import type { Database } from "./types"

let client: SupabaseClient<Database> | null = null

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in apps/sandbox/.env.local",
    )
  }

  if (!client) {
    const { url, anonKey } = getSupabaseEnv()
    client = createClient<Database>(url!, anonKey!)
  }

  return client
}

export function tryGetSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) return null
  return getSupabaseClient()
}
