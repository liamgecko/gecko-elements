import type { Form } from "../../pages/forms/forms/forms-data"
import type { FormWithRelations } from "../../lib/supabase/types"

export function mapFormRowToForm(row: FormWithRelations): Form {
  const createdBy = row.created_by

  if (!createdBy || !row.form_group) {
    throw new Error(`Form ${row.id} is missing required relations`)
  }

  return {
    id: row.id,
    name: row.name,
    lockStatus: row.lock_status,
    lockedBy: row.locked_by?.name,
    status: row.status,
    archived: row.archived,
    group: row.form_group.name,
    responseCount: row.response_count,
    createdBy: {
      name: createdBy.name,
      initials: createdBy.initials,
      createdAt: row.created_at,
    },
    archivedBy:
      row.archived && row.archived_by && row.archived_at
        ? {
            name: row.archived_by.name,
            initials: row.archived_by.initials,
            archivedAt: row.archived_at,
          }
        : undefined,
  }
}
