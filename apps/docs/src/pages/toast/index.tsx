import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import { toast } from "@gecko/ui/components/toast";

export function ToastPage() {
  const importSnippet = `import {
  Toaster,
  toast,
} from "@gecko/ui/components/toast"`;

  const basicExampleSnippet = `toast.add({
  title: "Event created",
})`;

  const descriptionSnippet = `toast.add({
  title: "Changes saved",
  description: "Your changes are now available to the team.",
})`;

  const variantsSnippet = `toast.add({
  title: "Notification title",
  type: "info|warning|error|success",
})`;

  const actionSnippet = `toast.add({
  title: "Conversation closed",
  description: "The conversation was moved out of the inbox.",
  timeout: 0,
  actionProps: {
    children: "Undo",
    onClick: restoreConversation,
  },
})`;

  const promiseSnippet = `toast.promise(createProject(), {
  loading: {
    title: "Creating project…",
  },
  success: (project) => ({
    title: \`\${project.name} created\`,
    type: "success",
  }),
  error: (error) => ({
    title: "Project could not be created",
    description: error instanceof Error ? error.message : undefined,
    type: "error",
    priority: "high",
  }),
})`;

  const loadingSnippet = `const id = toast.add({
  title: "Syncing data…",
  type: "loading",
  timeout: 0,
})

toast.update(id, {
  title: "Data synced",
  type: "success",
  timeout: 5000,
})`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Toast"
          description="Accessible, temporary feedback built from Shadcn and Base UI."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Toast for concise feedback after an action or for the state of
              short asynchronous work. Keep feedback that requires attention
              available until it is dismissed.
              <br />
              <br />
              Use an <DocsPageLink to="/components/alert">
                Alert
              </DocsPageLink>{" "}
              when information must remain in the page. Use an{" "}
              <DocsPageLink to="/components/alert-dialog">
                Alert dialog
              </DocsPageLink>{" "}
              when a decision must block the next action.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Render Toaster once near the application root and import the shared manager wherever feedback is triggered."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description="Show a brief, neutral confirmation or status update."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => toast.add({ title: "Event created" })}
            >
              Trigger toast
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="description" label="Description">
        <PageSectionHeader
          title="Description"
          description="Add supporting detail when the title alone does not provide enough context."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  title: "Changes saved",
                  description: "Your changes are now available to the team.",
                })
              }
            >
              Trigger toast
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={descriptionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description="Choose the treatment that matches the meaning of the feedback."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Your export is ready to download",
                    type: "info",
                  })
                }
              >
                Information
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Check the audience before publishing",
                    type: "warning",
                  })
                }
              >
                Warning
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Changes could not be saved",
                    type: "error",
                    priority: "high",
                    timeout: 0,
                  })
                }
              >
                Error
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Event created",
                    type: "success",
                  })
                }
              >
                Success
              </Button>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={variantsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="action" label="Action">
        <PageSectionHeader
          title="Action"
          description="Offer one short, directly related action for a reversible outcome. The action replaces the close control."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  title: "Conversation closed",
                  description: "The conversation was moved out of the inbox.",
                  timeout: 0,
                  actionProps: {
                    children: "Undo",
                    onClick: () =>
                      toast.add({
                        title: "Conversation restored",
                        type: "success",
                      }),
                  },
                })
              }
            >
              Close conversation
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={actionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="Represent asynchronous work with a single notification that changes as the work progresses."
        />

        <PageSubsectionHeader
          id="states-promise"
          title="Promise"
          description="Track loading, success, and failure from one promise."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => {
                const createProject = () =>
                  new Promise<{ name: string }>((resolve) => {
                    window.setTimeout(
                      () => resolve({ name: "Admissions" }),
                      1500,
                    );
                  });

                void toast.promise(createProject(), {
                  loading: {
                    title: "Creating project…",
                  },
                  success: (project) => ({
                    title: `${project.name} created`,
                    type: "success",
                  }),
                  error: (error) => ({
                    title: "Project could not be created",
                    description:
                      error instanceof Error ? error.message : undefined,
                    type: "error",
                    priority: "high",
                  }),
                });
              }}
            >
              Create project
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={promiseSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="states-loading"
          title="Loading"
          description="Add a persistent loading notification and update the same notification when the work completes."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => {
                const id = toast.add({
                  title: "Syncing data…",
                  type: "loading",
                  timeout: 0,
                });

                window.setTimeout(() => {
                  toast.update(id, {
                    title: "Data synced",
                    type: "success",
                    timeout: 5000,
                  });
                }, 1500);
              }}
            >
              Sync data
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={loadingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep feedback concise, timely, and connected to the action that caused it."
        />
        <DocsDoDont
          doItems={[
            <>State what happened in a short, specific title.</>,
            <>Update one toast as asynchronous work progresses.</>,
            <>Keep actionable and important error feedback available.</>,
            <>Use an undo action for a reversible outcome.</>,
          ]}
          dontItems={[
            <>Don’t use Toast for information that must remain visible.</>,
            <>Don’t use Toast to ask for confirmation.</>,
            <>Don’t place several competing actions in one toast.</>,
            <>Don’t announce every intermediate stage as a new toast.</>,
            <>Don’t use vague errors without explaining what failed.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Toast."
        />

        <PageSubsectionHeader
          title="Toast manager"
          description="The shared manager creates, updates, closes, and tracks notifications outside React components."
        />
        <DocsApiTable
          aria-label="Toast manager API"
          rows={[
            {
              name: "add",
              type: "(options) => string",
              description: "Adds a toast and returns its id.",
            },
            {
              name: "update",
              type: "(id, options) => void",
              description: "Updates an existing toast and refreshes its timer.",
            },
            {
              name: "close",
              type: "(id?) => void",
              description: "Closes one toast or every toast.",
            },
            {
              name: "promise",
              type: "(promise, options) => Promise",
              description:
                "Tracks a promise through loading, success, and error states.",
            },
          ]}
        />

        <PageSubsectionHeader
          title="Toast options"
          description="Options supplied when a toast is added or updated."
          className="mt-6"
        />
        <DocsApiTable
          aria-label="Toast options API"
          rows={[
            {
              name: "title",
              type: "React.ReactNode",
              description: "Sets the primary message.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description: "Adds supporting detail.",
            },
            {
              name: "type",
              type: '"success" | "info" | "warning" | "error" | "loading"',
              description: "Sets the semantic visual treatment.",
            },
            {
              name: "timeout",
              type: "number",
              defaultValue: "5000",
              description:
                "Sets the auto-dismiss delay in milliseconds. Zero persists.",
            },
            {
              name: "priority",
              type: '"low" | "high"',
              defaultValue: '"low"',
              description: "Sets polite or urgent announcement behaviour.",
            },
            {
              name: "actionProps",
              type: "ButtonHTMLAttributes",
              description:
                "Adds one action and removes the toast close control.",
            },
            {
              name: "onClose",
              type: "() => void",
              description: "Runs when closing begins.",
            },
            {
              name: "onRemove",
              type: "() => void",
              description: "Runs after exit animation completes.",
            },
          ]}
        />

        <PageSubsectionHeader
          title="Toaster"
          description="The application-level provider and viewport."
          className="mt-6"
        />
        <DocsApiTable
          aria-label="Toaster API"
          rows={[
            {
              name: "timeout",
              type: "number",
              defaultValue: "5000",
              description: "Sets the default auto-dismiss delay.",
            },
            {
              name: "limit",
              type: "number",
              defaultValue: "3",
              description: "Sets the maximum number displayed at once.",
            },
            {
              name: "toastManager",
              type: "ToastManager",
              defaultValue: "toast",
              description: "Supplies the manager used by this provider.",
            },
          ]}
        />

        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/toast">
                Shadcn Toast documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/toast">
                Base UI Toast API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use persistent or blocking feedback when temporary feedback is not enough."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> — feedback
            that stays on the page.
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — a decision that must block the next action.
          </li>
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> —
            indeterminate loading inside an existing interface.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
