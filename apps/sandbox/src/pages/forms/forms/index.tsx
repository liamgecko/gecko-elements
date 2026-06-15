import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Archive, X } from "lucide-react"
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
import { formsRepository } from "@/data/repositories/formsRepository"
import { useForms } from "@/hooks/useForms"

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
    null,
  )
  const [isArchiving, setIsArchiving] = React.useState(false)

  const filterCategories = React.useMemo(
    () => createFormFilterCategories(groupNames),
    [groupNames],
  )

  const handleArchiveDialogOpenChange = (open: boolean) => {
    if (!open && !isArchiving) {
      setFormsToArchive(null)
    }
  }

  const confirmArchive = async () => {
    if (!formsToArchive?.length) return

    setIsArchiving(true)

    try {
      await Promise.all(
        formsToArchive.map((form) => formsRepository.archiveForm(form.id)),
      )
      toast.success(
        formsToArchive.length === 1
          ? "Form archived successfully"
          : `${formsToArchive.length} forms archived successfully`,
      )
      setFormsToArchive(null)
      refetch()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to archive form",
      )
    } finally {
      setIsArchiving(false)
    }
  }

  const archiveDescription = React.useMemo(() => {
    if (!formsToArchive?.length) return null

    if (formsToArchive.length === 1) {
      return `"${formsToArchive[0].name}" will be moved to archived forms. You can restore it later from the Archived forms tab.`
    }

    return `${formsToArchive.length} forms will be moved to archived forms. You can restore them later from the Archived forms tab.`
  }, [formsToArchive])

  if (!configured) {
    return (
      <div className="space-y-4">
        <SupabaseSetupNotice />
      </div>
    )
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading forms…</p>
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
          selectActions: true,
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

      <AlertDialog
        open={formsToArchive != null}
        onOpenChange={handleArchiveDialogOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {formsToArchive?.length === 1
                ? "Archive form?"
                : `Archive ${formsToArchive?.length ?? 0} forms?`}
            </AlertDialogTitle>
            <AlertDialogDescription>{archiveDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isArchiving}>
              <X aria-hidden />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => void confirmArchive()}
              disabled={isArchiving}
            >
              <Archive aria-hidden />
              Archive form{formsToArchive && formsToArchive.length > 1 ? "s" : ""}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}
