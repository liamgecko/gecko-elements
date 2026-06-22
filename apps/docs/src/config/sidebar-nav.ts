import { componentPages, corePages, structurePages } from "@/pages/gallery-data"
import { isCustomComponentPath } from "@/config/custom-component-paths"

export type SidebarNavItem = {
  to: string
  label: string
  todo?: boolean
  custom?: boolean
}

export type SidebarNavGroup = {
  label: string
  items: readonly SidebarNavItem[]
}

export const sidebarNavGroups: readonly SidebarNavGroup[] = [
  {
    label: "Core",
    items: corePages.map((p) => ({ to: p.path, label: p.name })),
  },
  {
    label: "Structure",
    items: structurePages.map((p) => ({
      to: p.path,
      label: p.name,
      custom: isCustomComponentPath(p.path),
    })),
  },
  {
    label: "Components",
    items: componentPages.map((p) => ({
      to: p.path,
      label: p.name,
      custom: isCustomComponentPath(p.path),
      // `componentPages` is used for the gallery cards too, but it doesn't currently
      // encode "todo" state. Keep the capability without duplicating the full list.
      todo: false,
    })),
  },
  // Keep room for any future static sections without hardcoding them into the component.
  // { label: "Other", items: [{ to: "/something", label: titleFromPath("/something") }] },
] as const

