import * as React from "react";
import Calculator from "@hugeicons/core-free-icons/Calculator01Icon";
import Calendar from "@hugeicons/core-free-icons/Calendar03Icon";
import CreditCard from "@hugeicons/core-free-icons/CreditCardIcon";
import Settings from "@hugeicons/core-free-icons/Settings01Icon";
import Smile from "@hugeicons/core-free-icons/SmileIcon";
import User from "@hugeicons/core-free-icons/User02Icon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@gecko/ui/components/command";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";

export function CommandPage() {
  const [open, setOpen] = React.useState(false);

  const importSnippet = `import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@gecko/ui/components/command"`;

  const compositionSnippet = `Command
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        └── CommandItem
            └── CommandShortcut`;

  const exampleSnippet = `<Command label="Quick actions" className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <Smile />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem>
        <Calculator />
        <span>Calculator</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <User />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <CreditCard />
        <span>Billing</span>
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`;

  const triggerSnippet = `<Button onClick={() => setOpen(true)} variant="outline">
  Open command
</Button>
<CommandDialog open={open} onOpenChange={setOpen}>
  <Command label="Quick actions">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <Calendar />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem>
          <Smile />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem>
          <Calculator />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          <User />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCard />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Settings />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Command"
        description="The Command component is a searchable list of actions. People type to find a command, then run it."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Command when someone needs to find an action by typing. It is
            faster than hunting through menus.
            <br />
            <br />
            Command is not shipped as a product-wide palette in Gecko yet —
            adopt it only when that pattern lands. Avoid using it as a form
            select, or as the only way to reach important actions. If the list
            is short and always visible, use a{" "}
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Command and its parts to compose a searchable list."
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
          description="The command holds a search field and a list. Items sit in groups, with an empty state when nothing matches."
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
        id="example"
        title="Example"
        description={
          <>
            A searchable list using <Code>CommandInput</Code>,{" "}
            <Code>CommandList</Code>, and <Code>CommandItem</Code>. Use this to
            understand the inline composition. It is not the canonical Gecko
            configuration.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Command
              label="Quick actions"
              className="max-w-sm rounded-lg border"
            >
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <HugeiconsIcon icon={Calendar} />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <HugeiconsIcon icon={Smile} />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <HugeiconsIcon icon={Calculator} />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <HugeiconsIcon icon={User} />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <HugeiconsIcon icon={CreditCard} />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <HugeiconsIcon icon={Settings} />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            <Code
              variant="block"
              language="tsx"
              code={exampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="trigger"
        title="Trigger"
        description={
          <>
            Opens the palette in a dialog using <Code>CommandDialog</Code> with{" "}
            <Code>open</Code> and <Code>onOpenChange</Code>. Use this as the
            canonical starting configuration after Command has been approved for
            the product.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="w-fit"
              >
                Open command
              </Button>
              <CommandDialog open={open} onOpenChange={setOpen}>
                <Command label="Quick actions">
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <HugeiconsIcon icon={Calendar} />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <HugeiconsIcon icon={Smile} />
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem>
                        <HugeiconsIcon icon={Calculator} />
                        <span>Calculator</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <HugeiconsIcon icon={User} />
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <HugeiconsIcon icon={CreditCard} />
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <HugeiconsIcon icon={Settings} />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CommandDialog>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={triggerSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Compose a searchable, keyboard-friendly list. Do not restyle the command chrome."
      >
        <DocsDoDont
          doItems={[
            <>
              Use <Code>CommandInput</Code> to label what can be searched.
            </>,
            <>
              Group related items with a clear <Code>heading</Code>.
            </>,
            <>
              Use <Code>CommandEmpty</Code> to explain when no items match.
            </>,
            <>
              Use <Code>CommandDialog</Code> when the palette opens over the
              page.
            </>,
          ]}
          dontItems={[
            <>
              Don’t invent an app-wide command palette until product ships one.
            </>,
            <>
              Don’t use visual styling alone to distinguish groups; provide
              headings and separators.
            </>,
            <>
              Don’t place a modal command list in a plain <Code>Command</Code>;
              use <Code>CommandDialog</Code>.
            </>,
            <>
              Don’t use Command for an inline form value. Use a{" "}
              <DocsPageLink to="/components/combobox">Combobox</DocsPageLink>.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Command."
      >
        <ChildSection
          id="api-command"
          title="Command"
          description="Props on Command."
        >
          <DocsApiTable
            rows={[
              {
                name: "label",
                type: "string",
                defaultValue: '"Command menu"',
                description:
                  "Provides the accessible name for the searchable command menu.",
              },
              {
                name: "value",
                type: "string",
                description: "Controls the currently selected command value.",
              },
              {
                name: "onValueChange",
                type: "(value: string) => void",
                description:
                  "Runs when keyboard or pointer navigation changes the selected value.",
              },
              {
                name: "loop",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Moves from the final item to the first, and vice versa, during keyboard navigation.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-command-list"
          title="CommandList"
          description="Props on CommandList."
        >
          <DocsApiTable
            rows={[
              {
                name: "label",
                type: "string",
                defaultValue: '"Suggestions"',
                description:
                  "Provides the accessible name for the results list.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-command-item"
          title="CommandItem"
          description="Props on CommandItem."
        >
          <DocsApiTable
            rows={[
              {
                name: "value",
                type: "string",
                description: "Provides the item’s stable searchable value.",
              },
              {
                name: "keywords",
                type: "string[]",
                description: "Adds alternative terms that can match the item.",
              },
              {
                name: "onSelect",
                type: "(value: string) => void",
                description:
                  "Runs the product-owned action when the item is selected.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-command-dialog"
          title="CommandDialog"
          description="Props on CommandDialog."
        >
          <DocsApiTable
            rows={[
              {
                name: "title",
                type: "string",
                defaultValue: '"Command Palette"',
                description: "Provides the accessible dialog title.",
              },
              {
                name: "description",
                type: "string",
                defaultValue: '"Search for a command to run..."',
                description: "Provides the accessible dialog description.",
              },
              {
                name: "showCloseButton",
                type: "boolean",
                defaultValue: "false",
                description: "Shows the dialog close button.",
              },
              {
                name: "open",
                type: "boolean",
                description: "Controls whether the command dialog is open.",
              },
              {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                description: "Runs when the command dialog opens or closes.",
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
              <DocsExternalLink href="https://github.com/dip/cmdk">
                cmdk API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/command">
                Shadcn Command documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use another component when the content is not a searchable action list."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink> —
            when filtering options in an inline field.
          </li>
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> — when
            modal content is not a searchable list.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
