/** Tab labels for tabbed routes — used by document title and favourites, not the page header. */

function normalizePath(pathname: string) {
  return pathname.split("?")[0].split("#")[0]
}

type TabResolver = {
  match: (path: string) => boolean
  label: (path: string) => string | undefined
}

const TABBED_SECTIONS: TabResolver[] = [
  {
    match: (path) => path.startsWith("/responses"),
    label: (path) => {
      if (path.startsWith("/responses/payments")) return "Payments"
      if (path.startsWith("/responses/quarantine")) return "Quarantine"
      return "Responses"
    },
  },
  {
    match: (path) =>
      path === "/applications" || path.startsWith("/applications/"),
    label: (path) => {
      if (path.startsWith("/applications/quarantine")) return "Quarantine"
      return "Applications"
    },
  },
  {
    match: (path) => path.startsWith("/events"),
    label: (path) => {
      if (path.startsWith("/events/hosts")) return "Hosts"
      if (path.startsWith("/events/locations")) return "Locations"
      if (path.startsWith("/events/share")) return "Share"
      if (path.startsWith("/events/deleted-events")) return "Deleted events"
      return "Events"
    },
  },
  {
    match: (path) => path.startsWith("/forms"),
    label: (path) => {
      if (path.startsWith("/forms/archived-forms")) return "Archived forms"
      if (path.startsWith("/forms/contact-fields")) return "Contact fields"
      if (path.startsWith("/forms/field-groups")) return "Field groups"
      if (path.startsWith("/forms/field-options")) return "Field options"
      if (path.startsWith("/forms/chargeable-items")) return "Chargeable items"
      return "Forms"
    },
  },
  {
    match: (path) => path.startsWith("/ai-and-automation"),
    label: (path) => {
      if (path.startsWith("/ai-and-automation/mcp-servers")) return "MCP servers"
      return "AI agents"
    },
  },
  {
    match: (path) =>
      path.startsWith("/broadcasts/templates") ||
      path.startsWith("/broadcasts/deleted-templates"),
    label: (path) => {
      if (path.startsWith("/broadcasts/deleted-templates")) {
        return "Deleted templates"
      }
      return "Templates"
    },
  },
  {
    match: (path) =>
      path.startsWith("/broadcasts/senders") ||
      path.startsWith("/broadcasts/domains") ||
      path.startsWith("/broadcasts/senders-and-domains") ||
      path.startsWith("/broadcasts/verified-senders-and-domains"),
    label: (path) => {
      if (path.startsWith("/broadcasts/domains")) return "Domains"
      return "Senders"
    },
  },
  {
    match: (path) =>
      path === "/workflows" ||
      path.startsWith("/workflows/templates"),
    label: (path) => {
      if (path.startsWith("/workflows/templates")) return "Templates"
      return "Workflows"
    },
  },
  {
    match: (path) => path.startsWith("/conversations/reporting"),
    label: (path) => {
      if (path.includes("/reporting/agents")) return "Agents"
      if (path.includes("/reporting/teams")) return "Teams"
      if (path.includes("/reporting/bots")) return "Bots"
      if (path.includes("/reporting/ratings")) return "Ratings"
      if (path.includes("/reporting/labels")) return "Labels"
      return "Conversations"
    },
  },
  {
    match: (path) => path.startsWith("/calls/calls"),
    label: (path) => {
      if (path.includes("/call-log")) return "Call log"
      if (path.includes("/calls/calls/numbers")) return "Numbers"
      if (path.includes("/calls/calls/reporting")) return "Reporting"
      if (path.includes("/calls/calls/agents")) return "Agents"
      return "Overview"
    },
  },
  {
    match: (path) => path.startsWith("/calls/usage-and-costs"),
    label: (path) => {
      if (path.includes("/call-usage")) return "Call usage"
      if (path.includes("/sms-usage")) return "SMS usage"
      return "Transactions"
    },
  },
  {
    match: (path) => path.startsWith("/settings/account-settings"),
    label: (path) => {
      if (path.includes("/date-and-time")) return "Date and time"
      if (path.includes("/communication")) return "Communication"
      if (path.includes("/branding")) return "Branding"
      if (path.includes("/analytics")) return "Analytics"
      return "Basic details"
    },
  },
  {
    match: (path) => path.startsWith("/settings/user-settings"),
    label: (path) => {
      if (path.includes("/chat-settings")) return "Chat settings"
      if (path.includes("/permissions")) return "Permissions"
      return "Basic settings"
    },
  },
  {
    match: (path) => path.startsWith("/settings/users"),
    label: (path) => {
      if (path.includes("/pending")) return "Pending"
      if (path.includes("/archive")) return "Archive"
      return "Active"
    },
  },
  {
    match: (path) => path.startsWith("/settings/data-security"),
    label: (path) => {
      if (path.includes("/activity-log")) return "Activity log"
      if (path.includes("/deleted-contacts")) return "Deleted contacts"
      if (path.includes("/consent-reasons")) return "Consent reasons"
      return "Preferences"
    },
  },
]

export function getTabLabelForPath(pathname: string): string | undefined {
  const path = normalizePath(pathname)
  for (const section of TABBED_SECTIONS) {
    if (section.match(path)) {
      return section.label(path)
    }
  }
  return undefined
}

export function isTabbedPath(pathname: string) {
  return getTabLabelForPath(pathname) !== undefined
}
