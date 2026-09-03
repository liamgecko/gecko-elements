import * as React from "react"
import { useLocation } from "react-router-dom"
import { Home } from "lucide-react"

import type {
  HeaderBreadcrumbItem,
  HeaderProps,
} from "@gecko/ui/components/header"

import { BreadcrumbRouterLink } from "@/components/breadcrumb-router-link"
import {
  childPath,
  findNavGroupByParentSlug,
  getChildSlug,
  navItems,
  toSlug,
} from "@/lib/nav-items"
import { getTabLabelForPath } from "@/lib/tabbed-sections"

function normalizePath(pathname: string) {
  return pathname.split("?")[0].split("#")[0]
}

function titleCaseFromSlug(slug: string) {
  const spaced = slug.replace(/-/g, " ")
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase())
}

function isUuid(segment: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    segment
  )
}

function labelForSegment(segment: string, previousSegment?: string) {
  if (segment === "home" || segment === "overview") return "Home"
  if (segment === "data-and-reporting" || segment === "dashboards") {
    return "Data and reporting"
  }
  if (segment === "ai-and-automation") return "AI and automation"
  if (segment === "mcp-servers") return "MCP server"
  if (segment === "ai-agents") return "AI agents"
  if (segment === "voip-numbers") return "VoIP numbers"
  if (segment === "sms-geo-permissions") return "SMS geo permissions"
  if (segment === "senders-and-domains") return "Senders and domains"
  if (segment === "deleted-templates") return "Deleted templates"
  if (segment === "verified-senders-and-domains") return "Senders and domains"
  if (segment === "contact-fields") return "Contact fields"
  if (segment === "field-groups") return "Field groups"
  if (segment === "field-options") return "Field options"
  if (segment === "chargeable-items") return "Chargeable items"
  if (segment === "archived-forms") return "Archived forms"
  if (segment === "campaigns" && previousSegment === "broadcasts") {
    return "Broadcasts"
  }
  if (segment === "new" && previousSegment === "forms") return "Create form"
  if (segment === "new" && previousSegment === "campaigns")
    return "Create broadcast"
  if (segment === "new" && previousSegment === "chargeable-items") {
    return "Create chargeable item"
  }
  if (
    previousSegment === "chargeable-items" &&
    segment !== "new" &&
    isUuid(segment)
  ) {
    return "Edit chargeable item"
  }
  if (segment === "all-organisations") return "Organisations"
  if (segment === "student-portals") return "Student portal"
  if (segment === "import") return "Imports"
  if (segment === "export") return "Exports"
  if (segment === "basic-details") return "Basic details"
  if (segment === "date-and-time") return "Date and time"
  if (segment === "basic-settings") return "Basic settings"
  if (segment === "chat-settings") return "Chat settings"
  if (segment === "activity-log") return "Activity log"
  if (segment === "deleted-contacts") return "Deleted contacts"
  if (segment === "consent-reasons") return "Consent reasons"
  return titleCaseFromSlug(segment)
}

function labelForNavChild(
  items: readonly { label: string; slug?: string }[],
  childSlug: string,
  parentSlug: string
) {
  const item = items.find((entry) => getChildSlug(entry) === childSlug)
  const segmentLabel = labelForSegment(childSlug, parentSlug)
  if (segmentLabel !== titleCaseFromSlug(childSlug)) return segmentLabel
  return item?.label ?? segmentLabel
}

export type BreadcrumbCrumb = {
  label: string
  path: string
}

const CONVERSATIONS_PARENT_SLUG = "conversations"
const CONVERSATIONS_INBOX_PATH = "/conversations/inbox"

function isConversationsInboxPath(path: string) {
  return (
    path === CONVERSATIONS_INBOX_PATH ||
    path === `/${CONVERSATIONS_PARENT_SLUG}`
  )
}

function buildConversationsBreadcrumbCrumbs(
  path: string,
  segments: string[]
): BreadcrumbCrumb[] {
  const childSlug = segments[1]
  if (!childSlug || childSlug === "inbox") return []

  const navGroup = findNavGroupByParentSlug(CONVERSATIONS_PARENT_SLUG)
  if (!navGroup?.items?.length) return []

  const crumbs: BreadcrumbCrumb[] = [
    { label: "Conversations", path: CONVERSATIONS_INBOX_PATH },
  ]

  const siblingPath = childPath(CONVERSATIONS_PARENT_SLUG, childSlug)
  const siblingLabel = labelForNavChild(
    navGroup.items,
    childSlug,
    CONVERSATIONS_PARENT_SLUG
  )
  crumbs.push({ label: siblingLabel, path: siblingPath })

  if (segments.length === 2) return crumbs

  return appendDeeperCrumbs(crumbs, segments, 2, path)
}

