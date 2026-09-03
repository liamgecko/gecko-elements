import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

import type { WorkflowGraphNodeData, WorkflowNodeKind } from "../../workflows-data"
import {
  getNodeDisplayDescription,
  getNodeDisplayName,
} from "../workflow-graph-types"
import { getWorkflowNodeCatalogEntry } from "../workflow-node-catalog"

export const workflowNodeBaseClassName =
  "min-w-52 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-[border-color,color]"

/** Matches `min-w-52` and typical card height for canvas placement. */
export const WORKFLOW_NODE_DIMENSIONS = {
  width: 208,
  height: 76,
} as const

export function getWorkflowNodeClassName(selected = false, invalid = false) {
  return cn(
    workflowNodeBaseClassName,
    invalid
      ? "border-destructive"
      : selected
        ? "border-gray-400 dark:border-gray-500"
        : "border-border",
  )
}

type WorkflowNodeShellProps = {
  selected?: boolean
  invalid?: boolean
  children: React.ReactNode
}

export function WorkflowNodeShell({
  selected = false,
  invalid = false,
  children,
}: WorkflowNodeShellProps) {
  return (
    <div className={getWorkflowNodeClassName(selected, invalid)}>{children}</div>
  )
}

type WorkflowNodeBodyProps = {
  data: WorkflowGraphNodeData
  kind: WorkflowNodeKind
  invalid?: boolean
  children?: React.ReactNode
}

export function WorkflowNodeBody({
  data,
  kind,
  invalid = false,
  children,
}: WorkflowNodeBodyProps) {
  const catalogEntry = getWorkflowNodeCatalogEntry(kind)
  const Icon = catalogEntry.icon
  const displayName = getNodeDisplayName(data)
  const displayDescription = getNodeDisplayDescription(data)

  return (
    <>
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md",
            invalid ? "bg-destructive/10" : "bg-muted",
          )}
        >
          <Icon
            aria-hidden
            className={cn(
              "size-4",
              invalid ? "text-destructive" : "text-foreground",
              catalogEntry.iconClassName,
            )}
          />
        </span>
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <span
            className={cn(
              "text-sm font-medium leading-none",
              invalid && "text-destructive",
            )}
          >
            {displayName}
          </span>
          <p
            className={cn(
              "text-2xs leading-normal",
              invalid ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {displayDescription}
          </p>
        </span>
      </div>
      {children}
    </>
  )
}
