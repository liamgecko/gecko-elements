import { toast } from "sonner"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Button } from "@/components/ui/button"

export function ToastPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Toast</h1>
          <p className="text-sm text-muted-foreground">
            An opinionated toast component for React from the Sonner library.
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              toast
            </code>{" "}
            function to trigger notifications.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Trigger a default toast with a single call to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              toast
            </code>
            .
          </p>
          <ComponentExample>
            <Button
              variant="outline"
              onClick={() => toast("Event has been created")}
            >
              Trigger toast
            </Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="description" label="Description">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass a description to provide more context for the toast message.
          </p>
          <ComponentExample>
            <Button
              variant="outline"
              onClick={() =>
                toast("Saved", {
                  description: "Your changes have been saved successfully.",
                })
              }
            >
              Trigger toast
            </Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="position" label="Position">
          <h2 className="text-lg font-semibold">Position</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              position
            </code>{" "}
            option to control where toasts appear on screen.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => toast("Top left", { position: "top-left" })}
              >
                Top left
              </Button>
              <Button
                variant="outline"
                onClick={() => toast("Top center", { position: "top-center" })}
              >
                Top center
              </Button>
              <Button
                variant="outline"
                onClick={() => toast("Top right", { position: "top-right" })}
              >
                Top right
              </Button>
              <Button
                variant="outline"
                onClick={() => toast("Bottom left", { position: "bottom-left" })}
              >
                Bottom left
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast("Bottom center", { position: "bottom-center" })
                }
              >
                Bottom center
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast("Bottom right", { position: "bottom-right" })
                }
              >
                Bottom right
              </Button>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use type-specific helpers to show informational, warning, error, or
            success toasts.
          </p>

          <h3 id="variants-info" className="mb-3 text-base font-semibold">Info</h3>
          <ComponentExample className="mb-6">
            <Button
              variant="outline"
              onClick={() => toast.info("This is an informational message")}
            >
              Trigger toast
            </Button>
          </ComponentExample>

          <h3 id="variants-warning" className="mb-3 text-base font-semibold">Warning</h3>
          <ComponentExample className="mb-6">
            <Button
              variant="outline"
              onClick={() => toast.warning("Please double-check your changes")}
            >
              Trigger toast
            </Button>
          </ComponentExample>

          <h3 id="variants-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample className="mb-6">
            <Button
              variant="outline"
              onClick={() => toast.error("Something went wrong")}
            >
              Trigger toast
            </Button>
          </ComponentExample>

          <h3 id="variants-success" className="mb-3 text-base font-semibold">Success</h3>
          <ComponentExample>
            <Button
              variant="outline"
              onClick={() => toast.success("Event has been created successfully")}
            >
              Trigger toast
            </Button>
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Handle async work and loading states with promise-based and loading toasts.
          </p>

          <h3 id="states-promise" className="mb-3 text-base font-semibold">Promise</h3>
          <ComponentExample className="mb-6">
            <Button
              variant="outline"
              onClick={() => {
                const fakeRequest = () =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (Math.random() > 0.5) {
                        resolve("Project has been created")
                      } else {
                        reject(new Error("Failed to create project"))
                      }
                    }, 1500)
                  })

                toast.promise(fakeRequest(), {
                  loading: "Creating project…",
                  success: (message) => String(message),
                  error: (error) =>
                    error instanceof Error ? error.message : "Something went wrong",
                })
              }}
            >
              Trigger toast
            </Button>
          </ComponentExample>

          <h3 id="states-loading" className="mb-3 text-base font-semibold">Loading</h3>
          <ComponentExample>
            <Button
              variant="outline"
              onClick={() => {
                const id = toast.loading("Syncing data…")
                setTimeout(() => {
                  toast.success("Data synced", { id })
                }, 1500)
              }}
            >
              Trigger toast
            </Button>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

