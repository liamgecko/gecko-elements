import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { cn } from "@gecko/ui/lib/utils"

type VirtualEventsMainBodyProps = {
  children: React.ReactNode
  className?: string
}

export function VirtualEventsMainBody({ children, className }: VirtualEventsMainBodyProps) {
  return (
    <main className={cn("min-h-0 min-w-0 flex-1 overflow-hidden", className)}>
      <ScrollArea className="h-full">{children}</ScrollArea>
    </main>
  )
}
