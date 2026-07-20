import { Clock } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@gecko/ui/lib/utils"

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
      <Clock className="size-3 shrink-0" aria-hidden />
      {children}
    </time>
  )
}
