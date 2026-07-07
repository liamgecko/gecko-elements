import { Share, X } from "lucide-react"

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

export type AssistantShareConversationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  conversationTitle?: string
  email: string
  onEmailChange: (email: string) => void
  onShare: () => void
}

export function AssistantShareConversationDialog({
  open,
  onOpenChange,
  conversationTitle,
  email,
  onEmailChange,
  onShare,
}: AssistantShareConversationDialogProps) {
  const trimmedEmail = email.trim()
  const canShare = trimmedEmail.length > 0 && trimmedEmail.includes("@")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>Share conversation</DialogTitle>
            <DialogDescription>
              {conversationTitle
                ? `Invite someone to view “${conversationTitle}”.`
                : "Invite someone to view this conversation."}
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-2">
            <Label htmlFor="share-conversation-email">Email address</Label>
            <Input
              id="share-conversation-email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.currentTarget.value)}
              placeholder="name@example.com"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && canShare) {
                  e.preventDefault()
                  onShare()
                }
              }}
            />
          </DialogBody>
        </DialogWrapper>
        <DialogFooter showCloseButton closeButtonText="Cancel" closeButtonIcon={X}>
          <Button type="button" disabled={!canShare} onClick={onShare}>
            <Share data-icon="inline-start" aria-hidden />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
