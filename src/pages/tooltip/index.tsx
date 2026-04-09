import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Button } from "@/components/ui/button"
import { Code } from "@/components/ui/code"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sides = ["left", "top", "bottom", "right"] as const

export function TooltipPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Tooltip</h1>
          <p className="text-sm text-muted-foreground">
            A small popover that appears on hover or focus to show short copy.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Wrap a trigger and content with <Code>Tooltip</Code>. Use{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TooltipTrigger
            </Code>{" "}
            with the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              render
            </Code>{" "}
            prop and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TooltipContent
            </Code>{" "}
            for the popover.
          </p>
          <ComponentExample>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline">Hover</Button>} />
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </ComponentExample>
        </PageSection>

        <PageSection id="side" label="Side">
          <h2 className="text-lg font-semibold">Side</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              side
            </Code>{" "}
            prop on <Code>TooltipContent</Code> to control where the tooltip
            appears relative to the trigger.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-4">
              {sides.map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger
                    render={
                      <Button variant="outline" className="capitalize">
                        {side}
                      </Button>
                    }
                  />
                  <TooltipContent side={side}>
                    <p>Tooltip on {side}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="styling" label="Styling">
          <h2 className="text-lg font-semibold">Styling</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              variant
            </Code>{" "}
            prop on <Code>TooltipContent</Code> to switch between the default and
            light styles.
          </p>

          <h3 id="styling-default" className="mb-4 text-base font-semibold">Default</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Dark background with light text.
          </p>
          <ComponentExample className="mb-10">
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline">Hover</Button>}
              />
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </ComponentExample>

          <h3 id="styling-light" className="mb-4 text-base font-semibold">Light</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Light background with dark (foreground) text.
          </p>
          <ComponentExample>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline">Hover</Button>}
              />
              <TooltipContent variant="light">
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
