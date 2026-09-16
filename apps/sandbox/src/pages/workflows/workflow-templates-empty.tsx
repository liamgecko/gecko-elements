import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import LayoutTemplate from "@hugeicons/core-free-icons/Layout01Icon";
import Plus from "@hugeicons/core-free-icons/PlusIcon";
import { useNavigate } from "react-router-dom"

import { Button } from "@geckolabs/elements/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@geckolabs/elements/components/empty"

import { getWorkflowTemplateNewPath } from "./workflows-data"

export function WorkflowTemplatesEmpty() {
  const navigate = useNavigate()

  return (
    <Empty>
      <EmptyMedia variant="icon">
        <HugeiconsIcon icon={LayoutTemplate} aria-hidden />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No templates yet</EmptyTitle>
        <EmptyDescription>
          Create a template from scratch or save an existing workflow as a
          template to reuse when building new workflows.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          type="button"
          onClick={() => navigate(getWorkflowTemplateNewPath())}
        >
          <HugeiconsIcon icon={Plus} data-icon="inline-start" aria-hidden />
          Create new template
        </Button>
      </EmptyContent>
    </Empty>
  )
}
