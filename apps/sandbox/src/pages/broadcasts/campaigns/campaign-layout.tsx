import { Cog, Home } from "lucide-react"
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../../state/favourites"
import {
  broadcastCampaignHeaderMenuItems,
  getBroadcastCampaignById,
  getBroadcastCampaignPath,
} from "./broadcast-campaigns-data"
import { formatLastRefreshed } from "./format-last-refreshed"

const CAMPAIGN_TAB_PATHS = {
  overview: "overview",
  stats: "stats",
  contacts: "contacts",
  workflows: "workflows",
  settings: "settings",
} as const

type CampaignTab = keyof typeof CAMPAIGN_TAB_PATHS

function campaignTabFromPath(pathname: string): CampaignTab {
  if (pathname.includes("/workflows")) return "workflows"
  if (pathname.includes("/contacts")) return "contacts"
  if (pathname.includes("/settings")) return "settings"
  if (pathname.includes("/stats")) return "stats"
  if (pathname.includes("/overview")) return "overview"
  return "overview"
}

export default function BroadcastCampaignLayout() {
  const { campaignId = "" } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isFavourited, setFavourite } = useFavourites()

  const campaign = getBroadcastCampaignById(campaignId)

  if (!campaign) {
    return <Navigate to="/broadcasts/campaigns" replace />
  }

  const activeTab = campaignTabFromPath(pathname)
  const campaignPath = getBroadcastCampaignPath(campaignId, activeTab)

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={{
          items: [
            {
              label: (
                <>
                  <Home className="size-3.5" />
                  <span className="sr-only">Home</span>
                </>
              ),
              href: "/home",
              onSelect: () => navigate("/home"),
            },
            {
              label: "Broadcasts",
              href: "/broadcasts/campaigns",
              onSelect: () => navigate("/broadcasts/campaigns"),
            },
            {
              label: "Campaigns",
              href: "/broadcasts/campaigns",
              onSelect: () => navigate("/broadcasts/campaigns"),
            },
            {
              label: campaign.name,
              current: true,
            },
          ],
        }}
        title={campaign.name}
        subheading={formatLastRefreshed(campaign.lastRefreshedAt)}
        favouriteAction={{
          pressed: isFavourited(campaignPath),
          onPressedChange: (next) => {
            setFavourite({ path: campaignPath, label: campaign.name }, next)
          },
        }}
        secondaryActions={[
          {
            kind: "menu",
            label: "Actions",
            icon: <Cog aria-hidden />,
            ariaLabel: "Campaign actions",
            items: [...broadcastCampaignHeaderMenuItems],
          },
        ]}
        tabs={{
          tabsProps: {
            value: activeTab,
            onValueChange: (value) => {
              const tab = CAMPAIGN_TAB_PATHS[value as CampaignTab]
              if (tab) navigate(getBroadcastCampaignPath(campaignId, tab))
            },
          },
          items: [
            { value: "overview", label: "Overview" },
            { value: "stats", label: "Stats" },
            { value: "contacts", label: "Contacts" },
            { value: "workflows", label: "Workflows" },
            { value: "settings", label: "Settings" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
