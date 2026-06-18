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
import {
  DataTableContent,
  DataTableProvider,
} from "@gecko/ui/components/data-table/data-table"
import { DataTableColumnToggle } from "@gecko/ui/components/data-table/data-table-column-toggle"
import { DataTablePagination } from "@gecko/ui/components/data-table/data-table-pagination"
import { DataTableSearch } from "@gecko/ui/components/data-table/data-table-search"
import { DataTableSelectActions } from "@gecko/ui/components/data-table/data-table-select-actions"
import {
  DataTableToolbar,
  DataTableToolbarGroup,
  DataTableToolbarSearchRow,
} from "@gecko/ui/components/data-table/data-table-toolbar"
import { TooltipProvider } from "@gecko/ui/components/tooltip"

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice"
import { DataTablePageSkeleton } from "@/components/data-table-page-skeleton"
import { workflowTemplatesRepository } from "@/data/repositories/workflowTemplatesRepository"
import { useWorkflowTemplates } from "@/hooks/useWorkflowTemplates"

import { createWorkflowTemplateColumns } from "../workflow-templates-columns"
import { WorkflowTemplatesEmpty } from "../workflow-templates-empty"
import {
  getWorkflowTemplatePath,
  workflowTemplateRowActions,
  workflowTemplateSelectActions,
  type WorkflowTemplate,
} from "../workflows-data"

export default function WorkflowTemplatesPage() {
  const navigate = useNavigate()
  const { templates, loading, configured, refetch, removeTemplates } =
    useWorkflowTemplates()

  const [templatesToDelete, setTemplatesToDelete] = React.useState<
    WorkflowTemplate[] | null
  >(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const columns = React.useMemo(() => createWorkflowTemplateColumns(), [])

  const deleteDescription = React.useMemo(() => {
    if (!templatesToDelete?.length) return null

    if (templatesToDelete.length === 1) {
      return `${templatesToDelete[0].name} will be permanently removed. This action cannot be undone.`
    }

    return `${templatesToDelete.length} templates will be permanently removed. This action cannot be undone.`
  }, [templatesToDelete])

  const confirmDelete = async () => {
    if (!templatesToDelete?.length) return

    setIsDeleting(true)

    const ids = templatesToDelete.map((template) => template.id)

    removeTemplates(ids)

    try {
      await workflowTemplatesRepository.deleteTemplates(ids)
      toast.success(
        templatesToDelete.length === 1
          ? "Template deleted successfully"
          : `${templatesToDelete.length} templates deleted successfully`,
      )
      setTemplatesToDelete(null)
    } catch (err) {
      refetch()
      toast.error(
        err instanceof Error ? err.message : "Failed to delete templates",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  if (!configured) {
    return <SupabaseSetupNotice />
  }

  if (loading) {
    return <DataTablePageSkeleton columnCount={2} />
  }

  if (templates.length === 0) {
    return <WorkflowTemplatesEmpty />
  }

  return (
    <TooltipProvider>
      <DataTableProvider
        columns={columns}
        data={templates}
        rowSelection
        rowActions={workflowTemplateRowActions}
        onRowAction={(actionId, { original }) => {
          if (actionId === "edit") {
            navigate(getWorkflowTemplatePath(original.id), {
              state: { templateName: original.name },
            })
            return
          }

          if (actionId === "delete") {
            setTemplatesToDelete([original])
          }
        }}
        selectActions={workflowTemplateSelectActions}
        onSelectAction={(actionId, { selectedRows }) => {
          if (actionId === "delete") {
            setTemplatesToDelete(selectedRows.map((row) => row.original))
          }
        }}
        sorting
        getRowId={(row) => row.id}
      >
        <div className="flex flex-col gap-4">
          <DataTableToolbar>
            <DataTableToolbarSearchRow>
              <DataTableSearch placeholder="Search templates" />
            </DataTableToolbarSearchRow>
            <DataTableToolbarGroup>
              <DataTableSelectActions />
              <DataTableColumnToggle />
            </DataTableToolbarGroup>
          </DataTableToolbar>
          <DataTableContent />
          <DataTablePagination />
        </div>
      </DataTableProvider>

      <AlertDialog
        open={templatesToDelete != null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setTemplatesToDelete(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {templatesToDelete?.length === 1
                ? "Delete template?"
                : `Delete ${templatesToDelete?.length ?? 0} templates?`}
            </AlertDialogTitle>
            <AlertDialogDescription>{deleteDescription}</AlertDialogDescription>
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
              Delete template
              {templatesToDelete && templatesToDelete.length > 1 ? "s" : ""}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}
