import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Separator } from "@gecko/ui/components/separator"
import { Code } from "@gecko/ui/components/code"

export function SeparatorPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Separator</h1>
          <p className="text-sm text-muted-foreground">
            Visually divide content groups with a thin line or rule.
          </p>
        </PageSection>

        <PageSection id="vertical" label="Vertical">
          <h2 className="text-lg font-semibold">Vertical</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              orientation=&quot;vertical&quot;
            </Code>{" "}
            prop to separate items in a horizontal row.
          </p>
          <ComponentExample>
            <div className="flex h-5 items-center gap-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="list" label="List">
          <h2 className="text-lg font-semibold">List</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Place separators between rows in a stacked layout to group related
            information.
          </p>
          <ComponentExample>
            <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
              <dl className="flex items-center justify-between">
                <dt>Item 1</dt>
                <dd className="text-muted-foreground">Value 1</dd>
              </dl>
              <Separator />
              <dl className="flex items-center justify-between">
                <dt>Item 2</dt>
                <dd className="text-muted-foreground">Value 2</dd>
              </dl>
              <Separator />
              <dl className="flex items-center justify-between">
                <dt>Item 3</dt>
                <dd className="text-muted-foreground">Value 3</dd>
              </dl>
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
