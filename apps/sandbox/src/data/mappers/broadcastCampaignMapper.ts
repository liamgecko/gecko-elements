import type { BroadcastCampaign } from "../../pages/broadcasts/campaigns/broadcast-campaigns-data"
import type { BroadcastCampaignWithRelations } from "../../lib/supabase/types"

import { parseCampaignStats } from "./campaignStatsMapper"

export function mapBroadcastCampaignRowToBroadcastCampaign(
  row: BroadcastCampaignWithRelations,
): BroadcastCampaign {
  const createdBy = row.created_by

  if (!createdBy) {
    throw new Error(`Broadcast campaign ${row.id} is missing required relations`)
  }

  return {
    id: row.id,
    name: row.name,
    status: row.status,
    startDate: row.start_date,
    endDate: row.end_date,
    lastRefreshedAt: row.last_refreshed_at,
    createdBy: {
      name: createdBy.name,
      initials: createdBy.initials,
      createdAt: row.created_at,
    },
    statsDataset: parseCampaignStats(row.stats),
  }
}
