import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ComponentExample } from "@/components/layout/component-example";
import { RequiredForm } from "@/components/layout/required-form";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@gecko/ui/components/input-otp";
import { Code } from "@gecko/ui/components/code";
import { Button } from "@gecko/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@gecko/ui/components/field";
import { Controller } from "react-hook-form";
import { z } from "zod";

const inputOtpFormSchema = z.object({
  verificationCode: z.string().length(6, "Enter the complete six-digit code."),
});

export function InputOtpPage() {
  const importSnippet = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@gecko/ui/components/input-otp"`;

  const compositionSnippet = `InputOTP
└── InputOTPGroup
    ├── InputOTPSlot
    └── InputOTPSeparator`;

  const basicExampleSnippet = `<InputOTP
  aria-label="One-time code"
  maxLength={6}
  pattern={REGEXP_ONLY_DIGITS}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`;

  const separatorSnippet = `<InputOTP
  aria-label="One-time code"
  maxLength={6}
  pattern={REGEXP_ONLY_DIGITS}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSeparator />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`;

  const alphanumericSnippet = `<InputOTP
  aria-label="One-time code"
  inputMode="text"
  maxLength={6}
  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`;

  const lengthSnippet = `<InputOTP
  aria-label="Four-digit one-time code"
  maxLength={4}
  pattern={REGEXP_ONLY_DIGITS}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="input-otp-states-disabled">One-time code</FieldLabel>
  <InputOTP
    id="input-otp-states-disabled"
    maxLength={6}
    pattern={REGEXP_ONLY_DIGITS}
    disabled
  >
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="input-otp-states-error">One-time code</FieldLabel>
  <InputOTP
    id="input-otp-states-error"
    maxLength={6}
    pattern={REGEXP_ONLY_DIGITS}
    aria-invalid
    aria-describedby="input-otp-states-error-msg"
  >
    <InputOTPGroup>
      <InputOTPSlot index={0} aria-invalid />
      <InputOTPSlot index={1} aria-invalid />
      <InputOTPSlot index={2} aria-invalid />
      <InputOTPSlot index={3} aria-invalid />
      <InputOTPSlot index={4} aria-invalid />
      <InputOTPSlot index={5} aria-invalid />
    </InputOTPGroup>
  </InputOTP>
  <FieldError id="input-otp-states-error-msg">
    Enter the six-digit code exactly as it appears in your message.
  </FieldError>
</Field>`;

  const withinFormSnippet = `const formSchema = z.object({
  verificationCode: z.string().length(6, "Enter the complete six-digit code."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { verificationCode: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller name="verificationCode" control={form.control} render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Verification code</FieldLabel>
      <InputOTP {...field} id={field.name} maxLength={6} required aria-invalid={fieldState.invalid}>
        <InputOTPGroup>{/* six InputOTPSlot components */}</InputOTPGroup>
      </InputOTP>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )} />
  <Button type="submit">Verify account</Button>
</form>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="OTP field"
        description="OTP field collects a short verification code across fixed slots. It supports paste and keyboard entry across the whole value."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use OTP field for short verification codes with a fixed length. It
            auto-advances between slots and accepts a pasted full value.
            <br />
            <br />
            Avoid using it for general text input — that is an{" "}
            <DocsPageLink to="/components/input">Input field</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import InputOTP and its slot primitives."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="Compose slots and separators inside an InputOTPGroup."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="basic-example"
        title="Basic example"
        description="A six-digit numeric verification code with one visual slot per character."
      >
        <ComponentExample>
          <div className="space-y-6">
            <InputOTP
              aria-label="One-time code"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="separator"
        title="Separator"
        description="Separate characters into readable visual groups when the code is presented in chunks."
      >
        <ComponentExample>
          <div className="space-y-6">
            <InputOTP
              aria-label="One-time code"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSeparator />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Code
              variant="block"
              language="tsx"
              code={separatorSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="alphanumeric"
        title="Alphanumeric"
        description="Accept letters and numbers when the verification code is not digits-only."
      >
        <ComponentExample>
          <div className="space-y-6">
            <InputOTP
              aria-label="One-time code"
              inputMode="text"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Code
              variant="block"
              language="tsx"
              code={alphanumericSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="length"
        title="Length"
        description="Match the number of visual slots to the exact length of the verification code."
      >
        <ComponentExample>
          <div className="space-y-6">
            <InputOTP
              aria-label="Four-digit one-time code"
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <Code
              variant="block"
              language="tsx"
              code={lengthSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="The field can be unavailable or invalid. Use the state that matches whether the person can enter a code, and whether the value is valid."
      >
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description="Use the disabled state when a code cannot be entered yet."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-disabled>
                <FieldLabel htmlFor="input-otp-states-disabled">
                  One-time code
                </FieldLabel>
                <InputOTP
                  id="input-otp-states-disabled"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  disabled
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={disabledSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-error"
          title="Error"
          description="Show a connected validation message when the entered code is not valid."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid>
                <FieldLabel htmlFor="input-otp-states-error">
                  One-time code
                </FieldLabel>
                <InputOTP
                  id="input-otp-states-error"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  aria-invalid
                  aria-describedby="input-otp-states-error-msg"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} aria-invalid />
                    <InputOTPSlot index={1} aria-invalid />
                    <InputOTPSlot index={2} aria-invalid />
                    <InputOTPSlot index={3} aria-invalid />
                    <InputOTPSlot index={4} aria-invalid />
                    <InputOTPSlot index={5} aria-invalid />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError id="input-otp-states-error-msg">
                  Enter the six-digit code exactly as it appears in your
                  message.
                </FieldError>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={errorSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="within-form"
        title="Within form"
        description="Compose OTP field with Field when the code needs a visible label, guidance, validation, and form submission."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              schema={inputOtpFormSchema}
              defaultValues={{ verificationCode: "" }}
            >
              {(form) => (
                <FieldSet>
                  <FieldLegend>Verify your account</FieldLegend>
                  <FieldGroup>
                    <Controller
                      name="verificationCode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="verification-code">
                            Verification code
                          </FieldLabel>
                          <FieldDescription>
                            Enter the six-digit code sent to your email address.
                          </FieldDescription>
                          <InputOTP
                            {...field}
                            id="verification-code"
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            required
                            aria-invalid={fieldState.invalid}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <Button type="submit">Verify account</Button>
                </FieldSet>
              )}
            </RequiredForm>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Match the slots and validation to the code being entered."
      >
        <DocsDoDont
          doItems={[
            <>
              Set <Code>maxLength</Code> to the exact code length.
            </>,
            <>
              Render one <Code>InputOTPSlot</Code> for each character, with
              sequential indexes.
            </>,
            <>
              Use <Code>pattern</Code> to allow the characters the code can
              contain.
            </>,
            <>Use a visible field label in product forms.</>,
            <>
              Pair invalid slots with a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> error.
            </>,
          ]}
          dontItems={[
            <>Don’t use OTP field for general text entry.</>,
            <>Don’t render more or fewer slots than the maximum length.</>,
            <>Don’t use a digits-only pattern for an alphanumeric code.</>,
            <>Don’t split the control into separate native inputs.</>,
            <>Don’t block pasting a complete verification code.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on InputOTP and InputOTPSlot."
      >
        <ChildSection
          id="api-input-otp"
          title="InputOTP"
          description="Props on InputOTP."
        >
          <DocsApiTable
            rows={[
              {
                name: "maxLength",
                type: "number",
                defaultValue: "—",
                description:
                  "Sets the maximum code length and should match the number of slots.",
              },
              {
                name: "pattern",
                type: "string",
                defaultValue: "—",
                description: "Restricts which characters can be entered.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Prevents code entry.",
              },
              {
                name: "name",
                type: "string",
                defaultValue: "—",
                description: "Identifies the code when a form is submitted.",
              },
              {
                name: "required",
                type: "boolean",
                defaultValue: "false",
                description: "Requires a complete value for form submission.",
              },
              {
                name: "inputMode",
                type: "string",
                defaultValue: '"numeric"',
                description:
                  "Chooses the on-screen keyboard. Use text for alphanumeric codes.",
              },
              {
                name: "autoComplete",
                type: "string",
                defaultValue: '"one-time-code"',
                description: "Enables supported verification-code autofill.",
              },
              {
                name: "value / onChange",
                type: "string / (value: string) => void",
                defaultValue: "—",
                description: "Controls the complete code value.",
              },
              {
                name: "onComplete",
                type: "(value: string) => void",
                defaultValue: "—",
                description:
                  "Runs when the value reaches the configured maximum length.",
              },
              {
                name: "pasteTransformer",
                type: "(value: string) => string",
                defaultValue: "—",
                description: "Normalises a pasted value before validation.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-input-otp-slot"
          title="InputOTPSlot"
          description="Props on InputOTPSlot."
        >
          <DocsApiTable
            rows={[
              {
                name: "index",
                type: "number",
                defaultValue: "—",
                description:
                  "Selects the character displayed by this slot, starting at zero.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/input-otp">
                Shadcn Input OTP documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://input-otp.rodz.dev/">
                input-otp documentation
              </DocsExternalLink>{" "}
              for the source composition and underlying API.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use the standard field patterns around the OTP control."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input</DocsPageLink> — for
            general single-line text.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for a
            label and validation message.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
