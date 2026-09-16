import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import Clock from "@hugeicons/core-free-icons/Clock01Icon";
import type { ReactNode } from "react"

import { cn } from "@geckolabs/elements/lib/utils"

type EventDateTimeProps = {
  dateTime: string
  children: ReactNode
  className?: string
}

export function EventDateTime({ dateTime, children, className }: EventDateTimeProps) {
  return (
    <time
      dateTime={dateTime}
      className={cn("text-muted-foreground flex items-center gap-1", className)}
    >
      <HugeiconsIcon icon={Clock} className="size-3 shrink-0" aria-hidden />
      {children}
    </time>
  )
}
