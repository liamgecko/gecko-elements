import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

const components = [
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
    name: "Input",
    description: "Single‑line text inputs.",
    path: "/components/input",
  },
  {
    name: "Input Group",
    description: "Group inputs and adornments as a single control.",
    path: "/components/input-group",
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
    name: "Sonner",
    description: "Toast notifications for ephemeral feedback.",
    path: "/components/sonner",
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
    name: "Toggle",
    description: "Single on/off toggle button.",
    path: "/components/toggle",
  },
  {
    name: "Toggle Group",
    description: "Grouped toggles for segmented controls.",
    path: "/components/toggle-group",
  },
  {
    name: "Tooltip",
    description: "Small labels that appear on hover or focus.",
    path: "/components/tooltip",
  },
] as const

export function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Home</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Component gallery
        </p>
      </div>
      <section aria-labelledby="components-heading">
        <h2 id="components-heading" className="sr-only">
          Available components
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {components.map(({ name, description, path }) => (
            <li key={path}>
              <article className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
                <h3 className="font-medium">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
                <p className="mt-3">
                  <Link
                    to={path}
                    className={buttonVariants({ variant: "secondary", size: "sm" })}
                  >
                    View component
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
