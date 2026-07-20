import { Avatar, AvatarDescription, AvatarFallback, AvatarImage, AvatarLabel } from "@gecko/ui/components/avatar"
import { cn } from "@gecko/ui/lib/utils"

import { getPersonInitials } from "@/components/live-chat/live-chat-people"
import { MOCK_EVENT_DETAILS } from "@/data/event-details"
import { formatEventDateRange } from "@/lib/format-event-time"

import { EventDateTime } from "./event-date-time"

type VirtualEventsMainContentProps = {
  className?: string
}

export function VirtualEventsMainContent({ className }: VirtualEventsMainContentProps) {
  const { title, startsAt, endsAt, about, hosts } = MOCK_EVENT_DETAILS
  const aboutParagraphs = about.split("\n\n")

  return (
    <section
      aria-label="Event details"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
    >
      <div className="flex flex-col gap-8 px-6 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold text-foreground text-pretty">{title}</h1>
          <EventDateTime dateTime={startsAt.toISOString()} className="text-sm">
            {formatEventDateRange(startsAt, endsAt)}
          </EventDateTime>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Your hosts</h2>
          <ul className="flex flex-col gap-4">
            {hosts.map((host) => (
              <li key={host.id}>
                <Avatar size="lg">
                  <AvatarImage src={host.imageSrc} alt="" />
                  <AvatarFallback>{getPersonInitials(host.name)}</AvatarFallback>
                  <AvatarLabel>{host.name}</AvatarLabel>
                  <AvatarDescription className="text-xs">
                    {host.role}
                  </AvatarDescription>
                </Avatar>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">About this event</h2>
          <div className="text-muted-foreground space-y-3 text-sm leading-relaxed text-pretty">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
