"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"

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
        default: "bg-transparent hover:bg-muted hover:text-foreground",
        "ghost-light":
          "bg-transparent hover:bg-black/5 hover:text-foreground aria-pressed:bg-black/5 aria-pressed:text-foreground",
        "ghost-dark":
          "bg-transparent text-white hover:bg-white/10 hover:text-white aria-pressed:bg-white/10 aria-pressed:text-white",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground",
      },
      size: {
        default:
          "h-8 min-w-8 gap-2 px-2.5 data-[icon-only=true]:w-8 data-[icon-only=true]:px-0",
        xs: "h-6 min-w-6 gap-1.5 px-2 text-xs data-[icon-only=true]:w-6 data-[icon-only=true]:px-0 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 min-w-7 gap-1.5 px-2.5 text-xs data-[icon-only=true]:w-7 data-[icon-only=true]:px-0 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 gap-2 px-3 text-lg data-[icon-only=true]:w-9 data-[icon-only=true]:px-0 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-8 p-0",
        "icon-xs": "size-6 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 p-0",
        "icon-lg": "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "outline",
  size = "default",
  children,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const childArray = React.Children.toArray(children)
  const isIconOnly =
    childArray.length === 1 && React.isValidElement(childArray[0])

  return (
    <TogglePrimitive
      data-slot="toggle"
      data-icon-only={isIconOnly || undefined}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- cva styles are intentionally exported from this module.
export { Toggle, toggleVariants }
