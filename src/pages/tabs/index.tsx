import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Badge } from "@/components/ui/badge"
import { Code } from "@/components/ui/code"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Tabs</h1>
          <p className="text-sm text-muted-foreground">
            A set of layered sections that display one panel at a time.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>Tabs</Code>, <Code>TabsList</Code>, <Code>TabsTrigger</Code>,
            {" "}
            and <Code>TabsContent</Code> with{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              defaultValue
            </Code>{" "}
            to control the initial tab.
          </p>
          <ComponentExample>
            <Tabs defaultValue="events" className="w-[400px]">
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
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="line-variant" label="Line variant">
          <h2 className="text-lg font-semibold">Line</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              variant="line"
            </Code>{" "}
            on <Code>TabsList</Code> for an underline-style tab list without a pill
            background.
          </p>
          <ComponentExample>
            <Tabs defaultValue="events" variant="line" className="w-full">
              <TabsList variant="line">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="vertical" label="Vertical">
          <h2 className="text-lg font-semibold">Vertical</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              orientation="vertical"
            </Code>{" "}
            on <Code>Tabs</Code> to stack the list and content in a column layout.
          </p>
          <ComponentExample>
            <Tabs defaultValue="events" orientation="vertical">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="disabled" label="Disabled">
          <h2 className="text-lg font-semibold">Disabled</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              disabled
            </Code>{" "}
            to a <Code>TabsTrigger</Code> to prevent selection and show a disabled
            state.
          </p>
          <ComponentExample>
            <Tabs defaultValue="events">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations" disabled>Locations</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="full-width" label="Full width">
          <h2 className="text-lg font-semibold">Full width</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              fullWidth
            </Code>{" "}
            prop on <Code>TabsList</Code> so the list fills the container and
            triggers share the space evenly. Works with both default and line
            variants.
          </p>

          <h3 id="full-width-default" className="mb-3 text-base font-semibold">Default tabs</h3>
          <ComponentExample className="mb-6">
            <Tabs defaultValue="events">
              <TabsList fullWidth>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>

          <h3 id="full-width-line" className="mb-3 text-base font-semibold">Line tabs</h3>
          <ComponentExample>
            <Tabs defaultValue="events" variant="line">
              <TabsList variant="line" fullWidth>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="badges" label="Badges">
          <h2 className="text-lg font-semibold">Badges</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add a <Code>Badge</Code> inside each{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsTrigger
            </Code>{" "}
            to show counts or labels alongside the tab label.
          </p>

          <h3 id="badges-default" className="mb-3 text-base font-semibold">Default tabs</h3>
          <ComponentExample className="mb-6">
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
            </Tabs>
          </ComponentExample>

          <h3 id="badges-line" className="mb-3 text-base font-semibold">Line tabs</h3>
          <ComponentExample className="mb-6">
            <Tabs defaultValue="events" variant="line" className="w-full">
              <TabsList variant="line">
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
            </Tabs>
          </ComponentExample>

          <h3 id="badges-vertical" className="mb-3 text-base font-semibold">Vertical tabs</h3>
          <ComponentExample>
            <Tabs defaultValue="events" orientation="vertical" className="w-[280px]">
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
            </Tabs>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
