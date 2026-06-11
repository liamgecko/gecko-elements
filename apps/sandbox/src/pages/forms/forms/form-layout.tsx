import { Cog, Home, Save } from "lucide-react"
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../../state/favourites"
import {
  formHeaderMenuItems,
  getFormById,
  getFormPath,
} from "./forms-data"

const FORM_TAB_PATHS = {
  designer: "designer",
  workflows: "workflows",
  settings: "settings",
  visibility: "visibility",
  share: "share",
} as const

type FormTab = keyof typeof FORM_TAB_PATHS

function formTabFromPath(pathname: string): FormTab {
  if (pathname.includes("/workflows")) return "workflows"
  if (pathname.includes("/settings")) return "settings"
  if (pathname.includes("/visibility")) return "visibility"
  if (pathname.includes("/share")) return "share"
  return "designer"
}

export default function FormLayout() {
  const { formId = "" } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isFavourited, setFavourite } = useFavourites()

  const form = getFormById(formId)

  if (!form) {
    return <Navigate to="/forms/forms" replace />
  }

  const activeTab = formTabFromPath(pathname)
  const formPath = getFormPath(formId, activeTab)

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={{
          items: [
            {
              label: (
                <>
                  <Home className="size-3.5" />
                  <span className="sr-only">Home</span>
                </>
              ),
              href: "/home",
              onSelect: () => navigate("/home"),
            },
            {
              label: "Forms",
              href: "/forms/forms",
              onSelect: () => navigate("/forms/forms"),
            },
            {
              label: form.name,
              current: true,
            },
          ],
        }}
        title={form.name}
        favouriteAction={{
          pressed: isFavourited(formPath),
          onPressedChange: (next) => {
            setFavourite({ path: formPath, label: form.name }, next)
          },
        }}
        secondaryActions={[
          {
            kind: "menu",
            label: "Actions",
            icon: <Cog aria-hidden />,
            ariaLabel: "Form actions",
            items: [...formHeaderMenuItems],
          },
        ]}
        primaryAction={{
          label: "Save changes",
          icon: <Save aria-hidden className="size-4 shrink-0" />,
        }}
        tabs={{
          tabsProps: {
            value: activeTab,
            onValueChange: (value) => {
              const tab = FORM_TAB_PATHS[value as FormTab]
              if (tab) navigate(getFormPath(formId, tab))
            },
          },
          items: [
            { value: "designer", label: "Designer" },
            { value: "workflows", label: "Workflows" },
            { value: "settings", label: "Settings" },
            { value: "visibility", label: "Visibility" },
            { value: "share", label: "Share" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
