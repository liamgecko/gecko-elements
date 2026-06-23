import { mapPaymentItemRowToPaymentItem } from "../mappers/paymentItemMapper"
import { getSupabaseClient } from "../../lib/supabase/client"
import { generateSandboxId } from "../../lib/supabase/generate-id"
import {
  DEFAULT_CREATOR_USER_ID,
  SANDBOX_ACCOUNT_ID,
} from "../../lib/supabase/constants"
import type { PaymentItemWithRelations } from "../../lib/supabase/types"
import type {
  PaymentCurrency,
  PaymentItem,
  PaymentProvider,
} from "../../pages/forms/payment-items/payment-items-data"

const PAYMENT_ITEM_SELECT = `
  id,
  name,
  internal_name,
  amount,
  currency,
  provider,
  lock_status,
  min_quantity,
  max_quantity,
  available_quantity,
  created_at,
  created_by:users!payment_items_created_by_user_id_fkey ( name, initials ),
  locked_by:users!payment_items_locked_by_user_id_fkey ( name )
`

export class PaymentItemsRepositoryError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = "PaymentItemsRepositoryError"
  }
}

function mapRows(rows: PaymentItemWithRelations[] | null): PaymentItem[] {
  if (!rows) return []
  return rows.map(mapPaymentItemRowToPaymentItem)
}

export type CreatePaymentItemInput = {
  name: string
  internalName: string | null
  amount: number
  currency: PaymentCurrency
  provider: PaymentProvider
  minQuantity: number | null
  maxQuantity: number | null
  availableQuantity: number | null
}

export type UpdatePaymentItemInput = CreatePaymentItemInput

export const paymentItemsRepository = {
  async listPaymentItems(): Promise<PaymentItem[]> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("payment_items")
      .select(PAYMENT_ITEM_SELECT)
      .order("name", { ascending: true })

    if (error) {
      throw new PaymentItemsRepositoryError("Failed to load payment items", error)
    }

    return mapRows(data as PaymentItemWithRelations[] | null)
  },

  async getPaymentItemById(paymentItemId: string): Promise<PaymentItem | null> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("payment_items")
      .select(PAYMENT_ITEM_SELECT)
      .eq("id", paymentItemId)
      .maybeSingle()

    if (error) {
      throw new PaymentItemsRepositoryError(
        `Failed to load payment item ${paymentItemId}`,
        error,
      )
    }

    if (!data) return null

    return mapPaymentItemRowToPaymentItem(data as PaymentItemWithRelations)
  },

  async listCreatorNames(): Promise<string[]> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("account_id", SANDBOX_ACCOUNT_ID)
      .order("name", { ascending: true })

    if (error) {
      throw new PaymentItemsRepositoryError(
        "Failed to load payment item creators",
        error,
      )
    }

    return (data ?? []).map((user) => user.name)
  },

  async createPaymentItem(input: CreatePaymentItemInput): Promise<PaymentItem> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("payment_items")
      .insert({
        id: generateSandboxId(),
        account_id: SANDBOX_ACCOUNT_ID,
        name: input.name.trim(),
        internal_name: input.internalName,
        amount: input.amount,
        currency: input.currency,
        provider: input.provider,
        lock_status: "unlocked",
        min_quantity: input.minQuantity,
        max_quantity: input.maxQuantity,
        available_quantity: input.availableQuantity,
        created_by_user_id: DEFAULT_CREATOR_USER_ID,
      })
      .select(PAYMENT_ITEM_SELECT)
      .single()

    if (error) {
      throw new PaymentItemsRepositoryError(
        "Failed to create payment item",
        error,
      )
    }

    return mapPaymentItemRowToPaymentItem(data as PaymentItemWithRelations)
  },

  async updatePaymentItem(
    paymentItemId: string,
    input: UpdatePaymentItemInput,
  ): Promise<PaymentItem> {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from("payment_items")
      .update({
        name: input.name.trim(),
        internal_name: input.internalName,
        amount: input.amount,
        currency: input.currency,
        provider: input.provider,
        min_quantity: input.minQuantity,
        max_quantity: input.maxQuantity,
        available_quantity: input.availableQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentItemId)
      .select(PAYMENT_ITEM_SELECT)
      .single()

    if (error) {
      throw new PaymentItemsRepositoryError(
        "Failed to update payment item",
        error,
      )
    }

    return mapPaymentItemRowToPaymentItem(data as PaymentItemWithRelations)
  },

  async deletePaymentItem(paymentItemId: string): Promise<void> {
    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("payment_items")
      .delete()
      .eq("id", paymentItemId)

    if (error) {
      throw new PaymentItemsRepositoryError(
        "Failed to delete payment item",
        error,
      )
    }
  },
}
