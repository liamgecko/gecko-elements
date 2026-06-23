import type { PaymentItem } from "../../pages/forms/payment-items/payment-items-data"
import type { PaymentItemWithRelations } from "../../lib/supabase/types"

export function mapPaymentItemRowToPaymentItem(
  row: PaymentItemWithRelations,
): PaymentItem {
  const createdBy = row.created_by

  if (!createdBy) {
    throw new Error(`Chargeable item ${row.id} is missing required relations`)
  }

  return {
    id: row.id,
    name: row.name,
    internalName: row.internal_name,
    amount: row.amount,
    currency: row.currency,
    provider: row.provider,
    lockStatus: row.lock_status,
    lockedBy: row.locked_by?.name,
    minQuantity: row.min_quantity,
    maxQuantity: row.max_quantity,
    availableQuantity: row.available_quantity,
    createdBy: {
      name: createdBy.name,
      initials: createdBy.initials,
      createdAt: row.created_at,
    },
  }
}
