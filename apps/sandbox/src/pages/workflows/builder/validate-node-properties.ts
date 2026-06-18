import type { WorkflowActionType, WorkflowGraphNodeData } from "../workflows-data"
import { isAddLabelAction } from "../workflows-data"

export type NodePropertiesValidationErrors = {
  labelIds?: string
  agentOrTeamIds?: string
}

export function validateNodeProperties(
  data: WorkflowGraphNodeData,
): NodePropertiesValidationErrors {
  const errors: NodePropertiesValidationErrors = {}

  const actionType = (data.actionType ?? data.subtype) as
    | WorkflowActionType
    | undefined

  if (data.kind === "action" && isAddLabelAction(actionType)) {
    if (!data.labelIds?.length) {
      errors.labelIds = "Please select at least one label."
    }
  }

  if (data.kind === "condition" && data.conditionField === "agents-or-teams") {
    if (!data.agentOrTeamIds?.length) {
      errors.agentOrTeamIds = "Please select at least one agent or team."
    }
  }

  return errors
}

export function hasNodePropertiesValidationErrors(
  errors: NodePropertiesValidationErrors,
) {
  return Object.keys(errors).length > 0
}
