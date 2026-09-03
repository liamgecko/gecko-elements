import {
  Field,
  FieldLabel,
} from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select";

import { EventField } from "../../components/event-field";
import { openDayEvent } from "../../data/event";
import { useBooking } from "../../state/booking";

const GUEST_COUNTS = ["0", "1", "2", "3", "4", "5"] as const;
const GUEST_COUNT_ITEMS = GUEST_COUNTS.map((count) => ({
  value: count,
  label: count === "0" ? "No guests" : count,
}));

export function StepGuestsOpenDay() {
  const { booking, updateBooking } = useBooking();

  return (
    <>
      <Field>
        <FieldLabel htmlFor="guest-count">Number of guests</FieldLabel>
        <Select
          items={GUEST_COUNT_ITEMS}
          value={String(booking.guestCount)}
          onValueChange={(value) =>
            updateBooking({ guestCount: Number(value ?? 0) })
          }
        >
          <SelectTrigger id="guest-count">
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {GUEST_COUNT_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {booking.guests.map((guest, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor={`guest-${index}-first-name`}>
              Guest {index + 1} first name
            </FieldLabel>
            <Input
              id={`guest-${index}-first-name`}
              type="text"
              value={guest.firstName}
              onChange={(event) => {
                const guests = booking.guests.map((item, guestIndex) =>
                  guestIndex === index
                    ? { ...item, firstName: event.target.value }
                    : item,
                );
                updateBooking({ guests });
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`guest-${index}-last-name`}>
              Guest {index + 1} last name
            </FieldLabel>
            <Input
              id={`guest-${index}-last-name`}
              type="text"
              value={guest.lastName}
              onChange={(event) => {
                const guests = booking.guests.map((item, guestIndex) =>
                  guestIndex === index
                    ? { ...item, lastName: event.target.value }
                    : item,
                );
                updateBooking({ guests });
              }}
            />
          </Field>
        </div>
      ))}

      <EventField
        event={openDayEvent}
        selectedSessionIds={booking.selectedSessionIds.filter((id) =>
          openDayEvent.sessions.some((session) => session.id === id),
        )}
        onSelectedSessionIdsChange={(sessionIds) => {
          const otherIds = booking.selectedSessionIds.filter(
            (id) => !openDayEvent.sessions.some((session) => session.id === id),
          );
          updateBooking({
            selectedSessionIds: [...otherIds, ...sessionIds],
          });
        }}
      />
    </>
  );
}
