import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const SENDERS_TAB_PATHS = {
  senders: "/broadcasts/senders",
  domains: "/broadcasts/domains",
} as const

type SendersTab = keyof typeof SENDERS_TAB_PATHS

const SENDERS_PAGE_CONFIG: Record<SendersTab, { primaryLabel: string }> = {
  senders: { primaryLabel: "Create new sender" },
  domains: { primaryLabel: "Create new domain" },
}

function sendersTabFromPath(pathname: string): SendersTab {
  if (pathname.startsWith("/broadcasts/domains")) return "domains"
  return "senders"
}

export default function BroadcastsSendersLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = sendersTabFromPath(pathname)
  const page = SENDERS_PAGE_CONFIG[activeTab]
  const headerTitle = getTabLabelForPath(pathname) ?? "Senders"

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
              const path = SENDERS_TAB_PATHS[value as SendersTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "senders", label: "Senders" },
            { value: "domains", label: "Domains" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
