import { Smile, SmilePlus } from "lucide-react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Button } from "@gecko/ui/components/button"
import { Code } from "@gecko/ui/components/code"
import {
  DEFAULT_TRAY_EMOJIS,
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
} from "@gecko/ui/components/emoji-picker"

const sides = ["top", "right", "bottom", "left"] as const
const aligns = ["start", "center", "end"] as const

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
] as const

export function EmojiPickerPage() {
  const importSnippet = `import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
} from "@gecko/ui/components/emoji-picker"`

  const compositionSnippet = `EmojiPicker
├── EmojiPickerTrigger
└── EmojiPickerContent
    ├── EmojiPickerPanel
    └── EmojiPickerTray
        └── EmojiPickerPanel`

  const basicExampleSnippet = `<EmojiPicker onEmojiSelect={(emoji) => {}}>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon" aria-label="Open emoji picker" />
    }
  >
    <Smile />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>`

  const customTriggerSnippet = `<EmojiPicker onEmojiSelect={(emoji) => {}}>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost">
        <SmilePlus />
        Add emoji
      </Button>
    }
  />
  <EmojiPickerContent />
</EmojiPicker>`

  const traySnippet = `<EmojiPicker defaultView="tray" onEmojiSelect={(emoji) => {}}>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon-sm" aria-label="Add reaction" />
    }
  >
    <SmilePlus />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>`

  const trayOnlySnippet = `<EmojiPicker
  defaultView="tray"
  showPickerFromTray={false}
  trayEmojis={["👍", "❤️", "🔥", "🎉"]}
  onEmojiSelect={(emoji) => {}}
>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon-sm" aria-label="Add reaction" />
    }
  >
    <SmilePlus />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Emoji picker"
          description={
            <>
              A popover emoji picker built on <Code>frimousse</Code>. By default
              the trigger opens the full emoji panel. For message reactions, use
              the tray view for quick emojis with an optional nested full picker.
            </>
          }
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use EmojiPicker when users need to insert or react with an emoji
              from a trigger. Prefer the default picker for composers and input
              actions; use the tray for quick reactions on messages.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description={
            <>
              Import the root and its subcomponents. The component follows a
              compound pattern similar to Popover.
            </>
          }
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
          description={
            <>
              Compose with <Code>EmojiPickerTrigger</Code> and{" "}
              <Code>EmojiPickerContent</Code>. With no children, content renders{" "}
              <Code>EmojiPickerPanel</Code> or <Code>EmojiPickerTray</Code> based
              on <Code>defaultView</Code>. You can also compose{" "}
              <Code>EmojiPickerTray</Code> and <Code>EmojiPickerPanel</Code>{" "}
              explicitly.
            </>
          }
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
          description={
            <>
              By default the trigger opens the full emoji panel. Pass{" "}
              <Code>onEmojiSelect</Code> to receive the chosen emoji.
            </>
          }
        />
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
                <Smile />
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
      </PageSection>

      <PageSection id="custom-trigger" label="Custom trigger">
        <PageSectionHeader
          title="Custom trigger"
          description={
            <>
              Use the <Code>render</Code> prop on{" "}
              <Code>EmojiPickerTrigger</Code> to compose any trigger element.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <EmojiPicker>
              <EmojiPickerTrigger
                render={
                  <Button variant="ghost">
                    <SmilePlus />
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
      </PageSection>

      <PageSection id="tray" label="Reaction tray">
        <PageSectionHeader
          title="Reaction tray"
          description={
            <>
              Set <Code>defaultView=&quot;tray&quot;</Code> to open a
              quick-reaction tray first. The default set is{" "}
              <Code>{DEFAULT_TRAY_EMOJIS.join(" ")}</Code>. The tray opens at top
              start by default. The SmilePlus control opens the full picker in a
              nested popover.
            </>
          }
        />
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
                <SmilePlus />
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
      </PageSection>

      <PageSection id="tray-only" label="Tray only">
        <PageSectionHeader
          title="Tray only"
          description={
            <>
              Pass <Code>showPickerFromTray={"{false}"}</Code> to hide the full
              picker control. Override the set with <Code>trayEmojis</Code>.
            </>
          }
        />
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
                <SmilePlus />
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
      </PageSection>

      <PageSection id="positioning" label="Positioning">
        <PageSectionHeader
          title="Positioning"
          description={
            <>
              Position the tray or panel with <Code>side</Code> and{" "}
              <Code>align</Code> on <Code>EmojiPickerContent</Code>, the same way
              as Tooltip and Popover. Combine them for corners (for example{" "}
              <Code>side=&quot;top&quot; align=&quot;start&quot;</Code>). Tray
              defaults to top start; the full panel defaults to bottom center.
            </>
          }
        />

        <PageSubsectionHeader
          id="positioning-side"
          title="Side"
          description={
            <>
              <Code>side</Code> places the content relative to the trigger:{" "}
              <Code>top</Code>, <Code>right</Code>, <Code>bottom</Code>, or{" "}
              <Code>left</Code>.
            </>
          }
        />
        <ComponentExample className="mb-10">
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
        </ComponentExample>

        <PageSubsectionHeader
          id="positioning-align"
          title="Align"
          description={
            <>
              <Code>align</Code> shifts the content along the side:{" "}
              <Code>start</Code>, <Code>center</Code>, or <Code>end</Code>.
            </>
          }
        />
        <ComponentExample className="mb-10">
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
        </ComponentExample>

        <PageSubsectionHeader
          id="positioning-corners"
          title="Corners"
          description={
            <>
              Pair <Code>side</Code> and <Code>align</Code> for corner placements
              such as top start or bottom end.
            </>
          }
        />
        <ComponentExample>
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
        </ComponentExample>
      </PageSection>
    </div>
  )
}
