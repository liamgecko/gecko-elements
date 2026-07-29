import { useStore, type Edge } from "@xyflow/react"

import type { WorkflowGraphNodeData } from "../workflows-data"

export function isWorkflowNodeDisconnected(
  kind: WorkflowGraphNodeData["kind"],
  nodeId: string,
  edges: ReadonlyArray<Pick<Edge, "target">>,
) {
  if (kind === "trigger") return false
  return !edges.some((edge) => edge.target === nodeId)
}

export function isWorkflowNodeInvalid(
  data: WorkflowGraphNodeData,
  nodeId: string,
  edges: ReadonlyArray<Pick<Edge, "target">>,
) {
  return (
    Boolean(data.hasPropertiesError) ||
    isWorkflowNodeDisconnected(data.kind, nodeId, edges)
  )
}

export function useWorkflowNodeInvalid(
  nodeId: string,
  data: WorkflowGraphNodeData,
) {
  const isDisconnected = useStore((state) =>
    isWorkflowNodeDisconnected(data.kind, nodeId, state.edges),
  )

  return {
    invalid: Boolean(data.hasPropertiesError) || isDisconnected,
    isDisconnected,
  }
}
