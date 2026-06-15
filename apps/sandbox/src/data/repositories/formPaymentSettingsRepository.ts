import { getSupabaseClient } from "../../lib/supabase/client"
import type { PaymentProvider } from "../../pages/forms/payment-items/payment-items-data"

export type FormPaymentSettings = {
  provider: PaymentProvider | null
  paymentItemIds: string[]
}

export class FormPaymentSettingsRepositoryError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = "FormPaymentSettingsRepositoryError"
  }
}

export const formPaymentSettingsRepository = {
  async getFormPaymentSettings(
    formId: string,
  ): Promise<FormPaymentSettings> {
    const supabase = getSupabaseClient()

    const [settingsResult, itemsResult] = await Promise.all([
      supabase
        .from("form_payment_settings")
        .select("provider")
        .eq("form_id", formId)
        .maybeSingle(),
      supabase
        .from("form_payment_items")
        .select("payment_item_id, sort_order")
        .eq("form_id", formId)
        .order("sort_order", { ascending: true }),
    ])

    if (settingsResult.error) {
      throw new FormPaymentSettingsRepositoryError(
        "Failed to load form payment settings",
        settingsResult.error,
      )
    }

    if (itemsResult.error) {
      throw new FormPaymentSettingsRepositoryError(
        "Failed to load form payment items",
        itemsResult.error,
      )
    }

    return {
      provider: (settingsResult.data?.provider as PaymentProvider | null) ?? null,
      paymentItemIds: (itemsResult.data ?? []).map((row) => row.payment_item_id),
    }
  },

  async saveFormPaymentSettings(
    formId: string,
    settings: FormPaymentSettings,
  ): Promise<void> {
    const supabase = getSupabaseClient()

    const { error: settingsError } = await supabase
      .from("form_payment_settings")
      .upsert({
        form_id: formId,
        provider: settings.provider,
        updated_at: new Date().toISOString(),
      })

    if (settingsError) {
      throw new FormPaymentSettingsRepositoryError(
        "Failed to save form payment settings",
        settingsError,
      )
    }

    const { error: deleteError } = await supabase
      .from("form_payment_items")
      .delete()
      .eq("form_id", formId)

    if (deleteError) {
      throw new FormPaymentSettingsRepositoryError(
        "Failed to update form payment items",
        deleteError,
      )
    }

    if (settings.paymentItemIds.length === 0) return

    const { error: insertError } = await supabase.from("form_payment_items").insert(
      settings.paymentItemIds.map((paymentItemId, index) => ({
        form_id: formId,
        payment_item_id: paymentItemId,
        sort_order: index,
      })),
    )

    if (insertError) {
      throw new FormPaymentSettingsRepositoryError(
        "Failed to save form payment items",
        insertError,
      )
    }
  },
}
