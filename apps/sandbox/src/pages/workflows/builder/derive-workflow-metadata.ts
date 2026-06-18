import type {
  WorkflowActionType,
  WorkflowDbActionType,
  WorkflowDbTriggerType,
  WorkflowDefinition,
} from "../workflows-data"

const DB_TRIGGER_TYPES = new Set<WorkflowDbTriggerType>([
  "before-conversation",
  "during-conversation",
  "after-conversation-end",
])

const DEFAULT_TRIGGER_TYPE: WorkflowDbTriggerType = "before-conversation"
const DEFAULT_ACTION_TYPE: WorkflowDbActionType = "add-label"

function toDbActionType(
  actionType: WorkflowActionType | undefined,
): WorkflowDbActionType {
  if (!actionType) return DEFAULT_ACTION_TYPE

  switch (actionType) {
    case "add-label":
    case "add-label-to-contact":
      return "add-label"
    case "add-to-campaign":
      return "add-to-campaign"
    case "add-to-event":
    case "add-contact-to-event":
      return "add-to-event"
    case "send-message":
    case "email":
    case "sms":
    case "trigger-message-to-contact":
      return "send-message"
    case "assign-agent":
    case "assign-conversation-to-agent-or-team":
      return "assign-agent"
    default:
      return DEFAULT_ACTION_TYPE
  }
}

export function deriveWorkflowMetadata(definition: WorkflowDefinition): {
  triggerType: WorkflowDbTriggerType
  actionType: WorkflowDbActionType
} {
  const triggerNode = definition.nodes.find((node) => node.data.kind === "trigger")
  const actionNode = definition.nodes.find((node) => node.data.kind === "action")
  const triggerType = triggerNode?.data.triggerType ?? triggerNode?.data.subtype
  const actionType =
    actionNode?.data.actionType ??
    (actionNode?.data.subtype as WorkflowActionType | undefined)

  return {
    triggerType:
      triggerType &&
      DB_TRIGGER_TYPES.has(triggerType as WorkflowDbTriggerType)
        ? (triggerType as WorkflowDbTriggerType)
        : DEFAULT_TRIGGER_TYPE,
    actionType: toDbActionType(actionType),
  }
}
