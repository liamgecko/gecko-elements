import { mapBroadcastCampaignRowToBroadcastCampaign } from "../mappers/broadcastCampaignMapper"
import { getSupabaseClient } from "../../lib/supabase/client"
import { generateSandboxId } from "../../lib/supabase/generate-id"
import {
  DEFAULT_CREATOR_USER_ID,
  SANDBOX_ACCOUNT_ID,
} from "../../lib/supabase/constants"
import type { BroadcastCampaignWithRelations } from "../../lib/supabase/types"
import type { BroadcastCampaign } from "../../pages/broadcasts/campaigns/broadcast-campaigns-data"

const BROADCAST_CAMPAIGN_SELECT = `
  id,
  name,
  status,
  start_date,
  end_date,
  last_refreshed_at,
  stats,
  created_at,
  created_by:users!broadcast_campaigns_created_by_user_id_fkey ( name, initials )
`

export type CreateBroadcastCampaignInput = {
  name: string
}

export class BroadcastCampaignsRepositoryError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = "BroadcastCampaignsRepositoryError"
  }
}

function mapRows(
  rows: BroadcastCampaignWithRelations[] | null,
): BroadcastCampaign[] {
  if (!rows) return []
  return rows.map(mapBroadcastCampaignRowToBroadcastCampaign)
}

export const broadcastCampaignsRepository = {
  async listBroadcastCampaigns(): Promise<BroadcastCampaign[]> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("broadcast_campaigns")
      .select(BROADCAST_CAMPAIGN_SELECT)
      .eq("account_id", SANDBOX_ACCOUNT_ID)
      .order("name", { ascending: true })

    if (error) {
      throw new BroadcastCampaignsRepositoryError(
        "Failed to load broadcast campaigns",
        error,
      )
    }

    return mapRows(data as BroadcastCampaignWithRelations[] | null)
  },

  async getBroadcastCampaignById(
    campaignId: string,
  ): Promise<BroadcastCampaign | null> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("broadcast_campaigns")
      .select(BROADCAST_CAMPAIGN_SELECT)
      .eq("id", campaignId)
      .maybeSingle()

    if (error) {
      throw new BroadcastCampaignsRepositoryError(
        `Failed to load broadcast campaign ${campaignId}`,
        error,
      )
    }

    if (!data) return null

    return mapBroadcastCampaignRowToBroadcastCampaign(
      data as BroadcastCampaignWithRelations,
    )
  },

  async createBroadcastCampaign(
    input: CreateBroadcastCampaignInput,
  ): Promise<BroadcastCampaign> {
    const supabase = getSupabaseClient()

    const now = new Date()
    const endDate = new Date(now)
    endDate.setDate(endDate.getDate() + 7)

    const campaignSeed = Math.floor(Math.random() * 1000)

    const { data, error } = await supabase
      .from("broadcast_campaigns")
      .insert({
        id: generateSandboxId(),
        account_id: SANDBOX_ACCOUNT_ID,
        name: input.name.trim(),
        status: "active",
        start_date: now.toISOString(),
        end_date: endDate.toISOString(),
        last_refreshed_at: now.toISOString(),
        stats: { campaignSeed },
        created_by_user_id: DEFAULT_CREATOR_USER_ID,
      })
      .select(BROADCAST_CAMPAIGN_SELECT)
      .single()

    if (error) {
      throw new BroadcastCampaignsRepositoryError(
        "Failed to create broadcast campaign",
        error,
      )
    }

    return mapBroadcastCampaignRowToBroadcastCampaign(
      data as BroadcastCampaignWithRelations,
    )
  },

  async deleteBroadcastCampaign(campaignId: string): Promise<void> {
    await this.deleteBroadcastCampaigns([campaignId])
  },

  async deleteBroadcastCampaigns(campaignIds: string[]): Promise<void> {
    if (campaignIds.length === 0) return

    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("broadcast_campaigns")
      .delete()
      .in("id", campaignIds)

    if (error) {
      throw new BroadcastCampaignsRepositoryError(
        "Failed to delete broadcast campaigns",
        error,
      )
    }
  },
}
