import type { EventFieldEvent } from "../components/event-field";
import type { ChargeableItem } from "../lib/booking";

export const paidEvent: EventFieldEvent = {
  id: "open-day-2026",
  title: "Open day 2026",
  dateTime: "Fri 10 Jul, 09:00 - 17:00 (Europe/London)",
  cost: 50,
  sessions: [
    {
      id: "session-one",
      title: "Session One",
      date: "Fri 10 Jul",
      time: "09:00 - 12:00",
      venue: "College Rd, Clifton, Bristol BS8 3HA",
      cost: 10,
    },
    {
      id: "session-two",
      title: "Session Two",
      date: "Fri 10 Jul",
      time: "13:00 - 16:00",
      venue: "College Rd, Clifton, Bristol BS8 3HA",
      cost: 10,
    },
    {
      id: "session-three",
      title: "Session Three",
      date: "Fri 10 Jul",
      time: "15:00 - 17:00",
      venue: "College Rd, Clifton, Bristol BS8 3HA",
      cost: 0,
    },
  ],
};

/** Every event a form can take bookings for. */
export const events: EventFieldEvent[] = [paidEvent];

/** Standalone chargeable items, priced independently of any event. */
export const chargeableItems: ChargeableItem[] = [
  {
    id: "parking",
    name: "Parking",
    cost: 10,
  },
  {
    id: "lunch",
    name: "Lunch",
    cost: 7.5,
  },
];
