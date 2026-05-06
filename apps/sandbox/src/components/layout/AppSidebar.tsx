import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@gecko/ui/components/sidebar"
import { ScrollArea } from "@gecko/ui/components/scroll-area"

const navItems = [
  "Overview",
  "Forms",
  "Events",
  "Calls",
  "Conversations",
  "AI agents",
  "Broadcasts",
  "Landing pages",
  "Organisations",
  "Contacts",
  "Responses",
  "Messages",
  "Applications",
  "Settings",
  "Dashboards",
] as const

export function AppSidebar() {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="none"
      className="h-full"
    >
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((label) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton tooltip={label}>
                      <span>{label}</span>
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

