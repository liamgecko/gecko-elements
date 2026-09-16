import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import * as React from "react"
import LayoutTemplate from "@hugeicons/core-free-icons/Layout01Icon";
import WandSparkles from "@hugeicons/core-free-icons/MagicWand01Icon";
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

import { WorkflowTemplateSelectorDialog } from "./workflow-template-selector-dialog"
import { WorkflowDescribeDialog } from "./workflow-describe-dialog"
import { getWorkflowNodeCatalogEntry } from "./workflow-node-catalog"

type WorkflowCanvasEmptyProps = {
  variant?: "workflow" | "template"
  onInsertTrigger?: () => void
  onDescribeWorkflow?: () => void
  agentBuilding?: boolean
}

export function WorkflowCanvasEmpty({
  variant = "workflow",
  onInsertTrigger,
  onDescribeWorkflow,
  agentBuilding = false,
}: WorkflowCanvasEmptyProps) {
  const [templateSelectorOpen, setTemplateSelectorOpen] = React.useState(false)
  const [describeDialogOpen, setDescribeDialogOpen] = React.useState(false)
  const isTemplate = variant === "template"
  const TriggerIcon = getWorkflowNodeCatalogEntry("trigger").icon

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-6">
        <Empty className="max-w-md border-none p-0">
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={Workflow} aria-hidden />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>
              {isTemplate ? "Workflow template empty" : "Workflow empty"}
            </EmptyTitle>
            <EmptyDescription>
              {isTemplate
                ? "Add a trigger or let our AI agent build your workflow template for you"
                : "Choose from a template or let our AI agent build your workflow for you"}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
              {isTemplate ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onInsertTrigger}
                  disabled={agentBuilding}
                >
                  <HugeiconsIcon icon={TriggerIcon} data-icon="inline-start" aria-hidden />
                  Add a trigger
                </Button>
              ) : null}
              {!isTemplate ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTemplateSelectorOpen(true)}
                  disabled={agentBuilding}
                >
                  <HugeiconsIcon icon={LayoutTemplate} data-icon="inline-start" aria-hidden />
                  Select a template
                </Button>
              ) : null}
              <Button
                type="button"
                disabled={agentBuilding}
                onClick={() => setDescribeDialogOpen(true)}
              >
                <HugeiconsIcon icon={WandSparkles} data-icon="inline-start" aria-hidden />
                Describe your workflow
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>

      {!isTemplate ? (
        <WorkflowTemplateSelectorDialog
          open={templateSelectorOpen}
          onOpenChange={setTemplateSelectorOpen}
        />
      ) : null}

      <WorkflowDescribeDialog
        open={describeDialogOpen}
        onOpenChange={setDescribeDialogOpen}
        building={agentBuilding}
        onBuild={() => {
          setDescribeDialogOpen(false)
          onDescribeWorkflow?.()
        }}
      />
    </>
  )
}
