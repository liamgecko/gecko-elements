import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const FORMS_TAB_PATHS = {
  forms: "/forms/forms",
  "contact-fields": "/forms/contact-fields",
  "field-groups": "/forms/field-groups",
  "field-options": "/forms/field-options",
} as const

type FormsTab = keyof typeof FORMS_TAB_PATHS

const FORMS_PAGE_CONFIG: Record<FormsTab, { primaryLabel: string }> = {
  forms: { primaryLabel: "Create new form" },
  "contact-fields": { primaryLabel: "Create new contact field" },
  "field-groups": { primaryLabel: "Create new field group" },
  "field-options": { primaryLabel: "Create new field option" },
}

function formsTabFromPath(pathname: string): FormsTab {
  if (pathname.startsWith("/forms/contact-fields")) return "contact-fields"
  if (pathname.startsWith("/forms/field-groups")) return "field-groups"
  if (pathname.startsWith("/forms/field-options")) return "field-options"
  return "forms"
}

export default function FormsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = formsTabFromPath(pathname)
  const page = FORMS_PAGE_CONFIG[activeTab]
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Forms"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Forms"
        primaryAction={{ label: page.primaryLabel }}
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
              const path = FORMS_TAB_PATHS[value as FormsTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "forms", label: "Forms" },
            { value: "contact-fields", label: "Contact fields" },
            { value: "field-groups", label: "Field groups" },
            { value: "field-options", label: "Field options" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
