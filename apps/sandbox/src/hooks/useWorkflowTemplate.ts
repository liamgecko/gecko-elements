import * as React from "react"

import { workflowTemplatesRepository } from "../data/repositories/workflowTemplatesRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { WorkflowTemplate } from "../pages/workflows/workflows-data"

type UseWorkflowTemplateState = {
  template: WorkflowTemplate | null
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
}

export function useWorkflowTemplate(templateId: string): UseWorkflowTemplateState {
  const [template, setTemplate] = React.useState<WorkflowTemplate | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useLayoutEffect(() => {
    setTemplate(null)
    setError(null)
    setLoading(Boolean(templateId) && configured)
  }, [templateId, configured])

  React.useEffect(() => {
    if (!templateId) {
      setTemplate(null)
      setLoading(false)
      return
    }

    if (!configured) {
      setTemplate(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      try {
        const nextTemplate =
          await workflowTemplatesRepository.getTemplateById(templateId)
        if (!cancelled) {
          setTemplate(nextTemplate)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load workflow template",
          )
          setTemplate(null)
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
  }, [templateId, configured, reloadToken])

  return { template, loading, error, configured, refetch }
}
