import { ImageUp } from "lucide-react";

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
import { Attachment } from "@gecko/ui/components/attachment";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldTitle,
} from "@gecko/ui/components/field";
import { Controller } from "react-hook-form";
import { z } from "zod";

const attachmentFormSchema = z.object({
  attachmentId: z.string().min(1, "Upload a supporting document."),
});

function simulateUpload(_file: File, onProgress: (percent: number) => void) {
  return new Promise<void>((resolve) => {
    let percent = 0;
    const id = setInterval(() => {
      percent += 12;
      onProgress(Math.min(percent, 100));
      if (percent >= 100) {
        clearInterval(id);
        resolve();
      }
    }, 220);
  });
}

function simulateFailingUpload(
  _file: File,
  onProgress: (percent: number) => void,
) {
  return new Promise<void>((_resolve, reject) => {
    let percent = 0;
    const id = setInterval(() => {
      percent += 20;
      onProgress(Math.min(percent, 80));
      if (percent >= 60) {
        clearInterval(id);
        reject(new Error("Upload failed"));
      }
    }, 220);
  });
}

export function AttachmentPage() {
  const importSnippet = `import { Attachment } from "@gecko/ui/components/attachment"`;

  const basicExampleSnippet = `<Attachment
  accept="image/*"
  description="SVG, PNG, JPG or GIF (max. 800 × 400 px)"
  onUpload={async (file, onProgress) => {
    await uploadFile(file, onProgress)
  }}
/>`;

  const errorHandlingSnippet = `<Attachment
  accept="image/*"
  description="SVG, PNG, JPG or GIF (max. 800 × 400 px)"
  onUpload={async (file, onProgress) => {
    validateFile(file)
    await uploadFile(file, onProgress)
  }}
/>`;

  const stateEmptySnippet = `<Attachment
  state="empty"
  description="SVG, PNG, JPG or GIF (max. 800 × 400 px)"
  onFileChange={selectFile}
/>`;

  const stateUploadingSnippet = `<Attachment
  state="uploading"
  name="design-system.zip"
  progress={64}
  onRemove={removeFile}
/>`;

  const stateErrorSnippet = `<Attachment
  state="error"
  name="financial-model.xlsx"
  onRetry={retryUpload}
  onRemove={removeFile}
/>`;

  const stateDoneSnippet = `<Attachment
  state="done"
  name="uploaded-report.pdf"
  description="Uploaded · 1.8 MB"
  onRemove={removeFile}
/>`;

  const customIconSnippet = `<Attachment
  accept="image/*"
  icon={<ImageUp />}
  label="Upload brand assets"
  description="PNG, JPG or SVG"
  onUpload={uploadBrandAsset}
/>`;

  const withinFormSnippet = `const formSchema = z.object({
  attachmentId: z.string().min(1, "Upload a supporting document."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { attachmentId: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller name="attachmentId" control={form.control} render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldTitle>Supporting document</FieldTitle>
      <Attachment
        required
        accept=".pdf"
        onUpload={async (file, onProgress) => {
          const attachment = await uploadFile(file, onProgress)
          field.onChange(attachment.id)
        }}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )} />
  <Button type="submit">Save application</Button>
</form>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Attachment"
        description="Attachment is an extended single-file upload field. It lets someone choose or drop a file, then shows upload progress, failure, retry, completion, and removal in the same row."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Attachment for a single file upload inside a form or fieldset.
            It owns the picker, drag-and-drop target, status icons, progress
            copy, retry action, and remove action.
            <br />
            <br />
            Use a{" "}
            <DocsPageLink to="/components/drop-zone">
              Drop zone
            </DocsPageLink>{" "}
            when uploading is the main purpose of a large dedicated area. Use a{" "}
            <DocsPageLink to="/components/file-field">File field</DocsPageLink>{" "}
            only when a basic file picker is sufficient and upload status is not
            needed.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Attachment as one complete upload field."
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
      </MainSection>

      <MainSection
        id="basic-example"
        title="Managed upload"
        description={
          <>
            This is the canonical configuration. Provide <Code>onUpload</Code>;
            Attachment manages the empty, uploading, error, and done states.
            Call <Code>onProgress</Code> while the upload runs and throw when it
            fails.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                accept="image/*"
                description="SVG, PNG, JPG or GIF (max. 800 × 400 px)"
                onUpload={simulateUpload}
              />
            </div>
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
        id="error-handling"
        title="Validation and errors"
        description={
          <>
            Validate the file inside <Code>onUpload</Code>. The{" "}
            <Code>accept</Code> prop helps filter the system picker but is not
            validation. Throw from <Code>onUpload</Code> to show the error state
            and built-in retry action.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                accept="image/*"
                description="This example fails so you can try the retry action"
                onUpload={simulateFailingUpload}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={errorHandlingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="Controlled states"
        description="Use controlled mode only when an external upload process owns the lifecycle. Attachment accepts the closed state set empty, uploading, error, and done."
      >
        <ChildSection
          id="states-empty"
          title="Empty"
          description={
            <>
              In controlled empty state, <Code>onFileChange</Code> is required.
              Use the selected file to start the external upload and update the
              state.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Attachment
                  state="empty"
                  description="SVG, PNG, JPG or GIF (max. 800 × 400 px)"
                  onFileChange={() => {}}
                />
              </div>
              <Code
                variant="block"
                language="tsx"
                code={stateEmptySnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-uploading"
          title="Uploading"
          description="Pass the file name and progress while the external upload is running."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Attachment
                  state="uploading"
                  name="design-system.zip"
                  progress={64}
                  onRemove={() => {}}
                />
              </div>
              <Code
                variant="block"
                language="tsx"
                code={stateUploadingSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-error"
          title="Error"
          description="Provide retry and remove handlers when the external upload fails."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Attachment
                  state="error"
                  name="financial-model.xlsx"
                  onRetry={() => {}}
                  onRemove={() => {}}
                />
              </div>
              <Code
                variant="block"
                language="tsx"
                code={stateErrorSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-done"
          title="Done"
          description="Show the completed file and provide removal when the form still allows it."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Attachment
                  state="done"
                  name="uploaded-report.pdf"
                  description="Uploaded · 1.8 MB"
                  onRemove={() => {}}
                />
              </div>
              <Code
                variant="block"
                language="tsx"
                code={stateDoneSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="customisation"
        title="Custom icon"
        description={
          <>
            Attachment owns the standard upload, spinner, warning, check, retry,
            and remove icons. Pass <Code>icon</Code> when an approved
            context-specific icon should replace the state icon.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                accept="image/*"
                icon={<ImageUp />}
                label="Upload brand assets"
                description="PNG, JPG or SVG"
                onUpload={simulateUpload}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={customIconSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="within-form"
        title="Within form"
        description="Upload the file first, then submit its stored reference with the rest of the form state."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              className="max-w-md space-y-6"
              schema={attachmentFormSchema}
              defaultValues={{ attachmentId: "" }}
            >
              {(form) => (
                <>
                  <Controller
                    name="attachmentId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        aria-labelledby="supporting-document-label"
                      >
                        <FieldTitle id="supporting-document-label">
                          Supporting document
                        </FieldTitle>
                        <Attachment
                          label="Choose a file or drag and drop"
                          description="PDF, up to 10 MB"
                          accept=".pdf"
                          required
                          onUpload={async (file, onProgress) => {
                            await simulateUpload(file, onProgress);
                            field.onChange(file.name);
                          }}
                        />
                        <FieldDescription>
                          Upload the document required for this application.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit">Save application</Button>
                </>
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
        description="Use Attachment as one extended single-file upload field."
      >
        <DocsDoDont
          doItems={[
            <>
              Prefer managed mode with a required <Code>onUpload</Code> handler.
            </>,
            <>Validate file type, size, and dimensions before uploading.</>,
            <>
              Call <Code>onProgress</Code> with values from 0 to 100.
            </>,
            <>
              Use controlled mode when an external process genuinely owns the
              upload lifecycle.
            </>,
            <>
              Keep the filename in <Code>name</Code> and status information in{" "}
              <Code>description</Code>.
            </>,
          ]}
          dontItems={[
            <>Don’t use Attachment for more than one file.</>,
            <>
              Don’t treat <Code>accept</Code> as file validation.
            </>,
            <>
              Don’t add states, sizes, orientations, groups, previews, or
              actions without consent.
            </>,
            <>
              Don’t override the row, state colours, spacing, icons, or actions
              with <Code>className</Code>.
            </>,
            <>
              Don’t use Attachment as a read-only file list or a large upload
              surface.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Attachment."
      >
        <DocsApiTable
          rows={[
            {
              name: "onUpload",
              type: "(file: File, onProgress: (percent: number) => void) => void | Promise<void>",
              description:
                "Required in managed mode. Performs the upload; throw to enter the error state.",
            },
            {
              name: "state",
              type: '"empty" | "uploading" | "error" | "done"',
              description:
                "Enables controlled mode. Omit it to use managed mode.",
            },
            {
              name: "name",
              type: "React.ReactNode",
              description:
                "Required in controlled uploading, error, and done states.",
            },
            {
              name: "progress",
              type: "number",
              description:
                "Controlled upload percentage. Attachment constrains the displayed value to 0–100.",
            },
            {
              name: "onFileChange",
              type: "(file: File | null) => void",
              description:
                "Required for controlled empty state; optional notification in managed mode.",
            },
            {
              name: "accept",
              type: "string",
              description:
                "File-picker hint such as image/*. It does not validate the file.",
            },
            {
              name: "label",
              type: "React.ReactNode",
              defaultValue: '"Choose a file or drag and drop"',
              description: "Visible instruction in the empty state.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description:
                "Empty-state requirements or a controlled status override.",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description:
                "Replaces the library-owned state icon with an approved custom icon.",
            },
            {
              name: "onRemove",
              type: "() => void",
              description:
                "Notifies removal. In controlled mode, its presence renders the remove action.",
            },
            {
              name: "onRetry",
              type: "() => void",
              description: "Retries an externally controlled failed upload.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables selection, retry, and removal.",
            },
            {
              name: "required",
              type: "boolean",
              defaultValue: "false",
              description:
                "Requires a file while empty and shows the required marker.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/attachment">
                Shadcn Attachment documentation
              </DocsExternalLink>{" "}
              for the broader source composition from which Gecko deliberately
              differs.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different file control when the extended upload field is the wrong shape."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/file-field">File field</DocsPageLink>{" "}
            — a basic file picker without upload lifecycle.
          </li>
          <li>
            <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink> —
            a large dedicated upload surface.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
