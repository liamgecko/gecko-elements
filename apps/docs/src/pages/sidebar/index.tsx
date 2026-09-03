import * as React from "react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible";
import { Code } from "@gecko/ui/components/code";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@gecko/ui/components/sidebar";
import {
  BookOpen,
  Box,
  Home,
  Layers,
  LifeBuoy,
  Package,
  Settings,
  Wrench,
} from "lucide-react";

const exampleShellClassName = "h-[420px] overflow-hidden p-0";

function SidebarExampleLayout({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      persistState={false}
      className="flex h-full min-h-0 w-full"
    >
      <div className="relative flex h-full min-h-0 w-full overflow-hidden">
        <Sidebar
          className="absolute inset-y-0 left-0 z-20 h-full max-h-full"
          collapsible="icon"
        >
          <SidebarContent>{children}</SidebarContent>
        </Sidebar>
        <SidebarInset className="bg-background">
          <header className="flex h-12 shrink-0 items-center gap-2 px-3">
            <SidebarTrigger />
          </header>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function BasicSidebarDemo() {
  return (
    <SidebarExampleLayout>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#home" />} isActive>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#settings" />}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarExampleLayout>
  );
}

function CollapsedByDefaultDemo() {
  return (
    <SidebarExampleLayout defaultOpen={false}>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#home" />} isActive>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Package />
                <span>Products</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#catalog">
                    <span>Catalog</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#inventory">
                    <span>Inventory</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#orders">
                    <span>Orders</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#settings" />}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarExampleLayout>
  );
}

function SidebarGroupDemo() {
  return (
    <SidebarExampleLayout>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#overview" />}>
                <Layers />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#design" />}>
                <Box />
                <span>Design</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Resources</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#documentation" />}>
                <BookOpen />
                <span>Documentation</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#toolbox" />}>
                <Wrench />
                <span>Toolbox</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarExampleLayout>
  );
}

function SidebarSubMenuDemo() {
  return (
    <SidebarExampleLayout>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="#home" />}>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Package />
                <span>Products</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#catalog">
                    <span>Catalog</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#inventory">
                    <span>Inventory</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#orders">
                    <span>Orders</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarExampleLayout>
  );
}

function SidebarCollapsibleSubMenuDemo() {
  return (
    <SidebarExampleLayout>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Collapsible className="min-w-0 w-full" defaultOpen>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton className="group w-full">
                      <Package />
                      <span>Products</span>
                    </SidebarMenuButton>
                  }
                />
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#catalog">
                        <span>Catalog</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#inventory" isActive>
                        <span>Inventory</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#orders">
                        <span>Orders</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Collapsible className="min-w-0 w-full">
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton className="group w-full">
                      <LifeBuoy />
                      <span>Support</span>
                    </SidebarMenuButton>
                  }
                />
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#docs">
                        <span>Documentation</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#contact">
                        <span>Contact</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarExampleLayout>
  );
}

