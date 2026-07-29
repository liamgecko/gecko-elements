import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@gecko/ui/components/button";
import { Card } from "@gecko/ui/components/card";
import { Checkbox } from "@gecko/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@gecko/ui/components/combobox";
import { TelephoneField } from "@gecko/ui/components/telephone-field";
import { ChevronRight } from "lucide-react";

import { EventField } from "../components/event-field";
import { FormShell } from "../components/form-shell";
import { COUNTRIES } from "../data/countries";
import { chargeableItems, paidEvent } from "../data/event";
import type { BookingSummary } from "../lib/booking";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  acceptTerms?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState<string | null>("United Kingdom");
  const [selectedSessionIds, setSelectedSessionIds] = React.useState<string[]>(
    [],
  );
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  function clearError(field: keyof FormErrors) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("first-name") ?? "").trim();
    const lastName = String(formData.get("last-name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const nextErrors: FormErrors = {};

    if (!firstName) {
      nextErrors.firstName = "Please enter your first name.";
    }

    if (!lastName) {
      nextErrors.lastName = "Please enter your last name.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!acceptTerms) {
      nextErrors.acceptTerms = "Please accept the terms and conditions.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const booking: BookingSummary = {
      firstName,
      lastName,
      email,
      phone,
      country,
      selectedSessionIds,
      selectedChargeableItemIds: chargeableItems.map((item) => item.id),
    };

    navigate("/summary", { state: booking });
  }

  return (
    <FormShell>
      <form
        aria-label="Paid events form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card className="rounded-xl p-6">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={errors.firstName ? true : undefined}>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <Input
                  id="first-name"
                  name="first-name"
                  type="text"
                  defaultValue="Liam"
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={
                    errors.firstName ? "first-name-error" : undefined
                  }
                  onChange={() => clearError("firstName")}
                />
                {errors.firstName ? (
                  <FieldError id="first-name-error">
                    {errors.firstName}
                  </FieldError>
                ) : null}
              </Field>

              <Field data-invalid={errors.lastName ? true : undefined}>
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input
                  id="last-name"
                  name="last-name"
                  type="text"
                  defaultValue="Young"
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={
                    errors.lastName ? "last-name-error" : undefined
                  }
                  onChange={() => clearError("lastName")}
                />
                {errors.lastName ? (
                  <FieldError id="last-name-error">
                    {errors.lastName}
                  </FieldError>
                ) : null}
              </Field>
            </div>

            <Field data-invalid={errors.email ? true : undefined}>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="liam@geckoengage.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => clearError("email")}
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
                value={phone}
                onChange={setPhone}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="country">Select your country</FieldLabel>
              <Combobox
                items={COUNTRIES}
                value={country}
                onValueChange={(value: string | null) => setCountry(value)}
              >
                <ComboboxInput
                  id="country"
                  name="country"
                  className="w-full"
                  placeholder="Select a country"
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>No countries found.</ComboboxEmpty>
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

            <EventField
              event={paidEvent}
              selectedSessionIds={selectedSessionIds}
              onSelectedSessionIdsChange={setSelectedSessionIds}
            />

            <Field
              orientation="horizontal"
              data-invalid={errors.acceptTerms ? true : undefined}
            >
              <Checkbox
                id="accept-terms"
                name="accept-terms"
                checked={acceptTerms}
                aria-invalid={Boolean(errors.acceptTerms)}
                aria-describedby={
                  errors.acceptTerms ? "accept-terms-error" : undefined
                }
                onCheckedChange={(checked) => {
                  setAcceptTerms(checked === true);
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
                  <a href="#terms-and-conditions">Terms and Conditions</a> and
                  confirm that the information provided is accurate and
                  complete. You can review how we handle your data in our{" "}
                  <a href="#privacy-policy">Privacy Policy</a>.
                </FieldDescription>
              </FieldContent>
            </Field>

            <div className="flex justify-end">
              <Button type="submit">
                Proceed to Summary
                <ChevronRight data-icon="inline-end" aria-hidden />
              </Button>
            </div>
          </FieldGroup>
        </Card>
      </form>
    </FormShell>
  );
}
