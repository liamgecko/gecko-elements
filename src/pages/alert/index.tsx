import { ComponentExample } from "@/components/layout/component-example"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

export function AlertPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Alert</h1>
          <p className="text-sm text-muted-foreground">
            Callouts for important messages. Use the variant that matches the
            intent.
          </p>
        </PageSection>
        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default and semantic variants for different alert types.
          </p>
          <ComponentExample className="mb-6">
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
          </ComponentExample>
        </PageSection>
        <PageSection id="variations" label="Variations">
          <h2 className="text-lg font-semibold">Variations</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default and semantic variants for different alert types.
          </p>
          <ComponentExample>
            <div className="flex flex-col gap-3">
              <Alert variant="destructive" icon={true}>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
              <Alert variant="info" icon={true}>
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  New features are available. Refresh to get the latest.
                </AlertDescription>
              </Alert>
              <Alert variant="success" icon={true}>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>
              <Alert variant="warning" icon={true}>
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your storage is almost full. Free up space to continue.
                </AlertDescription>
              </Alert>
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
