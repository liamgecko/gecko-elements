import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import Plus from "@hugeicons/core-free-icons/PlusIcon";
import Workflow from "@hugeicons/core-free-icons/WorkflowSquare01Icon";

import { Button } from "@geckolabs/elements/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@geckolabs/elements/components/empty"

import { useWorkflowCreateDialog } from "./workflow-create-dialog"

export function WorkflowsEmpty() {
  const { openCreateWorkflowDialog } = useWorkflowCreateDialog()

  return (
    <Empty>
      <EmptyMedia variant="icon">
        <HugeiconsIcon icon={Workflow} aria-hidden />
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
          <HugeiconsIcon icon={Plus} data-icon="inline-start" aria-hidden />
          Create a new workflow
        </Button>
      </EmptyContent>
    </Empty>
  )
}
