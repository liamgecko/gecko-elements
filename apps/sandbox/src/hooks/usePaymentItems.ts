import * as React from "react"

import { paymentItemsRepository } from "../data/repositories/paymentItemsRepository"
import { isSupabaseConfigured } from "../lib/supabase/env"
import type { PaymentItem } from "../pages/forms/payment-items/payment-items-data"

type UsePaymentItemsState = {
  paymentItems: PaymentItem[]
  creatorNames: string[]
  loading: boolean
  error: string | null
  configured: boolean
  refetch: () => void
}

export function usePaymentItems(): UsePaymentItemsState {
  const [paymentItems, setPaymentItems] = React.useState<PaymentItem[]>([])
  const [creatorNames, setCreatorNames] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [reloadToken, setReloadToken] = React.useState(0)

  const configured = isSupabaseConfigured()

  const refetch = React.useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  React.useEffect(() => {
    if (!configured) {
      setPaymentItems([])
      setCreatorNames([])
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const [items, creators] = await Promise.all([
          paymentItemsRepository.listPaymentItems(),
          paymentItemsRepository.listCreatorNames(),
        ])

        if (!cancelled) {
          setPaymentItems(items)
          setCreatorNames(creators)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load payment items",
          )
          setPaymentItems([])
          setCreatorNames([])
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
  }, [configured, reloadToken])

  return {
    paymentItems,
    creatorNames,
    loading,
    error,
    configured,
    refetch,
  }
}
