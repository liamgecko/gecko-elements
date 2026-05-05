import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 aria-invalid:border-input-destructive rounded-sm border border-transparent text-sm font-medium focus-visible:ring-3 aria-invalid:focus-visible:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-75 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        "ghost-destructive":
          "hover:bg-destructive/10 hover:text-destructive aria-expanded:bg-destructive/10 aria-expanded:text-destructive dark:hover:bg-destructive-muted dark:aria-expanded:bg-destructive-muted focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        destructive: "bg-destructive text-white hover:bg-destructive/85 focus-visible:ring-destructive/20 focus-visible:border-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 gap-2 px-2.5 in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        xs: "h-6 gap-1.5 rounded-sm px-2 text-xs in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1.5 text-xs rounded-sm px-2.5 in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-2 px-3 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-4.5 text-lg",
        icon: "size-8",
        "icon-2xs": "size-5 rounded-sm in-data-[slot=button-group]:rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-xs": "size-6 rounded-sm in-data-[slot=button-group]:rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-sm in-data-[slot=button-group]:rounded-sm",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    dropdown?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  dropdown = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {dropdown && (
        <ChevronDownIcon
          data-icon="inline-end"
          aria-hidden="true"
        />
      )}
    </ButtonPrimitive>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- cva styles are intentionally exported from this module.
export { Button, buttonVariants }
