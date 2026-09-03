import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gecko/ui/components/card";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
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

export function CardPage() {
  const importSnippet = `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@gecko/ui/components/card"`;

  const compositionSnippet = `Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter`;

  const basicExampleSnippet = `<Card>
  <CardContent>
    <p className="text-sm">
      This is the card body. It can contain any content—text,
      lists, or other components.
    </p>
  </CardContent>
</Card>`;

  const withHeaderSnippet = `<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>
      Optional short description or subtitle for the card.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">
      Main content goes here. The header provides context with a
      title and optional description.
    </p>
  </CardContent>
</Card>`;

  const withHeaderActionSnippet = `<Card>
  <CardHeader>
    <CardTitle>Applications</CardTitle>
    <CardDescription>Applications received this week.</CardDescription>
    <CardAction>
      <Button variant="outline">View all</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Main content goes here.
  </CardContent>
</Card>`;

  const withHeaderTooltipSnippet = `<Card>
  <CardHeader tooltip>
    <CardTitle>Card title</CardTitle>
    <CardDescription>
      Optional supplementary explanation available on focus and hover.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">
      Main content goes here. The header shows only the title; use the help
      icon for the description.
    </p>
  </CardContent>
</Card>`;

  const withFooterSnippet = `<Card>
  <CardContent>
    <p className="text-sm">Card content above.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`;

  const withHeaderAndFooterSnippet = `<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>
      Optional description for the card.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">
      Main content area. Combine header, body, and footer for full
      structure.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">
      Cancel
    </Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Card"
          description="The Card component groups related content in a single block — a title, a body, and optional actions. It helps people scan a page of separate pieces of information."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Card inside{" "}
              <DocsPageLink to="/structure/container">
                Page Container
              </DocsPageLink>{" "}
              when a set of content belongs together — for example chart blocks
              on a dashboard. The header names it; the body holds the detail;
              the footer holds the actions.
              <br />
              <br />
              Avoid wrapping Container in a Card. Avoid using Card as the page
              layout, or wrapping every line of text. If the content is a
              message in a conversation, use a{" "}
              <DocsPageLink to="/components/bubble">Bubble</DocsPageLink>{" "}
              instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Card and its parts to compose a block of content."
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
        <PageSubsectionHeader
          id="usage-composition"
          title="Composition"
          description="The card holds a header, a body, and a footer. Title, description, and an optional action sit in the header."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              A card with only <Code>CardContent</Code>. Use this for a simple
              block of content that does not need a title or actions.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">
                  This is the card body. It can contain any content—text, lists,
                  or other components.
                </p>
              </CardContent>
            </Card>
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

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description="Compose the card with a header, a footer, or both. Use the pieces the content actually needs."
        />

        <PageSubsectionHeader
          id="variants-with-header"
          title="Card with header"
          description={
            <>
              Adds a title using <Code>CardHeader</Code>, <Code>CardTitle</Code>
              , and <Code>CardDescription</Code>. CardTitle renders an{" "}
              <Code>h3</Code> by default.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Optional short description or subtitle for the card.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Main content goes here. The header provides context with a
                  title and optional description.
                </p>
              </CardContent>
            </Card>
            <Code
              variant="block"
              language="tsx"
              code={withHeaderSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-with-header-action"
          title="Card with header action"
          description={
            <>
              Places one contextual action in <Code>CardAction</Code>. Use this
              for an action that applies to the complete card; keep workflow
              actions in <Code>CardFooter</Code>.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>
                  Applications received this week.
                </CardDescription>
                <CardAction>
                  <Button variant="outline">View all</Button>
                </CardAction>
              </CardHeader>
              <CardContent>Main content goes here.</CardContent>
            </Card>
            <Code
              variant="block"
              language="tsx"
              code={withHeaderActionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-with-header-tooltip"
          title="Card with header tooltip"
          description={
            <>
              Moves a supplementary description into a help icon using{" "}
              <Code>tooltip</Code> on <Code>CardHeader</Code>. It remains
              available on focus and hover. Do not hide information needed to
              understand the card.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardHeader tooltip>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Optional supplementary explanation available on focus and
                  hover.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Main content goes here. The header shows only the title; use
                  the help icon for the description.
                </p>
              </CardContent>
            </Card>
            <Code
              variant="block"
              language="tsx"
              code={withHeaderTooltipSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-with-footer"
          title="Card with footer"
          description={
            <>
              Adds actions using <Code>CardFooter</Code>. Use this when the card
              has something to do.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">Card content above.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            <Code
              variant="block"
              language="tsx"
              code={withFooterSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-with-header-and-footer"
          title="Card with header and footer"
          description="A full card with a title, a body, and actions. Use this when the block needs a name and a next step."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Optional description for the card.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Main content area. Combine header, body, and footer for full
                  structure.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Code
              variant="block"
              language="tsx"
              code={withHeaderAndFooterSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Compose header, body, and footer from the pieces you need. Do not restyle the card chrome."
        />
        <DocsDoDont
          doItems={[
            <>
              Put the name in <Code>CardTitle</Code> and supporting copy in{" "}
              <Code>CardDescription</Code>.
            </>,
            <>
              Set <Code>tooltip</Code> on <Code>CardHeader</Code> only when a
              supplementary description should sit behind a help icon.
            </>,
            <>
              Put one card-level contextual action in <Code>CardAction</Code>.
            </>,
            <>
              Put actions in <Code>CardFooter</Code>. Use one{" "}
              <DocsPageLink to="/components/button">Button</DocsPageLink>{" "}
              <Code>variant=&quot;default&quot;</Code> as the final main action.
            </>,
            <>
              Use only <Code>CardContent</Code> when the block does not need a
              title or actions.
            </>,
          ]}
          dontItems={[
            <>
              Don’t override padding, radius, or ring with{" "}
              <Code>className</Code>.
            </>,
            <>
              Don’t nest{" "}
              <DocsPageLink to="/structure/container">
                Page Container
              </DocsPageLink>{" "}
              inside a Card.
            </>,
            <>
              Don’t use a Card as the page layout, or wrap every line of text.
            </>,
            <>
              Don’t use a Card for a message in a conversation. Use a{" "}
              <DocsPageLink to="/components/bubble">Bubble</DocsPageLink>.
            </>,
            <>
              Don’t hide information required to understand the Card in its
              tooltip.
            </>,
            <>
              Don’t make the Card itself clickable. Put a real link or Button
              inside it.
            </>,
            <>Don’t put several default buttons in the footer.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader title="API" description="Behaviour props on Card." />
        <DocsApiTable
          rows={[
            {
              name: "tooltip",
              type: "boolean",
              description:
                "On CardHeader. Moves its supplementary CardDescription into the approved help tooltip.",
            },
            {
              name: "render",
              type: "ReactElement | render function",
              description:
                "On CardTitle. Overrides the default h3 only when the surrounding page hierarchy requires another heading level.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/card">
                Shadcn Card documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/handbook/composition">
                Base UI composition guide
              </DocsExternalLink>{" "}
              for the source composition and render API.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different control when the Card is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/bubble">Bubble</DocsPageLink> — when
            the content is a message in a conversation.
          </li>
          <li>
            <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink> — when
            you need a short extra line without a card header. Pair this card
            with <Code>tooltip</Code> on the header instead of wrapping the
            title yourself.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
