import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const RESPONSES_TAB_PATHS = {
  responses: "/responses/all-responses",
  payments: "/responses/payments",
  quarantine: "/responses/quarantine",
} as const

type ResponsesTab = keyof typeof RESPONSES_TAB_PATHS

function responsesTabFromPath(pathname: string): ResponsesTab {
  if (pathname.startsWith("/responses/payments")) return "payments"
  if (pathname.startsWith("/responses/quarantine")) return "quarantine"
  return "responses"
}

export default function ResponsesLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = responsesTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Responses"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Responses"
        primaryAction={{ label: "Create new response" }}
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
              const path = RESPONSES_TAB_PATHS[value as ResponsesTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "responses", label: "Responses" },
            { value: "payments", label: "Payments" },
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
