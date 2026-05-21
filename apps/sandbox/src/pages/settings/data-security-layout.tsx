import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const DATA_SECURITY_TAB_PATHS = {
  preferences: "/settings/data-security/preferences",
  "activity-log": "/settings/data-security/activity-log",
  "deleted-contacts": "/settings/data-security/deleted-contacts",
  "consent-reasons": "/settings/data-security/consent-reasons",
} as const

type DataSecurityTab = keyof typeof DATA_SECURITY_TAB_PATHS

function dataSecurityTabFromPath(pathname: string): DataSecurityTab {
  if (pathname.includes("/activity-log")) return "activity-log"
  if (pathname.includes("/deleted-contacts")) return "deleted-contacts"
  if (pathname.includes("/consent-reasons")) return "consent-reasons"
  return "preferences"
}

export default function SettingsDataSecurityLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = dataSecurityTabFromPath(pathname)
  const headerTitle = getTabLabelForPath(pathname) ?? "Data security"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title={headerTitle}
        primaryAction={
          activeTab === "consent-reasons"
            ? { label: "Create new consent reason" }
            : undefined
        }
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
              const path = DATA_SECURITY_TAB_PATHS[value as DataSecurityTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "preferences", label: "Preferences" },
            { value: "activity-log", label: "Activity log" },
            { value: "deleted-contacts", label: "Deleted contacts" },
            { value: "consent-reasons", label: "Consent reasons" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
