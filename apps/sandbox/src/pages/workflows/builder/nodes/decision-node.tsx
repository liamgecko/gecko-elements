import { Handle, Position, type NodeProps } from "@xyflow/react"

import type { WorkflowGraphNodeData } from "../../workflows-data"
import { WorkflowNodeAddNext } from "./workflow-node-add-next"
import { WorkflowNodeBody, WorkflowNodeShell } from "./workflow-node-body"

export function DecisionNode({ data, selected }: NodeProps) {
  const nodeData = data as WorkflowGraphNodeData

  return (
    <>
      <WorkflowNodeShell selected={selected}>
        <Handle
          type="target"
          position={Position.Top}
          className="!size-2.5 !border-2 !border-background !bg-primary"
        />
        <WorkflowNodeBody data={nodeData} kind="decision">
          <div className="mt-3 flex justify-between gap-4 text-xs text-muted-foreground">
            <span>Yes</span>
            <span>No</span>
          </div>
        </WorkflowNodeBody>
        <Handle
          id="yes"
          type="source"
          position={Position.Bottom}
          className="!left-1/4 !size-2.5 !-translate-x-1/2 !border-2 !border-background !bg-emerald-500"
        />
        <Handle
          id="no"
          type="source"
          position={Position.Bottom}
          className="!left-3/4 !size-2.5 !-translate-x-1/2 !border-2 !border-background !bg-destructive"
        />
      </WorkflowNodeShell>
      <WorkflowNodeAddNext sourceHandle="yes" align="start" />
      <WorkflowNodeAddNext sourceHandle="no" align="end" />
    </>
  )
}
