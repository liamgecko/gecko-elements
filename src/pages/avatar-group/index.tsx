import { AvatarGroup } from "@/components/ui/avatar-group"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

const sampleItems = [
  { name: "Gecko Engage", fallback: "GE" },
  { name: "Alice Brown", fallback: "AB" },
  { name: "Charlie Davis", fallback: "CD" },
  { name: "Eve Foster", fallback: "EF" },
  { name: "Grace Hill", fallback: "GH" },
]

export function AvatarGroupPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Avatar Group</h1>
          <p className="text-sm text-muted-foreground">
            Display multiple avatars in a stacked row from an items array.
            Optionally show overflow as a count button that opens a dropdown
            with the remaining items, and enable tooltips on hover.
          </p>
        </PageSection>
        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass an array of items (name, fallback, src, etc.). Avatars are
            stacked with negative margin and ring so each remains visible.
          </p>
          <ComponentExample className="mb-6">
            <AvatarGroup items={sampleItems.slice(0, 4)} size="xl" />
          </ComponentExample>
        </PageSection>
        <PageSection id="with-overflow" label="With overflow">
          <h2 className="text-lg font-semibold">With overflow</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set overflow and displayItems to show a count button for remaining
            items. Clicking it opens a dropdown listing the rest.
          </p>
          <ComponentExample className="mb-6">
            <AvatarGroup
              items={sampleItems}
              displayItems={3}
              overflow  
              size="xl"
            />
          </ComponentExample>
        </PageSection>
        <PageSection id="with-tooltips" label="With tooltips">
          <h2 className="text-lg font-semibold">With tooltips</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Enable tooltips to show each item’s name (or custom tooltip) on
            hover.
          </p>
          <ComponentExample>
            <AvatarGroup
              items={sampleItems.slice(0, 4)}
              tooltips  
              size="xl"
            />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
