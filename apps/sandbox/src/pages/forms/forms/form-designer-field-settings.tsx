import { CircleHelp } from "lucide-react"

import { Field, FieldGroup, FieldLabel } from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"
import { Switch } from "@gecko/ui/components/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"

import type { FormFieldCommonSettings } from "./form-designer-pages"

const CONTACT_FIELD_NONE = "none"

function placeholderHint(fieldType: string): string {
  switch (fieldType) {
    case "number":
      return "e.g. 123"
    case "email":
      return "e.g. name@example.com"
    case "telephone":
      return "e.g. +44 7700 900123"
    case "date":
      return "e.g. 01/01/2000"
    default:
      return "Enter placeholder text (optional)"
  }
}

type FormDesignerFieldSettingsFormProps = {
  fieldType: string
  settings: FormFieldCommonSettings
  onChange: (patch: Partial<FormFieldCommonSettings>) => void
}

/**
 * Shared field settings for all types. Type-specific options can be added
 * via `FormDesignerFieldTypeSettings` without changing the dialog shell.
 */
export function FormDesignerFieldSettingsForm({
  fieldType,
  settings,
  onChange,
}: FormDesignerFieldSettingsFormProps) {
  const ids = {
    label: `field-settings-label-${fieldType}`,
    helpText: `field-settings-help-${fieldType}`,
    placeholder: `field-settings-placeholder-${fieldType}`,
    templateTag: `field-settings-template-tag-${fieldType}`,
    contactField: `field-settings-contact-${fieldType}`,
    required: `field-settings-required-${fieldType}`,
    hidden: `field-settings-hidden-${fieldType}`,
  }

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor={ids.label}>Label</FieldLabel>
        <Input
          id={ids.label}
          value={settings.label}
          onChange={(event) => onChange({ label: event.target.value })}
          placeholder="Field label"
          maxLength={100}
          autoFocus
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={ids.helpText}>Help Text</FieldLabel>
        <Input
          id={ids.helpText}
          value={settings.helpText}
          onChange={(event) => onChange({ helpText: event.target.value })}
          placeholder="Enter help text (optional)"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={ids.placeholder}>Placeholder Text</FieldLabel>
        <Input
          id={ids.placeholder}
          value={settings.placeholder}
          onChange={(event) => onChange({ placeholder: event.target.value })}
          placeholder={placeholderHint(fieldType)}
        />
      </Field>

      <Field>
        <FieldLabel
          htmlFor={ids.templateTag}
          className="inline-flex items-center gap-1.5"
        >
          Template Tag
          <TooltipProvider delay={300}>
            <Tooltip>
              <TooltipTrigger
                type="button"
                className="inline-flex text-muted-foreground hover:text-foreground"
                aria-label="About template tags"
              >
                <CircleHelp className="size-3.5" aria-hidden />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-center">
                Use template tags to reference this field in emails and workflows.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </FieldLabel>
        <Input
          id={ids.templateTag}
          value={settings.templateTag}
          onChange={(event) => onChange({ templateTag: event.target.value })}
          placeholder="Enter a template tag, e.g. full_name"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={ids.contactField}>Contact Field</FieldLabel>
        <Select
          value={settings.contactFieldId || CONTACT_FIELD_NONE}
          onValueChange={(value) =>
            onChange({
              contactFieldId:
                !value || value === CONTACT_FIELD_NONE ? "" : String(value),
            })
          }
        >
          <SelectTrigger id={ids.contactField} className="w-full">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CONTACT_FIELD_NONE}>-</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor={ids.required}>Required</FieldLabel>
        <Switch
          id={ids.required}
          checked={settings.required}
          onCheckedChange={(checked) => onChange({ required: checked })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor={ids.hidden}>Hidden</FieldLabel>
        <Switch
          id={ids.hidden}
          checked={settings.hidden}
          onCheckedChange={(checked) => onChange({ hidden: checked })}
        />
      </Field>

      <FormDesignerFieldTypeSettings
        fieldType={fieldType}
        settings={settings}
        onChange={onChange}
      />
    </FieldGroup>
  )
}

/** Hook for per-type settings; currently shared options only. */
function FormDesignerFieldTypeSettings({
  fieldType: _fieldType,
  settings: _settings,
  onChange: _onChange,
}: FormDesignerFieldSettingsFormProps) {
  return null
}
