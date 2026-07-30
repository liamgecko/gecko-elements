import { Checkbox } from "@gecko/ui/components/checkbox";
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
  FieldContent,
  FieldDescription,
  FieldError,
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

import { COURSES, ENTRY_YEARS } from "../../data/event";
import { useBooking } from "../../state/booking";

export type StepCourseErrors = {
  acceptTerms?: string;
};

type StepCourseDetailsProps = {
  errors: StepCourseErrors;
  clearError: (field: keyof StepCourseErrors) => void;
};

export function StepCourseDetails({
  errors,
  clearError,
}: StepCourseDetailsProps) {
  const { booking, updateBooking } = useBooking();

  return (
    <>
      <Field>
        <FieldLabel htmlFor="course-of-interest">Course of interest</FieldLabel>
        <Combobox
          items={[...COURSES]}
          value={booking.courseOfInterest}
          onValueChange={(courseOfInterest: string | null) =>
            updateBooking({ courseOfInterest })
          }
        >
          <ComboboxInput
            id="course-of-interest"
            name="course-of-interest"
            className="w-full"
            placeholder="Select a course"
            showClear
          />
          <ComboboxContent>
            <ComboboxEmpty>No courses found.</ComboboxEmpty>
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
        <FieldLabel htmlFor="year-of-entry">Planned year of entry</FieldLabel>
        <Select
          value={booking.yearOfEntry ?? undefined}
          onValueChange={(value) =>
            updateBooking({ yearOfEntry: value ?? null })
          }
        >
          <SelectTrigger id="year-of-entry" className="w-full">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ENTRY_YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field
        orientation="horizontal"
        data-invalid={errors.acceptTerms ? true : undefined}
      >
        <Checkbox
          id="accept-terms"
          name="accept-terms"
          checked={booking.acceptTerms}
          aria-invalid={Boolean(errors.acceptTerms)}
          aria-describedby={
            errors.acceptTerms ? "accept-terms-error" : undefined
          }
          onCheckedChange={(checked) => {
            updateBooking({ acceptTerms: checked === true });
            clearError("acceptTerms");
          }}
        />
        <FieldContent>
          <FieldLabel htmlFor="accept-terms">
            Accept terms and conditions
          </FieldLabel>
          {errors.acceptTerms ? (
            <FieldError id="accept-terms-error">
              {errors.acceptTerms}
            </FieldError>
          ) : null}
          <FieldDescription>
            By submitting this form, you agree to our{" "}
            <a href="#terms-and-conditions">Terms and Conditions</a> and confirm
            that the information provided is accurate and complete. You can
            review how we handle your data in our{" "}
            <a href="#privacy-policy">Privacy Policy</a>.
          </FieldDescription>
        </FieldContent>
      </Field>
    </>
  );
}
