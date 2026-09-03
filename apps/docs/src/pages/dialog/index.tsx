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
  Dialog,
  DialogWrapper,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@gecko/ui/components/dialog";
import { Button } from "@gecko/ui/components/button";
import { Field, FieldLabel } from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";

export function DialogPage() {
  const importSnippet = `import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogWrapper,
} from "@gecko/ui/components/dialog"`;

  const compositionSnippet = `Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogWrapper
    │   ├── DialogHeader
    │   │   ├── DialogTitle
    │   │   └── DialogDescription
    │   └── DialogBody
    └── DialogFooter`;

  const basicSnippet = `<Dialog>
  <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
  <DialogContent>
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Edit project</DialogTitle>
        <DialogDescription>
          Update the project details, then save your changes.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <Field>
          <FieldLabel htmlFor="project-name">Project name</FieldLabel>
          <Input id="project-name" name="projectName" />
        </Field>
      </DialogBody>
    </DialogWrapper>
  </DialogContent>
</Dialog>`;

  const withFooterSnippet = `<Dialog>
  <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
  <DialogContent>
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Edit project</DialogTitle>
        <DialogDescription>
          Update the project details, then save your changes.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <Field>
          <FieldLabel htmlFor="project-name">Project name</FieldLabel>
          <Input id="project-name" name="projectName" />
        </Field>
      </DialogBody>
    </DialogWrapper>
    <DialogFooter showCloseButton closeButtonText="Cancel">
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

  const sizingSnippet = `<DialogContent size="xs|sm|md|lg|xl">
  <DialogWrapper>
    <DialogHeader>
      <DialogTitle>Dialog title</DialogTitle>
    </DialogHeader>
  </DialogWrapper>
</DialogContent>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Dialog"
        description="The Dialog component is a window over the page. It holds a task that needs attention while the rest of the screen waits."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Dialog for focused setup tasks — create/edit forms and similar
            flows where the person must finish before returning to the page.
            <br />
            <br />
            Avoid using it for action confirmation (delete, unsaved changes,
            confirm save) — that is an{" "}
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>
            . If the content should slide in from the side while keeping page
            context, use a{" "}
            <DocsPageLink to="/components/sheet">Sheet</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Dialog and its parts to compose an overlay."
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
          description="The trigger opens the overlay. Content sits in a wrapper with its required title, optional description and body, followed by an optional footer."
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
        id="basic-example"
        title="Basic example"
        description={
          <>
            A titled Dialog using <Code>DialogHeader</Code> and{" "}
            <Code>DialogBody</Code>. Every Dialog needs a clear{" "}
            <Code>DialogTitle</Code>; the description is optional.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Open dialog</Button>}
              />
              <DialogContent>
                <DialogWrapper>
                  <DialogHeader>
                    <DialogTitle>Edit project</DialogTitle>
                    <DialogDescription>
                      Update the project details, then save your changes.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <Field>
                      <FieldLabel htmlFor="dialog-basic-project-name">
                        Project name
                      </FieldLabel>
                      <Input
                        id="dialog-basic-project-name"
                        name="projectName"
                      />
                    </Field>
                  </DialogBody>
                </DialogWrapper>
              </DialogContent>
            </Dialog>
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
        id="footer"
        title="Footer"
        description="Add a footer when the task has actions. The product owns the primary action; DialogFooter owns the standard dismissal treatment."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Open dialog</Button>}
              />
              <DialogContent>
                <DialogWrapper>
                  <DialogHeader>
                    <DialogTitle>Edit project</DialogTitle>
                    <DialogDescription>
                      Update the project details, then save your changes.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <Field>
                      <FieldLabel htmlFor="dialog-footer-project-name">
                        Project name
                      </FieldLabel>
                      <Input
                        id="dialog-footer-project-name"
                        name="projectName"
                      />
                    </Field>
                  </DialogBody>
                </DialogWrapper>
                <DialogFooter showCloseButton closeButtonText="Cancel">
                  <Button>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Code
              variant="block"
              language="tsx"
              code={withFooterSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="sizing"
        title="Sizing"
        description={
          <>
            Sets the width using <Code>size</Code> on <Code>DialogContent</Code>
            . Choose the smallest size that fits the task without crowding its
            content. The example contains every available size.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Extra small</Button>}
                />
                <DialogContent size="xs">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Extra small dialog</DialogTitle>
                      <DialogDescription>
                        Use <Code>size=&quot;xs&quot;</Code> for very compact
                        single-step tasks.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Small</Button>}
                />
                <DialogContent size="sm">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Small dialog</DialogTitle>
                      <DialogDescription>
                        <Code>size=&quot;sm&quot;</Code> is ideal for short
                        forms with only a few fields.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Medium</Button>}
                />
                <DialogContent size="md">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Medium dialog</DialogTitle>
                      <DialogDescription>
                        The default <Code>size=&quot;md&quot;</Code> suits
                        standard forms and setup tasks.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Large</Button>}
                />
                <DialogContent size="lg">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Large dialog</DialogTitle>
                      <DialogDescription>
                        Use <Code>size=&quot;lg&quot;</Code> for multi-section
                        forms or wider content.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger
                  render={<Button variant="outline">Extra large</Button>}
                />
                <DialogContent size="xl">
                  <DialogWrapper>
                    <DialogHeader>
                      <DialogTitle>Extra large dialog</DialogTitle>
                      <DialogDescription>
                        Use <Code>size=&quot;xl&quot;</Code> for dense editors
                        or previews that genuinely need the available width.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogWrapper>
                </DialogContent>
              </Dialog>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Give modal content a clear structure and accessible name. Do not restyle the dialog chrome."
      >
        <DocsDoDont
          doItems={[
            <>
              Give every Dialog a <Code>DialogTitle</Code>. Add a{" "}
              <Code>DialogDescription</Code> when supporting context helps.
            </>,
            <>
              Keep the main content in <Code>DialogBody</Code> and actions in{" "}
              <Code>DialogFooter</Code>.
            </>,
            <>
              Choose the smallest <Code>size</Code> that fits the demonstrated
              content.
            </>,
            <>
              Use <Code>DialogFooter.showCloseButton</Code> when dismissal
              belongs with the footer actions.
            </>,
            <>
              Keep <Code>DialogContent.showCloseButton</Code> enabled unless
              another <Code>DialogClose</Code> is rendered inside the Dialog.
            </>,
          ]}
          dontItems={[
            <>
              Don’t render a Dialog without an accessible{" "}
              <Code>DialogTitle</Code>.
            </>,
            <>
              Don’t place action confirmation (delete, unsaved changes, confirm
              save) in a general Dialog. Use an{" "}
              <DocsPageLink to="/components/alert-dialog">
                Alert dialog
              </DocsPageLink>
              .
            </>,
            <>Don’t use the largest size when the content is short.</>,
            <>
              Don’t override the overlay, radius, shadow, or close-button chrome
              with <Code>className</Code>.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Dialog."
      >
        <ChildSection
          id="api-dialog"
          title="Dialog"
          description="Props on Dialog."
        >
          <DocsApiTable
            rows={[
              {
                name: "size",
                type: '"xs" | "sm" | "md" | "lg" | "xl"',
                defaultValue: '"md"',
                description: "Sets the width of DialogContent.",
              },
              {
                name: "closeButtonText",
                type: "string",
                defaultValue: '"Close"',
                description: "Sets the footer close action label.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-dialog-content"
          title="DialogContent"
          description="Props on DialogContent."
        >
          <DocsApiTable
            rows={[
              {
                name: "showCloseButton",
                type: "boolean",
                defaultValue: "true",
                description: "Shows the corner close action.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-dialog-footer"
          title="DialogFooter"
          description="Props on DialogFooter."
        >
          <DocsApiTable
            rows={[
              {
                name: "showCloseButton",
                type: "boolean",
                defaultValue: "false",
                description: "Adds a close action to DialogFooter.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/dialog">
                Base UI Dialog API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/dialog">
                Shadcn Dialog documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a more specific overlay when the interaction calls for one."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — when an action needs explicit confirmation.
          </li>
          <li>
            <DocsPageLink to="/components/sheet">Sheet</DocsPageLink> — when
            content should enter from the edge of the screen.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
