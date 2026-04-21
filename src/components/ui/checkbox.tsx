import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { CheckIcon, Minus } from "lucide-react"

const defaultCheckboxStyles =
  "border-input bg-background data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-input-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-input-destructive/0 focus-visible:aria-invalid:ring-input-destructive/20 dark:focus-visible:aria-invalid:ring-input-destructive/40 flex size-4 items-center justify-center rounded-sm cursor-pointer border transition-shadow focus-visible:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 -mt-[1px]"

const asButtonCheckboxVariants = cva(
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

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  asButton?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
}

type CheckboxGroupProps = CheckboxGroupPrimitive.Props & {
  label?: React.ReactNode
  description?: React.ReactNode
  /** Lay out options in a row (wraps on narrow widths). */
  horizontal?: boolean
}

function Checkbox({
  className,
  asButton,
  label,
  description,
  children,
  id: idProp,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId()
  const inputId = idProp ?? generatedId

  const baseClasses = cn(
    asButton
      ? asButtonCheckboxVariants({
          layout: description ? "description" : "inline",
        })
      : defaultCheckboxStyles,
    className
  )

  if (asButton) {
    if (description) {
      return (
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          data-as-button
          id={inputId}
          className={baseClasses}
          {...props}
        >
          {label && (
            <span className="font-medium leading-none">
              {label}
            </span>
          )}
          <p className="text-muted-foreground text-xs leading-normal">
            {description}
          </p>
        </CheckboxPrimitive.Root>
      )
    }

    const content = children ?? label
    return (
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        data-as-button
        id={inputId}
        className={baseClasses}
        {...props}
      >
        {content}
      </CheckboxPrimitive.Root>
    )
  }

  const control = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      id={inputId}
      className={baseClasses}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none group/indicator [&_svg]:size-3.5"
      >
        <span className="grid place-content-center group-data-indeterminate/indicator:hidden">
          <CheckIcon />
        </span>
        <span className="hidden place-content-center group-data-indeterminate/indicator:grid [&_svg]:size-3.5">
          <Minus />
        </span>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label && !description) {
    return control
  }

  return (
    <div
      data-disabled={props.disabled ? "true" : undefined}
      className="group/checkbox flex items-start gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed"
    >
      {control}
      <div className="flex flex-col gap-0.5 leading-snug">
        {label && (
          <Label
            htmlFor={inputId}
            className="cursor-pointer select-none group-data-[disabled=true]/checkbox:cursor-not-allowed group-data-[disabled=true]/checkbox:opacity-75"
          >
            {label}
          </Label>
        )}
        {description && (
          <p className="text-muted-foreground text-xs leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function CheckboxGroup({
  className,
  label,
  description,
  horizontal = false,
  ...props
}: CheckboxGroupProps) {
  return (
    <fieldset className="flex flex-col">
      {label && (
        <legend
          className="gap-1 text-sm leading-none font-medium group-data-[disabled=true]:opacity-75 peer-disabled:opacity-75 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed mb-2"
        >
          {label}
        </legend>
      )}
      {description && (
        <p className="text-muted-foreground text-sm leading-normal">
          {description}
        </p>
      )}
      <CheckboxGroupPrimitive
        data-slot="checkbox-group"
        data-orientation={horizontal ? "horizontal" : "vertical"}
        className={cn(
          horizontal
            ? "flex flex-row flex-wrap gap-2"
            : "flex flex-col gap-3",
          className
        )}
        {...props}
      />
    </fieldset>
  )
}

export { Checkbox, CheckboxGroup }
