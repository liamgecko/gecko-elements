import * as React from "react";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Code } from "@gecko/ui/components/code";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import { Button } from "@gecko/ui/components/button";

export function FieldPage() {
  const [showValidationErrors, setShowValidationErrors] = React.useState(false);
  const validationEmailRef = React.useRef<HTMLInputElement>(null);

  const importSnippet = `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@gecko/ui/components/field"`;

  const fieldCompositionSnippet = `Field
├── FieldLabel
├── Input
├── FieldDescription
└── FieldError`;

  const fieldGroupCompositionSnippet = `FieldGroup
├── Field
├── FieldSeparator
└── Field`;

  const fieldSetCompositionSnippet = `FieldSet
├── FieldLegend
├── FieldDescription
└── FieldGroup
    ├── Field
    └── Field`;

  const basicExampleSnippet = `<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <Input
    id="username"
    name="username"
    type="text"
    placeholder="gecko-user"
  />
</Field>`;

  const helpTextSnippet = `<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="name@example.com"
    aria-describedby="email-description"
  />
  <FieldDescription id="email-description">
    We’ll send account notifications to this address.
  </FieldDescription>
</Field>`;

  const fieldGroupSnippet = `<FieldGroup>
  <Field>
    <FieldLabel htmlFor="first-name">First name</FieldLabel>
    <Input id="first-name" name="firstName" autoComplete="given-name" />
  </Field>
  <Field>
    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
    <Input id="last-name" name="lastName" autoComplete="family-name" />
  </Field>
</FieldGroup>`;

  const fieldSeparatorSnippet = `<FieldGroup>
  <Field>
    <FieldLabel htmlFor="work-email">Work email</FieldLabel>
    <Input id="work-email" name="workEmail" type="email" />
  </Field>
  <FieldSeparator>Or</FieldSeparator>
  <Field>
    <FieldLabel htmlFor="work-phone">Work telephone</FieldLabel>
    <Input id="work-phone" name="workPhone" type="tel" />
  </Field>
</FieldGroup>`;

  const fieldSetSnippet = `<FieldSet aria-describedby="profile-description">
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription id="profile-description">
    This information appears on your public profile.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="profile-name">Display name</FieldLabel>
      <Input id="profile-name" name="displayName" />
    </Field>
    <Field>
      <FieldLabel htmlFor="profile-role">Role</FieldLabel>
      <Input id="profile-role" name="role" />
    </Field>
  </FieldGroup>
</FieldSet>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="company-name">Company name</FieldLabel>
  <Input
    id="company-name"
    name="companyName"
    type="text"
    defaultValue="Gecko"
    disabled
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="tax-id">Tax ID</FieldLabel>
  <Input
    id="tax-id"
    name="taxId"
    type="text"
    placeholder="00-0000000"
    aria-invalid
    aria-describedby="tax-id-error"
  />
  <FieldError id="tax-id-error">
    Enter a tax ID in the format 00-0000000.
  </FieldError>
</Field>`;

  const readOnlySnippet = `<Field>
  <FieldLabel htmlFor="account-id">Account ID</FieldLabel>
  <Input
    id="account-id"
    name="accountId"
    defaultValue="acct_1234567890"
    readOnly
  />
</Field>`;

  const requiredSnippet = `<Field>
  <FieldLabel htmlFor="full-name">Full name</FieldLabel>
  <Input id="full-name" name="fullName" required />
</Field>`;

  const orientationSnippet = `<Field orientation="vertical|horizontal|responsive">
  <FieldLabel htmlFor="field-id">Label</FieldLabel>
  <Input id="field-id" name="fieldName" />
</Field>`;

  const validationSnippet = `<FieldGroup>
  <Field data-invalid>
    <FieldLabel htmlFor="validation-email">Email</FieldLabel>
    <Input
      id="validation-email"
      name="email"
      type="email"
      aria-invalid
      aria-describedby="validation-email-error"
    />
    <FieldError id="validation-email-error">
      Enter a valid email address.
    </FieldError>
  </Field>
  <Field data-invalid>
    <FieldLabel htmlFor="validation-password">Password</FieldLabel>
    <Input
      id="validation-password"
      name="password"
      type="password"
      aria-invalid
      aria-describedby="validation-password-error"
    />
    <FieldError id="validation-password-error">
      Use at least 8 characters.
    </FieldError>
  </Field>
</FieldGroup>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Field"
          description="The Field component groups a label, a control, and optional help or error text so a form row stays together."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Field when composing setup interfaces in Gecko — settings,
              event creation, and similar forms. Each field needs a label and
              may also need helper text or a validation message. Wrap the
              control primitive inside Field.
              <br />
              <br />
              Avoid using it as page layout, or wrapping content that is not a
              form control. If you only need a caption with no grouping, use a{" "}
              <DocsPageLink to="/components/label">Label</DocsPageLink> instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Field and its parts to compose a labelled control."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="composition" label="Composition">
        <PageSectionHeader
          title="Composition"
          description="Choose the smallest composition that correctly represents the form structure."
        />

        <PageSubsectionHeader
          id="composition-field"
          title="Field"
          description="Groups one labelled control with its supporting text and validation message. Use FieldContent for compound layouts. FieldTitle is visual text only; use FieldLabel whenever the text names a control."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="text"
            code={fieldCompositionSnippet}
            showCopyButton
            copyLabel="Copy Field composition"
          />
        </ComponentExample>

        <PageSubsectionHeader
          id="composition-field-group"
          title="Field group"
          description="Arranges adjacent fields and separators. It provides layout, not a shared accessible name."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="text"
            code={fieldGroupCompositionSnippet}
            showCopyButton
            copyLabel="Copy Field group composition"
          />
        </ComponentExample>

        <PageSubsectionHeader
          id="composition-field-set"
          title="Field set"
          description="Semantically groups related controls under one legend and description."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="text"
            code={fieldSetCompositionSnippet}
            showCopyButton
            copyLabel="Copy Field set composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              A single labelled control using <Code>Field</Code> and{" "}
              <Code>FieldLabel</Code>. Do not add a Field group or Field set
              when there is only one field.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="gecko-user"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="help-text" label="Help text">
        <PageSectionHeader
          title="Help text"
          description={
            <>
              Adds hint text using <Code>FieldDescription</Code>. Use this when
              the label is not enough on its own.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                aria-describedby="email-description"
              />
              <FieldDescription id="email-description">
                We’ll send account notifications to this address.
              </FieldDescription>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={helpTextSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="field-group" label="Field group">
        <PageSectionHeader
          title="Field group"
          description="Use Field group to apply the standard spacing to adjacent fields. Each field keeps its own label and accessible relationships."
        />
        <ComponentExample>
          <div className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <Input
                  id="first-name"
                  name="firstName"
                  autoComplete="given-name"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input
                  id="last-name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Field>
            </FieldGroup>
            <Code
              variant="block"
              language="tsx"
              code={fieldGroupSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="field-group-separator"
          title="Separator"
          description="Use Field separator only when it clarifies the relationship between adjoining parts of a Field group. It does not create semantic grouping."
        />
        <ComponentExample>
          <div className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="work-email">Work email</FieldLabel>
                <Input id="work-email" name="workEmail" type="email" />
              </Field>
              <FieldSeparator>Or</FieldSeparator>
              <Field>
                <FieldLabel htmlFor="work-phone">Work telephone</FieldLabel>
                <Input id="work-phone" name="workPhone" type="tel" />
              </Field>
            </FieldGroup>
            <Code
              variant="block"
              language="tsx"
              code={fieldSeparatorSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="field-set" label="Field set">
        <PageSectionHeader
          title="Field set"
          description="Use Field set when several controls answer one related question or form section. Field legend provides the shared name."
        />
        <ComponentExample>
          <div className="space-y-6">
            <FieldSet aria-describedby="profile-description">
              <FieldLegend>Profile</FieldLegend>
              <FieldDescription id="profile-description">
                This information appears on your public profile.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="profile-name">Display name</FieldLabel>
                  <Input id="profile-name" name="displayName" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="profile-role">Role</FieldLabel>
                  <Input id="profile-role" name="role" />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Code
              variant="block"
              language="tsx"
              code={fieldSetSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="orientation" label="Orientation">
        <PageSectionHeader
          title="Orientation"
          description="Vertical is the default. Horizontal and responsive orientations are reserved for compositions that need controls and supporting content beside one another."
        />
        <ComponentExample>
          <div className="space-y-6">
            <FieldGroup>
              <Field orientation="vertical">
                <FieldLabel htmlFor="vertical-field">Vertical</FieldLabel>
                <Input id="vertical-field" name="verticalField" />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="horizontal-field">Horizontal</FieldLabel>
                <Input id="horizontal-field" name="horizontalField" />
              </Field>
              <Field orientation="responsive">
                <FieldLabel htmlFor="responsive-field">Responsive</FieldLabel>
                <Input id="responsive-field" name="responsiveField" />
              </Field>
            </FieldGroup>
            <Code
              variant="block"
              language="tsx"
              code={orientationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="The field can be unavailable or invalid. Use the state that matches whether the person can edit, and whether the value is valid."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks the field using <Code>data-disabled</Code> on{" "}
              <Code>Field</Code> and <Code>disabled</Code> on the control. Use
              this when the value cannot be changed temporarily.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="company-name">Company name</FieldLabel>
              <Input
                id="company-name"
                name="companyName"
                type="text"
                defaultValue="Gecko"
                disabled
              />
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

        <PageSubsectionHeader
          id="states-error"
          title="Error"
          description={
            <>
              Shows a validation error using <Code>data-invalid</Code> on{" "}
              <Code>Field</Code>, <Code>aria-invalid</Code> on the control, and{" "}
              <Code>FieldError</Code>. Use this when the value is not valid.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="tax-id">Tax ID</FieldLabel>
              <Input
                id="tax-id"
                name="taxId"
                type="text"
                placeholder="00-0000000"
                aria-invalid
                aria-describedby="tax-id-error"
              />
              <FieldError id="tax-id-error">
                Enter a tax ID in the format 00-0000000.
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

        <PageSubsectionHeader
          id="states-read-only"
          title="Read-only"
          description={
            <>
              Set <Code>readOnly</Code> on the control when the value should
              stay visible but not editable. Input handles the non-interactive
              styling and focus behaviour. Use this when someone can see the
              value but cannot change it.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="account-id">Account ID</FieldLabel>
              <Input
                id="account-id"
                name="accountId"
                defaultValue="acct_1234567890"
                readOnly
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={readOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="states-required"
          title="Required"
          description="Set required on the control. Field label detects the native state and displays the library-owned required marker."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="full-name">Full name</FieldLabel>
              <Input id="full-name" name="fullName" required />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={requiredSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="validation" label="Validation">
        <PageSectionHeader
          title="Validation"
          description={
            <>
              Shows messages after submit using <Code>FieldError</Code>. This
              example also sets <Code>data-invalid</Code> and{" "}
              <Code>aria-invalid</Code> when the form is checked. Use this when
              errors should appear after the person tries to continue.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setShowValidationErrors(true);
                validationEmailRef.current?.focus();
              }}
            >
              <FieldGroup>
                <Field data-invalid={showValidationErrors || undefined}>
                  <FieldLabel htmlFor="validation-email">Email</FieldLabel>
                  <Input
                    ref={validationEmailRef}
                    id="validation-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={showValidationErrors || undefined}
                    aria-describedby={
                      showValidationErrors
                        ? "validation-email-error"
                        : undefined
                    }
                  />
                  {showValidationErrors && (
                    <FieldError id="validation-email-error">
                      Enter a valid email address.
                    </FieldError>
                  )}
                </Field>
                <Field data-invalid={showValidationErrors || undefined}>
                  <FieldLabel htmlFor="validation-password">
                    Password
                  </FieldLabel>
                  <Input
                    id="validation-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    aria-invalid={showValidationErrors || undefined}
                    aria-describedby={
                      showValidationErrors
                        ? "validation-password-error"
                        : undefined
                    }
                  />
                  {showValidationErrors && (
                    <FieldError id="validation-password-error">
                      Use at least 8 characters.
                    </FieldError>
                  )}
                </Field>
                <Button type="submit">Continue</Button>
              </FieldGroup>
            </form>
            <Code
              variant="block"
              language="tsx"
              code={validationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep each field’s label, control, help text, and error together."
        />
        <DocsDoDont
          doItems={[
            <>
              Connect <Code>FieldLabel</Code> to its control with matching{" "}
              <Code>htmlFor</Code> and <Code>id</Code>.
            </>,
            <>
              Connect <Code>FieldDescription</Code> and <Code>FieldError</Code>{" "}
              to the control with <Code>aria-describedby</Code>.
            </>,
            <>
              Use <Code>FieldGroup</Code> for layout and <Code>FieldSet</Code>{" "}
              with <Code>FieldLegend</Code> for semantic grouping.
            </>,
            <>
              Set <Code>data-invalid</Code> on Field and{" "}
              <Code>aria-invalid</Code> on the control when validation fails.
            </>,
            <>
              Set <Code>disabled</Code> or <Code>readOnly</Code> on the control.
              Add <Code>data-disabled</Code> to Field for its shared visual
              state.
            </>,
            <>
              Use the default control size unless a layout specifically needs
              another.
            </>,
          ]}
          dontItems={[
            <>Don’t use Field as general page layout.</>,
            <>Don’t wrap one standalone field in Field group and Field set.</>,
            <>
              Don’t use Field group when the controls need a shared accessible
              name.
            </>,
            <>Don’t use placeholder text instead of a visible label.</>,
            <>
              Don’t show an error without connecting the control with{" "}
              <Code>aria-describedby</Code>.
            </>,
            <>
              Don’t set only the visual invalid state; expose the state on the
              control too.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Field."
        />
        <DocsApiTable
          rows={[
            {
              name: "Field.orientation",
              type: '"vertical" | "horizontal" | "responsive"',
              defaultValue: '"vertical"',
              description:
                "Sets how the label, control, and supporting text are arranged.",
            },
            {
              name: "FieldLegend.variant",
              type: '"legend" | "label"',
              defaultValue: '"legend"',
              description: "Sets the visual treatment of a fieldset legend.",
            },
            {
              name: "FieldError.errors",
              type: "Array<{ message?: string } | undefined>",
              description:
                "Renders unique validation messages when children are not provided.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/field">
                Shadcn Field documentation
              </DocsExternalLink>{" "}
              for the complete source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Compose Field with the control or message the form needs."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/label">Label</DocsPageLink> — for a
            standalone control name without Field composition.
          </li>
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            for a single-line control inside Field.
          </li>
          <li>
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> — for a
            page-level message rather than a field error.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
