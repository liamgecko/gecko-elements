import type { NodeTypes } from "@xyflow/react"

import { ActionNode } from "./nodes/action-node"
import { AiAgentNode } from "./nodes/ai-agent-node"
import { ConditionNode } from "./nodes/condition-node"
import { DecisionNode } from "./nodes/decision-node"
import { DelayNode } from "./nodes/delay-node"
import { TriggerNode } from "./nodes/trigger-node"
import { WORKFLOW_NODE_TYPES } from "./workflow-graph-types"

export const workflowNodeTypes: NodeTypes = {
  [WORKFLOW_NODE_TYPES.trigger]: TriggerNode,
  [WORKFLOW_NODE_TYPES.condition]: ConditionNode,
  [WORKFLOW_NODE_TYPES.action]: ActionNode,
  [WORKFLOW_NODE_TYPES.decision]: DecisionNode,
  [WORKFLOW_NODE_TYPES.delay]: DelayNode,
  [WORKFLOW_NODE_TYPES["ai-agent"]]: AiAgentNode,
}
