import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Home } from "lucide-react"

import type { HeaderProps } from "@gecko/ui/components/header"

function titleCaseFromSlug(slug: string) {
  const spaced = slug.replace(/-/g, " ")
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase())
}

function labelForSegment(segment: string) {
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
  if (segment === "payment-items") return "Payment items"
  if (segment === "new") return "Create payment item"
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

export function labelForPath(pathname: string) {
  const segments = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)
  const last = segments.at(-1)
  if (!last) return "Home"
  return labelForSegment(last)
}

export function usePageBreadcrumbs(): NonNullable<HeaderProps["breadcrumbs"]> {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const segments = React.useMemo(
    () => pathname.split("?")[0].split("#")[0].split("/").filter(Boolean),
    [pathname]
  )

  return React.useMemo(() => {
    const items: {
      label: React.ReactNode
      current?: boolean
      href?: string
      onSelect?: () => void
    }[] = [{ label: "Home", href: "/home" }]

    let runningPath = ""
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i] ?? ""
      runningPath += `/${segment}`
      const isLast = i === segments.length - 1
      if (isLast) {
        items.push({ label: labelForSegment(segment), current: true })
      } else {
        items.push({
          label: labelForSegment(segment),
          href: runningPath,
          onSelect: () => navigate(runningPath),
        })
      }
    }

    items[0] = {
      label: (
        <>
          <Home className="size-3.5" />
          <span className="sr-only">Home</span>
        </>
      ),
      href: "/home",
      onSelect: () => navigate("/home"),
    }

    return { items }
  }, [navigate, segments])
}
