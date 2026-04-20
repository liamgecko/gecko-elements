import * as React from "react"
import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  CreditCardIcon,
  PencilIcon,
  SettingsIcon,
  ShareIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react"

export function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(true)
  const [showPanel, setShowPanel] = React.useState(true)
  const [position, setPosition] = React.useState<"top" | "bottom" | "right">("bottom")

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Dropdown menu</h1>
          <p className="text-sm text-muted-foreground">
            Shows a list of actions in a compact popover anchored to a trigger button.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Wrap a trigger button with{" "}
            <Code>DropdownMenu</Code> and{" "}
            <Code>DropdownMenuTrigger</Code> to open{" "}
            <Code>DropdownMenuContent</Code>{" "}
            containing{" "}
            <Code>DropdownMenuItem</Code>{" "}
            options.
          </p>
          <ComponentExample>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem>API</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="submenu" label="Submenu">
          <h2 className="text-lg font-semibold">Submenu</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>DropdownMenuSub</Code>,{" "}
            <Code>DropdownMenuSubTrigger</Code>{" "}
            and{" "}
            <Code>DropdownMenuSubContent</Code>{" "}
            to nest secondary actions inside a parent item.
          </p>
          <ComponentExample>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>Calendly</DropdownMenuItem>
                              <DropdownMenuItem>Slack</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Webhook</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Advanced...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    New Team
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="shortcuts" label="Shortcuts">
          <h2 className="text-lg font-semibold">Shortcuts</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add{" "}
            <Code>DropdownMenuShortcut</Code>{" "}
            to show keyboard hints alongside actions.
          </p>
          <ComponentExample>
            <DropdownMenu>
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
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="icons" label="Icons">
          <h2 className="text-lg font-semibold">Icons</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine icons and text inside{" "}
            <Code>DropdownMenuItem</Code>{" "}
            to make actions easier to scan.
          </p>
          <ComponentExample>
            <DropdownMenu>
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
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="avatars" label="Avatars">
          <h2 className="text-lg font-semibold">Avatars</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use an avatar inside{" "}
            <Code>DropdownMenuItem</Code>{" "}
            for user switchers or account lists. Pair with <Code>size=&quot;md&quot;</Code> for a compact row.
          </p>
          <ComponentExample>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Avatar size="md">
                    <AvatarImage src="https://picsum.photos/seed/avatar/200" alt="" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  John Doe
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Avatar size="md">
                    <AvatarImage src="https://picsum.photos/seed/avatar2/200" alt="" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  Alice Brown
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Avatar size="md">
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  Sam King
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="checkbox" label="Checkbox">
          <h2 className="text-lg font-semibold">Checkbox</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              DropdownMenuCheckboxItem
            </Code>{" "}
            for toggles that control independent state.
          </p>
          <ComponentExample>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
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
          </ComponentExample>
        </PageSection>

        <PageSection id="radio-group" label="Radio group">
          <h2 className="text-lg font-semibold">Radio group</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              DropdownMenuRadioGroup
            </Code>{" "}
            when the user must choose a single option from a set.
          </p>
          <ComponentExample>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="destructive" label="Destructive">
          <h2 className="text-lg font-semibold">Destructive</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Mark dangerous actions with{" "}
            <Code>
              variant=&quot;destructive&quot;
            </Code>{" "}
            so they stand out from other items.
          </p>
          <ComponentExample>
            <DropdownMenu>
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
            </DropdownMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="search" label="Search">
          <h2 className="text-lg font-semibold">Search</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              searchable
            </Code>{" "}
            prop on{" "}
            <Code>
              DropdownMenu
            </Code>{" "}
            to add a search field and filter items by label. The search bar and item
            container are added automatically—no need for{" "}
            <Code>
              DropdownMenuSearch
            </Code>{" "}
            or utility classes.
          </p>
          <ComponentExample>
            <DropdownMenu searchable searchPlaceholder="Search...">
              <DropdownMenuTrigger render={<Button variant="outline" dropdown>Open dropdown</Button>} />
              <DropdownMenuContent className="w-64">
                <DropdownMenuItem>Dropdown item one</DropdownMenuItem>
                <DropdownMenuItem>Dropdown item two</DropdownMenuItem>
                <DropdownMenuItem>Another option</DropdownMenuItem>
                <DropdownMenuItem>Final item</DropdownMenuItem>
                <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
