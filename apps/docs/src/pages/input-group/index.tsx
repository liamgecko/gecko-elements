import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@gecko/ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@gecko/ui/components/input-group";
import { Kbd } from "@gecko/ui/components/kbd";
import { Spinner } from "@gecko/ui/components/spinner";
import {
  Check,
  Copy,
  CreditCard,
  FileCode,
  Mail,
  MoreHorizontal,
  Search,
} from "lucide-react";

export function InputGroupPage() {
  const importSnippet = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@gecko/ui/components/input-group"`;

  const compositionSnippet = `InputGroup
├── InputGroupInput or InputGroupTextarea
└── InputGroupAddon
    └── Text, icon, button, Kbd, Spinner, or DropdownMenu`;

  const basicSnippet = `<InputGroup>
  <InputGroupInput aria-label="Search" placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>`;

  const blockStartSnippet = `<Field>
  <FieldLabel htmlFor="alignment-name">Input</FieldLabel>
  <InputGroup>
    <InputGroupInput id="alignment-name" placeholder="Enter your name" />
    <InputGroupAddon align="block-start">
      <InputGroupText>Full name</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
  <FieldDescription>Header positioned above the input.</FieldDescription>
</Field>`;

  const blockEndSnippet = `<Field>
  <FieldLabel htmlFor="alignment-amount">Input</FieldLabel>
  <InputGroup>
    <InputGroupInput id="alignment-amount" placeholder="Enter amount" />
    <InputGroupAddon align="block-end">
      <InputGroupText>USD</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
  <FieldDescription>Footer positioned below the input.</FieldDescription>
</Field>`;

  const iconSnippet = `<InputGroup>
  <InputGroupInput aria-label="Email" placeholder="Enter your email" />
  <InputGroupAddon align="inline-start">
    <Mail aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Check aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>`;

  const textSnippet = `<InputGroup>
  <InputGroupInput aria-label="Amount" placeholder="0.00" />
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`;

  const kbdSnippet = `<InputGroup>
  <InputGroupInput aria-label="Search" placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>`;

  const dropdownSnippet = `<InputGroup>
  <InputGroupInput aria-label="File name" placeholder="Enter file name" />
  <InputGroupAddon align="inline-end">
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <InputGroupButton aria-label="File actions">
            <MoreHorizontal aria-hidden="true" />
          </InputGroupButton>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Move</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </InputGroupAddon>
</InputGroup>`;

  const spinnerSnippet = `<InputGroup aria-busy="true">
  <InputGroupInput aria-label="Search status" value="Searching..." readOnly />
  <InputGroupAddon align="inline-end">
    <Spinner size="sm" />
  </InputGroupAddon>
</InputGroup>`;

  const buttonSnippet = `<InputGroup>
  <InputGroupInput aria-label="Invite link" value="gecko.example/invite" readOnly />
  <InputGroupAddon align="inline-end">
    <InputGroupButton aria-label="Copy invite link">
      <Copy aria-hidden="true" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`;

  const sizesSnippet = `<InputGroup size="sm|md|lg">
  <InputGroupInput aria-label="Search" placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Search aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>`;

  const formSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="workspace-domain">Workspace domain</FieldLabel>
    <InputGroup>
      <InputGroupInput
        id="workspace-domain"
        name="domain"
        autoComplete="off"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.gecko.example</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </Field>
  <Button type="submit">Save domain</Button>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Input group"
          description="Input Group places text, icons, or actions inside a shared input boundary. Use it when the added content belongs to the value or directly acts on it."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Input Group for a prefix, suffix, status, or compact action
              that is inseparable from a text value. Use a standalone{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>{" "}
              when no content belongs inside its boundary.
              <br />
              <br />
              Keep the control first in the DOM and place addons after it. The
              alignment setting changes visual placement without changing the
              reading or focus order.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the group and only the parts used by the composition."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
        <PageSubsectionHeader
          id="usage-composition"
          title="Composition"
          description="Use one input or textarea, followed by the addons that belong to it."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description="A search icon visually placed before a text control."
        />
        <ComponentExample>
          <div className="space-y-6">
            <InputGroup>
              <InputGroupInput aria-label="Search" placeholder="Search..." />
              <InputGroupAddon align="inline-start">
                <Search aria-hidden="true" />
              </InputGroupAddon>
            </InputGroup>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="alignment" label="Alignment">
        <PageSectionHeader
          title="Alignment"
          description="Place supporting content above or below the control."
        />
        <PageSubsectionHeader
          id="alignment-block-start"
          title="Block start"
          description="Place a header or compact toolbar above an input or textarea."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="alignment-name">Input</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="alignment-name"
                    placeholder="Enter your name"
                  />
                  <InputGroupAddon align="block-start">
                    <InputGroupText>Full name</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Header positioned above the input.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="alignment-script">Textarea</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea id="alignment-script" />
                  <InputGroupAddon align="block-start">
                    <FileCode aria-hidden="true" />
                    <InputGroupText>script.js</InputGroupText>
                    <InputGroupButton
                      className="ms-auto"
                      aria-label="Copy script"
                    >
                      <Copy aria-hidden="true" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Header positioned above the textarea.
                </FieldDescription>
              </Field>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={blockStartSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="alignment-block-end"
          title="Block end"
          description="Place supporting information or actions below an input or textarea."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="alignment-amount">Input</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="alignment-amount"
                    placeholder="Enter amount"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Footer positioned below the input.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="alignment-reply">Textarea</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="alignment-reply"
                    placeholder="Write a reply..."
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>0/500</InputGroupText>
                    <InputGroupButton className="ms-auto">
                      Send
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Footer positioned below the textarea.
                </FieldDescription>
              </Field>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={blockEndSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="icon" label="Icon">
        <PageSectionHeader
          title="Icon"
          description="Use icons to reinforce the input’s purpose or communicate a nearby status."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <InputGroup>
                <InputGroupInput aria-label="Search" placeholder="Search..." />
                <InputGroupAddon align="inline-start">
                  <Search aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput
                  aria-label="Email"
                  placeholder="Enter your email"
                />
                <InputGroupAddon align="inline-start">
                  <Mail aria-hidden="true" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Check aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput
                  aria-label="Card number"
                  placeholder="Card number"
                />
                <InputGroupAddon align="inline-start">
                  <CreditCard aria-hidden="true" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={iconSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="text" label="Text">
        <PageSectionHeader
          title="Text"
          description="Use short, non-interactive text for units, prefixes, suffixes, and counters."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <InputGroup>
                <InputGroupInput aria-label="Amount" placeholder="0.00" />
                <InputGroupAddon align="inline-start">
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>USD</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput
                  aria-label="Website"
                  placeholder="example.com"
                />
                <InputGroupAddon align="inline-start">
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupTextarea
                  aria-label="Biography"
                  placeholder="Tell us about yourself..."
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>120 characters left</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={textSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="button" label="Button">
        <PageSectionHeader
          title="Button"
          description="Place a compact action next to the value when it operates on that value directly."
        />
        <ComponentExample>
          <div className="space-y-6">
            <InputGroup>
              <InputGroupInput
                aria-label="Invite link"
                value="gecko.example/invite"
                readOnly
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Copy invite link">
                  <Copy aria-hidden="true" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <Code
              variant="block"
              language="tsx"
              code={buttonSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="kbd" label="Kbd">
        <PageSectionHeader
          title="Kbd"
          description="Show a keyboard shortcut when it activates or focuses the input."
        />
        <ComponentExample>
          <div className="space-y-6">
            <InputGroup>
              <InputGroupInput aria-label="Search" placeholder="Search..." />
              <InputGroupAddon align="inline-start">
                <Search aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <Code
              variant="block"
              language="tsx"
              code={kbdSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="dropdown" label="Dropdown">
        <PageSectionHeader
          title="Dropdown"
          description="Use a menu when several actions or scopes operate on the current value."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <InputGroup>
                <InputGroupInput
                  aria-label="File name"
                  placeholder="Enter file name"
                />
                <InputGroupAddon align="inline-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <InputGroupButton aria-label="File actions">
                          <MoreHorizontal aria-hidden="true" />
                        </InputGroupButton>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Move</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput
                  aria-label="Search query"
                  placeholder="Enter search query"
                />
                <InputGroupAddon align="inline-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <InputGroupButton dropdown>Search in…</InputGroupButton>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Conversations</DropdownMenuItem>
                      <DropdownMenuItem>Contacts</DropdownMenuItem>
                      <DropdownMenuItem>Files</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={dropdownSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="spinner" label="Spinner">
        <PageSectionHeader
          title="Spinner"
          description="Pair a read-only value with a spinner while work is in progress."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <InputGroup aria-busy="true">
                <InputGroupInput
                  aria-label="Search status"
                  value="Searching..."
                  readOnly
                />
                <InputGroupAddon align="inline-end">
                  <Spinner size="sm" />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup aria-busy="true">
                <InputGroupInput
                  aria-label="Processing status"
                  value="Processing..."
                  readOnly
                />
                <InputGroupAddon align="inline-start">
                  <Spinner size="sm" />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup aria-busy="true">
                <InputGroupInput
                  aria-label="Save status"
                  value="Saving changes..."
                  readOnly
                />
                <InputGroupAddon align="block-end">
                  <Spinner size="sm" />
                  <InputGroupText>Saving...</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={spinnerSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description="Match the group to the density of the surrounding form controls."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              {(["sm", "md", "lg"] as const).map((size) => (
                <InputGroup key={size} size={size}>
                  <InputGroupInput
                    aria-label={`${size} search`}
                    placeholder={`${size.toUpperCase()} search...`}
                  />
                  <InputGroupAddon align="inline-end">
                    <Search aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
              ))}
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
      </PageSection>

      <PageSection id="within-form" label="Within form">
        <PageSectionHeader
          title="Within form"
          description="Wrap the complete group in Field and connect a visible label to its control."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="workspace-domain">
                  Workspace domain
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="workspace-domain"
                    name="domain"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>.gecko.example</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Button type="submit">Save domain</Button>
            </form>
            <Code
              variant="block"
              language="tsx"
              code={formSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep the group focused on one value and the content that directly supports it."
        />
        <DocsDoDont
          doItems={[
            <>Place addons after the control in the DOM.</>,
            <>Give every icon-only action an accessible name.</>,
            <>
              Use <Code>InputGroupText</Code> for visible prefixes, suffixes,
              and counters.
            </>,
            <>Use Kbd only when the displayed shortcut is implemented.</>,
            <>
              Use Dropdown Menu when several related actions operate on the
              value.
            </>,
            <>
              Mark loading groups as busy and keep a readable status in the
              control.
            </>,
            <>Keep a visible Field label in product forms.</>,
          ]}
          dontItems={[
            <>Don’t position content over a standalone Input.</>,
            <>Don’t put unrelated form actions inside the boundary.</>,
            <>Don’t use placeholder text as the field label.</>,
            <>
              Don’t add width utilities when the group should use its default
              full width.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props for each Input Group part."
        />
        <PageSubsectionHeader
          id="api-input-group"
          title="InputGroup"
          description="Owns the shared boundary, size, and compound focus state."
        />
        <DocsApiTable
          aria-label="InputGroup properties"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the height and inherited content scale.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          id="api-input-group-addon"
          title="InputGroupAddon"
          description="Positions supporting content around the control."
        />
        <DocsApiTable
          aria-label="InputGroupAddon properties"
          rows={[
            {
              name: "align",
              type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
              defaultValue: '"inline-start"',
              description: "Sets visual placement without changing DOM order.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          id="api-input-group-button"
          title="InputGroupButton"
          description="Adds a compact button that inherits the group scale."
        />
        <DocsApiTable
          aria-label="InputGroupButton properties"
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              description: "Overrides the size inherited from InputGroup.",
            },
            {
              name: "variant",
              type: "Button variant",
              defaultValue: '"ghost"',
              description: "Sets the approved Button treatment.",
            },
            {
              name: "type",
              type: '"button" | "submit" | "reset"',
              defaultValue: '"button"',
              description: "Sets native button form behaviour.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          id="api-input-group-text"
          title="InputGroupText"
          description="Provides a non-interactive text prefix, suffix, or supporting value."
        />
        <p className="text-sm text-muted-foreground">
          Accepts the native span element interface.
        </p>
        <PageSubsectionHeader
          className="mt-6"
          id="api-input-group-input"
          title="InputGroupInput"
          description="Provides the single-line control inside the group."
        />
        <p className="text-sm text-muted-foreground">
          Accepts the Input field interface except the native numeric size
          attribute.
        </p>
        <PageSubsectionHeader
          className="mt-6"
          id="api-input-group-textarea"
          title="InputGroupTextarea"
          description="Provides the multiline control inside the group."
        />
        <p className="text-sm text-muted-foreground">
          Accepts the Textarea field interface.
        </p>
        <PageSubsectionHeader
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/input-group">
                Shadcn Input Group documentation
              </DocsExternalLink>{" "}
              for the source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Choose the field or grouping component that matches the interaction."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> — a
            single-line value without internal content.
          </li>
          <li>
            <DocsPageLink to="/components/textarea">
              Textarea field
            </DocsPageLink>{" "}
            — multiline text without a shared toolbar boundary.
          </li>
          <li>
            <DocsPageLink to="/components/button-group">
              Button group
            </DocsPageLink>{" "}
            — related actions joined into one control cluster.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
