import type { EventFieldEvent, EventSession } from "../components/event-field"
import type { ChargeableItem } from "../lib/booking"

export const CAMPUSES = ["Clifton", "Langford", "City Centre"] as const
export type Campus = (typeof CAMPUSES)[number]

export const COURSES = [
  "Accounting and Finance",
  "Aerospace Engineering",
  "Biological Sciences",
  "Business and Management",
  "Computer Science",
  "Economics",
  "English Literature",
  "Geography",
  "History",
  "Law",
  "Mathematics",
  "Medicine",
  "Psychology",
  "Veterinary Science",
] as const

export const ENTRY_YEARS = ["2026", "2027", "2028", "2029"] as const

export const openDayEvent: EventFieldEvent = {
  id: "university-open-day-2026",
  title: "University Open Day 2026",
  dateTime: "Sat 13 Jun, 09:00 - 16:00 (Europe/London)",
  cost: 50,
  sessions: [
    {
      id: "od-welcome",
      title: "Welcome and university overview",
      date: "Sat 13 Jun",
      time: "09:00 - 09:45",
      venue: "Great Hall, Clifton Campus",
      cost: 0,
    },
    {
      id: "od-engineering",
      title: "Subject talk: Engineering",
      date: "Sat 13 Jun",
      time: "10:00 - 10:45",
      venue: "Queen's Building, Clifton Campus",
      cost: 0,
    },
    {
      id: "od-business",
      title: "Subject talk: Business and Management",
      date: "Sat 13 Jun",
      time: "10:00 - 10:45",
      venue: "Priory Road Complex, Clifton Campus",
      cost: 0,
    },
    {
      id: "od-medicine",
      title: "Subject talk: Medicine and Health Sciences",
      date: "Sat 13 Jun",
      time: "11:00 - 11:45",
      venue: "Medical School, City Centre Campus",
      cost: 0,
    },
    {
      id: "od-accommodation",
      title: "Student accommodation talk",
      date: "Sat 13 Jun",
      time: "11:00 - 11:45",
      venue: "Students' Union, Clifton Campus",
      cost: 0,
    },
    {
      id: "od-library",
      title: "Library and study spaces walk",
      date: "Sat 13 Jun",
      time: "12:00 - 12:45",
      venue: "Arts and Social Sciences Library",
      cost: 0,
    },
    {
      id: "od-student-life",
      title: "Student life Q&A",
      date: "Sat 13 Jun",
      time: "13:00 - 13:45",
      venue: "Anson Rooms, Students' Union",
      cost: 0,
    },
    {
      id: "od-apply",
      title: "Applying to university workshop",
      date: "Sat 13 Jun",
      time: "14:00 - 14:45",
      venue: "Teaching and Learning Centre",
      cost: 0,
    },
    {
      id: "od-vet",
      title: "Subject talk: Veterinary Science",
      date: "Sat 13 Jun",
      time: "14:00 - 14:45",
      venue: "Langford Campus",
      cost: 0,
      campus: "Langford",
    },
    {
      id: "od-closing",
      title: "Closing remarks and next steps",
      date: "Sat 13 Jun",
      time: "15:00 - 15:30",
      venue: "Great Hall, Clifton Campus",
      cost: 0,
    },
  ],
}

const campusTourSlots: Array<
  Omit<EventSession, "id" | "venue" | "cost"> & {
    campus: Campus
    venue: string
  }
> = [
  {
    title: "Morning campus tour",
    date: "Sat 13 Jun",
    time: "09:30 - 10:15",
    campus: "Clifton",
    venue: "Clifton Campus reception",
  },
  {
    title: "Mid-morning campus tour",
    date: "Sat 13 Jun",
    time: "10:30 - 11:15",
    campus: "Clifton",
    venue: "Clifton Campus reception",
  },
  {
    title: "Lunchtime campus tour",
    date: "Sat 13 Jun",
    time: "12:00 - 12:45",
    campus: "Clifton",
    venue: "Clifton Campus reception",
  },
  {
    title: "Afternoon campus tour",
    date: "Sat 13 Jun",
    time: "14:00 - 14:45",
    campus: "Clifton",
    venue: "Clifton Campus reception",
  },
  {
    title: "Late afternoon campus tour",
    date: "Sat 13 Jun",
    time: "15:00 - 15:45",
    campus: "Clifton",
    venue: "Clifton Campus reception",
  },
  {
    title: "Morning campus tour",
    date: "Sat 13 Jun",
    time: "09:30 - 10:15",
    campus: "Langford",
    venue: "Langford Campus reception",
  },
  {
    title: "Mid-morning campus tour",
    date: "Sat 13 Jun",
    time: "11:00 - 11:45",
    campus: "Langford",
    venue: "Langford Campus reception",
  },
  {
    title: "Afternoon campus tour",
    date: "Sat 13 Jun",
    time: "13:30 - 14:15",
    campus: "Langford",
    venue: "Langford Campus reception",
  },
  {
    title: "Late afternoon campus tour",
    date: "Sat 13 Jun",
    time: "15:00 - 15:45",
    campus: "Langford",
    venue: "Langford Campus reception",
  },
  {
    title: "Morning campus tour",
    date: "Sat 13 Jun",
    time: "09:45 - 10:30",
    campus: "City Centre",
    venue: "City Centre Campus reception",
  },
  {
    title: "Mid-morning campus tour",
    date: "Sat 13 Jun",
    time: "11:15 - 12:00",
    campus: "City Centre",
    venue: "City Centre Campus reception",
  },
  {
    title: "Lunchtime campus tour",
    date: "Sat 13 Jun",
    time: "12:30 - 13:15",
    campus: "City Centre",
    venue: "City Centre Campus reception",
  },
  {
    title: "Afternoon campus tour",
    date: "Sat 13 Jun",
    time: "14:15 - 15:00",
    campus: "City Centre",
    venue: "City Centre Campus reception",
  },
  {
    title: "Late afternoon campus tour",
    date: "Sat 13 Jun",
    time: "15:30 - 16:15",
    campus: "City Centre",
    venue: "City Centre Campus reception",
  },
]

export const campusToursEvent: EventFieldEvent = {
  id: "campus-tours-2026",
  title: "Campus tours",
  dateTime: "Sat 13 Jun, 09:30 - 16:15 (Europe/London)",
  cost: 0,
  sessions: campusTourSlots.map((slot) => ({
    id: `tour-${slot.campus.toLowerCase().replace(/\s+/g, "-")}-${slot.time.slice(0, 5).replace(":", "")}`,
    title: `${slot.title} (${slot.campus})`,
    date: slot.date,
    time: slot.time,
    venue: slot.venue,
    cost: 0,
    campus: slot.campus,
  })),
}

/** Every event a form can take bookings for. */
export const events: EventFieldEvent[] = [openDayEvent, campusToursEvent]

/** @deprecated Prefer `openDayEvent` */
export const paidEvent = openDayEvent

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
]
