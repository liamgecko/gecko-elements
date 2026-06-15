import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const FORMS_TAB_PATHS = {
  forms: "/forms/forms",
  "archived-forms": "/forms/archived-forms",
  "contact-fields": "/forms/contact-fields",
  "field-groups": "/forms/field-groups",
  "field-options": "/forms/field-options",
  "payment-items": "/forms/payment-items",
} as const

type FormsTab = keyof typeof FORMS_TAB_PATHS

const FORMS_PAGE_CONFIG: Record<FormsTab, { primaryLabel: string }> = {
  forms: { primaryLabel: "Create new form" },
  "archived-forms": { primaryLabel: "Create new form" },
  "contact-fields": { primaryLabel: "Create new contact field" },
  "field-groups": { primaryLabel: "Create new field group" },
  "field-options": { primaryLabel: "Create new field option" },
  "payment-items": { primaryLabel: "Create new payment item" },
}

function formsTabFromPath(pathname: string): FormsTab {
  if (pathname.startsWith("/forms/archived-forms")) return "archived-forms"
  if (pathname.startsWith("/forms/contact-fields")) return "contact-fields"
  if (pathname.startsWith("/forms/field-groups")) return "field-groups"
  if (pathname.startsWith("/forms/field-options")) return "field-options"
  if (pathname.startsWith("/forms/payment-items")) return "payment-items"
  return "forms"
}

function isPaymentItemSubPage(pathname: string) {
  return (
    pathname.startsWith("/forms/payment-items/") &&
    pathname !== "/forms/payment-items"
  )
}

function isFormSubPage(pathname: string) {
  return (
    pathname.startsWith("/forms/forms/") && pathname !== "/forms/forms"
  )
}

export default function FormsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = formsTabFromPath(pathname)
  const page = FORMS_PAGE_CONFIG[activeTab]
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Forms"
  const onPaymentItemSubPage = isPaymentItemSubPage(pathname)
  const onFormSubPage = isFormSubPage(pathname)

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Forms"
        primaryAction={
          onPaymentItemSubPage || onFormSubPage || activeTab === "archived-forms"
            ? undefined
            : {
                label: page.primaryLabel,
                onClick:
                  activeTab === "payment-items"
                    ? () => navigate("/forms/payment-items/new")
                    : activeTab === "forms"
                      ? () => navigate("/forms/forms/new")
                      : undefined,
              }
        }
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
            { value: "archived-forms", label: "Archived forms" },
            { value: "contact-fields", label: "Contact fields" },
            { value: "field-groups", label: "Field groups" },
            { value: "field-options", label: "Field options" },
            { value: "payment-items", label: "Payment items" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
