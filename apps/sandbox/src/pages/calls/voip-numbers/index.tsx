import { useLocation } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Inbox } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../../state/favourites"
import { usePageBreadcrumbs } from "../../../lib/use-page-breadcrumbs"

export default function CallsVoipNumbersPage() {
  const { pathname } = useLocation()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="VoIP numbers"
        primaryAction={{ label: "Create new number" }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: "VoIP numbers" }, next)
          },
        }}
      />
      <Container>
        <Empty>
          <EmptyMedia variant="icon">
            <Inbox />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No voip numbers yet</EmptyTitle>
            <EmptyDescription>
              Content for this area is coming soon.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Container>
    </div>
  )
}
