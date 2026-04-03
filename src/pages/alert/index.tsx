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
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
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

          <h3 id="variations-destructive" className="mb-3 text-base font-semibold">Destructive</h3>
          <ComponentExample className="mb-6">
            <Alert variant="destructive" icon={true}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </ComponentExample>

          <h3 id="variations-info" className="mb-3 text-base font-semibold">Info</h3>
          <ComponentExample className="mb-6">
            <Alert variant="info" icon={true}>
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                New features are available. Refresh to get the latest.
              </AlertDescription>
            </Alert>
          </ComponentExample>

          <h3 id="variations-success" className="mb-3 text-base font-semibold">Success</h3>
          <ComponentExample className="mb-6">
            <Alert variant="success" icon={true}>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>
          </ComponentExample>

          <h3 id="variations-warning" className="mb-3 text-base font-semibold">Warning</h3>
          <ComponentExample>
            <Alert variant="warning" icon={true}>
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Your storage is almost full. Free up space to continue.
              </AlertDescription>
            </Alert>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
