const eventDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})

const sessionDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})

export function formatEventDateRange(startsAt: Date, endsAt: Date) {
  return `${eventDateFormatter.format(startsAt)} · ${timeFormatter.format(startsAt)} – ${timeFormatter.format(endsAt)} BST`
}

export function formatSessionDateTime(startsAt: Date) {
  return `${sessionDateFormatter.format(startsAt)} · ${timeFormatter.format(startsAt)}`
}

export function formatJoinFromTime(startsAt: Date) {
  return timeFormatter.format(startsAt)
}
