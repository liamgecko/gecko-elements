import { Button } from "@/components/ui/button"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Loader2, Settings } from "lucide-react"

export function ButtonPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Button</h1>
          <p className="text-sm text-muted-foreground">
            Buttons trigger actions. Use a clear label and an appropriate
            variant for the action importance.
          </p>
        </PageSection>

        <PageSection id="default" label="Default button">
          <h2 className="text-lg font-semibold">Default button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Primary action style with solid background.
          </p>
          <ComponentExample>
            <Button>Save changes</Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the variant prop for different emphasis levels.
          </p>

          <h3 className="mb-3 text-base font-semibold">Primary</h3>
          <ComponentExample className="mb-6">
            <Button variant="default">Primary</Button>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Secondary</h3>
          <ComponentExample className="mb-6">
            <Button variant="secondary">Secondary</Button>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Outline</h3>
          <ComponentExample className="mb-6">
            <Button variant="outline">Outline</Button>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Destructive</h3>
          <ComponentExample className="mb-6">
            <Button variant="destructive">Destructive</Button>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Ghost</h3>
          <ComponentExample className="mb-6">
            <Button variant="ghost">Ghost</Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="link-button" label="Link button">
          <h2 className="text-lg font-semibold">Link button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Link-style button for low-emphasis actions that still look like
            links.
          </p>
          <ComponentExample>
            <Button variant="link">View documentation</Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Text button and icon-only button per size.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button size="xs">Extra small</Button>
                <Button size="icon-xs" aria-label="Settings">
                  <Settings className="size-3" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="icon-sm" aria-label="Settings">
                  <Settings />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button>Default</Button>
                <Button size="icon" aria-label="Settings">
                  <Settings />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="lg">Large</Button>
                <Button size="icon-lg" aria-label="Settings">
                  <Settings />
                </Button>
              </div>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="icons" label="Icons">
          <h2 className="text-lg font-semibold">Icons</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine icons with labels to make actions easier to scan. Keep icon
            size consistent and use clear, descriptive text.
          </p>

          <h3 className="mb-3 text-base font-semibold">Icon left</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <Settings />
                Icon left
              </Button>
            </div>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Icon right</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                Icon right
                <Settings />
              </Button>
            </div>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Icon only</h3>
          <ComponentExample>
            <Button size="icon" aria-label="Open settings">
              <Settings />
            </Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="loading" label="Loading button">
          <h2 className="text-lg font-semibold">Loading button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Disable the button and show a spinner while an action is in
            progress. Use for form submits and async operations.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>
                <Loader2 className="size-4 animate-spin" />
                Loading
              </Button>
              <Button size="icon" disabled aria-label="Loading">
                <Loader2 className="size-4 animate-spin" />
              </Button>
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
