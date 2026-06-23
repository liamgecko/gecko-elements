import type { LucideIcon } from "lucide-react"
import {
  Building,
  CalendarDays,
  ChartLine,
  ClipboardList,
  Globe,
  Headset,
  House,
  Inbox,
  Mails,
  Megaphone,
  MessageSquareText,
  Route,
  Settings,
  SquareMousePointer,
  UserRoundCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react"

export type NavChildItem = {
  label: string
  slug?: string
}

export type NavItem = {
  label: string
  icon: LucideIcon
  items?: readonly NavChildItem[]
  defaultOpen?: boolean
}

export function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getChildSlug(item: NavChildItem) {
  return item.slug ?? toSlug(item.label)
}

export const navItems: readonly NavItem[] = [
  { label: "Home", icon: House },
  { label: "Contacts", icon: Users },
  {
    label: "Responses",
    icon: Inbox,
    items: [{ label: "All responses" }, { label: "Payments" }, { label: "Quarantine" }],
  },
  { label: "Messages", icon: Mails },
  { label: "Applications", icon: UserRoundCheck },
  {
    label: "Conversations",
    icon: MessageSquareText,
    items: [
      { label: "Inbox" },
      { label: "Knowledge base" },
      { label: "Chatbots" },
      { label: "Channels" },
      { label: "Widgets" },
      { label: "Reporting" },
      { label: "Teams" },
      { label: "Saved replies" },
      { label: "Workflows" },
    ],
  },
  {
    label: "Events",
    icon: CalendarDays,
    items: [
      { label: "Events" },
      { label: "Hosts" },
      { label: "Locations" },
      { label: "Share" },
      { label: "Deleted events" },
    ],
  },
  {
    label: "Forms",
    icon: ClipboardList,
    items: [
      { label: "Forms" },
      { label: "Archived forms" },
      { label: "Contact fields" },
      { label: "Field groups" },
      { label: "Field options" },
      { label: "Chargeable items" },
    ],
  },
  {
    label: "AI and automation",
    icon: Zap,
    items: [{ label: "AI agents" }, { label: "MCP servers" }],
  },
  {
    label: "Broadcasts",
    icon: Megaphone,
    items: [
      { label: "Broadcasts", slug: "campaigns" },
      { label: "Templates" },
      { label: "Senders and domains" },
      { label: "SMS geo permissions" },
    ],
  },
  {
    label: "Calls",
    icon: Headset,
    items: [
      { label: "Calls" },
      { label: "Campaigns" },
      { label: "Scripts" },
      { label: "Outcomes" },
      { label: "Telephone numbers" },
      { label: "VoIP numbers" },
      { label: "Usage and costs" },
    ],
  },
  { label: "Landing pages", icon: SquareMousePointer },
  {
    label: "Organisations",
    icon: Building,
    items: [
      { label: "All organisations" },
      { label: "Organisation types" },
      { label: "Organisation fields" },
    ],
  },
  {
    label: "Portal",
    icon: Globe,
    items: [{ label: "Student portals" }, { label: "Tasks and objectives" }],
  },
  { label: "Workflows", icon: Workflow },
  { label: "Integrations", icon: Route },
  { label: "Data and reporting", icon: ChartLine },
  {
    label: "Settings",
    icon: Settings,
    items: [
      { label: "Account settings" },
      { label: "User settings" },
      { label: "Users" },
      { label: "User groups" },
      { label: "Devices" },
      { label: "Import" },
      { label: "Export" },
      { label: "Labels" },
      { label: "Categories" },
      { label: "Data security" },
    ],
  },
] as const

export function findNavGroupByParentSlug(parentSlug: string) {
  return navItems.find(
    (item) => item.items?.length && toSlug(item.label) === parentSlug,
  )
}

export function childPath(parentSlug: string, childSlug: string) {
  return `/${parentSlug}/${childSlug}`
}
