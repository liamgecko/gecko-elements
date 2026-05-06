import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import { Button } from "@gecko/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@gecko/ui/components/popover"

export function PopoverPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Popover</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Popover component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>PopoverTrigger</Code> with{" "}
            <Code>render</Code> for a custom trigger and{" "}
            <Code>PopoverContent</Code> with{" "}
            <Code>PopoverHeader</Code>,{" "}
            <Code>PopoverTitle</Code>, and{" "}
            <Code>PopoverDescription</Code> for the panel.
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
            <Code>PopoverHeader</Code> and{" "}
            <Code>PopoverFooter</Code> inside{" "}
            <Code>PopoverContent</Code>.
          </p>

          <h3 id="variants-with-header" className="mb-3 text-base font-semibold">With header</h3>
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

          <h3 id="variants-with-footer" className="mb-3 text-base font-semibold">With footer</h3>
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

          <h3 id="variants-with-header-and-footer" className="mb-3 text-base font-semibold">With header and footer</h3>
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
            Use the <Code>align</Code> prop on{" "}
            <Code>PopoverContent</Code> to align the
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
  )
}
