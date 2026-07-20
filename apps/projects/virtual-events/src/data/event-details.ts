export type EventHost = {
  id: string
  name: string
  role: string
  imageSrc: string
}

export type EventDetails = {
  title: string
  startsAt: Date
  endsAt: Date
  about: string
  hosts: EventHost[]
}

function minutesFromNow(minutes: number) {
  return new Date(Date.now() + minutes * 60_000)
}

export const MOCK_EVENT_DETAILS: EventDetails = {
  title: "Gecko's New Video Platform Launch",
  startsAt: minutesFromNow(-25),
  endsAt: minutesFromNow(115),
  about:
    "Join us for a first look at Gecko's new video platform — built for live virtual events, interactive sessions, and seamless attendee engagement. Hear from the team behind the product, see a live demo, and ask questions along the way.\n\nWhether you are planning open days, webinars, or multi-track conferences, this session will show how Gecko brings streaming, chat, breakout sessions, and attendee management into one place. You will see how hosts can moderate conversations in real time, how attendees move between sessions, and how event teams track engagement without leaving the platform.\n\nCome with questions — there will be time for a live Q&A with the product team at the end.",
  hosts: [
    {
      id: "host-1",
      name: "Karsten Winegeart",
      role: "Event host",
      imageSrc: "https://picsum.photos/seed/karsten-winegeart/200",
    },
    {
      id: "host-2",
      name: "Sarah Chen",
      role: "Product lead",
      imageSrc: "https://picsum.photos/seed/sarah-chen/200",
    },
  ],
}
