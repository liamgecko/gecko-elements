import { Plus, Workflow } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"

import { useWorkflowCreateDialog } from "./workflow-create-dialog"

export function WorkflowsEmpty() {
  const { openCreateWorkflowDialog } = useWorkflowCreateDialog()

  return (
    <Empty>
      <EmptyMedia variant="icon">
        <Workflow aria-hidden />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No workflows yet</EmptyTitle>
        <EmptyDescription>
          Create a workflow to automate actions for your contacts based on
          triggers and conditions.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" onClick={openCreateWorkflowDialog}>
          <Plus data-icon="inline-start" aria-hidden />
          Create a new workflow
        </Button>
      </EmptyContent>
    </Empty>
  )
}
