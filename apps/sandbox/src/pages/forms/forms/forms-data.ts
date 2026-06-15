import type { DataTableRowAction } from "@gecko/ui/components/data-table/data-table"

export type FormStatus = "published" | "draft" | "unpublished"

export type FormLockStatus = "locked-view-only" | "locked-can-edit" | "unlocked"

export function getFormPath(formId: string, tab?: string) {
  const base = `/forms/forms/${formId}`
  return tab ? `${base}/${tab}` : base
}

export function getFormSettingsPath(formId: string, section?: string) {
  const base = `/forms/forms/${formId}/settings`
  return section ? `${base}/${section}` : base
}

export const FORM_SETTINGS_SECTIONS = [
  { value: "basic-settings", label: "Basic settings" },
  { value: "display", label: "Display" },
  { value: "redirect-rules", label: "Redirect rules" },
  { value: "design", label: "Design" },
  { value: "payment-settings", label: "Payment settings" },
  { value: "integrations", label: "Integrations" },
  { value: "analytics", label: "Analytics" },
] as const

export type FormSettingsSection =
  (typeof FORM_SETTINGS_SECTIONS)[number]["value"]

export type Form = {
  id: string
  name: string
  lockStatus: FormLockStatus
  /** Present when the form is locked. */
  lockedBy?: string
  status: FormStatus
  archived: boolean
  group: string
  responseCount: number
  createdBy: {
    name: string
    initials: string
    createdAt: string
  }
  archivedBy?: {
    name: string
    initials: string
    archivedAt: string
  }
}

import type { FilterCategory } from "@gecko/ui/components/filters"

const formStatusFilterCategory: FilterCategory = {
  id: "status",
  label: "Form status",
  searchable: false,
  options: [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "unpublished", label: "Unpublished" },
  ],
}

const formLockStatusFilterCategory: FilterCategory = {
  id: "lockStatus",
  label: "Lock status",
  searchable: false,
  options: [
    { value: "locked-view-only", label: "Locked (view only)" },
    { value: "locked-can-edit", label: "Locked (can edit)" },
    { value: "unlocked", label: "Unlocked" },
  ],
}

export function createFormFilterCategories(
  groupNames: string[],
  options?: { includeStatus?: boolean },
): FilterCategory[] {
  return [
    ...(options?.includeStatus === false ? [] : [formStatusFilterCategory]),
    formLockStatusFilterCategory,
    {
      id: "group",
      label: "Groups",
      options: groupNames.map((group) => ({ value: group, label: group })),
      searchPlaceholder: "Search groups",
    },
  ]
}

export const formHeaderMenuItems = [
  { label: "Form dashboard" },
  { label: "Export responses" },
  { label: "Import responses" },
  { label: "Add a response" },
  { label: "Show responses" },
  { label: "Sync responses" },
  { label: "Sync failures" },
  { label: "Clone form" },
  { label: "Lock form" },
  {
    label: "Archive form",
    variant: "destructive" as const,
    separatorBefore: true,
  },
] as const

export const formRowActions: DataTableRowAction[] = [
  { id: "edit", label: "Edit form" },
  { id: "preview", label: "Preview form" },
  { id: "dashboard", label: "View form dashboard" },
  { id: "export-responses", label: "Export responses" },
  { id: "import-responses", label: "Import responses" },
  { id: "add-response", label: "Add a response" },
  { id: "show-responses", label: "Show responses" },
  { id: "sync-failures", label: "Sync failures" },
  { id: "clone", label: "Clone form" },
  { id: "lock", label: "Lock form" },
  {
    id: "archive",
    label: "Archive form",
    variant: "destructive",
    separatorBefore: true,
  },
]

export const archivedFormRowActions: DataTableRowAction[] = [
  { id: "restore", label: "Restore form" },
]

export const formSelectActions: DataTableRowAction[] = [
  { id: "edit-lock-permissions", label: "Edit lock permissions" },
  { id: "unlock", label: "Unlock forms" },
  {
    id: "archive",
    label: "Archive forms",
    variant: "destructive",
    separatorBefore: true,
  },
]
