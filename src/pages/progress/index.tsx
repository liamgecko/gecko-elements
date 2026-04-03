import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Progress } from "@/components/ui/progress"
import { Code } from "@/components/ui/code"

export function ProgressPage() {
  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Progress</h1>
          <p className="text-sm text-muted-foreground">
            Displays the status of a task that takes a long time. Use the bar
            type for horizontal progress or the ring type for circular progress.
            Optional <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">label</Code> and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">valueLabel</Code> props
            provide accessible labeling and value display.
          </p>
        </PageSection>

        <PageSection id="progress-bar" label="Progress bar">
          <h2 className="text-lg font-semibold">Progress bar</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A basic horizontal progress bar. Set <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">value</Code> between 0 and 100.
          </p>
          <ComponentExample>
            <Progress value={50} />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-value" label="With value">
          <h2 className="text-lg font-semibold">With value</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">valueLabel</Code> prop to show the current value beside the bar.
          </p>
          <ComponentExample>
            <Progress value={65} valueLabel="65%" />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-label" label="With label">
          <h2 className="text-lg font-semibold">With label</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">label</Code> prop to show an accessible label above the bar.
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
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">size</Code> prop to set the bar height: <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">sm</Code>, <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">default</Code>, or <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lg</Code>.
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
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">showValueColors</Code> to colour the bar by value tier: low (red), mid (warning/chart-4), high (success).
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
            Set <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">type="ring"</Code> for a circular progress indicator.
          </p>
          <ComponentExample>
            <Progress type="ring" value={55} />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-value-ring" label="With value (ring)">
          <h2 className="text-lg font-semibold">With value (ring)</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">valueLabel</Code> to show the value centered inside the ring.
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
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">label</Code> prop to show a label below the ring.
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
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">size</Code> prop with ring type: <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">sm</Code>, <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">default</Code>, or <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lg</Code>.
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
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">showValueColors</Code> with <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">type="ring"</Code> to colour the ring by value tier.
          </p>
          <ComponentExample className="flex flex-wrap gap-8">
            <Progress type="ring" value={20} showValueColors />
            <Progress type="ring" value={45} showValueColors />
            <Progress type="ring" value={65} showValueColors />
            <Progress type="ring" value={90} showValueColors />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
