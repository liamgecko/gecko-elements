import * as React from "react"

import { workflowTemplatesRepository } from "../data/repositories/workflowTemplatesRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { WorkflowTemplate } from "../pages/workflows/workflows-data"

let templatesCache: WorkflowTemplate[] | undefined

type UseWorkflowTemplatesState = {
  templates: WorkflowTemplate[]
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
  removeTemplates: (templateIds: string[]) => void
}

export function useWorkflowTemplates(): UseWorkflowTemplatesState {
  const [templates, setTemplates] = React.useState<WorkflowTemplate[]>(
    () => templatesCache ?? [],
  )
  const [loading, setLoading] = React.useState(() => templatesCache === undefined)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)
  const hasLoadedOnceRef = React.useRef(templatesCache !== undefined)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  const removeTemplates = React.useCallback((templateIds: string[]) => {
    const ids = new Set(templateIds)
    setTemplates((current) => {
      const next = current.filter((template) => !ids.has(template.id))
      templatesCache = next
      return next
    })
  }, [])

  React.useEffect(() => {
    if (!configured) {
      setTemplates([])
      setLoading(false)
      setError(null)
      hasLoadedOnceRef.current = false
      templatesCache = undefined
      return
    }

    let cancelled = false
    const showLoading = templatesCache === undefined

    async function load() {
      if (showLoading) {
        setLoading(true)
      }
      setError(null)

      try {
        const nextTemplates = await workflowTemplatesRepository.listTemplates()
        if (!cancelled) {
          templatesCache = nextTemplates
          setTemplates(nextTemplates)
          hasLoadedOnceRef.current = true
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load workflow templates",
          )
          if (!hasLoadedOnceRef.current) {
            templatesCache = []
            setTemplates([])
          }
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

  return {
    templates,
    loading,
    error,
    configured,
    refetch,
    removeTemplates,
  }
}
