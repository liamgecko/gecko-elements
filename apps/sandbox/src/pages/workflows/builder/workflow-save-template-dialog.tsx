import { CheckCheck } from "lucide-react"

import { Button } from "@geckolabs/elements/components/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@geckolabs/elements/components/dialog"
import { Input } from "@geckolabs/elements/components/input"
import { Label } from "@geckolabs/elements/components/label"

type WorkflowSaveTemplateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  onNameChange: (name: string) => void
  onSave: () => void
  saving?: boolean
}

export function WorkflowSaveTemplateDialog({
  open,
  onOpenChange,
  name,
  onNameChange,
  onSave,
  saving = false,
}: WorkflowSaveTemplateDialogProps) {
  const trimmedName = name.trim()
  const canSave = trimmedName.length > 0 && !saving

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>Save as template</DialogTitle>
            <DialogDescription>
              Give this template a name so you can reuse it when building
              workflows.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-2">
            <Label htmlFor="workflow-template-name">Template name</Label>
            <Input
              id="workflow-template-name"
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
          <Button type="button" disabled={!canSave} onClick={onSave}>
            <CheckCheck data-icon="inline-start" aria-hidden />
            {saving ? "Saving…" : "Save template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
