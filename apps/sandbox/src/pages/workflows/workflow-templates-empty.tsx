import { LayoutTemplate, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@gecko/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"

import { getWorkflowTemplateNewPath } from "./workflows-data"

export function WorkflowTemplatesEmpty() {
  const navigate = useNavigate()

  return (
    <Empty>
      <EmptyMedia variant="icon">
        <LayoutTemplate aria-hidden />
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
          <Plus data-icon="inline-start" aria-hidden />
          Create new template
        </Button>
      </EmptyContent>
    </Empty>
  )
}
