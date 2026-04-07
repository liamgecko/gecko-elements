import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

export function IconsPage() {
  return (
    <div className="flex gap-5.5">
      <div className="min-w-0 flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Icons</h1>
          <p className="text-sm text-muted-foreground">
            Icon set and usage conventions.
          </p>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
