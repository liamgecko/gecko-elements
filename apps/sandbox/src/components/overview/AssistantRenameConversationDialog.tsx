import { CheckCheck, X } from "lucide-react"

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

export type AssistantRenameConversationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onTitleChange: (title: string) => void
  onSave: () => void
}

export function AssistantRenameConversationDialog({
  open,
  onOpenChange,
  title,
  onTitleChange,
  onSave,
}: AssistantRenameConversationDialogProps) {
  const trimmedTitle = title.trim()
  const canSave = trimmedTitle.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>Update the name shown in your conversation history.</DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-2">
            <Label htmlFor="rename-conversation-title">Conversation name</Label>
            <Input
              id="rename-conversation-title"
              value={title}
              onChange={(e) => onTitleChange(e.currentTarget.value)}
              placeholder="Conversation name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSave) {
                  e.preventDefault()
                  onSave()
                }
              }}
            />
          </DialogBody>
        </DialogWrapper>
        <DialogFooter showCloseButton closeButtonText="Cancel" closeButtonIcon={X}>
          <Button type="button" disabled={!canSave} onClick={onSave}>
            <CheckCheck data-icon="inline-start" aria-hidden />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
