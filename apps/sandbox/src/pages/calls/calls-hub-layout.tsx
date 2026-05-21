import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const CALLS_HUB_TAB_PATHS = {
  overview: "/calls/calls/overview",
  "call-log": "/calls/calls/call-log",
  numbers: "/calls/calls/numbers",
  reporting: "/calls/calls/reporting",
  agents: "/calls/calls/agents",
} as const

type CallsHubTab = keyof typeof CALLS_HUB_TAB_PATHS

function callsHubTabFromPath(pathname: string): CallsHubTab {
  if (pathname.includes("/call-log")) return "call-log"
  if (pathname.includes("/calls/calls/numbers")) return "numbers"
  if (pathname.includes("/calls/calls/reporting")) return "reporting"
  if (pathname.includes("/calls/calls/agents")) return "agents"
  return "overview"
}

export default function CallsHubLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = callsHubTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Calls"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Calls"
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: favouriteLabel }, next)
          },
        }}
        tabs={{
          tabsProps: {
            value: activeTab,
            onValueChange: (value) => {
              const path = CALLS_HUB_TAB_PATHS[value as CallsHubTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "overview", label: "Overview" },
            { value: "call-log", label: "Call log" },
            { value: "numbers", label: "Numbers" },
            { value: "reporting", label: "Reporting" },
            { value: "agents", label: "Agents" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
