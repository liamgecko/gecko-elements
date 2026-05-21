import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const ACCOUNT_SETTINGS_TAB_PATHS = {
  "basic-details": "/settings/account-settings/basic-details",
  "date-and-time": "/settings/account-settings/date-and-time",
  communication: "/settings/account-settings/communication",
  branding: "/settings/account-settings/branding",
  analytics: "/settings/account-settings/analytics",
} as const

type AccountSettingsTab = keyof typeof ACCOUNT_SETTINGS_TAB_PATHS

function accountSettingsTabFromPath(pathname: string): AccountSettingsTab {
  if (pathname.includes("/date-and-time")) return "date-and-time"
  if (pathname.includes("/communication")) return "communication"
  if (pathname.includes("/branding")) return "branding"
  if (pathname.includes("/analytics")) return "analytics"
  return "basic-details"
}

export default function SettingsAccountSettingsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = accountSettingsTabFromPath(pathname)
  const headerTitle = getTabLabelForPath(pathname) ?? "Account settings"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title={headerTitle}
        primaryAction={{ label: "Save settings" }}
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
              const path =
                ACCOUNT_SETTINGS_TAB_PATHS[value as AccountSettingsTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "basic-details", label: "Basic details" },
            { value: "date-and-time", label: "Date and time" },
            { value: "communication", label: "Communication" },
            { value: "branding", label: "Branding" },
            { value: "analytics", label: "Analytics" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
