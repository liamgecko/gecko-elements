import * as React from "react";

import { chargeableItems, events } from "../data/event";
import {
  buildBasket,
  type BasketLine,
  type BookingSummary,
} from "../lib/booking";

export type BasketMode = "pinned" | "floating";

const initialBooking: BookingSummary = {
  firstName: "Liam",
  lastName: "Young",
  email: "liam@geckoengage.com",
  phone: "",
  country: "United Kingdom",
  selectedSessionIds: [],
  selectedChargeableItemIds: chargeableItems.map((item) => item.id),
  acceptTerms: false,
};

type BookingContextValue = {
  booking: BookingSummary;
  updateBooking: (changes: Partial<BookingSummary>) => void;
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
  const [submitted, setSubmitted] = React.useState(false);
  const [basketMode, setBasketMode] = React.useState<BasketMode>("pinned");

  const basketLines = buildBasket({ events, chargeableItems, booking });

  function updateBooking(changes: Partial<BookingSummary>) {
    setBooking((current) => ({ ...current, ...changes }));
  }

  function removeBasketLine(lineId: string) {
    const event = events.find((item) => item.id === lineId);

    if (event) {
      updateBooking({
        selectedSessionIds: booking.selectedSessionIds.filter(
          (id) => !event.sessions.some((session) => session.id === id),
        ),
      });
      return;
    }

    if (
      events.some((item) =>
        item.sessions.some((session) => session.id === lineId),
      )
    ) {
      updateBooking({
        selectedSessionIds: booking.selectedSessionIds.filter(
          (id) => id !== lineId,
        ),
      });
      return;
    }

    updateBooking({
      selectedChargeableItemIds: (
        booking.selectedChargeableItemIds ?? []
      ).filter((id) => id !== lineId),
    });
  }

  const value = React.useMemo<BookingContextValue>(
    () => ({
      booking,
      updateBooking,
      submitted,
      setSubmitted,
      basketMode,
      setBasketMode,
      basketLines,
      removeBasketLine,
    }),
    [booking, submitted, basketMode, basketLines],
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
