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

export default function PortalTasksAndObjectivesPage() {
  const { pathname } = useLocation()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Tasks and objectives"
        primaryAction={{ label: "Create new task" }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite(
              { path: pathname, label: "Tasks and objectives" },
              next
            )
          },
        }}
      />
      <Container>
        <Empty>
          <EmptyMedia variant="icon">
            <Inbox />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No tasks and objectives yet</EmptyTitle>
            <EmptyDescription>
              Content for this area is coming soon.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Container>
    </div>
  )
}
