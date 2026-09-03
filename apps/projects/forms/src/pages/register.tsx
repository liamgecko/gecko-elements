import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@gecko/ui/components/button";
import { Card } from "@gecko/ui/components/card";
import { FieldGroup } from "@gecko/ui/components/field";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FormShell } from "../components/form-shell";
import { PinnedBasket } from "../components/pinned-basket";
import { FORM_STEP_COUNT, useBooking } from "../state/booking";
import {
  StepBasicDetails,
  type StepBasicErrors,
} from "./steps/step-basic-details";
import { StepCampusTours } from "./steps/step-campus-tours";
import {
  StepCourseDetails,
  type StepCourseErrors,
} from "./steps/step-course-details";
import { StepGuestsOpenDay } from "./steps/step-guests-open-day";

type FormErrors = StepBasicErrors & StepCourseErrors;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEP_TITLES = [
  "Your details",
  "Guests and open day",
  "Campus tours",
  "Course interest",
] as const;

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    booking,
    step,
    goNext,
    goPrevious,
    setSubmitted,
    basketMode,
    basketLines,
    removeBasketLine,
  } = useBooking();
  const [errors, setErrors] = React.useState<FormErrors>({});

  const isFirstStep = step === 0;
  const isLastStep = step === FORM_STEP_COUNT - 1;

  function clearError(field: keyof FormErrors) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function scrollToPageTop() {
    window.scrollTo({ top: 0 });
  }

  function validateStep(currentStep: number): FormErrors {
    const nextErrors: FormErrors = {};

    if (currentStep === 0) {
      if (!booking.firstName.trim()) {
        nextErrors.firstName = "Please enter your first name.";
      }
      if (!booking.lastName.trim()) {
        nextErrors.lastName = "Please enter your last name.";
      }
      if (!booking.email.trim()) {
        nextErrors.email = "Please enter your email address.";
      } else if (!EMAIL_PATTERN.test(booking.email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }
    }

    if (currentStep === FORM_STEP_COUNT - 1 && !booking.acceptTerms) {
      nextErrors.acceptTerms = "Please accept the terms and conditions.";
    }

    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateStep(step);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!isLastStep) {
      goNext();
      scrollToPageTop();
      return;
    }

    setSubmitted(true);
    navigate("/summary");
  }

  return (
    <FormShell>
      <form
        aria-label="Paid events form"
        className={basketMode === "floating" ? "pb-8" : undefined}
        noValidate
        onSubmit={handleSubmit}
      >
        <Card className="rounded-xl p-6">
          <div className="mb-6">
            <p className="text-2xs font-medium text-muted-foreground">
              Step {step + 1} of {FORM_STEP_COUNT}
            </p>
            <h1 className="text-balance text-xl font-semibold">
              {STEP_TITLES[step]}
            </h1>
          </div>

          <FieldGroup>
            {step === 0 ? (
              <StepBasicDetails errors={errors} clearError={clearError} />
            ) : null}
            {step === 1 ? <StepGuestsOpenDay /> : null}
            {step === 2 ? <StepCampusTours /> : null}
            {step === 3 ? (
              <StepCourseDetails errors={errors} clearError={clearError} />
            ) : null}

            {basketMode === "pinned" ? (
              <PinnedBasket lines={basketLines} onRemove={removeBasketLine} />
            ) : null}

            <div className="flex justify-end gap-2">
              {!isFirstStep ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setErrors({});
                    goPrevious();
                    scrollToPageTop();
                  }}
                >
                  <ChevronLeft data-icon="inline-start" aria-hidden />
                  Previous
                </Button>
              ) : null}
              <Button type="submit">
                {isLastStep ? "Proceed to Summary" : "Next"}
                <ChevronRight data-icon="inline-end" aria-hidden />
              </Button>
            </div>
          </FieldGroup>
        </Card>
      </form>
    </FormShell>
  );
}
