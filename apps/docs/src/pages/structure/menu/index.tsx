import { PageSection } from "@/components/layout/page-section"
import { PageOverviewHeader } from "@/components/layout/page-section-header"

export function StructureMenuPage() {
  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Menu"
          description="Menus organise navigation and actions with clear hierarchy and predictable interaction."
        />
      </PageSection>

      <PageSection id="guidance" label="Guidance">
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Use menus to group related destinations or actions. Prefer clear
            labels, sensible grouping, and consistent ordering.
          </p>
          <p>
            This page will document menu composition patterns used in Gecko
            Elements (including sidebar and dropdown menu conventions).
          </p>
        </div>
      </PageSection>
    </div>
  )
}

