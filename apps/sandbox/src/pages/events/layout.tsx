import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const EVENTS_TAB_PATHS = {
  events: "/events/events",
  hosts: "/events/hosts",
  locations: "/events/locations",
  share: "/events/share",
  "deleted-events": "/events/deleted-events",
} as const

type EventsTab = keyof typeof EVENTS_TAB_PATHS

const EVENTS_PAGE_CONFIG: Record<EventsTab, { primaryLabel: string }> = {
  events: { primaryLabel: "Create new event" },
  hosts: { primaryLabel: "Create new host" },
  locations: { primaryLabel: "Create new location" },
  share: { primaryLabel: "Create new event" },
  "deleted-events": { primaryLabel: "Create new event" },
}

function eventsTabFromPath(pathname: string): EventsTab {
  if (pathname.startsWith("/events/hosts")) return "hosts"
  if (pathname.startsWith("/events/locations")) return "locations"
  if (pathname.startsWith("/events/share")) return "share"
  if (pathname.startsWith("/events/deleted-events")) return "deleted-events"
  return "events"
}

export default function EventsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = eventsTabFromPath(pathname)
  const page = EVENTS_PAGE_CONFIG[activeTab]
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Events"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Events"
        primaryAction={{ label: page.primaryLabel }}
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
              const path = EVENTS_TAB_PATHS[value as EventsTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "events", label: "Events" },
            { value: "hosts", label: "Hosts" },
            { value: "locations", label: "Locations" },
            { value: "share", label: "Share" },
            { value: "deleted-events", label: "Deleted events" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
