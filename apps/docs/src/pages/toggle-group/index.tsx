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
import { Code } from "@gecko/ui/components/code";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@gecko/ui/components/toggle-group";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

function AlignmentIcons() {
  return (
    <>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align centre">
        <AlignCenter aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight aria-hidden="true" />
      </ToggleGroupItem>
    </>
  );
}

export function ToggleGroupPage() {
  const importSnippet = `import {
  ToggleGroup,
  ToggleGroupItem,
} from "@gecko/ui/components/toggle-group"`;
  const compositionSnippet = `ToggleGroup
└── ToggleGroupItem`;
  const basicSnippet = `<ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align centre">
    <AlignCenter aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight aria-hidden="true" />
  </ToggleGroupItem>
</ToggleGroup>`;
  const multipleSnippet = `<ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
  <ToggleGroupItem value="bold" aria-label="Bold">
    <Bold aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">
    <Italic aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline">
    <Underline aria-hidden="true" />
  </ToggleGroupItem>
</ToggleGroup>`;
  const sizesSnippet = `<ToggleGroup size="sm|default|lg" aria-label="Text alignment">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;
  const spacingSnippet = `<ToggleGroup spacing={2} aria-label="View mode">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup spacing={0} aria-label="View mode">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>`;
  const verticalSnippet = `<ToggleGroup orientation="vertical" defaultValue={["left"]} aria-label="Text alignment">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Centre</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup orientation="vertical" spacing={0} defaultValue={["left"]} aria-label="Connected text alignment">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Centre</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;
  const disabledSnippet = `<ToggleGroup disabled defaultValue={["bold"]} aria-label="Text formatting">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
</ToggleGroup>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Toggle group"
          description="Toggle Group coordinates related two-state buttons. Use it for a compact single or multiple selection where every item controls an immediate local state."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Toggle Group for related toolbar states, view modes, or a
              compact filter. Keep the set short and give the group an
              accessible name. Use{" "}
              <DocsPageLink to="/components/radio-group">
                Radio group
              </DocsPageLink>{" "}
              when one choice is submitted in a form, and use{" "}
              <DocsPageLink to="/components/button-group">
                Button group
              </DocsPageLink>{" "}
              for actions that do not remain selected.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the group and item parts together."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
        <PageSubsectionHeader
          id="usage-composition"
          title="Composition"
          description="Place every coordinated item directly inside one group."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description="A single-selection alignment control. Pressing one item releases the others."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
              <AlignmentIcons />
            </ToggleGroup>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="multiple" label="Multiple selection">
        <PageSectionHeader
          title="Multiple selection"
          description="Allow independent pressed states when more than one formatting option may be active."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ToggleGroup
              multiple
              defaultValue={["bold"]}
              aria-label="Text formatting"
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold aria-hidden="true" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic aria-hidden="true" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline aria-hidden="true" />
              </ToggleGroupItem>
            </ToggleGroup>
            <Code
              variant="block"
              language="tsx"
              code={multipleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description="Set size once on the group so every item uses the same dimensions."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-3">
              {(["sm", "default", "lg"] as const).map((size) => (
                <ToggleGroup
                  key={size}
                  size={size}
                  defaultValue={["left"]}
                  aria-label={`${size} text alignment`}
                >
                  <ToggleGroupItem value="left">Left</ToggleGroupItem>
                  <ToggleGroupItem value="right">Right</ToggleGroupItem>
                </ToggleGroup>
              ))}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="spacing" label="Spacing">
        <PageSectionHeader
          title="Spacing"
          description="Items are separate by default. Set zero spacing only when they should form one connected control."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-3">
              <ToggleGroup
                defaultValue={["list"]}
                aria-label="Separated view mode"
              >
                <ToggleGroupItem value="list">List</ToggleGroupItem>
                <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                spacing={0}
                defaultValue={["list"]}
                aria-label="Connected view mode"
              >
                <ToggleGroupItem value="list">List</ToggleGroupItem>
                <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={spacingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="vertical" label="Vertical">
        <PageSectionHeader
          title="Vertical"
          description="Arrange items vertically as separate controls or as one connected stack."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <ToggleGroup
                orientation="vertical"
                defaultValue={["left"]}
                aria-label="Text alignment"
              >
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Centre</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                orientation="vertical"
                spacing={0}
                defaultValue={["left"]}
                aria-label="Connected text alignment"
              >
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Centre</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={verticalSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="disabled" label="Disabled">
        <PageSectionHeader
          title="Disabled"
          description="Disable the complete set when none of its options are currently available."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ToggleGroup
              disabled
              defaultValue={["bold"]}
              aria-label="Text formatting"
            >
              <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
              <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            </ToggleGroup>
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use one clear selection model throughout the complete set."
        />
        <DocsDoDont
          doItems={[
            <>Give the group an accessible name.</>,
            <>Use one item value for each distinct state.</>,
            <>Enable multiple selection only when states are independent.</>,
            <>Set size on the group for consistent children.</>,
          ]}
          dontItems={[
            <>Don’t mix actions and persistent states in one group.</>,
            <>Don’t use a compact Toggle Group for a long option list.</>,
            <>Don’t control individual item state separately from the group.</>,
            <>
              Don’t use connected styling unless the items form one segmented
              control.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props for each Toggle Group part."
        />
        <PageSubsectionHeader
          id="api-toggle-group"
          title="ToggleGroup"
          description="Coordinates selection, layout, and shared presentation."
        />
        <DocsApiTable
          aria-label="ToggleGroup properties"
          rows={[
            {
              name: "value",
              type: "readonly string[]",
              description: "Controls the pressed item values.",
            },
            {
              name: "defaultValue",
              type: "readonly string[]",
              description: "Sets the initial uncontrolled pressed values.",
            },
            {
              name: "onValueChange",
              type: "(value, eventDetails) => void",
              description: "Runs when the pressed values change.",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: "false",
              description: "Allows more than one item to be pressed.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description: "Sets layout and arrow-key direction.",
            },
            {
              name: "spacing",
              type: "number",
              defaultValue: "2",
              description:
                "Sets the design-system gap between items. Use zero for connected items.",
            },
            {
              name: "variant",
              type: "Toggle variant",
              defaultValue: '"outline"',
              description: "Sets the shared visual treatment.",
            },
            {
              name: "size",
              type: "Toggle size",
              defaultValue: '"default"',
              description: "Sets the shared control dimensions.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents interaction with the complete group.",
            },
            {
              name: "loopFocus",
              type: "boolean",
              defaultValue: "true",
              description:
                "Loops arrow-key focus between the first and final item.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          id="api-toggle-group-item"
          title="ToggleGroupItem"
          description="Represents one pressed value in the group."
        />
        <DocsApiTable
          aria-label="ToggleGroupItem properties"
          rows={[
            {
              name: "value",
              type: "string",
              description: "Identifies the item in the group value array.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents interaction with this item.",
            },
            {
              name: "variant",
              type: "Toggle variant",
              defaultValue: '"outline"',
              description:
                "Sets presentation when the group does not provide it.",
            },
            {
              name: "size",
              type: "Toggle size",
              defaultValue: '"default"',
              description:
                "Sets dimensions when the group does not provide them.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/toggle-group">
                Shadcn Toggle Group documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/toggle-group">
                Base UI Toggle Group API
              </DocsExternalLink>{" "}
              for the source composition and inherited behaviour.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Choose a control based on whether the state is independent, grouped, or submitted."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/toggle">Toggle</DocsPageLink> — one
            independent pressed state.
          </li>
          <li>
            <DocsPageLink to="/components/button-group">
              Button group
            </DocsPageLink>{" "}
            — related actions with no persistent selection.
          </li>
          <li>
            <DocsPageLink to="/components/radio-group">
              Radio group
            </DocsPageLink>{" "}
            — one submitted choice from a labelled set.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
