import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { CheckIcon, Minus } from "lucide-react"

const defaultCheckboxStyles =
  "border-input bg-background data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-input-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-input-destructive/0 focus-visible:aria-invalid:ring-input-destructive/20 flex size-4 items-center justify-center rounded-sm cursor-pointer border transition-shadow focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 -mt-[1px]"

const asButtonCheckboxVariants = cva(
  "border-border bg-background rounded-md border text-sm cursor-pointer p-3 transition-all focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted hover:border-gray-300 dark:hover:border-gray-700 hover:text-foreground data-checked:border-gray-300 dark:data-checked:border-gray-700 data-checked:bg-muted data-checked:text-foreground",
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
    <div className="flex items-start gap-2">
      {control}
      <div className="flex flex-col gap-0.5 leading-snug">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none cursor-pointer select-none"
          >
            {label}
          </label>
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
  ...props
}: CheckboxGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0 min-w-0">
      {label && (
        <legend className="mb-3 text-sm font-medium leading-none">
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
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    </fieldset>
  )
}

export { Checkbox, CheckboxGroup }
