import { useLocation, useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

type NavItem = {
  to: string
  label: string
  todo?: boolean
}

const navItems: NavItem[] = [
  { to: "/components/accordion", label: "Accordion" },
  { to: "/components/alert", label: "Alert" },
  { to: "/components/alert-dialog", label: "Alert dialog" },
  { to: "/components/avatar", label: "Avatar" },
  { to: "/components/avatar-group", label: "Avatar group" },
  { to: "/components/badge", label: "Badge" },
  { to: "/components/breadcrumb", label: "Breadcrumb" },
  { to: "/components/button", label: "Button" },
  // { to: "/components/button-group", label: "Button group" },
  { to: "/components/calendar", label: "Calendar" },
  { to: "/components/card", label: "Card" },
  { to: "/components/charts", label: "Charts", todo: true },
  { to: "/components/chat-bubble", label: "Chat bubble", todo: true },
  { to: "/components/chat-head", label: "Chat head", todo: true },
  { to: "/components/checkbox", label: "Checkbox" },
  { to: "/components/code-snippet", label: "Code snippet", todo: true },
  { to: "/components/color-picker", label: "Color picker", todo: true },
  { to: "/components/combobox", label: "Combobox" },
  { to: "/components/command", label: "Command" },
  { to: "/components/context-menu", label: "Context menu" },
  { to: "/components/counter", label: "Counter" },
  { to: "/components/data-table", label: "Data table", todo: true },
  { to: "/components/date-input", label: "Date input" },
  { to: "/components/date-picker", label: "Date picker" },
  { to: "/components/dialog", label: "Dialog" },
  // { to: "/components/direction", label: "Direction" },
  { to: "/components/drop-zone", label: "Drop zone", todo: true },
  { to: "/components/dropdown-menu", label: "Dropdown menu" },
  { to: "/components/empty", label: "Empty" },
  { to: "/components/field", label: "Field" },
  { to: "/components/file-input", label: "File input" },
  { to: "/components/filters", label: "Filters", todo: true },
  { to: "/components/input", label: "Input" },
  { to: "/components/input-otp", label: "Input OTP" },
  // { to: "/components/kbd", label: "Kbd" },
  { to: "/components/label", label: "Label" },
  { to: "/components/metric-card", label: "Metric card", todo: true },
  { to: "/components/native-select", label: "Native select" },
  { to: "/components/number-field", label: "Number field" },
  { to: "/components/pagination", label: "Pagination" },
  { to: "/components/popover", label: "Popover" },
  { to: "/components/progress", label: "Progress" },
  { to: "/components/radio-group", label: "Radio group" },
  { to: "/components/reply-box", label: "Reply box", todo: true },
  { to: "/components/scroll-area", label: "Scroll area" },
  { to: "/components/search-input", label: "Search field" },
  { to: "/components/select", label: "Select" },
  { to: "/components/separator", label: "Separator" },
  { to: "/components/sheet", label: "Sheet" },
  { to: "/components/sidebar", label: "Sidebar", todo: true },
  { to: "/components/spinner", label: "Spinner" },
  { to: "/components/switch", label: "Switch" },
  { to: "/components/table", label: "Table" },
  { to: "/components/tabs", label: "Tabs" },
  { to: "/components/telephone-field", label: "Telephone field" },
  { to: "/components/textarea", label: "Textarea" },
  { to: "/components/tooltip", label: "Tooltip" },
  { to: "/components/toast", label: "Toast" },
  { to: "/components/typing-indicator", label: "Typing indicator" },
] as const

export function SidebarNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Components</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-px">
          {navItems.map(({ to, label, todo }) => (
            <SidebarMenuItem key={to}>
              <SidebarMenuButton
                isActive={location.pathname === to}
                tooltip={label}
                aria-current={location.pathname === to ? "page" : undefined}
                onClick={() => navigate(to)}
                className="font-medium text-sm text-muted-foreground hover:text-foreground data-active:text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <span>{label}</span>
                  {todo && (
                    <Badge
                      variant="info"
                      size="xs"
                      rounded
                    >
                      To do
                    </Badge>
                  )}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
