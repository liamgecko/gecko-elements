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
import { Button } from "@gecko/ui/components/button";
import { Badge } from "@gecko/ui/components/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@gecko/ui/components/input-group";
import { Spinner } from "@gecko/ui/components/spinner";

export function SpinnerPage() {
  const importSnippet = `import { Spinner } from "@gecko/ui/components/spinner"`;

  const basicExampleSnippet = `<Spinner />`;

  const sizingSnippet = `<Spinner size="xs|sm|md|lg|xl" />`;

  const buttonSnippet = `<Button loading>Saving</Button>
<Button variant="outline" loading>Loading</Button>`;

  const badgeSnippet = `<Badge size="sm" variant="info">
  <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
  Syncing
</Badge>
<Badge size="sm" variant="success">
  <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
  Updating
</Badge>
<Badge size="sm" variant="warning">
  <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
  Processing
</Badge>`;

  const inputSnippet = `<InputGroup>
  <InputGroupInput
    aria-label="Message"
    aria-busy="true"
    placeholder="Send a message..."
  />
  <InputGroupAddon align="inline-end">
    <Spinner size="sm" aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Spinner"
        description="The Spinner component is an animated loading indicator. It shows that something is in progress when content is not ready yet."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Spinner for indeterminate waits such as page or panel load. It
            works on its own or inside buttons, badges, and inputs to show
            activity in context.
            <br />
            <br />
            Avoid using Spinner for data or reporting completion — that is{" "}
            <DocsPageLink to="/components/progress">Progress</DocsPageLink>.
            Once loading finishes and there is still no content, use{" "}
            <DocsPageLink to="/components/empty">Empty</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Spinner to show a loading indicator."
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
        description="A standalone spinner. Use this when the whole area is waiting for content to load."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Spinner />
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
        id="sizing"
        title="Sizing"
        description={
          <>
            Use the <Code>size</Code> prop to match the spinner to the component
            it sits inside.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Spinner size="xs" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="sm" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="md" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="lg" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="xl" aria-hidden="true" />
              </div>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="combinations"
        title="Combinations"
        description="Combine the spinner with other components to show loading in context. Use these patterns when an action or field is actively working."
      >
        <ChildSection
          id="combinations-button"
          title="Button"
          description="Button supplies its own spinner and loading behaviour. Use this when a button action is in progress."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button loading>Saving</Button>
                <Button variant="outline" loading>
                  Loading
                </Button>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={buttonSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="combinations-badge"
          title="Badge"
          description="A spinner inside a badge. Use this when a status label reflects an ongoing process."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Badge size="sm" variant="info">
                  <Spinner
                    size="xs"
                    data-icon="inline-start"
                    aria-hidden="true"
                  />
                  Syncing
                </Badge>
                <Badge size="sm" variant="success">
                  <Spinner
                    size="xs"
                    data-icon="inline-start"
                    aria-hidden="true"
                  />
                  Updating
                </Badge>
                <Badge size="sm" variant="warning">
                  <Spinner
                    size="xs"
                    data-icon="inline-start"
                    aria-hidden="true"
                  />
                  Processing
                </Badge>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={badgeSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="combinations-input"
          title="Input"
          description="A spinner in an input addon. Use this when a field is waiting on a response, such as sending a message."
        >
          <ComponentExample>
            <div className="space-y-6">
              <InputGroup>
                <InputGroupInput
                  aria-label="Message"
                  aria-busy="true"
                  placeholder="Send a message..."
                />
                <InputGroupAddon align="inline-end">
                  <Spinner size="sm" aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
              <Code
                variant="block"
                language="tsx"
                code={inputSnippet}
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
        description="Show activity clearly and size the spinner for its context."
      >
        <DocsDoDont
          doItems={[
            <>Use a standalone Spinner when an entire area is loading.</>,
            <>
              Match <Code>size</Code> to the button, badge, or input around it.
            </>,
            <>
              Set <Code>aria-hidden=&quot;true&quot;</Code> when nearby text
              already describes the loading state.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Spinner for reporting or data completion displays. Use{" "}
              <DocsPageLink to="/components/progress">Progress</DocsPageLink>.
            </>,
            <>
              Don’t manually add Spinner to Button. Use Button’s{" "}
              <Code>loading</Code> prop.
            </>,
            <>Don’t use an oversized spinner inside a compact control.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Spinner."
      >
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              defaultValue: '"md"',
              description: "Sets the loading indicator size.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/spinner">
                Shadcn Spinner documentation
              </DocsExternalLink>{" "}
              for the source composition and usage patterns.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose the loading pattern that matches the amount of progress known."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/progress">Progress</DocsPageLink> —
            for data and reporting completion displays.
          </li>
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — when
            an action is loading.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
