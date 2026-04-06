import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"

export function KbdPage() {
  return (
    <div className="flex gap-5.5">
      <div className="min-w-0 flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Kbd</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            A keyboard shortcut component for displaying keyboard shortcuts.
          </p>
        </PageSection>
        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Kbd
            </Code>{" "}
            component to create a keyboard shortcut.
          </p>
          <ComponentExample>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
