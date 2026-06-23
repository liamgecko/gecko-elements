import * as React from "react"
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { Container } from "@gecko/ui/components/container"
import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import { formsRepository } from "@/data/repositories/formsRepository"
import { useForm } from "@/hooks/useForm"
import { useFavourites } from "../../../state/favourites"
import { FormArchiveDialog } from "./form-archive-dialog"
import { FormBuilderHeader } from "./form-builder-header"
import { validateFormForm } from "./form-form"
import {
  getFormPath,
  type Form,
  type FormDraft,
  type FormHeaderMenuActionId,
  type FormLayoutOutletContext,
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
  const { form, loading, error, configured, setForm } = useForm(formId)

  const [draft, setDraft] = React.useState<FormDraft>({ name: "", status: "draft" })
  const [isSaving, setIsSaving] = React.useState(false)
  const [formsToArchive, setFormsToArchive] = React.useState<Form[] | null>(null)

  const activeTab = formTabFromPath(pathname)
  const formPath = getFormPath(formId, activeTab)
  const headerTitle = draft.name.trim() || form?.name || "Form"
  const canUpdateForm = Boolean(form) && !loading

  React.useEffect(() => {
    if (!form) return

    setDraft({
      name: form.name,
      status: form.status,
    })
  }, [form])

  const outletContext = React.useMemo<FormLayoutOutletContext>(
    () => ({
      draft,
      setDraft,
    }),
    [draft],
  )

  const handleMenuAction = (action: FormHeaderMenuActionId) => {
    if (action === "archive" && form) {
      setFormsToArchive([form])
    }
  }

  const handleUpdate = async () => {
    if (!form) return

    const validationErrors = validateFormForm(draft.name)
    if (validationErrors.name) {
      toast.error(validationErrors.name)
      return
    }

    setIsSaving(true)

    try {
      const updated = await formsRepository.updateForm(form.id, {
        name: draft.name.trim(),
        status: draft.status,
      })
      setForm(updated)
      toast.success(`${updated.name} updated`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update form")
    } finally {
      setIsSaving(false)
    }
  }

  if (formId === "new") {
    return <Navigate to="/forms/forms/new" replace />
  }

  if (!configured) {
    return (
      <Container>
        <SupabaseSetupNotice />
      </Container>
    )
  }

  if (loading) {
    return (
      <Container>
        <p className="text-sm text-muted-foreground">Loading form…</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <DataLoadErrorAlert title="Could not load form" message={error} />
      </Container>
    )
  }

  if (!form) {
    return <Navigate to="/forms/forms" replace />
  }

  if (form.archived) {
    return <Navigate to="/forms/archived-forms" replace />
  }

  return (
    <div className="flex flex-col">
      <FormBuilderHeader
        title={headerTitle}
        loading={loading}
        onMenuAction={handleMenuAction}
        favouriteAction={{
          pressed: isFavourited(formPath),
          onPressedChange: (next) => {
            setFavourite({ path: formPath, label: headerTitle }, next)
          },
        }}
        primaryAction={
          canUpdateForm
            ? {
                label: "Update form",
                onClick: () => void handleUpdate(),
                loading: isSaving,
              }
            : undefined
        }
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
        <Outlet context={outletContext} />
      </Container>

      <FormArchiveDialog
        forms={formsToArchive}
        onOpenChange={(open) => {
          if (!open) {
            setFormsToArchive(null)
          }
        }}
        onArchived={() => navigate("/forms/archived-forms")}
      />
    </div>
  )
}
