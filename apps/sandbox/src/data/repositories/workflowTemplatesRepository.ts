import { mapWorkflowTemplateRowToWorkflowTemplate } from "../mappers/workflowTemplateMapper"
import { getSupabaseClient } from "../../lib/supabase/client"
import { generateSandboxId } from "../../lib/supabase/generate-id"
import {
  DEFAULT_CREATOR_USER_ID,
  SANDBOX_ACCOUNT_ID,
} from "../../lib/supabase/constants"
import type { WorkflowTemplateWithRelations } from "../../lib/supabase/types"
import type {
  WorkflowDefinition,
  WorkflowTemplate,
} from "../../pages/workflows/workflows-data"
import { deriveWorkflowMetadata } from "../../pages/workflows/builder/derive-workflow-metadata"

const TEMPLATE_SELECT = `
  id,
  name,
  definition,
  action_type,
  trigger_type,
  source_workflow_id,
  created_at,
  created_by_user_id,
  created_by:users!workflow_templates_created_by_user_id_fkey ( name, initials )
`

export type CreateWorkflowTemplateInput = {
  name: string
  definition: WorkflowDefinition
  sourceWorkflowId?: string | null
}

export type UpdateWorkflowTemplateInput = {
  name?: string
  definition?: WorkflowDefinition
}

export class WorkflowTemplatesRepositoryError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = "WorkflowTemplatesRepositoryError"
  }
}

function mapRows(
  rows: WorkflowTemplateWithRelations[] | null,
): WorkflowTemplate[] {
  if (!rows) return []
  return rows.map(mapWorkflowTemplateRowToWorkflowTemplate)
}

export const workflowTemplatesRepository = {
  async listTemplates(): Promise<WorkflowTemplate[]> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("workflow_templates")
      .select(TEMPLATE_SELECT)
      .eq("account_id", SANDBOX_ACCOUNT_ID)
      .order("name", { ascending: true })

    if (error) {
      throw new WorkflowTemplatesRepositoryError(
        "Failed to load workflow templates",
        error,
      )
    }

    return mapRows(data as WorkflowTemplateWithRelations[] | null)
  },

  async getTemplateById(templateId: string): Promise<WorkflowTemplate | null> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("workflow_templates")
      .select(TEMPLATE_SELECT)
      .eq("id", templateId)
      .maybeSingle()

    if (error) {
      throw new WorkflowTemplatesRepositoryError(
        `Failed to load workflow template ${templateId}`,
        error,
      )
    }

    if (!data) return null

    return mapWorkflowTemplateRowToWorkflowTemplate(
      data as WorkflowTemplateWithRelations,
    )
  },

  async createTemplate(input: CreateWorkflowTemplateInput): Promise<WorkflowTemplate> {
    const supabase = getSupabaseClient()
    const { triggerType, actionType } = deriveWorkflowMetadata(input.definition)

    const { data, error } = await supabase
      .from("workflow_templates")
      .insert({
        id: generateSandboxId(),
        account_id: SANDBOX_ACCOUNT_ID,
        name: input.name.trim(),
        definition: input.definition,
        trigger_type: triggerType,
        action_type: actionType,
        source_workflow_id: input.sourceWorkflowId ?? null,
        created_by_user_id: DEFAULT_CREATOR_USER_ID,
      })
      .select(TEMPLATE_SELECT)
      .single()

    if (error) {
      throw new WorkflowTemplatesRepositoryError(
        "Failed to save workflow template",
        error,
      )
    }

    return mapWorkflowTemplateRowToWorkflowTemplate(
      data as WorkflowTemplateWithRelations,
    )
  },

  async updateTemplate(
    templateId: string,
    input: UpdateWorkflowTemplateInput,
  ): Promise<WorkflowTemplate> {
    const supabase = getSupabaseClient()

    const updates: {
      updated_at: string
      name?: string
      definition?: WorkflowDefinition
      trigger_type?: WorkflowTemplate["triggerType"]
      action_type?: WorkflowTemplate["actionType"]
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
      .from("workflow_templates")
      .update(updates)
      .eq("id", templateId)
      .select(TEMPLATE_SELECT)
      .single()

    if (error) {
      throw new WorkflowTemplatesRepositoryError(
        "Failed to update workflow template",
        error,
      )
    }

    return mapWorkflowTemplateRowToWorkflowTemplate(
      data as WorkflowTemplateWithRelations,
    )
  },

  async deleteTemplates(templateIds: string[]): Promise<void> {
    if (templateIds.length === 0) return

    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("workflow_templates")
      .delete()
      .in("id", templateIds)

    if (error) {
      throw new WorkflowTemplatesRepositoryError(
        "Failed to delete workflow templates",
        error,
      )
    }
  },
}
