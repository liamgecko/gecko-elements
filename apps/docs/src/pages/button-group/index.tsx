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
import { Button } from "@gecko/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@gecko/ui/components/button-group";
import { Code } from "@gecko/ui/components/code";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { Input } from "@gecko/ui/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select";
import { ChevronDown, Minus, Plus, Search } from "lucide-react";

const currencies = [
  { label: "GBP", value: "gbp" },
  { label: "EUR", value: "eur" },
  { label: "USD", value: "usd" },
];

export function ButtonGroupPage() {
  const importSnippet = `import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@gecko/ui/components/button-group"`;

  const compositionSnippet = `ButtonGroup
├── Button, Input, or SelectTrigger
├── ButtonGroupText
└── ButtonGroupSeparator`;

  const basicSnippet = `<ButtonGroup aria-label="Message actions">
  <Button variant="outline">Archive</Button>
  <Button variant="outline">Report</Button>
</ButtonGroup>`;

  const orientationSnippet = `<ButtonGroup orientation="horizontal|vertical" aria-label="Zoom controls">
  <Button variant="outline" size="icon" aria-label="Zoom out">
    <Minus aria-hidden="true" />
  </Button>
  <Button variant="outline" size="icon" aria-label="Zoom in">
    <Plus aria-hidden="true" />
  </Button>
</ButtonGroup>`;

  const sizesSnippet = `<ButtonGroup aria-label="View density">
  <Button variant="outline" size="sm|default|lg">Compact</Button>
  <Button variant="outline" size="sm|default|lg">Comfortable</Button>
</ButtonGroup>`;

  const splitSnippet = `<ButtonGroup aria-label="Save options">
  <Button>Save changes</Button>
  <ButtonGroupSeparator />
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button size="icon" aria-label="More save options">
          <ChevronDown aria-hidden="true" />
        </Button>
      }
    />
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Save and publish</DropdownMenuItem>
      <DropdownMenuItem>Save as draft</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>`;

  const inputSnippet = `<ButtonGroup aria-label="Search conversations">
  <Input type="search" aria-label="Search conversations" placeholder="Search..." />
  <Button variant="outline" size="icon" aria-label="Search">
    <Search aria-hidden="true" />
  </Button>
</ButtonGroup>`;

  const selectSnippet = `<ButtonGroup className="w-full max-w-xs" aria-label="Payment amount">
  <Select items={currencies} defaultValue="gbp">
    <SelectTrigger aria-label="Currency">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {currencies.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            {currency.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
  <Input aria-label="Amount" inputMode="decimal" defaultValue="10.00" />
</ButtonGroup>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Button group"
          description="Button Group visually joins related actions into one compact control cluster. Use it when the actions operate on the same object or value."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Button Group for a short set of closely related actions, a
              split action, or controls around one value. Use{" "}
              <DocsPageLink to="/components/toggle-group">
                Toggle group
              </DocsPageLink>{" "}
              when the controls represent persistent selected states.
              <br />
              <br />
              Give the group an accessible name. Every child remains a normal
              Button or Input and keeps its own keyboard behaviour.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the group and any supporting parts used by the composition."
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
          description="Place related controls directly inside the group."
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
          description="Two equal actions that operate on the same message."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ButtonGroup aria-label="Message actions">
              <Button variant="outline">Archive</Button>
              <Button variant="outline">Report</Button>
            </ButtonGroup>
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

      <PageSection id="orientation" label="Orientation">
        <PageSectionHeader
          title="Orientation"
          description="Lay out the same action set horizontally or vertically."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <ButtonGroup aria-label="Horizontal zoom controls">
                <Button variant="outline" size="icon" aria-label="Zoom out">
                  <Minus aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Zoom in">
                  <Plus aria-hidden="true" />
                </Button>
              </ButtonGroup>
              <ButtonGroup
                orientation="vertical"
                aria-label="Vertical zoom controls"
              >
                <Button variant="outline" size="icon" aria-label="Zoom out">
                  <Minus aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Zoom in">
                  <Plus aria-hidden="true" />
                </Button>
              </ButtonGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={orientationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description="Set one Button size consistently across every action in the group."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-3">
              {(["sm", "default", "lg"] as const).map((size) => (
                <ButtonGroup key={size} aria-label={`${size} view density`}>
                  <Button variant="outline" size={size}>
                    Compact
                  </Button>
                  <Button variant="outline" size={size}>
                    Comfortable
                  </Button>
                </ButtonGroup>
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

      <PageSection id="split-action" label="Split action">
        <PageSectionHeader
          title="Split action"
          description="Keep the primary action visible and place closely related alternatives behind the adjoining trigger."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ButtonGroup aria-label="Save options">
              <Button>Save changes</Button>
              <ButtonGroupSeparator />
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="icon" aria-label="More save options">
                      <ChevronDown aria-hidden="true" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Save and publish</DropdownMenuItem>
                  <DropdownMenuItem>Save as draft</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
            <Code
              variant="block"
              language="tsx"
              code={splitSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-input" label="With input">
        <PageSectionHeader
          title="With input"
          description="Join an action to the value it submits without placing the button inside the field boundary."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ButtonGroup aria-label="Search conversations">
              <Input
                type="search"
                aria-label="Search conversations"
                placeholder="Search..."
              />
              <Button variant="outline" size="icon" aria-label="Search">
                <Search aria-hidden="true" />
              </Button>
            </ButtonGroup>
            <Code
              variant="block"
              language="tsx"
              code={inputSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-select" label="With select">
        <PageSectionHeader
          title="With select"
          description="Join a choice to the value it qualifies when both controls form one compact input."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ButtonGroup
              className="w-full max-w-xs"
              aria-label="Payment amount"
            >
              <Select items={currencies} defaultValue="gbp">
                <SelectTrigger aria-label="Currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                aria-label="Amount"
                inputMode="decimal"
                defaultValue="10.00"
              />
            </ButtonGroup>
            <Code
              variant="block"
              language="tsx"
              code={selectSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Group actions only when their relationship is stronger than their individual meaning."
        />
        <DocsDoDont
          doItems={[
            <>Give every Button Group an accessible name.</>,
            <>Use consistent variants and sizes across peer actions.</>,
            <>
              Keep split-button alternatives closely related to the primary
              action.
            </>,
            <>
              Use a separator when adjacent borderless buttons need a visual
              boundary.
            </>,
          ]}
          dontItems={[
            <>Don’t use Button Group to represent a selected state.</>,
            <>Don’t join unrelated page actions simply to save space.</>,
            <>Don’t mix control sizes in one group.</>,
            <>
              Don’t add a separator between outlined buttons that already have
              boundaries.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props for each Button Group part."
        />
        <PageSubsectionHeader
          id="api-button-group"
          title="ButtonGroup"
          description="Owns grouping semantics, orientation, and joined borders."
        />
        <DocsApiTable
          aria-label="ButtonGroup properties"
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"horizontal"',
              description: "Sets the group layout and joined edges.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          id="api-button-group-text"
          title="ButtonGroupText"
          description="Adds non-interactive text or a shared value to the group."
        />
        <DocsApiTable
          aria-label="ButtonGroupText properties"
          rows={[
            {
              name: "render",
              type: "ReactElement | function",
              description: "Replaces or composes the rendered element.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          id="api-button-group-separator"
          title="ButtonGroupSeparator"
          description="Adds a structural divider between adjacent controls."
        />
        <DocsApiTable
          aria-label="ButtonGroupSeparator properties"
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              defaultValue: '"vertical"',
              description: "Sets the divider direction.",
            },
          ]}
        />
        <PageSubsectionHeader
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/button-group">
                Shadcn Button Group documentation
              </DocsExternalLink>{" "}
              for the source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Choose a group based on whether its children act, select, or edit."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — a
            standalone action.
          </li>
          <li>
            <DocsPageLink to="/components/toggle-group">
              Toggle group
            </DocsPageLink>{" "}
            — persistent single or multiple selection.
          </li>
          <li>
            <DocsPageLink to="/components/input-group">
              Input group
            </DocsPageLink>{" "}
            — content and actions inside one field boundary.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
