import * as React from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
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

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice"
import { workflowTemplatesRepository } from "@/data/repositories/workflowTemplatesRepository"
import { useWorkflowTemplate } from "@/hooks/useWorkflowTemplate"

import { WorkflowBuilderHeader } from "../builder/workflow-builder-header"
import {
  WorkflowCanvas,
  type WorkflowCanvasRef,
} from "../builder/workflow-canvas"
import {
  WORKFLOW_TAB_PATHS,
  workflowTemplateHeaderMenuItems,
  type WorkflowHeaderMenuActionId,
  type WorkflowTemplateHeaderMenuActionId,
} from "../workflows-data"

type WorkflowTemplateEditLocationState = {
  templateName?: string
}

export default function WorkflowTemplateEditPage() {
  const { templateId = "" } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const canvasRef = React.useRef<WorkflowCanvasRef>(null)
  const { template, loading, configured } = useWorkflowTemplate(templateId)

  const templateNameFromState = (
    location.state as WorkflowTemplateEditLocationState | null
  )?.templateName

  const [isSaving, setIsSaving] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const headerTitle = template?.name ?? templateNameFromState ?? "Template"
  const canUpdateTemplate = Boolean(template) && !loading

  const handleMenuAction = (
    action: WorkflowHeaderMenuActionId | WorkflowTemplateHeaderMenuActionId,
  ) => {
    if (action === "delete" && template) {
      setDeleteDialogOpen(true)
    }
  }

  const handleDeleteTemplate = async () => {
    if (!template) return

    setIsDeleting(true)

    try {
      await workflowTemplatesRepository.deleteTemplates([template.id])
      toast.success(`${template.name} deleted`)
      navigate(WORKFLOW_TAB_PATHS.templates)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete template",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdate = async () => {
    if (!template || !canvasRef.current) return

    setIsSaving(true)

    try {
      const definition = canvasRef.current.getDefinition()
      const updated = await workflowTemplatesRepository.updateTemplate(
        template.id,
        { definition },
      )
      toast.success(`${updated.name} updated`)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update template",
      )
    } finally {
      setIsSaving(false)
    }
  }

  if (!configured) {
    return (
      <div className="flex flex-col">
        <WorkflowBuilderHeader
          title="Templates"
          showTemplatesBreadcrumb
          showActionsMenu={false}
        />
        <div className="p-6">
          <SupabaseSetupNotice />
        </div>
      </div>
    )
  }

  if (!loading && !template) {
    return <Navigate to={WORKFLOW_TAB_PATHS.templates} replace />
  }

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col">
      <WorkflowBuilderHeader
        title={headerTitle}
        loading={loading}
        showTemplatesBreadcrumb
        menuItems={workflowTemplateHeaderMenuItems}
        onMenuAction={handleMenuAction}
        primaryAction={
          canUpdateTemplate
            ? {
                label: "Update workflow template",
                onClick: () => void handleUpdate(),
                loading: isSaving,
              }
            : undefined
        }
      />
      <WorkflowCanvas
        ref={canvasRef}
        variant="template"
        initialDefinition={template?.definition}
        loading={loading}
      />
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeleteDialogOpen(false)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete template?</AlertDialogTitle>
            <AlertDialogDescription>
              {template
                ? `${template.name} will be permanently removed. This action cannot be undone.`
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
              onClick={() => void handleDeleteTemplate()}
              disabled={isDeleting}
            >
              <Trash2 aria-hidden />
              Delete template
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
