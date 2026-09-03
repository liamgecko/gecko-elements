import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Progress } from "@gecko/ui/components/progress";
import { Code } from "@gecko/ui/components/code";

export function ProgressPage() {
  const importSnippet = `import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@gecko/ui/components/progress"`;

  const compositionSnippet = `Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator`;

  const progressBarSnippet = `<Progress value={50} aria-label="Export progress" />`;

  const withValueSnippet = `<Progress
  value={65}
  valueLabel="65%"
  aria-label="Export progress"
/>`;

  const withLabelSnippet = `<Progress value={40} label="Uploading..." />`;

  const sizeSmallSnippet = `<Progress
  value={60}
  size="sm"
  label="Small"
  valueLabel="60%"
/>`;

  const sizeMediumSnippet = `<Progress
  value={60}
  size="default"
  label="Medium"
  valueLabel="60%"
/>`;

  const sizeLargeSnippet = `<Progress
  value={60}
  size="lg"
  label="Large"
  valueLabel="60%"
/>`;

  const colourBarSnippet = `<Progress value={20} valueLabel="20%" showValueColors aria-label="Export progress" />
<Progress value={45} valueLabel="45%" showValueColors aria-label="Export progress" />
<Progress value={65} valueLabel="65%" showValueColors aria-label="Export progress" />
<Progress value={90} valueLabel="90%" showValueColors aria-label="Export progress" />`;

  const progressRingSnippet = `<Progress type="ring" value={55} aria-label="Export progress" />`;

  const withValueRingSnippet = `<Progress
  type="ring"
  value={75}
  valueLabel="75%"
  aria-label="Export progress"
/>`;

  const withLabelRingSnippet = `<Progress
  type="ring"
  value={30}
  label="Storage used"
/>`;

  const ringSizeSmallSnippet = `<Progress
  type="ring"
  value={40}
  size="sm"
  label="Small"
  valueLabel="40%"
/>`;

  const ringSizeMediumSnippet = `<Progress
  type="ring"
  value={40}
  size="default"
  label="Medium"
  valueLabel="40%"
/>`;

  const ringSizeLargeSnippet = `<Progress
  type="ring"
  value={40}
  size="lg"
  label="Large"
  valueLabel="40%"
/>`;

  const colourRingSnippet = `<Progress type="ring" value={20} valueLabel="20%" showValueColors aria-label="Export progress" />
<Progress type="ring" value={45} valueLabel="45%" showValueColors aria-label="Export progress" />
<Progress type="ring" value={65} valueLabel="65%" showValueColors aria-label="Export progress" />
<Progress type="ring" value={90} valueLabel="90%" showValueColors aria-label="Export progress" />`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Progress"
        description="Progress shows completion state for a task. It supports bar and ring presentations."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Progress for data and reporting displays where completion is
            measurable — for example a percentage complete on a report or
            metric. Communicate it as a value from 0 to 100.
            <br />
            <br />
            Avoid using Progress as the primary loading pattern for page or
            panel waits — that is a{" "}
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Progress for bar or ring displays."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="Progress contains its track and indicator. Add a label and formatted value when they help identify the task and its state."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="progress-bar"
        title="Progress bar"
        description="A horizontal indicator for completion across the available width."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Progress value={50} aria-label="Export progress" />
            <Code
              variant="block"
              language="tsx"
              code={progressBarSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="with-value"
        title="With value"
        description="Show the current percentage when people need the precise completion state."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Progress
              value={65}
              valueLabel="65%"
              aria-label="Export progress"
            />
            <Code
              variant="block"
              language="tsx"
              code={withValueSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="with-label"
        title="With label"
        description="Name the task when the surrounding context does not identify it clearly."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Progress value={40} label="Uploading..." />
            <Code
              variant="block"
              language="tsx"
              code={withLabelSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="progress-bar-sizes"
        title="Progress bar sizes"
        description="Choose a bar height that matches the surrounding layout."
      >
        <ChildSection
          id="progress-bar-sizes-small"
          title="Small"
          description="A compact bar for dense layouts."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Progress value={60} size="sm" label="Small" valueLabel="60%" />
              <Code
                variant="block"
                language="tsx"
                code={sizeSmallSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="progress-bar-sizes-medium"
          title="Medium"
          description="The standard bar height for most layouts."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Progress
                value={60}
                size="default"
                label="Medium"
                valueLabel="60%"
              />
              <Code
                variant="block"
                language="tsx"
                code={sizeMediumSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="progress-bar-sizes-large"
          title="Large"
          description="A taller bar for prominent progress displays."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Progress value={60} size="lg" label="Large" valueLabel="60%" />
              <Code
                variant="block"
                language="tsx"
                code={sizeLargeSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="progress-colour-bar"
        title="Progress colour (bar)"
        description="Use tiered colour only when the thresholds communicate meaningful status or urgency."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <Progress
                value={20}
                valueLabel="20%"
                showValueColors
                aria-label="Export progress"
              />
              <Progress
                value={45}
                valueLabel="45%"
                showValueColors
                aria-label="Export progress"
              />
              <Progress
                value={65}
                valueLabel="65%"
                showValueColors
                aria-label="Export progress"
              />
              <Progress
                value={90}
                valueLabel="90%"
                showValueColors
                aria-label="Export progress"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={colourBarSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="progress-ring"
        title="Progress ring"
        description="A circular indicator for completion in a compact square footprint."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Progress type="ring" value={55} aria-label="Export progress" />
            <Code
              variant="block"
              language="tsx"
              code={progressRingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="with-value-ring"
        title="With value (ring)"
        description="Centre the percentage when it should be read as part of the ring."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Progress
              type="ring"
              value={75}
              valueLabel="75%"
              aria-label="Export progress"
            />
            <Code
              variant="block"
              language="tsx"
              code={withValueRingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="with-label-ring"
        title="With label (ring)"
        description="Add a short caption when the ring needs to identify its metric."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Progress type="ring" value={30} label="Storage used" />
            <Code
              variant="block"
              language="tsx"
              code={withLabelRingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="progress-ring-sizes"
        title="Progress ring sizes"
        description="Choose a ring diameter that matches the surrounding layout."
      >
        <ChildSection
          id="progress-ring-sizes-small"
          title="Small"
          description="A compact ring for dense dashboards or table cells."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Progress
                type="ring"
                value={40}
                size="sm"
                label="Small"
                valueLabel="40%"
              />
              <Code
                variant="block"
                language="tsx"
                code={ringSizeSmallSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="progress-ring-sizes-medium"
          title="Medium"
          description="The standard ring size for most layouts."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Progress
                type="ring"
                value={40}
                size="default"
                label="Medium"
                valueLabel="40%"
              />
              <Code
                variant="block"
                language="tsx"
                code={ringSizeMediumSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="progress-ring-sizes-large"
          title="Large"
          description="A larger ring for a prominent progress display."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Progress
                type="ring"
                value={40}
                size="lg"
                label="Large"
                valueLabel="40%"
              />
              <Code
                variant="block"
                language="tsx"
                code={ringSizeLargeSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="progress-colour-ring"
        title="Progress colour (ring)"
        description="Use tiered colour only when the thresholds communicate meaningful status or urgency."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-8">
              <Progress
                type="ring"
                value={20}
                valueLabel="20%"
                showValueColors
                aria-label="Export progress"
              />
              <Progress
                type="ring"
                value={45}
                valueLabel="45%"
                showValueColors
                aria-label="Export progress"
              />
              <Progress
                type="ring"
                value={65}
                valueLabel="65%"
                showValueColors
                aria-label="Export progress"
              />
              <Progress
                type="ring"
                value={90}
                valueLabel="90%"
                showValueColors
                aria-label="Export progress"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={colourRingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use Progress for measurable completion and show only the detail people need."
      >
        <DocsDoDont
          doItems={[
            <>Set the task’s current completion from 0 to 100.</>,
            <>Add a label when the task needs a visible name.</>,
            <>Show the exact percentage when it helps people.</>,
            <>Use a ring when progress needs a compact square footprint.</>,
          ]}
          dontItems={[
            <>
              Don’t use Progress for page or panel loading waits. Use a{" "}
              <DocsPageLink to="/components/spinner">Spinner</DocsPageLink>.
            </>,
            <>Don’t show a percentage that does not match the value.</>,
            <>Don’t use tiered colours unless their thresholds have meaning.</>,
            <>Don’t mix bar and ring presentations for the same task.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Progress."
      >
        <DocsApiTable
          rows={[
            {
              name: "type",
              type: '"default" | "ring"',
              defaultValue: '"default"',
              description:
                "Displays progress as a horizontal bar or circular ring.",
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              defaultValue: '"default"',
              description: "Controls the bar height or ring diameter.",
            },
            {
              name: "label",
              type: "string",
              description: "Visible accessible name for the task.",
            },
            {
              name: "valueLabel",
              type: "string",
              description:
                "Formatted value shown beside a bar or inside a ring.",
            },
            {
              name: "showValueColors",
              type: "boolean",
              defaultValue: "false",
              description: "Colours the indicator by value tier.",
            },
            {
              name: "value",
              type: "number | null",
              description: "Current completion value, normally from 0 to 100.",
            },
            {
              name: "min",
              type: "number",
              defaultValue: "0",
              description: "Minimum value in the progress range.",
            },
            {
              name: "max",
              type: "number",
              defaultValue: "100",
              description: "Maximum value in the progress range.",
            },
            {
              name: "aria-valuetext",
              type: "string",
              defaultValue: "—",
              description:
                "Human-readable accessible value when the numeric value needs explanation.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/progress">
                Shadcn Progress documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/progress">
                Base UI Progress API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use an indeterminate indicator when completion is unknown."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> — for
            page and panel loading waits.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
