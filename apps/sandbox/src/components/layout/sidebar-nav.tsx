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

export function SidebarNav() {
  return (
    <Sidebar
      variant="sidebar"
      // Use non-fixed layout so the sidebar participates in the app shell flex row
      // and scrolling matches the docs app (ScrollArea inside SidebarContent).
      collapsible="none"
      className="h-full bg-white"
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

