import * as React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Trash2, X } from "lucide-react";
import { toast } from "@gecko/ui/components/toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog";

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { workflowsRepository } from "@/data/repositories/workflowsRepository";
import { workflowTemplatesRepository } from "@/data/repositories/workflowTemplatesRepository";
import { useWorkflow } from "@/hooks/useWorkflow";

import { WorkflowBuilderHeader } from "./builder/workflow-builder-header";
import {
  WorkflowCanvas,
  type WorkflowCanvasRef,
} from "./builder/workflow-canvas";
import { WorkflowSaveTemplateDialog } from "./builder/workflow-save-template-dialog";
import type { WorkflowHeaderMenuActionId } from "./workflows-data";

type WorkflowEditLocationState = {
  workflowName?: string;
};

export default function WorkflowEditPage() {
  const { workflowId = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = React.useRef<WorkflowCanvasRef>(null);
  const workflowNameFromState = (
    location.state as WorkflowEditLocationState | null
  )?.workflowName;
  const { workflow, loading, configured } = useWorkflow(workflowId);

  const [isSaving, setIsSaving] = React.useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");
  const [isSavingTemplate, setIsSavingTemplate] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const headerTitle = workflow?.name ?? workflowNameFromState ?? "Workflow";
  const workflowName = workflow?.name ?? workflowNameFromState;
  const canUpdateWorkflow = Boolean(workflow) && !loading;

  const handleMenuAction = (action: WorkflowHeaderMenuActionId) => {
    if (action === "save-as-template") {
      setTemplateName(workflowName ?? "");
      setTemplateDialogOpen(true);
      return;
    }

    if (action === "delete" && workflow) {
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteWorkflow = async () => {
    if (!workflow) return;

    setIsDeleting(true);

    try {
      await workflowsRepository.deleteWorkflows([workflow.id]);
      toast.add({ title: `${workflow.name} deleted`, type: "success" });
      navigate("/workflows");
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to delete workflow",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveTemplate = async () => {
    const trimmedName = templateName.trim();
    if (!trimmedName || !canvasRef.current) return;

    setIsSavingTemplate(true);

    try {
      const template = await workflowTemplatesRepository.createTemplate({
        name: trimmedName,
        definition: canvasRef.current.getDefinition(),
        sourceWorkflowId: workflow?.id,
      });
      toast.add({
        title: `${template.name} saved as template`,
        type: "success",
      });
      setTemplateDialogOpen(false);
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to save template",
        type: "error",
      });
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const handleUpdate = async () => {
    if (!workflow || !canvasRef.current) return;

    setIsSaving(true);

    try {
      const definition = canvasRef.current.getDefinition();
      const updated = await workflowsRepository.updateWorkflow(workflow.id, {
        definition,
      });
      toast.add({ title: `${updated.name} updated`, type: "success" });
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to update workflow",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!configured) {
    return (
      <div className="flex flex-col">
        <WorkflowBuilderHeader title="Workflows" />
        <div className="p-6">
          <SupabaseSetupNotice />
        </div>
      </div>
    );
  }

  if (!loading && !workflow) {
    return <Navigate to="/workflows" replace />;
  }

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col">
      <WorkflowBuilderHeader
        title={headerTitle}
        loading={loading}
        onMenuAction={handleMenuAction}
        primaryAction={
          canUpdateWorkflow
            ? {
                label: "Update workflow",
                onClick: () => void handleUpdate(),
                loading: isSaving,
              }
            : undefined
        }
      />
      <WorkflowCanvas
        ref={canvasRef}
        initialDefinition={workflow?.definition}
        loading={loading}
      />
      <WorkflowSaveTemplateDialog
        open={templateDialogOpen}
        onOpenChange={(open) => {
          if (!isSavingTemplate) setTemplateDialogOpen(open);
        }}
        name={templateName}
        onNameChange={setTemplateName}
        onSave={() => void handleSaveTemplate()}
        saving={isSavingTemplate}
      />
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeleteDialogOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workflow?</AlertDialogTitle>
            <AlertDialogDescription>
              {workflow
                ? `${workflow.name} will be permanently removed. This action cannot be undone.`
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
              onClick={() => void handleDeleteWorkflow()}
              disabled={isDeleting}
            >
              <Trash2 aria-hidden />
              Delete workflow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
