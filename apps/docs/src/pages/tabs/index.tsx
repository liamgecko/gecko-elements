import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Badge } from "@gecko/ui/components/badge";
import { Code } from "@gecko/ui/components/code";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@gecko/ui/components/tabs";

function ExamplePanels() {
  return (
    <>
      <TabsContent value="events">Manage upcoming events.</TabsContent>
      <TabsContent value="hosts">Manage event hosts.</TabsContent>
      <TabsContent value="locations">Manage event locations.</TabsContent>
    </>
  );
}

export function TabsPage() {
  const importSnippet = `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@gecko/ui/components/tabs"`;

  const compositionSnippet = `Tabs
├── TabsList
│   └── TabsTrigger
└── TabsContent`;

  const basicExampleSnippet = `<Tabs defaultValue="events" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations">Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="hosts">
    Change your hosts here.
  </TabsContent>
  <TabsContent value="locations">
    Change your locations here.
  </TabsContent>
</Tabs>`;

  const lineVariantSnippet = `<Tabs defaultValue="events" variant="line" className="w-full">
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations">Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const verticalSnippet = `<Tabs defaultValue="events" orientation="vertical">
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations">Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const disabledSnippet = `<Tabs defaultValue="events">
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations" disabled>Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const fullWidthDefaultSnippet = `<Tabs defaultValue="events">
  <TabsList fullWidth>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations">Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const fullWidthLineSnippet = `<Tabs defaultValue="events" variant="line">
  <TabsList fullWidth>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations">Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const overflowDefaultSnippet = `<Tabs defaultValue="inbox" className="w-full">
  <TabsList overflow>
    <TabsTrigger value="inbox">Inbox</TabsTrigger>
    <TabsTrigger value="contacts">Contacts</TabsTrigger>
    <TabsTrigger value="conversations">Conversations</TabsTrigger>
    <TabsTrigger value="automations">Automations</TabsTrigger>
    <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
    <TabsTrigger value="team">Team members</TabsTrigger>
    <TabsTrigger value="fields">Custom fields</TabsTrigger>
    <TabsTrigger value="audit">Audit log</TabsTrigger>
    <TabsTrigger value="settings">Account settings</TabsTrigger>
  </TabsList>
  <TabsContent value="inbox">Manage your inbox.</TabsContent>
  <TabsContent value="contacts">Manage your contacts.</TabsContent>
  <TabsContent value="conversations">Review conversations.</TabsContent>
  <TabsContent value="automations">Manage automations.</TabsContent>
  <TabsContent value="broadcasts">Manage broadcasts.</TabsContent>
  <TabsContent value="campaigns">Manage campaigns.</TabsContent>
  <TabsContent value="team">Manage team members.</TabsContent>
  <TabsContent value="fields">Manage custom fields.</TabsContent>
  <TabsContent value="audit">Review the audit log.</TabsContent>
  <TabsContent value="settings">Manage account settings.</TabsContent>
</Tabs>`;

  const overflowLineSnippet = `<Tabs defaultValue="inbox" variant="line" className="w-full">
  <TabsList overflow>
    <TabsTrigger value="inbox">Inbox</TabsTrigger>
    <TabsTrigger value="contacts">Contacts</TabsTrigger>
    <TabsTrigger value="conversations">Conversations</TabsTrigger>
    <TabsTrigger value="automations">Automations</TabsTrigger>
    <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
    <TabsTrigger value="team">Team members</TabsTrigger>
    <TabsTrigger value="fields">Custom fields</TabsTrigger>
    <TabsTrigger value="audit">Audit log</TabsTrigger>
    <TabsTrigger value="settings">Account settings</TabsTrigger>
  </TabsList>
  <TabsContent value="inbox">Manage your inbox.</TabsContent>
  <TabsContent value="contacts">Manage your contacts.</TabsContent>
  <TabsContent value="conversations">Review conversations.</TabsContent>
  <TabsContent value="automations">Manage automations.</TabsContent>
  <TabsContent value="broadcasts">Manage broadcasts.</TabsContent>
  <TabsContent value="campaigns">Manage campaigns.</TabsContent>
  <TabsContent value="team">Manage team members.</TabsContent>
  <TabsContent value="fields">Manage custom fields.</TabsContent>
  <TabsContent value="audit">Review the audit log.</TabsContent>
  <TabsContent value="settings">Manage account settings.</TabsContent>
</Tabs>`;

  const badgesDefaultSnippet = `<Tabs defaultValue="events" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="events" className="gap-2">
      Events
      <Badge size="xs" variant="secondary" rounded>
        12
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="hosts" className="gap-2">
      Hosts
      <Badge size="xs" variant="secondary" rounded>
        3
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="locations" className="gap-2">
      Locations
      <Badge size="xs" variant="secondary" rounded>
        7
      </Badge>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const badgesLineSnippet = `<Tabs defaultValue="events" variant="line" className="w-full">
  <TabsList>
    <TabsTrigger value="events" className="gap-2">
      Events
      <Badge size="xs" variant="secondary" rounded>
        1
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="hosts" className="gap-2">
      Hosts
      <Badge size="xs" variant="secondary" rounded>
        1
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="locations" className="gap-2">
      Locations
      <Badge size="xs" variant="secondary" rounded>
        1
      </Badge>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  const badgesVerticalSnippet = `<Tabs defaultValue="events" orientation="vertical" className="w-[280px]">
  <TabsList>
    <TabsTrigger value="events" className="w-full justify-between">
      <span>Events</span>
      <Badge size="xs" variant="secondary" rounded>
        5
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="hosts" className="w-full justify-between">
      <span>Hosts</span>
      <Badge size="xs" variant="secondary" rounded>
        2
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="locations" className="w-full justify-between">
      <span>Locations</span>
      <Badge size="xs" variant="secondary" rounded>
        4
      </Badge>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Tabs"
        description="The Tabs component is a set of layered sections that display one panel at a time. Use it to organise related content without leaving the page."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use standalone Tabs when content within a page needs sectioning and
            only one section should be visible at a time.
            <br />
            <br />
            For sub-pages within a section that need sub-navigation, put tabs on
            the page-level{" "}
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink>{" "}
            instead. Avoid using tabs for long lists of options or when every
            section should stay visible. To show counts or labels on a tab, add
            a <DocsPageLink to="/components/badge">Badge</DocsPageLink> inside
            the trigger.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Tabs and its list, trigger, and content parts."
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
          description="The list holds triggers. Each content panel matches a trigger value."
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
        id="basic-example"
        title="Basic example"
        description="A minimal uncontrolled tab set. Use this for a simple switch between a few related panels."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Tabs defaultValue="events" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
              <TabsContent value="events">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="hosts">Change your hosts here.</TabsContent>
              <TabsContent value="locations">
                Change your locations here.
              </TabsContent>
            </Tabs>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="line-variant"
        title="Line variant"
        description="An underline-style tab set for layouts where the tabs should sit flush without a pill background."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Tabs defaultValue="events" variant="line" className="w-full">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
              <ExamplePanels />
            </Tabs>
            <Code
              variant="block"
              language="tsx"
              code={lineVariantSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="vertical"
        title="Vertical"
        description="Places the tab list beside its panel. Use this for compact sidebar-style layouts."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Tabs defaultValue="events" orientation="vertical">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
              <ExamplePanels />
            </Tabs>
            <Code
              variant="block"
              language="tsx"
              code={verticalSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="disabled"
        title="Disabled"
        description="Shows a section that is currently unavailable for selection."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Tabs defaultValue="events">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations" disabled>
                  Locations
                </TabsTrigger>
              </TabsList>
              <ExamplePanels />
            </Tabs>
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="full-width"
        title="Full width"
        description="Fills the available width and distributes triggers evenly."
      >
        <ChildSection
          id="full-width-default"
          title="Default tabs"
          description="Full-width pill tabs with evenly spaced triggers."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Tabs defaultValue="events">
                <TabsList fullWidth>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="hosts">Hosts</TabsTrigger>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                </TabsList>
                <ExamplePanels />
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={fullWidthDefaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="full-width-line"
          title="Line tabs"
          description="Full-width underline tabs with evenly spaced triggers."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Tabs defaultValue="events" variant="line">
                <TabsList fullWidth>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="hosts">Hosts</TabsTrigger>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                </TabsList>
                <ExamplePanels />
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={fullWidthLineSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="overflow"
        title="Overflow"
        description="Moves trailing tabs into an ellipsis menu when their natural widths no longer fit the available horizontal space. Tabs return to the list automatically when space becomes available."
      >
        <ChildSection
          id="overflow-default"
          title="Default tabs"
          description="Moves the trailing default tabs into the overflow menu."
        >
          <ComponentExample>
            <div className="w-full space-y-6">
              <Tabs defaultValue="inbox" className="w-full">
                <TabsList overflow>
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  <TabsTrigger value="automations">Automations</TabsTrigger>
                  <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                  <TabsTrigger value="team">Team members</TabsTrigger>
                  <TabsTrigger value="fields">Custom fields</TabsTrigger>
                  <TabsTrigger value="audit">Audit log</TabsTrigger>
                  <TabsTrigger value="settings">Account settings</TabsTrigger>
                </TabsList>
                <TabsContent value="inbox">Manage your inbox.</TabsContent>
                <TabsContent value="contacts">Manage your contacts.</TabsContent>
                <TabsContent value="conversations">
                  Review conversations.
                </TabsContent>
                <TabsContent value="automations">Manage automations.</TabsContent>
                <TabsContent value="broadcasts">Manage broadcasts.</TabsContent>
                <TabsContent value="campaigns">Manage campaigns.</TabsContent>
                <TabsContent value="team">Manage team members.</TabsContent>
                <TabsContent value="fields">Manage custom fields.</TabsContent>
                <TabsContent value="audit">Review the audit log.</TabsContent>
                <TabsContent value="settings">
                  Manage account settings.
                </TabsContent>
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={overflowDefaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>

        <ChildSection
          id="overflow-line"
          title="Line tabs"
          description="Applies the same overflow behavior without changing the line variant styling."
        >
          <ComponentExample>
            <div className="w-full space-y-6">
              <Tabs defaultValue="inbox" variant="line" className="w-full">
                <TabsList overflow>
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  <TabsTrigger value="automations">Automations</TabsTrigger>
                  <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                  <TabsTrigger value="team">Team members</TabsTrigger>
                  <TabsTrigger value="fields">Custom fields</TabsTrigger>
                  <TabsTrigger value="audit">Audit log</TabsTrigger>
                  <TabsTrigger value="settings">Account settings</TabsTrigger>
                </TabsList>
                <TabsContent value="inbox">Manage your inbox.</TabsContent>
                <TabsContent value="contacts">Manage your contacts.</TabsContent>
                <TabsContent value="conversations">
                  Review conversations.
                </TabsContent>
                <TabsContent value="automations">Manage automations.</TabsContent>
                <TabsContent value="broadcasts">Manage broadcasts.</TabsContent>
                <TabsContent value="campaigns">Manage campaigns.</TabsContent>
                <TabsContent value="team">Manage team members.</TabsContent>
                <TabsContent value="fields">Manage custom fields.</TabsContent>
                <TabsContent value="audit">Review the audit log.</TabsContent>
                <TabsContent value="settings">
                  Manage account settings.
                </TabsContent>
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={overflowLineSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="badges"
        title="Badges"
        description="Adds compact counts when the quantity helps people choose a panel."
      >
        <ChildSection
          id="badges-default"
          title="Default tabs"
          description="Badges inline with the tab label in the default pill style."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Tabs defaultValue="events" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="events" className="gap-2">
                    Events
                    <Badge size="xs" variant="secondary" rounded>
                      12
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="hosts" className="gap-2">
                    Hosts
                    <Badge size="xs" variant="secondary" rounded>
                      3
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="locations" className="gap-2">
                    Locations
                    <Badge size="xs" variant="secondary" rounded>
                      7
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                <ExamplePanels />
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={badgesDefaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="badges-line"
          title="Line tabs"
          description="Badges inline with the tab label in the line variant."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Tabs defaultValue="events" variant="line" className="w-full">
                <TabsList>
                  <TabsTrigger value="events" className="gap-2">
                    Events
                    <Badge size="xs" variant="secondary" rounded>
                      1
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="hosts" className="gap-2">
                    Hosts
                    <Badge size="xs" variant="secondary" rounded>
                      1
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="locations" className="gap-2">
                    Locations
                    <Badge size="xs" variant="secondary" rounded>
                      1
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                <ExamplePanels />
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={badgesLineSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="badges-vertical"
          title="Vertical tabs"
          description="Badges aligned to the trailing edge in a vertical tab list."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Tabs
                defaultValue="events"
                orientation="vertical"
                className="w-[280px]"
              >
                <TabsList>
                  <TabsTrigger
                    value="events"
                    className="w-full justify-between"
                  >
                    <span>Events</span>
                    <Badge size="xs" variant="secondary" rounded>
                      5
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="hosts" className="w-full justify-between">
                    <span>Hosts</span>
                    <Badge size="xs" variant="secondary" rounded>
                      2
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="locations"
                    className="w-full justify-between"
                  >
                    <span>Locations</span>
                    <Badge size="xs" variant="secondary" rounded>
                      4
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                <ExamplePanels />
              </Tabs>
              <Code
                variant="block"
                language="tsx"
                code={badgesVerticalSnippet}
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
        description="Keep tab sets short, related, and consistent."
      >
        <DocsDoDont
          doItems={[
            <>Use concise labels that distinguish each panel.</>,
            <>Apply one visual style consistently across the tab set.</>,
            <>
              Use full-width tabs when triggers should share the available
              width.
            </>,
            <>Add small badges when a tab needs a count.</>,
            <>
              Use overflow when concise tabs must share a constrained horizontal
              space.
            </>,
          ]}
          dontItems={[
            <>Don’t use tabs when all sections need to remain visible.</>,
            <>Don’t mix default and line variants within one tab set.</>,
            <>
              Don’t disable a tab without a clear reason for its unavailability.
            </>,
            <>Don’t fill tab labels with long descriptions.</>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Tabs.">
        <ChildSection
          id="api-tabs"
          title="Tabs"
          description="Coordinates the active tab and shared presentation."
        >
          <DocsApiTable
            aria-label="Tabs properties"
            rows={[
              {
                name: "variant",
                type: '"default" | "line"',
                defaultValue: '"default"',
                description: "Sets the tab set appearance.",
              },
              {
                name: "orientation",
                type: '"horizontal" | "vertical"',
                defaultValue: '"horizontal"',
                description:
                  "Controls the direction of the list and keyboard navigation.",
              },
              {
                name: "defaultValue",
                type: "Tabs.Tab.Value",
                defaultValue: "0",
                description: "Sets the initially active uncontrolled tab.",
              },
              {
                name: "value",
                type: "Tabs.Tab.Value",
                defaultValue: "—",
                description: "Controls the active tab.",
              },
              {
                name: "onValueChange",
                type: "(value, details) => void",
                defaultValue: "—",
                description: "Reports active tab changes.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-tabs-list"
          title="TabsList"
          description="Groups the triggers and controls their shared layout."
        >
          <DocsApiTable
            aria-label="TabsList properties"
            rows={[
              {
                name: "fullWidth",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Makes the list fill its container and share space across triggers.",
              },
              {
                name: "overflow",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Moves trailing horizontal tabs into an ellipsis menu when they no longer fit.",
              },
              {
                name: "activateOnFocus",
                type: "boolean",
                defaultValue: "false",
                description: "Activates a tab when arrow-key focus reaches it.",
              },
              {
                name: "loopFocus",
                type: "boolean",
                defaultValue: "true",
                description:
                  "Moves focus between the first and last tabs when navigating with arrow keys.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-tabs-trigger"
          title="TabsTrigger"
          description="Activates its matching panel."
        >
          <DocsApiTable
            aria-label="TabsTrigger properties"
            rows={[
              {
                name: "value",
                type: "Tabs.Tab.Value",
                defaultValue: "—",
                description: "Connects the trigger to its matching panel.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Prevents a tab from being selected.",
              },
              {
                name: "nativeButton",
                type: "boolean",
                defaultValue: "true",
                description:
                  "Preserves native button behaviour when replacing the rendered element.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-tabs-content"
          title="TabsContent"
          description="Renders the panel associated with a trigger."
        >
          <DocsApiTable
            aria-label="TabsContent properties"
            rows={[
              {
                name: "value",
                type: "Tabs.Tab.Value",
                defaultValue: "—",
                description: "Connects the panel to its matching trigger.",
              },
              {
                name: "keepMounted",
                type: "boolean",
                defaultValue: "false",
                description: "Keeps inactive panel content in the DOM.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/tabs">
                Shadcn Tabs documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/tabs">
                Base UI Tabs API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different disclosure pattern when sections should stack."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/accordion">Accordion</DocsPageLink> —
            for stacked, collapsible sections.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
