import { mapFormRowToForm } from "../mappers/formMapper"
import { generateSandboxId } from "../../lib/supabase/generate-id"
import { getSupabaseClient } from "../../lib/supabase/client"
import {
  DEFAULT_CREATOR_USER_ID,
  DEFAULT_FORM_GROUP_ID,
  SANDBOX_ACCOUNT_ID,
} from "../../lib/supabase/constants"
import type { FormWithRelations } from "../../lib/supabase/types"
import type { Form, FormLockStatus, FormStatus } from "../../pages/forms/forms/forms-data"

const FORM_SELECT = `
  id,
  name,
  status,
  lock_status,
  archived,
  archived_at,
  response_count,
  created_at,
  form_group:form_groups ( name ),
  created_by:users!forms_created_by_user_id_fkey ( name, initials ),
  locked_by:users!forms_locked_by_user_id_fkey ( name ),
  archived_by:users!forms_archived_by_user_id_fkey ( name, initials )
`

export class FormsRepositoryError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = "FormsRepositoryError"
  }
}

function mapRows(rows: FormWithRelations[] | null): Form[] {
  if (!rows) return []
  return rows.map(mapFormRowToForm)
}

export type FormGroup = {
  id: string
  name: string
}

export type CreateFormInput = {
  name: string
}

export type UpdateFormInput = {
  name?: string
  status?: FormStatus
  lockStatus?: FormLockStatus
  groupName?: string
}

export const formsRepository = {
  async listForms(options?: { archived?: boolean }): Promise<Form[]> {
    const supabase = getSupabaseClient()

    let query = supabase
      .from("forms")
      .select(FORM_SELECT)
      .order("name", { ascending: true })

    if (options?.archived === true) {
      query = query.eq("archived", true)
    } else if (options?.archived === false) {
      query = query.eq("archived", false)
    }

    const { data, error } = await query

    if (error) {
      throw new FormsRepositoryError("Failed to load forms", error)
    }

    return mapRows(data as FormWithRelations[] | null)
  },

  async getFormById(formId: string): Promise<Form | null> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("forms")
      .select(FORM_SELECT)
      .eq("id", formId)
      .maybeSingle()

    if (error) {
      throw new FormsRepositoryError(`Failed to load form ${formId}`, error)
    }

    if (!data) return null

    return mapFormRowToForm(data as FormWithRelations)
  },

  async listFormGroups(): Promise<FormGroup[]> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("form_groups")
      .select("id, name")
      .eq("account_id", SANDBOX_ACCOUNT_ID)
      .order("name", { ascending: true })

    if (error) {
      throw new FormsRepositoryError("Failed to load form groups", error)
    }

    return data ?? []
  },

  async listFormGroupNames(): Promise<string[]> {
    const groups = await this.listFormGroups()
    return groups.map((group) => group.name)
  },

  async createForm(input: CreateFormInput): Promise<Form> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("forms")
      .insert({
        id: generateSandboxId(),
        account_id: SANDBOX_ACCOUNT_ID,
        name: input.name.trim(),
        status: "draft",
        lock_status: "unlocked",
        archived: false,
        form_group_id: DEFAULT_FORM_GROUP_ID,
        response_count: 0,
        created_by_user_id: DEFAULT_CREATOR_USER_ID,
      })
      .select(FORM_SELECT)
      .single()

    if (error) {
      throw new FormsRepositoryError("Failed to create form", error)
    }

    return mapFormRowToForm(data as FormWithRelations)
  },

  async updateForm(formId: string, input: UpdateFormInput): Promise<Form> {
    const supabase = getSupabaseClient()

    const updates: {
      updated_at: string
      name?: string
      status?: FormStatus
      lock_status?: FormLockStatus
      form_group_id?: string
    } = {
      updated_at: new Date().toISOString(),
    }

    if (input.name != null) {
      updates.name = input.name.trim()
    }

    if (input.status != null) {
      updates.status = input.status
    }

    if (input.lockStatus != null) {
      updates.lock_status = input.lockStatus
    }

    if (input.groupName != null) {
      const groups = await this.listFormGroups()
      const group = groups.find((entry) => entry.name === input.groupName)

      if (!group) {
        throw new FormsRepositoryError(`Form group "${input.groupName}" was not found`)
      }

      updates.form_group_id = group.id
    }

    const { data, error } = await supabase
      .from("forms")
      .update(updates)
      .eq("id", formId)
      .select(FORM_SELECT)
      .single()

    if (error) {
      throw new FormsRepositoryError(`Failed to update form ${formId}`, error)
    }

    return mapFormRowToForm(data as FormWithRelations)
  },

  async archiveForm(formId: string): Promise<void> {
    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("forms")
      .update({
        archived: true,
        archived_by_user_id: DEFAULT_CREATOR_USER_ID,
        archived_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", formId)

    if (error) {
      throw new FormsRepositoryError("Failed to archive form", error)
    }
  },

  async restoreForm(formId: string): Promise<void> {
    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("forms")
      .update({
        archived: false,
        archived_by_user_id: null,
        archived_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", formId)

    if (error) {
      throw new FormsRepositoryError("Failed to restore form", error)
    }
  },
}
