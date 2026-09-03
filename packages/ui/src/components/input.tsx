import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@gecko/ui/lib/utils";

const inputVariants = cva(
  "border-input hover:border-input-hover group-hover/field:border-input-hover focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-input-destructive rounded-sm border bg-background text-foreground transition-[color,box-shadow,border] file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 file:text-foreground placeholder:text-muted-foreground aria-invalid:text-destructive aria-invalid:placeholder:text-destructive w-full min-w-0 outline-none file:inline-flex file:border-0 file:pr-2 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-muted disabled:hover:border-input disabled:group-hover/field:border-input",
  {
    variants: {
      size: {
        sm: "h-7 px-2 text-[13px] file:h-7",
        md: "h-8 px-2.5 text-sm file:h-8",
        lg: "h-9 px-3 text-base file:h-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

function Input({ className, type, size, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  );
}

export { Input };
