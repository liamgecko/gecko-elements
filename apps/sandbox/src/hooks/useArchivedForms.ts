import * as React from "react"

import { formsRepository } from "../data/repositories/formsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { Form } from "../pages/forms/forms/forms-data"

type UseArchivedFormsState = {
  forms: Form[]
  groupNames: string[]
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
}

export function useArchivedForms(): UseArchivedFormsState {
  const [forms, setForms] = React.useState<Form[]>([])
  const [groupNames, setGroupNames] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useEffect(() => {
    if (!configured) {
      setForms([])
      setGroupNames([])
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const [nextForms, nextGroups] = await Promise.all([
          formsRepository.listForms({ archived: true }),
          formsRepository.listFormGroupNames(),
        ])
        if (!cancelled) {
          setForms(nextForms)
          setGroupNames(nextGroups)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load archived forms",
          )
          setForms([])
          setGroupNames([])
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
  }, [configured, reloadToken])

  return { forms, groupNames, loading, error, configured, refetch }
}
