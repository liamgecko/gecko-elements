"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cva } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"
import { ControlLabel } from "@gecko/ui/components/label"

const defaultRadioItemStyles =
  "border-input hover:border-input-hover group-hover/field:border-input-hover group-hover/radio-group-item-row:border-input-hover bg-background data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary data-checked:hover:border-primary group-hover/field:data-checked:border-primary group-hover/radio-group-item-row:data-checked:border-primary aria-invalid:aria-checked:border-input-destructive aria-invalid:aria-checked:bg-input-destructive aria-invalid:border-input-destructive group-aria-invalid/radio-group:border-input-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 group-aria-invalid/radio-group:focus-visible:ring-input-destructive/20 dark:group-aria-invalid/radio-group:focus-visible:ring-input-destructive/40 flex size-4 rounded-full transition-[color,box-shadow,border] focus-visible:ring-3 aria-invalid:focus-visible:ring-3 group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:border-input disabled:group-hover/field:border-input disabled:group-hover/radio-group-item-row:border-input cursor-pointer"

const asButtonRadioItemVariants = cva(
  "border-border bg-background rounded-md border text-sm cursor-pointer p-3 transition-all focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 data-disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:opacity-75 hover:bg-muted hover:border-gray-300 dark:hover:border-gray-700 hover:text-foreground disabled:hover:bg-background disabled:hover:border-border disabled:hover:text-foreground data-disabled:hover:bg-background data-disabled:hover:border-border data-disabled:hover:text-foreground data-checked:border-gray-300 dark:data-checked:border-gray-700 data-checked:bg-muted data-checked:text-foreground disabled:data-checked:hover:bg-muted disabled:data-checked:hover:border-gray-300 dark:disabled:data-checked:hover:border-gray-700 disabled:data-checked:hover:text-foreground data-disabled:data-checked:hover:bg-muted data-disabled:data-checked:hover:border-gray-300 dark:data-disabled:data-checked:hover:border-gray-700 data-disabled:data-checked:hover:text-foreground aria-invalid:border-input-destructive aria-invalid:hover:border-input-destructive aria-invalid:hover:text-destructive aria-invalid:hover:bg-destructive-muted aria-invalid:focus-visible:border-input-destructive focus-visible:aria-invalid:ring-input-destructive/20 dark:focus-visible:aria-invalid:ring-input-destructive/40 aria-invalid:data-checked:border-input-destructive dark:aria-invalid:data-checked:border-input-destructive aria-invalid:data-checked:bg-destructive-muted aria-invalid:data-checked:text-destructive-muted-foreground group-aria-invalid/radio-group:border-input-destructive group-aria-invalid/radio-group:hover:border-input-destructive group-aria-invalid/radio-group:hover:bg-destructive-muted group-aria-invalid/radio-group:hover:text-destructive group-aria-invalid/radio-group:focus-visible:border-input-destructive group-aria-invalid/radio-group:focus-visible:ring-input-destructive/20 dark:group-aria-invalid/radio-group:focus-visible:ring-input-destructive/40 group-aria-invalid/radio-group:data-checked:border-input-destructive group-aria-invalid/radio-group:data-checked:bg-destructive-muted group-aria-invalid/radio-group:data-checked:text-destructive-muted-foreground",
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
  id: idProp,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: RadioGroupProps) {
  const generatedId = React.useId()
  const groupId = idProp ?? generatedId
  const labelId = `${groupId}-label`
  const descriptionId = `${groupId}-description`
  const labelledBy =
    [ariaLabelledBy, label != null && labelId].filter(Boolean).join(" ") ||
    undefined
  const describedBy =
    [ariaDescribedBy, description != null && descriptionId]
      .filter(Boolean)
      .join(" ") || undefined
  const hasAsButton = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.props as { asButton?: boolean }).asButton === true
  )
  const effectiveHorizontal = horizontal || hasAsButton

  return (
    <fieldset
      data-disabled={disabled ? "true" : undefined}
      data-invalid={ariaInvalid === true ? "true" : undefined}
      className="group/radio-fieldset flex min-w-0 flex-col gap-3 border-0 p-0 m-0"
    >
      {label != null && (
        <legend
          id={labelId}
          data-slot="field-label"
          className="mb-2 flex w-fit items-center gap-1 text-xs font-medium leading-snug select-none group-data-[disabled=true]/radio-fieldset:pointer-events-none group-data-[disabled=true]/radio-fieldset:cursor-not-allowed group-data-[disabled=true]/radio-fieldset:opacity-75"
        >
          {label}
        </legend>
      )}
      {description != null && (
        <p
          id={descriptionId}
          className="text-muted-foreground text-sm leading-normal group-data-[disabled=true]/radio-fieldset:opacity-75"
        >
          {description}
        </p>
      )}
      <RadioGroupPrimitive
        data-slot="radio-group"
        data-orientation={effectiveHorizontal ? "horizontal" : "vertical"}
        id={groupId}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={cn(
          "group/radio-group",
          effectiveHorizontal
            ? "flex flex-row flex-wrap gap-2"
            : "grid gap-2 w-full",
          className
        )}
        {...props}
      >
        {children}
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
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: RadioGroupItemProps) {
  const generatedId = React.useId()
  const inputId = idProp ?? generatedId
  const labelId = `${inputId}-label`
  const descriptionId = `${inputId}-description`
  const labelledBy =
    [ariaLabelledBy, label != null && labelId].filter(Boolean).join(" ") ||
    undefined
  const describedBy =
    [ariaDescribedBy, description != null && descriptionId]
      .filter(Boolean)
      .join(" ") || undefined

  const baseClasses = cn(
    asButton
      ? asButtonRadioItemVariants({
          layout: description != null ? "description" : "inline",
        })
      : defaultRadioItemStyles,
    className
  )

  if (asButton) {
    if (description != null) {
      return (
        <RadioPrimitive.Root
          data-slot="radio-group-item"
          data-as-button
          id={inputId}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          className={baseClasses}
          {...props}
        >
          {label != null && (
            <span id={labelId} className="font-medium leading-none">
              {label}
            </span>
          )}
          <span
            id={descriptionId}
            className="text-muted-foreground text-2xs leading-normal"
          >
            {description}
          </span>
        </RadioPrimitive.Root>
      )
    }

    const content =
      children ??
      (label != null ? <span id={labelId}>{label}</span> : undefined)
    return (
      <RadioPrimitive.Root
        data-slot="radio-group-item"
        data-as-button
        id={inputId}
        aria-labelledby={labelledBy}
        aria-describedby={ariaDescribedBy}
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
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={baseClasses}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="group/radio-group-indicator absolute inset-0 flex items-center justify-center transition-opacity duration-350 ease-[cubic-bezier(0.2,0,0,1)] data-ending-style:opacity-0 motion-reduce:data-starting-style:opacity-0"
      >
        <span className="bg-primary-foreground size-2 rounded-full motion-safe:transition-transform motion-safe:duration-350 motion-safe:ease-[cubic-bezier(0.2,0,0,1)] motion-safe:group-data-starting-style/radio-group-indicator:scale-[2]" />
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
        "group/radio-group-item-row flex gap-2 leading-snug data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed",
        description != null ? "items-start" : "items-center"
      )}
    >
      <div className={cn("flex shrink-0", description != null && "mt-0.5")}>
        {control}
      </div>
      <div className="flex flex-col gap-0 leading-snug">
        {label != null && (
          <ControlLabel
            id={labelId}
            htmlFor={inputId}
            className="cursor-pointer font-normal select-none group-data-[disabled=true]/radio-group-item-row:cursor-not-allowed group-data-[disabled=true]/radio-group-item-row:opacity-75"
          >
            {label}
          </ControlLabel>
        )}
        {description != null && (
          <p
            id={descriptionId}
            className="text-muted-foreground text-2xs leading-snug"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
