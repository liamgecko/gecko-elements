import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import {
  Dialog,
  DialogWrapper,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

export function DialogPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Dialog</h1>
          <p className="text-sm text-muted-foreground">
            A dialog displays important content or actions in a focused overlay.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A minimal dialog without a header or footer. Use{" "}
            <Code>Dialog</Code>,{" "}
            <Code>DialogTrigger</Code>, and{" "}
            <Code>DialogContent</Code> to show simple
            content.
          </p>
          <ComponentExample>
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
              <DialogContent>
                <DialogWrapper>
                  <DialogBody>
                    <p className="text-sm text-muted-foreground">
                      This is a basic dialog without a header or footer. Use it for lightweight messages or confirmations.
                    </p>
                  </DialogBody>
                </DialogWrapper>
              </DialogContent>
            </Dialog>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Compose dialogs by adding{" "}
            <Code>DialogHeader</Code> and{" "}
            <Code>DialogFooter</Code> inside{" "}
            <Code>DialogContent</Code>.
          </p>

          <h3 id="variants-with-header" className="mb-3 text-base font-semibold">With header</h3>
          <ComponentExample className="mb-6">
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
              <DialogContent>
                <DialogWrapper>
                  <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>
                      Use a header to provide a clear, accessible title and optional description for the dialog.
                    </DialogDescription>
                  </DialogHeader>
                </DialogWrapper>
              </DialogContent>
            </Dialog>
          </ComponentExample>

          <h3 id="variants-with-footer" className="mb-3 text-base font-semibold">With footer</h3>
          <ComponentExample className="mb-6">
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
              <DialogContent>
                <DialogWrapper>
                  <DialogBody>
                    <p className="text-sm text-muted-foreground">
                      Use a footer to lay out primary and secondary actions at the bottom of the dialog.
                    </p>
                  </DialogBody>
                </DialogWrapper>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentExample>

          <h3 id="variants-with-header-and-footer" className="mb-3 text-base font-semibold">With header and footer</h3>
          <ComponentExample>
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
              <DialogContent>
                <DialogWrapper>
                  <DialogHeader>
                    <DialogTitle>Create project</DialogTitle>
                    <DialogDescription>
                      Combine a header and footer for more structured dialogs that include titles and actions.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <p className="text-sm text-muted-foreground">
                      Use a body to lay out the main content of the dialog.
                    </p>
                  </DialogBody>
                </DialogWrapper>
                <DialogFooter>
                  <Button variant="default">Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentExample>
        </PageSection>

        <PageSection id="footer-close-button" label="Footer close button">
          <h2 className="text-lg font-semibold">Footer close button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>showCloseButton</Code> prop on{" "}
            <Code>DialogFooter</Code> to render a footer
            close action, and customise its label and icon with{" "}
            <Code>closeButtonText</Code> and{" "}
            <Code>closeButtonIcon</Code>.
          </p>

          <h3 id="footer-close-button-default" className="mb-3 text-base font-semibold">Default close button</h3>
          <ComponentExample className="mb-6">
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
              <DialogContent>
                <DialogWrapper>
                  <DialogHeader>
                    <DialogTitle>Leave workspace</DialogTitle>
                    <DialogDescription>
                      The default footer close button renders an outline button labelled &quot;Close&quot;.
                    </DialogDescription>
                  </DialogHeader>
                </DialogWrapper>
                <DialogFooter showCloseButton>
                  <Button variant="default">Leave</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentExample>

          <h3 id="footer-close-button-custom" className="mb-3 text-base font-semibold">Custom close button</h3>
          <ComponentExample>
            <Dialog>
              <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
              <DialogContent>
                <DialogWrapper>
                  <DialogHeader>
                    <DialogTitle>Discard changes</DialogTitle>
                    <DialogDescription>
                      Customise the footer close button text and icon while keeping layout and styling consistent.
                    </DialogDescription>
                  </DialogHeader>
                </DialogWrapper>
                <DialogFooter
                  showCloseButton
                  closeButtonText="Cancel"
                  closeButtonIcon={XIcon}
                >
                  <Button variant="default">Discard</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Control the maximum width of the dialog content with the{" "}
            <Code>size</Code> prop on{" "}
            <Code>DialogContent</Code>. Sizes map to
            responsive max-widths on larger screens.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger render={<Button variant="outline">Extra small</Button>} />
                <DialogContent size="xs">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Extra small dialog</DialogTitle>
                      <DialogDescription>
                        Use <Code>size=&quot;xs&quot;</Code> for
                        very compact dialogs such as toasts or inline confirmations.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger render={<Button variant="outline">Small</Button>} />
                <DialogContent size="sm">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Small dialog</DialogTitle>
                      <DialogDescription>
                        <Code>size=&quot;sm&quot;</Code> is ideal
                        for short forms and simple confirmation flows.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger render={<Button variant="outline">Medium</Button>} />
                <DialogContent size="md">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Medium dialog</DialogTitle>
                      <DialogDescription>
                        The default{" "}
                        <Code>size=&quot;md&quot;</Code>{" "}
                        balances content density and readability.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger render={<Button variant="outline">Large</Button>} />
                <DialogContent size="lg">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Large dialog</DialogTitle>
                      <DialogDescription>
                        Use{" "}
                        <Code>size=&quot;lg&quot;</Code> for
                        content-heavy dialogs such as settings or multi-step flows.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger render={<Button variant="outline">Extra large</Button>} />
                <DialogContent size="xl">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Extra large dialog</DialogTitle>
                      <DialogDescription>
                        <Code>size=&quot;xl&quot;</Code> gives
                        the widest layout for complex editors or previews.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
