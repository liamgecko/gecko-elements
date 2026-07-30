import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@gecko/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select";

import { EventField } from "../../components/event-field";
import { CAMPUSES, campusToursEvent } from "../../data/event";
import { useBooking } from "../../state/booking";

export function StepCampusTours() {
  const { booking, updateBooking } = useBooking();

  return (
    <>
      <Field>
        <FieldLabel htmlFor="campus-of-interest">
          Campus of interest
        </FieldLabel>
        <Select
          value={booking.campusOfInterest ?? undefined}
          onValueChange={(value) =>
            updateBooking({ campusOfInterest: value ?? null })
          }
        >
          <SelectTrigger id="campus-of-interest" className="w-full">
            <SelectValue placeholder="Select a campus" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CAMPUSES.map((campus) => (
                <SelectItem key={campus} value={campus}>
                  {campus}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>
          Choosing a campus filters the available tour times below.
        </FieldDescription>
      </Field>

      <EventField
        event={campusToursEvent}
        campusFilter={booking.campusOfInterest}
        selectedSessionIds={booking.selectedSessionIds.filter((id) =>
          campusToursEvent.sessions.some((session) => session.id === id),
        )}
        onSelectedSessionIdsChange={(sessionIds) => {
          const otherIds = booking.selectedSessionIds.filter(
            (id) =>
              !campusToursEvent.sessions.some((session) => session.id === id),
          );
          updateBooking({
            selectedSessionIds: [...otherIds, ...sessionIds],
          });
        }}
      />
    </>
  );
}
