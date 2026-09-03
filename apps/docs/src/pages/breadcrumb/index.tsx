import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage as BreadcrumbCurrentPage,
  BreadcrumbSeparator,
} from "@gecko/ui/components/breadcrumb";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
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

export function BreadcrumbPage() {
  const importSnippet = `import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gecko/ui/components/breadcrumb"`;

  const compositionSnippet = `Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    └── BreadcrumbItem
        └── BreadcrumbPage`;

  const basicExampleSnippet = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/" />} aria-label="Home">
        <Home aria-hidden className="size-3.5" />
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/projects" />}>
        Projects
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Gecko Elements</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

  const overflowSnippet = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/" />} aria-label="Home">
        <Home className="size-3.5" />
        <span className="sr-only">Home</span>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Toggle breadcrumb menu"
            >
              <BreadcrumbEllipsis />
              <span className="sr-only">Toggle menu</span>
            </Button>
          }
        />
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem render={<Link to="/organisations" />}>
              Organisations
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link to="/organisations/gecko" />}>
              Gecko
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/projects" />}>
        Projects
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Gecko Elements</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Breadcrumb"
          description="The Breadcrumb component shows the path to the current page as a trail of links. It tells people where they are in the product and lets them step back up the tree."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Breadcrumb inside the page-level{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>{" "}
              when the page sits in a hierarchy. Compose ancestor links,
              separators and the current page in that order.
              <br />
              <br />
              Avoid using breadcrumbs on Inbox, on a page with no hierarchy, or
              as a substitute for primary navigation.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Breadcrumb and its parts to compose the trail. Use the application router’s Link for ancestor navigation."
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
          description="The trail is a list of items. Earlier levels are links; the last item is the current page. Separators sit between them."
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

      <PageSection id="basic-example" label="Canonical use">
        <PageSectionHeader
          title="Canonical use"
          description={
            <>
              A simple three-level Breadcrumb with the current page rendered as
              plain text and previous levels as links.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/" />} aria-label="Home">
                    <Home aria-hidden className="size-3.5" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/components" />}>
                    Projects
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrentPage>Gecko Elements</BreadcrumbCurrentPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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

      <PageSection id="with-overflow" label="With overflow">
        <PageSectionHeader
          title="With overflow"
          description={
            <>
              Tucks middle levels behind <Code>BreadcrumbEllipsis</Code> in a
              dropdown when the trail would otherwise wrap or crowd the Header.
              Every hidden level remains a real link.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/" />} aria-label="Home">
                    <Home className="size-3.5" />
                    <span className="sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          aria-label="Toggle breadcrumb menu"
                        >
                          <BreadcrumbEllipsis />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem render={<Link to="/guides" />}>
                          Guides
                        </DropdownMenuItem>
                        <DropdownMenuItem render={<Link to="/core" />}>
                          Core
                        </DropdownMenuItem>
                        <DropdownMenuItem render={<Link to="/structure" />}>
                          Structure
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/components" />}>
                    Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Code
              variant="block"
              language="tsx"
              code={overflowSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use the canonical trail structure and real links for every ancestor."
        />
        <DocsDoDont
          doItems={[
            <>
              Place Breadcrumb inside the page-level{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
            </>,
            <>
              Give each ancestor a real destination and mark only the final item
              as current.
            </>,
            <>
              Give an icon-only Home link an <Code>aria-label</Code>.
            </>,
            <>
              Tuck middle levels behind <Code>BreadcrumbEllipsis</Code> in a{" "}
              <DocsPageLink to="/components/dropdown-menu">
                Dropdown menu
              </DocsPageLink>{" "}
              when the trail would wrap. Keep every menu item as a link.
            </>,
          ]}
          dontItems={[
            <>
              Don’t render Breadcrumb outside the page-level Header or on a page
              without a genuine hierarchy.
            </>,
            <>
              Don’t use a button for ancestor navigation. Use an anchor or a
              router Link through <Code>BreadcrumbLink</Code>.
            </>,
            <>Don’t make the current page a link.</>,
            <>
              Don’t replace the default separator or restyle spacing and colour.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Breadcrumb."
        />
        <DocsApiTable
          rows={[
            {
              name: "href",
              type: "string",
              description:
                "On BreadcrumbLink. Native destination for an ancestor page.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "On BreadcrumbLink. Renders a router Link while preserving Breadcrumb styling and semantics.",
            },
            {
              name: "aria-label",
              type: "string",
              description:
                "On BreadcrumbLink when the content is icon-only, such as Home.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/breadcrumb">
                Shadcn Breadcrumb documentation
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
          description="Use a different control when the Breadcrumb is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> —
            the canonical page-level location for Breadcrumb.
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — for navigable middle levels hidden behind{" "}
            <Code>BreadcrumbEllipsis</Code>.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
