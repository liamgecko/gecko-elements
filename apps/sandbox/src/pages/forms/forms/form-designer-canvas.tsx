import * as React from "react"
import type { Data } from "@dnd-kit/abstract"
import type { SortableDraggable } from "@dnd-kit/dom/sortable"
import { useDroppable } from "@dnd-kit/react"
import { useSortable } from "@dnd-kit/react/sortable"
import { Copy, Check, GripVertical, Layers, SquarePen, Trash2, X } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { Checkbox, CheckboxGroup } from "@gecko/ui/components/checkbox"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"
import { FieldDescription } from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover"
import { RadioGroup, RadioGroupItem } from "@gecko/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"
import { Textarea } from "@gecko/ui/components/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

import { usePaymentItems } from "@/hooks/usePaymentItems"
import {
  formatPaymentItemAmount,
  type PaymentItem,
} from "@/pages/forms/payment-items/payment-items-data"

import {
  FORM_CANVAS_DROPPABLE_ID,
  FORM_CANVAS_FIELD_TYPE,
  FORM_CANVAS_FIELDS_GROUP,
  FORM_FIELD_PALETTE_TYPE,
} from "./form-designer-dnd"
import { FormDesignerFieldEditDialog } from "./form-designer-field-edit-dialog"
import type {
  FormDesignerField,
  FormFieldChoice,
  FormFieldCommonSettings,
  ChargeableDisplayType,
} from "./form-designer-pages"

function choicePreviewLabel(
  choice: FormFieldChoice,
  paymentItemById: Map<string, PaymentItem>,
): string {
  const label = choice.label.trim()
  const paymentItem = choice.paymentItemId
    ? paymentItemById.get(choice.paymentItemId)
    : undefined

  if (paymentItem) {
    const amount = formatPaymentItemAmount(
      paymentItem.amount,
      paymentItem.currency,
    )
    if (label) return `${label} · ${amount}`
    return `${paymentItem.name} · ${amount}`
  }

  return label || "Untitled option"
}

function resolveChoiceDisplayType(
  fieldType: string,
  displayType: FormFieldCommonSettings["displayType"],
): ChargeableDisplayType | null {
  if (fieldType === "chargeable-item") {
    return displayType || "radio"
  }
  if (fieldType === "dropdown-single") return "single-select"
  if (fieldType === "dropdown-multiple") return "multi-select"
  if (fieldType === "radio-single") return "radio"
  if (fieldType === "checkbox-multiple") return "checkbox"
  return null
}

