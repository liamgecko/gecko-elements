import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@gecko/ui/components/sheet"
import { Button } from "@gecko/ui/components/button"

export function SheetPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Sheet</h1>
          <p className="text-sm text-muted-foreground">
            A panel that slides in from the edge of the screen to display
            additional content.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Wrap your content in{" "}
            <Code>
              Sheet
            </Code>{" "}
            and use{" "}
            <Code>
              SheetTrigger
            </Code>{" "}
            to open it.
          </p>
          <ComponentExample>
            <Sheet>
              <SheetTrigger render={<Button variant="outline">Open sheet</Button>} />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentExample>
        </PageSection>

        <PageSection id="sides" label="Sides">
          <h2 className="text-lg font-semibold">Sides</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              side
            </Code>{" "}
            prop on{" "}
            <Code>
              SheetContent
            </Code>{" "}
            to control which edge of the screen the sheet slides in from.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-3">
              <Sheet>
                <SheetTrigger render={<Button variant="outline">Top</Button>} />
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Top sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the top edge.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Right</Button>} />
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Right sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the right edge.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Bottom</Button>} />
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Bottom sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides up from the bottom edge.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Left</Button>} />
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Left sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the left edge.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Control the width of side sheets with the{" "}
            <Code>
              size
            </Code>{" "}
            prop on{" "}
            <Code>
              SheetContent
            </Code>
            .
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-3">
              <Sheet>
                <SheetTrigger render={<Button variant="outline">Extra small</Button>} />
                <SheetContent side="right" size="sm">
                  <SheetHeader>
                    <SheetTitle>Extra small sheet</SheetTitle>
                    <SheetDescription>
                      Narrow layout, useful for quick actions.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Small</Button>} />
                <SheetContent side="right" size="md">
                  <SheetHeader>
                    <SheetTitle>Small sheet</SheetTitle>
                    <SheetDescription>
                      Default width for most use cases.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Large</Button>} />
                <SheetContent side="right" size="lg">
                  <SheetHeader>
                    <SheetTitle>Large sheet</SheetTitle>
                    <SheetDescription>
                      Wider layout for denser content.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Extra large</Button>} />
                <SheetContent side="right" size="xl">
                  <SheetHeader>
                    <SheetTitle>Extra large sheet</SheetTitle>
                    <SheetDescription>
                      Very wide panel for complex flows.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger render={<Button variant="outline">Full width</Button>} />
                <SheetContent side="right" size="full">
                  <SheetHeader>
                    <SheetTitle>Full width sheet</SheetTitle>
                    <SheetDescription>
                      Takes up the full width on this side.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine headers and footers to match the content and actions you
            need in the sheet.
          </p>

          <h3 id="variants-with-header" className="mb-3 text-base font-semibold">With header</h3>
          <ComponentExample className="mb-6">
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline">Open with header</Button>}
              />
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Newsletter preferences</SheetTitle>
                  <SheetDescription>
                    Choose how often you want to receive email updates.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentExample>

          <h3 id="variants-with-footer" className="mb-3 text-base font-semibold">With footer</h3>
          <ComponentExample className="mb-6">
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline">Open with footer</Button>}
              />
              <SheetContent side="right">
                <SheetBody>
                  Update your settings and confirm when you&apos;re ready.
                </SheetBody>
                <SheetFooter className="border-t">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </ComponentExample>

          <h3 id="variants-with-header-and-footer" className="mb-3 text-base font-semibold">
            With header and footer
          </h3>
          <ComponentExample>
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline">
                    Open with header and footer
                  </Button>
                }
              />
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Delete account</SheetTitle>
                  <SheetDescription>
                    This action will permanently remove your account and all
                    associated data.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody>
                  If you&apos;re sure you want to continue, confirm below. This
                  cannot be undone.
                </SheetBody>
                <SheetFooter className="border-t">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete account</Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </ComponentExample>
        </PageSection>

        <PageSection id="overlay" label="Overlay">
          <h2 className="text-lg font-semibold">Overlay</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              hideOverlay
            </Code>{" "}
            prop on{" "}
            <Code>
              SheetContent
            </Code>{" "}
            to disable the backdrop while keeping the sheet visible.
          </p>
          <ComponentExample>
            <Sheet>
              <SheetTrigger render={<Button variant="outline">Open without overlay</Button>} />
              <SheetContent side="right" hideOverlay>
                <SheetHeader>
                  <SheetTitle>Sheet without overlay</SheetTitle>
                  <SheetDescription>
                    The page remains interactive behind this sheet.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
