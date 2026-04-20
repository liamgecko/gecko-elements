import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { InboxIcon } from "lucide-react"
import { Code } from "@/components/ui/code"

export function EmptyPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Empty</h1>
          <p className="text-sm text-muted-foreground">
            Empty states show when there’s no data or content yet, with optional title, description, media, and actions.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A minimal empty state with a title and description. Use{" "}
            <Code>Empty</Code>,{" "}
            <Code>EmptyHeader</Code>,{" "}
            <Code>EmptyTitle</Code>, and{" "}
            <Code>EmptyDescription</Code>.
          </p>
          <ComponentExample>
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No items yet</EmptyTitle>
                <EmptyDescription>
                  Get started by creating your first item. It will show up here once added.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </ComponentExample>
        </PageSection>

        <PageSection id="with-icon" label="With icon">
          <h2 className="text-lg font-semibold">With icon</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add{" "}
            <Code>EmptyMedia</Code>{" "}
            with <Code>variant=&quot;icon&quot;</Code> to show
            an icon above the title and description.
          </p>
          <ComponentExample>
            <Empty>
              <EmptyMedia variant="icon">
                <InboxIcon />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No messages</EmptyTitle>
                <EmptyDescription>
                  When you receive messages they will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </ComponentExample>
        </PageSection>

        <PageSection id="actions" label="Actions">
          <h2 className="text-lg font-semibold">Actions</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>EmptyContent</Code>{" "}
            below the header to add buttons or other actions so users can resolve the empty state.
          </p>

          <h3 id="actions-single" className="mb-3 text-base font-semibold">Single action</h3>
          <ComponentExample className="mb-6">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>
                  Create a project to get started and see it listed here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button>Create project</Button>
              </EmptyContent>
            </Empty>
          </ComponentExample>

          <h3 id="actions-multi" className="mb-3 text-base font-semibold">Multi-action</h3>
          <ComponentExample>
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  We couldn’t find anything matching your filters. Try adjusting them or start fresh.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button variant="outline">Clear filters</Button>
                  <Button>Reset and search</Button>
                </div>
              </EmptyContent>
            </Empty>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
