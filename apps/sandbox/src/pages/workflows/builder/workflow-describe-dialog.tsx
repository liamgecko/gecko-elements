import * as React from "react"
import { WandSparkles } from "lucide-react"

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
import { Textarea } from "@gecko/ui/components/textarea"

const EXAMPLE_PROMPT =
  'I want to create a workflow that after a conversation closes, and channel was "Admissions live chat" then add a label of "Admissions" to the conversation'

type WorkflowDescribeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBuild: (prompt: string) => void
  building?: boolean
}

export function WorkflowDescribeDialog({
  open,
  onOpenChange,
  onBuild,
  building = false,
}: WorkflowDescribeDialogProps) {
  const [prompt, setPrompt] = React.useState(EXAMPLE_PROMPT)

  React.useEffect(() => {
    if (open) {
      setPrompt(EXAMPLE_PROMPT)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" showCloseButton={false}>
        <DialogWrapper>
          <DialogHeader>
            <DialogTitle>Describe your workflow</DialogTitle>
            <DialogDescription>
              Tell the agent what you want to automate. For this preview, the
              admissions labelling example is fully supported.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Textarea
              value={prompt}
              onChange={(event) => setPrompt(event.currentTarget.value)}
              rows={5}
              className="min-h-28 resize-none"
              disabled={building}
            />
          </DialogBody>
        </DialogWrapper>
        <DialogFooter showCloseButton closeButtonText="Cancel">
          <Button
            type="button"
            disabled={building || !prompt.trim()}
            onClick={() => onBuild(prompt.trim())}
          >
            <WandSparkles data-icon="inline-start" aria-hidden />
            {building ? "Building…" : "Build workflow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
