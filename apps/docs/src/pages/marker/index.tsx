import { BookOpenCheck, GitBranch, RotateCcw, Search } from "lucide-react";

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
import { Marker, MarkerContent, MarkerIcon } from "@gecko/ui/components/marker";
import { Spinner } from "@gecko/ui/components/spinner";

export function MarkerPage() {
  const importSnippet = `import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@gecko/ui/components/marker"`;

  const compositionSnippet = `Marker
├── MarkerIcon
└── MarkerContent`;

  const variantDefaultSnippet = `<Marker>
  <MarkerContent>A default marker for inline notes.</MarkerContent>
</Marker>`;

  const variantSeparatorSnippet = `<Marker variant="separator">
  <MarkerContent>A separator marker</MarkerContent>
</Marker>`;

  const variantBorderSnippet = `<Marker variant="border">
  <MarkerContent>A border marker for row boundaries.</MarkerContent>
</Marker>`;

  const statusSnippet = `<Marker role="status">
  <MarkerIcon>
    <Spinner size="sm" />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
<Marker role="status">
  <MarkerIcon>
    <Spinner size="sm" />
  </MarkerIcon>
  <MarkerContent>Running tests</MarkerContent>
</Marker>`;

  const shimmerSnippet = `<Marker>
  <MarkerContent shimmer>Thinking…</MarkerContent>
</Marker>
<Marker>
  <MarkerContent shimmer>Reading 4 files</MarkerContent>
</Marker>`;

  const withIconSnippet = `<Marker>
  <MarkerIcon>
    <GitBranch />
  </MarkerIcon>
  <MarkerContent>Switched to a new branch</MarkerContent>
</Marker>
<Marker>
  <MarkerIcon>
    <Search />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
<Marker>
  <MarkerIcon>
    <BookOpenCheck />
  </MarkerIcon>
  <MarkerContent>Syncing completed</MarkerContent>
</Marker>`;

  const linksSnippet = `<Marker render={<a href="#" />}>
  <MarkerIcon>
    <GitBranch />
  </MarkerIcon>
  <MarkerContent>View the pull request</MarkerContent>
</Marker>
<Marker render={<button type="button" />}>
  <MarkerIcon>
    <RotateCcw />
  </MarkerIcon>
  <MarkerContent>Revert this change</MarkerContent>
</Marker>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Marker"
        description="The Marker component is a short inline note. It can sit as a status, a bordered row, or a labelled divider."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Marker in a conversation thread for brief status notes — someone
            typing or AI composing, assignment system messages, or a labelled
            separator in chat. Pair it with{" "}
            <DocsPageLink to="/components/message">Message</DocsPageLink> when
            the note sits among messages. Related to{" "}
            <DocsPageLink to="/components/typing-indicator">
              Typing indicator
            </DocsPageLink>
            .
            <br />
            <br />
            Avoid using it as a product-wide status label — that is a{" "}
            <DocsPageLink to="/components/badge">Badge</DocsPageLink>. If the
            note needs attention as a warning, use an{" "}
            <DocsPageLink to="/components/alert">Alert</DocsPageLink>. For a
            divider with no meaning of its own, use a{" "}
            <DocsPageLink to="/components/separator">Separator</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Marker and its parts to compose an inline note."
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
              The optional icon sits in <Code>MarkerIcon</Code>. The text sits
              in <Code>MarkerContent</Code>.
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
        id="variants"
        title="Variants"
        description={
          <>
            Set the layout with the <Code>variant</Code> prop. Use the layout
            that matches how the note should sit in the thread.
          </>
        }
      >
        <ChildSection
          id="variants-default"
          title="Default"
          description={
            <>
              An inline note using the default variant. Use this for a short
              status or action in the flow.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Marker>
                  <MarkerContent>
                    A default marker for inline notes.
                  </MarkerContent>
                </Marker>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={variantDefaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-separator"
          title="Separator"
          description={
            <>
              A labelled divider using{" "}
              <Code>variant=&quot;separator&quot;</Code>. Use this when the note
              splits two groups of content.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Marker variant="separator">
                  <MarkerContent>A separator marker</MarkerContent>
                </Marker>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={variantSeparatorSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-border"
          title="Border"
          description={
            <>
              A bottom edge using <Code>variant=&quot;border&quot;</Code>. Use
              this when the row should separate from what follows.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full max-w-md">
                <Marker variant="border">
                  <MarkerContent>
                    A border marker for row boundaries.
                  </MarkerContent>
                </Marker>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={variantBorderSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="status"
        title="Status"
        description={
          <>
            Announces an in-progress update using{" "}
            <Code>role=&quot;status&quot;</Code> and a{" "}
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> in{" "}
            <Code>MarkerIcon</Code>. Use this when the note is still changing.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full max-w-md flex-col gap-3">
              <Marker role="status">
                <MarkerIcon>
                  <Spinner size="sm" />
                </MarkerIcon>
                <MarkerContent>Compacting conversation</MarkerContent>
              </Marker>
              <Marker role="status">
                <MarkerIcon>
                  <Spinner size="sm" />
                </MarkerIcon>
                <MarkerContent>Running tests</MarkerContent>
              </Marker>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={statusSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="shimmer"
        title="Shimmer"
        description={
          <>
            Applies Shadcn’s shimmer utility using the <Code>shimmer</Code> prop
            on <Code>MarkerContent</Code>. Use this when the note is streaming
            in.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full max-w-md flex-col gap-3">
              <Marker>
                <MarkerContent shimmer>Thinking…</MarkerContent>
              </Marker>
              <Marker>
                <MarkerContent shimmer>Reading 4 files</MarkerContent>
              </Marker>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={shimmerSnippet}
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
            Adds a decorative icon using <Code>MarkerIcon</Code>. Use this when
            a symbol helps people recognise the kind of note.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full max-w-md flex-col gap-3">
              <Marker>
                <MarkerIcon>
                  <GitBranch />
                </MarkerIcon>
                <MarkerContent>Switched to a new branch</MarkerContent>
              </Marker>
              <Marker>
                <MarkerIcon>
                  <Search />
                </MarkerIcon>
                <MarkerContent>Explored 4 files</MarkerContent>
              </Marker>
              <Marker>
                <MarkerIcon>
                  <BookOpenCheck />
                </MarkerIcon>
                <MarkerContent>Syncing completed</MarkerContent>
              </Marker>
            </div>
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
        id="links-and-buttons"
        title="Links and buttons"
        description={
          <>
            Renders the marker as a link or button using the <Code>render</Code>{" "}
            prop. Use this when choosing the note should go somewhere or run an
            action.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full max-w-md flex-col gap-3">
              <Marker render={<a href="#" />}>
                <MarkerIcon>
                  <GitBranch />
                </MarkerIcon>
                <MarkerContent>View the pull request</MarkerContent>
              </Marker>
              <Marker render={<button type="button" />}>
                <MarkerIcon>
                  <RotateCcw />
                </MarkerIcon>
                <MarkerContent>Revert this change</MarkerContent>
              </Marker>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={linksSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep markers brief and match their semantics to their behaviour."
      >
        <DocsDoDont
          doItems={[
            <>
              Use <Code>variant=&quot;separator&quot;</Code> when the marker
              labels a division in the flow.
            </>,
            <>
              Add <Code>role=&quot;status&quot;</Code> when an in-progress
              update should be announced.
            </>,
            <>
              Use <Code>shimmer</Code> on <Code>MarkerContent</Code> while its
              text is streaming.
            </>,
            <>
              Use <Code>render</Code> with a link or button when the whole
              marker is interactive.
            </>,
            <>
              Place a supporting symbol in <Code>MarkerIcon</Code>.
            </>,
          ]}
          dontItems={[
            <>Don’t use Marker for a standalone status label; use a badge.</>,
            <>
              Don’t add <Code>role=&quot;status&quot;</Code> to a static note.
            </>,
            <>
              Don’t leave shimmer running after the text has finished streaming.
            </>,
            <>
              Don’t render an interactive Marker as a <Code>div</Code>.
            </>,
            <>
              Don’t use a decorative icon without <Code>MarkerIcon</Code>.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Marker."
      >
        <ChildSection
          id="api-marker"
          title="Marker"
          description="Props on Marker."
        >
          <DocsApiTable
            rows={[
              {
                name: "variant",
                type: '"default" | "separator" | "border"',
                defaultValue: '"default"',
                description:
                  "Sets the inline, labelled-divider, or bordered-row treatment.",
              },
              {
                name: "render",
                type: "ReactElement",
                description:
                  "Replaces the default div with an element such as a link or button.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-marker-content"
          title="MarkerContent"
          description="Props on MarkerContent."
        >
          <DocsApiTable
            rows={[
              {
                name: "shimmer",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Applies Shadcn’s animated shimmer utility to streaming text.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/marker">
                Shadcn Marker documentation
              </DocsExternalLink>{" "}
              for the full component API and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/utils/shimmer">
                Shadcn shimmer utility
              </DocsExternalLink>{" "}
              for the underlying streaming-text treatment.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose the component that matches the note’s role."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — for
            a full conversation row.
          </li>
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> — for
            an in-progress Marker status.
          </li>
          <li>
            <DocsPageLink to="/components/separator">Separator</DocsPageLink> —
            for a divider without a label or status.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
