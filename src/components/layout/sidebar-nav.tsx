import { useLocation, useNavigate } from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navItems = [
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
  { to: "/components/checkbox", label: "Checkbox" },
  { to: "/components/combobox", label: "Combobox" },
  { to: "/components/command", label: "Command" },
  { to: "/components/context-menu", label: "Context menu" },
  { to: "/components/date-input", label: "Date input" },
  { to: "/components/date-picker", label: "Date picker" },
  { to: "/components/dialog", label: "Dialog" },
  // { to: "/components/direction", label: "Direction" },
  { to: "/components/dropdown-menu", label: "Dropdown menu" },
  { to: "/components/empty", label: "Empty" },
  { to: "/components/field", label: "Field" },
  { to: "/components/input", label: "Input" },
  { to: "/components/input-otp", label: "Input OTP" },
  // { to: "/components/kbd", label: "Kbd" },
  { to: "/components/label", label: "Label" },
  { to: "/components/native-select", label: "Native select" },
  { to: "/components/pagination", label: "Pagination" },
  { to: "/components/popover", label: "Popover" },
  { to: "/components/progress", label: "Progress" },
  { to: "/components/radio-group", label: "Radio group" },
  { to: "/components/scroll-area", label: "Scroll area" },
  { to: "/components/select", label: "Select" },
  { to: "/components/separator", label: "Separator" },
  { to: "/components/sheet", label: "Sheet" },
  { to: "/components/skeleton", label: "Skeleton" },
  { to: "/components/sonner", label: "Sonner" },
  { to: "/components/spinner", label: "Spinner" },
  { to: "/components/switch", label: "Switch" },
  { to: "/components/table", label: "Table" },
  { to: "/components/tabs", label: "Tabs" },
  { to: "/components/textarea", label: "Textarea" },
  { to: "/components/toggle", label: "Toggle" },
  { to: "/components/toggle-group", label: "Toggle group" },
  { to: "/components/tooltip", label: "Tooltip" },
] as const

export function SidebarNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Components</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-[1px]">
          {navItems.map(({ to, label }) => (
            <SidebarMenuItem key={to}>
              <SidebarMenuButton
                isActive={location.pathname === to}
                tooltip={label}
                aria-current={location.pathname === to ? "page" : undefined}
                onClick={() => navigate(to)}
                className="font-medium text-sm text-muted-foreground hover:text-foreground data-[active]:text-foreground"
              >
                {label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
