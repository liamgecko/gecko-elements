import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "border-input hover:border-input-hover group-hover/field:border-input-hover focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-input-destructive rounded-sm border bg-background transition-[color,box-shadow,border] file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:focus-visible:ring-input-destructive/40 file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:pr-2 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-muted disabled:hover:border-input disabled:group-hover/field:border-input",
  {
    variants: {
      size: {
        sm: "h-7.5 px-2 text-[13px] file:h-7.5",
        md: "h-8.5 px-2.5 text-sm file:h-8.5",
        lg: "h-9.5 px-3 text-base file:h-9.5",
      },
      readOnly: {
        true: "pointer-events-none hover:border-input group-hover/field:border-input focus-visible:ring-0 focus-visible:border-input",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      readOnly: false,
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({
  className,
  type,
  size,
  readOnly,
  tabIndex,
  onFocus,
  ...props
}: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
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
        inputVariants({ size, readOnly: Boolean(readOnly), className })
      )}
      {...props}
    />
  )
}

export { Input }
