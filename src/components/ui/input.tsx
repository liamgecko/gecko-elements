import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "border-input hover:border-gray-400 group-hover/field:border-gray-400 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive rounded-sm border bg-white transition-[color,box-shadow,border] file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:focus-visible:ring-destructive/20 file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-muted",
  {
    variants: {
      size: {
        sm: "h-7.5 px-2 text-xs file:h-6",
        md: "h-8.5 px-2.5 text-sm file:h-7",
        lg: "h-9.5 px-3 text-base file:h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, size, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input }
