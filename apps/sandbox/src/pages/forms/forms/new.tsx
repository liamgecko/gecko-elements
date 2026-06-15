import * as React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice"
import { formsRepository } from "@/data/repositories/formsRepository"
import { isSupabaseConfigured } from "@/lib/supabase/env"

import { FormForm } from "./form-form"
import { getFormPath } from "./forms-data"

export default function CreateFormPage() {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = React.useState(false)
  const configured = isSupabaseConfigured()

  if (!configured) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        <SupabaseSetupNotice />
      </div>
    )
  }

  return (
    <FormForm
      title="Create new form"
      submitLabel="Save form"
      isSaving={isSaving}
      onSubmit={async (values) => {
        setIsSaving(true)
        try {
          const form = await formsRepository.createForm({
            name: values.name,
          })
          toast.success("Form created successfully")
          navigate(getFormPath(form.id))
        } catch (err) {
          toast.error(
            err instanceof Error ? err.message : "Failed to create form",
          )
        } finally {
          setIsSaving(false)
        }
      }}
    />
  )
}
