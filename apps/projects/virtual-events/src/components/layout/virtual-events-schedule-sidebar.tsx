import { cn } from "@gecko/ui/lib/utils"

import { MOCK_EVENT_SCHEDULE } from "@/data/event-schedule"

import { EventScheduleItem } from "./event-schedule-item"

type VirtualEventsScheduleSidebarProps = {
  className?: string
}

export function VirtualEventsScheduleSidebar({ className }: VirtualEventsScheduleSidebarProps) {
  return (
    <aside
      aria-label="Event schedule"
      className={cn(
        "border-border flex w-(--ve-schedule-width) shrink-0 flex-col border-l",
        className,
      )}
    >
      <div className="flex flex-col gap-4 px-6 pb-6">
        <h2 className="text-sm font-semibold text-foreground">Your itinerary</h2>

        <div className="flex flex-col gap-4">
          {MOCK_EVENT_SCHEDULE.map((session) => (
            <EventScheduleItem key={session.id} session={session} />
          ))}
        </div>
      </div>
    </aside>
  )
}
