import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-semibold text-foreground">Popover</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Popover component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverTrigger</code> with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">render</code> for a custom trigger and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverContent</code> with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverHeader</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverTitle</code>, and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverDescription</code> for the panel.
          </p>
          <ComponentExample>
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Open popover
                  </Button>
                }
              />
              <PopoverContent align="start">
                Set the dimensions for the layer.
              </PopoverContent>
            </Popover>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Compose popovers by adding{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverHeader</code> and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverFooter</code> inside{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverContent</code>.
          </p>

          <h3 className="mb-3 text-base font-semibold">With header</h3>
          <ComponentExample className="mb-6">
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Open popover
                  </Button>
                }
              />
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the dimensions for the layer.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">With footer</h3>
          <ComponentExample className="mb-6">
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Open popover
                  </Button>
                }
              />
              <PopoverContent align="start">
                <p className="text-sm text-muted-foreground">
                  Use a footer to lay out actions at the bottom of the popover.
                </p>
                <PopoverFooter>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">
                    Apply
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">With header and footer</h3>
          <ComponentExample>
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Open popover
                  </Button>
                }
              />
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the dimensions for the layer.
                  </PopoverDescription>
                </PopoverHeader>
                <PopoverFooter>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">
                    Apply
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </ComponentExample>
        </PageSection>

        <PageSection id="alignment" label="Alignment">
          <h2 className="text-lg font-semibold">Alignment</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">align</code> prop on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PopoverContent</code> to align the
            popover to the start, center, or end of the trigger.
          </p>
          <ComponentExample className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Align start
                  </Button>
                }
              />
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Aligned start</PopoverTitle>
                  <PopoverDescription>
                    Popover aligns to the start of the trigger.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Align center
                  </Button>
                }
              />
              <PopoverContent align="center">
                <PopoverHeader>
                  <PopoverTitle>Aligned center</PopoverTitle>
                  <PopoverDescription>
                    Popover aligns to the center of the trigger.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="outline" className="w-fit">
                    Align end
                  </Button>
                }
              />
              <PopoverContent align="end">
                <PopoverHeader>
                  <PopoverTitle>Aligned end</PopoverTitle>
                  <PopoverDescription>
                    Popover aligns to the end of the trigger.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
