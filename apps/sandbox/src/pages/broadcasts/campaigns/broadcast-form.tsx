import * as React from "react"
import { CheckCheck, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@gecko/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"

export type BroadcastFormValues = {
  name: string
}

export type BroadcastFormErrors = {
  name?: string
}

export function validateBroadcastForm(name: string): BroadcastFormErrors {
  const errors: BroadcastFormErrors = {}

  if (!name.trim()) {
    errors.name = "Please enter a name for the broadcast."
  }

  return errors
}

type BroadcastFormProps = {
  title: string
  submitLabel: string
  initialValues?: BroadcastFormValues
  isSaving?: boolean
  onSubmit: (values: BroadcastFormValues) => Promise<void>
}

export function BroadcastForm({
  title,
  submitLabel,
  initialValues,
  isSaving = false,
  onSubmit,
}: BroadcastFormProps) {
  const navigate = useNavigate()

  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [errors, setErrors] = React.useState<BroadcastFormErrors>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateBroadcastForm(name)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    await onSubmit({
      name: name.trim(),
    })
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <Field data-invalid={errors.name ? true : undefined}>
              <FieldLabel htmlFor="broadcast-name">Name</FieldLabel>
              <Input
                id="broadcast-name"
                type="text"
                placeholder="e.g. UCAS January deadline reminder"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={
                  errors.name ? "broadcast-name-error" : undefined
                }
              />
              {errors.name ? (
                <FieldError id="broadcast-name-error">{errors.name}</FieldError>
              ) : (
                <FieldDescription>
                  This name is shown in the campaigns list and broadcast header.
                </FieldDescription>
              )}
            </Field>
          </FieldSet>
        </FieldGroup>

        <div className="mt-6 flex items-center gap-2">
          <Button type="submit" disabled={isSaving}>
            <CheckCheck aria-hidden />
            {submitLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/broadcasts/campaigns")}
            disabled={isSaving}
          >
            <X aria-hidden />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
