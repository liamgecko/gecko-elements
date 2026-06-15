import type { DataTableRowAction } from "@gecko/ui/components/data-table/data-table"

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

const catalogItems: Omit<
  PaymentItem,
  "id" | "lockStatus" | "lockedBy" | "createdBy"
>[] = [
  {
    name: "Application fee",
    internalName: null,
    amount: 50,
    currency: "GBP",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Tuition payment",
    internalName: null,
    amount: 9250,
    currency: "GBP",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "International student levy",
    internalName: null,
    amount: 120,
    currency: "GBP",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Deposit",
    internalName: null,
    amount: 500,
    currency: "GBP",
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Accommodation deposit",
    internalName: null,
    amount: 250,
    currency: "GBP",
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Scholarship acceptance fee",
    internalName: null,
    amount: 75,
    currency: "GBP",
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "EU application fee",
    internalName: "eu-app-fee",
    amount: 60,
    currency: "EUR",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Semester tuition",
    internalName: null,
    amount: 4500,
    currency: "EUR",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Student health insurance",
    internalName: null,
    amount: 180,
    currency: "EUR",
    provider: "TouchNet",
    minQuantity: 1,
    maxQuantity: 1,
    availableQuantity: 250,
  },
  {
    name: "Graduation ceremony fee",
    internalName: null,
    amount: 95,
    currency: "EUR",
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "US application fee",
    internalName: "us-app-fee",
    amount: 65,
    currency: "USD",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Tuition installment",
    internalName: null,
    amount: 8500,
    currency: "USD",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Orientation package",
    internalName: null,
    amount: 125,
    currency: "USD",
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Campus housing deposit",
    internalName: null,
    amount: 600,
    currency: "USD",
    provider: "TouchNet",
    minQuantity: 1,
    maxQuantity: 2,
    availableQuantity: 40,
  },
  {
    name: "International student services fee",
    internalName: null,
    amount: 150,
    currency: "USD",
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
]

const lockStatuses: PaymentItemLockStatus[] = [
  "unlocked",
  "locked-can-edit",
  "locked-view-only",
  "unlocked",
  "locked-view-only",
  "unlocked",
  "locked-can-edit",
  "unlocked",
  "locked-view-only",
  "unlocked",
  "locked-can-edit",
  "locked-view-only",
  "unlocked",
  "locked-view-only",
  "unlocked",
]

const creators = [
  { name: "Sarah Jenkins", initials: "SJ" },
  { name: "Jonny Carter", initials: "JC" },
  { name: "Liam Young", initials: "LY" },
  { name: "Emma Wilson", initials: "EW" },
  { name: "James Patel", initials: "JP" },
  { name: "Mia Torres", initials: "MT" },
] as const

function pseudoRandom(index: number, salt: number) {
  return ((index + 1) * 9301 + salt * 49297) % 233280
}

function toIso(year: number, month: number, day: number, hour: number, minute: number) {
  return new Date(year, month, day, hour, minute, 0, 0).toISOString()
}

function createdAtForIndex(index: number) {
  const day = 1 + (pseudoRandom(index, 1) % 28)
  const month = 6 + (pseudoRandom(index, 2) % 5)
  const year = 2025
  const hour = 9 + (pseudoRandom(index, 3) % 8)
  const minute = pseudoRandom(index, 4) % 2 === 0 ? 0 : 30
  return toIso(year, month, day, hour, minute)
}

export const paymentItems: PaymentItem[] = catalogItems.map((item, index) => {
  const creator = creators[pseudoRandom(index, 9) % creators.length]
  const lockStatus = lockStatuses[index]
  const locker = creators[pseudoRandom(index, 12) % creators.length]

  return {
    id: `payment-item-${index + 1}`,
    ...item,
    lockStatus,
    lockedBy: lockStatus === "unlocked" ? undefined : locker.name,
    createdBy: {
      name: creator.name,
      initials: creator.initials,
      createdAt: createdAtForIndex(index),
    },
  }
})

export const paymentItemFilterCategories = [
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
  {
    id: "createdBy",
    label: "Created by",
    options: creators.map((creator) => ({
      value: creator.name,
      label: creator.name,
    })),
    searchPlaceholder: "Search users",
  },
]

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
