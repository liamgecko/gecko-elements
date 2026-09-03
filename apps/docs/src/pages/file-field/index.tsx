import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@gecko/ui/components/field";
import { FileInput } from "@gecko/ui/components/file-input";
import { Code } from "@gecko/ui/components/code";
import { Button } from "@gecko/ui/components/button";

export function FileFieldPage() {
  const importSnippet = `import { FileInput } from "@gecko/ui/components/file-input"`;

  const basicExampleSnippet = `<Field>
  <FieldLabel htmlFor="supporting-document">Supporting document</FieldLabel>
  <FileInput
    id="supporting-document"
    name="supportingDocument"
    accept=".pdf"
    aria-describedby="supporting-document-description"
  />
  <FieldDescription id="supporting-document-description">
    PDF, up to 10 MB.
  </FieldDescription>
</Field>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="file-field-states-disabled">Supporting document</FieldLabel>
  <FileInput id="file-field-states-disabled" name="supportingDocument" disabled />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="file-field-states-error">Supporting document</FieldLabel>
  <FileInput
    id="file-field-states-error"
    name="supportingDocument"
    aria-invalid
    aria-describedby="file-field-states-error-message"
  />
  <FieldError id="file-field-states-error-message">
    Choose a PDF smaller than 10 MB.
  </FieldError>
</Field>`;

  const sizeSmallSnippet = `<Field>
  <FieldLabel htmlFor="file-field-size-sm">Small file field</FieldLabel>
  <FileInput id="file-field-size-sm" name="smallFile" size="sm" />
</Field>`;

  const sizeMediumSnippet = `<Field>
  <FieldLabel htmlFor="file-field-size-md">Medium file field</FieldLabel>
  <FileInput id="file-field-size-md" name="mediumFile" size="md" />
</Field>`;

  const sizeLargeSnippet = `<Field>
  <FieldLabel htmlFor="file-field-size-lg">Large file field</FieldLabel>
  <FileInput id="file-field-size-lg" name="largeFile" size="lg" />
</Field>`;

  const requiredSnippet = `<Field>
  <FieldLabel htmlFor="required-file">Supporting document</FieldLabel>
  <FileInput
    id="required-file"
    name="supportingDocument"
    accept=".pdf,.doc,.docx"
    required
    aria-describedby="required-file-description"
  />
  <FieldDescription id="required-file-description">
    PDF or DOCX, up to 10 MB.
  </FieldDescription>
</Field>`;

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="form-supporting-document">
      Supporting document
    </FieldLabel>
    <FileInput
      id="form-supporting-document"
      name="supportingDocument"
      accept=".pdf"
      aria-describedby="form-supporting-document-description"
    />
    <FieldDescription id="form-supporting-document-description">
      PDF, up to 10 MB.
    </FieldDescription>
  </Field>
  <Button type="submit">Submit document</Button>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="File field"
          description="The File field is a native file picker. People choose a file from their device; it belongs in a form like any other field."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use File field for basic native file selection inside a form. The
              product owns validation and what happens to the selected files.
              <br />
              <br />
              Use{" "}
              <DocsPageLink to="/components/attachment">
                Attachment
              </DocsPageLink>{" "}
              when upload progress, retry, completion, or removal belong in the
              interface. Use{" "}
              <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink>{" "}
              when dragging files into a larger surface is the main interaction.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import FileInput to add a file picker."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description="A labelled native file picker with its accepted format and size explained before selection."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="supporting-document">
                Supporting document
              </FieldLabel>
              <FileInput
                id="supporting-document"
                name="supportingDocument"
                accept=".pdf"
                aria-describedby="supporting-document-description"
              />
              <FieldDescription id="supporting-document-description">
                PDF, up to 10 MB.
              </FieldDescription>
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

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="The field can be unavailable or invalid. Use the state that matches whether the person can choose a file, and whether the value is valid."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks the field using the <Code>disabled</Code> prop. Use this
              when a file cannot be chosen yet.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="file-field-states-disabled">
                Supporting document
              </FieldLabel>
              <FileInput
                id="file-field-states-disabled"
                name="supportingDocument"
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
              Shows a validation error using <Code>aria-invalid</Code> on the
              control and <Code>data-invalid</Code> on the field. Use this when
              the chosen file is not valid.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="file-field-states-error">
                Supporting document
              </FieldLabel>
              <FileInput
                id="file-field-states-error"
                name="supportingDocument"
                aria-invalid
                aria-describedby="file-field-states-error-message"
              />
              <FieldError id="file-field-states-error-message">
                Choose a PDF smaller than 10 MB.
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
      </PageSection>

      <PageSection id="sizing" label="Sizing">
        <PageSectionHeader
          title="Sizing"
          description={
            <>
              Sets the field size using the <Code>size</Code> prop. Default is{" "}
              <Code>md</Code>. Use the size that matches the form around it.
            </>
          }
        />

        <PageSubsectionHeader
          id="sizing-small"
          title="Small"
          description={
            <>
              A compact field using <Code>size=&quot;sm&quot;</Code>. Use this
              when space is tight.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="file-field-size-sm">
                Small file field
              </FieldLabel>
              <FileInput id="file-field-size-sm" name="smallFile" size="sm" />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={sizeSmallSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="sizing-medium"
          title="Medium"
          description={
            <>
              The default size using <Code>size=&quot;md&quot;</Code>. Use this
              in a standard form.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="file-field-size-md">
                Medium file field
              </FieldLabel>
              <FileInput id="file-field-size-md" name="mediumFile" size="md" />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={sizeMediumSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="sizing-large"
          title="Large"
          description={
            <>
              A larger field using <Code>size=&quot;lg&quot;</Code>. Use this
              when the field is the focus of the layout.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="file-field-size-lg">
                Large file field
              </FieldLabel>
              <FileInput id="file-field-size-lg" name="largeFile" size="lg" />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={sizeLargeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="required" label="Required">
        <PageSectionHeader
          title="Required"
          description={
            <>
              Marks the control with the <Code>required</Code> attribute. Pair
              it with <Code>FieldLabel</Code> so the required marker is visible.
              Use this when a file must be chosen before continuing.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="required-file">
                Supporting document
              </FieldLabel>
              <FileInput
                id="required-file"
                name="supportingDocument"
                accept=".pdf,.doc,.docx"
                required
                aria-describedby="required-file-description"
              />
              <FieldDescription id="required-file-description">
                PDF or DOCX, up to 10 MB.
              </FieldDescription>
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

      <PageSection id="within-form" label="Within form">
        <PageSectionHeader
          title="Within form"
          description="Use File field as a named native form control and keep its requirements beside it."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="form-supporting-document">
                  Supporting document
                </FieldLabel>
                <FileInput
                  id="form-supporting-document"
                  name="supportingDocument"
                  accept=".pdf"
                  aria-describedby="form-supporting-document-description"
                />
                <FieldDescription id="form-supporting-document-description">
                  PDF, up to 10 MB.
                </FieldDescription>
              </Field>
              <Button type="submit">Submit document</Button>
            </form>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Treat the File field as a form control and explain its requirements."
        />
        <DocsDoDont
          doItems={[
            <>
              Give every control a visible <Code>FieldLabel</Code> connected by
              matching <Code>htmlFor</Code> and <Code>id</Code> values.
            </>,
            <>
              Explain accepted formats and size limits before selection, then
              connect that text with <Code>aria-describedby</Code>.
            </>,
            <>
              Set <Code>aria-invalid</Code> and connect a{" "}
              <Code>FieldError</Code> when the selected file is invalid.
            </>,
            <>
              Read selected files from <Code>event.currentTarget.files</Code> in
              the product’s <Code>onChange</Code> handler.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use a File field when drag and drop is the main interaction.
              Use a{" "}
              <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink>.
            </>,
            <>Don’t leave file type or size requirements unexplained.</>,
            <>
              Don’t treat <Code>accept</Code> as validation; verify file type
              and size again in product and server code.
            </>,
            <>Don’t use the disabled state to represent a validation error.</>,
            <>
              Don’t control a file input with <Code>value</Code> or{" "}
              <Code>defaultValue</Code>.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on File field."
        />
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Sets the height and text size to match nearby form controls.",
            },
            {
              name: "accept",
              type: "string",
              description:
                "Hints which file extensions or MIME types the native picker should offer.",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: "false",
              description: "Allows more than one file to be selected.",
            },
            {
              name: "capture",
              type: 'boolean | "user" | "environment"',
              description:
                "Requests a camera or microphone capture source on supporting devices.",
            },
            {
              name: "onChange",
              type: "React.ChangeEventHandler<HTMLInputElement>",
              description:
                "Reports native selection changes; read the FileList from event.currentTarget.files.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents choosing a file and shows the unavailable state.",
            },
            {
              name: "aria-invalid",
              type: "boolean",
              defaultValue: "false",
              description:
                "Marks the selected file as invalid for styling and assistive technology.",
            },
            {
              name: "required",
              type: "boolean",
              defaultValue: "false",
              description:
                "Requires a file before the containing form can be submitted.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Choose a related component for richer upload or form behavior."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink> —
            for drag-and-drop uploads and visible selected files.
          </li>
          <li>
            <DocsPageLink to="/components/attachment">Attachment</DocsPageLink>{" "}
            — to display a file after it has been added.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — to add a
            label, help text, and validation.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
