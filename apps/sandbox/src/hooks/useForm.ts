import * as React from "react"

import { formsRepository } from "../data/repositories/formsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { Form } from "../pages/forms/forms/forms-data"

type UseFormState = {
  form: Form | null
  loading: boolean
  error: string | null
  configured: boolean
}

export function useForm(formId: string): UseFormState {
  const [form, setForm] = React.useState<Form | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const configured = isSupabaseConfigured()

  React.useEffect(() => {
    if (!formId) {
      setForm(null)
      setLoading(false)
      return
    }

    if (!configured) {
      setForm(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const nextForm = await formsRepository.getFormById(formId)
        if (!cancelled) {
          setForm(nextForm)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load form")
          setForm(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [configured, formId])

  return { form, loading, error, configured }
}
