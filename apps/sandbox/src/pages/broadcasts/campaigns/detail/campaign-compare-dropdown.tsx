import * as React from "react";
import { ChartLine } from "lucide-react";
import { useParams } from "react-router-dom";

import { Button } from "@gecko/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";

import { useBroadcastCampaigns } from "@/hooks/useBroadcastCampaigns";

type CampaignCompareDropdownProps = {
  value: string | null;
  onValueChange: (campaignId: string | null) => void;
};

export function CampaignCompareDropdown({
  value,
  onValueChange,
}: CampaignCompareDropdownProps) {
  const { campaignId: currentCampaignId = "" } = useParams();
  const { campaigns: allCampaigns } = useBroadcastCampaigns();

  const campaigns = React.useMemo(
    () => allCampaigns.filter((campaign) => campaign.id !== currentCampaignId),
    [allCampaigns, currentCampaignId],
  );

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
            >
              <span className="truncate">{campaign.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuEmpty>No campaigns found.</DropdownMenuEmpty>
        {value && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onValueChange(null)}>
              Clear comparison
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
