import * as React from "react"

import { workflowsRepository } from "../data/repositories/workflowsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { Workflow } from "../pages/workflows/workflows-data"

type UseWorkflowState = {
  workflow: Workflow | null
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
}

export function useWorkflow(workflowId: string): UseWorkflowState {
  const [workflow, setWorkflow] = React.useState<Workflow | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useLayoutEffect(() => {
    setWorkflow(null)
    setError(null)
    setLoading(Boolean(workflowId) && configured)
  }, [workflowId, configured])

  React.useEffect(() => {
    if (!workflowId) {
      setWorkflow(null)
      setLoading(false)
      return
    }

    if (!configured) {
      setWorkflow(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      try {
        const nextWorkflow = await workflowsRepository.getWorkflowById(workflowId)
        if (!cancelled) {
          setWorkflow(nextWorkflow)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load workflow",
          )
          setWorkflow(null)
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
  }, [workflowId, configured, reloadToken])

  return { workflow, loading, error, configured, refetch }
}
