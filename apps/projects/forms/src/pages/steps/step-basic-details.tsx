import { DatePicker } from "@gecko/ui/components/date-picker";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@gecko/ui/components/combobox";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import { TelephoneField } from "@gecko/ui/components/telephone-field";
import { Textarea } from "@gecko/ui/components/textarea";

import { COUNTRIES } from "../../data/countries";
import { useBooking } from "../../state/booking";

export type StepBasicErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

type StepBasicDetailsProps = {
  errors: StepBasicErrors;
  clearError: (field: keyof StepBasicErrors) => void;
};

export function StepBasicDetails({
  errors,
  clearError,
}: StepBasicDetailsProps) {
  const { booking, updateBooking } = useBooking();
  const dateOfBirth = booking.dateOfBirth
    ? new Date(booking.dateOfBirth)
    : undefined;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Field data-invalid={errors.firstName ? true : undefined}>
          <FieldLabel htmlFor="first-name">First name</FieldLabel>
          <Input
            id="first-name"
            name="first-name"
            type="text"
            value={booking.firstName}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "first-name-error" : undefined}
            onChange={(event) => {
              updateBooking({ firstName: event.target.value });
              clearError("firstName");
            }}
          />
          {errors.firstName ? (
            <FieldError id="first-name-error">{errors.firstName}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.lastName ? true : undefined}>
          <FieldLabel htmlFor="last-name">Last name</FieldLabel>
          <Input
            id="last-name"
            name="last-name"
            type="text"
            value={booking.lastName}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "last-name-error" : undefined}
            onChange={(event) => {
              updateBooking({ lastName: event.target.value });
              clearError("lastName");
            }}
          />
          {errors.lastName ? (
            <FieldError id="last-name-error">{errors.lastName}</FieldError>
          ) : null}
        </Field>
      </div>

      <Field data-invalid={errors.email ? true : undefined}>
        <FieldLabel htmlFor="email">Email address</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={booking.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(event) => {
            updateBooking({ email: event.target.value });
            clearError("email");
          }}
        />
        {errors.email ? (
          <FieldError id="email-error">{errors.email}</FieldError>
        ) : null}
      </Field>

      <Field>
        <FieldLabel htmlFor="telephone">Telephone number</FieldLabel>
        <TelephoneField
          id="telephone"
          defaultCountry="GB"
          value={booking.phone}
          onChange={(phone) => updateBooking({ phone })}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="address">Address</FieldLabel>
        <Textarea
          id="address"
          name="address"
          value={booking.address}
          rows={3}
          onChange={(event) => updateBooking({ address: event.target.value })}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="nationality">Nationality</FieldLabel>
        <Combobox
          items={COUNTRIES}
          value={booking.nationality}
          onValueChange={(nationality: string | null) =>
            updateBooking({ nationality })
          }
        >
          <ComboboxInput
            id="nationality"
            name="nationality"
            className="w-full"
            placeholder="Select a nationality"
            showClear
          />
          <ComboboxContent>
            <ComboboxEmpty>No nationalities found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>

      <Field>
        <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
        <DatePicker
          id="date-of-birth"
          variant="dob"
          value={dateOfBirth}
          onChange={(date) =>
            updateBooking({
              dateOfBirth: date ? date.toISOString() : null,
            })
          }
          aria-label="Date of birth"
        />
      </Field>
    </>
  );
}
