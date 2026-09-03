import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"

const textareaVariants = cva(
  "border-input hover:border-input-hover group-hover/field:border-input-hover focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-input-destructive rounded-sm border bg-background text-foreground transition-[color,box-shadow,border] focus-visible:ring-3 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 placeholder:text-muted-foreground aria-invalid:text-destructive aria-invalid:placeholder:text-destructive w-full min-w-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-muted disabled:hover:border-input disabled:group-hover/field:border-input resize-y field-sizing-content min-h-16",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-2.5 py-2 text-sm",
        lg: "px-3 py-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>

function Textarea({ className, size, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, className }))}
      {...props}
    />
  )
}

export { Textarea }
