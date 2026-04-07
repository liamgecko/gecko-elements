import * as React from "react"

import { cn } from "@/lib/utils"

export function ColorRow({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid w-full grid-cols-6 gap-4", className)} {...props} />
  )
}
