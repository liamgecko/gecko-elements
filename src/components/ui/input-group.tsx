"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type InputGroupSize = "sm" | "md" | "lg"

const InputGroupContext = React.createContext<InputGroupSize | undefined>(
  undefined
)

const inputGroupVariants = cva(
  "border-input hover:border-gray-400 has-[[data-slot=input-group-control]:disabled]:hover:border-input has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot=input-group-control][aria-invalid=true]:focus-visible]:ring-3 has-[[data-slot=input-group-control][aria-invalid=true]:focus-visible]:ring-destructive/20 rounded-sm border bg-transparent transition-[color,box-shadow,border] in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto has-[[data-slot=input-group-control]:disabled]:bg-muted",
  {
    variants: {
      size: {
        sm: "h-7.5",
        md: "h-8.5",
        lg: "h-9.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function InputGroup({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <InputGroupContext.Provider value={size ?? "md"}>
      <div
        data-slot="input-group"
        data-size={size}
        role="group"
        className={cn(inputGroupVariants({ size }), className)}
        {...props}
      />
    </InputGroupContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground h-auto gap-2 font-medium group-data-[disabled=true]/input-group:opacity-50 group-has-[[data-slot=input-group-control]:disabled]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        "inline-start": "ps-2 has-[>button]:-ms-1 has-[>kbd]:ms-[-0.15rem] order-first",
        "inline-end": "pe-2 has-[>button]:-me-1 has-[>kbd]:me-[-0.15rem] order-last",
        "block-start":
          "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start",
        "block-end":
          "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start",
      },
      size: {
        sm: "py-1 text-[13px] [&>svg:not([class*='size-'])]:size-3.5",
        md: "py-1.5 text-sm [&>svg:not([class*='size-'])]:size-4",
        lg: "py-2 text-base [&>svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
      size: "md",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  const groupSize = React.useContext(InputGroupContext) ?? "md"
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align, size: groupSize }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonSizeMap = {
  sm: "size-5 rounded-[calc(var(--radius)-5px)] p-0 [&>svg:not([class*='size-'])]:size-3.5",
  md: "size-6 rounded-[calc(var(--radius)-5px)] p-0 [&>svg:not([class*='size-'])]:size-4",
  lg: "size-7 rounded-[calc(var(--radius)-5px)] p-0 [&>svg:not([class*='size-'])]:size-4.5",
} as const

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size: sizeProp,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> & {
  type?: "button" | "submit" | "reset"
  size?: InputGroupSize
}) {
  const groupSize = React.useContext(InputGroupContext) ?? "md"
  const size = sizeProp ?? groupSize
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn("shadow-none flex items-center justify-center", inputGroupButtonSizeMap[size], className)}
      {...props}
    />
  )
}

const inputGroupTextSizeMap = {
  sm: "text-[13px] [&_svg:not([class*='size-'])]:size-3.5",
  md: "text-sm [&_svg:not([class*='size-'])]:size-4",
  lg: "text-base [&_svg:not([class*='size-'])]:size-4.5",
} as const

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  const groupSize = React.useContext(InputGroupContext) ?? "md"
  return (
    <span
      className={cn(
        "text-muted-foreground gap-2 flex items-center [&_svg]:pointer-events-none",
        inputGroupTextSizeMap[groupSize],
        className
      )}
      {...props}
    />
  )
}

const inputGroupInputSizeMap = {
  sm: "!h-7 px-2 text-[13px]",
  md: "!h-8 px-2.5 text-sm",
  lg: "!h-9 px-3 text-base",
} as const

function InputGroupInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "size">) {
  const groupSize = React.useContext(InputGroupContext) ?? "md"
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "border-0 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 flex-1",
        inputGroupInputSizeMap[groupSize],
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn("rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 flex-1 resize-none", className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
