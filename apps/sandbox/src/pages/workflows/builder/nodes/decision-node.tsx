import { Handle, Position, type NodeProps } from "@xyflow/react"

import { cn } from "@gecko/ui/lib/utils"

import type { WorkflowGraphNodeData } from "../../workflows-data"
import { useWorkflowNodeInvalid } from "../use-workflow-node-invalid"
import { WorkflowNodeAddNext } from "./workflow-node-add-next"
import { WorkflowNodeBody, WorkflowNodeShell } from "./workflow-node-body"

export function DecisionNode({ id, data, selected }: NodeProps) {
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
        <WorkflowNodeBody data={nodeData} kind="decision" invalid={invalid}>
          <div
            className={cn(
              "mt-3 flex justify-between gap-4 text-2xs",
              invalid ? "text-destructive" : "text-muted-foreground",
            )}
          >
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
