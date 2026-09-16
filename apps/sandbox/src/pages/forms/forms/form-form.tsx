import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import * as React from "react"
import CheckCheck from "@hugeicons/core-free-icons/CheckCheckIcon";
import X from "@hugeicons/core-free-icons/XIcon";
import { useNavigate } from "react-router-dom"

import { Button } from "@geckolabs/elements/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@geckolabs/elements/components/field"
import { Input } from "@geckolabs/elements/components/input"

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

  const submitGuard = React.useRef(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateFormForm(name)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (submitGuard.current || isSaving) return;
    submitGuard.current = true;
    try {
      await onSubmit({
      name: name.trim(),
    })
    } finally {
      submitGuard.current = false;
    }
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
          <Button type="submit">
            <HugeiconsIcon icon={CheckCheck} aria-hidden />
            {submitLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/forms/forms")}

          >
            <HugeiconsIcon icon={X} aria-hidden />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
