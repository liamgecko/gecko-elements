import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const AUTOMATION_TAB_PATHS = {
  "ai-agents": "/ai-and-automation/ai-agents",
  "mcp-servers": "/ai-and-automation/mcp-servers",
} as const

type AutomationTab = keyof typeof AUTOMATION_TAB_PATHS

const AUTOMATION_PAGE_CONFIG: Record<AutomationTab, { primaryLabel: string }> = {
  "ai-agents": { primaryLabel: "Create new agent" },
  "mcp-servers": { primaryLabel: "Create new MCP server" },
}

function automationTabFromPath(pathname: string): AutomationTab {
  if (pathname.startsWith("/ai-and-automation/mcp-servers")) return "mcp-servers"
  return "ai-agents"
}

export default function AiAndAutomationLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = automationTabFromPath(pathname)
  const page = AUTOMATION_PAGE_CONFIG[activeTab]
  const headerTitle = getTabLabelForPath(pathname) ?? "AI agents"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title={headerTitle}
        primaryAction={{ label: page.primaryLabel }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: headerTitle }, next)
          },
        }}
        tabs={{
          tabsProps: {
            value: activeTab,
            onValueChange: (value) => {
              const path = AUTOMATION_TAB_PATHS[value as AutomationTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "ai-agents", label: "AI agents" },
            { value: "mcp-servers", label: "MCP servers" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
