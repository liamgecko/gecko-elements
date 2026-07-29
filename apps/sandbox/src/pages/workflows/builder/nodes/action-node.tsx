import { Handle, Position, type NodeProps } from "@xyflow/react"

import type { WorkflowGraphNodeData } from "../../workflows-data"
import { useWorkflowNodeInvalid } from "../use-workflow-node-invalid"
import { WorkflowNodeAddNext } from "./workflow-node-add-next"
import { WorkflowNodeBody, WorkflowNodeShell } from "./workflow-node-body"

export function ActionNode({ id, data, selected }: NodeProps) {
  const nodeData = data as WorkflowGraphNodeData
  const { invalid } = useWorkflowNodeInvalid(id, nodeData)

  return (
    <>
      <WorkflowNodeShell selected={selected} invalid={invalid}>
        <Handle
          type="target"
          position={Position.Top}
          className="!size-2.5 !border-2 !border-background !bg-primary"
        />
        <WorkflowNodeBody data={nodeData} kind="action" invalid={invalid} />
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
