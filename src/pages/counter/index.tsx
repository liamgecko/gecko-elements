import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { ComponentExample } from "@/components/layout/component-example"
import { Counter } from "@/components/ui/counter"

export function CounterPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Counter</h1>
          <p className="text-sm text-muted-foreground">
            Counters display compact numeric values, such as notification counts
            or unread items, in a pill-shaped badge.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use counters to show small numeric values. The counter grows
            horizontally to fit the number while staying rounded.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Counter value={1} />
              <Counter value={3} />
              <Counter value={7} />
              <Counter value={10} />
              <Counter value={24} />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the size prop for sm (14px), md (18px), or lg (22px). Default is
            md.
          </p>

          <h3 id="sizes-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Counter value={1} size="sm" />
              <Counter value={3} size="sm" />
              <Counter value={9} size="sm" />
              <Counter value={12} size="sm" />
            </div>
          </ComponentExample>

          <h3 id="sizes-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Counter value={1} size="md" />
              <Counter value={3} size="md" />
              <Counter value={9} size="md" />
              <Counter value={12} size="md" />
            </div>
          </ComponentExample>

          <h3 id="sizes-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <div className="flex flex-wrap items-center gap-2">
              <Counter value={1} size="lg" />
              <Counter value={3} size="lg" />
              <Counter value={9} size="lg" />
              <Counter value={12} size="lg" />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Colour variants match the badge component, so you can use counters
            alongside existing status styles.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap items-center gap-3">
              <Counter value={3} variant="primary" />
              <Counter value={3} variant="secondary" />
              <Counter value={3} variant="info" />
              <Counter value={3} variant="warning" />
              <Counter value={3} variant="destructive" />
              <Counter value={3} variant="success" />
              <Counter value={3} variant="light" />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="overflow" label="Overflow">
          <h2 className="text-lg font-semibold">Overflow</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <code>max</code> prop to cap the displayed value and show an
            overflow indicator such as <code>9+</code> when the underlying count
            is higher.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap items-center gap-3">
              <Counter value={112} max={9} size="sm" />
              <Counter value={112} max={9} />
              <Counter value={112} max={9} size="lg" />
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

