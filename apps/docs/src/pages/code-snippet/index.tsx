import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Code } from "@gecko/ui/components/code";

export function CodeSnippetPage() {
  const blockExample = `import { Field, FieldDescription, FieldLabel } from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}`;

  const importSnippet = `import { Code } from "@gecko/ui/components/code"`;

  const inlineSnippet = `<Code>Inline code snippet</Code>`;

  const blockSnippet = `<Code variant="block" language="tsx" code={code} />`;

  const supportedLanguages = `text
tsx
ts
jsx
js
json
bash
css
html
markdown`;

  const blockWithCopySnippet = `<Code
  variant="block"
  language="tsx"
  code={code}
  showCopyButton
  copyLabel="Copy code"
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Code snippet"
        description="The Code snippet shows source in the page — a short token in a sentence, or a block people can read and copy. It is for documentation and examples, not for editing code."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Code snippet for read-only technical content. Inline is for a
            short token in a sentence. Block is for source, configuration,
            commands, plain-text output, or customer-facing snippets such as
            website embed code.
            <br />
            <br />
            Avoid using it as a text field. If people need to edit the value,
            use an{" "}
            <DocsPageLink to="/components/input">Input field</DocsPageLink> or a{" "}
            <DocsPageLink to="/components/textarea">
              Textarea field
            </DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Code to show a token in prose or a block of source."
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
        id="inline"
        title="Inline"
        description="The default Code, with no variant. Use this to highlight a short token inside a sentence."
      >
        <ComponentExample>
          <div className="space-y-6">
            <p className="text-sm text-foreground">
              <Code>Inline code snippet</Code>
            </p>
            <Code
              variant="block"
              language="tsx"
              code={inlineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="block"
        title="Block"
        description={
          <>
            A multiline example using <Code>variant=&quot;block&quot;</Code>{" "}
            with <Code>code</Code> and the required <Code>language</Code>. Use
            this when the example needs its own space, not a word in a sentence.
          </>
        }
      >
        <ChildSection
          id="block-basic"
          title="Basic"
          description={
            <>
              A highlighted block using <Code>variant=&quot;block&quot;</Code>.
              Use this for a read-only example.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Code variant="block" language="tsx" code={blockExample} />
              <Code
                variant="block"
                language="tsx"
                code={blockSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="block-languages"
          title="Supported languages"
          description={
            <>
              Set <Code>language</Code> to one of the approved values below. Use{" "}
              <Code>text</Code> for content that does not need syntax
              highlighting.
            </>
          }
        >
          <Code
            variant="block"
            language="text"
            code={supportedLanguages}
            className="mb-6"
          />
        </ChildSection>
        <ChildSection
          id="block-with-copy"
          title="With copy button"
          description={
            <>
              Adds a copy control using <Code>showCopyButton</Code> and{" "}
              <Code>copyLabel</Code>. Use this when people should be able to
              copy the example in one click.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Code
                variant="block"
                language="tsx"
                code={blockExample}
                showCopyButton
                copyLabel="Copy code"
              />
              <Code
                variant="block"
                language="tsx"
                code={blockWithCopySnippet}
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
        description="Choose inline or block Code to match the amount of source."
      >
        <DocsDoDont
          doItems={[
            <>Use inline Code for a short token within a sentence.</>,
            <>
              Use <Code>variant=&quot;block&quot;</Code> for multiline source.
            </>,
            <>
              Set <Code>language</Code> to match the block content.
            </>,
            <>
              Use <Code>text</Code> for plain-text output.
            </>,
            <>
              Add <Code>showCopyButton</Code> when the example is useful to
              copy.
            </>,
          ]}
          dontItems={[
            <>Don’t use inline Code for a multiline example.</>,
            <>Don’t use a block for a single prop name in prose.</>,
            <>
              Don’t set an unrelated <Code>language</Code> for syntax
              highlighting.
            </>,
            <>
              Don’t add an unsupported language without changing the library.
            </>,
            <>Don’t add a copy button when the source is only for reading.</>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Code.">
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"inline" | "block"',
              defaultValue: '"inline"',
              description:
                "Displays a token in prose or a standalone source block.",
            },
            {
              name: "code",
              type: "string",
              description: "Source rendered by the block variant.",
            },
            {
              name: "language",
              type: '"text" | "tsx" | "ts" | "jsx" | "js" | "json" | "bash" | "css" | "html" | "markdown"',
              description: "Required syntax-highlighting language for a block.",
            },
            {
              name: "showCopyButton",
              type: "boolean",
              defaultValue: "false",
              description: "Shows a control that copies the block source.",
            },
            {
              name: "copyLabel",
              type: "string",
              defaultValue: '"Copy"',
              description:
                "Accessible label and tooltip text for the copy control.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://shiki.style/guide/">
                Shiki documentation
              </DocsExternalLink>{" "}
              for the underlying syntax-highlighting API.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use an editable field when people need to change the value."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            editable single-line values.
          </li>
          <li>
            <DocsPageLink to="/components/textarea">
              Textarea field
            </DocsPageLink>{" "}
            — editable multiline plain text.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
