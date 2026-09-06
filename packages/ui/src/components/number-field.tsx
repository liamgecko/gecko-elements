"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import Minus from "@hugeicons/core-free-icons/MinusIcon";
import Plus from "@hugeicons/core-free-icons/PlusIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { cn } from "@gecko/ui/lib/utils";

type Size = "sm" | "md" | "lg";

const groupSizeClasses: Record<Size, string> = {
  sm: "h-7 text-xs w-32",
  md: "h-8 text-sm w-38",
  lg: "h-9 text-base w-44",
};

const inputPaddingClasses: Record<Size, string> = {
  sm: "px-1.5",
  md: "px-2",
  lg: "px-2.5",
};

export interface NumberFieldProps extends Omit<
  NumberFieldPrimitive.Root.Props,
  "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"
> {
  size?: Size;
  className?: string;
  /** Accessible name for the numeric input when no visible label is present. */
  "aria-label"?: React.AriaAttributes["aria-label"];
  /** Identifies the element that labels the numeric input. */
  "aria-labelledby"?: React.AriaAttributes["aria-labelledby"];
  /** Identifies supporting or validation text for the numeric input. */
  "aria-describedby"?: React.AriaAttributes["aria-describedby"];
  /** Marks the numeric input as invalid. */
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  /** Accessible name for the decrement button. */
  decrementAriaLabel?: string;
  /** Accessible name for the increment button. */
  incrementAriaLabel?: string;
}

export function NumberField({
  size = "md",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  decrementAriaLabel = "Decrease value",
  incrementAriaLabel = "Increase value",
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldPrimitive.Root
      id={id}
      data-slot="number-field"
      aria-invalid={ariaInvalid}
      className={cn(
        "group/number-field inline-flex flex-col gap-1 data-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <NumberFieldPrimitive.Group
        data-slot="number-field-group"
        className={cn(
          "inline-flex items-stretch rounded-sm border border-input bg-muted text-foreground transition-[color,box-shadow,border] outline-none",
          "hover:border-input-hover focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-75 data-disabled:hover:border-input",
          "data-disabled:focus-within:border-input data-disabled:focus-within:ring-0",
          "group-aria-invalid/number-field:border-input-destructive group-aria-invalid/number-field:hover:border-input-destructive",
          "group-aria-invalid/number-field:focus-within:border-input-destructive group-aria-invalid/number-field:focus-within:ring-input-destructive/20 dark:group-aria-invalid/number-field:focus-within:ring-input-destructive/40",
          "group-aria-invalid/number-field:data-disabled:border-input group-aria-invalid/number-field:data-disabled:hover:border-input",
          groupSizeClasses[size],
        )}
      >
        <NumberFieldPrimitive.Decrement
          data-slot="number-field-decrement"
          aria-label={decrementAriaLabel}
          className={cn(
            "flex items-center justify-center w-7 border-e rounded-l-sm border-input bg-secondary text-secondary-foreground",
            "group-aria-invalid/number-field:border-input-destructive",
            "hover:bg-gray-200 dark:hover:bg-gray-900 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:hover:bg-muted",
          )}
        >
          <HugeiconsIcon icon={Minus} className="size-3.5" aria-hidden="true" />
        </NumberFieldPrimitive.Decrement>

        <NumberFieldPrimitive.Input
          data-slot="number-field-input"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className={cn(
            "min-w-12 flex-1 border-none bg-background outline-none placeholder:text-muted-foreground group-aria-invalid/number-field:placeholder:text-destructive text-center",
            "disabled:bg-muted disabled:opacity-75 disabled:cursor-not-allowed disabled:pointer-events-none",
            inputPaddingClasses[size],
          )}
        />

        <NumberFieldPrimitive.Increment
          data-slot="number-field-increment"
          aria-label={incrementAriaLabel}
          className={cn(
            "flex items-center justify-center w-7 border-s rounded-r-sm border-input bg-secondary text-secondary-foreground",
            "group-aria-invalid/number-field:border-input-destructive",
            "hover:bg-gray-200 dark:hover:bg-gray-900 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:hover:bg-muted",
          )}
        >
          <HugeiconsIcon icon={Plus} className="size-3.5" aria-hidden="true" />
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  );
}
