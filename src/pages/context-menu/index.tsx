import * as React from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
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
} from "@/components/ui/context-menu"
import {
  FolderIcon,
  InboxIcon,
  LifeBuoyIcon,
  MailIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  Trash2Icon,
  TrashIcon,
  UserIcon,
} from "lucide-react"

export function ContextMenuPage() {

  const [user, setUser] = React.useState("pedro")
  const [theme, setTheme] = React.useState("light")

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Context Menu</h1>
          <p className="text-sm text-muted-foreground">
            Displays a menu of actions when users right-click or long-press on a trigger.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Wrap content with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenu
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuTrigger
            </code>{" "}
            to open a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuContent
            </code>{" "}
            with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuItem
            </code>{" "}
            options.
          </p>
          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="submenu" label="Submenu">
          <h2 className="text-lg font-semibold">Submenu</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuSub
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuSubTrigger
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuSubContent
            </code>{" "}
            to nest secondary actions inside a parent item.
          </p>
          <ComponentExample>
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
                      <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="shortcuts" label="Shortcuts">
          <h2 className="text-lg font-semibold">Shortcuts</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuShortcut
            </code>{" "}
            to show keyboard hints alongside actions.
          </p>
          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="groups" label="Groups">
          <h2 className="text-lg font-semibold">Groups</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Group related actions with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuGroup
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuLabel
            </code>
            , and separate them with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuSeparator
            </code>
            .
          </p>
          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="icons" label="Icons">
          <h2 className="text-lg font-semibold">Icons</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pair icons with labels to help users scan options quickly.
          </p>
          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="checkbox" label="Checkbox">
          <h2 className="text-lg font-semibold">Checkbox</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuCheckboxItem
            </code>{" "}
            for toggles such as visibility and notifications.
          </p>
          <ComponentExample>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right click here
              </ContextMenuTrigger>
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
            </ContextMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="radio" label="Radio">
          <h2 className="text-lg font-semibold">Radio</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuRadioGroup
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              ContextMenuRadioItem
            </code>{" "}
            for mutually exclusive choices.
          </p>
          <ComponentExample>
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
            </ContextMenu>
          </ComponentExample>
        </PageSection>

        <PageSection id="destructive" label="Destructive">
          <h2 className="text-lg font-semibold">Destructive</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Mark dangerous actions with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              variant=&quot;destructive&quot;
            </code>{" "}
            to draw attention.
          </p>
          <ComponentExample>
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
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
