import Smile from "@hugeicons/core-free-icons/SmileIcon";
import SmilePlus from "@hugeicons/core-free-icons/SmilePlusIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

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
  DEFAULT_TRAY_EMOJIS,
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
} from "@gecko/ui/components/emoji-picker";

const sides = ["top", "right", "bottom", "left"] as const;
const aligns = ["start", "center", "end"] as const;

const placements = [
  { label: "Top start", side: "top", align: "start" },
  { label: "Top", side: "top", align: "center" },
  { label: "Top end", side: "top", align: "end" },
  { label: "Bottom start", side: "bottom", align: "start" },
  { label: "Bottom", side: "bottom", align: "center" },
  { label: "Bottom end", side: "bottom", align: "end" },
  { label: "Left start", side: "left", align: "start" },
  { label: "Left", side: "left", align: "center" },
  { label: "Left end", side: "left", align: "end" },
  { label: "Right start", side: "right", align: "start" },
  { label: "Right", side: "right", align: "center" },
  { label: "Right end", side: "right", align: "end" },
] as const;

export function EmojiPickerPage() {
  const importSnippet = `import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
} from "@gecko/ui/components/emoji-picker"`;

  const compositionSnippet = `EmojiPicker
├── EmojiPickerTrigger
└── EmojiPickerContent
    ├── EmojiPickerPanel
    └── EmojiPickerTray
        └── EmojiPickerPanel`;

  const basicExampleSnippet = `<EmojiPicker onEmojiSelect={insertEmoji}>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon" aria-label="Open emoji picker" />
    }
  >
    <Smile />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>`;

  const customTriggerSnippet = `<EmojiPicker>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost">
        <SmilePlus />
        Add emoji
      </Button>
    }
  />
  <EmojiPickerContent />
</EmojiPicker>`;

  const traySnippet = `<EmojiPicker defaultView="tray">
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon-sm" aria-label="Add reaction" />
    }
  >
    <SmilePlus />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>`;

  const trayOnlySnippet = `<EmojiPicker
  defaultView="tray"
  showPickerFromTray={false}
  trayEmojis={["👍", "❤️", "🔥", "🎉"]}
>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon-sm" aria-label="Add reaction" />
    }
  >
    <SmilePlus />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>`;

  const positioningSideSnippet = `<EmojiPickerContent side="top|right|bottom|left" />`;

  const positioningAlignSnippet = `<EmojiPickerContent side="top" align="start|center|end" />`;

  const positioningCornersSnippet = `<EmojiPickerContent
  side="top|right|bottom|left"
  align="start|center|end"
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Emoji picker"
        description="The Emoji picker is a popover for choosing an emoji from a trigger. It can open the full panel, or a short tray first."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use an Emoji picker when someone needs to choose an emoji from a
            control on the page. The trigger stays visible; the panel or tray
            should not.
            <br />
            <br />
            In Gecko, use the tray for message reactions and the picker panel to
            insert an emoji into the reply text.
            <br />
            <br />
            Avoid using it as a general overlay. If the content is not an emoji
            list, use a{" "}
            <DocsPageLink to="/components/popover">Popover</DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Emoji picker and its parts to compose a trigger and a panel."
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
          description={
            <>
              The trigger opens the overlay. With no children,{" "}
              <Code>EmojiPickerContent</Code> renders{" "}
              <Code>EmojiPickerPanel</Code> or <Code>EmojiPickerTray</Code> from{" "}
              <Code>defaultView</Code>. You can also compose the tray and panel
              yourself.
            </>
          }
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
        description={
          <>
            Opens the full panel from the trigger. Pass{" "}
            <Code>onEmojiSelect</Code> to receive the chosen emoji. Use this
            when people should search or browse the full set.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <EmojiPicker>
              <EmojiPickerTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open emoji picker"
                  />
                }
              >
                <HugeiconsIcon icon={Smile} />
              </EmojiPickerTrigger>
              <EmojiPickerContent />
            </EmojiPicker>
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
        id="custom-trigger"
        title="Custom trigger"
        description={
          <>
            Compose any trigger using the <Code>render</Code> prop on{" "}
            <Code>EmojiPickerTrigger</Code>. Use this when an icon-only button
            is not enough.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <EmojiPicker>
              <EmojiPickerTrigger
                render={
                  <Button variant="ghost">
                    <HugeiconsIcon icon={SmilePlus} />
                    Add emoji
                  </Button>
                }
              />
              <EmojiPickerContent />
            </EmojiPicker>
            <Code
              variant="block"
              language="tsx"
              code={customTriggerSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="tray"
        title="Reaction tray"
        description={
          <>
            Opens a short set first using{" "}
            <Code>defaultView=&quot;tray&quot;</Code>. The default set is{" "}
            <Code>{DEFAULT_TRAY_EMOJIS.join(" ")}</Code>. A control on the tray
            opens the full panel. Use this when a few emojis should be quicker
            to reach than the full list.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <EmojiPicker defaultView="tray">
              <EmojiPickerTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Add reaction"
                  />
                }
              >
                <HugeiconsIcon icon={SmilePlus} />
              </EmojiPickerTrigger>
              <EmojiPickerContent />
            </EmojiPicker>
            <Code
              variant="block"
              language="tsx"
              code={traySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="tray-only"
        title="Tray only"
        description={
          <>
            Hides the full panel from the tray using{" "}
            <Code>showPickerFromTray=&#123;false&#125;</Code>. This example also
            sets <Code>trayEmojis</Code>. Use this when the short set is the
            whole choice.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <EmojiPicker
              defaultView="tray"
              showPickerFromTray={false}
              trayEmojis={["👍", "❤️", "🔥", "🎉"]}
            >
              <EmojiPickerTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Add reaction"
                  />
                }
              >
                <HugeiconsIcon icon={SmilePlus} />
              </EmojiPickerTrigger>
              <EmojiPickerContent />
            </EmojiPicker>
            <Code
              variant="block"
              language="tsx"
              code={trayOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="positioning"
        title="Positioning"
        description={
          <>
            Places the overlay using <Code>side</Code> and <Code>align</Code> on{" "}
            <Code>EmojiPickerContent</Code>, the same way as{" "}
            <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink> and{" "}
            <DocsPageLink to="/components/popover">Popover</DocsPageLink>. Tray
            defaults to top start; the full panel defaults to bottom center.
          </>
        }
      >
        <ChildSection
          id="positioning-side"
          title="Side"
          description={
            <>
              Places the content relative to the trigger using <Code>side</Code>
              . Use this when the overlay should open in a specific direction.
              The example contains every available side.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {sides.map((side) => (
                  <EmojiPicker
                    key={side}
                    defaultView="tray"
                    showPickerFromTray={false}
                  >
                    <EmojiPickerTrigger
                      render={
                        <Button variant="ghost" className="capitalize">
                          {side}
                        </Button>
                      }
                    />
                    <EmojiPickerContent side={side} />
                  </EmojiPicker>
                ))}
              </div>
              <Code
                variant="block"
                language="tsx"
                code={positioningSideSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="positioning-align"
          title="Align"
          description={
            <>
              Shifts the content along the side using <Code>align</Code>. Use
              this when the overlay should line up with an edge of the trigger.
              The example contains every available alignment.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {aligns.map((align) => (
                  <EmojiPicker
                    key={align}
                    defaultView="tray"
                    showPickerFromTray={false}
                  >
                    <EmojiPickerTrigger
                      render={
                        <Button variant="ghost" className="capitalize">
                          {align}
                        </Button>
                      }
                    />
                    <EmojiPickerContent side="top" align={align} />
                  </EmojiPicker>
                ))}
              </div>
              <Code
                variant="block"
                language="tsx"
                code={positioningAlignSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="positioning-corners"
          title="Corners"
          description={
            <>
              Pair <Code>side</Code> and <Code>align</Code> for a corner. Use
              this when the overlay should sit at a specific corner of the
              trigger.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {placements.map(({ label, side, align }) => (
                  <EmojiPicker
                    key={label}
                    defaultView="tray"
                    showPickerFromTray={false}
                  >
                    <EmojiPickerTrigger
                      render={
                        <Button variant="ghost" className="w-full">
                          {label}
                        </Button>
                      }
                    />
                    <EmojiPickerContent side={side} align={align} />
                  </EmojiPicker>
                ))}
              </div>
              <Code
                variant="block"
                language="tsx"
                code={positioningCornersSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Choose the picker or tray for the task, and keep the trigger clear."
      >
        <DocsDoDont
          doItems={[
            <>
              Use <Code>defaultView=&quot;picker&quot;</Code> when people need
              to insert an emoji into the reply text.
            </>,
            <>
              Use <Code>defaultView=&quot;tray&quot;</Code> for quick reactions.
            </>,
            <>
              Set <Code>showPickerFromTray=&#123;false&#125;</Code> when the
              tray is the complete choice.
            </>,
            <>Give an icon-only trigger an accessible name.</>,
          ]}
          dontItems={[
            <>Don’t use the Emoji picker for content other than emoji.</>,
            <>
              Don’t add a large tray when the full picker is easier to browse.
            </>,
            <>
              Don’t hide the full picker from the tray unless{" "}
              <Code>trayEmojis</Code> covers the intended choices.
            </>,
            <>
              Don’t force a position that causes the overlay to leave the
              viewport.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Emoji picker."
      >
        <DocsApiTable
          rows={[
            {
              name: "defaultView",
              type: '"picker" | "tray"',
              defaultValue: '"picker"',
              description:
                "Chooses whether the trigger opens the full picker or reaction tray.",
            },
            {
              name: "trayEmojis",
              type: "readonly string[]",
              defaultValue: "DEFAULT_TRAY_EMOJIS",
              description: "Emoji choices shown in the quick-reaction tray.",
            },
            {
              name: "showPickerFromTray",
              type: "boolean",
              defaultValue: "true",
              description:
                "Shows a control in the tray that opens the full picker.",
            },
            {
              name: "onEmojiSelect",
              type: "(emoji: string) => void",
              description:
                "Runs with the selected emoji, then the overlay closes.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controls whether the emoji overlay is open.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Sets the initial uncontrolled open state.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Runs when the overlay opens or closes.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://frimousse.liveblocks.io">
                Frimousse API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/popover">
                Base UI Popover API
              </DocsExternalLink>{" "}
              for the underlying picker and overlay behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a related component when people are not choosing an emoji."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/popover">Popover</DocsPageLink> — for
            custom overlay content that is not an emoji list.
          </li>
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — when
            emoji reactions belong to a conversation.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
