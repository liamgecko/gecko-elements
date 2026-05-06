import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Progress } from "@gecko/ui/components/progress"
import { Code } from "@gecko/ui/components/code"

export function ProgressPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Progress</h1>
          <p className="text-sm text-muted-foreground">
            Displays the status of a task that takes a long time. Use the bar
            type for horizontal progress or the ring type for circular progress.
            Optional <Code>label</Code> and{" "}
            <Code>valueLabel</Code> props
            provide accessible labeling and value display.
          </p>
        </PageSection>

        <PageSection id="progress-bar" label="Progress bar">
          <h2 className="text-lg font-semibold">Progress bar</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A basic horizontal progress bar. Set <Code>value</Code> between 0 and 100.
          </p>
          <ComponentExample>
            <Progress value={50} />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-value" label="With value">
          <h2 className="text-lg font-semibold">With value</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>valueLabel</Code> prop to show the current value beside the bar.
          </p>
          <ComponentExample>
            <Progress value={65} valueLabel="65%" />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-label" label="With label">
          <h2 className="text-lg font-semibold">With label</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>label</Code> prop to show an accessible label above the bar.
          </p>
          <ComponentExample>
            <Progress
              value={40}
              label="Uploading..."
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="progress-bar-sizes" label="Progress bar sizes">
          <h2 className="text-lg font-semibold">Progress bar sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>size</Code> prop to set the bar height: <Code>sm</Code>, <Code>default</Code>, or <Code>lg</Code>.
          </p>

          <h3 id="progress-bar-sizes-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-8">
            <Progress
              value={60}
              size="sm"
              label="Small"
              valueLabel="60%"
            />
          </ComponentExample>

          <h3 id="progress-bar-sizes-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-8">
            <Progress
              value={60}
              size="default"
              label="Medium"
              valueLabel="60%"
            />
          </ComponentExample>

          <h3 id="progress-bar-sizes-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <Progress
              value={60}
              size="lg"
              label="Large"
              valueLabel="60%"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="progress-colour-bar" label="Progress colour (bar)">
          <h2 className="text-lg font-semibold">Progress colour (bar)</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>showValueColors</Code> to colour the bar by value tier: low (red), mid (warning/chart-4), high (success).
          </p>
          <ComponentExample className="flex flex-col gap-4">
            <Progress value={20} showValueColors />
            <Progress value={45} showValueColors />
            <Progress value={65} showValueColors />
            <Progress value={90} showValueColors />
          </ComponentExample>
        </PageSection>

        <PageSection id="progress-ring" label="Progress ring">
          <h2 className="text-lg font-semibold">Progress ring</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>type="ring"</Code> for a circular progress indicator.
          </p>
          <ComponentExample>
            <Progress type="ring" value={55} />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-value-ring" label="With value (ring)">
          <h2 className="text-lg font-semibold">With value (ring)</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>valueLabel</Code> to show the value centered inside the ring.
          </p>
          <ComponentExample>
            <Progress
              type="ring"
              value={75}
              valueLabel="75%"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-label-ring" label="With label (ring)">
          <h2 className="text-lg font-semibold">With label (ring)</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>label</Code> prop to show a label below the ring.
          </p>
          <ComponentExample>
            <Progress
              type="ring"
              value={30}
              label="Storage used"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="progress-ring-sizes" label="Progress ring sizes">
          <h2 className="text-lg font-semibold">Progress ring sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>size</Code> prop with ring type: <Code>sm</Code>, <Code>default</Code>, or <Code>lg</Code>.
          </p>

          <h3 id="progress-ring-sizes-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-8">
            <Progress
              type="ring"
              value={40}
              size="sm"
              label="Small"
              valueLabel="40%"
            />
          </ComponentExample>

          <h3 id="progress-ring-sizes-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-8">
            <Progress
              type="ring"
              value={40}
              size="default"
              label="Medium"
              valueLabel="40%"
            />
          </ComponentExample>

          <h3 id="progress-ring-sizes-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <Progress
              type="ring"
              value={40}
              size="lg"
              label="Large"
              valueLabel="40%"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="progress-colour-ring" label="Progress colour (ring)">
          <h2 className="text-lg font-semibold">Progress colour (ring)</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>showValueColors</Code> with <Code>type="ring"</Code> to colour the ring by value tier.
          </p>
          <ComponentExample className="flex flex-wrap gap-8">
            <Progress type="ring" value={20} showValueColors />
            <Progress type="ring" value={45} showValueColors />
            <Progress type="ring" value={65} showValueColors />
            <Progress type="ring" value={90} showValueColors />
          </ComponentExample>
        </PageSection>
    </div>
  )
}
