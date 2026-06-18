export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          account_id: string
          name: string
          initials: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          initials: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          initials?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      form_groups: {
        Row: {
          id: string
          account_id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_groups_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          id: string
          account_id: string
          name: string
          status: "published" | "draft" | "unpublished"
          lock_status: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id: string | null
          archived: boolean
          archived_by_user_id: string | null
          archived_at: string | null
          form_group_id: string
          response_count: number
          created_by_user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          status: "published" | "draft" | "unpublished"
          lock_status: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id?: string | null
          archived?: boolean
          archived_by_user_id?: string | null
          archived_at?: string | null
          form_group_id: string
          response_count?: number
          created_by_user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          status?: "published" | "draft" | "unpublished"
          lock_status?: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id?: string | null
          archived?: boolean
          archived_by_user_id?: string | null
          archived_at?: string | null
          form_group_id?: string
          response_count?: number
          created_by_user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forms_form_group_id_fkey"
            columns: ["form_group_id"]
            isOneToOne: false
            referencedRelation: "form_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forms_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forms_locked_by_user_id_fkey"
            columns: ["locked_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forms_archived_by_user_id_fkey"
            columns: ["archived_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_items: {
        Row: {
          id: string
          account_id: string
          name: string
          internal_name: string | null
          amount: number
          currency: "GBP" | "EUR" | "USD"
          provider: "Flywire" | "TouchNet"
          lock_status: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id: string | null
          min_quantity: number | null
          max_quantity: number | null
          available_quantity: number | null
          created_by_user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          internal_name?: string | null
          amount: number
          currency: "GBP" | "EUR" | "USD"
          provider: "Flywire" | "TouchNet"
          lock_status?: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id?: string | null
          min_quantity?: number | null
          max_quantity?: number | null
          available_quantity?: number | null
          created_by_user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          internal_name?: string | null
          amount?: number
          currency?: "GBP" | "EUR" | "USD"
          provider?: "Flywire" | "TouchNet"
          lock_status?: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id?: string | null
          min_quantity?: number | null
          max_quantity?: number | null
          available_quantity?: number | null
          created_by_user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_items_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_items_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_items_locked_by_user_id_fkey"
            columns: ["locked_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      form_payment_settings: {
        Row: {
          form_id: string
          provider: "Flywire" | "TouchNet" | null
          updated_at: string
        }
        Insert: {
          form_id: string
          provider?: "Flywire" | "TouchNet" | null
          updated_at?: string
        }
        Update: {
          form_id?: string
          provider?: "Flywire" | "TouchNet" | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_payment_settings_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: true
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_payment_items: {
        Row: {
          form_id: string
          payment_item_id: string
          sort_order: number
        }
        Insert: {
          form_id: string
          payment_item_id: string
          sort_order?: number
        }
        Update: {
          form_id?: string
          payment_item_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "form_payment_items_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_payment_items_payment_item_id_fkey"
            columns: ["payment_item_id"]
            isOneToOne: false
            referencedRelation: "payment_items"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_campaigns: {
        Row: {
          id: string
          account_id: string
          name: string
          status: "active" | "completed" | "paused" | "failed"
          start_date: string
          end_date: string
          last_refreshed_at: string
          stats: Json
          created_by_user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          status: "active" | "completed" | "paused" | "failed"
          start_date: string
          end_date: string
          last_refreshed_at: string
          stats?: Json
          created_by_user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          status?: "active" | "completed" | "paused" | "failed"
          start_date?: string
          end_date?: string
          last_refreshed_at?: string
          stats?: Json
          created_by_user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_campaigns_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_campaigns_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          id: string
          account_id: string
          name: string
          lock_status: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id: string | null
          enabled: boolean
          last_run: string | null
          action_type:
            | "add-label"
            | "add-to-campaign"
            | "add-to-event"
            | "send-message"
            | "assign-agent"
          trigger_type:
            | "before-conversation"
            | "during-conversation"
            | "after-conversation-end"
          label_ids: string[]
          definition: Record<string, unknown> | null
          created_by_user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          lock_status: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id?: string | null
          enabled?: boolean
          last_run?: string | null
          definition?: Record<string, unknown> | null
          action_type:
            | "add-label"
            | "add-to-campaign"
            | "add-to-event"
            | "send-message"
            | "assign-agent"
          trigger_type:
            | "before-conversation"
            | "during-conversation"
            | "after-conversation-end"
          label_ids?: string[]
          created_by_user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          lock_status?: "unlocked" | "locked-can-edit" | "locked-view-only"
          locked_by_user_id?: string | null
          enabled?: boolean
          last_run?: string | null
          action_type?:
            | "add-label"
            | "add-to-campaign"
            | "add-to-event"
            | "send-message"
            | "assign-agent"
          trigger_type?:
            | "before-conversation"
            | "during-conversation"
            | "after-conversation-end"
          label_ids?: string[]
          definition?: Record<string, unknown> | null
          created_by_user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_locked_by_user_id_fkey"
            columns: ["locked_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          id: string
          account_id: string
          name: string
          definition: Record<string, unknown> | null
          action_type:
            | "add-label"
            | "add-to-campaign"
            | "add-to-event"
            | "send-message"
            | "assign-agent"
          trigger_type:
            | "before-conversation"
            | "during-conversation"
            | "after-conversation-end"
          source_workflow_id: string | null
          created_by_user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          name: string
          definition?: Record<string, unknown> | null
          action_type:
            | "add-label"
            | "add-to-campaign"
            | "add-to-event"
            | "send-message"
            | "assign-agent"
          trigger_type:
            | "before-conversation"
            | "during-conversation"
            | "after-conversation-end"
          source_workflow_id?: string | null
          created_by_user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          name?: string
          definition?: Record<string, unknown> | null
          action_type?:
            | "add-label"
            | "add-to-campaign"
            | "add-to-event"
            | "send-message"
            | "assign-agent"
          trigger_type?:
            | "before-conversation"
            | "during-conversation"
            | "after-conversation-end"
          source_workflow_id?: string | null
          created_by_user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_templates_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_templates_source_workflow_id_fkey"
            columns: ["source_workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_templates_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type FormRow = Database["public"]["Tables"]["forms"]["Row"]
export type FormGroupRow = Database["public"]["Tables"]["form_groups"]["Row"]
export type UserRow = Database["public"]["Tables"]["users"]["Row"]

export type FormWithRelations = FormRow & {
  form_group: Pick<FormGroupRow, "name"> | null
  created_by: Pick<UserRow, "name" | "initials"> | null
  locked_by: Pick<UserRow, "name"> | null
  archived_by: Pick<UserRow, "name" | "initials"> | null
}

export type PaymentItemRow = Database["public"]["Tables"]["payment_items"]["Row"]

export type PaymentItemWithRelations = PaymentItemRow & {
  created_by: Pick<UserRow, "name" | "initials"> | null
  locked_by: Pick<UserRow, "name"> | null
}

export type BroadcastCampaignRow =
  Database["public"]["Tables"]["broadcast_campaigns"]["Row"]

export type BroadcastCampaignWithRelations = BroadcastCampaignRow & {
  created_by: Pick<UserRow, "name" | "initials"> | null
}

export type WorkflowRow = Database["public"]["Tables"]["workflows"]["Row"]

export type WorkflowWithRelations = WorkflowRow & {
  created_by: Pick<UserRow, "name" | "initials"> | null
  locked_by: Pick<UserRow, "name"> | null
}

export type WorkflowTemplateRow =
  Database["public"]["Tables"]["workflow_templates"]["Row"]

export type WorkflowTemplateWithRelations = WorkflowTemplateRow & {
  created_by: Pick<UserRow, "name" | "initials"> | null
}
