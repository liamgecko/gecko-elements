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

export default function SettingsUserGroupsPage() {
  const { pathname } = useLocation()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="User groups"
        primaryAction={{ label: "Create new user group" }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: "User groups" }, next)
          },
        }}
      />
      <Container>
        <Empty>
          <EmptyMedia variant="icon">
            <Inbox />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No user groups yet</EmptyTitle>
            <EmptyDescription>
              Content for this area is coming soon.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Container>
    </div>
  )
}
