import { useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { DataTable } from "@gecko/ui/components/data-table/data-table"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../../state/favourites"
import { usePageBreadcrumbs } from "../../../lib/use-page-breadcrumbs"

import { broadcastCampaignColumns } from "./broadcast-campaigns-columns"
import {
  broadcastCampaigns,
  broadcastFilterCategories,
  broadcastRowActions,
  getBroadcastCampaignPath,
} from "./broadcast-campaigns-data"

export default function BroadcastsCampaignsPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Campaigns"
        primaryAction={{ label: "Create new broadcast" }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: "Campaigns" }, next)
          },
        }}
      />
      <Container>
        <DataTable
          columns={broadcastCampaignColumns}
          data={broadcastCampaigns}
          rowSelection
          rowActions={broadcastRowActions}
          onRowAction={(actionId, { original }) => {
            if (actionId === "edit") {
              navigate(getBroadcastCampaignPath(original.id))
            }
          }}
          sorting
          pagination
          toolbar={{
            search: { placeholder: "Search broadcasts" },
            filters: {
              categories: broadcastFilterCategories,
              triggerLabel: "Filter",
            },
            columnToggle: true,
          }}
          getRowId={(row) => row.id}
        />
      </Container>
    </div>
  )
}
