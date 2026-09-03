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
import { AppHeaderDemo } from "./demo";

export function StructureAppHeaderPage() {
  const importSnippet = `import {
  AppHeader,
  AppHeaderLogo,
  AppHeaderActions,
  AppHeaderAccountSwitcher,
  AppHeaderControls,
  AppHeaderUserMenu,
} from "@gecko/ui/components/app-header"`;

  const compositionSnippet = `AppHeader
├── AppHeaderLogo
└── AppHeaderActions
    ├── AppHeaderAccountSwitcher
    ├── AppHeaderControls
    └── AppHeaderUserMenu`;

  const exampleSnippet = `<AppHeader>
  <AppHeaderLogo src={logoUrl} alt="Gecko" />
  <AppHeaderActions>
    <AppHeaderAccountSwitcher
      label="Gecko"
      accounts={[
        { id: "gecko", label: "Gecko" },
        { id: "sandbox", label: "Sandbox org" },
      ]}
    />
    <AppHeaderControls
      call={{
        pressed: callOnline,
        onPressedChange: setCallOnline,
      }}
      conversation={{
        pressed: conversationOnline,
        onPressedChange: setConversationOnline,
      }}
    />
    <AppHeaderUserMenu
      name="Liam Young"
      avatar={{ name: "Liam Young" }}
      items={[
        { id: "settings", label: "User settings" },
        {
          id: "logout",
          label: "Logout",
          variant: "destructive",
          separatorBefore: true,
        },
      ]}
    />
  </AppHeaderActions>
</AppHeader>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="App header"
        description="AppHeader is the sticky product chrome at the top of every screen. Compose logo, account switcher, status controls, and the user menu — no layout utilities required."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use AppHeader on every product page as the sticky top bar above{" "}
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>
            . Keep account switching, agent status, and the user menu here — not
            in the page-level{" "}
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
            <br />
            <br />
            Avoid using AppHeader for page titles, breadcrumbs, or page actions.
            Those belong in Header under the app chrome. Include only the status
            controls required by the product.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import AppHeader and the parts you need."
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
          description="The logo sits at the leading edge and actions sit at the trailing edge. Separators are inserted between action children automatically."
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
        description="A full AppHeader with account switcher, both status controls, and a user menu."
      >
        <ComponentExample className="overflow-hidden p-0">
          <AppHeaderDemo />
        </ComponentExample>
        <ComponentExample className="mt-4">
          <Code
            variant="block"
            language="tsx"
            code={exampleSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
      </MainSection>

      <MainSection
        id="status-controls"
        title="Status controls"
        description="Include the availability controls required by the product and connect controlled state in the application."
      >
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={`<AppHeaderControls
  call="true|false|{ pressed, onPressedChange }"
  conversation="true|false|{ pressed, onPressedChange }"
/>`}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep AppHeader as product chrome, not page structure."
      >
        <DocsDoDont
          doItems={[
            <>
              Place AppHeader above{" "}
              <DocsPageLink to="/structure/app-sidebar">
                App Sidebar
              </DocsPageLink>{" "}
              on every product screen, including Inbox.
            </>,
            <>
              Compose with <Code>AppHeaderLogo</Code>,{" "}
              <Code>AppHeaderActions</Code>, and the action parts — don’t
              rebuild the bar with utilities.
            </>,
            <>Enable only the status controls required by the product.</>,
          ]}
          dontItems={[
            <>
              Don’t put page titles, breadcrumbs, or page actions in AppHeader —
              use{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
            </>,
            <>
              Don’t replace AppHeader with the page-level Header for account or
              status controls.
            </>,
            <>
              Don’t restyle the dark chrome with ad-hoc <Code>className</Code>{" "}
              colours — keep the gray-900 bar consistent.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on AppHeader and its parts."
      >
        <ChildSection
          id="api-header"
          title="AppHeader"
          description="Sticky application-level product chrome."
        >
          <DocsApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                description: "Composes the logo and action regions.",
              },
              {
                name: "className",
                type: "string",
                description: "Adds classes to the root header element.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-logo"
          title="AppHeaderLogo"
          description="Brand mark at the leading edge."
        >
          <DocsApiTable
            rows={[
              {
                name: "src",
                type: "string",
                description: "Logo image URL. Ignored when children are set.",
              },
              {
                name: "alt",
                type: "string",
                defaultValue: '"Gecko"',
                description: "Accessible name for the logo image.",
              },
              {
                name: "children",
                type: "ReactNode",
                description: "Custom logo content instead of an image.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-actions"
          title="AppHeaderActions"
          description="Groups trailing application controls and inserts separators."
        >
          <DocsApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode",
                description: "Action groups displayed in the trailing region.",
              },
              {
                name: "className",
                type: "string",
                description: "Adds classes to the actions container.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-account-switcher"
          title="AppHeaderAccountSwitcher"
          description="Searchable account menu."
        >
          <DocsApiTable
            rows={[
              {
                name: "label",
                type: "ReactNode",
                description: "Trigger label for the current account.",
              },
              {
                name: "accounts",
                type: "AppHeaderAccountItem[]",
                description: "Accounts listed in the menu.",
              },
              {
                name: "searchable",
                type: "boolean",
                defaultValue: "true",
                description: "Shows search in the account menu.",
              },
              {
                name: "searchPlaceholder",
                type: "string",
                defaultValue: '"Search accounts..."',
                description: "Placeholder for account search.",
              },
              {
                name: "emptyLabel",
                type: "ReactNode",
                defaultValue: '"No accounts found."',
                description: "Empty state when search has no matches.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"end"',
                description: "Aligns the menu with its trigger.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-controls"
          title="AppHeaderControls"
          description="Call and conversation status toggles."
        >
          <DocsApiTable
            rows={[
              {
                name: "call",
                type: "boolean | AppHeaderStatusControlProps",
                description:
                  "Enables the call status toggle. Pass true for defaults, or pressed / onPressedChange for controlled state. Omit or false to hide.",
              },
              {
                name: "conversation",
                type: "boolean | AppHeaderStatusControlProps",
                description:
                  "Enables the conversation status toggle. Same shape as call.",
              },
              {
                name: "delay",
                type: "number",
                defaultValue: "300",
                description: "Sets the tooltip opening delay.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-user-menu"
          title="AppHeaderUserMenu"
          description="Signed-in user menu."
        >
          <DocsApiTable
            rows={[
              {
                name: "name",
                type: "ReactNode",
                description: "Display name on the trigger.",
              },
              {
                name: "avatar",
                type: "{ name?: string; src?: string }",
                description: "Avatar image and accessible name.",
              },
              {
                name: "items",
                type: "AppHeaderUserMenuItem[]",
                description:
                  "Menu items with stable identifiers, grouping, and visual treatment.",
              },
              {
                name: "open",
                type: "boolean",
                description: "Controlled open state for the menu.",
              },
              {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                description: "Runs when the menu open state changes.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"end"',
                description: "Aligns the menu with its trigger.",
              },
              {
                name: "aria-label",
                type: "string",
                defaultValue: '"User menu"',
                description: "Provides the trigger’s accessible name.",
              },
            ]}
          />
        </ChildSection>
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Pair AppHeader with the rest of the product shell."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-sidebar">App Sidebar</DocsPageLink>{" "}
            — app-wide navigation under the header.
          </li>
          <li>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> —
            page title, breadcrumbs, and actions below the chrome.
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — underlying menu for account switcher and user menu.
          </li>
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> — user
            identity in the user menu trigger.
          </li>
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> —{" "}
            <Code>ghost-dark</Code> triggers used inside the bar.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
