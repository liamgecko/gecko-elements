import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"

type Size = "sm" | "md" | "lg"

const groupSizeClasses: Record<Size, string> = {
  sm: "h-7 text-[13px] w-32",
  md: "h-8 text-sm w-38",
  lg: "h-9 text-base w-44",
}

const inputPaddingClasses: Record<Size, string> = {
  sm: "px-1.5",
  md: "px-2",
  lg: "px-2.5",
}

export interface NumberFieldProps
  extends NumberFieldPrimitive.Root.Props {
  size?: Size
  className?: string
}

export function NumberField({
  size = "md",
  className,
  id,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn(
        "group/number-field inline-flex flex-col gap-1 data-disabled:cursor-not-allowed",
        className
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
          groupSizeClasses[size]
        )}
      >
        <NumberFieldPrimitive.Decrement
          data-slot="number-field-decrement"
          className={cn(
            "flex items-center justify-center w-7 border-e rounded-l-sm border-input bg-secondary text-secondary-foreground",
            "group-aria-invalid/number-field:border-input-destructive",
            "hover:bg-gray-200 dark:hover:bg-gray-900 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:hover:bg-muted"
          )}
        >
          <Minus className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Decrease value</span>
        </NumberFieldPrimitive.Decrement>

        <NumberFieldPrimitive.Input
          id={id}
          data-slot="number-field-input"
          className={cn(
            "min-w-12 flex-1 border-none bg-background outline-none placeholder:text-muted-foreground group-aria-invalid/number-field:placeholder:text-destructive text-center",
            "disabled:bg-muted disabled:opacity-75 disabled:cursor-not-allowed disabled:pointer-events-none",
            inputPaddingClasses[size]
          )}
        />

        <NumberFieldPrimitive.Increment
          data-slot="number-field-increment"
          className={cn(
            "flex items-center justify-center w-7 border-s rounded-r-sm border-input bg-secondary text-secondary-foreground",
            "group-aria-invalid/number-field:border-input-destructive",
            "hover:bg-gray-200 dark:hover:bg-gray-900 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:hover:bg-muted"
          )}
        >
          <Plus className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Increase value</span>
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  )
}

