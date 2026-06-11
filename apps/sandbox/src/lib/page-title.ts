import * as React from "react"
import { useLocation } from "react-router-dom"

import { getBroadcastCampaignById } from "../pages/broadcasts/campaigns/broadcast-campaigns-data"
import { getFormById } from "../pages/forms/forms/forms-data"
import { getTabLabelForPath } from "./tabbed-sections"
import { labelForPath } from "./use-page-breadcrumbs"

const CAMPAIGN_DETAIL_TAB_LABELS: Record<string, string> = {
  overview: "Overview",
  stats: "Stats",
  contacts: "Contacts",
  workflows: "Workflows",
  settings: "Settings",
}

const FORM_DETAIL_TAB_LABELS: Record<string, string> = {
  designer: "Designer",
  workflows: "Workflows",
  settings: "Settings",
  visibility: "Visibility",
  share: "Share",
}

const FORM_SETTINGS_SECTION_LABELS: Record<string, string> = {
  "basic-settings": "Basic settings",
  display: "Display",
  "redirect-rules": "Redirect rules",
  design: "Design",
  "payment-settings": "Payment settings",
  integrations: "Integrations",
  analytics: "Analytics",
}

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
  const path = pathname.split("?")[0].split("#")[0]

  const formSettingsMatch = path.match(
    /^\/forms\/forms\/([^/]+)\/settings\/([^/]+)$/
  )
  if (formSettingsMatch) {
    const [, formId, section] = formSettingsMatch
    const form = formId ? getFormById(formId) : undefined
    if (form) {
      const sectionLabel = FORM_SETTINGS_SECTION_LABELS[section]
      return sectionLabel
        ? `${sectionLabel} | ${form.name}`
        : form.name
    }
  }

  const formDetailMatch = path.match(/^\/forms\/forms\/([^/]+)(?:\/([^/]+))?$/)
  if (formDetailMatch) {
    const [, formId, tab] = formDetailMatch
    const form = formId ? getFormById(formId) : undefined
    if (form) {
      const tabLabel = tab ? FORM_DETAIL_TAB_LABELS[tab] : undefined
      return tabLabel ? `${tabLabel} | ${form.name}` : form.name
    }
  }

  const campaignDetailMatch = path.match(
    /^\/broadcasts\/campaigns\/([^/]+)(?:\/([^/]+))?$/
  )
  if (campaignDetailMatch) {
    const [, campaignId, tab] = campaignDetailMatch
    const campaign = campaignId
      ? getBroadcastCampaignById(campaignId)
      : undefined
    if (campaign) {
      const tabLabel = tab ? CAMPAIGN_DETAIL_TAB_LABELS[tab] : undefined
      return tabLabel ? `${tabLabel} | ${campaign.name}` : campaign.name
    }
  }

  const tabLabel = getTabLabelForPath(pathname)
  if (tabLabel) return tabLabel
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