function appendDeeperCrumbs(
  crumbs: BreadcrumbCrumb[],
  segments: string[],
  startIndex: number,
  pathname: string
) {
  const remaining = segments.slice(startIndex)
  if (remaining.length === 0) return crumbs

  const lastCrumbLabel = crumbs.at(-1)?.label
  const tabLabel = getTabLabelForPath(pathname)
  if (tabLabel && tabLabel !== lastCrumbLabel) {
    crumbs.push({ label: tabLabel, path: normalizePath(pathname) })
    return crumbs
  }

  let running = crumbs.at(-1)?.path ?? ""
  for (let i = startIndex; i < segments.length; i++) {
    const segment = segments[i] ?? ""
    running += `/${segment}`
    crumbs.push({
      label: labelForSegment(segment, segments[i - 1]),
      path: running,
    })
  }
  return crumbs
}

export function buildBreadcrumbCrumbs(pathname: string): BreadcrumbCrumb[] {
  const path = normalizePath(pathname)
  const segments = path.split("/").filter(Boolean)
  if (segments.length === 0) return []

  const parentSlug = segments[0] ?? ""
  if (parentSlug === "home" || parentSlug === "overview") return []

  if (parentSlug === CONVERSATIONS_PARENT_SLUG) {
    return buildConversationsBreadcrumbCrumbs(path, segments)
  }

  if (
    parentSlug === "workflows" &&
    segments.length >= 2 &&
    isUuid(segments[1] ?? "")
  ) {
    return [
      { label: "Workflows", path: "/workflows" },
      { label: "Workflow", path },
    ]
  }

  const navGroup = findNavGroupByParentSlug(parentSlug)
  if (!navGroup?.items?.length) {
    const leaf = navItems.find((item) => toSlug(item.label) === parentSlug)
    return [
      {
        label: leaf?.label ?? labelForSegment(parentSlug),
        path: `/${parentSlug}`,
      },
    ]
  }

  const firstChild = navGroup.items[0]
  const firstChildSlug = getChildSlug(firstChild)
  const firstChildPath = childPath(parentSlug, firstChildSlug)
  const firstChildLabel = labelForNavChild(
    navGroup.items,
    firstChildSlug,
    parentSlug
  )

  const childSlug = segments[1]
  if (!childSlug) {
    return [{ label: firstChildLabel, path: firstChildPath }]
  }

  const onFirstChildBranch = childSlug === firstChildSlug

  if (onFirstChildBranch && segments.length === 2) {
    return [{ label: firstChildLabel, path: firstChildPath }]
  }

  const crumbs: BreadcrumbCrumb[] = [
    { label: firstChildLabel, path: firstChildPath },
  ]

  if (!onFirstChildBranch) {
    const siblingPath = childPath(parentSlug, childSlug)
    const siblingLabel = labelForNavChild(navGroup.items, childSlug, parentSlug)
    crumbs.push({ label: siblingLabel, path: siblingPath })
    if (segments.length === 2) return crumbs
    return appendDeeperCrumbs(crumbs, segments, 2, path)
  }

  return appendDeeperCrumbs(crumbs, segments, 2, path)
}

export function labelForPath(pathname: string) {
  const path = normalizePath(pathname)
  if (isConversationsInboxPath(path)) return "Inbox"

  const crumbs = buildBreadcrumbCrumbs(pathname)
  const last = crumbs.at(-1)
  if (last) return last.label
  return "Home"
}

export function usePageBreadcrumbs(): NonNullable<HeaderProps["breadcrumbs"]> {
  const { pathname } = useLocation()

  return React.useMemo(() => {
    const crumbs = buildBreadcrumbCrumbs(pathname)
    const items: HeaderBreadcrumbItem[] = [
      {
        label: (
          <BreadcrumbRouterLink to="/home">
            <Home className="size-3.5" />
            <span className="sr-only">Home</span>
          </BreadcrumbRouterLink>
        ),
        renderLabelOnly: true,
      },
    ]

    crumbs.forEach((crumb, index) => {
      const isLast = index === crumbs.length - 1
      if (isLast) {
        items.push({ label: crumb.label, current: true })
      } else {
        items.push({
          label: (
            <BreadcrumbRouterLink to={crumb.path}>
              {crumb.label}
            </BreadcrumbRouterLink>
          ),
          renderLabelOnly: true,
        })
      }
    })

    return { items }
  }, [pathname])
}
