import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@gecko/ui/components/sidebar"
import { Collapsible, CollapsibleContent } from "@gecko/ui/components/collapsible"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { cn } from "@gecko/ui/lib/utils"
import type { LucideIcon } from "lucide-react"
import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Button } from "@gecko/ui/components/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@gecko/ui/components/dialog"
import { Input } from "@gecko/ui/components/input"
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
  Star,
  MoreHorizontal,
  CheckCheck,
  X,
} from "lucide-react"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { useFavourites } from "../../state/favourites"

type NavItem = {
  label: string
  icon: LucideIcon
  items?: readonly { label: string }[]
  defaultOpen?: boolean
}

function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

const navItems: readonly NavItem[] = [
  { label: "Home", icon: House },
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
    items: [
      { label: "Forms" },
      { label: "Contact fields" },
      { label: "Field groups" },
      { label: "Field options" },
    ] as const,
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
      { label: "Senders and domains" },
      { label: "SMS geo permissions" },
    ] as const,
  },
  {
    label: "Calls",
    icon: Headset,
    items: [
      { label: "Calls" },
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
  { label: "Data and reporting", icon: ChartLine },
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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { favourites, renameFavourite, deleteFavourite } = useFavourites()

  const [renameOpen, setRenameOpen] = React.useState(false)
  const [renamePath, setRenamePath] = React.useState<string | null>(null)
  const [renameValue, setRenameValue] = React.useState("")
  const [expandedGroups, setExpandedGroups] = React.useState<
    Record<string, boolean>
  >({})

  const favouritesLabelForPath = (path: string) => {
    const tabLabel = getTabLabelForPath(path)
    if (tabLabel) return tabLabel

    const segments = path.split("?")[0].split("#")[0].split("/").filter(Boolean)
    const last = segments.at(-1) ?? ""
    if (last === "overview" || last === "home") return "Home"
    if (last === "dashboards" || last === "data-and-reporting") {
      return "Data and reporting"
    }
    const spaced = last.replace(/-/g, " ")
    const titleCased = spaced.replace(/\b\w/g, (c) => c.toUpperCase())
    if (last === "mcp-servers") return "MCP servers"
    if (last === "all-organisations") return "Organisations"
    if (last === "student-portals") return "Student portal"
    if (last === "import") return "Imports"
    if (last === "export") return "Exports"
    if (last === "voip-numbers") return "VoIP numbers"
    if (last === "sms-geo-permissions") return "SMS geo permissions"
    return titleCased || "Overview"
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className={cn(
        "top-(--header-height) bottom-0 h-[calc(100dvh-var(--header-height))] border-r border-sidebar-border",
      )}
    >
      <SidebarContent className="group-data-[collapsible=icon]:overflow-auto">
        <ScrollArea className="flex-1">
          {favourites.length ? (
            <SidebarGroup className="border-b border-sidebar-border min-h-[50px]">
              <SidebarGroupLabel>Favourites</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {collapsed ? (
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Favourites">
                        <Star />
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {favourites.map((fav) => {
                          const active = pathname === fav.path
                          const label = favouritesLabelForPath(fav.path)
                          return (
                            <SidebarMenuSubItem key={fav.path}>
                              <SidebarMenuSubButton
                                isActive={active}
                                onClick={(event) => {
                                  event.preventDefault()
                                  navigate(fav.path)
                                }}
                              >
                                <span>{label}</span>
                              </SidebarMenuSubButton>
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  render={
                                    <SidebarMenuAction aria-label="Favourite actions" />
                                  }
                                >
                                  <MoreHorizontal />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setRenamePath(fav.path)
                                      setRenameValue(label)
                                      setRenameOpen(true)
                                    }}
                                  >
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => deleteFavourite(fav.path)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  ) : (
                    favourites.map((fav) => {
                      const active = pathname === fav.path
                      const label = fav.label || favouritesLabelForPath(fav.path)
                      return (
                        <SidebarMenuItem key={fav.path} className="flex items-center">
                          <SidebarMenuButton
                            tooltip={label}
                            isActive={active}
                            onClick={() => navigate(fav.path)}
                            className="flex-1 group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground"
                          >
                            <span>{label}</span>
                          </SidebarMenuButton>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={<SidebarMenuAction aria-label="Favourite actions" />}
                            >
                              <MoreHorizontal />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setRenamePath(fav.path)
                                  setRenameValue(label)
                                  setRenameOpen(true)
                                }}
                              >
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => deleteFavourite(fav.path)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </SidebarMenuItem>
                      )
                    })
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ) : null}

          <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
            <DialogContent size="xs">
              <DialogWrapper>
                <DialogHeader>
                  <DialogTitle>Rename menu item</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.currentTarget.value)}
                    placeholder="Favourite name"
                    autoFocus
                  />
                </DialogBody>
              </DialogWrapper>
              <DialogFooter showCloseButton closeButtonText="Cancel" closeButtonIcon={X}>
                <Button
                  type="button"
                  onClick={() => {
                    if (!renamePath) return
                    renameFavourite(renamePath, renameValue)
                    setRenameOpen(false)
                  }}
                >
                  <CheckCheck data-icon="inline-start" aria-hidden="true" />
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, icon: Icon, items, defaultOpen }) => {
                  const parentSlug = toSlug(label)
                  const parentPath = `/${parentSlug}`

                  if (items?.length) {
                    const firstChildPath = `${parentPath}/${toSlug(items[0].label)}`
                    const isGroupActive = items.some(
                      (item) =>
                        pathname === `${parentPath}/${toSlug(item.label)}`
                    )
                    const isOpen =
                      label in expandedGroups
                        ? expandedGroups[label]
                        : isGroupActive || (defaultOpen ?? false)

                    return (
                      <SidebarMenuItem key={label}>
                        <Collapsible
                          open={isOpen}
                          onOpenChange={(open) =>
                            setExpandedGroups((prev) => ({
                              ...prev,
                              [label]: open,
                            }))
                          }
                        >
                          <SidebarMenuButton
                            isActive={isGroupActive}
                            aria-expanded={isOpen}
                            onClick={() => {
                              if (isOpen) {
                                setExpandedGroups((prev) => ({
                                  ...prev,
                                  [label]: false,
                                }))
                                return
                              }
                              setExpandedGroups((prev) => ({
                                ...prev,
                                [label]: true,
                              }))
                              navigate(firstChildPath)
                            }}
                          >
                            <Icon />
                            <span>{label}</span>
                          </SidebarMenuButton>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {items.map((item) => {
                                const childSlug = toSlug(item.label)
                                const to = `${parentPath}/${childSlug}`
                                const active = pathname === to

                                return (
                                  <SidebarMenuSubItem key={item.label}>
                                    <SidebarMenuSubButton
                                      isActive={active}
                                      onClick={(event) => {
                                        event.preventDefault()
                                        navigate(to)
                                      }}
                                    >
                                      <span>{item.label}</span>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    )
                  }

                  const active = pathname === parentPath
                  return (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        tooltip={label}
                        isActive={active}
                        onClick={() => navigate(parentPath)}
                      >
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

