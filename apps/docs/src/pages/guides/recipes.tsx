import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { DocsPageLink } from "@/components/layout/docs-page-link"
import { Code } from "@gecko/ui/components/code"

export function GuidesRecipesPage() {
  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Recipes"
          description="Composed patterns that show how to combine several components for common Gecko screens. Each recipe names the components involved and when to reach for the pattern."
        />
      </PageSection>

      <PageSection id="page-shell" label="Page shell">
        <PageSectionHeader
          title="Page shell"
          description="How product chrome and page body stack together."
        />

        <PageSubsectionHeader
          id="page-shell-standard"
          title="Standard page"
          description={
            <>
              Every product page keeps sticky app chrome, then a page title bar
              and body spacing — except Inbox.
            </>
          }
        />
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> —
            account switcher, call / messaging status, user menu.
          </li>
          <li>
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            — app-wide navigation (wrap the layout in{" "}
            <DocsPageLink to="/components/sidebar">
              SidebarProvider
            </DocsPageLink>
            ; page content sits in <Code>SidebarInset</Code>).
          </li>
          <li>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> —
            breadcrumbs, title, actions, optional Header tabs.
          </li>
          <li>
            <DocsPageLink to="/structure/container">
              Page Container
            </DocsPageLink>{" "}
            — consistent body padding and background.
          </li>
          <li>
            Prefer{" "}
            <DocsPageLink to="/components/scroll-area">
              Scroll area
            </DocsPageLink>{" "}
            for overflow inside the shell so app chrome stays sticky.
          </li>
        </ul>

        <PageSubsectionHeader
          id="page-shell-inbox"
          title="Inbox exception"
          description={
            <>
              Inbox keeps App Header and App Sidebar, but skips Page Header and
              Page Container. The body is a three-column layout.
            </>
          }
        />
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li>
            Left —{" "}
            <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink>{" "}
            conversation list (never App Sidebar).
          </li>
          <li>
            Centre — conversation controls,{" "}
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>
            , <DocsPageLink to="/components/reply-box">Reply box</DocsPageLink>.
          </li>
          <li>
            Right — contact details (default{" "}
            <DocsPageLink to="/components/accordion">Accordion</DocsPageLink>
            ), including{" "}
            <DocsPageLink to="/components/activity-feed">
              Activity feed
            </DocsPageLink>
            .
          </li>
        </ul>
      </PageSection>

      <PageSection id="forms" label="Forms">
        <PageSectionHeader
          title="Forms"
          description="Setup interfaces use Field as the layout wrapper. Every control sits inside Field with a label, optional helper, and error."
        />

        <PageSubsectionHeader
          id="forms-basic"
          title="Basic form"
          description={
            <>
              Wrap controls in{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> →{" "}
              <Code>FieldLabel</Code> + control + <Code>FieldDescription</Code>{" "}
              + <Code>FieldError</Code>. Group related fields in a{" "}
              <Code>FieldGroup</Code> inside a <Code>FieldSet</Code>. When
              invalid, the error replaces the helper text.
            </>
          }
        />
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li>
            Prefer{" "}
            <DocsPageLink to="/components/attachment">Attachment</DocsPageLink>{" "}
            for in-form uploads;{" "}
            <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink>{" "}
            for large dedicated upload surfaces.
          </li>
          <li>
            <DocsPageLink to="/components/select">Select</DocsPageLink> for
            short fixed lists;{" "}
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink> when
            search helps;{" "}
            <DocsPageLink to="/components/native-select">
              Native select
            </DocsPageLink>{" "}
            on student-facing surfaces.
          </li>
          <li>
            <DocsPageLink to="/components/date-field">Date field</DocsPageLink>{" "}
            for date of birth;{" "}
            <DocsPageLink to="/components/date-picker">
              Date picker
            </DocsPageLink>{" "}
            for future dates.
          </li>
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — one{" "}
            <Code>default</Code> primary per form area; use <Code>outline</Code>{" "}
            for secondary.
          </li>
        </ul>

        <PageSubsectionHeader
          id="forms-sizing"
          title="Sizing"
          description={
            <>
              Use each control’s default size unless a specific layout requires
              otherwise. When you do set <Code>size</Code> on neighbouring
              controls in one row, keep them matched.
            </>
          }
        />

        <PageSubsectionHeader
          id="forms-validation"
          title="Validation"
          description={
            <>
              Mark invalid controls with <Code>aria-invalid</Code> and connect a{" "}
              <Code>FieldError</Code>. Do not use disabled to represent a
              validation error. For checkbox and radio groups, put the error on
              the group.
            </>
          }
        />

        <PageSubsectionHeader
          id="forms-sectional"
          title="Large setup forms"
          description={
            <>
              Use sectional{" "}
              <DocsPageLink to="/components/accordion">Accordion</DocsPageLink>{" "}
              to break large setup into meaningful steps. Allow multiple
              sections to remain open, keep their fields mounted, and open any
              section that contains a validation error. For sub-pages within a
              section, use Page Header tabs instead.
            </>
          }
        />
      </PageSection>

      <PageSection id="list-pages" label="List pages">
        <PageSectionHeader
          title="List pages"
          description="Product lists such as events, forms, and broadcasts."
        />

        <PageSubsectionHeader
          id="list-pages-table"
          title="Data table stack"
          description={
            <>
              Default to{" "}
              <DocsPageLink to="/components/data-table">
                Data table
              </DocsPageLink>{" "}
              with <DocsPageLink to="/components/filters">Filters</DocsPageLink>{" "}
              (via <Code>toolbar.filters</Code> or standalone) and{" "}
              <DocsPageLink to="/components/pagination">
                Pagination
              </DocsPageLink>{" "}
              under the results.
            </>
          }
        />
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li>
            Row actions via{" "}
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>
            ; right-click via{" "}
            <DocsPageLink to="/components/context-menu">
              Context menu
            </DocsPageLink>{" "}
            on Data table only.
          </li>
          <li>
            Status and tags with{" "}
            <DocsPageLink to="/components/badge">Badge</DocsPageLink>; people
            with <DocsPageLink to="/components/avatar">Avatar</DocsPageLink>.
          </li>
          <li>
            Empty results with{" "}
            <DocsPageLink to="/components/empty">Empty</DocsPageLink> (icon +
            title + CTA).
          </li>
          <li>
            Use <DocsPageLink to="/components/table">Table</DocsPageLink> only
            for simple non-interactive markup (for example inside a Metric
            card).
          </li>
        </ul>
      </PageSection>

      <PageSection id="overlays" label="Overlays">
        <PageSectionHeader
          title="Overlays"
          description="Match the overlay to the task."
        />

        <PageSubsectionHeader
          id="overlays-choosing"
          title="Choosing an overlay"
          description="Start from the task, not the component."
        />
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> —
            focused create / edit setup. Blocks the page.
          </li>
          <li>
            <DocsPageLink to="/components/sheet">Sheet</DocsPageLink> — detail
            or side task with page context still visible.
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — confirm deletion or other irreversible / blocking decisions only.
          </li>
          <li>
            <DocsPageLink to="/components/popover">Popover</DocsPageLink> —
            supporting controls on a trigger (not an action menu).
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — actions from a visible control.
          </li>
          <li>
            <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink> —
            short clarification. Never required instructions alone.
          </li>
        </ul>

        <PageSubsectionHeader
          id="overlays-triggers"
          title="Triggers"
          description={
            <>
              Every overlay needs a visible trigger. Use{" "}
              <DocsPageLink to="/components/button">Button</DocsPageLink> for
              dialogs and sheets. Name the trigger after the action, not the
              overlay.
            </>
          }
        />

        <PageSubsectionHeader
          id="overlays-destructive"
          title="Destructive actions"
          description={
            <>
              Confirm irreversible deletes with{" "}
              <DocsPageLink to="/components/alert-dialog">
                Alert dialog
              </DocsPageLink>
              . Use <Code>variant=&quot;destructive&quot;</Code> on the Alert
              dialog for deletion. Use the default treatment for discarding
              unsaved work and confirming a save. For reversible outcomes (for
              example close conversation), prefer{" "}
              <DocsPageLink to="/components/toast">Toast</DocsPageLink> with
              undo.
            </>
          }
        />
      </PageSection>

      <PageSection id="feedback" label="Feedback">
        <PageSectionHeader
          title="Feedback"
          description="Choose the surface that matches urgency and permanence."
        />

        <PageSubsectionHeader
          id="feedback-choosing"
          title="Choosing feedback"
          description="Match the message to the right surface."
        />
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/toast">Toast</DocsPageLink> —
            ephemeral success, error, or undoable outcomes.
          </li>
          <li>
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> —
            persistent, non-blocking callout within a page or section. The
            parent removes it when the condition ends; make it dismissible only
            when the message is safe to acknowledge and clear.
          </li>
          <li>
            <DocsPageLink to="/components/empty">Empty</DocsPageLink> — no data
            yet; icon + title + CTA.
          </li>
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> —
            indeterminate page or panel load.
          </li>
          <li>
            <DocsPageLink to="/components/progress">Progress</DocsPageLink> —
            reporting completeness, not primary page loading.
          </li>
        </ul>

        <PageSubsectionHeader
          id="feedback-loading"
          title="Loading states"
          description={
            <>
              Use <DocsPageLink to="/components/spinner">Spinner</DocsPageLink>{" "}
              for indeterminate waits. Use{" "}
              <DocsPageLink to="/components/progress">Progress</DocsPageLink>{" "}
              when reporting how complete something is. Inside a{" "}
              <DocsPageLink to="/components/button">Button</DocsPageLink>, set{" "}
              <Code>disabled</Code> while the action is in flight and render a
              Spinner as a child when needed.
            </>
          }
        />
      </PageSection>
    </div>
  )
}
