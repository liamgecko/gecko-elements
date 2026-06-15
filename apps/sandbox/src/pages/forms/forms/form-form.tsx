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

export type FormFormValues = {
  name: string
}

export type FormFormErrors = {
  name?: string
}

export function validateFormForm(name: string): FormFormErrors {
  const errors: FormFormErrors = {}

  if (!name.trim()) {
    errors.name = "Please enter a name for the form."
  }

  return errors
}

type FormFormProps = {
  title: string
  submitLabel: string
  initialValues?: FormFormValues
  isSaving?: boolean
  onSubmit: (values: FormFormValues) => Promise<void>
}

export function FormForm({
  title,
  submitLabel,
  initialValues,
  isSaving = false,
  onSubmit,
}: FormFormProps) {
  const navigate = useNavigate()

  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [errors, setErrors] = React.useState<FormFormErrors>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateFormForm(name)
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
              <FieldLabel htmlFor="form-name">Name</FieldLabel>
              <Input
                id="form-name"
                type="text"
                placeholder="e.g. Undergraduate application"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "form-name-error" : undefined}
              />
              {errors.name ? (
                <FieldError id="form-name-error">{errors.name}</FieldError>
              ) : (
                <FieldDescription>
                  This name is shown in the forms list and form header.
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
            onClick={() => navigate("/forms/forms")}
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
