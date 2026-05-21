import * as React from "react"
import { useLocation } from "react-router-dom"

import { getTabLabelForPath } from "./tabbed-sections"
import { labelForPath } from "./use-page-breadcrumbs"

const HOME_PATHS = new Set(["/", "/home", "/overview"])

const EXACT_PAGE_TITLES: Record<string, string> = {
  "/settings": "Account settings",
  "/organisations": "Organisations",
  "/portal": "Student portal",
  "/calls": "Calls",
  "/broadcasts": "Campaigns",
  "/dashboards": "Data and reporting",
  "/contacts": "Contacts",
  "/messages": "Messages",
  "/conversations": "Conversations",
  "/conversations/inbox": "Inbox",
  "/conversations/knowledge-base": "Knowledge base",
  "/conversations/chatbots": "Chatbots",
  "/conversations/channels": "Channels",
  "/conversations/widgets": "Widgets",
  "/conversations/workflows": "Workflows",
  "/conversations/teams": "Teams",
  "/conversations/saved-replies": "Saved replies",
  "/broadcasts/campaigns": "Campaigns",
  "/broadcasts/sms-geo-permissions": "SMS geo permissions",
  "/calls/campaigns": "Campaigns",
  "/calls/scripts": "Scripts",
  "/calls/outcomes": "Outcomes",
  "/calls/telephone-numbers": "Telephone numbers",
  "/calls/voip-numbers": "VoIP numbers",
  "/landing-pages": "Landing pages",
  "/organisations/all-organisations": "Organisations",
  "/organisations/organisation-types": "Organisation types",
  "/organisations/organisation-fields": "Organisation fields",
  "/portal/student-portals": "Student portal",
  "/portal/tasks-and-objectives": "Tasks and objectives",
  "/integrations": "Integrations",
  "/data-and-reporting": "Data and reporting",
  "/settings/user-groups": "User groups",
  "/settings/devices": "Devices",
  "/settings/import": "Imports",
  "/settings/export": "Exports",
  "/settings/labels": "Labels",
  "/settings/categories": "Categories",
  "/security-preferences": "Security preferences",
  "/my-accounts": "My accounts",
  "/user-settings": "User settings",
  "/logout": "Logout",
}

export function getPageTitle(pathname: string) {
  const tabLabel = getTabLabelForPath(pathname)
  if (tabLabel) return tabLabel

  const path = pathname.split("?")[0].split("#")[0]
  const exact = EXACT_PAGE_TITLES[path]
  if (exact) return exact

  return labelForPath(path)
}

export function formatDocumentTitle(pathname: string) {
  const path = pathname.split("?")[0].split("#")[0]
  if (HOME_PATHS.has(path)) return "Gecko"
  return `${getPageTitle(pathname)} | Gecko`
}

export function usePageDocumentTitle() {
  const { pathname } = useLocation()

  React.useEffect(() => {
    document.title = formatDocumentTitle(pathname)
  }, [pathname])
}
