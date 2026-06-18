import * as React from "react"

import { workflowsRepository } from "../data/repositories/workflowsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { Workflow } from "../pages/workflows/workflows-data"

type UseWorkflowsState = {
  workflows: Workflow[]
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
  patchWorkflow: (workflowId: string, patch: Partial<Workflow>) => void
  patchWorkflows: (workflowIds: string[], patch: Partial<Workflow>) => void
  removeWorkflows: (workflowIds: string[]) => void
}

export function useWorkflows(): UseWorkflowsState {
  const [workflows, setWorkflows] = React.useState<Workflow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)
  const hasLoadedOnceRef = React.useRef(false)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  const patchWorkflow = React.useCallback(
    (workflowId: string, patch: Partial<Workflow>) => {
      setWorkflows((current) =>
        current.map((workflow) =>
          workflow.id === workflowId ? { ...workflow, ...patch } : workflow,
        ),
      )
    },
    [],
  )

  const patchWorkflows = React.useCallback(
    (workflowIds: string[], patch: Partial<Workflow>) => {
      const ids = new Set(workflowIds)
      setWorkflows((current) =>
        current.map((workflow) =>
          ids.has(workflow.id) ? { ...workflow, ...patch } : workflow,
        ),
      )
    },
    [],
  )

  const removeWorkflows = React.useCallback((workflowIds: string[]) => {
    const ids = new Set(workflowIds)
    setWorkflows((current) => current.filter((workflow) => !ids.has(workflow.id)))
  }, [])

  React.useEffect(() => {
    if (!configured) {
      setWorkflows([])
      setLoading(false)
      setError(null)
      hasLoadedOnceRef.current = false
      return
    }

    let cancelled = false
    const showLoading = !hasLoadedOnceRef.current

    async function load() {
      if (showLoading) {
        setLoading(true)
      }
      setError(null)

      try {
        const nextWorkflows = await workflowsRepository.listWorkflows()
        if (!cancelled) {
          setWorkflows(nextWorkflows)
          hasLoadedOnceRef.current = true
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load workflows",
          )
          if (!hasLoadedOnceRef.current) {
            setWorkflows([])
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
    workflows,
    loading,
    error,
    configured,
    refetch,
    patchWorkflow,
    patchWorkflows,
    removeWorkflows,
  }
}
