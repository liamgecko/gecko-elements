export interface Section {
  id: string
  label: string
  children?: Section[]
}

export interface ComponentSections {
  [key: string]: Section[]
}

/**
 * Section config for the "On this page" nav. Keys match the route segment
 * (e.g. /components/button → "button", /core/color → "color"). Add or edit
 * sections per page.
 */
export const componentSections: ComponentSections = {
  "activity-feed": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "condensed", label: "Condensed" },
  ],
  "inline-edit": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
  ],
  button: [
    { id: "overview", label: "Overview" },
    { id: "default", label: "Default button" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-primary", label: "Primary" },
        { id: "variants-secondary", label: "Secondary" },
        { id: "variants-outline", label: "Outline" },
        { id: "variants-destructive", label: "Destructive" },
        { id: "variants-ghost", label: "Ghost" },
      ],
    },
    { id: "dropdown", label: "Dropdown" },
    { id: "link-button", label: "Link button" },
    { id: "sizes", label: "Sizes" },
    {
      id: "icons",
      label: "Icons",
      children: [
        { id: "icons-left", label: "Icon left" },
        { id: "icons-right", label: "Icon right" },
        { id: "icons-only", label: "Icon only" },
      ],
    },
    { id: "loading", label: "Loading button" },
  ],
  tooltip: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "side", label: "Side" },
    {
      id: "styling",
      label: "Styling",
      children: [
        { id: "styling-default", label: "Default" },
        { id: "styling-light", label: "Light" },
      ],
    },
  ],
  accordion: [
    { id: "overview", label: "Overview" },
    {
      id: "examples",
      label: "Examples",
      children: [
        { id: "examples-basic", label: "Basic" },
        { id: "examples-layout", label: "Layout" },
      ],
    },
  ],
  "alert-dialog": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "examples",
      label: "Examples",
      children: [
        { id: "examples-confirm-deletion", label: "Confirm deletion" },
        { id: "examples-unsaved-changes", label: "Unsaved changes" },
        { id: "examples-confirm-save", label: "Confirm save" },
      ],
    },
  ],
  badge: [
    { id: "overview", label: "Overview" },
    { id: "default", label: "Default badge" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-colours", label: "Colours" },
        { id: "variants-bordered", label: "Bordered" },
        { id: "variants-rounded", label: "Rounded" },
      ],
    },
    { id: "sizes", label: "Sizes" },
    {
      id: "with-icons",
      label: "With icons",
      children: [
        { id: "with-icons-left", label: "Left icon" },
        { id: "with-icons-right", label: "Right icon" },
        { id: "with-icons-both", label: "Both icons" },
        { id: "with-icons-only", label: "Icon only" },
      ],
    },
    {
      id: "with-avatar",
      label: "With avatar",
      children: [{ id: "with-avatar-sizes", label: "Avatar sizes" }],
    },
    { id: "dismissible", label: "Dismissible" },
    { id: "notification", label: "Notification indicator" },
    { id: "as-button", label: "As button" },
  ],
  card: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-with-header", label: "Card with header" },
        { id: "variants-with-header-tooltip", label: "Card with header tooltip" },
        { id: "variants-with-footer", label: "Card with footer" },
        { id: "variants-with-header-and-footer", label: "Card with header and footer" },
      ],
    },
  ],
  checkbox: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "with-description", label: "With description" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-default", label: "Default" },
        { id: "states-checked", label: "Checked" },
        { id: "states-indeterminate", label: "Indeterminate" },
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    { id: "checkbox-group", label: "Checkbox group" },
    {
      id: "as-button",
      label: "As button",
      children: [
        { id: "as-button-basic", label: "Basic" },
        { id: "as-button-with-description", label: "With description" },
      ],
    },
  ],
  dialog: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-with-header", label: "With header" },
        { id: "variants-with-footer", label: "With footer" },
        { id: "variants-with-header-and-footer", label: "With header and footer" },
      ],
    },
    {
      id: "footer-close-button",
      label: "Footer close button",
      children: [
        { id: "footer-close-button-default", label: "Default close button" },
        { id: "footer-close-button-custom", label: "Custom close button" },
      ],
    },
    { id: "sizing", label: "Sizing" },
  ],
  empty: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "with-icon", label: "With icon" },
    {
      id: "actions",
      label: "Actions",
      children: [
        { id: "actions-single", label: "Single action" },
        { id: "actions-multi", label: "Multi-action" },
      ],
    },
  ],
  input: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    { id: "read-only", label: "Read-only" },
    { id: "required", label: "Required" },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    {
      id: "icons",
      label: "Icons",
      children: [
        { id: "icons-left", label: "Left aligned" },
        { id: "icons-right", label: "Right aligned" },
        { id: "icons-left-and-right", label: "Left and right aligned" },
      ],
    },
  ],
  "native-select": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "groups", label: "Groups" },
    { id: "multiple", label: "Multiple select" },
    { id: "within-form", label: "Within form" },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  popover: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-with-header", label: "With header" },
        { id: "variants-with-footer", label: "With footer" },
        { id: "variants-with-header-and-footer", label: "With header and footer" },
      ],
    },
    { id: "alignment", label: "Alignment" },
  ],
  progress: [
    { id: "overview", label: "Overview" },
    { id: "progress-bar", label: "Progress bar" },
    { id: "with-value", label: "With value" },
    { id: "with-label", label: "With label" },
    {
      id: "progress-bar-sizes",
      label: "Progress bar sizes",
      children: [
        { id: "progress-bar-sizes-small", label: "Small" },
        { id: "progress-bar-sizes-medium", label: "Medium" },
        { id: "progress-bar-sizes-large", label: "Large" },
      ],
    },
    { id: "progress-colour-bar", label: "Progress colour (bar)" },
    { id: "progress-ring", label: "Progress ring" },
    { id: "with-value-ring", label: "With value (ring)" },
    { id: "with-label-ring", label: "With label (ring)" },
    {
      id: "progress-ring-sizes",
      label: "Progress ring sizes",
      children: [
        { id: "progress-ring-sizes-small", label: "Small" },
        { id: "progress-ring-sizes-medium", label: "Medium" },
        { id: "progress-ring-sizes-large", label: "Large" },
      ],
    },
    { id: "progress-colour-ring", label: "Progress colour (ring)" },
  ],
  "radio-group": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "with-description", label: "With description" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-default", label: "Default" },
        { id: "states-checked", label: "Checked" },
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    { id: "radio-group", label: "Radio group" },
    {
      id: "as-button",
      label: "As button",
      children: [
        { id: "as-button-basic", label: "Basic" },
        { id: "as-button-with-description", label: "With description" },
      ],
    },
  ],
  select: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    {
      id: "sizes",
      label: "Sizes",
      children: [
        { id: "sizes-small", label: "Small" },
        { id: "sizes-default", label: "Default" },
        { id: "sizes-large", label: "Large" },
      ],
    },
    { id: "groups", label: "Groups" },
    { id: "scrollable", label: "Scrollable" },
    { id: "alignment", label: "Alignment" },
  ],
  sheet: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "sides", label: "Sides" },
    { id: "sizes", label: "Sizes" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-with-header", label: "With header" },
        { id: "variants-with-footer", label: "With footer" },
        { id: "variants-with-header-and-footer", label: "With header and footer" },
      ],
    },
    { id: "overlay", label: "Overlay" },
  ],
  toast: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "description", label: "Description" },
    { id: "position", label: "Position" },
    {
      id: "variants",
      label: "Variants",
      children: [
        { id: "variants-info", label: "Info" },
        { id: "variants-warning", label: "Warning" },
        { id: "variants-error", label: "Error" },
        { id: "variants-success", label: "Success" },
      ],
    },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-promise", label: "Promise" },
        { id: "states-loading", label: "Loading" },
      ],
    },
  ],
  spinner: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "sizing", label: "Sizing" },
    {
      id: "combinations",
      label: "Combinations",
      children: [
        { id: "combinations-button", label: "Button" },
        { id: "combinations-badge", label: "Badge" },
        { id: "combinations-input", label: "Input" },
      ],
    },
  ],
  switch: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    {
      id: "label-and-description",
      label: "Label and description",
      children: [
        { id: "label-and-description-label", label: "Label" },
        { id: "label-and-description-label-desc", label: "Label and description" },
      ],
    },
    {
      id: "state",
      label: "State",
      children: [
        { id: "state-disabled", label: "Disabled" },
        { id: "state-error", label: "Error" },
      ],
    },
  ],
  tabs: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "line-variant", label: "Line variant" },
    { id: "vertical", label: "Vertical" },
    { id: "disabled", label: "Disabled" },
    {
      id: "full-width",
      label: "Full width",
      children: [
        { id: "full-width-default", label: "Default tabs" },
        { id: "full-width-line", label: "Line tabs" },
      ],
    },
    {
      id: "badges",
      label: "Badges",
      children: [
        { id: "badges-default", label: "Default tabs" },
        { id: "badges-line", label: "Line tabs" },
        { id: "badges-vertical", label: "Vertical tabs" },
      ],
    },
  ],
  textarea: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    { id: "read-only", label: "Read-only" },
    { id: "required", label: "Required" },
    {
      id: "sizes",
      label: "Sizes",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    { id: "form", label: "Within form" },
  ],
  alert: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "variations",
      label: "Variations",
      children: [
        { id: "variations-destructive", label: "Destructive" },
        { id: "variations-info", label: "Info" },
        { id: "variations-success", label: "Success" },
        { id: "variations-warning", label: "Warning" },
      ],
    },
  ],
  avatar: [
    { id: "overview", label: "Overview" },
    { id: "default", label: "Default avatar" },
    { id: "sizes", label: "Sizes" },
    { id: "image", label: "With image" },
    { id: "status", label: "Status" },
    { id: "notification", label: "Notification" },
    { id: "label-only", label: "Label" },
    { id: "label-description", label: "Label and description" },
  ],
  "avatar-group": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "with-overflow", label: "With overflow" },
    { id: "sizes", label: "Sizes" },
    { id: "with-tooltips", label: "With tooltips" },
  ],
  breadcrumb: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "with-overflow", label: "With overflow" },
  ],
  calendar: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "date-range", label: "Date range" },
    { id: "month-year", label: "Month and year selector" },
    { id: "booked-dates", label: "Booked dates" },
  ],
  combobox: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "multiple", label: "Multiple" },
    { id: "with-clear", label: "With clear" },
    { id: "groups", label: "Groups" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  command: [
    { id: "overview", label: "Overview" },
    { id: "example", label: "Example" },
    { id: "trigger", label: "Trigger" },
  ],
  "context-menu": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "submenu", label: "Submenu" },
    { id: "shortcuts", label: "Shortcuts" },
    { id: "groups", label: "Groups" },
    { id: "icons", label: "Icons" },
    { id: "checkbox", label: "Checkbox" },
    { id: "radio", label: "Radio" },
    { id: "destructive", label: "Destructive" },
  ],
  "date-input": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "four-digit-year", label: "4-digit year" },
    { id: "american-format", label: "American format" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  "date-picker": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "range", label: "Range picker" },
    { id: "dob", label: "Date of birth" },
    { id: "button-trigger", label: "Button trigger" },
    { id: "time-picker", label: "Time picker" },
    { id: "natural-language", label: "Natural language" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  direction: [{ id: "overview", label: "Overview" }],
  "dropdown-menu": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "submenu", label: "Submenu" },
    { id: "shortcuts", label: "Shortcuts" },
    { id: "icons", label: "Icons" },
    { id: "avatars", label: "Avatars" },
    { id: "checkbox", label: "Checkbox" },
    { id: "radio-group", label: "Radio group" },
    { id: "destructive", label: "Destructive" },
    { id: "search", label: "Search" },
  ],
  field: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "help-text", label: "Help text" },
    { id: "validation", label: "Validation" },
  ],
  filters: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "search", label: "Search" },
    { id: "sort", label: "Sort" },
    { id: "condensed", label: "Condensed" },
    {
      id: "trigger",
      label: "Trigger",
      children: [
        { id: "trigger-label", label: "Trigger label" },
        { id: "trigger-icon", label: "Trigger icon" },
        { id: "trigger-icon-only", label: "Icon only trigger" },
      ],
    },
  ],
  "input-otp": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "separator", label: "Separator" },
    { id: "alphanumeric", label: "Alphanumeric" },
    { id: "custom", label: "Custom" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  kbd: [{ id: "overview", label: "Overview" }],
  label: [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "within-form", label: "Within form" },
    { id: "required-field", label: "Required field" },
  ],
  "number-field": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "sizes",
      label: "Sizes",
      children: [
        { id: "sizes-small", label: "Small" },
        { id: "sizes-medium", label: "Medium" },
        { id: "sizes-large", label: "Large" },
      ],
    },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    { id: "within-form", label: "Within form" },
  ],
  pagination: [
    { id: "overview", label: "Overview" },
    { id: "navigational", label: "Navigational" },
    { id: "table-pagination", label: "Icon only" },
  ],
  "scroll-area": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "horizontal", label: "Horizontal" },
  ],
  separator: [
    { id: "overview", label: "Overview" },
    { id: "vertical", label: "Vertical" },
    { id: "list", label: "List" },
  ],
  table: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    { id: "footer", label: "Footer" },
    { id: "hoverable", label: "Hoverable rows" },
  ],
  "chat-bubble": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "agent", label: "Agent" },
    {
      id: "status",
      label: "Status",
      children: [
        { id: "status-sent", label: "Sent" },
        { id: "status-delivered", label: "Delivered" },
        { id: "status-read", label: "Read" },
        { id: "status-failed", label: "Failed" },
      ],
    },
    { id: "note", label: "Note" },
    {
      id: "info-popover",
      label: "Info popover",
      children: [
        { id: "info-popover-user-message", label: "User message" },
        { id: "info-popover-agent-message", label: "Agent message" },
      ],
    },
  ],
  "chat-head": [
    { id: "overview", label: "Overview" },
    { id: "default", label: "Default" },
    { id: "closed", label: "Closed" },
    { id: "unread-notification", label: "Unread notification" },
    { id: "active-state", label: "Active state" },
  ],
  "color-picker": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    { id: "with-default-value", label: "With default value" },
    { id: "direct-hex-input", label: "Direct HEX input" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  "data-table": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "table-headers",
      label: "Table headers",
      children: [
        { id: "sorting", label: "Sorting" },
        { id: "help-text", label: "Help text" },
      ],
    },
    { id: "pagination", label: "Pagination" },
    { id: "mass-actions", label: "Mass actions" },
    { id: "row-actions", label: "Row actions" },
    {
      id: "table-toolbar",
      label: "Table toolbar",
      children: [
        { id: "search", label: "Search" },
        { id: "filters", label: "Filters" },
        { id: "column-toggle", label: "Column toggle" },
      ],
    },
    { id: "multi-line-cells", label: "Multi-line cells" },
    { id: "nested-rows", label: "Nested rows" },
    { id: "full-example", label: "Full example" },
  ],
  "reply-box": [
    { id: "overview", label: "Overview" },
    { id: "default", label: "Default" },
    { id: "footer-only", label: "Footer only" },
    { id: "textarea", label: "Textarea" },
    { id: "basic", label: "Basic" },
    { id: "basic-actions", label: "Basic with actions" },
    { id: "note-mode", label: "Note mode" },
  ],
  "typing-indicator": [
    { id: "overview", label: "Overview" },
    { id: "default", label: "Default typing indicator" },
    { id: "input-with-indicator", label: "Input with typing indicator" },
    { id: "text-variant", label: "User typing indicator" },
    { id: "text-variant-demo", label: "User typing indicator example" },
    {
      id: "with-avatar",
      label: "With avatar",
      children: [
        { id: "with-avatar-dots", label: "Dots with avatar" },
        { id: "with-avatar-text", label: "Name with avatar" },
      ],
    },
  ],
  "metric-card": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "trend", label: "Trend" },
    { id: "sparkline", label: "Sparkline" },
    { id: "menu", label: "Options menu" },
    { id: "help", label: "Help tooltip" },
    { id: "description", label: "Description" },
  ],
  charts: [
    { id: "overview", label: "Overview" },
    {
      id: "chart-bar",
      label: "Bar",
      children: [
        { id: "chart-bar-single", label: "Single bar" },
        { id: "chart-bar-multiple", label: "Multiple bar" },
        { id: "chart-bar-stacked", label: "Stacked bar" },
        {
          id: "chart-bar-horizontal-single",
          label: "Horizontal single bar",
        },
        {
          id: "chart-bar-horizontal-multiple",
          label: "Horizontal multiple bar",
        },
      ],
    },
    {
      id: "chart-line",
      label: "Line",
      children: [
        { id: "chart-line-single", label: "Single line" },
        { id: "chart-line-multiple", label: "Multiple lines" },
        { id: "chart-line-dots", label: "Line with dots" },
      ],
    },
    {
      id: "chart-area",
      label: "Area",
      children: [
        { id: "chart-area-single", label: "Area single" },
        { id: "chart-area-multiple", label: "Area multiple" },
        { id: "chart-area-stacked", label: "Area stacked" },
        { id: "chart-area-gradient", label: "Area gradient" },
      ],
    },
    {
      id: "chart-pie",
      label: "Pie",
      children: [
        { id: "chart-pie-default", label: "Default" },
        { id: "chart-pie-labels", label: "With labels" },
        { id: "chart-pie-donut", label: "Donut" },
        { id: "chart-pie-donut-text", label: "Donut with text" },
      ],
    },
    {
      id: "chart-radar",
      label: "Radar",
      children: [
        { id: "chart-radar-default", label: "Default" },
        { id: "chart-radar-dots", label: "With dots" },
        { id: "chart-radar-lines", label: "Lines" },
        { id: "chart-radar-multiple", label: "Multiple" },
      ],
    },
    {
      id: "chart-radial",
      label: "Radial",
      children: [
        { id: "chart-radial-default", label: "Default" },
        { id: "chart-radial-text", label: "With text" },
        { id: "chart-radial-stacked", label: "Stacked" },
      ],
    },
    { id: "chart-tooltip", label: "Tooltip" },
    { id: "chart-legend", label: "Legend" },
    {
      id: "chart-axis",
      label: "Axis",
      children: [
        { id: "chart-axis-x", label: "X axis" },
        { id: "chart-axis-y", label: "Y axis" },
      ],
    },
    {
      id: "chart-grid",
      label: "Grid",
      children: [
        { id: "chart-grid-x", label: "X axis grid" },
        { id: "chart-grid-y", label: "Y axis grid" },
        { id: "chart-grid-none", label: "No grid" },
      ],
    },
    {
      id: "chart-layout",
      label: "Layout",
      children: [
        { id: "chart-with-header", label: "With header" },
        { id: "chart-with-metric", label: "With metric" },
        {
          id: "chart-with-header-and-metric",
          label: "With header and metric",
        },
      ],
    },
  ],
  "telephone-field": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "default-country", label: "Default country" },
    { id: "force-international-format", label: "Force international format" },
    {
      id: "sizes",
      label: "Sizes",
      children: [
        { id: "sizes-small", label: "Small" },
        { id: "sizes-medium", label: "Medium" },
        { id: "sizes-large", label: "Large" },
      ],
    },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  "search-input": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "with-clear", label: "With clear" },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  "sensitive-field": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "controlled", label: "Controlled" },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
  ],
  "file-input": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    {
      id: "states",
      label: "States",
      children: [
        { id: "states-disabled", label: "Disabled" },
        { id: "states-error", label: "Error" },
      ],
    },
    {
      id: "sizing",
      label: "Sizing",
      children: [
        { id: "sizing-small", label: "Small" },
        { id: "sizing-medium", label: "Medium" },
        { id: "sizing-large", label: "Large" },
      ],
    },
    { id: "required", label: "Required" },
  ],
  "file-tree": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
  ],
  "drop-zone": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "custom-label-description", label: "Custom label and description" },
    {
      id: "states",
      label: "States",
      children: [{ id: "states-disabled", label: "Disabled" }],
    },
  ],
  "drag-and-drop": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "row-actions", label: "Row actions" },
    { id: "nested-example", label: "Nested lists" },
  ],
  counter: [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic example" },
    {
      id: "sizes",
      label: "Sizes",
      children: [
        { id: "sizes-small", label: "Small" },
        { id: "sizes-medium", label: "Medium" },
        { id: "sizes-large", label: "Large" },
      ],
    },
    { id: "variants", label: "Variants" },
    { id: "overflow", label: "Overflow" },
  ],
  "code-snippet": [
    { id: "overview", label: "Overview" },
    { id: "inline", label: "Inline" },
    {
      id: "block",
      label: "Block",
      children: [
        { id: "block-basic", label: "Basic" },
        { id: "block-with-copy", label: "With copy button" },
      ],
    },
  ],
  color: [
    { id: "overview", label: "Overview" },
    { id: "base-color", label: "Base colors" },
    {
      id: "primary-colors",
      label: "Primary colors",
      children: [
        { id: "color-gray", label: "Gray" }
      ],
    },
    {
      id: "secondary-colors",
      label: "Secondary colors",
      children: [
        { id: "color-red", label: "Red" },
        { id: "color-orange", label: "Orange" },
        { id: "color-yellow", label: "Yellow" },
        { id: "color-emerald", label: "Emerald" },
        { id: "color-blue", label: "Blue" },
        { id: "color-violet", label: "Violet" },
      ],
    },
    { id: "accessibility", label: "Accessibility" },
  ],
  typography: [
    { id: "overview", label: "Overview" },
    { 
      id: "font-families", 
      label: "Font families",
      children: [
        { id: "satoshi", label: "Satoshi" },
        { id: "geist-mono", label: "Geist Mono" },
      ],
    },
    { id: "weights", label: "Weights" },
    { id: "type-scale", label: "Type scale" },
    { id: "text-elements", label: "Text elements" },
  ],
  spacing: [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "spacing-scale", label: "Spacing scale" },
    { id: "spacing-patterns", label: "Spacing patterns" },
  ],
  radius: [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "radius-scale", label: "Radius scale" },
  ],
  shadows: [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "elevation-scale", label: "Elevation scale" },
  ],
  icons: [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "sizing", label: "Sizing" },
    { id: "stroke-width", label: "Stroke width" },
    { id: "colour", label: "Colour" },
    { id: "fill", label: "Fill" },
    { id: "accessibility", label: "Accessibility" },
  ],
}
