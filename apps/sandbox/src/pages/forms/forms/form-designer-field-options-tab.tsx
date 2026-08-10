import * as React from "react"
import { CirclePoundSterling, Plus, Trash2 } from "lucide-react"

import { Badge } from "@gecko/ui/components/badge"
import { Button } from "@gecko/ui/components/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@gecko/ui/components/combobox"
import { SortableList } from "@gecko/ui/components/drag-and-drop"
import { Field, FieldGroup, FieldLabel } from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@gecko/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"
import { cn } from "@gecko/ui/lib/utils"

import { usePaymentItems } from "@/hooks/usePaymentItems"
import {
  formatPaymentItemAmount,
  type PaymentItem,
} from "@/pages/forms/payment-items/payment-items-data"

import {
  CHARGEABLE_DISPLAY_TYPE_OPTIONS,
  createEmptyFieldChoice,
  isChargeableItemField,
  type ChargeableDisplayType,
  type FormFieldChoice,
  type FormFieldCommonSettings,
} from "./form-designer-pages"

export type ChargeableBadgePlacement = "below" | "inside"

type FormDesignerFieldOptionsTabProps = {
  fieldType: string
  settings: FormFieldCommonSettings
  badgePlacement: ChargeableBadgePlacement
  onChange: (patch: Partial<FormFieldCommonSettings>) => void
}

