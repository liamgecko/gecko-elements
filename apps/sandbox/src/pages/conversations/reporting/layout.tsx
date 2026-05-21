import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../../state/favourites"
import { getTabLabelForPath } from "../../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../../lib/use-page-breadcrumbs"

const REPORTING_TAB_PATHS = {
  conversations: "/conversations/reporting/conversations",
  agents: "/conversations/reporting/agents",
  teams: "/conversations/reporting/teams",
  bots: "/conversations/reporting/bots",
  ratings: "/conversations/reporting/ratings",
  labels: "/conversations/reporting/labels",
} as const

type ReportingTab = keyof typeof REPORTING_TAB_PATHS

function reportingTabFromPath(pathname: string): ReportingTab {
  if (pathname.includes("/reporting/agents")) return "agents"
  if (pathname.includes("/reporting/teams")) return "teams"
  if (pathname.includes("/reporting/bots")) return "bots"
  if (pathname.includes("/reporting/ratings")) return "ratings"
  if (pathname.includes("/reporting/labels")) return "labels"
  return "conversations"
}

export default function ConversationsReportingLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = reportingTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Reporting"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Reporting"
        secondaryActions={[{ label: "Print" }]}
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
              const path = REPORTING_TAB_PATHS[value as ReportingTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "conversations", label: "Conversations" },
            { value: "agents", label: "Agents" },
            { value: "teams", label: "Teams" },
            { value: "bots", label: "Bots" },
            { value: "ratings", label: "Ratings" },
            { value: "labels", label: "Labels" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
