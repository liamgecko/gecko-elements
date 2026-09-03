import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { Code } from "@gecko/ui/components/code";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@gecko/ui/components/sheet";
import { Button } from "@gecko/ui/components/button";

export function SheetPage() {
  const importSnippet = `import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@gecko/ui/components/sheet"`;

  const compositionSnippet = `Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    ├── SheetBody
    └── SheetFooter`;

  const basicSnippet = `<Sheet>
  <SheetTrigger render={<Button variant="outline">Open sheet</Button>} />
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Customer details</SheetTitle>
      <SheetDescription>
        Review contact and account information without leaving the conversation.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`;

  const sidesSnippet = `<SheetContent side="top|right|bottom|left">...</SheetContent>`;

  const sizesSnippet = `<SheetContent side="right" size="sm|md|lg|xl|full">...</SheetContent>`;

  const footerSnippet = `<Sheet>
  <SheetTrigger render={<Button variant="outline">Edit preferences</Button>} />
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Notification preferences</SheetTitle>
      <SheetDescription>
        Choose which updates you want to receive.
      </SheetDescription>
    </SheetHeader>
    <SheetBody>
      Notification controls
    </SheetBody>
    <SheetFooter className="border-t">
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save preferences</Button>
      </div>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

  const overlaySnippet = `<SheetContent side="right" hideOverlay>
  <SheetHeader>
    <SheetTitle>Sheet without overlay</SheetTitle>
    <SheetDescription>
      The visual backdrop is hidden while modal behaviour remains active.
    </SheetDescription>
  </SheetHeader>
</SheetContent>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Sheet"
        description="The Sheet component is a panel that slides in from the edge of the screen. It holds secondary content or a short task without leaving the page."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Sheet for detail or side tasks that should keep the page behind
            visible — secondary context without taking over the screen.
            <br />
            <br />
            Avoid using it for focused setup forms — that is a{" "}
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink>. Avoid
            using it for action confirmation — that is an{" "}
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>
            .
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Sheet and its parts to compose a sliding panel."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="The trigger opens the panel. Every Sheet includes a header and title; add a body and footer when the task needs them."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="basic"
        title="Basic"
        description={
          <>
            A minimal panel using <Code>SheetTrigger</Code> and{" "}
            <Code>SheetContent</Code> with a <Code>SheetHeader</Code>. Use this
            for a short message or detail panel.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline">Open sheet</Button>}
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Customer details</SheetTitle>
                  <SheetDescription>
                    Review contact and account information without leaving the
                    conversation.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="sides"
        title="Sides"
        description={
          <>
            Sets the entry edge using <Code>side</Code> on{" "}
            <Code>SheetContent</Code>. Use the edge that matches where the
            content belongs in the layout.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
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
                <SheetTrigger
                  render={<Button variant="outline">Right</Button>}
                />
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
                <SheetTrigger
                  render={<Button variant="outline">Bottom</Button>}
                />
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
                <SheetTrigger
                  render={<Button variant="outline">Left</Button>}
                />
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
            <Code
              variant="block"
              language="tsx"
              code={sidesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="sizes"
        title="Sizes"
        description={
          <>
            Controls the width of side sheets using <Code>size</Code> on{" "}
            <Code>SheetContent</Code>. Use a narrower size for quick actions and
            a wider size for denser content.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Sheet>
                <SheetTrigger
                  render={<Button variant="outline">Small</Button>}
                />
                <SheetContent side="right" size="sm">
                  <SheetHeader>
                    <SheetTitle>Small sheet</SheetTitle>
                    <SheetDescription>
                      Narrow layout, useful for quick actions.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger
                  render={<Button variant="outline">Medium</Button>}
                />
                <SheetContent side="right" size="md">
                  <SheetHeader>
                    <SheetTitle>Medium sheet</SheetTitle>
                    <SheetDescription>
                      Default width for most use cases.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger
                  render={<Button variant="outline">Large</Button>}
                />
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
                <SheetTrigger
                  render={<Button variant="outline">Extra large</Button>}
                />
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
                <SheetTrigger
                  render={<Button variant="outline">Full width</Button>}
                />
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
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="footer"
        title="Footer"
        description={
          <>
            Add <Code>SheetFooter</Code> when the task has an action. Keep the
            required title in <Code>SheetHeader</Code> and the scrollable
            content in <Code>SheetBody</Code>.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline">Edit preferences</Button>}
              />
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Notification preferences</SheetTitle>
                  <SheetDescription>
                    Choose which updates you want to receive.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody>Notification controls</SheetBody>
                <SheetFooter className="border-t">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save preferences</Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Code
              variant="block"
              language="tsx"
              code={footerSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="overlay"
        title="Overlay"
        description={
          <>
            Hides the backdrop using <Code>hideOverlay</Code> on{" "}
            <Code>SheetContent</Code>. This changes the visual treatment only;
            the Sheet remains modal and the page behind stays unavailable.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Sheet>
              <SheetTrigger
                render={<Button variant="outline">Open without overlay</Button>}
              />
              <SheetContent side="right" hideOverlay>
                <SheetHeader>
                  <SheetTitle>Sheet without overlay</SheetTitle>
                  <SheetDescription>
                    The visual backdrop is hidden while modal behaviour remains
                    active.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Code
              variant="block"
              language="tsx"
              code={overlaySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep side tasks contained and choose the edge and width deliberately."
      >
        <DocsDoDont
          doItems={[
            <>
              Choose <Code>side</Code> to match where the panel belongs in the
              layout.
            </>,
            <>
              Choose the smallest <Code>size</Code> that comfortably fits the
              content.
            </>,
            <>
              Use <Code>SheetHeader</Code>, <Code>SheetBody</Code>, and{" "}
              <Code>SheetFooter</Code> to structure longer content.
            </>,
            <>
              Keep the default overlay when the modal boundary should remain
              visually explicit.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use a Sheet for a consequential decision. Use an{" "}
              <DocsPageLink to="/components/alert-dialog">
                Alert dialog
              </DocsPageLink>
              .
            </>,
            <>
              Don’t use a full-width Sheet when a narrower size fits the task.
            </>,
            <>
              Don’t use <Code>hideOverlay</Code> to imply that the background is
              interactive. It only removes the visible backdrop.
            </>,
            <>
              Don’t remove the close button unless another clear way to close
              the panel exists.
            </>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Sheet.">
        <DocsApiTable
          rows={[
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              defaultValue: '"right"',
              description:
                "On SheetContent. Sets the edge the panel enters from.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg" | "xl" | "full"',
              defaultValue: '"md"',
              description:
                "On SheetContent. Controls the width of left and right panels.",
            },
            {
              name: "showCloseButton",
              type: "boolean",
              defaultValue: "true",
              description:
                "On SheetContent. Shows the close button in the panel.",
            },
            {
              name: "hideOverlay",
              type: "boolean",
              defaultValue: "false",
              description:
                "On SheetContent. Visually removes the backdrop without changing modal behaviour.",
            },
          ]}
        />
        <ChildSection
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/sheet">
                Shadcn Sheet documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/dialog">
                Base UI Dialog API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose between a temporary edge panel and persistent app chrome."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> — for a
            centred modal.
          </li>
          <li>
            <DocsPageLink to="/components/sidebar">Sidebar</DocsPageLink> — for
            app chrome.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
