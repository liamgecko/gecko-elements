import { CheckCheck } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
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
import { Input } from "@gecko/ui/components/input"
import { Label } from "@gecko/ui/components/label"

type WorkflowNameDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  onNameChange: (name: string) => void
  onSave: () => void
  saving?: boolean
  variant?: "workflow" | "template"
}

const workflowNameDialogCopy = {
  workflow: {
    title: "Name your workflow",
    description: "Choose a name to save this workflow to your account.",
    fieldLabel: "Workflow name",
    fieldId: "workflow-name",
    saveLabel: "Save workflow",
  },
  template: {
    title: "Name your template",
    description: "Choose a name to save this template to your account.",
    fieldLabel: "Template name",
    fieldId: "workflow-template-name",
    saveLabel: "Save workflow template",
  },
} as const

export function WorkflowNameDialog({
  open,
  onOpenChange,
  name,
  onNameChange,
  onSave,
  saving = false,
  variant = "workflow",
}: WorkflowNameDialogProps) {
  const trimmedName = name.trim()
  const canSave = trimmedName.length > 0 && !saving
  const copy = workflowNameDialogCopy[variant]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-2">
            <Label htmlFor={copy.fieldId}>{copy.fieldLabel}</Label>
            <Input
              id={copy.fieldId}
              value={name}
              onChange={(event) => onNameChange(event.currentTarget.value)}
              autoFocus
              onKeyDown={(event) => {
                if (event.key === "Enter" && canSave) {
                  event.preventDefault()
                  onSave()
                }
              }}
            />
          </DialogBody>
        </DialogWrapper>
        <DialogFooter showCloseButton closeButtonText="Cancel">
          <Button
            type="button"
            disabled={!canSave}
            aria-busy={saving}
            onClick={onSave}
          >
            <CheckCheck data-icon="inline-start" aria-hidden />
            {copy.saveLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
