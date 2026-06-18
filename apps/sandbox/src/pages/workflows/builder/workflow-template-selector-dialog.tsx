import { CheckCheck, X } from "lucide-react"
import * as React from "react"

import { Button } from "@gecko/ui/components/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@gecko/ui/components/combobox"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@gecko/ui/components/dialog"
import { Field, FieldLabel } from "@gecko/ui/components/field"

import { useWorkflowTemplates } from "@/hooks/useWorkflowTemplates"

import type { WorkflowTemplate } from "../workflows-data"

type WorkflowTemplateSelectorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUseTemplate?: (templateId: string) => void
}

export function WorkflowTemplateSelectorDialog({
  open,
  onOpenChange,
  onUseTemplate,
}: WorkflowTemplateSelectorDialogProps) {
  const { templates, loading } = useWorkflowTemplates()
  const [selectedTemplateId, setSelectedTemplateId] = React.useState<
    string | null
  >(null)

  React.useEffect(() => {
    if (!open) {
      setSelectedTemplateId(null)
    }
  }, [open])

  const canUse = selectedTemplateId != null

  const handleUseTemplate = () => {
    if (!selectedTemplateId) return
    onUseTemplate?.(selectedTemplateId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>Use a template</DialogTitle>
            <DialogDescription>
              Choose a template to add to your workflow canvas.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Field>
              <FieldLabel htmlFor="workflow-template-selector">Template</FieldLabel>
              <Combobox
                items={templates}
                value={
                  selectedTemplateId
                    ? (templates.find(
                        (template) => template.id === selectedTemplateId,
                      ) ?? null)
                    : null
                }
                onValueChange={(template: WorkflowTemplate | null) => {
                  setSelectedTemplateId(template?.id ?? null)
                }}
                itemToStringLabel={(template) => template?.name ?? ""}
                isItemEqualToValue={(item, selected) =>
                  item?.id === selected?.id
                }
                disabled={loading}
              >
                <ComboboxInput
                  id="workflow-template-selector"
                  placeholder={loading ? "Loading templates…" : "Search templates"}
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>
                    {loading ? "Loading templates…" : "No templates found."}
                  </ComboboxEmpty>
                  <ComboboxList>
                    {(template: WorkflowTemplate) => (
                      <ComboboxItem key={template.id} value={template}>
                        {template.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </DialogBody>
        </DialogWrapper>
        <DialogFooter showCloseButton closeButtonText="Cancel" closeButtonIcon={X}>
          <Button
            type="button"
            disabled={!canUse}
            onClick={handleUseTemplate}
          >
            <CheckCheck data-icon="inline-start" aria-hidden />
            Use template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
