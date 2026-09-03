import * as React from "react";
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
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@gecko/ui/components/context-menu";
import {
  FolderIcon,
  InboxIcon,
  LifeBuoyIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

export function ContextMenuPage() {
  const [user, setUser] = React.useState("pedro");
  const [theme, setTheme] = React.useState("light");

  const importSnippet = `import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@gecko/ui/components/context-menu"`;

  const compositionSnippet = `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent`;

  const basicSnippet = `<ContextMenu>
  <ContextMenuTrigger>
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

  const submenuSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuItem>
        Copy
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Cut
        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuGroup>
          <ContextMenuItem>Save Page...</ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`;

  const shortcutsSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem disabled>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuItem>
        Save
        <ContextMenuShortcut>⌘S</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Save As...
        <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`;

  const groupsSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuLabel>File</ContextMenuLabel>
      <ContextMenuItem>
        New File
        <ContextMenuShortcut>⌘N</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Open File
        <ContextMenuShortcut>⌘O</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Save
        <ContextMenuShortcut>⌘S</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuLabel>Edit</ContextMenuLabel>
      <ContextMenuItem>
        Undo
        <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Redo
        <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuItem>
        Cut
        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Copy
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Paste
        <ContextMenuShortcut>⌘V</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuItem variant="destructive">
        Delete
        <ContextMenuShortcut>⌫</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`;

  const iconsSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      <UserIcon />
      Profile
    </ContextMenuItem>
    <ContextMenuItem>
      <InboxIcon />
      Inbox
    </ContextMenuItem>
    <ContextMenuItem>
      <FolderIcon />
      Files
    </ContextMenuItem>
    <ContextMenuItem>
      <LifeBuoyIcon />
      Support
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

  const checkboxSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuCheckboxItem defaultChecked>
        Show Bookmarks Bar
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem defaultChecked>
        Show Developer Tools
      </ContextMenuCheckboxItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`;

  const radioSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuLabel>People</ContextMenuLabel>
      <ContextMenuRadioGroup value={user} onValueChange={setUser}>
        <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuLabel>Theme</ContextMenuLabel>
      <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
        <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
        <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
        <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`;

  const destructiveSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuItem>
        <PencilIcon />
        Edit
      </ContextMenuItem>
      <ContextMenuItem>
        <ShareIcon />
        Share
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuItem variant="destructive">
        <TrashIcon />
        Delete
      </ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Context menu"
        description="The Context menu shows actions for whatever someone right-clicked or long-pressed. It stays out of the way until it is needed."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Context menu exclusively on{" "}
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            rows — right-click or long-press reveals row actions for that item.
            <br />
            <br />
            Avoid using it elsewhere in the product, or as the only way to reach
            important actions. For actions on a visible button, use a{" "}
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>
            . The examples below demonstrate the available Context menu parts
            against a neutral trigger; they are capability references, not Gecko
            application recipes.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Context menu and its parts to compose a right-click menu."
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
          description="The trigger is the thing people click. The content holds the actions, which can be grouped, nested, or marked as destructive."
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
            A simple menu using <Code>ContextMenuTrigger</Code> and{" "}
            <Code>ContextMenuItem</Code>. A short, flat list is the canonical
            menu structure for an approved Data table row integration.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
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
        id="submenu"
        title="Submenu"
        description={
          <>
            Nests more actions using <Code>ContextMenuSub</Code>,{" "}
            <Code>ContextMenuSubTrigger</Code>, and{" "}
            <Code>ContextMenuSubContent</Code>. Use this when a parent action
            has a second list of options.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuItem>
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Cut
                    <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuGroup>
                      <ContextMenuItem>Save Page...</ContextMenuItem>
                      <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                      <ContextMenuItem>Name Window...</ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem>Developer Tools</ContextMenuItem>
                    </ContextMenuGroup>
                    <ContextMenuSeparator />
                    <ContextMenuGroup>
                      <ContextMenuItem variant="destructive">
                        Delete
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={submenuSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="shortcuts"
        title="Shortcuts"
        description={
          <>
            Shows a keyboard hint using <Code>ContextMenuShortcut</Code>. Use
            this only when the product already implements that shortcut; this
            component displays the hint but does not register it.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuItem>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem disabled>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>
                    Save
                    <ContextMenuShortcut>⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Save As...
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={shortcutsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="groups"
        title="Groups"
        description={
          <>
            Groups related actions with <Code>ContextMenuGroup</Code>,{" "}
            <Code>ContextMenuLabel</Code>, and <Code>ContextMenuSeparator</Code>
            . Use this when the menu has more than one kind of action.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuLabel>File</ContextMenuLabel>
                  <ContextMenuItem>
                    New File
                    <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Open File
                    <ContextMenuShortcut>⌘O</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Save
                    <ContextMenuShortcut>⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuLabel>Edit</ContextMenuLabel>
                  <ContextMenuItem>
                    Undo
                    <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Redo
                    <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>
                    Cut
                    <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Paste
                    <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem variant="destructive">
                    Delete
                    <ContextMenuShortcut>⌫</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={groupsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="icons"
        title="Icons"
        description="Place an icon as the first child of the item. Use this when a symbol helps people recognise the action at a glance."
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <UserIcon />
                  Profile
                </ContextMenuItem>
                <ContextMenuItem>
                  <InboxIcon />
                  Inbox
                </ContextMenuItem>
                <ContextMenuItem>
                  <FolderIcon />
                  Files
                </ContextMenuItem>
                <ContextMenuItem>
                  <LifeBuoyIcon />
                  Support
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={iconsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="checkbox"
        title="Checkbox"
        description={
          <>
            A toggle in the menu using <Code>ContextMenuCheckboxItem</Code>. Use
            this for options that can be on or off independently.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuCheckboxItem defaultChecked>
                    Show Bookmarks Bar
                  </ContextMenuCheckboxItem>
                  <ContextMenuCheckboxItem>
                    Show Full URLs
                  </ContextMenuCheckboxItem>
                  <ContextMenuCheckboxItem defaultChecked>
                    Show Developer Tools
                  </ContextMenuCheckboxItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={checkboxSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="radio"
        title="Radio"
        description={
          <>
            A single choice using <Code>ContextMenuRadioGroup</Code> and{" "}
            <Code>ContextMenuRadioItem</Code>. Use this when only one option in
            the set can be selected.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuLabel>People</ContextMenuLabel>
                  <ContextMenuRadioGroup value={user} onValueChange={setUser}>
                    <ContextMenuRadioItem value="pedro">
                      Pedro Duarte
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="colm">
                      Colm Tuite
                    </ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuLabel>Theme</ContextMenuLabel>
                  <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <ContextMenuRadioItem value="light">
                      Light
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="dark">
                      Dark
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="system">
                      System
                    </ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={radioSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="destructive"
        title="Destructive"
        description={
          <>
            A high-risk action using{" "}
            <Code>variant=&quot;destructive&quot;</Code> on{" "}
            <Code>ContextMenuItem</Code>. Use this when the risk should be
            visible before someone clicks. Selecting an irreversible action
            opens an Alert dialog for confirmation rather than performing it
            immediately.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuItem>
                    <PencilIcon />
                    Edit
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <ShareIcon />
                    Share
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem variant="destructive">
                    <TrashIcon />
                    Delete
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
            <Code
              variant="block"
              language="tsx"
              code={destructiveSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep contextual actions scannable and keyboard accessible. Do not restyle the menu chrome."
      >
        <DocsDoDont
          doItems={[
            <>
              Use groups, labels, and separators to organise related actions.
            </>,
            <>
              Use <Code>ContextMenuShortcut</Code> to show an available keyboard
              shortcut.
            </>,
            <>
              Use checkbox items for independent toggles and radio items for one
              choice.
            </>,
            <>
              Use <Code>variant=&quot;destructive&quot;</Code> for the
              demonstrated high-risk action.
            </>,
          ]}
          dontItems={[
            <>Don’t use Context menu outside Data table rows in Gecko.</>,
            <>Don’t rely on icons alone; keep a text label on every item.</>,
            <>
              Don’t make an unavailable action look active; use{" "}
              <Code>disabled</Code>.
            </>,
            <>
              Don’t place the primary route to an action only in a context menu.
            </>,
            <>
              Don’t perform an irreversible destructive action directly; open an{" "}
              <DocsPageLink to="/components/alert-dialog">
                Alert dialog
              </DocsPageLink>
              .
            </>,
            <>
              Don’t use a context menu when a visible button should open the
              list. Use a{" "}
              <DocsPageLink to="/components/dropdown-menu">
                Dropdown menu
              </DocsPageLink>
              .
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Context menu."
      >
        <ChildSection
          id="api-context-menu"
          title="ContextMenu"
          description="Props on ContextMenu."
        >
          <DocsApiTable
            rows={[
              {
                name: "defaultOpen",
                type: "boolean",
                defaultValue: "false",
                description: "Sets the initial uncontrolled open state.",
              },
              {
                name: "open",
                type: "boolean",
                description: "Controls whether the menu is open.",
              },
              {
                name: "onOpenChange",
                type: "(open: boolean, details) => void",
                description: "Runs when the menu opens or closes.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Prevents the complete Context menu from opening.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-context-menu-content"
          title="ContextMenuContent"
          description="Props on ContextMenuContent."
        >
          <DocsApiTable
            rows={[
              {
                name: "side",
                type: '"inline-start" | "inline-end" | "top" | "bottom" | "left" | "right"',
                defaultValue: '"inline-end"',
                description:
                  "Sets the preferred logical side of the pointer anchor.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"start"',
                description: "Aligns the menu along its preferred side.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-context-menu-item"
          title="ContextMenuItem"
          description="Props on ContextMenuItem."
        >
          <DocsApiTable
            rows={[
              {
                name: "onClick",
                type: "(event) => void",
                description: "Runs the product-owned action for the item.",
              },
              {
                name: "variant",
                type: '"default" | "destructive"',
                defaultValue: '"default"',
                description: "Sets the ContextMenuItem emphasis.",
              },
              {
                name: "inset",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Indents a ContextMenuItem to align with items that have leading content.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes an item unavailable.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-context-menu-sub-trigger"
          title="ContextMenuSubTrigger"
          description="Props on ContextMenuSubTrigger."
        >
          <DocsApiTable
            rows={[
              {
                name: "inset",
                type: "boolean",
                defaultValue: "false",
                description: "Indents a submenu trigger.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-context-menu-checkbox-item"
          title="ContextMenuCheckboxItem"
          description="Props on ContextMenuCheckboxItem."
        >
          <DocsApiTable
            rows={[
              {
                name: "checked",
                type: "boolean",
                description:
                  "Controls whether an independent option is enabled.",
              },
              {
                name: "onCheckedChange",
                type: "(checked: boolean) => void",
                description: "Reports changes to an independent option.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-context-menu-radio-group"
          title="ContextMenuRadioGroup"
          description="Props on ContextMenuRadioGroup."
        >
          <DocsApiTable
            rows={[
              {
                name: "value",
                type: "unknown",
                description:
                  "Controls the selected value in a single-choice group.",
              },
              {
                name: "onValueChange",
                type: "(value: unknown) => void",
                description: "Reports changes to a single-choice group.",
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
              <DocsExternalLink href="https://base-ui.com/react/components/context-menu">
                Base UI Context Menu API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/context-menu">
                Shadcn Context Menu documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use another overlay when the actions need a visible trigger or more space."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — when a button should open the actions.
          </li>
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> — when
            the interaction needs explanatory or structured content.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
