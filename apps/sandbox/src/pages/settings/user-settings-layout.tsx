import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const USER_SETTINGS_TAB_PATHS = {
  "basic-settings": "/settings/user-settings/basic-settings",
  "chat-settings": "/settings/user-settings/chat-settings",
  permissions: "/settings/user-settings/permissions",
} as const

type UserSettingsTab = keyof typeof USER_SETTINGS_TAB_PATHS

function userSettingsTabFromPath(pathname: string): UserSettingsTab {
  if (pathname.includes("/chat-settings")) return "chat-settings"
  if (pathname.includes("/permissions")) return "permissions"
  return "basic-settings"
}

export default function SettingsUserSettingsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = userSettingsTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "User settings"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="User settings"
        primaryAction={{ label: "Save settings" }}
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
              const path = USER_SETTINGS_TAB_PATHS[value as UserSettingsTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "basic-settings", label: "Basic settings" },
            { value: "chat-settings", label: "Chat settings" },
            { value: "permissions", label: "Permissions" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
