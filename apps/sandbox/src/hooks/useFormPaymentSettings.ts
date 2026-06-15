import * as React from "react"

import { formPaymentSettingsRepository } from "../data/repositories/formPaymentSettingsRepository"
import type { FormPaymentSettings } from "../data/repositories/formPaymentSettingsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"

type UseFormPaymentSettingsState = {
  settings: FormPaymentSettings
  loading: boolean
  error: string | null
  configured: boolean
  saveSettings: (settings: FormPaymentSettings) => Promise<void>
  refetch: () => void
}

const emptySettings: FormPaymentSettings = {
  provider: null,
  paymentItemIds: [],
}

export function useFormPaymentSettings(formId: string): UseFormPaymentSettingsState {
  const [settings, setSettings] = React.useState<FormPaymentSettings>(emptySettings)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useEffect(() => {
    if (!formId) {
      setSettings(emptySettings)
      setLoading(false)
      return
    }

    if (!configured) {
      setSettings(emptySettings)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const nextSettings =
          await formPaymentSettingsRepository.getFormPaymentSettings(formId)
        if (!cancelled) {
          setSettings(nextSettings)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load form payment settings",
          )
          setSettings(emptySettings)
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
  }, [configured, formId, reloadToken])

  const saveSettings = React.useCallback(
    async (nextSettings: FormPaymentSettings) => {
      await formPaymentSettingsRepository.saveFormPaymentSettings(
        formId,
        nextSettings,
      )
      setSettings(nextSettings)
    },
    [formId],
  )

  return { settings, loading, error, configured, saveSettings, refetch }
}
