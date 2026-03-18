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
 * (e.g. /components/button → "button"). Add or edit sections per component.
 */
export const componentSections: ComponentSections = {
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
        { id: "states-invalid", label: "Invalid" },
      ],
    },
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
        { id: "states-invalid", label: "Invalid" },
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
        { id: "states-invalid", label: "Invalid" },
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
        { id: "state-invalid", label: "Invalid" },
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
        { id: "states-invalid", label: "Invalid" },
      ],
    },
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
  ],
  "date-picker": [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic" },
    { id: "range", label: "Range picker" },
    { id: "dob", label: "Date of birth" },
    { id: "input", label: "Input" },
    { id: "time-picker", label: "Time picker" },
    { id: "natural-language", label: "Natural language" },
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
  filters: [{ id: "overview", label: "Overview" }],
  "input-otp": [
    { id: "overview", label: "Overview" },
    { id: "basic-example", label: "Basic example" },
    { id: "separator", label: "Separator" },
    { id: "alphanumeric", label: "Alphanumeric" },
    { id: "custom", label: "Custom" },
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
        { id: "states-invalid", label: "Invalid" },
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
  sidebar: [{ id: "overview", label: "Overview" }],
  "chat-bubble": [{ id: "overview", label: "Overview" }],
  "chat-head": [{ id: "overview", label: "Overview" }],
  "color-picker": [{ id: "overview", label: "Overview" }],
  "data-table": [{ id: "overview", label: "Overview" }],
  "reply-box": [{ id: "overview", label: "Overview" }],
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
  "metric-card": [{ id: "overview", label: "Overview" }],
  charts: [{ id: "overview", label: "Overview" }],
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
        { id: "states-invalid", label: "Invalid" },
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
        { id: "states-invalid", label: "Invalid" },
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
        { id: "states-invalid", label: "Invalid" },
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
  "drop-zone": [{ id: "overview", label: "Overview" }],
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
  "code-snippet": [{ id: "overview", label: "Overview" }],
}
