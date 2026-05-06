import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@gecko/ui/components/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { cn } from "@gecko/ui/lib/utils"
import type { LucideIcon } from "lucide-react"
import {
  Building,
  ChartLine,
  CalendarDays,
  ClipboardList,
  Megaphone,
  Settings,
  Users,
  House,
  Inbox,
  Mails,
  Headset,
  MessageSquareText,
  Zap,
  SquareMousePointer,
  UserRoundCheck,
  Globe,
  Route,
} from "lucide-react"

type NavItem = {
  label: string
  icon: LucideIcon
  items?: readonly { label: string }[]
  defaultOpen?: boolean
}

const navItems: readonly NavItem[] = [
  { label: "Overview", icon: House },
  { label: "Contacts", icon: Users },
  {
    label: "Responses",
    icon: Inbox,
    items: [{ label: "All responses" }, { label: "Payments" }, { label: "Quarantine" }] as const,
  },
  { label: "Messages", icon: Mails },
  { label: "Applications", icon: UserRoundCheck },
  {
    label: "Conversations",
    icon: MessageSquareText,
    items: [
      { label: "Inbox" },
      { label: "Knowledge base" },
      { label: "Chatbots" },
      { label: "Channels" },
      { label: "Widgets" },
      { label: "Reporting" },
      { label: "Teams" },
      { label: "Saved replies" },
      { label: "Workflows" },
    ] as const,
  },
  {
    label: "Events",
    icon: CalendarDays,
    items: [
      { label: "Events" },
      { label: "Hosts" },
      { label: "Locations" },
      { label: "Share" },
      { label: "Deleted events" },
    ] as const,
  },
  {
    label: "Forms",
    icon: ClipboardList,
    items: [{ label: "Forms" }, { label: "Field and groups" }, { label: "Field options" }] as const,
  },
  {
    label: "AI and automation",
    icon: Zap,
    items: [{ label: "AI agents" }, { label: "MCP servers" }] as const,
  },
  {
    label: "Broadcasts",
    icon: Megaphone,
    items: [
      { label: "Campaigns" },
      { label: "Templates" },
      { label: "Verified senders and domains" },
      { label: "SMS geo permissions" },
    ] as const,
  },
  {
    label: "Calls",
    icon: Headset,
    items: [
      { label: "Campaigns" },
      { label: "Scripts" },
      { label: "Outcomes" },
      { label: "Telephone numbers" },
      { label: "VoIP numbers" },
      { label: "Usage and costs" },
    ] as const,
  },
  { label: "Landing pages", icon: SquareMousePointer },
  {
    label: "Organisations",
    icon: Building,
    items: [
      { label: "All organisations" },
      { label: "Organisation types" },
      { label: "Organisation fields" },
    ] as const,
  },
  {
    label: "Portal",
    icon: Globe,
    items: [{ label: "Student portals" }, { label: "Tasks and objectives" }] as const,
  },
  { label: "Integrations", icon: Route },
  { label: "Dashboards", icon: ChartLine },
  {
    label: "Settings",
    icon: Settings,
    items: [
      { label: "Account settings" },
      { label: "User settings" },
      { label: "Users" },
      { label: "User groups" },
      { label: "Devices" },
      { label: "Import" },
      { label: "Export" },
      { label: "Labels" },
      { label: "Categories" },
      { label: "Data security" },
    ] as const,
  },
  
] as const

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className={cn(
        "top-(--header-height) bottom-0 h-[calc(100dvh-var(--header-height))] border-r border-sidebar-border",
        "[&_[data-slot=sidebar-inner]]:bg-background"
      )}
    >
      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, icon: Icon, items, defaultOpen }) => {
                  if (items?.length) {
                    return (
                      <SidebarMenuItem key={label}>
                        <Collapsible defaultOpen={defaultOpen}>
                          <CollapsibleTrigger
                            render={
                              <SidebarMenuButton>
                                <Icon />
                                <span>{label}</span>
                              </SidebarMenuButton>
                            }
                          />
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {items.map((item) => (
                                <SidebarMenuSubItem key={item.label}>
                                  <SidebarMenuSubButton href="#" isActive={false}>
                                    <span>{item.label}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    )
                  }

                  return (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton tooltip={label}>
                        <Icon />
                        {!collapsed ? <span>{label}</span> : null}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="self-center" />
      </SidebarFooter>
    </Sidebar>
  )
}

