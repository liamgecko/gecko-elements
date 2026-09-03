import { HeaderSection, MainSection } from "@/components/layout/docs-section";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { Code } from "@gecko/ui/components/code";

export function GuidesChoosingComponentsPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Choosing components"
        description="Start from the task, not the component name. This guide maps common UI tasks to the right Gecko Elements component using confirmed product rules."
      />

      <MainSection
        id="actions"
        title="Actions"
        description="Triggering something, confirming something, or opening a list of things to do."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — a
            single action. Use <Code>default</Code> for the primary action,{" "}
            <Code>outline</Code> as the practical secondary (prefer over{" "}
            <Code>secondary</Code>), <Code>ghost</Code> for toolbar chrome,{" "}
            <Code>destructive</Code> for delete, and{" "}
            <Code>ghost-destructive</Code> for icon trash controls.
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — actions that belong to a visible control (for example Data table
            row actions or Page Header menus).
          </li>
          <li>
            <DocsPageLink to="/components/context-menu">
              Context menu
            </DocsPageLink>{" "}
            — exclusively on{" "}
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            rows (right-click / secondary pointer).
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — confirm irreversible actions, especially deletion. Closing a
            conversation is reversible — use{" "}
            <DocsPageLink to="/components/toast">Toast</DocsPageLink> with undo
            instead.
          </li>
          <li>
            <DocsPageLink to="/components/command">Command</DocsPageLink> — not
            shipped in product UI yet. Do not invent an app-wide command palette
            until product adopts it.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="text-entry"
        title="Text entry"
        description="Collecting typed values. Wrap controls in Field for labels, help, and errors."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            general single-line text inside{" "}
            <DocsPageLink to="/components/field">Field</DocsPageLink>.
          </li>
          <li>
            <DocsPageLink to="/components/textarea">
              Textarea field
            </DocsPageLink>{" "}
            — multiline text inside Field.
          </li>
          <li>
            <DocsPageLink to="/components/search">Search</DocsPageLink> — a
            query that filters results elsewhere (for example a data table), not
            for picking from a fixed option list.
          </li>
          <li>
            <DocsPageLink to="/components/sensitive-field">
              Sensitive field
            </DocsPageLink>{" "}
            — API keys, secrets, or masked values (hidden by default).
          </li>
          <li>
            <DocsPageLink to="/components/number-field">
              Number field
            </DocsPageLink>{" "}
            — numeric quantities with steppers (counts and amounts).
          </li>
          <li>
            <DocsPageLink to="/components/telephone-field">
              Telephone field
            </DocsPageLink>{" "}
            — international phone numbers with country selector.
          </li>
          <li>
            <DocsPageLink to="/components/date-field">Date field</DocsPageLink>{" "}
            — date of birth (segmented day / month / year).
          </li>
          <li>
            <DocsPageLink to="/components/colour-field">
              Colour field
            </DocsPageLink>{" "}
            — brand elements (account, heading, or widget colour).
          </li>
          <li>
            <DocsPageLink to="/components/inline-edit">
              Inline edit
            </DocsPageLink>{" "}
            — short in-place edits (for example form title or description when
            creating a form).
          </li>
          <li>
            <DocsPageLink to="/components/otp-field">OTP field</DocsPageLink> —
            verification codes with auto-advance and paste.
          </li>
          <li>
            <DocsPageLink to="/components/label">Label</DocsPageLink> — only via{" "}
            <Code>FieldLabel</Code> inside Field. Never as a page heading.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="selection"
        title="Selection"
        description="Choosing from a set of options."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink> /
            <DocsPageLink to="/components/radio-group">
              {" "}
              Radio group
            </DocsPageLink>{" "}
            — binary or single-choice groups. Errors sit on the group, not each
            item.
          </li>
          <li>
            <DocsPageLink to="/components/switch">Switch</DocsPageLink> — an
            on/off preference that takes effect immediately.
          </li>
          <li>
            <DocsPageLink to="/components/select">Select</DocsPageLink> — short,
            fixed lists that do not need search (admin / product UI).
          </li>
          <li>
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink> —
            longer lists where typing should filter options.
          </li>
          <li>
            <DocsPageLink to="/components/native-select">
              Native select
            </DocsPageLink>{" "}
            — student-facing surfaces (forms, events, live chat widget) where
            native mobile menus are preferred.
          </li>
          <li>
            <DocsPageLink to="/components/date-picker">
              Date picker
            </DocsPageLink>{" "}
            — future or general dates (events, deadlines). Not date of birth.
          </li>
          <li>
            <DocsPageLink to="/components/calendar">Calendar</DocsPageLink> —
            typically only inside Date picker today.
          </li>
          <li>
            <DocsPageLink to="/components/emoji-picker">
              Emoji picker
            </DocsPageLink>{" "}
            — tray for reactions; panel for inserting an emoji in a composer.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="files"
        title="Files"
        description="Uploading and displaying files."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/attachment">Attachment</DocsPageLink>{" "}
            — preferred in-form upload row inside a fieldset (empty, progress,
            error, finished file).
          </li>
          <li>
            <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink> —
            large dedicated upload surface where adding files is the only
            purpose (for example a hero image in a dialog).
          </li>
          <li>
            <DocsPageLink to="/components/file-field">File field</DocsPageLink>{" "}
            — not the primary Gecko upload pattern; prefer Attachment.
          </li>
          <li>
            <DocsPageLink to="/components/file-tree">File tree</DocsPageLink> —
            not used in product UI today. Do not invent uses until product
            adopts it.
          </li>
          <li>
            <DocsPageLink to="/components/sortable-list">
              Sortable list
            </DocsPageLink>{" "}
            — reordering only. Not for file upload.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="overlays"
        title="Overlays"
        description="Content that appears above the page."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> —
            focused setup tasks (create / edit forms). Blocks the page until
            finished. Not for action confirmation.
          </li>
          <li>
            <DocsPageLink to="/components/sheet">Sheet</DocsPageLink> — detail
            or side task that keeps page context visible behind it.
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — confirmation only: deletion, discarding unsaved work, or
            confirming a save.
          </li>
          <li>
            <DocsPageLink to="/components/popover">Popover</DocsPageLink> —
            supporting content on a trigger that is not an action menu (for
            example Filters or Colour field).
          </li>
          <li>
            <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink> —
            icon-only buttons, truncated labels, Metric card help. Never the
            sole place for required instructions.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="feedback"
        title="Feedback"
        description="Telling people what happened or what is happening."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/toast">Toast</DocsPageLink> —
            ephemeral feedback after an action, including undoable outcomes (for
            example close conversation).
          </li>
          <li>
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> — an
            persistent, non-blocking callout within a page or section. The
            parent removes it when the condition ends; make it dismissible only
            when the message is safe to acknowledge and clear.
          </li>
          <li>
            <DocsPageLink to="/components/empty">Empty</DocsPageLink> — no data
            yet on a list page. Canonical composition: icon + title + CTA.
          </li>
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> —
            indeterminate waits (page or panel load).
          </li>
          <li>
            <DocsPageLink to="/components/progress">Progress</DocsPageLink> —
            reporting how complete a metric or job is — not the primary page
            loading pattern.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="data"
        title="Data display"
        description="Showing structured information."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — default for product lists (events, forms, broadcasts) with
            filtering, sorting, actions, or pagination.
          </li>
          <li>
            <DocsPageLink to="/components/table">Table</DocsPageLink> — simple
            non-interactive markup (for example detail inside a Metric card).
          </li>
          <li>
            <DocsPageLink to="/components/filters">Filters</DocsPageLink> —
            product list filtering, always paired with Data table. Inbox
            conversation filters are a separate pattern.
          </li>
          <li>
            <DocsPageLink to="/components/metric-card">
              Metric card
            </DocsPageLink>{" "}
            — headline metrics, typically in rows of three.
          </li>
          <li>
            <DocsPageLink to="/components/charts">Charts</DocsPageLink> —
            detailed trends and analysis.
          </li>
          <li>
            <DocsPageLink to="/components/card">Card</DocsPageLink> — grouped
            content inside Page Container (for example dashboard blocks). Never
            wrap Container in a Card.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="indicators"
        title="Indicators"
        description="Compact labels, counts, and people."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/badge">Badge</DocsPageLink> — status
            in Data table columns, or labels / tags.
          </li>
          <li>
            <DocsPageLink to="/components/counter">Counter</DocsPageLink> —
            compact counts (for example notifications on a Badge).
          </li>
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> —
            whenever displaying a user (especially “created by” columns).
          </li>
          <li>
            <DocsPageLink to="/components/avatar-group">
              Avatar group
            </DocsPageLink>{" "}
            — more than one person together (for example conversation
            assignees).
          </li>
          <li>
            <DocsPageLink to="/components/marker">Marker</DocsPageLink> —
            conversation thread only: typing / AI composing, system messages, or
            labelled separators — not a product-wide status Badge.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="conversation"
        title="Conversation"
        description="Chat in Inbox and the live chat widget."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink> —
            conversation list only (Inbox). Never app navigation.
          </li>
          <li>
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>{" "}
            — transcript with notes and system messages included.
          </li>
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> /{" "}
            <DocsPageLink to="/components/bubble">Bubble</DocsPageLink> —
            conversation rows; Bubble variants map to agent, customer, bot, and
            note roles.
          </li>
          <li>
            <DocsPageLink to="/components/reply-box">Reply box</DocsPageLink> —
            default composer in Inbox; basic variant in the live chat widget.
          </li>
          <li>
            <DocsPageLink to="/components/typing-indicator">
              Typing indicator
            </DocsPageLink>{" "}
            — pinned separately at the bottom of the conversation container.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="navigation"
        title="Navigation"
        description="Moving around the application."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            — app-wide navigation only. Never a conversation list.
          </li>
          <li>
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> —
            sticky product chrome (account, status, user menu) on every page.
          </li>
          <li>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> —
            page title, breadcrumbs, actions, and optional section tabs. Not
            used on Inbox.
          </li>
          <li>
            <DocsPageLink to="/components/tabs">Tabs</DocsPageLink> — Header
            tabs for sub-pages; standalone Tabs for sectioning content in the
            page body.
          </li>
          <li>
            <DocsPageLink to="/components/breadcrumb">Breadcrumb</DocsPageLink>{" "}
            — only inside Page Header.
          </li>
          <li>
            <DocsPageLink to="/components/pagination">Pagination</DocsPageLink>{" "}
            — under Data table (and Activity feed) results. Never in Header.
          </li>
          <li>
            <DocsPageLink to="/components/sidebar">Sidebar</DocsPageLink> —
            primitives for building App Sidebar or custom rails.
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="layout"
        title="Layout"
        description="Structuring and ordering content on the page."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/container">
              Page Container
            </DocsPageLink>{" "}
            — page body spacing on every screen except Inbox.
          </li>
          <li>
            <DocsPageLink to="/components/scroll-area">
              Scroll area
            </DocsPageLink>{" "}
            — preferred over native scroll in constrained regions while App
            Header / App Sidebar stay sticky.
          </li>
          <li>
            <DocsPageLink to="/components/accordion">Accordion</DocsPageLink> —
            default reveals related secondary information in dense panels;
            sectional splits large setup forms. Never use Accordion for page
            navigation or a single collapsible section.
          </li>
          <li>
            <DocsPageLink to="/components/separator">Separator</DocsPageLink> —
            presentational divider only. Not semantic status.
          </li>
          <li>
            <DocsPageLink to="/components/activity-feed">
              Activity feed
            </DocsPageLink>{" "}
            — contact views and Inbox contact-details sidebar. Use the default
            variant unless condensed is explicitly requested. Paginate when
            long. Not a conversation transcript.
          </li>
          <li>
            <DocsPageLink to="/components/code-snippet">
              Code snippet
            </DocsPageLink>{" "}
            — customer-facing copyable values such as embed codes.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
