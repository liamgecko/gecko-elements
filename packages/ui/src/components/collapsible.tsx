import type { CSSProperties } from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { cn } from "@gecko/ui/lib/utils"

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn("outline-hidden", className)}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  children,
  style,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      style={
        {
          // tw-animate collapsible keyframes read --kb-*; Base UI sets --collapsible-panel-height
          ["--kb-collapsible-content-height" as string]: "var(--collapsible-panel-height)",
          ...style,
        } as CSSProperties
      }
      className={cn(
        "overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none",
        className
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Panel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
