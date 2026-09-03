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
import { AppSidebarDemo } from "./demo";

export function StructureAppSidebarPage() {
  const importSnippet = `import {
  AppSidebar,
  AppSidebarFavourites,
  AppSidebarNav,
} from "@gecko/ui/components/app-sidebar"`;

  const compositionSnippet = `AppSidebar
├── AppSidebarFavourites
└── AppSidebarNav`;

  const exampleSnippet = `<AppSidebar>
  <AppSidebarFavourites
    items={[
      { path: "/conversations/inbox", label: "Inbox" },
    ]}
    activePath={pathname}
    onSelect={navigate}
    onRename={renameFavourite}
    onDelete={deleteFavourite}
  />
  <AppSidebarNav
    items={[
      { id: "home", label: "Home", icon: House, href: "/home" },
      {
        id: "conversations",
        label: "Conversations",
        icon: Inbox,
        items: [
          { label: "Inbox", href: "/conversations/inbox" },
          { label: "Chatbots", href: "/conversations/chatbots" },
        ],
      },
    ]}
    activePath={pathname}
    onSelect={navigate}
  />
</AppSidebar>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="App sidebar"
        description="AppSidebar is Gecko’s app-wide main navigation rail under AppHeader. It always includes favourites followed by the grouped primary navigation; collapse, scroll, and the footer trigger are built in."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use AppSidebar for product navigation only — Home, Conversations,
            Settings, and similar destinations. Place it under{" "}
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink>.
            The layout still needs a{" "}
            <DocsPageLink to="/components/sidebar">
              SidebarProvider
            </DocsPageLink>{" "}
            around the shell and <Code>SidebarInset</Code> for page content —
            see the Sidebar page for that chrome.
            <br />
            <br />
            Avoid using AppSidebar as a conversation list — that is{" "}
            <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink> in
            Inbox. Avoid putting page actions or titles here — use{" "}
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> in
            the inset. Pass destinations with <Code>href</Code> and wire{" "}
            <Code>onSelect</Code> to your router.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the complete App Sidebar composition."
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
          description="Favourites sit above the main nav. The footer holds the collapse trigger."
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
        description="Favourites above the main nav, with nested Conversations destinations and a collapse trigger."
      >
        <ComponentExample className="h-[480px] overflow-hidden p-0">
          <AppSidebarDemo />
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
        id="navigation-structure"
        title="Navigation structure"
        description="App Sidebar has one fixed structure: favourites first, followed by primary destinations with child destinations grouped beneath their parent."
      >
        <ChildSection
          id="navigation-structure-favourites"
          title="Favourites"
          description={
            <>
              Always render <Code>AppSidebarFavourites</Code> before the primary
              navigation. The application supplies the current favourite
              destinations and handles rename and immediate removal.
            </>
          }
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={`<AppSidebarFavourites
  items={favouriteItems}
  activePath={pathname}
  onSelect={navigate}
  onRename={renameFavourite}
  onDelete={deleteFavourite}
/>`}
              showCopyButton
              copyLabel="Copy example"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="navigation-structure-groups"
          title="Grouped destinations"
          description={
            <>
              Entries with child destinations are grouped beneath their parent
              by default. Groups animate when they open and close; opening a
              closed group selects its first child.
            </>
          }
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={`{
  id: "conversations",
  label: "Conversations",
  icon: Inbox,
  items: [
    { label: "Inbox", href: "/conversations/inbox" },
    { label: "Chatbots", href: "/conversations/chatbots" },
  ],
}`}
              showCopyButton
              copyLabel="Copy example"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep AppSidebar for app navigation only."
      >
        <DocsDoDont
          doItems={[
            <>
              Keep <Code>AppSidebarFavourites</Code> before{" "}
              <Code>AppSidebarNav</Code> in the fixed App Sidebar composition.
            </>,
            <>
              Keep AppSidebar under{" "}
              <DocsPageLink to="/structure/app-header">App Header</DocsPageLink>{" "}
              inside one <Code>SidebarProvider</Code>.
            </>,
            <>
              Pass resolved <Code>href</Code> values and handle navigation in{" "}
              <Code>onSelect</Code>.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use AppSidebar for conversation lists — use{" "}
              <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink>.
            </>,
            <>
              Don’t put page titles or actions in the rail — use{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
            </>,
            <>
              Don’t nest a second <Code>SidebarProvider</Code> for the app shell
              — wrap the root layout once.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on AppSidebar and its parts."
      >
        <ChildSection
          id="api-app-sidebar"
          title="AppSidebar"
          description="Root rail. Sets height under AppHeader and includes the collapse trigger."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "children",
                  type: "[AppSidebarFavourites, AppSidebarNav]",
                  description:
                    "AppSidebarFavourites followed by AppSidebarNav.",
                },
                {
                  name: "className",
                  type: "string",
                  description:
                    "Positions the fixed rail within the application shell.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-favourites"
          title="AppSidebarFavourites"
          description="Pinned destinations above the main nav."
        >
          <div className="mb-6">
            <DocsApiTable
              rows={[
                {
                  name: "items",
                  type: "AppSidebarFavouriteItem[]",
                  description:
                    "Current favourites. Keep the component rendered when the list is empty.",
                },
                {
                  name: "activePath",
                  type: "string",
                  description: "Current location used for active styling.",
                },
                {
                  name: "onSelect",
                  type: "(path: string) => void",
                  description: "Runs when a favourite is chosen.",
                },
                {
                  name: "onRename",
                  type: "(path: string, label: string) => void",
                  description: "Runs after a favourite is renamed.",
                },
                {
                  name: "onDelete",
                  type: "(path: string) => void",
                  description: "Runs when a favourite is immediately removed.",
                },
              ]}
            />
          </div>
        </ChildSection>
        <ChildSection
          id="api-nav"
          title="AppSidebarNav"
          description="Primary app destinations with child destinations grouped beneath their parent."
        >
          <DocsApiTable
            rows={[
              {
                name: "items",
                type: "AppSidebarNavItem[]",
                description:
                  "Nav entries with a stable id and either href or grouped child items.",
              },
              {
                name: "activePath",
                type: "string",
                description: "Current location used for active styling.",
              },
              {
                name: "onSelect",
                type: "(href: string) => void",
                description: "Runs when a destination is chosen.",
              },
            ]}
          />
        </ChildSection>
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="App Sidebar sits alongside these structure components."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/structure/app-header">App Header</DocsPageLink> —
            sticky product chrome above the rail.
          </li>
          <li>
            <DocsPageLink to="/components/sidebar">Sidebar</DocsPageLink> — the
            primitives AppSidebar is built from.
          </li>
          <li>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> —
            page chrome inside <Code>SidebarInset</Code>.
          </li>
          <li>
            <DocsPageLink to="/structure/container">
              Page Container
            </DocsPageLink>{" "}
            — page body spacing below Header.
          </li>
          <li>
            <DocsPageLink to="/components/chat-head">Chat head</DocsPageLink> —
            conversation list in Inbox, not app nav.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
