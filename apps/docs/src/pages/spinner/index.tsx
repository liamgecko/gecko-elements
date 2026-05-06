import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import { Button } from "@gecko/ui/components/button"
import { Badge } from "@gecko/ui/components/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@gecko/ui/components/input-group"
import { Spinner } from "@gecko/ui/components/spinner"

export function SpinnerPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Spinner</h1>
          <p className="text-sm text-muted-foreground">
            A simple animated indicator for loading states.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              {"<Spinner />"}
            </Code>{" "}
            component to show a loading indicator.
          </p>
          <ComponentExample>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Spinner />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Control the spinner size with the{" "}
            <Code>
              size
            </Code>{" "}
            prop instead of raw utility classes.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Spinner size="xs" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="sm" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="md" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="lg" />
              </div>
              <div className="flex items-center gap-3">
                <Spinner size="xl" />
              </div>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="combinations" label="Combinations">
          <h2 className="text-lg font-semibold">Combinations</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine the spinner with other components to indicate loading states in context.
          </p>

          <h3 id="combinations-button" className="mb-3 text-base font-semibold">Button</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button disabled>
                <Spinner size="sm" data-icon="inline-start" aria-hidden="true" />
                Saving
              </Button>
              <Button variant="outline" disabled>
                Loading
                <Spinner size="sm" data-icon="inline-end" aria-hidden="true" />
              </Button>
            </div>
          </ComponentExample>

          <h3 id="combinations-badge" className="mb-3 text-base font-semibold">Badge</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <Badge size="sm" variant="info">
                <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
                Syncing
              </Badge>
              <Badge size="sm" variant="success">
                <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
                Updating
              </Badge>
              <Badge size="sm" variant="warning">
                <Spinner size="xs" data-icon="inline-start" aria-hidden="true" />
                Processing
              </Badge>
            </div>
          </ComponentExample>

          <h3 id="combinations-input" className="mb-3 text-base font-semibold">Input</h3>
          <ComponentExample>
            <InputGroup>
              <InputGroupInput placeholder="Send a message..." />
              <InputGroupAddon align="inline-end">
                <Spinner size="sm" aria-hidden="true" />
              </InputGroupAddon>
            </InputGroup>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
