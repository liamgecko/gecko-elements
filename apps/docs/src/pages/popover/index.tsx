import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { PageSection } from "@/components/layout/page-section";

import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import { Field, FieldGroup, FieldLabel } from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@gecko/ui/components/popover";

export function PopoverPage() {
  const importSnippet = `import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@gecko/ui/components/popover"`;

  const compositionSnippet = `Popover
├── PopoverTrigger
└── PopoverContent
    ├── PopoverHeader
    │   ├── PopoverTitle
    │   └── PopoverDescription
    └── PopoverFooter
        └── PopoverClose`;

  const basicExampleSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the dimensions for the layer.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`;

  const sideSnippet = `<PopoverContent side="top|right|bottom|left" />`;
  const alignmentSnippet = `<PopoverContent align="start|center|end" />`;

  const withHeaderSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent align="start">
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the dimensions for the layer.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`;

  const withFooterSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Edit dimensions
  </PopoverTrigger>
  <PopoverContent align="start">
    <p>Apply or discard the current changes.</p>
    <PopoverFooter>
      <PopoverClose render={<Button variant="outline" size="sm" />}>
        Cancel
      </PopoverClose>
      <PopoverClose render={<Button size="sm" />}>
        Apply
      </PopoverClose>
    </PopoverFooter>
  </PopoverContent>
</Popover>`;

  const withHeaderAndFooterSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Edit dimensions
  </PopoverTrigger>
  <PopoverContent align="start">
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the dimensions for the layer.
      </PopoverDescription>
    </PopoverHeader>
    <PopoverFooter>
      <PopoverClose render={<Button variant="outline" size="sm" />}>
        Cancel
      </PopoverClose>
      <PopoverClose render={<Button size="sm" />}>
        Apply
      </PopoverClose>
    </PopoverFooter>
  </PopoverContent>
</Popover>`;

  const withFormSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Edit dimensions
  </PopoverTrigger>
  <PopoverContent align="start">
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the width and height for the layer.
      </PopoverDescription>
    </PopoverHeader>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="popover-width">Width</FieldLabel>
        <Input id="popover-width" name="width" defaultValue="100%" />
      </Field>
      <Field>
        <FieldLabel htmlFor="popover-height">Height</FieldLabel>
        <Input id="popover-height" name="height" defaultValue="25px" />
      </Field>
    </FieldGroup>
    <PopoverFooter>
      <PopoverClose render={<Button variant="outline" size="sm" />}>
        Cancel
      </PopoverClose>
      <PopoverClose render={<Button size="sm" />}>
        Apply
      </PopoverClose>
    </PopoverFooter>
  </PopoverContent>
</Popover>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Popover"
          description="Popover displays supporting content or controls in an overlay anchored to a trigger."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Popover for supporting content or controls that belong to a
              trigger, such as Filters or Colour field panels.
              <br />
              <br />
              Avoid using it for blocking decisions — that is a{" "}
              <DocsPageLink to="/components/dialog">Dialog</DocsPageLink>. For
              short labels, use a{" "}
              <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink>. For
              action lists, use a{" "}
              <DocsPageLink to="/components/dropdown-menu">
                Dropdown menu
              </DocsPageLink>
              .
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Popover and the parts required by the panel."
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
          description="Compose the trigger and panel content inside Popover."
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
          description="A titled panel with supporting text. Use this as the default composition."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Open popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the dimensions for the layer.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description="Compose the panel with a header, a footer, or both."
        />
        <PageSubsectionHeader
          id="variants-with-header"
          title="With header"
          description="Use PopoverHeader to give the panel a title and supporting description."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Open popover
              </PopoverTrigger>
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the dimensions for the layer.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Code
              variant="block"
              language="tsx"
              code={withHeaderSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-with-footer"
          title="With footer"
          description="Use PopoverFooter for actions that apply or discard work in the panel."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Edit dimensions
              </PopoverTrigger>
              <PopoverContent align="start">
                <p className="text-sm text-muted-foreground">
                  Apply or discard the current changes.
                </p>
                <PopoverFooter>
                  <PopoverClose render={<Button variant="outline" size="sm" />}>
                    Cancel
                  </PopoverClose>
                  <PopoverClose render={<Button size="sm" />}>
                    Apply
                  </PopoverClose>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <Code
              variant="block"
              language="tsx"
              code={withFooterSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-with-header-and-footer"
          title="With header and footer"
          description="Combine the header and footer when the panel needs both context and actions."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Edit dimensions
              </PopoverTrigger>
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the dimensions for the layer.
                  </PopoverDescription>
                </PopoverHeader>
                <PopoverFooter>
                  <PopoverClose render={<Button variant="outline" size="sm" />}>
                    Cancel
                  </PopoverClose>
                  <PopoverClose render={<Button size="sm" />}>
                    Apply
                  </PopoverClose>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <Code
              variant="block"
              language="tsx"
              code={withHeaderAndFooterSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-form" label="With form">
        <PageSectionHeader
          title="With form"
          description="Use Field inside the panel when a short, contextual form belongs to the trigger."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Edit dimensions
              </PopoverTrigger>
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the width and height for the layer.
                  </PopoverDescription>
                </PopoverHeader>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="popover-width">Width</FieldLabel>
                    <Input
                      id="popover-width"
                      name="width"
                      defaultValue="100%"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="popover-height">Height</FieldLabel>
                    <Input
                      id="popover-height"
                      name="height"
                      defaultValue="25px"
                    />
                  </Field>
                </FieldGroup>
                <PopoverFooter>
                  <PopoverClose render={<Button variant="outline" size="sm" />}>
                    Cancel
                  </PopoverClose>
                  <PopoverClose render={<Button size="sm" />}>
                    Apply
                  </PopoverClose>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <Code
              variant="block"
              language="tsx"
              code={withFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="positioning" label="Positioning">
        <PageSectionHeader
          title="Positioning"
          description="Choose a preferred side and alignment. Base UI adjusts the final position when the preferred placement would leave the viewport."
        />

        <PageSubsectionHeader
          id="positioning-side"
          title="Side"
          description="Places the panel on the preferred side of its trigger."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Popover key={side}>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    {side[0].toUpperCase() + side.slice(1)}
                  </PopoverTrigger>
                  <PopoverContent side={side}>
                    <PopoverHeader>
                      <PopoverTitle>
                        {side[0].toUpperCase() + side.slice(1)}
                      </PopoverTitle>
                      <PopoverDescription>
                        The preferred side is {side}.
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sideSnippet}
              showCopyButton
              copyLabel="Copy side options"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="positioning-align"
          title="Align"
          description="Aligns the panel across the selected side of its trigger."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {(["start", "center", "end"] as const).map((align) => (
                <Popover key={align}>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    {align[0].toUpperCase() + align.slice(1)}
                  </PopoverTrigger>
                  <PopoverContent align={align}>
                    <PopoverHeader>
                      <PopoverTitle>
                        {align[0].toUpperCase() + align.slice(1)}
                      </PopoverTitle>
                      <PopoverDescription>
                        The panel is aligned to {align}.
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={alignmentSnippet}
              showCopyButton
              copyLabel="Copy alignment options"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep the panel anchored, focused, and limited to its supporting task."
        />
        <DocsDoDont
          doItems={[
            <>Use a real Button or another keyboard-operable trigger.</>,
            <>
              Add <Code>PopoverTitle</Code> and <Code>PopoverDescription</Code>{" "}
              when the panel needs context.
            </>,
            <>
              Use <Code>PopoverClose</Code> for controls that dismiss the panel.
            </>,
            <>
              Include <Code>PopoverClose</Code> whenever modal behaviour traps
              focus.
            </>,
          ]}
          dontItems={[
            <>Don’t use Popover for a blocking decision.</>,
            <>Don’t use an unnamed icon-only trigger.</>,
            <>Don’t place unrelated content in the panel.</>,
            <>
              Don’t force a position that causes the panel to leave the
              viewport.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Popover."
        />
        <DocsApiTable
          rows={[
            {
              name: "Popover.open",
              type: "boolean",
              defaultValue: "—",
              description: "Controls whether the panel is open.",
            },
            {
              name: "Popover.defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Sets the initial uncontrolled open state.",
            },
            {
              name: "Popover.onOpenChange",
              type: "(open: boolean, eventDetails) => void",
              defaultValue: "—",
              description: "Runs when the panel opens or closes.",
            },
            {
              name: "Popover.modal",
              type: 'boolean | "trap-focus"',
              defaultValue: "false",
              description:
                "Limits interaction outside the panel. Requires PopoverClose when focus is trapped.",
            },
            {
              name: "PopoverTrigger.disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Makes the trigger unavailable.",
            },
            {
              name: "PopoverTrigger.openOnHover",
              type: "boolean",
              defaultValue: "false",
              description: "Also opens the panel while the trigger is hovered.",
            },
            {
              name: "PopoverContent.align",
              type: '"start" | "center" | "end"',
              defaultValue: '"center"',
              description: "Aligns the panel across the trigger.",
            },
            {
              name: "PopoverContent.side",
              type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"',
              defaultValue: '"bottom"',
              description: "Sets the preferred side of the trigger.",
            },
            {
              name: "PopoverContent.sideOffset",
              type: "number",
              defaultValue: "4",
              description: "Sets the space between the trigger and panel.",
            },
            {
              name: "PopoverContent.alignOffset",
              type: "number",
              defaultValue: "0",
              description: "Shifts the panel along its alignment axis.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/popover">
                Shadcn Popover documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/popover">
                Base UI Popover API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Choose the overlay that matches the content and interaction."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink> — for
            a short hint.
          </li>
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> — for
            blocking content.
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — for a list of actions.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
