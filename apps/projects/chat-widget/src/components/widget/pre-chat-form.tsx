import * as React from "react"

import { Button } from "@gecko/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import type { Visitor } from "@/lib/types"

type PreChatFormProps = {
  onSubmit: (visitor: Visitor) => void
}

type FormErrors = Partial<Record<"name" | "email", string>>

export function PreChatForm({ onSubmit }: PreChatFormProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [telephone, setTelephone] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (!name.trim()) nextErrors.name = "Name is required"
    if (!email.trim()) {
      nextErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address"
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      telephone: telephone.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6" noValidate>
      <FieldGroup>
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor="widget-name">
            Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="widget-name"
            name="name"
            autoComplete="name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <FieldError>{errors.name}</FieldError> : null}
        </Field>

        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor="widget-email">
            Email address <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="widget-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <FieldError>{errors.email}</FieldError> : null}
        </Field>

        <Field>
          <FieldLabel htmlFor="widget-telephone">Telephone number</FieldLabel>
          <Input
            id="widget-telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            placeholder="Enter your telephone number"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full">
        Start conversation
      </Button>
    </form>
  )
}
