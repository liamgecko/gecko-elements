import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
 
import { cn } from "@/lib/utils"
 
const textareaVariants = cva(
  "border-input hover:border-gray-400 group-hover/field:border-gray-400 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive rounded-sm border bg-white transition-[color,box-shadow,border] focus-visible:ring-3 aria-invalid:focus-visible:ring-destructive/20 placeholder:text-muted-foreground w-full min-w-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-muted resize-y field-sizing-content min-h-16",
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
  }
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
 
export { Textarea, textareaVariants }
