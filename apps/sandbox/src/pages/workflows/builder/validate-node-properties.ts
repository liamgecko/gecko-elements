import type { WorkflowActionType, WorkflowGraphNodeData } from "../workflows-data"
import { isAddLabelAction } from "../workflows-data"

export type NodePropertiesValidationErrors = {
  triggerType?: string
  conditionField?: string
  channelValue?: string
  agentsOrTeamsOperator?: string
  agentOrTeamIds?: string
  actionType?: string
  labelIds?: string
  delayType?: string
  fixedDelayAmount?: string
  fixedDelayUnit?: string
  delayUntil?: string
  aiAgentId?: string
}

function isBlank(value: string | undefined | null) {
  return value == null || value.trim() === ""
}

export function validateNodeProperties(
  data: WorkflowGraphNodeData,
): NodePropertiesValidationErrors {
  const errors: NodePropertiesValidationErrors = {}

  if (data.kind === "trigger") {
    if (!data.triggerType) {
      errors.triggerType = "Please select a trigger type."
    }
  }

  if (data.kind === "condition") {
    if (!data.conditionField) {
      errors.conditionField = "Please select a condition type."
    } else if (data.conditionField === "channel") {
      if (!data.channelValue) {
        errors.channelValue = "Please select a channel."
      }
    } else if (data.conditionField === "agents-or-teams") {
      if (!data.agentsOrTeamsOperator) {
        errors.agentsOrTeamsOperator = "Please select an operator."
      }
      if (!data.agentOrTeamIds?.length) {
        errors.agentOrTeamIds = "Please select at least one agent or team."
      }
    }
  }

  if (data.kind === "action") {
    const actionType = (data.actionType ?? data.subtype) as
      | WorkflowActionType
      | undefined

    if (!actionType) {
      errors.actionType = "Please select an action type."
    } else if (isAddLabelAction(actionType) && !data.labelIds?.length) {
      errors.labelIds = "Please select at least one label."
    }
  }

  if (data.kind === "delay") {
    if (!data.delayType) {
      errors.delayType = "Please select a delay type."
    } else if (data.delayType === "fixed") {
      if (isBlank(data.fixedDelayAmount)) {
        errors.fixedDelayAmount = "Please enter a delay duration."
      } else {
        const amount = Number(data.fixedDelayAmount)
        if (!Number.isFinite(amount) || amount < 1) {
          errors.fixedDelayAmount = "Delay duration must be at least 1."
        }
      }
      if (!data.fixedDelayUnit) {
        errors.fixedDelayUnit = "Please select a time unit."
      }
    } else if (data.delayType === "until-datetime") {
      if (!data.delayUntil) {
        errors.delayUntil = "Please select a date and time."
      }
    }
  }

  if (data.kind === "ai-agent") {
    if (!data.aiAgentId) {
      errors.aiAgentId = "Please select an AI agent."
    }
  }

  return errors
}

export function hasNodePropertiesValidationErrors(
  errors: NodePropertiesValidationErrors,
) {
  return Object.keys(errors).length > 0
}
