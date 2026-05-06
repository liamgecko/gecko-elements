import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@gecko/ui/components/sidebar"

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
      collapsible="icon"
      // Sandbox layout override: keep sidebar below the fixed-height top bar (h-14).
      className="top-14"
    >
      <SidebarContent>
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
      </SidebarContent>
    </Sidebar>
  )
}

