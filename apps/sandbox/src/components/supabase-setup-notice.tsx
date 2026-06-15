import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@gecko/ui/components/alert"

import { isSupabaseConfigured } from "@/lib/supabase/env"

export function SupabaseSetupNotice() {
  if (isSupabaseConfigured()) return null

  return (
    <Alert variant="warning">
      <AlertTitle>Supabase is not configured</AlertTitle>
      <AlertDescription>
        Copy <code>apps/sandbox/.env.example</code> to{" "}
        <code>apps/sandbox/.env.local</code>, add your project URL and anon key,
        then run the SQL migration and seed in your Supabase dashboard. See{" "}
        <code>apps/sandbox/SUPABASE.md</code> for setup steps.
      </AlertDescription>
    </Alert>
  )
}

export function DataLoadErrorAlert({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
