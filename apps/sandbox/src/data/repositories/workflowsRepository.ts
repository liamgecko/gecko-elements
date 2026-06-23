import { mapWorkflowRowToWorkflow } from "../mappers/workflowMapper"
import { getSupabaseClient } from "../../lib/supabase/client"
import { generateSandboxId } from "../../lib/supabase/generate-id"
import {
  DEFAULT_CREATOR_USER_ID,
  SANDBOX_ACCOUNT_ID,
} from "../../lib/supabase/constants"
import type { WorkflowWithRelations } from "../../lib/supabase/types"
import type {
  Workflow,
  WorkflowDefinition,
} from "../../pages/workflows/workflows-data"
import { deriveWorkflowMetadata } from "../../pages/workflows/builder/derive-workflow-metadata"

const WORKFLOW_SELECT = `
  id,
  name,
  lock_status,
  locked_by_user_id,
  enabled,
  last_run,
  action_type,
  trigger_type,
  label_ids,
  definition,
  created_at,
  created_by_user_id,
  created_by:users!workflows_created_by_user_id_fkey ( name, initials ),
  locked_by:users!workflows_locked_by_user_id_fkey ( name )
`

export type CreateWorkflowInput = {
  name: string
  definition: WorkflowDefinition
}

export type UpdateWorkflowInput = {
  name?: string
  definition?: WorkflowDefinition
}

export class WorkflowsRepositoryError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = "WorkflowsRepositoryError"
  }
}

function mapRows(rows: WorkflowWithRelations[] | null): Workflow[] {
  if (!rows) return []
  return rows.map(mapWorkflowRowToWorkflow)
}

export const workflowsRepository = {
  async listWorkflows(): Promise<Workflow[]> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("workflows")
      .select(WORKFLOW_SELECT)
      .eq("account_id", SANDBOX_ACCOUNT_ID)
      .order("name", { ascending: true })

    if (error) {
      throw new WorkflowsRepositoryError("Failed to load workflows", error)
    }

    return mapRows(data as WorkflowWithRelations[] | null)
  },

  async getWorkflowById(workflowId: string): Promise<Workflow | null> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("workflows")
      .select(WORKFLOW_SELECT)
      .eq("id", workflowId)
      .maybeSingle()

    if (error) {
      throw new WorkflowsRepositoryError(
        `Failed to load workflow ${workflowId}`,
        error,
      )
    }

    if (!data) return null

    return mapWorkflowRowToWorkflow(data as WorkflowWithRelations)
  },

  async updateWorkflowEnabled(
    workflowId: string,
    enabled: boolean,
  ): Promise<void> {
    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("workflows")
      .update({ enabled })
      .eq("id", workflowId)

    if (error) {
      throw new WorkflowsRepositoryError(
        "Failed to update workflow status",
        error,
      )
    }
  },

  async updateWorkflowsEnabled(
    workflowIds: string[],
    enabled: boolean,
  ): Promise<void> {
    if (workflowIds.length === 0) return

    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("workflows")
      .update({ enabled })
      .in("id", workflowIds)

    if (error) {
      throw new WorkflowsRepositoryError(
        "Failed to update workflow statuses",
        error,
      )
    }
  },

  async deleteWorkflows(workflowIds: string[]): Promise<void> {
    if (workflowIds.length === 0) return

    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("workflows")
      .delete()
      .in("id", workflowIds)

    if (error) {
      throw new WorkflowsRepositoryError("Failed to delete workflows", error)
    }
  },

  async createWorkflow(input: CreateWorkflowInput): Promise<Workflow> {
    const supabase = getSupabaseClient()
    const { triggerType, actionType } = deriveWorkflowMetadata(input.definition)

    const { data, error } = await supabase
      .from("workflows")
      .insert({
        id: generateSandboxId(),
        account_id: SANDBOX_ACCOUNT_ID,
        name: input.name.trim(),
        lock_status: "unlocked",
        enabled: true,
        trigger_type: triggerType,
        action_type: actionType,
        label_ids: [],
        definition: input.definition,
        created_by_user_id: DEFAULT_CREATOR_USER_ID,
      })
      .select(WORKFLOW_SELECT)
      .single()

    if (error) {
      throw new WorkflowsRepositoryError("Failed to create workflow", error)
    }

    return mapWorkflowRowToWorkflow(data as WorkflowWithRelations)
  },

  async updateWorkflow(
    workflowId: string,
    input: UpdateWorkflowInput,
  ): Promise<Workflow> {
    const supabase = getSupabaseClient()

    const updates: {
      updated_at: string
      name?: string
      definition?: WorkflowDefinition
      trigger_type?: Workflow["triggerType"]
      action_type?: Workflow["actionType"]
    } = {
      updated_at: new Date().toISOString(),
    }

    if (input.name != null) {
      updates.name = input.name.trim()
    }

    if (input.definition != null) {
      const { triggerType, actionType } = deriveWorkflowMetadata(input.definition)
      updates.definition = input.definition
      updates.trigger_type = triggerType
      updates.action_type = actionType
    }

    const { data, error } = await supabase
      .from("workflows")
      .update(updates)
      .eq("id", workflowId)
      .select(WORKFLOW_SELECT)
      .single()

    if (error) {
      throw new WorkflowsRepositoryError("Failed to update workflow", error)
    }

    return mapWorkflowRowToWorkflow(data as WorkflowWithRelations)
  },
}
