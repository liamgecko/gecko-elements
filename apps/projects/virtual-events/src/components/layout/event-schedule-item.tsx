import { Button } from "@gecko/ui/components/button"

import {
  getSessionJoinState,
  type EventScheduleSession,
} from "@/data/event-schedule"
import { formatSessionDateTime } from "@/lib/format-event-time"

import { EventDateTime } from "./event-date-time"

type EventScheduleItemProps = {
  session: EventScheduleSession
}

export function EventScheduleItem({ session }: EventScheduleItemProps) {
  const joinState = getSessionJoinState(session)

  return (
    <article className="border-border flex flex-col border-b pb-4 last:border-b-0 last:pb-0">
      <h3 className="text-sm font-semibold text-foreground mb-1">{session.title}</h3>
      <EventDateTime dateTime={session.startsAt.toISOString()} className="text-2xs mb-3">
        {formatSessionDateTime(session.startsAt)}
      </EventDateTime>
      <p className="text-muted-foreground text-2xs">{session.excerpt}</p>
      <div>
        <Button
          type="button"
          size="xs"
          variant={joinState.disabled ? "secondary" : "default"}
          disabled={joinState.disabled}
          className="mt-3"
        >
          {joinState.label}
        </Button>
      </div>
    </article>
  )
}
