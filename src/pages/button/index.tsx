import { useState } from "react"
import { Loader2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

export function ButtonPage() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Button</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Actions, submit, and triggers. Use the variant that matches the
            intent.
          </p>
        </div>

        <PageSection id="variants" label="Variants">
          <h2 id="variants-heading" className="mb-3 text-lg font-medium">
            Variants
          </h2>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 id="sizes-heading" className="mb-3 text-lg font-medium">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">
              <Settings aria-hidden />
            </Button>
          </div>
        </PageSection>

        <PageSection id="disabled" label="Disabled">
          <h2 id="disabled-heading" className="mb-3 text-lg font-medium">
            Disabled
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button disabled>Default disabled</Button>
            <Button variant="secondary" disabled>
              Secondary disabled
            </Button>
            <Button variant="outline" disabled>
              Outline disabled
            </Button>
          </div>
        </PageSection>

        <PageSection id="focus" label="Focus">
          <h2 id="focus-heading" className="mb-3 text-lg font-medium">
            Focus
          </h2>
          <p className="mb-2 text-sm text-muted-foreground">
            Buttons show a visible focus ring when focused via keyboard (Tab).
            Do not remove focus styles.
          </p>
          <Button>Focus me (Tab)</Button>
        </PageSection>

        <PageSection id="loading" label="Loading">
          <h2 id="loading-heading" className="mb-3 text-lg font-medium">
            Loading
          </h2>
          <Button
            onClick={handleLoadingClick}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Loading…
              </>
            ) : (
              "Click to load"
            )}
          </Button>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
