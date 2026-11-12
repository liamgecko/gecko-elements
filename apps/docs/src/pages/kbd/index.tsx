import { useEffect, useRef } from "react";
import { ComponentExample } from "@/components/layout/component-example";
import { Code } from "@/components/layout/docs-code";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Button } from "@geckolabs/elements/components/button";
import { Field, FieldLabel } from "@geckolabs/elements/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@geckolabs/elements/components/input-group";
import { Kbd, KbdGroup } from "@geckolabs/elements/components/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip";

const importSnippet = `import { Kbd, KbdGroup } from "@geckolabs/elements/components/kbd"`;
const basicSnippet = `<Kbd>Tab</Kbd>`;
const groupSnippet = `<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>C</Kbd>
</KbdGroup>`;
const buttonSnippet = `<Button variant="outline" onClick={() => inputRef.current?.focus()}>
  Focus input
  <KbdGroup aria-hidden="true">
    <Kbd>Ctrl / ⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</Button>

<Tooltip>
  <TooltipTrigger render={
    <Button variant="outline" onClick={() => inputRef.current?.focus()}>
      Focus input with hint
    </Button>
  } />
  <TooltipContent>
    <span className="flex items-center gap-2">
      Focus input
      <KbdGroup aria-label="Control or Command plus K">
        <Kbd>Ctrl / ⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </span>
  </TooltipContent>
</Tooltip>`;
const inputSnippet = `<Field>
  <FieldLabel htmlFor="shortcut-search">Search examples</FieldLabel>
  <InputGroup>
    <InputGroupInput id="shortcut-search" ref={inputRef} />
    <InputGroupAddon align="inline-end">
      <KbdGroup aria-label="Control or Command plus K">
        <Kbd>Ctrl / ⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </InputGroupAddon>
  </InputGroup>
</Field>

// The owning application must register the shortcut.
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) &&
        !event.altKey && !event.shiftKey &&
        event.key.toLowerCase() === "k") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);`;

export function KbdPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Kbd"
        description="Display keyboard keys and shortcuts using passive keycaps. The application owns the shortcut and its action."
      />

      <MainSection
        id="usage"
        title="Usage"
        description="Use Kbd for one key and KbdGroup for the keys of one shortcut. Keep shortcut registration and platform-specific key choices in the owning application."
      >
        <ChildSection id="usage-import" title="Import">
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
        description="Use a single keycap for a key name. Tab moves between the controls on this page."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Kbd>Tab</Kbd>
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
        id="group"
        title="Group"
        description="Group separate keys for one shortcut. Select text and use Ctrl+C on Windows or Linux, or Command+C on macOS, to copy it."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <KbdGroup aria-label="Control plus C">
                <Kbd>Ctrl</Kbd>
                <Kbd>C</Kbd>
              </KbdGroup>
              <KbdGroup aria-label="Command plus C">
                <Kbd>⌘</Kbd>
                <Kbd>C</Kbd>
              </KbdGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={groupSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="input-group"
        title="Input group"
        description="Press Ctrl+K or Command+K to focus this input. The page registers the shortcut; Kbd only displays the hint."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="shortcut-search">Search examples</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="shortcut-search"
                  ref={inputRef}
                  placeholder="Type here..."
                />
                <InputGroupAddon align="inline-end">
                  <KbdGroup aria-label="Control or Command plus K">
                    <Kbd>Ctrl / ⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={inputSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="button-tooltip"
        title="Button and tooltip"
        description="The button and the shortcut focus the same input. Hover or focus the second button to see keycaps in a tooltip."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                onClick={() => inputRef.current?.focus()}
              >
                Focus input
                <KbdGroup aria-hidden="true">
                  <Kbd>Ctrl / ⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </Button>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      onClick={() => inputRef.current?.focus()}
                    >
                      Focus input with hint
                    </Button>
                  }
                />
                <TooltipContent>
                  <span className="flex items-center gap-2">
                    Focus input
                    <KbdGroup aria-label="Control or Command plus K">
                      <Kbd>Ctrl / ⌘</Kbd>
                      <Kbd>K</Kbd>
                    </KbdGroup>
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={buttonSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keycaps explain a working shortcut; the owning control supplies the action."
      >
        <DocsDoDont
          doItems={[
            <>Show shortcuts that work in the current interface.</>,
            <>Use separate keycaps for the keys of one shortcut.</>,
            <>
              Choose keys for the supported platform and explain ambiguous
              symbols.
            </>,
            <>Keep the action available through its normal visible control.</>,
          ]}
          dontItems={[
            <>Don’t make a keycap clickable or add it to the tab order.</>,
            <>
              Don’t assume displaying a shortcut registers its keyboard handler.
            </>,
            <>
              Don’t override keycap sizes, colours or contextual tooltip
              styling.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Both parts forward native attributes and refs. There are no size or variant props, and keycaps do not register keyboard handlers."
      >
        <ChildSection
          id="api-kbd"
          title="Kbd"
          description="Renders a semantic kbd element and accepts native kbd attributes and a forwarded ref."
        >
          <DocsApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                description: "The key name or symbol to display.",
              },
              {
                name: "className",
                type: "string",
                description:
                  "Outer layout placement only; Elements owns keycap appearance.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-kbd-group"
          title="KbdGroup"
          description="Groups keycaps for one shortcut. The current TypeScript interface accepts native div properties while the component renders a kbd element; it does not render an interactive control."
        >
          <DocsApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                description:
                  "Separate Kbd children representing the shortcut's keys.",
              },
              {
                name: "className",
                type: "string",
                description:
                  "Outer layout placement only; Elements owns spacing between keycaps.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection id="api-reference" title="API reference">
          <p>
            See the{" "}
            <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/kbd">
              Shadcn Kbd documentation
            </DocsExternalLink>{" "}
            for the source composition.
          </p>
        </ChildSection>
      </MainSection>

      <MainSection id="related" title="Related">
        <p>
          Use{" "}
          <DocsPageLink to="/components/input-group">Input Group</DocsPageLink>{" "}
          for a shortcut inside a field, and{" "}
          <DocsPageLink to="/components/command">Command</DocsPageLink> for a
          command palette. Keep keycaps passive and provide a visible control
          for every action.
        </p>
      </MainSection>
    </div>
  );
}
