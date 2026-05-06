import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { ComponentExample } from "@/components/layout/component-example"
import { Code } from "@gecko/ui/components/code"
import { Container } from "@gecko/ui/components/container"

export function StructureContainerPage() {
  const importSnippet = `import { Container } from "@gecko/ui/components/container"`

  const compositionSnippet = `Container
└── children`

  const exampleSnippet = `<Container>
  {/* Page content goes here */}
</Container>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Container"
          description="Containers define page width, padding, and vertical rhythm so screens feel consistent."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Wrap page content in <Code>Container</Code> to apply consistent
              padding and muted background. Use it as the first child inside a route
              view when you want standard gutters without repeating utility
              classes.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description={
            <>
              Import <Code>Container</Code> from the UI package.
            </>
          }
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
              <Code>Container</Code> is a simple wrapper component.
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

      <PageSection id="example" label="Example">
        <PageSectionHeader
          title="Example"
          description={
            <>
              A basic container wrapping typical page content.
            </>
          }
        />

        <ComponentExample>
          <div className="space-y-6">
            <Container className="border border-border">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Container content
                </p>
                <p className="text-sm text-muted-foreground">
                  This area inherits padding and muted background from the container.
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
    </div>
  )
}

