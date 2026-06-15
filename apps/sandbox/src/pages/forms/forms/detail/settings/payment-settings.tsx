import * as React from "react"
import { CheckCheck, SquarePen, Trash2, X } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog"
import { Button } from "@gecko/ui/components/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@gecko/ui/components/combobox"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@gecko/ui/components/dialog"
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"

import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import { paymentItemsRepository } from "@/data/repositories/paymentItemsRepository"
import { useFormPaymentSettings } from "@/hooks/useFormPaymentSettings"
import { usePaymentItems } from "@/hooks/usePaymentItems"
import {
  PAYMENT_PROVIDER_OPTIONS,
  formatPaymentItemAmount,
  type PaymentItem,
  type PaymentProvider,
} from "@/pages/forms/payment-items/payment-items-data"

type PaymentItemErrors = {
  name?: string
  amount?: string
}

function validatePaymentItem(
  name: string,
  amount: number | null,
): PaymentItemErrors {
  const errors: PaymentItemErrors = {}

  if (!name.trim()) {
    errors.name = "Please enter a name for the payment item."
  }

  if (amount == null) {
    errors.amount = "Please enter an amount."
  } else if (!Number.isInteger(amount) || amount <= 0) {
    errors.amount = "Please enter a whole number greater than zero."
  }

  return errors
}

