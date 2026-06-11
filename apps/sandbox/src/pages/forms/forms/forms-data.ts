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

export function getFormById(formId: string) {
  return forms.find((form) => form.id === formId)
}

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
}

const formNames = [
  "Undergraduate Application Form",
  "Postgraduate Taught Application",
  "International Student Enquiry",
  "Open Day Registration",
  "Offer Holder Response Form",
  "Clearing Application",
  "Scholarship Application",
  "Accommodation Preference Form",
  "Mature Student Application",
  "Reference Request Form",
] as const

const statuses: FormStatus[] = [
  "published",
  "draft",
  "unpublished",
  "published",
  "draft",
  "published",
  "unpublished",
  "published",
  "draft",
  "published",
]

const lockStatuses: FormLockStatus[] = [
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
]

const groups = [
  "Undergraduate",
  "Postgraduate",
  "International",
  "Events",
  "Admissions",
  "Scholarships",
  "Accommodation",
  "Mature students",
] as const

const creators = [
  { name: "Sarah Jenkins", initials: "SJ" },
  { name: "Jonny Carter", initials: "JC" },
  { name: "Liam Young", initials: "LY" },
  { name: "Emma Wilson", initials: "EW" },
  { name: "James Patel", initials: "JP" },
  { name: "Mia Torres", initials: "MT" },
] as const

const responseCounts = [3, 21, 6, 10, 0, 5, 14, 8, 2, 17]

function pseudoRandom(index: number, salt: number) {
  return ((index + 1) * 9301 + salt * 49297) % 233280
}

function toIso(year: number, month: number, day: number, hour: number, minute: number) {
  return new Date(year, month, day, hour, minute, 0, 0).toISOString()
}

function createdAtForIndex(index: number) {
  const day = 1 + (pseudoRandom(index, 1) % 28)
  const month = 8 + (pseudoRandom(index, 2) % 4)
  const year = 2025
  const hour = 9 + (pseudoRandom(index, 3) % 8)
  const minute = pseudoRandom(index, 4) % 2 === 0 ? 0 : 30
  return toIso(year, month, day, hour, minute)
}

export const forms: Form[] = formNames.map((name, index) => {
  const creator = creators[pseudoRandom(index, 9) % creators.length]
  const lockStatus = lockStatuses[index]
  const locker = creators[pseudoRandom(index, 12) % creators.length]
  return {
    id: `form-${index + 1}`,
    name,
    lockStatus,
    lockedBy:
      lockStatus === "unlocked" ? undefined : locker.name,
    status: statuses[index],
    archived: index === 2 || index === 6,
    group: groups[pseudoRandom(index, 11) % groups.length],
    responseCount: responseCounts[index],
    createdBy: {
      name: creator.name,
      initials: creator.initials,
      createdAt: createdAtForIndex(index),
    },
  }
})

export const formFilterCategories = [
  {
    id: "status",
    label: "Form status",
    searchable: false,
    options: [
      { value: "published", label: "Published forms" },
      { value: "unpublished", label: "Unpublished forms" },
      { value: "archived", label: "Archived forms" },
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
    id: "group",
    label: "Groups",
    options: groups.map((group) => ({ value: group, label: group })),
    searchPlaceholder: "Search groups",
  },
]

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
