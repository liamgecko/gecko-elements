import type { Workflow, WorkflowDefinition } from "../../pages/workflows/workflows-data"
import type { WorkflowWithRelations } from "../../lib/supabase/types"

function parseWorkflowDefinition(
  value: Record<string, unknown> | null | undefined,
): WorkflowDefinition | null {
  if (!value || typeof value !== "object") return null

  const nodes = value.nodes
  const edges = value.edges

  if (!Array.isArray(nodes) || !Array.isArray(edges)) return null

  return { nodes, edges } as WorkflowDefinition
}

export function mapWorkflowRowToWorkflow(row: WorkflowWithRelations): Workflow {
  const createdBy = row.created_by

  if (!createdBy) {
    throw new Error(`Workflow ${row.id} is missing required relations`)
  }

  return {
    id: row.id,
    name: row.name,
    lockStatus: row.lock_status,
    lockedBy: row.locked_by?.name,
    enabled: row.enabled,
    lastRun: row.last_run,
    actionType: row.action_type,
    triggerType: row.trigger_type,
    labelIds: row.label_ids ?? [],
    definition: parseWorkflowDefinition(row.definition),
    createdByUserId: row.created_by_user_id,
    createdBy: {
      name: createdBy.name,
      initials: createdBy.initials,
      createdAt: row.created_at,
    },
  }
}