export function SidebarPage() {
  const importSnippet = `import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@gecko/ui/components/sidebar"`;

  const compositionSnippet = `SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   │   └── SidebarInput
│   ├── SidebarContent
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel
│   │       ├── SidebarGroupAction
│   │       └── SidebarGroupContent
│   │           └── SidebarMenu
│   │               └── SidebarMenuItem
│   │                   ├── SidebarMenuButton
│   │                   ├── SidebarMenuAction
│   │                   ├── SidebarMenuBadge
│   │                   └── SidebarMenuSub
│   │                       └── SidebarMenuSubItem
│   │                           └── SidebarMenuSubButton
│   ├── SidebarFooter
│   └── SidebarRail
└── SidebarInset
    └── SidebarTrigger`;

  const basicExampleSnippet = `<SidebarProvider defaultOpen>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="/home" />} isActive>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href="/settings" />}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`;

  const collapsedByDefaultSnippet = `<SidebarProvider defaultOpen={false}>
  <Sidebar collapsible="icon">
    <SidebarContent>{/* navigation */}</SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`;

  const sidebarGroupSnippet = `<SidebarGroup>
  <SidebarGroupLabel>Platform</SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton render={<a href="#overview" />}>
          <Layers />
          <span>Overview</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
<SidebarGroup>
  <SidebarGroupLabel>Resources</SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>{/* more items */}</SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>`;

  const subMenuSnippet = `<SidebarMenuItem>
  <SidebarMenuButton>
    <Package />
    <span>Products</span>
  </SidebarMenuButton>
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton href="#catalog">
        <span>Catalog</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton href="#inventory">
        <span>Inventory</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>`;

  const collapsibleSubMenuSnippet = `<SidebarMenuItem>
  <Collapsible defaultOpen>
    <CollapsibleTrigger
      render={
        <SidebarMenuButton className="group w-full">
          <Package />
          <span>Products</span>
        </SidebarMenuButton>
      }
    />
    <CollapsibleContent>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton href="#catalog">
            <span>Catalog</span>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </CollapsibleContent>
  </Collapsible>
</SidebarMenuItem>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Sidebar"
        description="Sidebar is the low-level navigation foundation used by App Sidebar. It documents the available structure and behaviour for maintaining the product shell; application teams should normally compose App Sidebar instead."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use{" "}
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            for app-wide product navigation alongside{" "}
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink>
            . Sidebar supplies its provider, rail, groups, menus, collapsed
            behaviour, and layout inset. Treat this page as the maintenance
            reference for that foundation rather than an alternative product
            navigation component.
            <br />
            <br />
            Avoid using Sidebar as a conversation list — that is{" "}
            <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink>.
            Avoid using it for a page header — use{" "}
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink>{" "}
            instead. Each reference example uses its own{" "}
            <Code>SidebarProvider</Code> so it does not replace the site shell.
            Product applications should wrap the root layout once.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import these parts when maintaining App Sidebar or another approved shell composition."
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
          description="The provider holds state. Sidebar contains grouped menus; SidebarInset holds the main page with a trigger to open or collapse the rail."
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
            A minimal icon-collapsible rail with two destinations and a main
            content column.
          </>
        }
      >
        <div className="space-y-6">
          <ComponentExample className={exampleShellClassName}>
            <BasicSidebarDemo />
          </ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={basicExampleSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </div>
      </MainSection>

      <MainSection
        id="collapsed-by-default"
        title="Collapsed by default"
        description={
          <>
            Starts with the rail collapsed. Sub-menus remain available by hover,
            click, and keyboard when only their parent icon is visible.
          </>
        }
      >
        <div className="space-y-6">
          <ComponentExample className={exampleShellClassName}>
            <CollapsedByDefaultDemo />
          </ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={collapsedByDefaultSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </div>
      </MainSection>

      <MainSection
        id="sidebar-group"
        title="Sidebar group"
        description={
          <>
            Sections the menu with <Code>SidebarGroup</Code>,{" "}
            <Code>SidebarGroupLabel</Code>, and <Code>SidebarGroupContent</Code>
            . Use this when navigation should be split into labelled sections
            such as Platform and Resources.
          </>
        }
      >
        <div className="space-y-6">
          <ComponentExample className={exampleShellClassName}>
            <SidebarGroupDemo />
          </ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={sidebarGroupSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </div>
      </MainSection>

      <MainSection
        id="sub-menu"
        title="Sub-menu"
        description={
          <>
            Nests child links with <Code>SidebarMenuSub</Code> under a{" "}
            <Code>SidebarMenuItem</Code>. Use <Code>SidebarMenuSubButton</Code>{" "}
            for indented items. Use this when a top-level item has secondary
            destinations. Sub-menus hide automatically when the rail is
            collapsed to icons.
          </>
        }
      >
        <div className="space-y-6">
          <ComponentExample className={exampleShellClassName}>
            <SidebarSubMenuDemo />
          </ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={subMenuSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </div>
      </MainSection>

      <MainSection
        id="collapsible-sub-menu"
        title="Collapsible sub-menu"
        description={
          <>
            Expands and collapses a section using <Code>Collapsible</Code>{" "}
            inside <Code>SidebarMenuItem</Code>. Pass a{" "}
            <Code>SidebarMenuButton</Code> to <Code>CollapsibleTrigger</Code>{" "}
            via the <Code>render</Code> prop, then place{" "}
            <Code>SidebarMenuSub</Code> inside <Code>CollapsibleContent</Code>.
            Use this when a section should expand and collapse in place instead
            of always showing its children.
          </>
        }
      >
        <div className="space-y-6">
          <ComponentExample className={exampleShellClassName}>
            <SidebarCollapsibleSubMenuDemo />
          </ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={collapsibleSubMenuSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </div>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep app navigation structured, recognisable, and usable when collapsed."
      >
        <DocsDoDont
          doItems={[
            <>
              Wrap the layout once in <Code>SidebarProvider</Code>.
            </>,
            <>
              Group related destinations with <Code>SidebarGroup</Code> and a
              clear <Code>SidebarGroupLabel</Code>.
            </>,
            <>
              Mark the current destination with <Code>isActive</Code> on{" "}
              <Code>SidebarMenuButton</Code>.
            </>,
            <>
              Use the icon-collapsible treatment only when menu icons remain
              recognisable without labels.
            </>,
          ]}
          dontItems={[
            <>
              Don’t create a separate provider for each group in the app layout.
            </>,
            <>
              Don’t use Sidebar for conversation rows. Use{" "}
              <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink>.
            </>,
            <>Don’t use Sidebar for a page header or temporary panel.</>,
            <>Don’t add sub-menus when a flat list is easier to scan.</>,
            <>
              Don’t rely on icons alone if destinations cannot be distinguished
              when collapsed.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Sidebar."
      >
        <ChildSection
          id="api-sidebar-provider"
          title="SidebarProvider"
          description="Owns the shared open state, persistence, and keyboard shortcut."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "defaultOpen",
                  type: "boolean",
                  defaultValue: "true",
                  description: "Sets the initial uncontrolled open state.",
                },
                {
                  name: "open",
                  type: "boolean",
                  description: "Controls the open state.",
                },
                {
                  name: "onOpenChange",
                  type: "(open: boolean) => void",
                  description: "Runs when the open state changes.",
                },
                {
                  name: "persistState",
                  type: "boolean",
                  defaultValue: "true",
                  description:
                    "Restores and writes the open state using a cookie.",
                },
                {
                  name: "enableKeyboardShortcut",
                  type: "boolean",
                  defaultValue: "true",
                  description:
                    "Enables the platform shortcut for toggling the rail.",
                },
                {
                  name: "storageKey",
                  type: "string",
                  defaultValue: '"sidebar_state"',
                  description: "Sets the cookie name used for persisted state.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-sidebar"
          title="Sidebar"
          description="Places and presents the navigation rail."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "side",
                  type: '"left" | "right"',
                  defaultValue: '"left"',
                  description:
                    "Places the navigation on either side of the layout.",
                },
                {
                  name: "variant",
                  type: '"sidebar" | "floating" | "inset"',
                  defaultValue: '"sidebar"',
                  description:
                    "Controls how the rail sits against the app content.",
                },
                {
                  name: "collapsible",
                  type: '"offcanvas" | "icon" | "none"',
                  defaultValue: '"offcanvas"',
                  description:
                    "Chooses how the navigation behaves when closed.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-sidebar-menu-button"
          title="SidebarMenuButton"
          description="Renders a primary destination or disclosure control."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "isActive",
                  type: "boolean",
                  defaultValue: "false",
                  description: "Marks the current destination.",
                },
                {
                  name: "variant",
                  type: '"default" | "outline"',
                  defaultValue: '"default"',
                  description: "Sets the approved visual treatment.",
                },
                {
                  name: "size",
                  type: '"sm" | "default" | "lg"',
                  defaultValue: '"default"',
                  description: "Sets the menu row size.",
                },
                {
                  name: "tooltip",
                  type: "string | TooltipContentProps",
                  description:
                    "Labels an icon-only destination while collapsed.",
                },
                {
                  name: "chevron",
                  type: "boolean",
                  description:
                    "Overrides automatic disclosure-chevron visibility.",
                },
                {
                  name: "render",
                  type: "ReactElement | render callback",
                  description:
                    "Renders a destination as a link or router link.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-sidebar-menu-action"
          title="SidebarMenuAction"
          description="Places a secondary action beside a menu destination."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "showOnHover",
                  type: "boolean",
                  defaultValue: "false",
                  description:
                    "Reveals the action on hover and keyboard focus.",
                },
                {
                  name: "render",
                  type: "ReactElement | render callback",
                  description:
                    "Composes another interactive primitive as the action.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-sidebar-menu-skeleton"
          title="SidebarMenuSkeleton"
          description="Represents a loading menu row."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "showIcon",
                  type: "boolean",
                  defaultValue: "false",
                  description: "Includes an icon placeholder.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-sidebar-menu-sub-button"
          title="SidebarMenuSubButton"
          description="Renders a nested destination."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "size",
                  type: '"sm" | "md"',
                  defaultValue: '"md"',
                  description: "Sets the nested row size.",
                },
                {
                  name: "isActive",
                  type: "boolean",
                  defaultValue: "false",
                  description: "Marks the current nested destination.",
                },
                {
                  name: "render",
                  type: "ReactElement | render callback",
                  description:
                    "Renders a custom link while preserving menu styling.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-use-sidebar"
          title="useSidebar"
          description="Reads and controls the nearest provider."
        >
          <DocsApiTable
            rows={[
              {
                name: "state",
                type: '"expanded" | "collapsed"',
                description: "Current visual state.",
              },
              {
                name: "open",
                type: "boolean",
                description: "Whether the desktop rail is open.",
              },
              {
                name: "setOpen",
                type: "(open: boolean) => void",
                description: "Sets the desktop open state.",
              },
              {
                name: "openMobile",
                type: "boolean",
                description: "Whether the compact Sheet is open.",
              },
              {
                name: "setOpenMobile",
                type: "(open: boolean) => void",
                description: "Sets the compact Sheet open state.",
              },
              {
                name: "isMobile",
                type: "boolean",
                description: "Reports whether the compact layout is active.",
              },
              {
                name: "toggleSidebar",
                type: "() => void",
                description: "Toggles the active desktop or compact rail.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/sidebar">
                Shadcn Sidebar documentation
              </DocsExternalLink>{" "}
              for the source composition and complete upstream reference.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a temporary panel or contained scroller when persistent navigation is not needed."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            — the product navigation composition built from Sidebar.
          </li>
          <li>
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> —
            sticky product chrome above the rail.
          </li>
          <li>
            <DocsPageLink to="/components/sheet">Sheet</DocsPageLink> — for a
            temporary panel.
          </li>
          <li>
            <DocsPageLink to="/components/scroll-area">
              Scroll area
            </DocsPageLink>{" "}
            — for a bounded scrollable region.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
