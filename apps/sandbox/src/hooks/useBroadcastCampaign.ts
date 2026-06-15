import * as React from "react"

import { broadcastCampaignsRepository } from "../data/repositories/broadcastCampaignsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { BroadcastCampaign } from "../pages/broadcasts/campaigns/broadcast-campaigns-data"

type UseBroadcastCampaignState = {
  campaign: BroadcastCampaign | null
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
}

export function useBroadcastCampaign(
  campaignId: string,
): UseBroadcastCampaignState {
  const [campaign, setCampaign] = React.useState<BroadcastCampaign | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useEffect(() => {
    if (!campaignId) {
      setCampaign(null)
      setLoading(false)
      return
    }

    if (!configured) {
      setCampaign(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const nextCampaign =
          await broadcastCampaignsRepository.getBroadcastCampaignById(campaignId)
        if (!cancelled) {
          setCampaign(nextCampaign)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load broadcast campaign",
          )
          setCampaign(null)
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
  }, [campaignId, configured, reloadToken])

  return { campaign, loading, error, configured, refetch }
}
