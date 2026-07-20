import { Avatar, AvatarFallback, AvatarLabel } from "@gecko/ui/components/avatar"

import {
  getPersonInitials,
  LIVE_CHAT_PEOPLE,
} from "@/components/live-chat/live-chat-people"

export function AttendeesPanel() {
  return (
    <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3">
      {LIVE_CHAT_PEOPLE.map((person) => (
        <li key={person.id}>
          <div className="min-w-0 py-2">
            <Avatar size="md">
              <AvatarFallback>{getPersonInitials(person.name)}</AvatarFallback>
              <AvatarLabel className="font-normal">{person.name}</AvatarLabel>
            </Avatar>
          </div>
        </li>
      ))}
    </ul>
  )
}
