import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@gecko/ui/components/sidebar"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Building2,
  LayoutDashboard,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquare,
  MessagesSquare,
  Phone,
  ScrollText,
  Settings,
  Shapes,
  Users,
  Waypoints,
} from "lucide-react"

type NavItem = {
  label: string
  icon: LucideIcon
}

const navItems: readonly NavItem[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Forms", icon: ListChecks },
  { label: "Events", icon: Waypoints },
  { label: "Calls", icon: Phone },
  { label: "Conversations", icon: MessagesSquare },
  { label: "AI agents", icon: Bot },
  { label: "Broadcasts", icon: Megaphone },
  { label: "Landing pages", icon: ScrollText },
  { label: "Organisations", icon: Building2 },
  { label: "Contacts", icon: Users },
  { label: "Responses", icon: Mail },
  { label: "Messages", icon: MessageSquare },
  { label: "Applications", icon: Shapes },
  { label: "Settings", icon: Settings },
  { label: "Dashboards", icon: LayoutDashboard },
] as const

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-full"
    >
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, icon: Icon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton tooltip={label}>
                      <Icon aria-hidden className="size-4" />
                      {!collapsed ? <span>{label}</span> : null}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}

