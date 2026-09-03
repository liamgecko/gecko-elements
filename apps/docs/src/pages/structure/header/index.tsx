import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Code } from "@gecko/ui/components/code";
import { Header } from "@gecko/ui/components/header";

const demoBreadcrumbs = {
  items: [
    { label: "Home", href: "/" },
    { label: "Breadcrumb link", href: "/components" },
    { label: "Breadcrumb current", current: true },
  ],
} as const;

const demoTabs = {
  tabsProps: { defaultValue: "one" },
  items: [
    { value: "one", label: "Label" },
    { value: "two", label: "Label" },
    { value: "three", label: "Label" },
    { value: "four", label: "Label" },
    { value: "five", label: "Label" },
    { value: "six", label: "Label" },
    { value: "seven", label: "Label" },
    { value: "eight", label: "Label" },
    { value: "nine", label: "Label" },
    { value: "ten", label: "Label" },
  ],
} as const;

export function StructureHeaderPage() {
  const importSnippet = `import { Header } from "@gecko/ui/components/header"`;

  const compositionSnippet = `Header
├── Breadcrumb
├── heading and subheading
├── actions
│   ├── Toggle (favourite)
│   ├── Button or DropdownMenu (secondary)
│   └── Button (primary)
└── Tabs (line)`;

  const exampleSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
  subheading="Sub heading"
  favouriteAction={{ defaultPressed: true }}
  secondaryActions={[{ label: "Button" }]}
  primaryAction={{ label: "Button" }}
  tabs={{
    tabsProps: { defaultValue: "one" },
    items: [
      { value: "one", label: "Label" },
      { value: "two", label: "Label" },
    ],
  }}
/>`;

  const examplesBreadcrumbsOnlySnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
/>`;

  const examplesActionsSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  secondaryActions={[{ label: "Button" }]}
  primaryAction={{ label: "Button" }}
/>`;

  const examplesActionsMultipleSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  secondaryActions={[
    { label: "Export" },
    { label: "Share" },
  ]}
  primaryAction={{ label: "Save" }}
/>`;

  const examplesActionsDropdownSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  secondaryActions={[
    {
      kind: "menu",
      label: "Actions",
      items: [
        { label: "Edit" },
        { label: "Duplicate" },
        {
          label: "Delete",
          variant: "destructive",
          separatorBefore: true,
        },
      ],
    },
  ]}
/>`;

  const examplesHeadingSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
/>`;

  const examplesSubHeadingSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
  subheading="Sub heading"
/>`;

  const examplesTabsSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  tabs={{
    tabsProps: { defaultValue: "one" },
    items: [
      { value: "one", label: "Label" },
      { value: "two", label: "Label" },
    ],
  }}
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Page header"
        description="The Header component is the top of a page. It can hold location, a title, a favourite control, actions, and in-page tabs in a single layout."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Header as the page-level top bar under the sticky app chrome (
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> /{" "}
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>
            ). It shows where you are, the page title, actions, and optional
            sub-navigation tabs. Every Header includes the favourite control;
            use <Code>favouriteAction</Code> to configure its state, label, or
            icon. Pair Header with{" "}
            <DocsPageLink to="/structure/container">
              Page Container
            </DocsPageLink>{" "}
            for the body below.
            <br />
            <br />
            Avoid using it on Inbox — that screen uses a custom layout. Avoid
            using it for a card title or section heading. Breadcrumbs belong
            only in Header. For sectioning content inside the page body, use
            standalone <DocsPageLink to="/components/tabs">
              Tabs
            </DocsPageLink>{" "}
            instead of Header tabs. Start every breadcrumb trail with Home;
            Header displays that first ancestor using the standard house icon.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Header to add a page header."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="Header is a single public component assembled from the appropriate Gecko primitives. The favourite control is always present; other regions render only when configured."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="example"
        title="Example"
        description="A full header with breadcrumbs, title, subheading, favourite, actions, and tabs. Use this when the page needs the complete top bar."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Header
              breadcrumbs={demoBreadcrumbs}
              title="Heading"
              subheading="Sub heading"
              favouriteAction={{
                defaultPressed: true,
              }}
              secondaryActions={[{ label: "Button" }]}
              primaryAction={{ label: "Button" }}
              tabs={demoTabs}
            />
            <Code
              variant="block"
              language="tsx"
              code={exampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="examples"
        title="Examples"
        description="Configure the regions required by the page. Every configuration retains the standard favourite control."
      >
        <ChildSection
          id="examples-breadcrumbs-only"
          title="Breadcrumbs"
          description={
            <>
              Pass <Code>breadcrumbs</Code> with no title or additional actions.
              Use this when the page only needs location context alongside the
              standard favourite control.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header breadcrumbs={demoBreadcrumbs} />
              <Code
                variant="block"
                language="tsx"
                code={examplesBreadcrumbsOnlySnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-actions"
          title="Actions"
          description={
            <>
              Pass <Code>secondaryActions</Code> and <Code>primaryAction</Code>.
              Use this when the page has one or two actions and no heading. The
              favourite control remains first in the action group.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header
                breadcrumbs={demoBreadcrumbs}
                secondaryActions={[{ label: "Button" }]}
                primaryAction={{ label: "Button" }}
              />
              <Code
                variant="block"
                language="tsx"
                code={examplesActionsSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-actions-multiple"
          title="Multiple actions"
          description={
            <>
              Pass several entries in <Code>secondaryActions</Code> before a
              single <Code>primaryAction</Code>. Use this when there are extra
              outline actions alongside the primary.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header
                breadcrumbs={demoBreadcrumbs}
                secondaryActions={[{ label: "Export" }, { label: "Share" }]}
                primaryAction={{ label: "Save" }}
              />
              <Code
                variant="block"
                language="tsx"
                code={examplesActionsMultipleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-actions-dropdown"
          title="Actions dropdown"
          description={
            <>
              Use a menu entry in <Code>secondaryActions</Code> when several
              related actions belong behind one default-sized Actions button.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header
                breadcrumbs={demoBreadcrumbs}
                secondaryActions={[
                  {
                    kind: "menu",
                    label: "Actions",
                    items: [
                      { label: "Edit" },
                      { label: "Duplicate" },
                      {
                        label: "Delete",
                        variant: "destructive",
                        separatorBefore: true,
                      },
                    ],
                  },
                ]}
              />
              <Code
                variant="block"
                language="tsx"
                code={examplesActionsDropdownSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-heading"
          title="Heading"
          description={
            <>
              Pass <Code>title</Code>. Use this when the page needs a name under
              the breadcrumbs.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header breadcrumbs={demoBreadcrumbs} title="Heading" />
              <Code
                variant="block"
                language="tsx"
                code={examplesHeadingSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-sub-heading"
          title="Subheading"
          description={
            <>
              Pass <Code>subheading</Code> with <Code>title</Code>. Use this
              when a short supporting line sits under the heading.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header
                breadcrumbs={demoBreadcrumbs}
                title="Heading"
                subheading="Sub heading"
              />
              <Code
                variant="block"
                language="tsx"
                code={examplesSubHeadingSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-tabs"
          title="Tabs"
          description={
            <>
              Pass <Code>tabs</Code>. Use this when in-page sections sit under
              the header.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Header breadcrumbs={demoBreadcrumbs} tabs={demoTabs} />
              <Code
                variant="block"
                language="tsx"
                code={examplesTabsSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Include only the page-level regions needed to orient people and expose actions."
      >
        <DocsDoDont
          doItems={[
            <>Use Header once at the top of a page.</>,
            <>
              Use <Code>breadcrumbs</Code> to show the page’s location.
            </>,
            <>Start the breadcrumb trail with the Home ancestor.</>,
            <>
              Pair a concise <Code>subheading</Code> with a clear{" "}
              <Code>title</Code>.
            </>,
            <>
              Keep one <Code>primaryAction</Code> and place supporting actions
              in <Code>secondaryActions</Code>.
            </>,
            <>
              Use <Code>tabs</Code> for sub-pages within the current section.
            </>,
          ]}
          dontItems={[
            <>Don’t use Header on Inbox — that screen uses a custom layout.</>,
            <>Don’t use Header for card titles or section headings.</>,
            <>
              Don’t pass empty optional regions; omit configuration the page
              does not need.
            </>,
            <>Don’t give several actions equal primary emphasis.</>,
            <>
              Don’t use Header tabs for sectioning content inside the page body
              — use standalone{" "}
              <DocsPageLink to="/components/tabs">Tabs</DocsPageLink>.
            </>,
            <>
              Don’t recreate page padding in Header; pair it with{" "}
              <DocsPageLink to="/structure/container">
                Page Container
              </DocsPageLink>
              .
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Props and configuration types for Header."
      >
        <ChildSection
          id="api-header"
          title="Header"
          description="The complete page-level header. It accepts native div props."
        >
          <DocsApiTable
            aria-label="Header API properties"
            rows={[
              {
                name: "breadcrumbs",
                type: "HeaderBreadcrumbsProps",
                description: "Renders the page location trail.",
              },
              {
                name: "title",
                type: "React.ReactNode",
                description: "Renders the page heading.",
              },
              {
                name: "subheading",
                type: "React.ReactNode",
                description: "Renders supporting text below the title.",
              },
              {
                name: "favouriteAction",
                type: "HeaderFavouriteActionProps",
                description:
                  "Configures the standard favourite toggle in the action area.",
              },
              {
                name: "secondaryActions",
                type: "readonly HeaderSecondaryAction[]",
                description:
                  "Adds supporting outline actions before the primary action.",
              },
              {
                name: "primaryAction",
                type: "HeaderActionProps",
                description: "Adds the main page action.",
              },
              {
                name: "tabs",
                type: "HeaderTabsProps",
                description:
                  "Renders in-page tabs along the bottom of the header.",
              },
              {
                name: "className",
                type: "string",
                description: "Adds layout classes to the Header root.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-breadcrumbs-props"
          title="HeaderBreadcrumbsProps"
          description="Configures the breadcrumb region."
        >
          <DocsApiTable
            aria-label="HeaderBreadcrumbsProps API properties"
            rows={[
              {
                name: "items",
                type: "readonly HeaderBreadcrumbItem[]",
                description: "Supplies the ordered location trail.",
              },
              {
                name: "navProps",
                type: "Breadcrumb props",
                description: "Passes properties to the breadcrumb navigation.",
              },
              {
                name: "listProps",
                type: "BreadcrumbList props",
                description: "Passes properties to the breadcrumb list.",
              },
              {
                name: "separatorProps",
                type: "BreadcrumbSeparator props",
                description: "Passes properties to each breadcrumb separator.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-breadcrumb-item"
          title="HeaderBreadcrumbItem"
          description="Defines an ancestor link or the current page."
        >
          <DocsApiTable
            aria-label="HeaderBreadcrumbItem API properties"
            rows={[
              {
                name: "label",
                type: "React.ReactNode",
                description:
                  "Displays the location label and names the first Home icon.",
              },
              {
                name: "current",
                type: "boolean",
                defaultValue: "false",
                description: "Marks the final item as the current page.",
              },
              {
                name: "href",
                type: "string",
                description: "Supplies a native destination for an ancestor.",
              },
              {
                name: "render",
                type: "React.ReactElement",
                description: "Supplies a router link for an ancestor.",
              },
              {
                name: "renderLabelOnly",
                type: "true",
                description:
                  "Uses an already interactive label as the ancestor link.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-favourite-action-props"
          title="HeaderFavouriteActionProps"
          description="Configures the favourite control that appears in every Header."
        >
          <DocsApiTable
            aria-label="HeaderFavouriteActionProps API properties"
            rows={[
              {
                name: "pressed",
                type: "boolean",
                description: "Controls the favourite state.",
              },
              {
                name: "defaultPressed",
                type: "boolean",
                defaultValue: "false",
                description: "Sets the initial uncontrolled favourite state.",
              },
              {
                name: "onPressedChange",
                type: "Toggle change handler",
                description: "Runs when the favourite state changes.",
              },
              {
                name: "ariaLabel",
                type: "string",
                description:
                  "Overrides the favourite control’s accessible name.",
              },
              {
                name: "icon",
                type: "React.ReactNode",
                description: "Replaces the standard star icon.",
              },
              {
                name: "tooltipAddLabel",
                type: "string",
                defaultValue: '"Add to favourites"',
                description:
                  "Labels the action when the page is not a favourite.",
              },
              {
                name: "tooltipRemoveLabel",
                type: "string",
                defaultValue: '"Remove from favourites"',
                description: "Labels the action when the page is a favourite.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-action-props"
          title="HeaderActionProps"
          description="Configures the primary action."
        >
          <DocsApiTable
            aria-label="HeaderActionProps API properties"
            rows={[
              {
                name: "label",
                type: "React.ReactNode",
                description: "Supplies the visible action label.",
              },
              {
                name: "icon",
                type: "React.ReactNode",
                description: "Adds an explicit action icon.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-secondary-button-action"
          title="HeaderSecondaryButtonAction"
          description="Configures a secondary button action."
        >
          <DocsApiTable
            aria-label="HeaderSecondaryButtonAction API properties"
            rows={[
              {
                name: "kind",
                type: '"button"',
                defaultValue: '"button"',
                description: "Selects the button action shape.",
              },
              {
                name: "label",
                type: "React.ReactNode",
                description: "Supplies the visible action label.",
              },
              {
                name: "icon",
                type: "React.ReactNode",
                description: "Adds an explicit action icon.",
              },
              {
                name: "ariaLabel",
                type: "string",
                description:
                  "Names an icon-only action and is required when label is omitted.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-secondary-menu-action"
          title="HeaderSecondaryMenuAction"
          description="Configures a secondary dropdown action."
        >
          <DocsApiTable
            aria-label="HeaderSecondaryMenuAction API properties"
            rows={[
              {
                name: "kind",
                type: '"menu"',
                description: "Selects the dropdown action shape.",
              },
              {
                name: "label",
                type: "React.ReactNode",
                description: "Supplies the visible trigger label.",
              },
              {
                name: "icon",
                type: "React.ReactNode",
                description: "Adds an explicit trigger icon.",
              },
              {
                name: "ariaLabel",
                type: "string",
                description: "Names an icon-only menu trigger.",
              },
              {
                name: "items",
                type: "readonly HeaderMenuItem[]",
                description: "Supplies the menu actions.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"end"',
                description: "Aligns the menu with its trigger.",
              },
              {
                name: "triggerProps",
                type: "Button props",
                description: "Passes properties to the menu trigger Button.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-menu-item"
          title="HeaderMenuItem"
          description="Defines an action inside a secondary dropdown."
        >
          <DocsApiTable
            aria-label="HeaderMenuItem API properties"
            rows={[
              {
                name: "label",
                type: "React.ReactNode",
                description: "Supplies the visible menu-item label.",
              },
              {
                name: "onSelect",
                type: "() => void",
                description: "Runs when the menu item is selected.",
              },
              {
                name: "variant",
                type: '"default" | "destructive"',
                defaultValue: '"default"',
                description: "Sets the menu item’s action treatment.",
              },
              {
                name: "separatorBefore",
                type: "boolean",
                defaultValue: "false",
                description: "Separates the item from the group above it.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-tabs-props"
          title="HeaderTabsProps"
          description="Configures the line tabs at the bottom of Header."
        >
          <DocsApiTable
            aria-label="HeaderTabsProps API properties"
            rows={[
              {
                name: "items",
                type: "readonly HeaderTabsItem[]",
                description: "Supplies the tab triggers.",
              },
              {
                name: "tabsProps",
                type: "Tabs props",
                description: "Configures the Tabs root and selected value.",
              },
              {
                name: "listProps",
                type: "TabsList props",
                description: "Passes properties to the tab list.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-header-tabs-item"
          title="HeaderTabsItem"
          description="Defines one page-header tab trigger."
        >
          <DocsApiTable
            aria-label="HeaderTabsItem API properties"
            rows={[
              {
                name: "value",
                type: "string",
                description: "Identifies the tab in Header’s selected state.",
              },
              {
                name: "label",
                type: "React.ReactNode",
                description: "Supplies the visible tab label.",
              },
            ]}
          />
        </ChildSection>
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Compose page-level structure and controls with Header."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> —
            sticky product chrome above the page header.
          </li>
          <li>
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            — app-wide navigation beside the page.
          </li>
          <li>
            <DocsPageLink to="/structure/container">
              Page Container
            </DocsPageLink>{" "}
            — for consistent padding around the page content below.
          </li>
          <li>
            <DocsPageLink to="/components/breadcrumb">Breadcrumb</DocsPageLink>{" "}
            — when only a location trail is needed.
          </li>
          <li>
            <DocsPageLink to="/components/tabs">Tabs</DocsPageLink> — for
            standalone tabbed content.
          </li>
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — for
            actions outside the page header.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
