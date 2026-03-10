import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Badge } from "@/components/ui/badge"
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
          <h1 className="text-2xl font-semibold text-foreground">Tabs</h1>
          <p className="text-sm text-muted-foreground">
            A set of layered sections that display one panel at a time.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Tabs
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsList
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsTrigger
            </code>
            , and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsContent
            </code>{" "}
            with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">defaultValue</code> to control the initial tab.
          </p>
          <ComponentExample>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="line-variant" label="Line variant">
          <h2 className="text-lg font-semibold">Line</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              variant="line"
            </code>{" "}
            on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsList
            </code>{" "}
            for an underline-style tab list without a pill background.
          </p>
          <ComponentExample>
            <Tabs defaultValue="overview">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="vertical" label="Vertical">
          <h2 className="text-lg font-semibold">Vertical</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              orientation="vertical"
            </code>{" "}
            on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Tabs
            </code>{" "}
            to stack the list and content in a column layout.
          </p>
          <ComponentExample>
            <Tabs defaultValue="account" orientation="vertical">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="disabled" label="Disabled">
          <h2 className="text-lg font-semibold">Disabled</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              disabled
            </code>{" "}
            to a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsTrigger
            </code>{" "}
            to prevent selection and show a disabled state.
          </p>
          <ComponentExample>
            <Tabs defaultValue="home">
              <TabsList>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="settings" disabled>
                  Disabled
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="full-width" label="Full width">
          <h2 className="text-lg font-semibold">Full width</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              fullWidth
            </code>{" "}
            prop on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsList
            </code>{" "}
            so the list fills the container and triggers share the space evenly.
            Works with both default and line variants.
          </p>

          <h3 className="mb-3 text-base font-semibold">Default tabs</h3>
          <ComponentExample className="mb-6">
            <Tabs defaultValue="account">
              <TabsList fullWidth>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Line tabs</h3>
          <ComponentExample>
            <Tabs defaultValue="overview">
              <TabsList variant="line" fullWidth>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>
        </PageSection>

        <PageSection id="badges" label="Badges">
          <h2 className="text-lg font-semibold">Badges</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Badge
            </code>{" "}
            inside each{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TabsTrigger
            </code>{" "}
            to show counts or labels alongside the tab label.
          </p>

          <h3 className="mb-3 text-base font-semibold">Default tabs</h3>
          <ComponentExample className="mb-6">
            <Tabs defaultValue="events" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="events" className="gap-2">
                  Events
                  <Badge size="xs" variant="primary" rounded>
                    12
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="hosts" className="gap-2">
                  Hosts
                  <Badge size="xs" variant="primary" rounded>
                    3
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="locations" className="gap-2">
                  Locations
                  <Badge size="xs" variant="primary" rounded>
                    7
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Line tabs</h3>
          <ComponentExample className="mb-6">
            <Tabs defaultValue="events" className="w-[400px]">
              <TabsList variant="line">
                <TabsTrigger value="events" className="gap-2">
                  Events
                  <Badge size="xs" variant="primary" rounded>
                    1
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="hosts" className="gap-2">
                  Hosts
                  <Badge size="xs" variant="primary" rounded>
                    1
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="locations" className="gap-2">
                  Locations
                  <Badge size="xs" variant="primary" rounded>
                    1
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Vertical tabs</h3>
          <ComponentExample>
            <Tabs defaultValue="events" orientation="vertical" className="w-[280px]">
              <TabsList>
                <TabsTrigger value="events" className="w-full justify-between">
                  <span>Events</span>
                  <Badge size="xs" variant="primary" rounded>
                    5
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="hosts" className="w-full justify-between">
                  <span>Hosts</span>
                  <Badge size="xs" variant="primary" rounded>
                    2
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="locations" className="w-full justify-between">
                  <span>Locations</span>
                  <Badge size="xs" variant="primary" rounded>
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
