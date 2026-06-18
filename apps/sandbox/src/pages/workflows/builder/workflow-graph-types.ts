import type { Edge, Node } from "@xyflow/react"

import type {
  WorkflowGraphNodeData,
  WorkflowNodeKind,
} from "../workflows-data"
import { getWorkflowNodeCatalogEntry } from "./workflow-node-catalog"
import { WORKFLOW_NODE_DIMENSIONS } from "./nodes/workflow-node-body"

export const WORKFLOW_NODE_TYPES = {
  trigger: "trigger",
  condition: "condition",
  action: "action",
  decision: "decision",
  delay: "delay",
  "ai-agent": "ai-agent",
} as const

export const WORKFLOW_DRAG_MIME = "application/reactflow"

export const WORKFLOW_EDGE_TYPE = "smoothstep" as const

export const WORKFLOW_DEFAULT_EDGE_OPTIONS = {
  type: WORKFLOW_EDGE_TYPE,
  style: {
    strokeWidth: 1.5,
    strokeDasharray: "6 4",
  },
} satisfies Partial<Edge>

export function normalizeWorkflowEdge(edge: Edge): Edge {
  return {
    ...WORKFLOW_DEFAULT_EDGE_OPTIONS,
    ...edge,
    type: edge.type ?? WORKFLOW_EDGE_TYPE,
    style: {
      ...WORKFLOW_DEFAULT_EDGE_OPTIONS.style,
      ...edge.style,
    },
  }
}

export type WorkflowFlowNode = Node<WorkflowGraphNodeData>

const DEFAULT_CONDITION_RULE = "Contacts first name = Liam"

export function getNodeDisplayName(data: WorkflowGraphNodeData) {
  if (data.label?.trim()) return data.label.trim()
  return getWorkflowNodeCatalogEntry(data.kind).title
}

export function getNodeDisplayDescription(data: WorkflowGraphNodeData) {
  if (data.description?.trim()) return data.description.trim()
  return getWorkflowNodeCatalogEntry(data.kind).description
}

export function createWorkflowNode(
  kind: WorkflowNodeKind,
  position: { x: number; y: number },
): WorkflowFlowNode {
  const data: WorkflowGraphNodeData = { kind }

  if (kind === "condition") {
    data.rule = DEFAULT_CONDITION_RULE
  }

  return {
    id: crypto.randomUUID(),
    type: kind,
    position,
    data,
  }
}

export function getCenteredNodePosition(center: { x: number; y: number }) {
  return {
    x: center.x - WORKFLOW_NODE_DIMENSIONS.width / 2,
    y: center.y - WORKFLOW_NODE_DIMENSIONS.height / 2,
  }
}

export function getKindHeading(kind: WorkflowNodeKind) {
  switch (kind) {
    case "trigger":
      return "Trigger"
    case "condition":
      return "Condition"
    case "action":
      return "Action"
    case "decision":
      return "Decision"
    case "delay":
      return "Delay"
    case "ai-agent":
      return "AI agent"
  }
}

export function isLegacyBranchingConditionNode(node: WorkflowFlowNode) {
  if (node.type !== "condition" && node.data.kind !== "condition") return false

  return (
    node.data.label === "Condition" ||
    node.data.label === "Decision" ||
    !node.data.rule
  )
}

export function normalizeWorkflowFlowNode(node: WorkflowFlowNode): WorkflowFlowNode {
  if (!isLegacyBranchingConditionNode(node)) return node

  const legacyLabel =
    node.data.label === "Condition" || node.data.label === "Decision"

  return {
    ...node,
    type: "decision",
    data: {
      ...node.data,
      kind: "decision",
      label: legacyLabel ? undefined : node.data.label,
      rule: undefined,
    },
  }
}
