import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Trash2, X } from "lucide-react"
import { toast } from "sonner"

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
import { DataTable } from "@gecko/ui/components/data-table/data-table"
import { TooltipProvider } from "@gecko/ui/components/tooltip"

import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import { DataTablePageSkeleton } from "@/components/data-table-page-skeleton"
import { paymentItemsRepository } from "@/data/repositories/paymentItemsRepository"
import { usePaymentItems } from "@/hooks/usePaymentItems"

import { paymentItemColumns } from "./payment-items-columns"
import {
  createPaymentItemFilterCategories,
  getPaymentItemPath,
  paymentItemRowActions,
  type PaymentItem,
} from "./payment-items-data"

export default function FormsPaymentItemsPage() {
  const navigate = useNavigate()
  const { paymentItems, creatorNames, loading, error, configured, refetch } =
    usePaymentItems()

  const [itemToDelete, setItemToDelete] = React.useState<PaymentItem | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = React.useState(false)

  const filterCategories = React.useMemo(
    () => createPaymentItemFilterCategories(creatorNames),
    [creatorNames],
  )

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (!open && !isDeleting) {
      setItemToDelete(null)
    }
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    setIsDeleting(true)

    try {
      await paymentItemsRepository.deletePaymentItem(itemToDelete.id)
      toast.success("Chargeable item deleted successfully")
      setItemToDelete(null)
      refetch()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete chargeable item",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  if (!configured) {
    return (
      <div className="space-y-4">
        <SupabaseSetupNotice />
      </div>
    )
  }

  if (loading) {
    return <DataTablePageSkeleton columnCount={4} />
  }

  if (error) {
    return (
      <div className="space-y-4">
        <DataLoadErrorAlert
          title="Could not load chargeable items"
          message={error}
        />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <DataTable
        columns={paymentItemColumns}
        data={paymentItems}
        rowSelection
        rowActions={paymentItemRowActions}
        onRowAction={(actionId, { original }) => {
          if (actionId === "edit") {
            navigate(getPaymentItemPath(original.id))
            return
          }

          if (actionId === "delete") {
            setItemToDelete(original)
          }
        }}
        sorting
        pagination
        toolbar={{
          search: { placeholder: "Search chargeable items" },
          filters: {
            categories: filterCategories,
            triggerLabel: "Filter",
          },
          columnToggle: true,
        }}
        getRowId={(row) => row.id}
      />

      <AlertDialog
        open={itemToDelete != null}
        onOpenChange={handleDeleteDialogOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chargeable item?</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete
                ? `${itemToDelete.name} will be permanently removed. Any forms using this item will no longer include it.`
                : null}
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
              Delete item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}
