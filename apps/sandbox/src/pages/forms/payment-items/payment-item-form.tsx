import * as React from "react"
import { CheckCheck, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@gecko/ui/components/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"
import { Switch } from "@gecko/ui/components/switch"

import {
  PAYMENT_PROVIDER_CURRENCIES,
  PAYMENT_PROVIDER_OPTIONS,
  type PaymentCurrency,
  type PaymentProvider,
} from "./payment-items-data"

export type PaymentItemFormValues = {
  provider: PaymentProvider
  currency: PaymentCurrency
  name: string
  internalName: string
  amount: number
  minQuantity: number | null
  maxQuantity: number | null
  availableQuantity: number | null
  inventoryEnabled: boolean
}

export type PaymentItemFormErrors = {
  provider?: string
  name?: string
  amount?: string
  currency?: string
}

export function validatePaymentItemForm(
  provider: PaymentProvider | null,
  name: string,
  amount: number | null,
  currency: PaymentCurrency | null,
): PaymentItemFormErrors {
  const errors: PaymentItemFormErrors = {}

  if (!provider) {
    errors.provider = "Please select a payment provider."
  }

  if (!name.trim()) {
    errors.name = "Please enter a name for the chargeable item."
  }

  if (amount == null) {
    errors.amount = "Please enter an amount."
  } else if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    Math.round(amount * 100) !== amount * 100
  ) {
    errors.amount = "Please enter an amount greater than zero (max 2 decimals)."
  }

  if (provider && !currency) {
    errors.currency = "Please select a currency."
  }

  return errors
}

type PaymentItemFormProps = {
  title: string
  submitLabel: string
  initialValues?: PaymentItemFormValues
  isSaving?: boolean
  onSubmit: (values: PaymentItemFormValues) => Promise<void>
}

