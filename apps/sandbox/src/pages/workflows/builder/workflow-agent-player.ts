import type { RefObject } from "react";
import { toast } from "@gecko/ui/components/toast";
import type { Edge } from "@xyflow/react";

import type { WorkflowGraphNodeData } from "../workflows-data";
import type { AgentCursorHandle } from "./agent-cursor/agent-cursor";
import { agentSleep } from "./agent-cursor/agent-cursor";
import {
  normalizeWorkflowEdge,
  type WorkflowFlowNode,
} from "./workflow-graph-types";
import { WORKFLOW_NODE_DIMENSIONS } from "./nodes/workflow-node-body";

const TRIGGER_ID = "agent-build-trigger";
const CONDITION_ID = "agent-build-condition";
const ACTION_ID = "agent-build-action";

const NODE_GAP_Y = 140;

export type WorkflowAgentPlayerContext = {
  cursor: RefObject<AgentCursorHandle | null>;
  getCanvasCenter: () => { x: number; y: number };
  setNodes: React.Dispatch<React.SetStateAction<WorkflowFlowNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setSelectedNodeId: (id: string | null) => void;
  setPropertiesOpen: (open: boolean) => void;
  fitView: (options?: { duration?: number }) => Promise<boolean>;
};

function createNode(
  id: string,
  kind: WorkflowGraphNodeData["kind"],
  position: { x: number; y: number },
  data: Partial<WorkflowGraphNodeData> = {},
): WorkflowFlowNode {
  return {
    id,
    type: kind,
    position,
    selected: false,
    data: { kind, ...data },
  };
}

function connectNodes(source: string, target: string): Edge {
  return normalizeWorkflowEdge({
    id: crypto.randomUUID(),
    source,
    target,
  });
}

export async function playAdmissionsWorkflowBuild(
  ctx: WorkflowAgentPlayerContext,
) {
  const cursor = ctx.cursor.current;
  if (!cursor) return;

  const center = ctx.getCanvasCenter();
  const baseX = center.x - WORKFLOW_NODE_DIMENSIONS.width / 2;
  const baseY = center.y - 180;

  ctx.setNodes([]);
  ctx.setEdges([]);
  ctx.setSelectedNodeId(null);
  ctx.setPropertiesOpen(false);

  await agentSleep(400);

  toast.add({
    title: "Planning workflow…",
    description: "After conversation closes → channel check → add label",
  });
  await agentSleep(800);

  // Trigger
  await cursor.moveToTarget('[data-agent-target="palette-trigger"]');
  await cursor.click();
  await agentSleep(300);

  const triggerNode = createNode(TRIGGER_ID, "trigger", {
    x: baseX,
    y: baseY,
  });
  ctx.setNodes([{ ...triggerNode, selected: true }]);
  ctx.setSelectedNodeId(TRIGGER_ID);
  ctx.setPropertiesOpen(true);

  await agentSleep(400);
  await cursor.moveToNode(TRIGGER_ID);
  await agentSleep(500);

  ctx.setNodes([
    {
      ...triggerNode,
      selected: true,
      data: {
        ...triggerNode.data,
        triggerType: "after-conversation-end",
      },
    },
  ]);
  toast.add({ title: "Trigger updated", type: "success" });
  await agentSleep(700);

  // Condition
  await cursor.moveToTarget('[data-agent-target="palette-condition"]');
  await cursor.click();
  await agentSleep(300);

  const conditionNode = createNode(CONDITION_ID, "condition", {
    x: baseX,
    y: baseY + NODE_GAP_Y,
  });
  ctx.setNodes([
    {
      ...triggerNode,
      selected: false,
      data: { ...triggerNode.data, triggerType: "after-conversation-end" },
    },
    { ...conditionNode, selected: true },
  ]);
  ctx.setEdges([connectNodes(TRIGGER_ID, CONDITION_ID)]);
  ctx.setSelectedNodeId(CONDITION_ID);

  await agentSleep(400);
  await cursor.moveToNode(CONDITION_ID);
  await agentSleep(500);

  ctx.setNodes([
    {
      ...triggerNode,
      selected: false,
      data: { ...triggerNode.data, triggerType: "after-conversation-end" },
    },
    {
      ...conditionNode,
      selected: true,
      data: {
        ...conditionNode.data,
        conditionField: "channel",
        channelValue: "admissions-live-chat",
      },
    },
  ]);
  toast.add({ title: "Condition updated", type: "success" });
  await agentSleep(700);

  // Action
  await cursor.moveToTarget('[data-agent-target="palette-action"]');
  await cursor.click();
  await agentSleep(300);

  const actionNode = createNode(ACTION_ID, "action", {
    x: baseX,
    y: baseY + NODE_GAP_Y * 2,
  });
  ctx.setNodes([
    {
      ...triggerNode,
      selected: false,
      data: { ...triggerNode.data, triggerType: "after-conversation-end" },
    },
    {
      ...conditionNode,
      selected: false,
      data: {
        ...conditionNode.data,
        conditionField: "channel",
        channelValue: "admissions-live-chat",
      },
    },
    { ...actionNode, selected: true },
  ]);
  ctx.setEdges([
    connectNodes(TRIGGER_ID, CONDITION_ID),
    connectNodes(CONDITION_ID, ACTION_ID),
  ]);
  ctx.setSelectedNodeId(ACTION_ID);

  await agentSleep(400);
  await cursor.moveToNode(ACTION_ID);
  await agentSleep(500);

  ctx.setNodes([
    {
      ...triggerNode,
      selected: false,
      data: { ...triggerNode.data, triggerType: "after-conversation-end" },
    },
    {
      ...conditionNode,
      selected: false,
      data: {
        ...conditionNode.data,
        conditionField: "channel",
        channelValue: "admissions-live-chat",
      },
    },
    {
      ...actionNode,
      selected: true,
      data: {
        ...actionNode.data,
        actionType: "add-label-to-conversation",
        labelIds: ["label-admissions"],
      },
    },
  ]);
  toast.add({ title: "Action updated", type: "success" });
  await agentSleep(600);

  ctx.setPropertiesOpen(false);
  ctx.setSelectedNodeId(null);
  ctx.setNodes((nodes) => nodes.map((node) => ({ ...node, selected: false })));

  await ctx.fitView({ duration: 800 });
  await agentSleep(400);

  toast.add({
    title: "Workflow built",
    type: "success",
    description: "Your admissions labelling workflow is ready to review.",
  });
}
