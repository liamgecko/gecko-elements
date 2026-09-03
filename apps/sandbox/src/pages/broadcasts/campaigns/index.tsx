import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Trash2, X } from "lucide-react"
import { toast } from "@gecko/ui/components/toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog"
import { Container } from "@gecko/ui/components/container"
import { DataTable } from "@gecko/ui/components/data-table/data-table"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../../state/favourites"
import { usePageBreadcrumbs } from "../../../lib/use-page-breadcrumbs"
import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import { DataTablePageSkeleton } from "@/components/data-table-page-skeleton"
import { broadcastCampaignsRepository } from "@/data/repositories/broadcastCampaignsRepository"
import { useBroadcastCampaigns } from "@/hooks/useBroadcastCampaigns"

import { broadcastCampaignColumns } from "./broadcast-campaigns-columns"
import {
  broadcastFilterCategories,
  broadcastRowActions,
  broadcastSelectActions,
  getBroadcastCampaignPath,
  getCreateBroadcastCampaignPath,
  type BroadcastCampaign,
} from "./broadcast-campaigns-data"

export default function BroadcastsCampaignsPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const { campaigns, loading, error, configured, refetch } =
    useBroadcastCampaigns()

  const [campaignsToDelete, setCampaignsToDelete] = React.useState<
    BroadcastCampaign[] | null
  >(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const primaryAction = {
    label: "Create new broadcast",
    onClick: () => navigate(getCreateBroadcastCampaignPath()),
  }

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (!open && !isDeleting) {
      setCampaignsToDelete(null)
    }
  }

  const deleteDescription = React.useMemo(() => {
    if (!campaignsToDelete?.length) return null

    if (campaignsToDelete.length === 1) {
      return `"${campaignsToDelete[0].name}" will be permanently removed. This action cannot be undone.`
    }

    return `${campaignsToDelete.length} broadcasts will be permanently removed. This action cannot be undone.`
  }, [campaignsToDelete])

  const confirmDelete = async () => {
    if (!campaignsToDelete?.length) return

    setIsDeleting(true)

    try {
      await broadcastCampaignsRepository.deleteBroadcastCampaigns(
        campaignsToDelete.map((campaign) => campaign.id)
      )
      toast.add({
        title:
          campaignsToDelete.length === 1
            ? "Broadcast deleted successfully"
            : `${campaignsToDelete.length} broadcasts deleted successfully`,
        type: "success",
      })
      setCampaignsToDelete(null)
      refetch()
    } catch (err) {
      toast.add({
        title:
          err instanceof Error ? err.message : "Failed to delete broadcast",
        type: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (!configured) {
    return (
      <div className="flex flex-col">
        <Header
          breadcrumbs={breadcrumbs}
          title="Broadcasts"
          primaryAction={primaryAction}
          favouriteAction={{
            pressed: isFavourited(pathname),
            onPressedChange: (next) => {
              setFavourite({ path: pathname, label: "Broadcasts" }, next)
            },
          }}
        />
        <Container>
          <SupabaseSetupNotice />
        </Container>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <Header
          breadcrumbs={breadcrumbs}
          title="Broadcasts"
          primaryAction={primaryAction}
          favouriteAction={{
            pressed: isFavourited(pathname),
            onPressedChange: (next) => {
              setFavourite({ path: pathname, label: "Broadcasts" }, next)
            },
          }}
        />
        <Container>
          <DataTablePageSkeleton columnCount={5} />
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <Header
          breadcrumbs={breadcrumbs}
          title="Broadcasts"
          primaryAction={primaryAction}
          favouriteAction={{
            pressed: isFavourited(pathname),
            onPressedChange: (next) => {
              setFavourite({ path: pathname, label: "Broadcasts" }, next)
            },
          }}
        />
        <Container>
          <DataLoadErrorAlert
            title="Could not load campaigns"
            message={error}
          />
        </Container>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Broadcasts"
        primaryAction={primaryAction}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: "Broadcasts" }, next)
          },
        }}
      />
      <Container>
        <DataTable
          columns={broadcastCampaignColumns}
          data={campaigns}
          rowSelection
          rowActions={broadcastRowActions}
          onRowAction={(actionId, { original }) => {
            if (actionId === "edit") {
              navigate(getBroadcastCampaignPath(original.id))
              return
            }

            if (actionId === "delete") {
              setCampaignsToDelete([original])
            }
          }}
          selectActions={broadcastSelectActions}
          onSelectAction={(actionId, { selectedRows }) => {
            if (actionId === "delete") {
              setCampaignsToDelete(selectedRows.map((row) => row.original))
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

        <AlertDialog
          open={campaignsToDelete != null}
          onOpenChange={handleDeleteDialogOpenChange}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {campaignsToDelete?.length === 1
                  ? "Delete broadcast?"
                  : `Delete ${campaignsToDelete?.length ?? 0} broadcasts?`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {deleteDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                <X aria-hidden />
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => void confirmDelete()}
                disabled={isDeleting}
              >
                <Trash2 aria-hidden />
                Delete broadcast
                {campaignsToDelete && campaignsToDelete.length > 1 ? "s" : ""}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </div>
  )
}