function ChoiceFieldPreview({
  fieldId,
  displayType,
  placeholder,
  choices,
  paymentItemById,
}: {
  fieldId: string
  displayType: ChargeableDisplayType
  placeholder?: string
  choices: FormFieldChoice[]
  paymentItemById: Map<string, PaymentItem>
}) {
  if (displayType === "single-select" || displayType === "multi-select") {
    return (
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              placeholder ||
              (displayType === "multi-select"
                ? "Select options…"
                : "Select an option…")
            }
          />
        </SelectTrigger>
        <SelectContent>
          {choices.length > 0 ? (
            choices.map((choice) => (
              <SelectItem key={choice.id} value={choice.id}>
                {choicePreviewLabel(choice, paymentItemById)}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="__empty" disabled>
              No options yet
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    )
  }

  if (displayType === "radio") {
    return (
      <RadioGroup value="" className="gap-2">
        {choices.length > 0 ? (
          choices.map((choice) => (
            <RadioGroupItem
              key={choice.id}
              id={`${fieldId}-${choice.id}`}
              value={choice.id}
              label={choicePreviewLabel(choice, paymentItemById)}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No options yet</p>
        )}
      </RadioGroup>
    )
  }

  return (
    <CheckboxGroup className="gap-2">
      {choices.length > 0 ? (
        choices.map((choice) => (
          <Checkbox
            key={choice.id}
            id={`${fieldId}-${choice.id}`}
            value={choice.id}
            label={choicePreviewLabel(choice, paymentItemById)}
          />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No options yet</p>
      )}
    </CheckboxGroup>
  )
}

function FieldPreview({
  field,
  paymentItemById,
}: {
  field: FormDesignerField
  paymentItemById: Map<string, PaymentItem>
}) {
  const { type, settings, id: fieldId } = field
  const placeholder = settings.placeholder.trim() || undefined
  const helpText = settings.helpText.trim()
  const choices = settings.choices.filter(
    (choice) =>
      choice.label.trim() ||
      (choice.paymentItemId && paymentItemById.has(choice.paymentItemId)),
  )
  const choiceDisplayType = resolveChoiceDisplayType(type, settings.displayType)

  const control = (() => {
    if (choiceDisplayType) {
      return (
        <ChoiceFieldPreview
          fieldId={fieldId}
          displayType={choiceDisplayType}
          placeholder={placeholder}
          choices={choices}
          paymentItemById={paymentItemById}
        />
      )
    }

    switch (type) {
      case "text-multiple-lines":
      case "text-block":
      case "address":
        return (
          <Textarea rows={2} placeholder={placeholder || "Enter text…"} />
        )

      case "checkbox-true-false":
      case "consent":
        return (
          <Checkbox
            id={`${fieldId}-preview`}
            label={placeholder || field.label || "Checkbox"}
          />
        )

      default:
        return <Input placeholder={placeholder || "Enter text…"} />
    }
  })()

  return (
    <div className="flex min-w-0 flex-col gap-1.5" inert>
      {control}
      {helpText ? <FieldDescription>{helpText}</FieldDescription> : null}
    </div>
  )
}

function FormDesignerCanvasFieldCard({
  field,
  index,
  paymentItemById,
  onEditField,
  onCloneField,
  onDeleteField,
}: {
  field: FormDesignerField
  index: number
  paymentItemById: Map<string, PaymentItem>
  onEditField: (fieldId: string) => void
  onCloneField: (fieldId: string) => void
  onDeleteField: (fieldId: string) => void
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: field.id,
    index,
    group: FORM_CANVAS_FIELDS_GROUP,
    type: FORM_CANVAS_FIELD_TYPE,
    accept: [FORM_CANVAS_FIELD_TYPE, FORM_FIELD_PALETTE_TYPE],
  })

  const displayLabel = field.settings.label.trim() || field.label

  return (
    <li
      ref={ref}
      className={cn(
        "flex flex-col gap-2 rounded-md border border-border bg-card p-3 text-sm",
        isDragging && "shadow-md",
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          ref={handleRef}
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 cursor-grab touch-none active:cursor-grabbing"
          aria-label={`Reorder ${displayLabel}`}
        >
          <GripVertical aria-hidden />
        </Button>

        <p className="min-w-0 flex-1 truncate font-medium">{displayLabel}</p>

        <TooltipProvider delay={300}>
          <div className="flex shrink-0 items-center gap-1">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${displayLabel}`}
                    onClick={() => onEditField(field.id)}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <SquarePen aria-hidden />
                  </Button>
                }
              />
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Clone ${displayLabel}`}
                    onClick={() => onCloneField(field.id)}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <Copy aria-hidden />
                  </Button>
                }
              />
              <TooltipContent>Clone</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost-destructive"
                    size="icon-sm"
                    aria-label={`Delete ${displayLabel}`}
                    onClick={() => onDeleteField(field.id)}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <Trash2 aria-hidden />
                  </Button>
                }
              />
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className="pl-9">
        <FieldPreview field={field} paymentItemById={paymentItemById} />
      </div>
    </li>
  )
}

type FormDesignerCanvasFieldsProps = {
  fields: FormDesignerField[]
  submitLabel: string
  onSubmitLabelChange: (label: string) => void
  onUpdateField: (fieldId: string, settings: FormFieldCommonSettings) => void
  onCloneField: (fieldId: string) => void
  onDeleteField: (fieldId: string) => void
}

function FormDesignerSubmitButton({
  label,
  onLabelChange,
}: {
  label: string
  onLabelChange: (label: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState(label)

  React.useEffect(() => {
    if (open) setDraft(label)
  }, [open, label])

  const commit = () => {
    const next = draft.trim() || "Submit"
    onLabelChange(next)
    setOpen(false)
  }

  const cancel = () => {
    setDraft(label)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button type="button">{label || "Submit"}</Button>}
      />
      <PopoverContent
        side="top"
        align="center"
        sideOffset={8}
        className="w-auto gap-0 p-2"
      >
        <form
          className="flex items-center gap-1.5"
          onSubmit={(event) => {
            event.preventDefault()
            commit()
          }}
        >
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault()
                cancel()
              }
            }}
            aria-label="Submit button label"
            className="h-8 w-40"
            autoFocus
          />
          <Button
            type="submit"
            size="icon-sm"
            aria-label="Save submit label"
          >
            <Check aria-hidden />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Cancel"
            onClick={cancel}
          >
            <X aria-hidden />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export function FormDesignerCanvasFields({
  fields,
  submitLabel,
  onSubmitLabelChange,
  onUpdateField,
  onCloneField,
  onDeleteField,
}: FormDesignerCanvasFieldsProps) {
  const [editingFieldId, setEditingFieldId] = React.useState<string | null>(
    null,
  )
  const { paymentItems } = usePaymentItems()
  const paymentItemById = React.useMemo(
    () => new Map(paymentItems.map((item) => [item.id, item])),
    [paymentItems],
  )
  const { ref, isDropTarget } = useDroppable({
    id: FORM_CANVAS_DROPPABLE_ID,
    accept: [FORM_FIELD_PALETTE_TYPE],
  })

  const isEmpty = fields.length === 0
  const editingField =
    fields.find((field) => field.id === editingFieldId) ?? null

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "flex min-h-0 flex-1 flex-col rounded-lg border transition-colors",
          isEmpty ? "border-dashed border-border" : "border-solid border-border",
          isDropTarget && "bg-muted/20",
        )}
      >
        {isEmpty ? (
          <Empty className="min-h-0 flex-1 border-0 p-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Layers aria-hidden />
              </EmptyMedia>
              <EmptyTitle>No fields yet</EmptyTitle>
              <EmptyDescription>
                Click or drag a form field from the right to add it here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <ul className="m-0 flex list-none flex-col gap-2 p-0" role="list">
              {fields.map((field, index) => (
                <FormDesignerCanvasFieldCard
                  key={field.id}
                  field={field}
                  index={index}
                  paymentItemById={paymentItemById}
                  onEditField={setEditingFieldId}
                  onCloneField={onCloneField}
                  onDeleteField={onDeleteField}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {!isEmpty ? (
        <div className="flex shrink-0 justify-end">
          <FormDesignerSubmitButton
            label={submitLabel}
            onLabelChange={onSubmitLabelChange}
          />
        </div>
      ) : null}

      <FormDesignerFieldEditDialog
        field={editingField}
        open={editingFieldId != null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setEditingFieldId(null)
        }}
        onSave={onUpdateField}
      />
    </>
  )
}

export function reorderCanvasFields(
  fields: FormDesignerField[],
  source: SortableDraggable<Data>,
): FormDesignerField[] | null {
  const { initialIndex, index } = source
  if (initialIndex === index) return null

  const next = [...fields]
  const [removed] = next.splice(initialIndex, 1)
  if (!removed) return null
  next.splice(index, 0, removed)
  return next
}

export function isCanvasFieldTarget(
  targetId: string | number | undefined,
  fields: FormDesignerField[] = [],
): boolean {
  if (targetId == null) return false
  if (targetId === FORM_CANVAS_DROPPABLE_ID) return true
  return fields.some((field) => field.id === targetId)
}
