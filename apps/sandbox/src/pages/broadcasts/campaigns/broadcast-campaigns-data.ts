import type { DataTableRowAction } from "@gecko/ui/components/data-table/data-table"
import type { FilterCategory } from "@gecko/ui/components/filters"

import type { CampaignStatsDataset } from "./detail/campaign-stats-mock-data"

export type BroadcastStatus = "active" | "completed" | "paused" | "failed"

export type BroadcastCampaign = {
  id: string
  name: string
  status: BroadcastStatus
  startDate: string
  endDate: string
  lastRefreshedAt: string
  createdBy: {
    name: string
    initials: string
    createdAt: string
  }
  statsDataset: CampaignStatsDataset
}

export function getBroadcastCampaignPath(campaignId: string, tab?: string) {
  const base = `/broadcasts/campaigns/${campaignId}`
  return tab ? `${base}/${tab}` : base
}

export function getCreateBroadcastCampaignPath() {
  return "/broadcasts/campaigns/new"
}

export const broadcastFilterCategories: FilterCategory[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
      { value: "paused", label: "Paused" },
      { value: "failed", label: "Failed" },
    ],
  },
]

export const broadcastCampaignHeaderMenuItems = [
  { label: "Refresh broadcast" },
  { label: "Export broadcast" },
  { label: "Clone broadcast" },
  {
    label: "Delete broadcast",
    variant: "destructive" as const,
    separatorBefore: true,
  },
] as const

export const broadcastRowActions: DataTableRowAction[] = [
  { id: "edit", label: "Edit broadcast" },
  { id: "clone", label: "Clone broadcast" },
  { id: "pause", label: "Pause broadcast" },
  {
    id: "delete",
    label: "Delete broadcast",
    variant: "destructive",
    separatorBefore: true,
  },
]

export const broadcastSelectActions: DataTableRowAction[] = [
  {
    id: "delete",
    label: "Delete broadcasts",
    variant: "destructive",
    separatorBefore: true,
  },
]
