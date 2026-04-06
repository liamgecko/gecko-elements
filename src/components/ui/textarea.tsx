import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
 
import { cn } from "@/lib/utils"
 
const textareaVariants = cva(
  "border-input hover:border-gray-400 group-hover/field:border-gray-400 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive rounded-sm border bg-white transition-[color,box-shadow,border] focus-visible:ring-3 aria-invalid:focus-visible:ring-destructive/20 placeholder:text-muted-foreground w-full min-w-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-muted resize-y field-sizing-content min-h-16",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-[13px]",
        md: "px-2.5 py-2 text-sm",
        lg: "px-3 py-2.5 text-base",
      },
      readOnly: {
        true: "pointer-events-none hover:border-input group-hover/field:border-input focus-visible:ring-0 focus-visible:border-input resize-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      readOnly: false,
    },
  }
)

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>

function Textarea({
  className,
  size,
  readOnly,
  tabIndex,
  onFocus,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      readOnly={readOnly}
      tabIndex={readOnly ? (tabIndex ?? -1) : tabIndex}
      onFocus={
        readOnly
          ? (e) => {
              e.currentTarget.blur()
            }
          : onFocus
      }
      className={cn(
        textareaVariants({ size, readOnly: Boolean(readOnly), className })
      )}
      {...props}
    />
  )
}
 
export { Textarea }
