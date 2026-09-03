import { useState } from "react";

import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Code } from "@gecko/ui/components/code";
import { DropZone } from "@gecko/ui/components/drop-zone";

export function DropZonePage() {
  const [files, setFiles] = useState<File[]>([]);

  const importSnippet = `import { DropZone } from "@gecko/ui/components/drop-zone"`;

  const basicSnippet = `<DropZone
  value={files}
  onValueChange={setFiles}
/>`;

  const customLabelSnippet = `<DropZone
  multiple
  label="Upload brand assets"
  description="Drop logos and images here, or click to browse"
/>`;

  const disabledSnippet = `<DropZone disabled />`;

  const errorSnippet = `<DropZone error="PDF files must be 10 MB or smaller." />`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Drop zone"
        description="Drop zone is a large surface for selecting one or more files by dropping them or browsing. Selected files appear below the surface and can be removed."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Drop zone when selecting files is the only purpose of a large
            surface — for example, a hero image inside a dialog. The drop area
            and the file list stay together so it is clear what has been chosen.
            <br />
            <br />
            Avoid using it inside a fieldset where each file needs its own
            upload row, progress, and error state — use{" "}
            <DocsPageLink to="/components/attachment">
              Attachment
            </DocsPageLink>{" "}
            instead. Avoid using it to reorder items; that is{" "}
            <DocsPageLink to="/components/sortable-list">
              Sortable list
            </DocsPageLink>
            .
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import DropZone to add a file drop area."
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
        title="Basic example"
        description={
          <>
            A controlled list using <Code>value</Code> and{" "}
            <Code>onValueChange</Code>. Drop zone selects one file by default.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropZone value={files} onValueChange={setFiles} />
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="custom-label-description"
        title="Custom label and description"
        description={
          <>
            Overrides the default copy using <Code>label</Code> and{" "}
            <Code>description</Code>. Use this when the drop area needs its own
            prompt.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropZone
              multiple
              label="Upload brand assets"
              description="Drop logos and images here, or click to browse"
            />
            <Code
              variant="block"
              language="tsx"
              code={customLabelSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="The drop area can be unavailable or invalid. Use the state that matches whether files can be added, and whether the current choice is valid."
      >
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks dropping and browsing using the <Code>disabled</Code> prop.
              Use this when files cannot be added yet.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <DropZone disabled />
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
          description={
            <>
              Shows the product validation message using <Code>error</Code>,
              which also marks the native input as invalid. Use this when the
              selected files cannot be accepted.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <DropZone error="PDF files must be 10 MB or smaller." />
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
        id="do-dont"
        title="Do and don’t"
        description="Keep file selection, guidance, and validation together."
      >
        <DocsDoDont
          doItems={[
            <>
              Control selected files with <Code>value</Code> and{" "}
              <Code>onValueChange</Code>.
            </>,
            <>
              Set <Code>multiple</Code> only when more than one file can be
              added.
            </>,
            <>
              Write a concise <Code>label</Code> and <Code>description</Code>.
            </>,
            <>
              Use the invalid state when the selected files cannot be accepted.
            </>,
            <>
              Validate type, size, dimensions, and security requirements in the
              product.
            </>,
          ]}
          dontItems={[
            <>Don’t use a Drop zone to reorder existing items.</>,
            <>Don’t ask for multiple files when only one can be handled.</>,
            <>
              Don’t repeat the same instruction in the label and description.
            </>,
            <>
              Don’t use <Code>disabled</Code> while files can still be added or
              removed.
            </>,
            <>
              Don’t treat <Code>accept</Code> as validation; it is only a file
              picker hint.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Drop zone."
      >
        <DocsApiTable
          rows={[
            {
              name: "value",
              type: "File[]",
              description: "Selected files in a controlled Drop zone.",
            },
            {
              name: "defaultValue",
              type: "File[]",
              description: "Initial files in an uncontrolled Drop zone.",
            },
            {
              name: "onValueChange",
              type: "(files: File[]) => void",
              description: "Called when files are added or removed.",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: "false",
              description: "Allows more than one file to be selected.",
            },
            {
              name: "accept",
              type: "string",
              description:
                "Hints which file types the native picker should show. It does not validate files.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents dropping, browsing, and removing files.",
            },
            {
              name: "label",
              type: "string",
              defaultValue: '"Drag & drop a file here"',
              description: "Primary instruction in the drop area.",
            },
            {
              name: "description",
              type: "string",
              defaultValue: '"Or click to browse"',
              description: "Supporting instruction below the label.",
            },
            {
              name: "browseLabel",
              type: "string",
              defaultValue: '"Browse file"',
              description:
                "Visible label for the browse affordance. Pluralised automatically with multiple.",
            },
            {
              name: "error",
              type: "string",
              description:
                "Product validation message shown in the invalid state.",
            },
            {
              name: "name",
              type: "string",
              description: "Name forwarded to the native file input.",
            },
            {
              name: "aria-invalid",
              type: 'boolean | "true" | "false"',
              defaultValue: "false",
              description: "Shows the invalid styling and built-in error copy.",
            },
          ]}
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use these components for other file-selection layouts."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/file-field">File field</DocsPageLink>{" "}
            — for choosing files through a standard form field.
          </li>
          <li>
            <DocsPageLink to="/components/attachment">Attachment</DocsPageLink>{" "}
            — for a compact file row.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
