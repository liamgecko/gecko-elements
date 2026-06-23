import type { DataTableRowAction } from "@gecko/ui/components/data-table/data-table"
import type { FilterCategory } from "@gecko/ui/components/filters"

export type PaymentProvider = "Flywire" | "TouchNet"

export type PaymentCurrency = "GBP" | "EUR" | "USD"

export const PAYMENT_PROVIDER_OPTIONS: {
  value: PaymentProvider
  label: string
}[] = [
  { value: "Flywire", label: "Flywire" },
  { value: "TouchNet", label: "TouchNet" },
]

export const PAYMENT_PROVIDER_CURRENCIES: Record<
  PaymentProvider,
  readonly PaymentCurrency[]
> = {
  Flywire: ["GBP", "EUR", "USD"],
  TouchNet: ["GBP", "EUR", "USD"],
}

export type PaymentItemLockStatus =
  | "locked-view-only"
  | "locked-can-edit"
  | "unlocked"

export function getPaymentItemPath(paymentItemId: string) {
  return `/forms/chargeable-items/${paymentItemId}`
}

const currencySymbols: Record<PaymentCurrency, string> = {
  GBP: "£",
  EUR: "€",
  USD: "$",
}

export function formatPaymentItemAmount(
  amount: number,
  currency: PaymentCurrency,
) {
  return `${currencySymbols[currency]}${amount.toLocaleString()}`
}

export type PaymentItem = {
  id: string
  name: string
  internalName: string | null
  amount: number
  currency: PaymentCurrency
  provider: PaymentProvider
  lockStatus: PaymentItemLockStatus
  lockedBy?: string
  minQuantity: number | null
  maxQuantity: number | null
  availableQuantity: number | null
  createdBy: {
    name: string
    initials: string
    createdAt: string
  }
}

const basePaymentItemFilterCategories: FilterCategory[] = [
  {
    id: "currency",
    label: "Currency",
    searchable: false,
    options: [
      { value: "GBP", label: "GBP" },
      { value: "EUR", label: "EUR" },
      { value: "USD", label: "USD" },
    ],
  },
  {
    id: "lockStatus",
    label: "Lock status",
    searchable: false,
    options: [
      { value: "locked-view-only", label: "Locked (view only)" },
      { value: "locked-can-edit", label: "Locked (can edit)" },
      { value: "unlocked", label: "Unlocked" },
    ],
  },
  {
    id: "provider",
    label: "Payment provider",
    searchable: false,
    options: [
      { value: "Flywire", label: "Flywire" },
      { value: "TouchNet", label: "TouchNet" },
    ],
  },
]

export function createPaymentItemFilterCategories(
  creatorNames: string[],
): FilterCategory[] {
  return [
    ...basePaymentItemFilterCategories,
    {
      id: "createdBy",
      label: "Created by",
      options: creatorNames.map((name) => ({ value: name, label: name })),
      searchPlaceholder: "Search users",
    },
  ]
}

export const paymentItemRowActions: DataTableRowAction[] = [
  { id: "edit", label: "Edit item" },
  { id: "clone", label: "Clone item" },
  {
    id: "delete",
    label: "Delete item",
    variant: "destructive",
    separatorBefore: true,
  },
]
