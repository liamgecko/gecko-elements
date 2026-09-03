import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@gecko/ui/components/toast";

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { workflowsRepository } from "@/data/repositories/workflowsRepository";
import { workflowTemplatesRepository } from "@/data/repositories/workflowTemplatesRepository";
import { isSupabaseConfigured } from "@/lib/supabase/env";

import { WorkflowBuilderHeader } from "./builder/workflow-builder-header";
import {
  WorkflowCanvas,
  type WorkflowCanvasRef,
} from "./builder/workflow-canvas";
import { WorkflowNameDialog } from "./builder/workflow-name-dialog";
import { WorkflowSaveTemplateDialog } from "./builder/workflow-save-template-dialog";
import type { WorkflowNewLocationState } from "./workflow-create-dialog";
import {
  getWorkflowPath,
  type WorkflowHeaderMenuActionId,
} from "./workflows-data";

export default function WorkflowNewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = React.useRef<WorkflowCanvasRef>(null);
  const configured = isSupabaseConfigured();

  const locationState = location.state as WorkflowNewLocationState | null;
  const initialDefinition = locationState?.initialDefinition;

  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const [workflowName, setWorkflowName] = React.useState(
    () => locationState?.workflowName ?? "",
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");
  const [isSavingTemplate, setIsSavingTemplate] = React.useState(false);

  const handleMenuAction = (action: WorkflowHeaderMenuActionId) => {
    if (action === "save-as-template") {
      setTemplateName(workflowName.trim());
      setTemplateDialogOpen(true);
      return;
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

  const handleSaveClick = () => {
    setNameDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    const trimmedName = workflowName.trim();
    if (!trimmedName || !canvasRef.current) return;

    setIsSaving(true);

    try {
      const definition = canvasRef.current.getDefinition();
      const workflow = await workflowsRepository.createWorkflow({
        name: trimmedName,
        definition,
      });
      toast.add({ title: `${workflow.name} created`, type: "success" });
      navigate(getWorkflowPath(workflow.id), {
        state: { workflowName: workflow.name },
        replace: true,
      });
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to create workflow",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!configured) {
    return (
      <div className="flex flex-col">
        <WorkflowBuilderHeader title="New workflow" />
        <div className="p-6">
          <SupabaseSetupNotice />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col">
      <WorkflowBuilderHeader
        title="New workflow"
        onMenuAction={handleMenuAction}
        primaryAction={{
          label: "Save workflow",
          onClick: handleSaveClick,
          loading: isSaving,
        }}
      />
      <WorkflowCanvas ref={canvasRef} initialDefinition={initialDefinition} />
      <WorkflowNameDialog
        open={nameDialogOpen}
        onOpenChange={(open) => {
          if (!isSaving) setNameDialogOpen(open);
        }}
        name={workflowName}
        onNameChange={setWorkflowName}
        onSave={() => void handleConfirmSave()}
        saving={isSaving}
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
    </div>
  );
}