export function PaymentItemForm({
  title,
  submitLabel,
  initialValues,
  isSaving = false,
  onSubmit,
}: PaymentItemFormProps) {
  const navigate = useNavigate()

  const [provider, setProvider] = React.useState<PaymentProvider | null>(
    initialValues?.provider ?? null,
  )
  const [currency, setCurrency] = React.useState<PaymentCurrency | null>(
    initialValues?.currency ?? null,
  )
  const [itemName, setItemName] = React.useState(initialValues?.name ?? "")
  const [itemInternalName, setItemInternalName] = React.useState(
    initialValues?.internalName ?? "",
  )
  const [itemAmount, setItemAmount] = React.useState<number | null>(
    initialValues?.amount ?? null,
  )
  const [minQuantity, setMinQuantity] = React.useState<number | null>(
    initialValues?.minQuantity ?? null,
  )
  const [maxQuantity, setMaxQuantity] = React.useState<number | null>(
    initialValues?.maxQuantity ?? null,
  )
  const [availableQuantity, setAvailableQuantity] = React.useState<
    number | null
  >(initialValues?.availableQuantity ?? null)
  const [inventoryEnabled, setInventoryEnabled] = React.useState(
    initialValues?.inventoryEnabled ?? false,
  )
  const [errors, setErrors] = React.useState<PaymentItemFormErrors>({})

  const providerCurrencies = provider ? PAYMENT_PROVIDER_CURRENCIES[provider] : []

  const handleProviderChange = (value: PaymentProvider | null) => {
    setProvider(value)

    if (!value) {
      setCurrency(null)
      return
    }

    const currencies = PAYMENT_PROVIDER_CURRENCIES[value]
    setCurrency((current) =>
      current && currencies.includes(current) ? current : (currencies[0] ?? null),
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validatePaymentItemForm(
      provider,
      itemName,
      itemAmount,
      currency,
    )
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (!provider || !currency || itemAmount == null) return

    await onSubmit({
      provider,
      currency,
      name: itemName.trim(),
      internalName: itemInternalName,
      amount: itemAmount,
      minQuantity: inventoryEnabled ? minQuantity : null,
      maxQuantity: inventoryEnabled ? maxQuantity : null,
      availableQuantity: inventoryEnabled ? availableQuantity : null,
      inventoryEnabled,
    })
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field data-invalid={errors.provider ? true : undefined}>
                <FieldLabel htmlFor="payment-item-provider">
                  Payment provider
                </FieldLabel>
                <Select
                  value={provider}
                  onValueChange={(value) =>
                    handleProviderChange(value as PaymentProvider)
                  }
                >
                  <SelectTrigger id="payment-item-provider" className="w-full">
                    <SelectValue placeholder="Select a payment provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {PAYMENT_PROVIDER_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.provider ? (
                  <FieldError id="payment-item-provider-error">
                    {errors.provider}
                  </FieldError>
                ) : null}
              </Field>

              <Field data-invalid={errors.name ? true : undefined}>
                <FieldLabel htmlFor="payment-item-name">Name</FieldLabel>
                <Input
                  id="payment-item-name"
                  type="text"
                  placeholder="e.g. Parking"
                  required
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={
                    errors.name ? "payment-item-name-error" : undefined
                  }
                />
                {errors.name ? (
                  <FieldError id="payment-item-name-error">
                    {errors.name}
                  </FieldError>
                ) : (
                  <FieldDescription>
                    Please note, this text might be visible to users.
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="payment-item-internal-name">
                  Internal name
                </FieldLabel>
                <Input
                  id="payment-item-internal-name"
                  type="text"
                  placeholder="e.g. Parking fee (internal)"
                  value={itemInternalName}
                  onChange={(event) => setItemInternalName(event.target.value)}
                />
                <FieldDescription>
                  This name is for internal purposes only and won't be surfaced
                  on forms.
                </FieldDescription>
              </Field>

              <div className="flex items-start gap-2">
                <Field
                  className="flex-1"
                  data-invalid={errors.amount ? true : undefined}
                >
                  <FieldLabel htmlFor="payment-item-amount">Amount</FieldLabel>
                  <Input
                    id="payment-item-amount"
                    type="number"
                    min={1}
                    step={1}
                    required
                    value={itemAmount ?? ""}
                    onChange={(event) =>
                      setItemAmount(
                        event.target.value === ""
                          ? null
                          : Number(event.target.value),
                      )
                    }
                    aria-invalid={errors.amount ? true : undefined}
                    aria-describedby={
                      errors.amount ? "payment-item-amount-error" : undefined
                    }
                  />
                  {errors.amount ? (
                    <FieldError id="payment-item-amount-error">
                      {errors.amount}
                    </FieldError>
                  ) : (
                    <FieldDescription>
                      The amount to be charged for the item.
                    </FieldDescription>
                  )}
                </Field>

                <Field
                  className="w-24"
                  data-disabled={!provider ? true : undefined}
                  data-invalid={errors.currency ? true : undefined}
                >
                  <FieldLabel htmlFor="payment-item-currency">Currency</FieldLabel>
                  <Select
                    value={currency}
                    onValueChange={(value) =>
                      setCurrency(value as PaymentCurrency)
                    }
                    disabled={!provider}
                  >
                    <SelectTrigger
                      id="payment-item-currency"
                      className="w-full"
                      disabled={!provider}
                    >
                      <SelectValue placeholder={provider ? undefined : "—"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {providerCurrencies.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.currency ? (
                    <FieldError id="payment-item-currency-error">
                      {errors.currency}
                    </FieldError>
                  ) : (
                    <FieldDescription>
                      {provider
                        ? "Available for your payment provider."
                        : "Select a payment provider first."}
                    </FieldDescription>
                  )}
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <Switch
              id="payment-item-inventory-enabled"
              checked={inventoryEnabled}
              onCheckedChange={(checked) => {
                setInventoryEnabled(checked)
                if (!checked) {
                  setMinQuantity(null)
                  setMaxQuantity(null)
                  setAvailableQuantity(null)
                }
              }}
              label="Inventory management"
              description="Control how many of this item can be purchased. Set the minimum and maximum quantities allowed per basket, and limit the total number available to purchase."
            />

            {inventoryEnabled && (
              <FieldGroup className="mt-2">
                <div className="flex items-start gap-2">
                  <Field className="flex-1">
                    <FieldLabel htmlFor="payment-item-min-quantity">
                      Minimum quantity
                    </FieldLabel>
                    <Input
                      id="payment-item-min-quantity"
                      type="number"
                      min={1}
                      step={1}
                      value={minQuantity ?? ""}
                      onChange={(event) =>
                        setMinQuantity(
                          event.target.value === ""
                            ? null
                            : Number(event.target.value),
                        )
                      }
                    />
                  </Field>

                  <Field className="flex-1">
                    <FieldLabel htmlFor="payment-item-max-quantity">
                      Maximum quantity
                    </FieldLabel>
                    <Input
                      id="payment-item-max-quantity"
                      type="number"
                      min={1}
                      step={1}
                      value={maxQuantity ?? ""}
                      onChange={(event) =>
                        setMaxQuantity(
                          event.target.value === ""
                            ? null
                            : Number(event.target.value),
                        )
                      }
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="payment-item-available">
                    Number available
                  </FieldLabel>
                  <Input
                    id="payment-item-available"
                    type="number"
                    min={1}
                    step={1}
                    value={availableQuantity ?? ""}
                    onChange={(event) =>
                      setAvailableQuantity(
                        event.target.value === ""
                          ? null
                          : Number(event.target.value),
                      )
                    }
                  />
                  <FieldDescription>Leave blank for unlimited.</FieldDescription>
                </Field>
              </FieldGroup>
            )}
          </FieldSet>
        </FieldGroup>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/forms/chargeable-items")}
          >
            <X aria-hidden />
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            <CheckCheck aria-hidden />
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
