import { cn } from "@gecko/ui/lib/utils"

type VirtualEventsVideoPlayerProps = {
  className?: string
}

export function VirtualEventsVideoPlayer({ className }: VirtualEventsVideoPlayerProps) {
  return (
    <section aria-label="Video player" className={cn("shrink-0 px-6 pb-6", className)}>
      <div className="bg-foreground relative aspect-video w-full overflow-hidden rounded-lg">
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
          <div className="bg-background/20 h-2 w-24 rounded-full" aria-hidden />
          <div className="bg-background/20 size-6 rounded-sm" aria-hidden />
        </div>
      </div>
    </section>
  )
}
