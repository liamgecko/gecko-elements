export function getSupabaseEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  return { url, anonKey }
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseEnv()
  return Boolean(url && anonKey)
}
