import * as React from "react"

import { broadcastCampaignsRepository } from "../data/repositories/broadcastCampaignsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { BroadcastCampaign } from "../pages/broadcasts/campaigns/broadcast-campaigns-data"

type UseBroadcastCampaignsState = {
  campaigns: BroadcastCampaign[]
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
}

export function useBroadcastCampaigns(): UseBroadcastCampaignsState {
  const [campaigns, setCampaigns] = React.useState<BroadcastCampaign[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useEffect(() => {
    if (!configured) {
      setCampaigns([])
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const nextCampaigns =
          await broadcastCampaignsRepository.listBroadcastCampaigns()
        if (!cancelled) {
          setCampaigns(nextCampaigns)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load broadcast campaigns",
          )
          setCampaigns([])
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

  return { campaigns, loading, error, configured, refetch }
}
