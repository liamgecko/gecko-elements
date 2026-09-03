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
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";
import { BookmarkPlusIcon } from "lucide-react";

const sides = ["left", "top", "bottom", "right"] as const;

export function TooltipPage() {
  const importSnippet = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"`;

  const providerSnippet = `<TooltipProvider>
  {children}
</TooltipProvider>`;

  const compositionSnippet = `TooltipProvider
└── Tooltip
    ├── TooltipTrigger
    └── TooltipContent`;

  const basicExampleSnippet = `<Tooltip>
  <TooltipTrigger
    render={
      <Button variant="outline" size="icon" aria-label="Add to library" />
    }
  >
    <BookmarkPlusIcon />
  </TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`;

  const positioningSnippet = `<TooltipContent
  side="top|right|bottom|left"
  align="start|center|end"
>
  Tooltip label
</TooltipContent>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Tooltip"
        description="The Tooltip component shows a short, supplementary label when a trigger is hovered or focused."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Tooltip to clarify icon-only controls and unfamiliar actions.
            Keep the copy brief and ensure the interface remains understandable
            without it. Use a{" "}
            <DocsPageLink to="/components/popover">Popover</DocsPageLink> for
            interactive or longer content.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the provider and the parts required by the interface."
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
          id="usage-provider"
          title="Provider"
          description="Place one provider near the application root to share timing behaviour."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={providerSnippet}
              showCopyButton
              copyLabel="Copy provider"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="The trigger opens the supplementary content."
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
        id="basic-example"
        title="Basic example"
        description="Give an icon-only trigger an accessible name that matches its tooltip."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Add to library"
                  />
                }
              >
                <BookmarkPlusIcon />
              </TooltipTrigger>
              <TooltipContent>Add to library</TooltipContent>
            </Tooltip>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="positioning"
        title="Positioning"
        description="Choose a preferred placement when the surrounding layout requires it. Collision handling may adjust the final position."
      >
        <ComponentExample>
          <div className="space-y-6">
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
                  <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={positioningSnippet}
              showCopyButton
              copyLabel="Copy positioning"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use Tooltip for brief, non-interactive supporting text."
      >
        <DocsDoDont
          doItems={[
            <>Keep the copy short and direct.</>,
            <>Clarify unfamiliar or icon-only controls.</>,
            <>Match an icon-only trigger’s accessible name to its tooltip.</>,
            <>Keep the trigger keyboard focusable.</>,
          ]}
          dontItems={[
            <>Don’t put required instructions only in a Tooltip.</>,
            <>Don’t put buttons, links, or other interaction in the content.</>,
            <>Don’t repeat a visible text label without adding information.</>,
            <>Don’t recreate placement with margins or transforms.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Tooltip."
      >
        <ChildSection
          id="api-provider"
          title="TooltipProvider"
          description="Shares timing behaviour between descendant tooltips."
        >
          <DocsApiTable
            aria-label="TooltipProvider API properties"
            rows={[
              {
                name: "delay",
                type: "number",
                defaultValue: "150",
                description: "Sets the delay before a tooltip opens.",
              },
              {
                name: "closeDelay",
                type: "number",
                defaultValue: "0",
                description: "Sets the delay before a tooltip closes.",
              },
              {
                name: "timeout",
                type: "number",
                defaultValue: "400",
                description:
                  "Sets the warm-up window shared by nearby tooltips.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-tooltip"
          title="Tooltip"
          description="Owns the open state for one tooltip."
        >
          <DocsApiTable
            aria-label="Tooltip API properties"
            rows={[
              {
                name: "open",
                type: "boolean",
                description: "Controls whether the tooltip is open.",
              },
              {
                name: "defaultOpen",
                type: "boolean",
                defaultValue: "false",
                description: "Sets the initial uncontrolled open state.",
              },
              {
                name: "onOpenChange",
                type: "(open: boolean, eventDetails) => void",
                description: "Runs when the open state changes.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Prevents the tooltip from opening.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-trigger"
          title="TooltipTrigger"
          description="Connects the tooltip to its trigger element."
        >
          <DocsApiTable
            aria-label="TooltipTrigger API properties"
            rows={[
              {
                name: "render",
                type: "ReactElement | function",
                description: "Uses another element as the trigger.",
              },
              {
                name: "delay",
                type: "number",
                description: "Overrides the provider’s opening delay.",
              },
              {
                name: "closeDelay",
                type: "number",
                defaultValue: "0",
                description: "Overrides the provider’s closing delay.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-content"
          title="TooltipContent"
          description="Renders and positions the supplementary label."
        >
          <DocsApiTable
            aria-label="TooltipContent API properties"
            rows={[
              {
                name: "side",
                type: '"top" | "right" | "bottom" | "left" | logical sides',
                defaultValue: '"top"',
                description: "Sets the preferred side of the trigger.",
              },
              {
                name: "sideOffset",
                type: "number",
                defaultValue: "4",
                description: "Sets the distance from the trigger.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"center"',
                description: "Aligns the content along its selected side.",
              },
              {
                name: "alignOffset",
                type: "number",
                defaultValue: "0",
                description: "Shifts the content along its alignment axis.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/tooltip">
                Shadcn Tooltip documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/tooltip">
                Base UI Tooltip API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a richer overlay when the content needs more room or interaction."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/popover">Popover</DocsPageLink> — for
            richer or interactive content.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
