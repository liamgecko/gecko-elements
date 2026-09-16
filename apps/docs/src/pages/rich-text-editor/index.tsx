import { useState } from "react";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { Code } from "@/components/layout/docs-code";
import { Button } from "@geckolabs/elements/components/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@geckolabs/elements/components/field";
import { RichTextEditor } from "@geckolabs/elements/components/rich-text-editor";

const assetBaseUrl = `${import.meta.env.BASE_URL}elements/tinymce-4`;
const initialContent = `<h2>Getting started</h2><p>Use this space to share <strong>helpful information</strong> and keep important details together.</p><ul><li>Organise content with headings and lists.</li><li>Add links, images and tables where they help.</li></ul><p><a href="https://example.com/resources">Explore the resources</a></p>`;
const basicCode = `import { RichTextEditor } from "@geckolabs/elements/components/rich-text-editor";

<Field>
  <FieldLabel htmlFor="content">Content</FieldLabel>
  <RichTextEditor
    id="content"
    label="Content"
    assetBaseUrl="/elements/tinymce-4"
    value={content}
    onValueChange={setContent}
    required
    aria-describedby="content-help"
  />
  <FieldDescription id="content-help">
    Add the details you want to share.
  </FieldDescription>
</Field>`;
export function RichTextEditorPage() {
  const [content, setContent] = useState(initialContent);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Rich text editor"
        description="Create and edit formatted content with headings, lists, links, images, tables and source editing."
      />
      <MainSection
        id="usage"
        title="Usage"
        description="Use Rich text editor when content needs formatting, such as descriptions, instructions, messages or documents. Use Textarea for plain text and Reply box for conversation composition. The app owns validation, saving and any content-specific actions."
      >
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={
              'import { RichTextEditor } from "@geckolabs/elements/components/rich-text-editor";'
            }
            showCopyButton
          />
        </ComponentExample>
      </MainSection>
      <MainSection
        id="installation"
        title="Installation"
        description="Serve the complete pinned runtime directory from your own application. Copy the assets at build time and retain the licence and provenance files. No Tiny Cloud key or external runtime request is used."
      >
        <ComponentExample>
          <Code
            variant="block"
            language="bash"
            code={
              "mkdir -p public/elements/tinymce-4\ncp -R node_modules/@geckolabs/elements/dist/vendor/tinymce-4/. public/elements/tinymce-4/"
            }
            showCopyButton
          />
        </ComponentExample>
        <p className="mt-4 text-sm text-muted-foreground">
          The default assetBaseUrl is /elements/tinymce-4. Include your
          deployment base path when hosted under a subdirectory. This docs site
          copies these assets automatically before development and production
          builds. Supply a matching self-hosted TinyMCE 4 language pack to
          translate the editor’s toolbar and dialogs.
        </p>
      </MainSection>
      <MainSection
        id="basic-example"
        title="Basic example"
        description="Formatted content with a visible label. Try formatting, inserting a link or table, and opening the source code dialog. The editor reserves its height while loading."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="rich-content">Content</FieldLabel>
              <RichTextEditor
                id="rich-content"
                label="Content"
                assetBaseUrl={assetBaseUrl}
                value={content}
                onValueChange={setContent}
                required
                aria-describedby="rich-content-help"
              />
              <FieldDescription id="rich-content-help">
                Add the details you want to share. Use Alt+F10 to focus the
                formatting toolbar.
              </FieldDescription>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={basicCode}
              showCopyButton
            />
          </div>
        </ComponentExample>
      </MainSection>
      <MainSection
        id="states"
        title="States"
        description="Read-only content remains focusable and copyable. Required and invalid are semantic states; the app validates meaningful HTML content and supplies the error. Editors remain editable while saving."
      >
        <ComponentExample>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setReadOnly(!readOnly)}>
                {readOnly ? "Allow editing" : "Make read-only"}
              </Button>
              <Button variant="outline" onClick={() => setInvalid(!invalid)}>
                {invalid ? "Clear error" : "Show error"}
              </Button>
            </div>
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor="rich-state-body">Message</FieldLabel>
              <RichTextEditor
                id="rich-state-body"
                label="Message"
                assetBaseUrl={assetBaseUrl}
                defaultValue="<p>This is an independent editor. Editing here does not change the content above.</p>"
                readOnly={readOnly}
                required
                aria-invalid={invalid}
                aria-describedby="rich-state-description"
              />
              {invalid ? (
                <FieldError id="rich-state-description">
                  Enter some content before continuing.
                </FieldError>
              ) : (
                <FieldDescription id="rich-state-description">
                  Select and copy content even when editing is unavailable.
                </FieldDescription>
              )}
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={
                '<RichTextEditor label="Message" readOnly={readOnly}\n  required aria-invalid={invalid} aria-describedby="message-error" />'
              }
              showCopyButton
            />
            <p className="text-sm text-muted-foreground">
              Asset failures show a retry action in the reserved editor area and
              call onLoadError. Translate loading, loadError and retry through
              messages. A language pack or plugin that never finishes loading
              times out after 20 seconds.
            </p>
          </div>
        </ComponentExample>
      </MainSection>
      <MainSection
        id="compatibility"
        title="HTML compatibility"
        description="This component uses the existing app’s TinyMCE 4.7.1 runtime. It supports HTML fragments and full documents, retaining the existing formatting, URL and style handling."
      >
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            getContent returns full-document HTML, even when the initial value
            is a fragment. The app decides how to store and render this content.
          </li>
          <li>
            Images use the existing URL dialog. Pasted data images remain
            disabled; no upload service or attachment picker is introduced.
          </li>
          <li>
            Each instance runs in its own same-origin iframe. TinyMCE 4 and 7
            can coexist without replacing one another. This isolates runtime and
            styling; it is not an HTML security sandbox.
          </li>
          <li>
            The Gecko skin uses our Satoshi typography, compact controls,
            rounded menus and themed dialogs. Editor chrome follows the
            surrounding light/dark theme. The content canvas preserves authored
            HTML and styles without changing the saved content to match the
            editor theme.
          </li>
          <li>
            The toolbar uses Gecko icons and borderless controls. Keyboard
            behaviour and dialog layout remain managed by TinyMCE 4. The Gecko
            skin is included automatically; no app-level CSS overrides are
            needed.
          </li>
          <li>
            Test representative content through editing, saving and reopening.
            HTML may be normalised during editing; verify the result in the
            place where your app displays it.
          </li>
        </ul>
      </MainSection>
      <MainSection
        id="accessibility"
        title="Accessibility and language"
        description="Always supply label and a matching visible FieldLabel. Clicking the label focuses the editing surface. Required, invalid, read-only and descriptive text are mirrored into the editing frame because ARIA references cannot cross document boundaries."
      >
        <p className="text-sm text-muted-foreground">
          Tab enters the editing area, Alt+F10 enters the legacy toolbar, arrow
          keys navigate its controls and Escape closes dialogs. Native editing,
          selection and copying remain available. Validate in the app and call
          ref.focus() for errors; required does not enable native browser
          validation on hidden HTML. Supply language and languageUrl together
          for a matching TinyMCE 4 translation pack. Loading and error copy is
          separately translated through messages. The old engine’s accessibility
          is retained, not certified to modern WCAG standards.
        </p>
      </MainSection>
      <MainSection
        id="api"
        title="API"
        description="Use this public interface; do not access TinyMCE globals or pass arbitrary editor configuration."
      >
        <DocsApiTable
          rows={[
            {
              name: "label",
              type: "string",
              description: "Required accessible name; match the visible label.",
            },
            {
              name: "id / name",
              type: "string",
              description:
                "Label association and optional hidden HTML form field.",
            },
            {
              name: "value / defaultValue",
              type: "string",
              description:
                "Controlled HTML or initial uncontrolled HTML. External replacements reset undo and dirty state; use a key when changing records.",
            },
            {
              name: "onValueChange",
              type: "(html: string) => void",
              description:
                "Full HTML after edits, including insertion and undo/redo. Store synchronously; debounce persistence instead.",
            },
            {
              name: "onDirtyChange",
              type: "(dirty: boolean) => void",
              description:
                "Unsaved state changes. Call ref.resetDirty after a successful save.",
            },
            {
              name: "assetBaseUrl",
              type: "string",
              defaultValue: "/elements/tinymce-4",
              description:
                "Self-hosted directory containing the pinned runtime and supporting files.",
            },
            {
              name: "height",
              type: "number",
              defaultValue: "480",
              description:
                "Viewport height in pixels, clamped to at least 360. Legacy dialogs remain inside it.",
            },
            {
              name: "readOnly / required / aria-invalid",
              type: "boolean",
              defaultValue: "false",
              description:
                "Editability, required semantics and validation state. No disabled-on-save behaviour.",
            },
            {
              name: "aria-describedby",
              type: "string",
              description:
                "Space-separated IDs of help/error text; mirrored into the frame.",
            },
            {
              name: "onReady / onLoadError",
              type: "() => void / (error: Error) => void",
              description:
                "Readiness and asset/init failures, including retries.",
            },
            {
              name: "language / languageUrl",
              type: "string",
              defaultValue: "en / —",
              description:
                "TinyMCE 4 locale code and URL of its self-hosted pack.",
            },
            {
              name: "messages",
              type: "{ loading?, loadError?, retry? }",
              description:
                "Translated strings for the component-owned loading/error UI.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Whole-component layout only; do not target the internal TinyMCE UI.",
            },
            {
              name: "ref",
              type: "RichTextEditorHandle",
              description:
                "focus(), getContent(), insertContent(html): boolean, resetDirty(). Insertion returns false until ready or when read-only.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://github.com/tinymce/tinymce-docs-4x">
                TinyMCE v4 documentation archive
              </DocsExternalLink>{" "}
              for the underlying editor’s configuration and plugin guidance. The
              original v4 documentation website now redirects to the latest
              version. Use the Gecko API above when consuming this component.
            </>
          }
        />
      </MainSection>
      <MainSection id="related" title="Related">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/textarea">Textarea</DocsPageLink> —
            for plain text.
          </li>
          <li>
            <DocsPageLink to="/components/reply-box">Reply box</DocsPageLink> —
            for conversation actions.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for
            labels, descriptions, and errors.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
