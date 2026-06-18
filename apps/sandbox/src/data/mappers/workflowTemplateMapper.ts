import type {
  WorkflowDefinition,
  WorkflowTemplate,
} from "../../pages/workflows/workflows-data"
import type { WorkflowTemplateWithRelations } from "../../lib/supabase/types"

function parseWorkflowDefinition(
  value: Record<string, unknown> | null | undefined,
): WorkflowDefinition | null {
  if (!value || typeof value !== "object") return null

  const nodes = value.nodes
  const edges = value.edges

  if (!Array.isArray(nodes) || !Array.isArray(edges)) return null

  return { nodes, edges } as WorkflowDefinition
}

export function mapWorkflowTemplateRowToWorkflowTemplate(
  row: WorkflowTemplateWithRelations,
): WorkflowTemplate {
  const createdBy = row.created_by

  if (!createdBy) {
    throw new Error(`Workflow template ${row.id} is missing required relations`)
  }

  return {
    id: row.id,
    name: row.name,
    definition: parseWorkflowDefinition(row.definition),
    actionType: row.action_type,
    triggerType: row.trigger_type,
    sourceWorkflowId: row.source_workflow_id,
    createdByUserId: row.created_by_user_id,
    createdBy: {
      name: createdBy.name,
      initials: createdBy.initials,
      createdAt: row.created_at,
    },
  }
}
