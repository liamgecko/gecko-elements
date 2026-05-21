import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const USERS_TAB_PATHS = {
  active: "/settings/users/active",
  pending: "/settings/users/pending",
  archive: "/settings/users/archive",
} as const

type UsersTab = keyof typeof USERS_TAB_PATHS

function usersTabFromPath(pathname: string): UsersTab {
  if (pathname.includes("/pending")) return "pending"
  if (pathname.includes("/archive")) return "archive"
  return "active"
}

export default function SettingsUsersLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = usersTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Users"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Users"
        primaryAction={{ label: "Create new user" }}
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
              const path = USERS_TAB_PATHS[value as UsersTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "archive", label: "Archive" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
