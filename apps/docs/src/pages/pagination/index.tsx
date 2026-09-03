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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@gecko/ui/components/pagination";

export function PaginationPage() {
  const importSnippet = `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@gecko/ui/components/pagination"`;

  const compositionSnippet = `Pagination
└── PaginationContent
    └── PaginationItem
        └── PaginationPrevious | PaginationLink | PaginationEllipsis | PaginationNext`;

  const navigationalSnippet = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" iconOnly />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" iconOnly />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;

  const iconOnlySnippet = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" iconOnly variant="outline" />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" iconOnly variant="outline" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Pagination"
        description="Pagination is a navigation control for moving between pages of results. It can show page links, edge controls, and ellipsis."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Pagination under{" "}
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            results, and on other paginated lists such as{" "}
            <DocsPageLink to="/components/activity-feed">
              Activity feed
            </DocsPageLink>
            .
            <br />
            <br />
            Avoid putting Pagination in the page{" "}
            <DocsPageLink to="/structure/header">Page header</DocsPageLink>.
            Avoid using it for incremental loading in one scroll container.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Pagination and its row parts."
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
          description="Compose links and controls inside PaginationContent."
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
        id="navigational"
        title="Navigational"
        description={
          <>
            Full page navigation using <Code>PaginationLink</Code>,{" "}
            <Code>PaginationPrevious</Code>, <Code>PaginationNext</Code>, and{" "}
            <Code>PaginationEllipsis</Code>. Use this when people need to jump
            to a specific page or see where they are in the set.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" iconOnly />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" iconOnly />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Code
              variant="block"
              language="tsx"
              code={navigationalSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="table-pagination"
        title="Icon only"
        description={
          <>
            Shows only previous and next controls using <Code>iconOnly</Code> on{" "}
            <Code>PaginationPrevious</Code> and <Code>PaginationNext</Code>. Use
            this when page numbers are shown elsewhere or space is limited.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" iconOnly variant="outline" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" iconOnly variant="outline" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Code
              variant="block"
              language="tsx"
              code={iconOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Show where the reader is and provide clear routes through the page set."
      >
        <DocsDoDont
          doItems={[
            <>
              Set <Code>isActive</Code> on the current page link.
            </>,
            <>
              Use <Code>PaginationEllipsis</Code> for a skipped range of page
              links.
            </>,
            <>
              Keep previous and next controls in the same{" "}
              <Code>PaginationContent</Code> list.
            </>,
            <>
              Use <Code>iconOnly</Code> when space is limited and the direction
              is already clear.
            </>,
            <>
              Omit a previous or next link when that direction is unavailable.
            </>,
          ]}
          dontItems={[
            <>Don’t put Pagination in the page header.</>,
            <>Don’t mark more than one page link as active.</>,
            <>Don’t use an ellipsis as an interactive page link.</>,
            <>
              Don’t use Pagination for incremental loading in one scroll
              container.
            </>,
            <>
              Don’t remove the accessible labels from icon-only previous and
              next controls.
            </>,
            <>Don’t leave an unavailable link with a working destination.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Pagination."
      >
        <ChildSection
          id="api-pagination-link"
          title="PaginationLink"
          description="Props on PaginationLink."
        >
          <DocsApiTable
            rows={[
              {
                name: "isActive",
                type: "boolean",
                defaultValue: "false",
                description: "Marks the current page and applies aria-current.",
              },
              {
                name: "size",
                type: '"xs" | "sm" | "default" | "lg" | "icon-2xs" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"',
                defaultValue: '"icon"',
                description:
                  "Sets the link dimensions using Gecko Button sizes.",
              },
              {
                name: "variant",
                type: '"default" | "outline" | "secondary" | "ghost" | "ghost-light" | "ghost-dark" | "ghost-destructive" | "destructive" | "link"',
                defaultValue: '"ghost"',
                description:
                  "Sets the Button treatment. The active link always uses outline.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-pagination-previous"
          title="PaginationPrevious"
          description="Props on PaginationPrevious."
        >
          <DocsApiTable
            rows={[
              {
                name: "text",
                type: "string",
                defaultValue: '"Previous"',
                description: "Sets the visible previous-page label.",
              },
              {
                name: "iconOnly",
                type: "boolean",
                defaultValue: "false",
                description: "Hides the visible previous-page label.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-pagination-next"
          title="PaginationNext"
          description="Props on PaginationNext."
        >
          <DocsApiTable
            rows={[
              {
                name: "text",
                type: "string",
                defaultValue: '"Next"',
                description: "Sets the visible next-page label.",
              },
              {
                name: "iconOnly",
                type: "boolean",
                defaultValue: "false",
                description: "Hides the visible next-page label.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/pagination">
                Shadcn Pagination documentation
              </DocsExternalLink>{" "}
              for the component source and composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Pair Pagination with the content it moves through."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — for paged tabular results.
          </li>
          <li>
            <DocsPageLink to="/components/activity-feed">
              Activity feed
            </DocsPageLink>{" "}
            — for other paginated data lists.
          </li>
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — for
            standalone actions that do not navigate between result pages.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
