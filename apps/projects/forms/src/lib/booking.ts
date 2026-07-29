import type { EventFieldEvent } from "../components/event-field"

export type BookingSummary = {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string | null
  selectedSessionIds: string[]
  selectedChargeableItemIds?: string[]
  acceptTerms: boolean
}

export type ChargeableItem = {
  id: string
  name: string
  description?: string
  cost: number
}

/** A single priced row in the basket. Nested lines render beneath their parent. */
export type BasketLine = {
  id: string
  name: string
  description?: string
  cost: number
  lines?: BasketLine[]
}

export const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

export function formatCost(cost: number) {
  return cost === 0 ? "FREE" : currencyFormatter.format(cost)
}

function eventToBasketLine(
  event: EventFieldEvent,
  selectedSessionIds: string[],
): BasketLine | null {
  const sessions = event.sessions.filter((session) =>
    selectedSessionIds.includes(session.id),
  )

  if (sessions.length === 0) return null

  return {
    id: event.id,
    name: event.title,
    description: event.dateTime,
    cost: event.cost,
    lines: sessions.map((session) => ({
      id: session.id,
      name: session.title,
      description: `${session.date}, ${session.time}`,
      cost: session.cost,
    })),
  }
}

export function buildBasket({
  events,
  chargeableItems = [],
  booking,
}: {
  events: EventFieldEvent[]
  chargeableItems?: ChargeableItem[]
  booking: BookingSummary
}): BasketLine[] {
  const eventLines = events
    .map((event) => eventToBasketLine(event, booking.selectedSessionIds))
    .filter((line): line is BasketLine => line !== null)

  const itemLines = chargeableItems
    .filter((item) =>
      (booking.selectedChargeableItemIds ?? []).includes(item.id),
    )
    .map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      cost: item.cost,
    }))

  return [...eventLines, ...itemLines]
}

export function getBasketTotal(lines: BasketLine[]): number {
  return lines.reduce(
    (total, line) => total + line.cost + getBasketTotal(line.lines ?? []),
    0,
  )
}
