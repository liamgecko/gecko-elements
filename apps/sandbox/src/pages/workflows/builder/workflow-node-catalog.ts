import {
  CirclePlay,
  Split,
  Timer,
  Waypoints,
  Workflow,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { WorkflowNodeKind } from "../workflows-data"

export type WorkflowNodeCatalogEntry = {
  kind: WorkflowNodeKind
  title: string
  description: string
  icon: LucideIcon
  iconClassName?: string
}

export const WORKFLOW_NODE_CATALOG: Record<
  WorkflowNodeKind,
  WorkflowNodeCatalogEntry
> = {
  trigger: {
    kind: "trigger",
    title: "Trigger",
    description: "Initiate workflows",
    icon: Workflow,
  },
  condition: {
    kind: "condition",
    title: "Conditions",
    description: "Filter contacts by rules",
    icon: Waypoints,
  },
  action: {
    kind: "action",
    title: "Actions",
    description: "Perform actions based on triggers",
    icon: CirclePlay,
  },
  decision: {
    kind: "decision",
    title: "Decision",
    description: "Branch the workflow",
    icon: Split,
    iconClassName: "-scale-y-100",
  },
  delay: {
    kind: "delay",
    title: "Delay",
    description: "Pause the workflow",
    icon: Timer,
  },
  "ai-agent": {
    kind: "ai-agent",
    title: "AI agent",
    description: "Delegate tasks",
    icon: Zap,
  },
}

export const WORKFLOW_NODE_CATALOG_LIST = Object.values(WORKFLOW_NODE_CATALOG)

export function getWorkflowNodeCatalogEntry(kind: WorkflowNodeKind) {
  return WORKFLOW_NODE_CATALOG[kind]
}

export function getNodeSettingsSectionTitle(kind: WorkflowNodeKind) {
  return `${getWorkflowNodeCatalogEntry(kind).title} settings`
}
