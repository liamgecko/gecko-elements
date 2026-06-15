import * as React from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import { paymentItemsRepository } from "@/data/repositories/paymentItemsRepository"
import { usePaymentItem } from "@/hooks/usePaymentItem"

import { PaymentItemForm, type PaymentItemFormValues } from "./payment-item-form"

function toFormValues(item: {
  name: string
  internalName: string | null
  amount: number
  currency: PaymentItemFormValues["currency"]
  provider: PaymentItemFormValues["provider"]
  minQuantity: number | null
  maxQuantity: number | null
  availableQuantity: number | null
}): PaymentItemFormValues {
  const hasInventory =
    item.minQuantity != null ||
    item.maxQuantity != null ||
    item.availableQuantity != null

  return {
    name: item.name,
    internalName: item.internalName ?? "",
    amount: item.amount,
    currency: item.currency,
    provider: item.provider,
    minQuantity: item.minQuantity,
    maxQuantity: item.maxQuantity,
    availableQuantity: item.availableQuantity,
    inventoryEnabled: hasInventory,
  }
}

export default function EditPaymentItemPage() {
  const { paymentItemId = "" } = useParams()
  const navigate = useNavigate()
  const { paymentItem, loading, error, configured } =
    usePaymentItem(paymentItemId)
  const [isSaving, setIsSaving] = React.useState(false)

  if (!configured) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        <SupabaseSetupNotice />
      </div>
    )
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading payment item…</p>
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        <DataLoadErrorAlert
          title="Could not load payment item"
          message={error}
        />
      </div>
    )
  }

  if (!paymentItem) {
    return <Navigate to="/forms/payment-items" replace />
  }

  return (
    <PaymentItemForm
      key={paymentItem.id}
      title="Edit payment item"
      submitLabel="Save payment item"
      initialValues={toFormValues(paymentItem)}
      isSaving={isSaving}
      onSubmit={async (values) => {
        setIsSaving(true)
        try {
          await paymentItemsRepository.updatePaymentItem(paymentItem.id, {
            name: values.name,
            internalName: values.internalName.trim() || null,
            amount: values.amount,
            currency: values.currency,
            provider: values.provider,
            minQuantity: values.minQuantity,
            maxQuantity: values.maxQuantity,
            availableQuantity: values.availableQuantity,
          })
          toast.success("Payment item updated successfully")
          navigate("/forms/payment-items")
        } catch (err) {
          toast.error(
            err instanceof Error ? err.message : "Failed to update payment item",
          )
        } finally {
          setIsSaving(false)
        }
      }}
    />
  )
}
