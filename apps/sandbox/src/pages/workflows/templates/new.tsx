import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@gecko/ui/components/toast";

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { workflowTemplatesRepository } from "@/data/repositories/workflowTemplatesRepository";
import { isSupabaseConfigured } from "@/lib/supabase/env";

import { WorkflowBuilderHeader } from "../builder/workflow-builder-header";
import {
  WorkflowCanvas,
  type WorkflowCanvasRef,
} from "../builder/workflow-canvas";
import { WorkflowNameDialog } from "../builder/workflow-name-dialog";
import {
  WORKFLOW_TAB_PATHS,
  getWorkflowTemplatePath,
  workflowTemplateHeaderMenuItems,
  type WorkflowHeaderMenuActionId,
  type WorkflowTemplateHeaderMenuActionId,
} from "../workflows-data";

export default function WorkflowTemplateNewPage() {
  const navigate = useNavigate();
  const canvasRef = React.useRef<WorkflowCanvasRef>(null);
  const configured = isSupabaseConfigured();

  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleMenuAction = (
    action: WorkflowHeaderMenuActionId | WorkflowTemplateHeaderMenuActionId,
  ) => {
    if (action === "delete") {
      navigate(WORKFLOW_TAB_PATHS.templates);
    }
  };

  const handleSaveClick = () => {
    setNameDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    const trimmedName = templateName.trim();
    if (!trimmedName || !canvasRef.current) return;

    setIsSaving(true);

    try {
      const definition = canvasRef.current.getDefinition();
      const template = await workflowTemplatesRepository.createTemplate({
        name: trimmedName,
        definition,
      });
      toast.add({ title: `${template.name} created`, type: "success" });
      navigate(getWorkflowTemplatePath(template.id), {
        state: { templateName: template.name },
        replace: true,
      });
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to create template",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!configured) {
    return (
      <div className="flex flex-col">
        <WorkflowBuilderHeader
          title="New template"
          showTemplatesBreadcrumb
          showActionsMenu={false}
        />
        <div className="p-6">
          <SupabaseSetupNotice />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col">
      <WorkflowBuilderHeader
        title="New template"
        showTemplatesBreadcrumb
        menuItems={workflowTemplateHeaderMenuItems}
        onMenuAction={handleMenuAction}
        primaryAction={{
          label: "Save workflow template",
          onClick: handleSaveClick,
          loading: isSaving,
        }}
      />
      <WorkflowCanvas ref={canvasRef} variant="template" />
      <WorkflowNameDialog
        open={nameDialogOpen}
        onOpenChange={(open) => {
          if (!isSaving) setNameDialogOpen(open);
        }}
        name={templateName}
        onNameChange={setTemplateName}
        onSave={() => void handleConfirmSave()}
        saving={isSaving}
        variant="template"
      />
    </div>
  );
}
