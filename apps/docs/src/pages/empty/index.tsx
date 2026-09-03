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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty";
import { Button } from "@gecko/ui/components/button";
import { InboxIcon } from "lucide-react";
import { Code } from "@gecko/ui/components/code";

export function EmptyPage() {
  const importSnippet = `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"`;

  const compositionSnippet = `Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent`;

  const basicExampleSnippet = `<Empty>
  <EmptyHeader>
    <EmptyTitle>No items yet</EmptyTitle>
    <EmptyDescription>
      Items added by your team will appear here.
    </EmptyDescription>
  </EmptyHeader>
</Empty>`;

  const withIconSnippet = `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon aria-hidden="true" />
    </EmptyMedia>
    <EmptyTitle>No messages</EmptyTitle>
    <EmptyDescription>
      New messages will appear here.
    </EmptyDescription>
  </EmptyHeader>
</Empty>`;

  const singleActionSnippet = `<Empty>
  <EmptyHeader>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>
      Create a project to get started and see it listed here.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create project</Button>
  </EmptyContent>
</Empty>`;

  const multiActionSnippet = `<Empty>
  <EmptyHeader>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>
      Create a new project or import one you already have.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline">Import project</Button>
      <Button>Create project</Button>
    </div>
  </EmptyContent>
</Empty>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Empty"
        description="The Empty component is a placeholder when there is nothing to show. It can hold a title, a short explanation, optional media, and a next step."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Empty on any page where content would be listed but none exists
            yet — for example Data table pages for events, forms, or broadcasts.
            Always explain what is missing. Add an icon when it improves
            recognition, and add an action when there is a clear next step.
            <br />
            <br />
            Avoid using it when there is already content, or for a warning that
            needs attention — that is an{" "}
            <DocsPageLink to="/components/alert">Alert</DocsPageLink>. If
            something is still loading, use a{" "}
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Empty and its parts to compose a placeholder."
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
          description={
            <>
              The header holds optional media, the title, and the description.
              <Code>EmptyContent</Code> holds optional actions.
            </>
          }
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
        description={
          <>
            A title and description using <Code>EmptyHeader</Code>,{" "}
            <Code>EmptyTitle</Code>, and <Code>EmptyDescription</Code>. Use this
            when the empty state only needs to be read.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No items yet</EmptyTitle>
                <EmptyDescription>
                  Items added by your team will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
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
        id="with-icon"
        title="With icon"
        description={
          <>
            Adds a framed icon using <Code>EmptyMedia</Code> with{" "}
            <Code>variant=&quot;icon&quot;</Code>. Use this when a symbol helps
            people recognise what is missing.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <InboxIcon aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>No messages</EmptyTitle>
                <EmptyDescription>
                  New messages will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
            <Code
              variant="block"
              language="tsx"
              code={withIconSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="actions"
        title="Actions"
        description={
          <>
            Adds a next step using <Code>EmptyContent</Code>. Use this when
            people can resolve the empty state from here.
          </>
        }
      >
        <ChildSection
          id="actions-single"
          title="Single action"
          description="One primary action in the content slot. Use this when there is a single next step."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No projects yet</EmptyTitle>
                  <EmptyDescription>
                    Create a project to get started and see it listed here.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button>Create project</Button>
                </EmptyContent>
              </Empty>
              <Code
                variant="block"
                language="tsx"
                code={singleActionSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="actions-multi"
          title="Primary and secondary actions"
          description="Two distinct actions in the content slot. Use this only when either route is a useful next step."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No projects yet</EmptyTitle>
                  <EmptyDescription>
                    Create a new project or import one you already have.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button variant="outline">Import project</Button>
                    <Button>Create project</Button>
                  </div>
                </EmptyContent>
              </Empty>
              <Code
                variant="block"
                language="tsx"
                code={multiActionSnippet}
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
        description="Explain what is empty and provide a clear next step when one exists."
      >
        <DocsDoDont
          doItems={[
            <>Always use a title and description to explain the empty state.</>,
            <>
              Use <Code>EmptyTitle</Code> to state what is missing.
            </>,
            <>
              Use <Code>EmptyDescription</Code> for concise supporting detail.
            </>,
            <>
              Put the primary next step in <Code>EmptyContent</Code>.
            </>,
          ]}
          dontItems={[
            <>Don’t use an icon as the only explanation of the empty state.</>,
            <>Don’t add actions when there is no available next step.</>,
            <>
              Don’t present loading as empty. Use a{" "}
              <DocsPageLink to="/components/spinner">Spinner</DocsPageLink>.
            </>,
            <>
              Don’t override the media frame, spacing, or text chrome with{" "}
              <Code>className</Code>.
            </>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Empty.">
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"default" | "icon"',
              defaultValue: '"default"',
              description: "Sets the EmptyMedia presentation.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/empty">
                Shadcn Empty documentation
              </DocsExternalLink>{" "}
              for the source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use another feedback component when content is pending or needs a status."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — empty list and table pages (events, forms, broadcasts) should show
            Empty.
          </li>
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> — when
            content is still loading.
          </li>
          <li>
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> — when the
            message has a status that needs attention.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
