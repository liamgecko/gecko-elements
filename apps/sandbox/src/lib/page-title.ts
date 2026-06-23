import * as React from "react"
import { useLocation } from "react-router-dom"

import { formsRepository } from "../data/repositories/formsRepository"
import { paymentItemsRepository } from "../data/repositories/paymentItemsRepository"
import { broadcastCampaignsRepository } from "../data/repositories/broadcastCampaignsRepository"
import { workflowsRepository } from "../data/repositories/workflowsRepository"
import { isSupabaseConfigured } from "./supabase/env"
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
  "/broadcasts": "Broadcasts",
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
  "/broadcasts/campaigns": "Broadcasts",
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
  "/workflows": "Workflows",
  "/workflows/templates": "Templates",
  "/workflows/templates/new": "New template",
  "/workflows/new": "New workflow",
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

function getFormRouteTitle(path: string, formName: string) {
  const formSettingsMatch = path.match(
    /^\/forms\/forms\/([^/]+)\/settings\/([^/]+)$/,
  )
  if (formSettingsMatch) {
    const section = formSettingsMatch[2] ?? ""
    const sectionLabel = FORM_SETTINGS_SECTION_LABELS[section]
    return sectionLabel ? `${sectionLabel} | ${formName}` : formName
  }

  const formDetailMatch = path.match(/^\/forms\/forms\/([^/]+)(?:\/([^/]+))?$/)
  if (formDetailMatch) {
    const tab = formDetailMatch[2]
    const tabLabel = tab ? FORM_DETAIL_TAB_LABELS[tab] : undefined
    return tabLabel ? `${tabLabel} | ${formName}` : formName
  }

  return null
}

function getCampaignRouteTitle(path: string, campaignName: string) {
  const campaignDetailMatch = path.match(
    /^\/broadcasts\/campaigns\/([^/]+)(?:\/([^/]+))?$/,
  )
  if (!campaignDetailMatch) return null

  const tab = campaignDetailMatch[2]
  const tabLabel = tab ? CAMPAIGN_DETAIL_TAB_LABELS[tab] : undefined
  return tabLabel ? `${tabLabel} | ${campaignName}` : campaignName
}

export function getPageTitle(
  pathname: string,
  formName?: string,
  campaignName?: string,
  workflowName?: string,
) {
  const path = pathname.split("?")[0].split("#")[0]

  if (formName) {
    const formTitle = getFormRouteTitle(path, formName)
    if (formTitle) return formTitle
  }

  if (campaignName) {
    const campaignTitle = getCampaignRouteTitle(path, campaignName)
    if (campaignTitle) return campaignTitle
  }

  if (workflowName) {
    const workflowMatch = path.match(/^\/workflows\/([^/]+)$/)
    if (
      workflowMatch?.[1] &&
      workflowMatch[1] !== "new" &&
      workflowMatch[1] !== "templates"
    ) {
      return workflowName
    }
  }

  const workflowDetailMatch = path.match(/^\/workflows\/([^/]+)$/)
  if (
    workflowDetailMatch?.[1] &&
    workflowDetailMatch[1] !== "new" &&
    workflowDetailMatch[1] !== "templates"
  ) {
    return "Workflow"
  }

  const campaignDetailMatch = path.match(
    /^\/broadcasts\/campaigns\/([^/]+)(?:\/([^/]+))?$/,
  )
  if (campaignDetailMatch?.[1]) {
    const tab = campaignDetailMatch[2]
    const tabLabel = tab ? CAMPAIGN_DETAIL_TAB_LABELS[tab] : undefined
    return tabLabel ? `${tabLabel} | Campaign` : "Campaign"
  }

  const tabLabel = getTabLabelForPath(pathname)
  if (tabLabel) {
    if (path === "/forms/chargeable-items/new") return "Create chargeable item"
    if (path === "/forms/forms/new") return "Create form"
    if (path === "/broadcasts/campaigns/new") return "Create broadcast"

    const paymentItemMatch = path.match(/^\/forms\/chargeable-items\/([^/]+)$/)
    if (paymentItemMatch?.[1] && paymentItemMatch[1] !== "new") {
      return "Edit chargeable item"
    }

    return tabLabel
  }
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
    let cancelled = false
    const path = pathname.split("?")[0].split("#")[0]

    if (HOME_PATHS.has(path)) {
      document.title = "Gecko"
      return
    }

    async function resolveTitle() {
      const formMatch = path.match(/^\/forms\/forms\/([^/]+)/)
      if (
        formMatch?.[1] &&
        formMatch[1] !== "new" &&
        isSupabaseConfigured()
      ) {
        try {
          const form = await formsRepository.getFormById(formMatch[1])
          if (!cancelled && form) {
            document.title = `${getPageTitle(pathname, form.name)} | Gecko`
            return
          }
        } catch {
          // Fall back to a generic title below.
        }
      }

      const paymentItemMatch = path.match(/^\/forms\/chargeable-items\/([^/]+)$/)
      if (
        paymentItemMatch?.[1] &&
        paymentItemMatch[1] !== "new" &&
        isSupabaseConfigured()
      ) {
        try {
          const paymentItem = await paymentItemsRepository.getPaymentItemById(
            paymentItemMatch[1],
          )
          if (!cancelled && paymentItem) {
            document.title = `Edit chargeable item | ${paymentItem.name} | Gecko`
            return
          }
        } catch {
          // Fall back to a generic title below.
        }
      }

      const campaignMatch = path.match(/^\/broadcasts\/campaigns\/([^/]+)/)
      if (campaignMatch?.[1] && isSupabaseConfigured()) {
        try {
          const campaign =
            await broadcastCampaignsRepository.getBroadcastCampaignById(
              campaignMatch[1],
            )
          if (!cancelled && campaign) {
            document.title = `${getPageTitle(pathname, undefined, campaign.name)} | Gecko`
            return
          }
        } catch {
          // Fall back to a generic title below.
        }
      }

      const workflowMatch = path.match(/^\/workflows\/([^/]+)$/)
      if (
        workflowMatch?.[1] &&
        workflowMatch[1] !== "new" &&
        workflowMatch[1] !== "templates" &&
        isSupabaseConfigured()
      ) {
        try {
          const workflow = await workflowsRepository.getWorkflowById(
            workflowMatch[1],
          )
          if (!cancelled && workflow) {
            document.title = `${getPageTitle(pathname, undefined, undefined, workflow.name)} | Gecko`
            return
          }
        } catch {
          // Fall back to a generic title below.
        }
      }

      if (!cancelled) {
        document.title = formatDocumentTitle(pathname)
      }
    }

    void resolveTitle()

    return () => {
      cancelled = true
    }
  }, [pathname])
}
