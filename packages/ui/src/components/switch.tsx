"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { Label } from "@gecko/ui/components/label"
import { cn } from "@gecko/ui/lib/utils"

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
  label?: React.ReactNode
  /** @default "after" */
  labelPosition?: "before" | "after"
}

function Switch({
  className,
  size = "default",
  label,
  labelPosition = "after",
  id: idProp,
  ...props
}: SwitchProps) {
  const generatedId = React.useId()
  const inputId = idProp ?? generatedId

  const control = (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      id={inputId}
      className={cn(
        "data-checked:bg-primary dark:data-checked:bg-gray-100 data-unchecked:bg-input dark:data-unchecked:bg-gray-700 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 aria-invalid:border-input-destructive aria-invalid:bg-input-destructive shrink-0 rounded-full border border-transparent shadow-xs focus-visible:ring-3 aria-invalid:focus-visible:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-75 cursor-pointer",
        !label && "mr-1",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-background shadow-md rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 pointer-events-none block ring-0 transition-transform"
      />
    </SwitchPrimitive.Root>
  )

  if (!label) {
    return control
  }

  const labelNode = (
    <Label
      htmlFor={inputId}
      className="cursor-pointer select-none text-sm font-normal whitespace-nowrap group-data-[disabled=true]/switch-field:cursor-not-allowed group-data-[disabled=true]/switch-field:opacity-75"
    >
      {label}
    </Label>
  )

  return (
    <div
      data-disabled={props.disabled ? "true" : undefined}
      className="group/switch-field inline-flex shrink-0 items-center gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed"
    >
      {labelPosition === "before" ? labelNode : null}
      {control}
      {labelPosition === "after" ? labelNode : null}
    </div>
  )
}

export { Switch }
