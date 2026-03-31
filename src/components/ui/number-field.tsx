import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg"

const groupSizeClasses: Record<Size, string> = {
  sm: "h-7.5 text-[13px] w-32",
  md: "h-8.5 text-sm w-38",
  lg: "h-9.5 text-base w-44",
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
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn("inline-flex flex-col gap-1", className)}
      {...props}
    >
      <NumberFieldPrimitive.Group
        data-slot="number-field-group"
        className={cn(
          "inline-flex items-stretch rounded-sm border border-input bg-gray-200 text-foreground transition-[color,box-shadow,border] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 outline-none",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-muted",
          groupSizeClasses[size]
        )}
      >
        <NumberFieldPrimitive.Decrement
          data-slot="number-field-decrement"
          className={cn(
            "flex items-center justify-center w-7 border-e rounded-l-sm border-input bg-secondary text-secondary-foreground",
            "hover:bg-gray-200 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:bg-muted disabled:hover:bg-muted"
          )}
        >
          <Minus className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Decrease value</span>
        </NumberFieldPrimitive.Decrement>

        <NumberFieldPrimitive.Input
          data-slot="number-field-input"
          className={cn(
            "min-w-12 flex-1 border-none bg-white outline-none placeholder:text-muted-foreground text-center",
            "disabled:bg-muted disabled:opacity-80 disabled:cursor-not-allowed disabled:pointer-events-none",
            inputPaddingClasses[size]
          )}
        />

        <NumberFieldPrimitive.Increment
          data-slot="number-field-increment"
          className={cn(
            "flex items-center justify-center w-7 border-s rounded-r-sm border-input bg-secondary text-secondary-foreground",
            "hover:bg-gray-200 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:bg-muted disabled:hover:bg-muted"
          )}
        >
          <Plus className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Increase value</span>
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  )
}

