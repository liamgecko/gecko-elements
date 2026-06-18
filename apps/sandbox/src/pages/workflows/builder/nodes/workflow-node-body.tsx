import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

import type { WorkflowGraphNodeData, WorkflowNodeKind } from "../../workflows-data"
import {
  getNodeDisplayDescription,
  getNodeDisplayName,
} from "../workflow-graph-types"
import { getWorkflowNodeCatalogEntry } from "../workflow-node-catalog"

export const workflowNodeBaseClassName =
  "min-w-52 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-[border-color]"

/** Matches `min-w-52` and typical card height for canvas placement. */
export const WORKFLOW_NODE_DIMENSIONS = {
  width: 208,
  height: 76,
} as const

export function getWorkflowNodeClassName(selected = false) {
  return cn(
    workflowNodeBaseClassName,
    selected
      ? "border-gray-400 dark:border-gray-500"
      : "border-border",
  )
}

type WorkflowNodeShellProps = {
  selected?: boolean
  children: React.ReactNode
}

export function WorkflowNodeShell({ selected = false, children }: WorkflowNodeShellProps) {
  return <div className={getWorkflowNodeClassName(selected)}>{children}</div>
}

type WorkflowNodeBodyProps = {
  data: WorkflowGraphNodeData
  kind: WorkflowNodeKind
  children?: React.ReactNode
}

export function WorkflowNodeBody({ data, kind, children }: WorkflowNodeBodyProps) {
  const catalogEntry = getWorkflowNodeCatalogEntry(kind)
  const Icon = catalogEntry.icon
  const displayName = getNodeDisplayName(data)
  const displayDescription = getNodeDisplayDescription(data)

  return (
    <>
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
          <Icon
            aria-hidden
            className={cn(
              "size-4 text-foreground",
              catalogEntry.iconClassName,
            )}
          />
        </span>
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <span className="text-sm font-medium leading-none">{displayName}</span>
          <p className="text-xs leading-normal text-muted-foreground">
            {displayDescription}
          </p>
        </span>
      </div>
      {children}
    </>
  )
}
