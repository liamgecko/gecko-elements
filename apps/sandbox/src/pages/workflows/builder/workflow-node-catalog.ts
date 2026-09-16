import type { IconSvgElement } from "@geckolabs/elements/lib/icon";
import CirclePlay from "@hugeicons/core-free-icons/PlayCircleIcon";
import Split from "@hugeicons/core-free-icons/SplitIcon";
import Timer from "@hugeicons/core-free-icons/Timer01Icon";
import Waypoints from "@hugeicons/core-free-icons/WorkflowCircle01Icon";
import Workflow from "@hugeicons/core-free-icons/WorkflowSquare01Icon";
import Zap from "@hugeicons/core-free-icons/FlashIcon";


import type { WorkflowNodeKind } from "../workflows-data"

export type WorkflowNodeCatalogEntry = {
  kind: WorkflowNodeKind
  title: string
  description: string
  icon: IconSvgElement
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
    description: "Set the conditions to be met",
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

export const WORKFLOW_NODE_CATALOG_LIST = Object.values(
  WORKFLOW_NODE_CATALOG,
).filter((entry) => entry.kind !== "ai-agent") // temp: hide from palette + add-next menu

export function getWorkflowNodeCatalogEntry(kind: WorkflowNodeKind) {
  return WORKFLOW_NODE_CATALOG[kind]
}

export function getNodeSettingsSectionTitle(kind: WorkflowNodeKind) {
  return `${getWorkflowNodeCatalogEntry(kind).title} settings`
}
