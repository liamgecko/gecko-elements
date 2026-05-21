import { useLocation } from "react-router-dom"
import { Cog } from "lucide-react"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

export default function ContactsPage() {
  const { pathname } = useLocation()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Contacts"
        primaryAction={{ label: "Create new contact" }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: "Contacts" }, next)
          },
        }}
        secondaryActions={[
          {
            kind: "menu",
            icon: <Cog aria-hidden />,
            ariaLabel: "Contact options",
            items: [
              { label: "Import contacts" },
              { label: "Export contacts" },
              { label: "Contact field options" },
            ],
          },
        ]}
      />
      <Container />
    </div>
  )
}
