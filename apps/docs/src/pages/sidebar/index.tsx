import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible"
import { Code } from "@gecko/ui/components/code"
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
} from "@gecko/ui/components/sidebar"
import {
  BookOpen,
  Box,
  ChevronRight,
  Home,
  Layers,
  LifeBuoy,
  Package,
  Settings,
  Wrench,
} from "lucide-react"

const exampleShellClassName = "h-[420px] overflow-hidden p-0"

function SidebarExampleLayout({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="flex h-full min-h-0 w-full">
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
  )
}

function BasicSidebarDemo() {
  return (
    <SidebarExampleLayout>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
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
  )
}

function CollapsedByDefaultDemo() {
  return (
    <SidebarExampleLayout defaultOpen={false}>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
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
  )
}

function SidebarGroupDemo() {
  return (
    <SidebarExampleLayout>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Layers />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
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
              <SidebarMenuButton>
                <BookOpen />
                <span>Documentation</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Wrench />
                <span>Toolbox</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarExampleLayout>
  )
}

function SidebarSubMenuDemo() {
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
  )
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
                      <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded:rotate-90" />
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
                      <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded:rotate-90" />
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
  )
}

export function SidebarPage() {
  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <h1 className="text-2xl font-bold text-foreground">Sidebar</h1>
        <p className="text-sm text-muted-foreground">
          A composable, collapsible sidebar for navigation and chrome. This
          project follows the same building blocks as{" "}
          <a
            className="font-medium text-primary underline-offset-4 hover:underline"
            href="https://ui.shadcn.com/docs/components/base/sidebar"
            rel="noreferrer"
            target="_blank"
          >
            shadcn/ui Sidebar
          </a>
          : wrap the layout in <Code>SidebarProvider</Code>, render{" "}
          <Code>Sidebar</Code> with <Code>SidebarHeader</Code>,{" "}
          <Code>SidebarContent</Code>, and groups, then place page content in{" "}
          <Code>SidebarInset</Code> with a <Code>SidebarTrigger</Code> in the
          header.
        </p>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <h2 className="text-lg font-semibold">Basic example</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          A minimal layout: icon-collapsible rail, two nav items, and a main
          column. The example uses its own <Code>SidebarProvider</Code> so it
          does not replace the site shell.
        </p>
        <ComponentExample className={exampleShellClassName}>
          <BasicSidebarDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="collapsed-by-default" label="Collapsed by default">
        <h2 className="text-lg font-semibold">Collapsed by default</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Set <Code>defaultOpen</Code> to <Code>false</Code> on{" "}
          <Code>SidebarProvider</Code> to start in icon-collapsed mode. This is
          useful when space is tight, and still supports sub-menus via the
          hover dropdown.
        </p>
        <ComponentExample className={exampleShellClassName}>
          <CollapsedByDefaultDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="sidebar-group" label="Sidebar group">
        <h2 className="text-lg font-semibold">Sidebar group</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Use <Code>SidebarGroup</Code> with <Code>SidebarGroupLabel</Code> and{" "}
          <Code>SidebarGroupContent</Code> to section the menu. Optional{" "}
          <Code>SidebarGroupAction</Code> adds a control in the group header row,{" "}
          and <Code>SidebarSeparator</Code> divides stacked groups.
        </p>
        <ComponentExample className={exampleShellClassName}>
          <SidebarGroupDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="sub-menu" label="Sub-menu">
        <h2 className="text-lg font-semibold">Sub-menu</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Nest <Code>SidebarMenuSub</Code> under a <Code>SidebarMenuItem</Code>{" "}
          (after the parent <Code>SidebarMenuButton</Code>) and use{" "}
          <Code>SidebarMenuSubItem</Code> with <Code>SidebarMenuSubButton</Code>{" "}
          for indented child links. Sub-menus hide automatically when the rail
          is collapsed to icons.
        </p>
        <ComponentExample className={exampleShellClassName}>
          <SidebarSubMenuDemo />
        </ComponentExample>
      </PageSection>

      <PageSection
        id="collapsible-sub-menu"
        label="Collapsible sub-menu"
      >
        <h2 className="text-lg font-semibold">Collapsible sub-menu</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Wrap a <Code>Collapsible</Code> inside <Code>SidebarMenuItem</Code>, use{" "}
          <Code>CollapsibleTrigger</Code> with a <Code>SidebarMenuButton</Code>{" "}
          via the <Code>render</Code> prop, and put <Code>SidebarMenuSub</Code>{" "}
          inside <Code>CollapsibleContent</Code>. Skip <Code>tooltip</Code> on that
          button so the trigger stays composable (tooltips replace{" "}
          <Code>render</Code> internally).
        </p>
        <ComponentExample className={exampleShellClassName}>
          <SidebarCollapsibleSubMenuDemo />
        </ComponentExample>
      </PageSection>
    </div>
  )
}
