import * as React from "react";

import { CheckCheck, SquarePen, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog";
import { Button } from "@gecko/ui/components/button";
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
} from "@gecko/ui/components/combobox";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@gecko/ui/components/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@gecko/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select";
import { Input } from "@gecko/ui/components/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";

type PaymentProvider = "Flywire" | "TouchNet";

const PAYMENT_PROVIDER_OPTIONS: {
  value: PaymentProvider;
  label: string;
}[] = [
  { value: "Flywire", label: "Flywire" },
  { value: "TouchNet", label: "TouchNet" },
];

type PaymentItem = {
  name: string;
  amount: number | null;
  provider: PaymentProvider;
  minQuantity: number | null;
  maxQuantity: number | null;
  availableQuantity: number | null;
};

const DEFAULT_PAYMENT_ITEMS: PaymentItem[] = [
  {
    name: "Application fee",
    amount: 50,
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Tuition payment",
    amount: 9250,
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "International student levy",
    amount: 120,
    provider: "Flywire",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Deposit",
    amount: 500,
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Accommodation deposit",
    amount: 250,
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
  {
    name: "Scholarship acceptance fee",
    amount: 75,
    provider: "TouchNet",
    minQuantity: null,
    maxQuantity: null,
    availableQuantity: null,
  },
];

type PaymentItemErrors = {
  name?: string;
  amount?: string;
};

function validatePaymentItem(
  name: string,
  amount: number | null,
): PaymentItemErrors {
  const errors: PaymentItemErrors = {};

  if (!name.trim()) {
    errors.name = "Please enter a name for the payment item.";
  }

  if (amount == null) {
    errors.amount = "Please enter an amount.";
  } else if (!Number.isInteger(amount) || amount <= 0) {
    errors.amount = "Please enter a whole number greater than zero.";
  }

  return errors;
}

function formatPaymentAmount(amount: number | null): string {
  if (amount == null) return "—";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function FormPaymentSettingsPage() {
  const paymentItemsAnchor = React.useRef<HTMLDivElement | null>(null);

  const [paymentItems, setPaymentItems] = React.useState<PaymentItem[]>(
    DEFAULT_PAYMENT_ITEMS,
  );
  const [selectedProvider, setSelectedProvider] =
    React.useState<PaymentProvider | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingName, setEditingName] = React.useState<string | null>(null);
  const [itemName, setItemName] = React.useState("");
  const [itemAmount, setItemAmount] = React.useState<number | null>(null);
  const [minQuantity, setMinQuantity] = React.useState<number | null>(null);
  const [maxQuantity, setMaxQuantity] = React.useState<number | null>(null);
  const [availableQuantity, setAvailableQuantity] = React.useState<
    number | null
  >(null);
  const [errors, setErrors] = React.useState<PaymentItemErrors>({});
  const [providerChangeAlertOpen, setProviderChangeAlertOpen] =
    React.useState(false);
  const [pendingProvider, setPendingProvider] =
    React.useState<PaymentProvider | null>(null);

  const providerItemNames = paymentItems
    .filter((item) => item.provider === selectedProvider)
    .map((item) => item.name);
  const basketItems = selectedItems
    .map((name) => paymentItems.find((item) => item.name === name))
    .filter((item): item is PaymentItem => item != null);

  const applyProviderChange = (value: PaymentProvider | null) => {
    setSelectedProvider(value);
    setSelectedItems([]);
  };

  const handleProviderChange = (value: PaymentProvider | null) => {
    if (value === selectedProvider) return;

    if (selectedProvider != null && selectedItems.length > 0) {
      setPendingProvider(value);
      setProviderChangeAlertOpen(true);
      return;
    }

    applyProviderChange(value);
  };

  const handleProviderChangeAlertOpenChange = (open: boolean) => {
    setProviderChangeAlertOpen(open);
    if (!open) {
      setPendingProvider(null);
    }
  };

  const confirmProviderChange = () => {
    applyProviderChange(pendingProvider);
    setPendingProvider(null);
    setProviderChangeAlertOpen(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingName(null);
      setItemName("");
      setItemAmount(null);
      setMinQuantity(null);
      setMaxQuantity(null);
      setAvailableQuantity(null);
      setErrors({});
    }
  };

  const openCreateDialog = () => {
    if (!selectedProvider) return;
    setDialogOpen(true);
  };

  const openEditDialog = (item: PaymentItem) => {
    setEditingName(item.name);
    setItemName(item.name);
    setItemAmount(item.amount);
    setMinQuantity(item.minQuantity);
    setMaxQuantity(item.maxQuantity);
    setAvailableQuantity(item.availableQuantity);
    setDialogOpen(true);
  };

  const removeItem = (name: string) => {
    setSelectedItems((selected) => selected.filter((item) => item !== name));
  };

  const handleSave = () => {
    const nextErrors = validatePaymentItem(itemName, itemAmount);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const name = itemName.trim();
    const itemProvider =
      editingName != null
        ? (paymentItems.find((item) => item.name === editingName)?.provider ??
          selectedProvider)
        : selectedProvider;

    if (!itemProvider) return;

    const nextItem: PaymentItem = {
      name,
      amount: itemAmount,
      provider: itemProvider,
      minQuantity,
      maxQuantity,
      availableQuantity,
    };

    if (editingName) {
      setPaymentItems((items) =>
        items.map((item) => (item.name === editingName ? nextItem : item)),
      );
      setSelectedItems((selected) =>
        selected.map((item) => (item === editingName ? name : item)),
      );
      toast.success("Payment item updated successfully");
    } else {
      setPaymentItems((items) =>
        items.some((item) => item.name === name) ? items : [...items, nextItem],
      );
      setSelectedItems((selected) =>
        selected.includes(name) ? selected : [...selected, name],
      );
      toast.success("Payment item created successfully");
    }

    handleDialogOpenChange(false);
  };

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
              items={providerItemNames}
              value={selectedItems}
              onValueChange={(value) => setSelectedItems([...value])}
            >
              <ComboboxChips ref={paymentItemsAnchor} className="w-full">
                <ComboboxValue>
                  {(values: readonly string[]) => (
                    <>
                      {values.map((value) => (
                        <ComboboxChip key={value}>{value}</ComboboxChip>
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
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
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
                      {editingName
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
                              onChange={(event) =>
                                setItemName(event.target.value)
                              }
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
                                Please note, this text might be visible to
                                users.
                              </FieldDescription>
                            )}
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
                        <FieldLegend variant="label">
                          Inventory management
                        </FieldLegend>
                        <FieldDescription>
                          Control how many of this item can be purchased. Set
                          the minimum and maximum quantities allowed per basket,
                          and limit the total number available to purchase.
                        </FieldDescription>
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
                      </FieldSet>
                    </FieldGroup>
                  </DialogBody>
                </DialogWrapper>
                <DialogFooter
                  showCloseButton
                  closeButtonText="Cancel"
                  closeButtonIcon={X}
                >
                  <Button variant="default" onClick={handleSave}>
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

      {basketItems.length > 0 && (
        <section className="rounded-lg bg-muted p-4">
          <h3 className="text-sm font-medium text-foreground">
            Your payment items
          </h3>
          <TooltipProvider>
            <ul className="mt-1 divide-y divide-border">
              {basketItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-2 py-2 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-foreground">
                      {item.name}
                    </span>
                    <span className="block text-xs font-semibold tabular-nums text-foreground">
                      {formatPaymentAmount(item.amount)}
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
                            aria-label={`Delete ${item.name}`}
                            onClick={() => removeItem(item.name)}
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
  );
}
