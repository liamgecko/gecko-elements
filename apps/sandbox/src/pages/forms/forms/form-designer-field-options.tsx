import * as React from "react"
import { useDraggable } from "@dnd-kit/react"
import { CircleHelp, Plus } from "lucide-react"

import { buttonVariants } from "@gecko/ui/components/button"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@gecko/ui/components/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

import {
  FORM_FIELD_PALETTE_TYPE,
  type FormFieldOptionData,
} from "./form-designer-dnd"

export type FormFieldOption = {
  id: string
  label: string
  help?: string
}

const CONTACT_FIELD_OPTIONS: FormFieldOption[] = [
  { id: "full-name", label: "Full Name (s)" },
  { id: "telephone", label: "Telephone (s)" },
  { id: "email-address", label: "Email address (s)" },
  { id: "country", label: "Country" },
  { id: "date-of-birth", label: "Date of Birth" },
  { id: "field-with-deleted-options", label: "Field with deleted options list" },
  { id: "email-pref", label: "Email pref" },
  { id: "gdpr-consent", label: "GDPR Consent" },
  { id: "course-heu-clearing-2020", label: "Course - HEU Clearing 2020" },
  { id: "email-consent-qa-again", label: "Email Consent - QA - AGAIN" },
  { id: "colour", label: "Colour" },
  { id: "e-mail", label: "E-mail" },
  { id: "nationality", label: "Nationality" },
  { id: "checkbox-field", label: "(Checkobox) Field" },
]

export const FORM_FIELD_OPTIONS: FormFieldOption[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "telephone", label: "Telephone" },
  { id: "text-single-line", label: "Text - Single Line" },
  { id: "text-multiple-lines", label: "Text - Multiple Lines" },
  { id: "dropdown-single", label: "Dropdown - Single Choice" },
  { id: "dropdown-multiple", label: "Dropdown - Multiple Choice" },
  { id: "radio-single", label: "Radio - Single Choice" },
  { id: "checkbox-true-false", label: "Checkbox - True/False" },
  { id: "checkbox-multiple", label: "Checkbox - Multiple Choice" },
  { id: "date", label: "Date" },
  { id: "number", label: "Number" },
  { id: "address", label: "Address" },
  { id: "hidden", label: "Hidden" },
  { id: "event", label: "Event", help: "More information about Event fields." },
  { id: "organisation", label: "Organisation" },
  { id: "form-section", label: "Form Section" },
  {
    id: "text-block",
    label: "Text Block",
    help: "More information about Text Block fields.",
  },
  { id: "media", label: "Media", help: "More information about Media fields." },
  { id: "file", label: "File", help: "More information about File fields." },
  {
    id: "repeatable",
    label: "Repeatable",
    help: "More information about Repeatable fields.",
  },
  {
    id: "matrix",
    label: "Matrix",
    help: "More information about Matrix fields.",
  },
  { id: "consent", label: "Consent" },
]

function FieldOptionRow({
  option,
  onAdd,
}: {
  option: FormFieldOption
  onAdd?: (option: FormFieldOption) => void
}) {
  const { ref, handleRef, isDragging } = useDraggable({
    id: `palette:${option.id}`,
    type: FORM_FIELD_PALETTE_TYPE,
    data: {
      fieldType: option.id,
      label: option.label,
    } satisfies FormFieldOptionData,
    disabled: !onAdd,
  })
  const suppressClickRef = React.useRef(false)

  const setRowRef = React.useCallback(
    (node: HTMLElement | null) => {
      ref(node)
      handleRef(node)
    },
    [ref, handleRef],
  )

  React.useEffect(() => {
    if (isDragging) {
      suppressClickRef.current = true
    }
  }, [isDragging])

  const helpIcon = option.help ? (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            className="inline-flex shrink-0"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <CircleHelp aria-hidden className="size-3.5" />
          </span>
        }
      />
      <TooltipContent>{option.help}</TooltipContent>
    </Tooltip>
  ) : null

  return (
    <div
      ref={setRowRef}
      role="button"
      tabIndex={onAdd ? 0 : -1}
      aria-disabled={!onAdd}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "h-auto min-h-7 w-full justify-start",
        isDragging && "opacity-50",
        onAdd && "cursor-grab active:cursor-grabbing",
        !onAdd && "pointer-events-none opacity-75",
      )}
      onClick={() => {
        if (!onAdd) return
        if (suppressClickRef.current) {
          suppressClickRef.current = false
          return
        }
        onAdd(option)
      }}
      onKeyDown={(event) => {
        if (!onAdd) return
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onAdd(option)
        }
      }}
    >
      <Plus aria-hidden data-icon="inline-start" />
      <span className="min-w-0 flex-1 truncate text-start">{option.label}</span>
      {helpIcon}
    </div>
  )
}

function FieldOptionsList({
  options,
  onAdd,
}: {
  options: FormFieldOption[]
  onAdd?: (option: FormFieldOption) => void
}) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1 px-3 pb-3">
        {options.map((option) => (
          <FieldOptionRow key={option.id} option={option} onAdd={onAdd} />
        ))}
      </div>
    </ScrollArea>
  )
}

type FormDesignerFieldOptionsProps = {
  onAddField: (option: FormFieldOption) => void
}

export function FormDesignerFieldOptions({
  onAddField,
}: FormDesignerFieldOptionsProps) {
  return (
    <Tabs
      defaultValue="form-fields"
      className="flex h-full min-h-0 flex-col gap-2"
    >
      <div className="shrink-0 px-3 pt-3">
        <TabsList fullWidth className="w-full">
          <TabsTrigger value="contact-fields" className="text-xs">
            Contact Fields
          </TabsTrigger>
          <TabsTrigger value="form-fields" className="text-xs">
            Form Fields
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="contact-fields"
        className="mt-0 min-h-0 flex-1 overflow-hidden"
      >
        <FieldOptionsList options={CONTACT_FIELD_OPTIONS} />
      </TabsContent>

      <TabsContent
        value="form-fields"
        className="mt-0 min-h-0 flex-1 overflow-hidden"
      >
        <FieldOptionsList
          options={FORM_FIELD_OPTIONS}
          onAdd={onAddField}
        />
      </TabsContent>
    </Tabs>
  )
}
