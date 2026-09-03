import { useOutletContext } from "react-router-dom"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"

import type { FormLayoutOutletContext, FormStatus } from "../../forms-data"

const FORM_STATUS_OPTIONS: { value: FormStatus; label: string }[] = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "unpublished", label: "Unpublished" },
]

export default function FormBasicSettingsPage() {
  const { draft, setDraft } = useOutletContext<FormLayoutOutletContext>()

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Basic settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the form name and status, then choose Update form in the header.
        </p>
      </div>

      <FieldGroup>
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="form-basic-name">Name</FieldLabel>
            <Input
              id="form-basic-name"
              type="text"
              placeholder="e.g. Undergraduate application"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
            />
            <FieldDescription>
              This name is shown in the forms list and form header.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="form-basic-status">Status</FieldLabel>
            <Select
              items={FORM_STATUS_OPTIONS}
              value={draft.status}
              onValueChange={(value) => {
                if (!value) return
                setDraft((current) => ({
                  ...current,
                  status: value as FormStatus,
                }))
              }}
            >
              <SelectTrigger id="form-basic-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {FORM_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
