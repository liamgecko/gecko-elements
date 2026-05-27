"use client"

import * as React from "react"
import { ChartLine } from "lucide-react"
import { useParams } from "react-router-dom"

import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"

import { broadcastCampaigns } from "../broadcast-campaigns-data"

type CampaignCompareDropdownProps = {
  value: string | null
  onValueChange: (campaignId: string | null) => void
}

export function CampaignCompareDropdown({
  value,
  onValueChange,
}: CampaignCompareDropdownProps) {
  const { campaignId: currentCampaignId = "" } = useParams()

  const campaigns = React.useMemo(
    () =>
      broadcastCampaigns.filter((campaign) => campaign.id !== currentCampaignId),
    [currentCampaignId]
  )

  return (
    <DropdownMenu searchable searchPlaceholder="Search campaigns…">
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <Button variant="outline" size="sm">
            <ChartLine aria-hidden />
            Compare with
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-72 max-h-72">
        <DropdownMenuRadioGroup
          value={value ?? undefined}
          onValueChange={(next) => onValueChange(next)}
        >
          {campaigns.map((campaign) => (
            <DropdownMenuRadioItem
              key={campaign.id}
              value={campaign.id}
              searchValue={campaign.name}
              clearable={value === campaign.id}
              onClear={() => onValueChange(null)}
            >
              <span className="truncate">{campaign.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuEmpty>No campaigns found.</DropdownMenuEmpty>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
