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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
import { Button } from "@gecko/ui/components/button";
import {
  CreditCardIcon,
  PencilIcon,
  SettingsIcon,
  ShareIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

export function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(true);
  const [showPanel, setShowPanel] = React.useState(true);
  const [position, setPosition] = React.useState<"top" | "bottom" | "right">(
    "bottom",
  );

  const importSnippet = `import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"`;

  const compositionSnippet = `DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent`;

  const basicSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>GitHub</DropdownMenuItem>
    <DropdownMenuItem>Support</DropdownMenuItem>
    <DropdownMenuItem>API</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const submenuSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
          <DropdownMenuItem>Message</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Calendly</DropdownMenuItem>
              <DropdownMenuItem>Slack</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Webhook</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Advanced...</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem>New Team</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

  const shortcutsSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

  const iconsSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>
      <UserIcon />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CreditCardIcon />
      Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SettingsIcon />
      Settings
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const avatarsSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Avatar name="John Doe" size="md">
        <AvatarImage src={src} />
      </Avatar>
      John Doe
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const checkboxSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuCheckboxItem
        checked={showStatusBar}
        onCheckedChange={setShowStatusBar}
      >
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
        disabled
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showPanel}
        onCheckedChange={setShowPanel}
      >
        Panel
      </DropdownMenuCheckboxItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

  const radioSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

  const destructiveSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <PencilIcon />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ShareIcon />
        Share
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem variant="destructive">
        <TrashIcon />
        Delete
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

  const searchSnippet = `<DropdownMenu searchable searchPlaceholder="Search actions...">
  <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>Dropdown item one</DropdownMenuItem>
    <DropdownMenuItem>Dropdown item two</DropdownMenuItem>
    <DropdownMenuItem>Another option</DropdownMenuItem>
    <DropdownMenuItem>Final item</DropdownMenuItem>
    <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
  </DropdownMenuContent>
</DropdownMenu>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Dropdown menu"
        description="The Dropdown menu shows a list of actions from a button. People open it to pick an item, then it closes."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Dropdown menu for actions that belong to a visible control —
            Data table row actions, header menus, and similar. The trigger stays
            visible; the menu should not.
            <br />
            <br />
            Avoid using it for a choice in a form — that is a{" "}
            <DocsPageLink to="/components/select">Select</DocsPageLink>. On Data
            table rows, right-click or long-press actions use the{" "}
            <DocsPageLink to="/components/context-menu">
              Context menu
            </DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Dropdown menu and its parts to compose a list of actions."
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
          description="The trigger is the button people click. The content holds the actions, which can be grouped, nested, or marked as destructive."
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
            A simple menu using <Code>DropdownMenuTrigger</Code> and{" "}
            <Code>DropdownMenuItem</Code>. The trigger uses{" "}
            <Code>dropdown</Code> on <Code>Button</Code>. Use this when the
            actions are a short, flat list.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem>API</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            Nests more actions using <Code>DropdownMenuSub</Code>,{" "}
            <Code>DropdownMenuSubTrigger</Code>, and{" "}
            <Code>DropdownMenuSubContent</Code>. Use this when a parent action
            has a second list of options.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          More options
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Calendly</DropdownMenuItem>
                          <DropdownMenuItem>Slack</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Webhook</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Advanced...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
            Shows a keyboard hint using <Code>DropdownMenuShortcut</Code>. Use
            this when the action also has a shortcut people can learn.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
        id="icons"
        title="Icons"
        description="Place an icon as the first child of the item. Use this when a symbol helps people recognise the action at a glance."
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        id="avatars"
        title="Avatars"
        description={
          <>
            Places a person in the item using <Code>Avatar</Code> with{" "}
            <Code>size=&quot;md&quot;</Code>. Use this when the item represents
            a person.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Avatar name="John Doe" size="md">
                    <AvatarImage src="https://picsum.photos/seed/avatar/200" />
                  </Avatar>
                  John Doe
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Avatar name="Alice Brown" size="md">
                    <AvatarImage src="https://picsum.photos/seed/avatar2/200" />
                  </Avatar>
                  Alice Brown
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Avatar name="Sam King" size="md" />
                  Sam King
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Code
              variant="block"
              language="tsx"
              code={avatarsSnippet}
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
            A toggle in the menu using <Code>DropdownMenuCheckboxItem</Code>.
            Use this for options that can be on or off independently. A selected
            item shows a check, changing to a remove icon on hover or keyboard
            focus.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar ?? false}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
        id="radio-group"
        title="Radio group"
        description={
          <>
            A single choice using <Code>DropdownMenuRadioGroup</Code> and{" "}
            <Code>DropdownMenuRadioItem</Code>. Use this when only one option in
            the set can be selected.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      Right
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <Code>DropdownMenuItem</Code>. Use this when the risk should be
            visible before someone clicks.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShareIcon />
                    Share
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <TrashIcon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
        id="search"
        title="Search"
        description={
          <>
            Filters the list using <Code>searchable</Code> and{" "}
            <Code>searchPlaceholder</Code> on <Code>DropdownMenu</Code>. Pair
            with <Code>DropdownMenuEmpty</Code> when nothing matches. Use this
            when the list is long enough to search.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu searchable searchPlaceholder="Search actions...">
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Open dropdown
                  </Button>
                }
              />
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem>Dropdown item one</DropdownMenuItem>
                <DropdownMenuItem>Dropdown item two</DropdownMenuItem>
                <DropdownMenuItem>Another option</DropdownMenuItem>
                <DropdownMenuItem>Final item</DropdownMenuItem>
                <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
              </DropdownMenuContent>
            </DropdownMenu>
            <Code
              variant="block"
              language="tsx"
              code={searchSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep button-triggered actions concise and scannable. Do not restyle the menu chrome."
      >
        <DocsDoDont
          doItems={[
            <>
              Use a labelled button as <Code>DropdownMenuTrigger</Code>.
            </>,
            <>
              Use groups, labels, and separators to organise related actions.
            </>,
            <>
              Use checkbox items for independent toggles and radio items for one
              choice.
            </>,
            <>
              Use <Code>searchable</Code> with <Code>DropdownMenuEmpty</Code>{" "}
              for a long demonstrated list.
            </>,
          ]}
          dontItems={[
            <>Don’t rely on an icon or shortcut as the item’s only label.</>,
            <>
              Don’t use <Code>variant=&quot;destructive&quot;</Code> for
              ordinary actions.
            </>,
            <>
              Don’t use a Dropdown menu for selecting a form value. Use a{" "}
              <DocsPageLink to="/components/select">Select</DocsPageLink>.
            </>,
            <>
              Don’t override the menu radius, colours, shadow, or focus chrome
              with <Code>className</Code>.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Dropdown menu."
      >
        <DocsApiTable
          rows={[
            {
              name: "searchable",
              type: "boolean",
              defaultValue: "false",
              description: "Adds a search field and filters menu items.",
            },
            {
              name: "searchPlaceholder",
              type: "string",
              defaultValue: '"Search..."',
              description: "Sets the search field placeholder.",
            },
            {
              name: "searchLabel",
              type: "string",
              defaultValue: "searchPlaceholder",
              description: "Sets the accessible name for the search field.",
            },
            {
              name: "searchValue",
              type: "string",
              defaultValue: "item text",
              description:
                "Overrides the text used to match an item during search.",
            },
            {
              name: "checked",
              type: "boolean",
              defaultValue: "uncontrolled",
              description: "Controls a DropdownMenuCheckboxItem.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              defaultValue: "—",
              description: "Reports checkbox item state changes.",
            },
            {
              name: "value",
              type: "unknown",
              defaultValue: "—",
              description:
                "Identifies a radio item or controls the selected radio group value.",
            },
            {
              name: "variant",
              type: '"default" | "destructive"',
              defaultValue: '"default"',
              description: "Sets the DropdownMenuItem emphasis.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/menu">
                Base UI Menu API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/dropdown-menu">
                Shadcn Dropdown Menu documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use another list control when the trigger or interaction is different."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/context-menu">
              Context menu
            </DocsPageLink>{" "}
            — when actions open from a contextual pointer gesture.
          </li>
          <li>
            <DocsPageLink to="/components/command">Command</DocsPageLink> — when
            searching a larger palette of actions.
          </li>
          <li>
            <DocsPageLink to="/components/select">Select</DocsPageLink> — when
            choosing a form value.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
