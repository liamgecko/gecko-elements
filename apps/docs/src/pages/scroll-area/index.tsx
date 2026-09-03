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
import { ScrollArea, ScrollBar } from "@gecko/ui/components/scroll-area";
import { Separator } from "@gecko/ui/components/separator";
import { Code } from "@gecko/ui/components/code";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

type Artwork = {
  artist: string;
  art: string;
};

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export function ScrollAreaPage() {
  const importSnippet = `import {
  ScrollArea,
  ScrollBar,
} from "@gecko/ui/components/scroll-area"`;

  const compositionSnippet = `ScrollArea
└── ScrollBar`;

  const basicSnippet = `<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <div key={tag}>
        <div className="text-sm">{tag}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>`;

  const horizontalSnippet = `<ScrollArea className="w-full max-w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max gap-4 p-4">
    {works.map((artwork) => (
      <figure key={artwork.artist} className="shrink-0">
        <div className="overflow-hidden rounded-md">
          <img
            src={artwork.art}
            alt={\`Photo by \${artwork.artist}\`}
            className="aspect-3/4 h-64 w-auto object-cover"
            loading="lazy"
          />
        </div>
        <figcaption className="pt-2 text-xs text-muted-foreground">
          Photo by{" "}
          <span className="font-semibold text-foreground">
            {artwork.artist}
          </span>
        </figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Scroll area"
          description="The Scroll area component wraps content that overflows its bounds. It shows a styled scrollbar that matches the rest of the design system."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Scroll area when content must scroll inside a deliberately
              bounded region such as a sidebar, panel, picker, or constrained
              list. Keep native document scrolling for the primary page unless
              the product shell deliberately owns that scroll container.
              <br />
              <br />
              For a simple line between rows inside the scrollable content, use
              a{" "}
              <DocsPageLink to="/components/separator">Separator</DocsPageLink>.
              For conversation transcripts, use{" "}
              <DocsPageLink to="/components/message-scroller">
                Message scroller
              </DocsPageLink>
              .
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import ScrollArea and ScrollBar to create a scrollable region."
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
          description={
            <>
              Place content inside the root. Vertical scrolling works by
              default; compose the scrollbar when horizontal scrolling is
              required.
            </>
          }
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

      <PageSection id="basic" label="Basic">
        <PageSectionHeader
          title="Basic"
          description={
            <>
              A vertically scrollable region using <Code>ScrollArea</Code>. Use
              this when a list or panel has more content than fits in the
              available height.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <ScrollArea className="h-72 w-48 rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                  <div key={tag}>
                    <div className="text-sm">{tag}</div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="horizontal" label="Horizontal">
        <PageSectionHeader
          title="Horizontal"
          description="Adds side-to-side scrolling for content that must remain in a row."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ScrollArea className="w-full max-w-96 whitespace-nowrap rounded-md border">
              <div className="flex w-max gap-4 p-4">
                {works.map((artwork) => (
                  <figure key={artwork.artist} className="shrink-0">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={artwork.art}
                        alt={`Photo by ${artwork.artist}`}
                        className="aspect-3/4 h-64 w-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="pt-2 text-xs text-muted-foreground">
                      Photo by{" "}
                      <span className="font-semibold text-foreground">
                        {artwork.artist}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Code
              variant="block"
              language="tsx"
              code={horizontalSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep overflow contained without hiding how the content can be explored."
        />
        <DocsDoDont
          doItems={[
            <>
              Give the Scroll area a constrained height or width so overflow can
              occur.
            </>,
            <>Let vertical content use the scrollbar included by default.</>,
            <>Add a horizontal scrollbar for content that flows sideways.</>,
            <>Keep content in a logical reading order inside the viewport.</>,
          ]}
          dontItems={[
            <>
              Don’t replace native document scrolling without a bounded-region
              requirement.
            </>,
            <>Don’t clip content without providing the matching scrollbar.</>,
            <>Don’t nest scrollable regions unless the boundaries are clear.</>,
            <>
              Don’t use horizontal scrolling for content that can wrap cleanly.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Scroll area."
        />
        <PageSubsectionHeader
          title="ScrollArea"
          description="Defines the bounded scroll container."
        />
        <DocsApiTable
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Content rendered inside the scrollable viewport.",
            },
            {
              name: "className",
              type: "string",
              description: "Sets the container dimensions and presentation.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          title="ScrollBar"
          description="Configures an additional scrollbar."
        />
        <DocsApiTable
          rows={[
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              defaultValue: '"vertical"',
              description: "Sets the direction handled by ScrollBar.",
            },
            {
              name: "keepMounted",
              type: "boolean",
              defaultValue: "false",
              description:
                "Keeps the scrollbar mounted when its direction does not overflow.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/scroll-area">
                Shadcn Scroll area documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/scroll-area">
                Base UI Scroll Area API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a specialised scroller when conversation position must be managed."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>{" "}
            — for conversation autoscroll.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
