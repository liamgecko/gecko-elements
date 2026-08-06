import * as React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Container } from "@gecko/ui/components/container"
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice"
import { formsRepository } from "@/data/repositories/formsRepository"
import { isSupabaseConfigured } from "@/lib/supabase/env"
import { useFavourites } from "../../../state/favourites"

import { FormBuilderHeader } from "./form-builder-header"
import { FormDesigner } from "./form-designer"
import { promoteDraftFormDesignerPages } from "./form-designer-persistence"
import { getFormPath } from "./forms-data"

const DEFAULT_FORM_NAME = "Your form"

export default function CreateFormPage() {
  const navigate = useNavigate()
  const { isFavourited, setFavourite } = useFavourites()
  const [formName, setFormName] = React.useState(DEFAULT_FORM_NAME)
  const [isSaving, setIsSaving] = React.useState(false)
  const configured = isSupabaseConfigured()
  const createPath = "/forms/forms/new"
  const headerTitle = formName.trim() || DEFAULT_FORM_NAME

  const handleSave = async () => {
    if (!configured) return

    setIsSaving(true)
    try {
      const form = await formsRepository.createForm({
        name: headerTitle,
      })
      promoteDraftFormDesignerPages(form.id)
      toast.success("Form created successfully")
      navigate(getFormPath(form.id))
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create form",
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col overflow-hidden">
      <FormBuilderHeader
        title={headerTitle}
        showActionsMenu={false}
        favouriteAction={{
          pressed: isFavourited(createPath),
          onPressedChange: (next) => {
            setFavourite({ path: createPath, label: headerTitle }, next)
          },
        }}
        primaryAction={{
          label: "Save form",
          onClick: () => void handleSave(),
          loading: isSaving,
          disabled: !configured,
        }}
      />
      <Container className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {!configured ? (
          <SupabaseSetupNotice />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <FormDesigner
              formName={formName}
              onFormNameChange={setFormName}
            />
          </div>
        )}
      </Container>
    </div>
  )
}
