import { useLocation } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

export default function IntegrationsPage() {
  const { pathname } = useLocation()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Integrations"
        primaryAction={{ label: "Create new integration" }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: "Integrations" }, next)
          },
        }}
      />
      <Container />
    </div>
  )
}
