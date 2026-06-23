"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cva } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"
import { ControlLabel } from "@gecko/ui/components/label"

const defaultRadioItemStyles =
  "border-input bg-background data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary aria-invalid:aria-checked:border-input-destructive aria-invalid:aria-checked:bg-input-destructive aria-invalid:border-input-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 flex size-4 rounded-full focus-visible:ring-3 aria-invalid:focus-visible:ring-3 group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer"

const asButtonRadioItemVariants = cva(
  "border-border bg-background rounded-md border text-sm cursor-pointer p-3 transition-all focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 data-disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:opacity-75 hover:bg-muted hover:border-gray-300 dark:hover:border-gray-700 hover:text-foreground disabled:hover:bg-background disabled:hover:border-border disabled:hover:text-foreground data-disabled:hover:bg-background data-disabled:hover:border-border data-disabled:hover:text-foreground data-checked:border-gray-300 dark:data-checked:border-gray-700 data-checked:bg-muted data-checked:text-foreground disabled:data-checked:hover:bg-muted disabled:data-checked:hover:border-gray-300 dark:disabled:data-checked:hover:border-gray-700 disabled:data-checked:hover:text-foreground data-disabled:data-checked:hover:bg-muted data-disabled:data-checked:hover:border-gray-300 dark:data-disabled:data-checked:hover:border-gray-700 data-disabled:data-checked:hover:text-foreground aria-invalid:border-input-destructive aria-invalid:hover:border-input-destructive aria-invalid:hover:text-destructive aria-invalid:hover:bg-destructive-muted aria-invalid:focus-visible:border-input-destructive focus-visible:aria-invalid:ring-input-destructive/20 dark:focus-visible:aria-invalid:ring-input-destructive/40 aria-invalid:data-checked:border-input-destructive dark:aria-invalid:data-checked:border-input-destructive aria-invalid:data-checked:bg-destructive-muted aria-invalid:data-checked:text-destructive-muted-foreground",
  {
    variants: {
      layout: {
        inline: "font-medium inline-flex items-center justify-center gap-2",
        description: "flex flex-col items-start gap-0.5 w-fit text-left",
      },
    },
    defaultVariants: {
      layout: "inline",
    },
  }
)

type RadioGroupItemProps = RadioPrimitive.Root.Props & {
  asButton?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
}

type RadioGroupProps = RadioGroupPrimitive.Props & {
  label?: React.ReactNode
  description?: React.ReactNode
  /** Lay out options in a row (wraps on narrow widths). */
  horizontal?: boolean
}

function RadioGroup({
  className,
  label,
  description,
  children,
  horizontal = false,
  ...props
}: RadioGroupProps) {
  const hasAsButton = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.props as { asButton?: boolean }).asButton === true
  )
  const effectiveHorizontal = horizontal || hasAsButton
  const content = effectiveHorizontal ? (
    <div className="flex flex-wrap gap-2">{children}</div>
  ) : (
    children
  )

  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0 min-w-0">
      {label != null && (
        <legend className="mb-2 text-sm font-medium leading-none">
          {label}
        </legend>
      )}
      {description != null && (
        <p className="text-muted-foreground text-sm leading-normal">
          {description}
        </p>
      )}
      <RadioGroupPrimitive
        data-slot="radio-group"
        data-orientation={effectiveHorizontal ? "horizontal" : "vertical"}
        className={cn(
          effectiveHorizontal ? "flex flex-row flex-wrap gap-2" : "grid gap-3 w-full",
          className
        )}
        {...props}
      >
        {content}
      </RadioGroupPrimitive>
    </fieldset>
  )
}

function RadioGroupItem({
  className,
  asButton,
  label,
  description,
  children,
  id: idProp,
  ...props
}: RadioGroupItemProps) {
  const generatedId = React.useId()
  const inputId = idProp ?? generatedId

  const baseClasses = cn(
    asButton
      ? asButtonRadioItemVariants({
          layout: description != null ? "description" : "inline",
        })
      : defaultRadioItemStyles,
    className
  )

  if (asButton) {
    if (description) {
      return (
        <RadioPrimitive.Root
          data-slot="radio-group-item"
          data-as-button
          id={inputId}
          className={baseClasses}
          {...props}
        >
          {label != null && (
            <span className="font-medium leading-none">{label}</span>
          )}
          <p className="text-muted-foreground text-xs leading-normal">
            {description}
          </p>
        </RadioPrimitive.Root>
      )
    }

    const content = children ?? label
    return (
      <RadioPrimitive.Root
        data-slot="radio-group-item"
        data-as-button
        id={inputId}
        className={baseClasses}
        {...props}
      >
        {content}
      </RadioPrimitive.Root>
    )
  }

  const control = (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      id={inputId}
      className={baseClasses}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="bg-primary-foreground absolute top-1/2 inset-s-1/2 size-2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 rounded-full" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )

  if (label == null && description == null) {
    return control
  }

  return (
    <div
      data-disabled={props.disabled ? "true" : undefined}
      className={cn(
        "group/radio-group-item-row flex gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed",
        description != null ? "items-start" : "items-center",
      )}
    >
      <div className={cn("flex shrink-0", description != null && "mt-0.5")}>
        {control}
      </div>
      <div className="flex flex-col gap-0.5 leading-snug">
        {label != null && (
          <ControlLabel
            htmlFor={inputId}
            className="cursor-pointer select-none group-data-[disabled=true]/radio-group-item-row:cursor-not-allowed group-data-[disabled=true]/radio-group-item-row:opacity-75"
          >
            {label}
          </ControlLabel>
        )}
        {description != null && (
          <p className="text-muted-foreground text-xs leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
