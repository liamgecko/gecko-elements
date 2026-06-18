import { Handle, Position, type NodeProps } from "@xyflow/react"

import type { WorkflowGraphNodeData } from "../../workflows-data"
import { WorkflowNodeAddNext } from "./workflow-node-add-next"
import { WorkflowNodeBody, WorkflowNodeShell } from "./workflow-node-body"

export function TriggerNode({ data, selected }: NodeProps) {
  const nodeData = data as WorkflowGraphNodeData

  return (
    <>
      <WorkflowNodeShell selected={selected}>
        <WorkflowNodeBody data={nodeData} kind="trigger" />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!size-2.5 !border-2 !border-background !bg-primary"
        />
      </WorkflowNodeShell>
      <WorkflowNodeAddNext />
    </>
  )
}
