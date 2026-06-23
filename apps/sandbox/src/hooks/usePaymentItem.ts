import * as React from "react"

import { paymentItemsRepository } from "../data/repositories/paymentItemsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { PaymentItem } from "../pages/forms/payment-items/payment-items-data"

type UsePaymentItemState = {
  paymentItem: PaymentItem | null
  loading: boolean
  error: string | null
  configured: boolean
}

export function usePaymentItem(paymentItemId: string): UsePaymentItemState {
  const [paymentItem, setPaymentItem] = React.useState<PaymentItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const configured = isSupabaseConfigured()

  React.useEffect(() => {
    if (!paymentItemId) {
      setPaymentItem(null)
      setLoading(false)
      return
    }

    if (!configured) {
      setPaymentItem(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const item = await paymentItemsRepository.getPaymentItemById(paymentItemId)
        if (!cancelled) {
          setPaymentItem(item)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load chargeable item",
          )
          setPaymentItem(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [configured, paymentItemId])

  return { paymentItem, loading, error, configured }
}
