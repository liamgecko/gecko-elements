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
import { Separator } from "@gecko/ui/components/separator";
import { Code } from "@gecko/ui/components/code";

export function SeparatorPage() {
  const importSnippet = `import { Separator } from "@gecko/ui/components/separator"`;

  const orientationSnippet = `<Separator orientation="horizontal|vertical" />`;

  const listSnippet = `<div className="flex w-full max-w-sm flex-col gap-2 text-sm">
  <dl className="flex items-center justify-between">
    <dt>Item 1</dt>
    <dd className="text-muted-foreground">Value 1</dd>
  </dl>
  <Separator />
  <dl className="flex items-center justify-between">
    <dt>Item 2</dt>
    <dd className="text-muted-foreground">Value 2</dd>
  </dl>
  <Separator />
  <dl className="flex items-center justify-between">
    <dt>Item 3</dt>
    <dd className="text-muted-foreground">Value 3</dd>
  </dl>
</div>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Separator"
        description="Separator is a thin structural boundary between related groups of content. It clarifies dense layouts without carrying status or adding visual weight."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Separator between distinct groups of functionality or data —
            between rows in a list, or between items in a horizontal row. It
            exposes that structural boundary to assistive technology by default.
            <br />
            <br />
            Avoid using it for semantic status, labelled dividers, or
            conversation thread markers. For a labelled divider in a message
            flow, use a{" "}
            <DocsPageLink to="/components/marker">Marker</DocsPageLink> with the
            separator variant instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Separator to add a dividing line between content."
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
        id="orientation"
        title="Orientation"
        description="Use a horizontal boundary between stacked content or a vertical boundary between inline content."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">Horizontal</p>
              <Separator />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Vertical</p>
              <div className="flex h-5 items-center gap-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
              </div>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={orientationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="list"
        title="List"
        description="A horizontal divider between stacked rows. Use this to separate items in a list or definition group without adding extra spacing."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
              <dl className="flex items-center justify-between">
                <dt>Item 1</dt>
                <dd className="text-muted-foreground">Value 1</dd>
              </dl>
              <Separator />
              <dl className="flex items-center justify-between">
                <dt>Item 2</dt>
                <dd className="text-muted-foreground">Value 2</dd>
              </dl>
              <Separator />
              <dl className="flex items-center justify-between">
                <dt>Item 3</dt>
                <dd className="text-muted-foreground">Value 3</dd>
              </dl>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={listSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use a light divider to clarify groups without adding more content."
      >
        <DocsDoDont
          doItems={[
            <>Use Separator between distinct groups of related content.</>,
            <>
              Set <Code>orientation=&quot;vertical&quot;</Code> between items in
              a horizontal row.
            </>,
            <>
              Place separators between related groups, not around every element.
            </>,
            <>Use spacing with the divider so each group remains readable.</>,
            <>
              Set <Code>aria-hidden=&quot;true&quot;</Code> when a line is
              purely decorative and the surrounding structure already
              communicates the grouping.
            </>,
          ]}
          dontItems={[
            <>Don’t use Separator to convey status or a change in state.</>,
            <>
              Don’t use a vertical Separator in a parent without a measurable
              height.
            </>,
            <>Don’t use it as a labelled divider.</>,
            <>
              Don’t add several separators where one group boundary is enough.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Separator."
      >
        <DocsApiTable
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description: "Sets the direction of the dividing line.",
            },
          ]}
        />
        <ChildSection
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/separator">
                Shadcn Separator documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/separator">
                Base UI Separator API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a component-specific divider when it carries extra structure."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — includes
            FieldSeparator for dividing form content.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
