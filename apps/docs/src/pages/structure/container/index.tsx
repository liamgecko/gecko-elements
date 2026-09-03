import { PageSection } from "@/components/layout/page-section";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { Code } from "@gecko/ui/components/code";
import { Container } from "@gecko/ui/components/container";

export function StructureContainerPage() {
  const importSnippet = `import { Container } from "@gecko/ui/components/container"`;

  const exampleSnippet = `<Container>
  {/* Page content goes here */}
</Container>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Page container"
          description="Container wraps the body of a standard page with consistent outer padding and background."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Container around the main body of each standard page so
              padding and background stay consistent. Place it below the{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
              Prefer a{" "}
              <DocsPageLink to="/components/scroll-area">
                Scroll area
              </DocsPageLink>{" "}
              for overflow inside constrained layouts rather than native page
              scroll.
              <br />
              <br />
              Avoid using it on Inbox — that screen uses a custom layout. Avoid
              using it inside a{" "}
              <DocsPageLink to="/components/card">Card</DocsPageLink>, a sheet,
              or a dialog. Those regions already own their own spacing.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Container to wrap page content."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="example" label="Example">
        <PageSectionHeader
          title="Example"
          description="A Container wrapping typical page content. Use this when the page needs standard outer padding and background."
        />

        <ComponentExample>
          <div className="space-y-6">
            <Container className="border border-border">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Container content
                </p>
                <p className="text-sm text-muted-foreground">
                  This area uses Container’s standard page padding and
                  background.
                </p>
              </div>
            </Container>

            <Code
              variant="block"
              language="tsx"
              code={exampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use Container for consistent page-level spacing, not component styling."
        />
        <DocsDoDont
          doItems={[
            <>Wrap the main body of every standard page in one Container.</>,
            <>
              Place it below a{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
            </>,
            <>Let Container provide the page’s outer padding and background.</>,
            <>Put sections and content layouts inside the Container.</>,
          ]}
          dontItems={[
            <>
              Don’t skip Container except on Inbox or when explicitly stated.
            </>,
            <>Don’t restyle Container to look like a card.</>,
            <>Don’t nest Containers to increase padding.</>,
            <>Don’t use it inside cards, sheets, or dialogs.</>,
            <>Don’t duplicate its outer padding on child content.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader title="API" description="Props for Container." />
        <PageSubsectionHeader
          id="api-container"
          title="Container"
          description="The standard page-body wrapper. It accepts native div props."
        />
        <DocsApiTable
          aria-label="Container API properties"
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Supplies the page sections and content layouts.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Adds layout classes without replacing the standard page padding and background.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Pair Container with the page structure above it."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> —
            sticky product chrome above the page.
          </li>
          <li>
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            — app-wide navigation beside the page.
          </li>
          <li>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> —
            for the page title, location, actions, and tabs.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