export default function FormPaymentSettingsPage() {
  const { formId = "" } = useParams()
  const paymentItemsAnchor = React.useRef<HTMLDivElement | null>(null)

  const {
    paymentItems: catalog,
    loading: catalogLoading,
    error: catalogError,
    configured,
    refetch: refetchCatalog,
  } = usePaymentItems()
  const {
    settings: savedSettings,
    loading: settingsLoading,
    error: settingsError,
    saveSettings,
  } = useFormPaymentSettings(formId)

  const [selectedProvider, setSelectedProvider] =
    React.useState<PaymentProvider | null>(null)
  const [selectedItemIds, setSelectedItemIds] = React.useState<string[]>([])
  const [hydrated, setHydrated] = React.useState(false)

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)
  const [itemName, setItemName] = React.useState("")
  const [itemInternalName, setItemInternalName] = React.useState("")
  const [itemAmount, setItemAmount] = React.useState<number | null>(null)
  const [minQuantity, setMinQuantity] = React.useState<number | null>(null)
  const [maxQuantity, setMaxQuantity] = React.useState<number | null>(null)
  const [availableQuantity, setAvailableQuantity] = React.useState<
    number | null
  >(null)
  const [inventoryEnabled, setInventoryEnabled] = React.useState(false)
  const [errors, setErrors] = React.useState<PaymentItemErrors>({})
  const [isSavingItem, setIsSavingItem] = React.useState(false)
  const [providerChangeAlertOpen, setProviderChangeAlertOpen] =
    React.useState(false)
  const [pendingProvider, setPendingProvider] =
    React.useState<PaymentProvider | null>(null)
  const [providerRequiredAlertOpen, setProviderRequiredAlertOpen] =
    React.useState(false)

  const itemById = React.useMemo(
    () => new Map(catalog.map((item) => [item.id, item])),
    [catalog],
  )

  const providerItemIds = catalog
    .filter((item) => item.provider === selectedProvider)
    .map((item) => item.id)

  const basketItems = selectedItemIds
    .map((id) => itemById.get(id))
    .filter((item): item is PaymentItem => item != null)

  const isLoading = catalogLoading || settingsLoading
  const loadError = catalogError ?? settingsError

  React.useEffect(() => {
    if (isLoading || hydrated) return
    setSelectedProvider(savedSettings.provider)
    setSelectedItemIds(savedSettings.paymentItemIds)
    setHydrated(true)
  }, [hydrated, isLoading, savedSettings])

  const persistSettings = React.useCallback(
    async (provider: PaymentProvider | null, paymentItemIds: string[]) => {
      try {
        await saveSettings({ provider, paymentItemIds })
      } catch (err) {
        toast.error(
          err instanceof Error
            ? err.message
            : "Failed to save payment settings",
        )
      }
    },
    [saveSettings],
  )

  const applyProviderChange = (value: PaymentProvider | null) => {
    setSelectedProvider(value)
    setSelectedItemIds([])
    void persistSettings(value, [])
  }

  const handleProviderChange = (value: PaymentProvider | null) => {
    if (value === selectedProvider) return

    if (selectedProvider != null && selectedItemIds.length > 0) {
      setPendingProvider(value)
      setProviderChangeAlertOpen(true)
      return
    }

    applyProviderChange(value)
  }

  const handleProviderChangeAlertOpenChange = (open: boolean) => {
    setProviderChangeAlertOpen(open)
    if (!open) {
      setPendingProvider(null)
    }
  }

  const confirmProviderChange = () => {
    applyProviderChange(pendingProvider)
    setPendingProvider(null)
    setProviderChangeAlertOpen(false)
  }

  const handleSelectedItemsChange = (value: string[]) => {
    const nextIds = [...value]
    setSelectedItemIds(nextIds)
    void persistSettings(selectedProvider, nextIds)
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingItemId(null)
      setItemName("")
      setItemInternalName("")
      setItemAmount(null)
      setMinQuantity(null)
      setMaxQuantity(null)
      setAvailableQuantity(null)
      setInventoryEnabled(false)
      setErrors({})
    }
  }

  const openCreateDialog = () => {
    if (!selectedProvider) {
      setProviderRequiredAlertOpen(true)
      return
    }
    setDialogOpen(true)
  }

  const openEditDialog = (item: PaymentItem) => {
    setEditingItemId(item.id)
    setItemName(item.name)
    setItemInternalName(item.internalName ?? "")
    setItemAmount(item.amount)
    setMinQuantity(item.minQuantity)
    setMaxQuantity(item.maxQuantity)
    setAvailableQuantity(item.availableQuantity)
    setInventoryEnabled(
      item.minQuantity != null ||
        item.maxQuantity != null ||
        item.availableQuantity != null,
    )
    setDialogOpen(true)
  }

  const removeItem = (id: string) => {
    const nextIds = selectedItemIds.filter((itemId) => itemId !== id)
    setSelectedItemIds(nextIds)
    void persistSettings(selectedProvider, nextIds)
  }

  const handleSave = async () => {
    const nextErrors = validatePaymentItem(itemName, itemAmount)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const name = itemName.trim()
    const internalName = itemInternalName.trim() || null
    const amount = itemAmount!
    const itemProvider =
      editingItemId != null
        ? (itemById.get(editingItemId)?.provider ?? selectedProvider)
        : selectedProvider

    if (!itemProvider) return

    const existingItem = editingItemId
      ? itemById.get(editingItemId)
      : undefined
    const currency = existingItem?.currency ?? "GBP"

    const input = {
      name,
      internalName,
      amount,
      currency,
      provider: itemProvider,
      minQuantity: inventoryEnabled ? minQuantity : null,
      maxQuantity: inventoryEnabled ? maxQuantity : null,
      availableQuantity: inventoryEnabled ? availableQuantity : null,
    }

    setIsSavingItem(true)

    try {
      if (editingItemId) {
        await paymentItemsRepository.updatePaymentItem(editingItemId, input)
        toast.success("Payment item updated successfully")
      } else {
        const created = await paymentItemsRepository.createPaymentItem(input)
        const nextIds = selectedItemIds.includes(created.id)
          ? selectedItemIds
          : [...selectedItemIds, created.id]
        setSelectedItemIds(nextIds)
        await persistSettings(selectedProvider, nextIds)
        toast.success("Payment item created successfully")
      }

      refetchCatalog()
      handleDialogOpenChange(false)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save payment item",
      )
    } finally {
      setIsSavingItem(false)
    }
  }

  if (!configured) {
    return (
      <div className="w-full space-y-6">
        <h2 className="text-lg font-semibold text-foreground">
          Payment settings
        </h2>
        <SupabaseSetupNotice />
      </div>
    )
  }

  if (isLoading || !hydrated) {
    return (
      <div className="w-full space-y-6">
        <h2 className="text-lg font-semibold text-foreground">
          Payment settings
        </h2>
        <p className="text-sm text-muted-foreground">Loading payment settings…</p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="w-full space-y-6">
        <h2 className="text-lg font-semibold text-foreground">
          Payment settings
        </h2>
        <DataLoadErrorAlert
          title="Could not load payment settings"
          message={loadError}
        />
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-lg font-semibold text-foreground">
        Payment settings
      </h2>

      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="payment-provider">Payment provider</FieldLabel>
            <Select
              value={selectedProvider}
              onValueChange={(value) =>
                handleProviderChange(value as PaymentProvider)
              }
            >
              <SelectTrigger id="payment-provider" className="w-full">
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
          </Field>

          <Field data-disabled={!selectedProvider ? true : undefined}>
            <FieldLabel htmlFor="payment-items">Payment items</FieldLabel>
            <Combobox
              key={selectedProvider ?? "no-provider"}
              multiple
              autoHighlight
              items={providerItemIds}
              value={selectedItemIds}
              onValueChange={handleSelectedItemsChange}
            >
              <ComboboxChips ref={paymentItemsAnchor} className="w-full">
                <ComboboxValue>
                  {(values: readonly string[]) => (
                    <>
                      {values.map((id) => (
                        <ComboboxChip key={id}>
                          {itemById.get(id)?.name ?? id}
                        </ComboboxChip>
                      ))}
                      <ComboboxChipsInput
                        id="payment-items"
                        disabled={!selectedProvider}
                        placeholder="Select payment items"
                      />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={paymentItemsAnchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(id: string) => {
                    const item = itemById.get(id)
                    return (
                      <ComboboxItem key={id} value={id}>
                        {item?.name ?? id}
                      </ComboboxItem>
                    )
                  }}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>
              Select payment items to be included within the form or{" "}
              <button
                type="button"
                onClick={openCreateDialog}
                className="cursor-pointer underline underline-offset-4 hover:text-primary"
              >
                create a new payment item
              </button>
              . Only payment items with the same currency selected with your
              payment provider.
            </FieldDescription>
          </Field>

          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogContent size="sm">
              <DialogWrapper>
                <DialogHeader>
                  <DialogTitle>
                    {editingItemId
                      ? "Edit payment item"
                      : "Create new payment item"}
                  </DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <FieldGroup>
                    <FieldSet>
                      <FieldGroup>
                        <Field data-invalid={errors.name ? true : undefined}>
                          <FieldLabel htmlFor="payment-item-name">
                            Name
                          </FieldLabel>
                          <Input
                            id="payment-item-name"
                            type="text"
                            placeholder="e.g. Parking"
                            required
                            value={itemName}
                            onChange={(event) => setItemName(event.target.value)}
                            aria-invalid={errors.name ? true : undefined}
                            aria-describedby={
                              errors.name
                                ? "payment-item-name-error"
                                : undefined
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
                            onChange={(event) =>
                              setItemInternalName(event.target.value)
                            }
                          />
                          <FieldDescription>
                            This name is for internal purposes only and won't be
                            surfaced on forms.
                          </FieldDescription>
                        </Field>

                        <div className="flex items-start gap-2">
                          <Field
                            className="flex-1"
                            data-invalid={errors.amount ? true : undefined}
                          >
                            <FieldLabel htmlFor="payment-item-amount">
                              Amount
                            </FieldLabel>
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
                                errors.amount
                                  ? "payment-item-amount-error"
                                  : undefined
                              }
                            />
                            {errors.amount ? (
                              <FieldError id="payment-item-amount-error">
                                {errors.amount}
                              </FieldError>
                            ) : (
                              <FieldDescription>
                                The amount to be charged for the item. The
                                currency is set by your payment provider.
                              </FieldDescription>
                            )}
                          </Field>

                          <Field className="w-24" data-disabled>
                            <FieldLabel htmlFor="payment-item-currency">
                              Currency
                            </FieldLabel>
                            <Select defaultValue="GBP" disabled>
                              <SelectTrigger
                                id="payment-item-currency"
                                className="w-full"
                                disabled
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </Field>
                        </div>
                      </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <FieldSet>
                      <Field orientation="horizontal">
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
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="payment-item-inventory-enabled">
                            Inventory management
                          </FieldLabel>
                          <FieldDescription>
                            Control how many of this item can be purchased. Set
                            the minimum and maximum quantities allowed per
                            basket, and limit the total number available to
                            purchase.
                          </FieldDescription>
                        </FieldContent>
                      </Field>

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
                            <FieldDescription>
                              Leave blank for unlimited.
                            </FieldDescription>
                          </Field>
                        </FieldGroup>
                      )}
                    </FieldSet>
                  </FieldGroup>
                </DialogBody>
              </DialogWrapper>
              <DialogFooter
                showCloseButton
                closeButtonText="Cancel"
                closeButtonIcon={X}
              >
                <Button
                  variant="default"
                  onClick={() => void handleSave()}
                  disabled={isSavingItem}
                >
                  <CheckCheck aria-hidden />
                  Save payment item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </FieldGroup>
      </FieldSet>

      <AlertDialog
        open={providerChangeAlertOpen}
        onOpenChange={handleProviderChangeAlertOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Switch payment provider?</AlertDialogTitle>
            <AlertDialogDescription>
              By switching provider you will lose all changes. Your selected
              payment items will be reset.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <X aria-hidden />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmProviderChange}>
              <CheckCheck aria-hidden />
              Switch provider
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={providerRequiredAlertOpen}
        onOpenChange={setProviderRequiredAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment provider required</AlertDialogTitle>
            <AlertDialogDescription>
              Please select a payment provider before creating a payment item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="default">OK</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {basketItems.length > 0 && (
        <section className="rounded-lg bg-muted p-4">
          <h3 className="text-sm font-medium text-foreground">
            Your payment items
          </h3>
          <TooltipProvider>
            <ul className="mt-1 divide-y divide-border">
              {basketItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 py-2 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-foreground">
                      {item.name}
                    </span>
                    <span className="block text-xs font-semibold text-foreground">
                      {formatPaymentItemAmount(item.amount, item.currency)}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost-light"
                            size="icon-sm"
                            aria-label={`Edit ${item.name}`}
                            onClick={() => openEditDialog(item)}
                          >
                            <SquarePen aria-hidden />
                          </Button>
                        }
                      />
                      <TooltipContent side="bottom">
                        Edit payment item
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost-light"
                            size="icon-sm"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 aria-hidden />
                          </Button>
                        }
                      />
                      <TooltipContent side="bottom">
                        Remove payment item
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </section>
      )}
    </div>
  )
}
