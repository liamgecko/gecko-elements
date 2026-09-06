import { useState } from "react";
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
import { Code } from "@gecko/ui/components/code";
import { Toggle } from "@gecko/ui/components/toggle";
import Bookmark from "@hugeicons/core-free-icons/Bookmark02Icon";
import Bold from "@hugeicons/core-free-icons/BoldIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

export function TogglePage() {
  const [bookmarked, setBookmarked] = useState(false);

  const importSnippet = `import { Toggle } from "@gecko/ui/components/toggle"`;
  const basicSnippet = `<Toggle aria-label="Bookmark">
  <Bookmark aria-hidden="true" />
</Toggle>`;
  const sizesSnippet = `<Toggle size="xs|sm|default|lg">Bold</Toggle>

<Toggle size="icon-xs|icon-sm|icon|icon-lg" aria-label="Bold">
  <Bold aria-hidden="true" />
</Toggle>`;
  const textSnippet = `<Toggle>
  <Bold data-icon="inline-start" aria-hidden="true" />
  Bold
</Toggle>`;
  const controlledSnippet = `const [bookmarked, setBookmarked] = useState(false)

<Toggle
  pressed={bookmarked}
  onPressedChange={setBookmarked}
  aria-label="Bookmark"
>
  <Bookmark aria-hidden="true" />
</Toggle>`;
  const disabledSnippet = `<Toggle disabled aria-label="Bookmark">
  <Bookmark aria-hidden="true" />
</Toggle>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Toggle"
        description="Toggle is a two-state button for turning a local tool or display mode on and off. Its pressed appearance remains visible until the state changes again."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Toggle for persistent toolbar state such as bold formatting,
            bookmarking, or showing a layer. Use{" "}
            <DocsPageLink to="/components/button">Button</DocsPageLink> for an
            action that completes immediately, and use{" "}
            <DocsPageLink to="/components/switch">Switch</DocsPageLink> for an
            application setting.
            <br />
            <br />
            An icon-only Toggle needs an accessible name. Keep its visible state
            change as well as the pressed semantics supplied by Base UI.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Toggle for one independent pressed state."
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
      </MainSection>

      <MainSection
        id="basic-example"
        title="Basic example"
        description="An uncontrolled icon toggle for bookmarking an item."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Toggle aria-label="Bookmark">
              <HugeiconsIcon icon={Bookmark} aria-hidden="true" />
            </Toggle>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="sizes"
        title="Sizes"
        description="Match the Toggle to the neighbouring controls and toolbar density."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-3">
              {(["xs", "sm", "default", "lg"] as const).map((size) => (
                <Toggle key={size} size={size}>
                  Bold
                </Toggle>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-3">
              {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map(
                (size) => (
                  <Toggle key={size} size={size} aria-label={`${size} bold`}>
                    <HugeiconsIcon icon={Bold} aria-hidden="true" />
                  </Toggle>
                ),
              )}
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
      </MainSection>

      <MainSection
        id="with-text"
        title="With text"
        description="Use a concise visible label when an icon alone would be ambiguous."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Toggle>
              <HugeiconsIcon
                icon={Bold}
                data-icon="inline-start"
                aria-hidden="true"
              />
              Bold
            </Toggle>
            <Code
              variant="block"
              language="tsx"
              code={textSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="controlled"
        title="Controlled"
        description="Coordinate pressed state with application data only when another part of the interface needs it."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Toggle
                pressed={bookmarked}
                onPressedChange={setBookmarked}
                aria-label="Bookmark"
              >
                <HugeiconsIcon icon={Bookmark} aria-hidden="true" />
              </Toggle>
              <span className="text-sm text-muted-foreground">
                {bookmarked ? "Bookmarked" : "Not bookmarked"}
              </span>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={controlledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="disabled"
        title="Disabled"
        description="Use a disabled state only when the tool is unavailable in the current context."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Toggle disabled aria-label="Bookmark">
              <HugeiconsIcon icon={Bookmark} aria-hidden="true" />
            </Toggle>
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use Toggle for a stateful tool, not as a substitute for every button or field."
      >
        <DocsDoDont
          doItems={[
            <>Use Toggle for a state that remains on until pressed again.</>,
            <>Give an icon-only Toggle an accessible name.</>,
            <>Use visible text when the icon is not universally understood.</>,
            <>
              Use controlled state when another interface region depends on it.
            </>,
          ]}
          dontItems={[
            <>Don’t use Toggle for a one-time action.</>,
            <>
              Don’t use it for a submitted form value; use Checkbox or Switch.
            </>,
            <>Don’t communicate the pressed state by colour alone.</>,
            <>Don’t restyle the pressed treatment in product code.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour and presentation props on Toggle."
      >
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"default" | "outline" | "ghost-light" | "ghost-dark"',
              defaultValue: '"outline"',
              description: "Sets the treatment for its surface.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "default" | "lg" | icon sizes',
              defaultValue: '"default"',
              description: "Sets the control and icon dimensions.",
            },
            {
              name: "defaultPressed",
              type: "boolean",
              defaultValue: "false",
              description: "Sets the initial uncontrolled state.",
            },
            {
              name: "pressed",
              type: "boolean",
              description: "Controls the pressed state.",
            },
            {
              name: "onPressedChange",
              type: "(pressed, eventDetails) => void",
              description: "Runs when the pressed state changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents interaction.",
            },
          ]}
        />
        <ChildSection
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/toggle">
                Shadcn Toggle documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/toggle">
                Base UI Toggle API
              </DocsExternalLink>{" "}
              for the source composition and inherited behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose the control that matches the meaning and scope of the state."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/toggle-group">
              Toggle group
            </DocsPageLink>{" "}
            — related single or multiple toolbar states.
          </li>
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — an
            action that does not remain selected.
          </li>
          <li>
            <DocsPageLink to="/components/switch">Switch</DocsPageLink> — an
            application setting that takes effect immediately.
          </li>
          <li>
            <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink> — a
            submitted binary choice.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
