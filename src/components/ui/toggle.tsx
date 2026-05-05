"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "focus-visible:border-ring focus-visible:ring-ring/50",
    "aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40",
    "aria-invalid:border-input-destructive",
    "rounded-sm border border-transparent text-sm font-medium",
    "focus-visible:ring-3",
    "inline-flex items-center justify-center whitespace-nowrap transition-all",
    "disabled:pointer-events-none disabled:opacity-75",
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    "outline-none select-none",
    "aria-pressed:bg-muted aria-pressed:text-foreground",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-muted hover:text-foreground",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-8 min-w-8 gap-2 px-2.5",
        xs: "h-6 min-w-6 gap-1.5 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 min-w-7 gap-1.5 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 gap-2 px-3 text-lg [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-8 p-0",
        "icon-xs": "size-6 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 p-0",
        "icon-lg": "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- cva styles are intentionally exported from this module.
export { Toggle, toggleVariants }
