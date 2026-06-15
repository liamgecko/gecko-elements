import type { Json } from "../../lib/supabase/types"
import {
  generateMockDataset,
  type CampaignStatsDataset,
} from "../../pages/broadcasts/campaigns/detail/campaign-stats-mock-data"

export function parseCampaignStats(stats: Json | null): CampaignStatsDataset {
  if (
    stats &&
    typeof stats === "object" &&
    !Array.isArray(stats) &&
    "campaignSeed" in stats &&
    typeof stats.campaignSeed === "number"
  ) {
    return generateMockDataset(stats.campaignSeed)
  }

  return generateMockDataset(0)
}
