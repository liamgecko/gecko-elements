import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"
import { ChevronDownIcon } from "lucide-react"

const nativeSelectVariants = cva(
  "border-input hover:border-input-hover placeholder:text-muted-foreground aria-invalid:placeholder:text-destructive selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 aria-invalid:border-input-destructive w-full min-w-0 appearance-none rounded-sm border bg-transparent py-1 pe-8 transition-[color] select-none focus-visible:ring-3 aria-invalid:focus-visible:ring-3 outline-none disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-7 ps-2 text-xs",
        md: "h-8 ps-2.5 text-sm",
        lg: "h-9 ps-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof nativeSelectVariants>

function NativeSelect({
  className,
  size = "md",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-75",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(nativeSelectVariants({ size }))}
        {...props}
      />
      <ChevronDownIcon className="text-muted-foreground top-1/2 end-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none" aria-hidden="true" data-slot="native-select-icon" />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
