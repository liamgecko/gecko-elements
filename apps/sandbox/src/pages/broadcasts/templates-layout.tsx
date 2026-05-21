import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const TEMPLATES_TAB_PATHS = {
  templates: "/broadcasts/templates",
  "deleted-templates": "/broadcasts/deleted-templates",
} as const

type TemplatesTab = keyof typeof TEMPLATES_TAB_PATHS

function templatesTabFromPath(pathname: string): TemplatesTab {
  if (pathname.startsWith("/broadcasts/deleted-templates")) {
    return "deleted-templates"
  }
  return "templates"
}

export default function BroadcastsTemplatesLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = templatesTabFromPath(pathname)
  const headerTitle = getTabLabelForPath(pathname) ?? "Templates"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title={headerTitle}
        primaryAction={{ label: "Create new template" }}
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
              const path = TEMPLATES_TAB_PATHS[value as TemplatesTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "templates", label: "Templates" },
            { value: "deleted-templates", label: "Deleted templates" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
