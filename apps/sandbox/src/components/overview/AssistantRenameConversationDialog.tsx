import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import CheckCheck from "@hugeicons/core-free-icons/CheckCheckIcon";

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
            <DialogDescription>
              Update the name shown in your conversation history.
            </DialogDescription>
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
        <DialogFooter showCloseButton closeButtonText="Cancel">
          <Button type="button" disabled={!canSave} onClick={onSave}>
            <HugeiconsIcon icon={CheckCheck} data-icon="inline-start" aria-hidden />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
