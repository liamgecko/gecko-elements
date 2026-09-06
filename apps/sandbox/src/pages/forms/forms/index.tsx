import * as React from "react"
import { useNavigate } from "react-router-dom"

import { DataTable } from "@gecko/ui/components/data-table/data-table"
import { TooltipProvider } from "@gecko/ui/components/tooltip"

import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import { DataTablePageSkeleton } from "@/components/data-table-page-skeleton"
import { useForms } from "@/hooks/useForms"

import { FormArchiveDialog } from "./form-archive-dialog"
import { formColumns } from "./forms-columns"
import {
  createFormFilterCategories,
  formRowActions,
  formSelectActions,
  getFormPath,
  type Form,
} from "./forms-data"

export default function FormsFormsPage() {
  const navigate = useNavigate()
  const { forms, groupNames, loading, error, configured, refetch } = useForms()
  const [formsToArchive, setFormsToArchive] = React.useState<Form[] | null>(
    null
  )

  const filterCategories = React.useMemo(
    () => createFormFilterCategories(groupNames),
    [groupNames]
  )

  if (!configured) {
    return (
      <div className="space-y-4">
        <SupabaseSetupNotice />
      </div>
    )
  }

  if (loading) {
    return <DataTablePageSkeleton columnCount={3} />
  }

  if (error) {
    return (
      <div className="space-y-4">
        <DataLoadErrorAlert title="Could not load forms" message={error} />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <DataTable
        columns={formColumns}
        data={forms}
        rowSelection
        rowActions={formRowActions}
        onRowAction={(actionId, { original }) => {
          if (actionId === "edit") {
            navigate(getFormPath(original.id))
            return
          }

          if (actionId === "archive") {
            setFormsToArchive([original])
          }
        }}
        selectActions={formSelectActions}
        onSelectAction={(actionId, { selectedRows }) => {
          if (actionId === "archive") {
            setFormsToArchive(selectedRows.map((row) => row.original))
          }
        }}
        sorting
        pagination
        toolbar={{
          search: { placeholder: "Search forms" },
          filters: {
            categories: filterCategories,
            triggerLabel: "Filter",
          },
          columnToggle: true,
        }}
        initialState={{
          columnVisibility: {
            group: false,
            status: false,
          },
        }}
        getRowId={(row) => row.id}
      />

      <FormArchiveDialog
        forms={formsToArchive}
        onOpenChange={(open) => {
          if (!open) {
            setFormsToArchive(null)
          }
        }}
        onArchived={refetch}
      />
    </TooltipProvider>
  )
}
