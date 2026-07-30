import * as React from "react";

import { chargeableItems, events, campusToursEvent } from "../data/event";
import {
  buildBasket,
  resizeGuests,
  type BasketLine,
  type BookingSummary,
} from "../lib/booking";

export type BasketMode = "pinned" | "floating";

export const FORM_STEP_COUNT = 4;

const initialBooking: BookingSummary = {
  firstName: "Liam",
  lastName: "Young",
  email: "liam@geckoengage.com",
  phone: "",
  address: "",
  nationality: "United Kingdom",
  dateOfBirth: null,
  guestCount: 0,
  guests: [],
  campusOfInterest: null,
  courseOfInterest: null,
  yearOfEntry: null,
  selectedSessionIds: [],
  selectedChargeableItemIds: chargeableItems.map((item) => item.id),
  acceptTerms: false,
};

type BookingContextValue = {
  booking: BookingSummary;
  updateBooking: (changes: Partial<BookingSummary>) => void;
  step: number;
  setStep: (step: number) => void;
  goNext: () => void;
  goPrevious: () => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  basketMode: BasketMode;
  setBasketMode: (mode: BasketMode) => void;
  basketLines: BasketLine[];
  removeBasketLine: (lineId: string) => void;
};

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = React.useState(initialBooking);
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [basketMode, setBasketMode] = React.useState<BasketMode>("pinned");

  const basketLines = buildBasket({ events, chargeableItems, booking });

  function updateBooking(changes: Partial<BookingSummary>) {
    setBooking((current) => {
      const next = { ...current, ...changes };

      if (changes.guestCount !== undefined) {
        next.guests = resizeGuests(current.guests, changes.guestCount);
      }

      if (
        changes.campusOfInterest !== undefined &&
        changes.campusOfInterest !== current.campusOfInterest
      ) {
        const otherCampusSessionIds = new Set(
          campusToursEvent.sessions
            .filter(
              (session) =>
                session.campus &&
                session.campus !== changes.campusOfInterest,
            )
            .map((session) => session.id),
        );

        next.selectedSessionIds = next.selectedSessionIds.filter(
          (id) => !otherCampusSessionIds.has(id),
        );
      }

      return next;
    });
  }

  function removeBasketLine(lineId: string) {
    setBooking((current) => {
      const event = events.find((item) => item.id === lineId);

      if (event) {
        return {
          ...current,
          selectedSessionIds: current.selectedSessionIds.filter(
            (id) => !event.sessions.some((session) => session.id === id),
          ),
        };
      }

      if (
        events.some((item) =>
          item.sessions.some((session) => session.id === lineId),
        )
      ) {
        return {
          ...current,
          selectedSessionIds: current.selectedSessionIds.filter(
            (id) => id !== lineId,
          ),
        };
      }

      return {
        ...current,
        selectedChargeableItemIds: (
          current.selectedChargeableItemIds ?? []
        ).filter((id) => id !== lineId),
      };
    });
  }

  function goNext() {
    setStep((current) => Math.min(current + 1, FORM_STEP_COUNT - 1));
  }

  function goPrevious() {
    setStep((current) => Math.max(current - 1, 0));
  }

  const value = React.useMemo<BookingContextValue>(
    () => ({
      booking,
      updateBooking,
      step,
      setStep,
      goNext,
      goPrevious,
      submitted,
      setSubmitted,
      basketMode,
      setBasketMode,
      basketLines,
      removeBasketLine,
    }),
    [booking, step, submitted, basketMode, basketLines],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = React.useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }

  return context;
}
