export type LiveChatPerson = {
  id: string
  name: string
}

export const LIVE_CHAT_PEOPLE: LiveChatPerson[] = [
  { id: "person-1", name: "Liam Young" },
  { id: "person-2", name: "Sarah Chen" },
  { id: "person-3", name: "James Wright" },
  { id: "person-4", name: "Toshi" },
  { id: "person-5", name: "Liam Gallagher" },
  { id: "person-6", name: "Karsten Winegeart" },
  { id: "person-7", name: "Event Admin" },
  { id: "person-8", name: "Emma Brooks" },
]

export function getPersonInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
