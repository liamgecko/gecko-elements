import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const APPLICATIONS_TAB_PATHS = {
  applications: "/applications",
  quarantine: "/applications/quarantine",
} as const

type ApplicationsTab = keyof typeof APPLICATIONS_TAB_PATHS

function applicationsTabFromPath(pathname: string): ApplicationsTab {
  if (pathname.startsWith("/applications/quarantine")) return "quarantine"
  return "applications"
}

export default function ApplicationsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = applicationsTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Applications"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Applications"
        primaryAction={{ label: "Create new applicant" }}
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
              const path = APPLICATIONS_TAB_PATHS[value as ApplicationsTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "applications", label: "Applications" },
            { value: "quarantine", label: "Quarantine" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
