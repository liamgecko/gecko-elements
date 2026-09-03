import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Badge } from "@gecko/ui/components/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@gecko/ui/components/sidebar"
import { sidebarNavGroups, type SidebarNavItem } from "@/config/sidebar-nav"

export function SidebarNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const renderNavItems = (items: readonly SidebarNavItem[]) =>
    items.map(({ to, label, todo }) => (
      <SidebarMenuItem key={to}>
        <SidebarMenuButton
          isActive={location.pathname === to}
          tooltip={label}
          aria-current={location.pathname === to ? "page" : undefined}
          onClick={() => navigate(to)}
        >
          <span className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className="truncate">{label}</span>
            {todo ? (
              <Badge variant="info" size="xs" rounded className="shrink-0">
                To do
              </Badge>
            ) : null}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))

  return (
    <React.Fragment>
      {sidebarNavGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-px">
              {renderNavItems(group.items)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </React.Fragment>
  )
}
