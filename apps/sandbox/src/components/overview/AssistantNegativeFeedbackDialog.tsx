"use client"

import { MessageCircleCheck, X } from "lucide-react"

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
import { Label } from "@gecko/ui/components/label"
import { Textarea } from "@gecko/ui/components/textarea"

export type AssistantNegativeFeedbackDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  feedback: string
  onFeedbackChange: (feedback: string) => void
  onSubmit: () => void
}

export function AssistantNegativeFeedbackDialog({
  open,
  onOpenChange,
  feedback,
  onFeedbackChange,
  onSubmit,
}: AssistantNegativeFeedbackDialogProps) {
  const trimmedFeedback = feedback.trim()
  const canSubmit = trimmedFeedback.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>What went wrong?</DialogTitle>
            <DialogDescription>
              Tell us what was unhelpful about this response so we can improve.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-2">
            <Label htmlFor="negative-response-feedback">Your feedback</Label>
            <Textarea
              id="negative-response-feedback"
              value={feedback}
              onChange={(e) => onFeedbackChange(e.currentTarget.value)}
              placeholder="What could have been better?"
              autoFocus
              rows={4}
            />
          </DialogBody>
        </DialogWrapper>
        <DialogFooter showCloseButton closeButtonText="Cancel" closeButtonIcon={X}>
          <Button type="button" disabled={!canSubmit} onClick={onSubmit}>
            <MessageCircleCheck data-icon="inline-start" aria-hidden />
            Submit feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