export function FormDesignerFieldOptionsTab({
  fieldType,
  settings,
  badgePlacement,
  onChange,
}: FormDesignerFieldOptionsTabProps) {
  const { paymentItems, loading, configured } = usePaymentItems()

  const gbpPaymentItems = React.useMemo(
    () => paymentItems.filter((item) => item.currency === "GBP"),
    [paymentItems],
  )

  const choices = (
    settings.choices.length > 0 ? settings.choices : [createEmptyFieldChoice()]
  ).map((choice) => ({
    ...choice,
    paymentItemId: choice.paymentItemId ?? "",
  }))

  const paymentItemById = React.useMemo(
    () => new Map(gbpPaymentItems.map((item) => [item.id, item])),
    [gbpPaymentItems],
  )

  const paymentItemIds = React.useMemo(
    () => gbpPaymentItems.map((item) => item.id),
    [gbpPaymentItems],
  )

  const displayType =
    (settings.displayType as ChargeableDisplayType | "") || "radio"

  const updateChoices = (next: FormFieldChoice[]) => {
    onChange({ choices: next })
  }

  const handleChoiceLabelChange = (choiceId: string, label: string) => {
    updateChoices(
      choices.map((choice) =>
        choice.id === choiceId ? { ...choice, label } : choice,
      ),
    )
  }

  const handlePaymentItemChange = (
    choiceId: string,
    paymentItemId: string,
  ) => {
    updateChoices(
      choices.map((choice) =>
        choice.id === choiceId ? { ...choice, paymentItemId } : choice,
      ),
    )
  }

  const handleAddChoice = () => {
    updateChoices([...choices, createEmptyFieldChoice()])
  }

  const handleDeleteChoice = (choiceId: string) => {
    if (choices.length <= 1) {
      updateChoices([createEmptyFieldChoice()])
      return
    }
    updateChoices(choices.filter((choice) => choice.id !== choiceId))
  }

  return (
    <FieldGroup>
      {isChargeableItemField(fieldType) ? (
        <Field>
          <FieldLabel htmlFor="field-options-display-type">
            Display type
          </FieldLabel>
          <Select
            items={CHARGEABLE_DISPLAY_TYPE_OPTIONS}
            value={displayType}
            onValueChange={(value) => {
              if (!value) return
              onChange({ displayType: value as ChargeableDisplayType })
            }}
          >
            <SelectTrigger id="field-options-display-type" className="w-full">
              <SelectValue placeholder="Select display type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CHARGEABLE_DISPLAY_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      ) : null}

      <div className="flex flex-col gap-3">
        <FieldLabel>Field Choices</FieldLabel>

        <SortableList
          items={choices.map((choice) => choice.id)}
          onItemsChange={(itemIds) => {
            const byId = new Map(choices.map((choice) => [choice.id, choice]))
            updateChoices(
              itemIds.flatMap((id) => {
                const choice = byId.get(id)
                return choice ? [choice] : []
              }),
            )
          }}
          getLabel={(id) => {
            const choice = choices.find((item) => item.id === id)
            if (!choice) return null
            const paymentItem = choice.paymentItemId
              ? paymentItemById.get(choice.paymentItemId)
              : undefined

            return (
              <FieldChoiceRow
                choice={choice}
                paymentItem={paymentItem}
                badgePlacement={badgePlacement}
                paymentItemIds={paymentItemIds}
                paymentItemById={paymentItemById}
                paymentItemsLoading={loading}
                paymentItemsConfigured={configured}
                onLabelChange={handleChoiceLabelChange}
                onPaymentItemChange={handlePaymentItemChange}
                onDelete={handleDeleteChoice}
              />
            )
          }}
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={handleAddChoice}
        >
          <Plus data-icon="inline-start" />
          Add another choice
        </Button>
      </div>
    </FieldGroup>
  )
}

type FieldChoiceRowProps = {
  choice: FormFieldChoice
  paymentItem: PaymentItem | undefined
  badgePlacement: ChargeableBadgePlacement
  paymentItemIds: string[]
  paymentItemById: Map<string, PaymentItem>
  paymentItemsLoading: boolean
  paymentItemsConfigured: boolean
  onLabelChange: (choiceId: string, label: string) => void
  onPaymentItemChange: (choiceId: string, paymentItemId: string) => void
  onDelete: (choiceId: string) => void
}

function ChargeableItemBadge({
  paymentItem,
  className,
  onDismiss,
}: {
  paymentItem: PaymentItem
  className?: string
  onDismiss: () => void
}) {
  return (
    <Badge
      variant="secondary"
      size="xs"
      rounded
      className={cn("w-fit max-w-full", className)}
      dismiss
      onDismiss={onDismiss}
    >
      <span className="truncate">
        {paymentItem.name}
        {" · "}
        {formatPaymentItemAmount(paymentItem.amount, paymentItem.currency)}
      </span>
    </Badge>
  )
}

function FieldChoiceRow({
  choice,
  paymentItem,
  badgePlacement,
  paymentItemIds,
  paymentItemById,
  paymentItemsLoading,
  paymentItemsConfigured,
  onLabelChange,
  onPaymentItemChange,
  onDelete,
}: FieldChoiceRowProps) {
  const showInlineBadge = Boolean(paymentItem) && badgePlacement === "inside"
  const showBelowBadge = Boolean(paymentItem) && badgePlacement === "below"
  const dismissPaymentItem = () => onPaymentItemChange(choice.id, "")

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="flex min-w-0 items-center gap-2">
        {showInlineBadge && paymentItem ? (
          <InputGroup className="min-w-0 flex-1">
            <InputGroupInput
              value={choice.label}
              onChange={(event) =>
                onLabelChange(choice.id, event.target.value)
              }
              placeholder="Enter choice..."
            />
            <InputGroupAddon align="inline-end" className="max-w-[55%]">
              <ChargeableItemBadge
                paymentItem={paymentItem}
                className="max-w-full"
                onDismiss={dismissPaymentItem}
              />
            </InputGroupAddon>
          </InputGroup>
        ) : (
          <Input
            value={choice.label}
            onChange={(event) => onLabelChange(choice.id, event.target.value)}
            placeholder="Enter choice..."
            className="min-w-0 flex-1"
          />
        )}

        {!paymentItemsConfigured || paymentItemsLoading ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled
            aria-label={
              paymentItemsLoading
                ? "Loading chargeable items"
                : "Chargeable items unavailable"
            }
          >
            <CirclePoundSterling aria-hidden />
          </Button>
        ) : (
          <Combobox
            variant="popover"
            search
            searchPlaceholder="Search chargeable items"
            items={paymentItemIds}
            value={choice.paymentItemId || null}
            onValueChange={(value) =>
              onPaymentItemChange(
                choice.id,
                value == null ? "" : String(value),
              )
            }
          >
            <ComboboxTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={
                    paymentItem
                      ? "Change chargeable item"
                      : "Assign chargeable item"
                  }
                  className={cn(
                    "relative",
                    paymentItem && "bg-muted text-foreground hover:bg-muted",
                  )}
                />
              }
            >
              <CirclePoundSterling aria-hidden />
              {paymentItem ? (
                <span
                  aria-hidden
                  className="absolute end-0.5 top-0.5 size-1.5 rounded-full bg-emerald-500"
                />
              ) : null}
            </ComboboxTrigger>
            <ComboboxContent align="end" className="w-80">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(id: string) => {
                  const item = paymentItemById.get(id)
                  if (!item) return null
                  return (
                    <ComboboxItem key={id} value={id}>
                      <span className="min-w-0 flex-1 truncate">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-muted-foreground">
                        {formatPaymentItemAmount(item.amount, item.currency)}
                      </span>
                    </ComboboxItem>
                  )
                }}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}

        <Button
          type="button"
          variant="ghost-destructive"
          size="icon-sm"
          aria-label="Delete option"
          onClick={() => onDelete(choice.id)}
        >
          <Trash2 aria-hidden />
        </Button>
      </div>

      {showBelowBadge && paymentItem ? (
        <ChargeableItemBadge
          paymentItem={paymentItem}
          onDismiss={dismissPaymentItem}
        />
      ) : null}
    </div>
  )
}
