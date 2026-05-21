import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

type ContainerProps = React.ComponentProps<"div"> & {
}

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("bg-background p-6", className)} {...props} />
}

