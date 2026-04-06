export type GalleryItem = {
  name: string
  description: string
  path: string
}

export const corePages: readonly GalleryItem[] = [
  {
    name: "Color",
    description: "Semantic palette and CSS variables for UI color.",
    path: "/core/color",
  },
  {
    name: "Typography",
    description: "Font families, scale, and text styles.",
    path: "/core/typography",
  },
  {
    name: "Spacing",
    description: "Layout rhythm and the spacing scale.",
    path: "/core/spacing",
  },
  {
    name: "Radius",
    description: "Corner radius tokens and utilities.",
    path: "/core/radius",
  },
  {
    name: "Shadows",
    description: "Elevation and box-shadow patterns.",
    path: "/core/shadows",
  },
  {
    name: "Icons",
    description: "Lucide icons and usage notes.",
    path: "/core/icons",
  },
] as const

export const componentPages: readonly GalleryItem[] = [
  {
    name: "Accordion",
    description: "Show and hide sections of related content.",
    path: "/components/accordion",
  },
  {
    name: "Alert",
    description: "Display important messages that require attention.",
    path: "/components/alert",
  },
  {
    name: "Alert Dialog",
    description: "Confirm high‑impact actions with a blocking dialog.",
    path: "/components/alert-dialog",
  },
  {
    name: "Avatar",
    description: "Represent users with an image, initials, or fallback.",
    path: "/components/avatar",
  },
  {
    name: "Avatar Group",
    description: "Stack multiple avatars with optional overflow count.",
    path: "/components/avatar-group",
  },
  {
    name: "Badge",
    description: "Small status or count indicators attached to content.",
    path: "/components/badge",
  },
  {
    name: "Breadcrumb",
    description: "Show the user’s current location in the hierarchy.",
    path: "/components/breadcrumb",
  },
  {
    name: "Button",
    description: "Actions, submit, and triggers.",
    path: "/components/button",
  },
  {
    name: "Button Group",
    description: "Arrange related buttons together with shared styling.",
    path: "/components/button-group",
  },
  {
    name: "Calendar",
    description: "Browse and pick dates from a visual calendar.",
    path: "/components/calendar",
  },
  {
    name: "Card",
    description: "Container for grouping related content and actions.",
    path: "/components/card",
  },
  {
    name: "Checkbox",
    description: "Single or multiple binary options.",
    path: "/components/checkbox",
  },
  {
    name: "Combobox",
    description: "Typeahead select with free‑text input.",
    path: "/components/combobox",
  },
  {
    name: "Command",
    description: "Command palette style search and actions.",
    path: "/components/command",
  },
  {
    name: "Context Menu",
    description: "Menu triggered by right‑click or long‑press.",
    path: "/components/context-menu",
  },
  {
    name: "Date Input",
    description: "Three segment date entry (DD MM YY or MM DD).",
    path: "/components/date-input",
  },
  {
    name: "Date Picker",
    description: "Pick a single date or a date range.",
    path: "/components/date-picker",
  },
  {
    name: "Dialog",
    description: "Non‑blocking overlay dialog for additional content.",
    path: "/components/dialog",
  },
  {
    name: "Direction",
    description: "Control layout direction for components.",
    path: "/components/direction",
  },
  {
    name: "Dropdown Menu",
    description: "Menu triggered from a button or icon.",
    path: "/components/dropdown-menu",
  },
  {
    name: "Empty",
    description: "Empty state patterns for no‑data views.",
    path: "/components/empty",
  },
  {
    name: "Field",
    description: "Field wrapper for labels, descriptions, and errors.",
    path: "/components/field",
  },
  {
    name: "Filters",
    description: "Filter controls for narrowing down results.",
    path: "/components/filters",
  },
  {
    name: "Input",
    description: "Single‑line text inputs.",
    path: "/components/input",
  },
  {
    name: "Input OTP",
    description: "Multi‑field one‑time‑password entry.",
    path: "/components/input-otp",
  },
  {
    name: "Kbd",
    description: "Inline keyboard shortcuts and key labels.",
    path: "/components/kbd",
  },
  {
    name: "Label",
    description: "Accessible labels for form controls.",
    path: "/components/label",
  },
  {
    name: "Native Select",
    description: "System select element with design system styling.",
    path: "/components/native-select",
  },
  {
    name: "Number field",
    description: "Numeric input with step and constraints.",
    path: "/components/number-field",
  },
  {
    name: "Pagination",
    description: "Paginated navigation for long lists.",
    path: "/components/pagination",
  },
  {
    name: "Popover",
    description: "Small overlays anchored to a trigger.",
    path: "/components/popover",
  },
  {
    name: "Progress",
    description: "Linear progress for ongoing tasks.",
    path: "/components/progress",
  },
  {
    name: "Radio Group",
    description: "Choose exactly one option from a list.",
    path: "/components/radio-group",
  },
  {
    name: "Scroll Area",
    description: "Custom scrollable container for overflow content.",
    path: "/components/scroll-area",
  },
  {
    name: "Select",
    description: "Custom select with rich content.",
    path: "/components/select",
  },
  {
    name: "Separator",
    description: "Horizontal or vertical separators between content.",
    path: "/components/separator",
  },
  {
    name: "Sheet",
    description: "Sliding panels for navigation or detail views.",
    path: "/components/sheet",
  },
  {
    name: "Skeleton",
    description: "Loading placeholders that mimic content layout.",
    path: "/components/skeleton",
  },
  {
    name: "Toast",
    description: "Toast notifications for ephemeral feedback.",
    path: "/components/toast",
  },
  {
    name: "Spinner",
    description: "Indeterminate loading indicator.",
    path: "/components/spinner",
  },
  {
    name: "Switch",
    description: "On/off toggles for binary preferences.",
    path: "/components/switch",
  },
  {
    name: "Table",
    description: "Tabular display of structured data.",
    path: "/components/table",
  },
  {
    name: "Tabs",
    description: "Switch between related panels of content.",
    path: "/components/tabs",
  },
  {
    name: "Textarea",
    description: "Multi‑line text input.",
    path: "/components/textarea",
  },
  {
    name: "Tooltip",
    description: "Small labels that appear on hover or focus.",
    path: "/components/tooltip",
  },
  {
    name: "Chat bubble",
    description: "Message bubbles for chat interfaces.",
    path: "/components/chat-bubble",
  },
  {
    name: "Chat head",
    description: "Floating chat head entry points for messaging.",
    path: "/components/chat-head",
  },
  {
    name: "Color picker",
    description: "Pickers for selecting and previewing colors.",
    path: "/components/color-picker",
  },
  {
    name: "Data table",
    description: "Advanced table patterns for rich data grids.",
    path: "/components/data-table",
  },
  {
    name: "Reply box",
    description: "Reply composer for chat and comment threads.",
    path: "/components/reply-box",
  },
  {
    name: "Typing indicator",
    description: "Indicators that show when someone is typing.",
    path: "/components/typing-indicator",
  },
  {
    name: "Metric card",
    description: "KPI and metric cards for dashboards.",
    path: "/components/metric-card",
  },
  {
    name: "Charts",
    description: "Chart layouts for data visualisation.",
    path: "/components/charts",
  },
  {
    name: "Telephone field",
    description: "Inputs for international phone numbers.",
    path: "/components/telephone-field",
  },
  {
    name: "Search field",
    description: "Search fields with affordances and patterns.",
    path: "/components/search-input",
  },
  {
    name: "Sensitive field",
    description: "Masked inputs with read-only and edit modes.",
    path: "/components/sensitive-field",
  },
  {
    name: "File input",
    description: "File upload fields with states.",
    path: "/components/file-input",
  },
  {
    name: "Drop zone",
    description: "Drop areas for drag-and-drop file uploads.",
    path: "/components/drop-zone",
  },
  {
    name: "Drag and drop",
    description: "Sortable lists and draggable UI patterns.",
    path: "/components/drag-and-drop",
  },
  {
    name: "Counter",
    description: "Numeric counters and steppers.",
    path: "/components/counter",
  },
  {
    name: "Code snippet",
    description: "Code blocks with copy-to-clipboard.",
    path: "/components/code-snippet",
  },
] as const
