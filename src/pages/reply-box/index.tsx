import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

import { Code } from "@/components/ui/code"
import {
  ReplyBox,
  type ReplyBoxActionId,
} from "@/components/ui/reply-box/reply-box"
import { ReplyBoxContent } from "@/components/ui/reply-box/reply-box-content"
import { ReplyBoxFooter } from "@/components/ui/reply-box/reply-box-footer"
import { ReplyBoxHeader } from "@/components/ui/reply-box/reply-box-header"

export function ReplyBoxPage() {
  const basicItems: ReplyBoxActionId[] = ["attachment", "emoji", "image"]

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Reply box
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            A presentational message composer with optional header, action tray, note
            mode, and variants for chat, textarea-only, and single-line input.
          </p>
        </PageSection>

        <PageSection id="default" label="Default">
          <h2 className="text-lg font-semibold">Default</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            A composed reply box with <Code>ReplyBoxHeader</Code> and{" "}
            <Code>ReplyBoxFooter</Code>. The header shows the channel switcher and
            expand button. The footer shows the send button and icon tray.
          </p>

          <ComponentExample>
              <ReplyBox channel={{ type: "email", label: "Select a channel" }}>
                <ReplyBoxHeader showChannelSwitcher showExpand />
                <ReplyBoxContent />
                <ReplyBoxFooter showTray />
              </ReplyBox>
          </ComponentExample>
        </PageSection>

        <PageSection id="footer-only" label="Footer only">
          <h2 className="text-lg font-semibold">Footer only</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Omit the header entirely and render only a textarea + footer.
          </p>

          <ComponentExample>
            <ReplyBox channel={{ type: "live-chat", label: "Live chat" }}>
              <ReplyBoxContent />
              <ReplyBoxFooter showTray />
            </ReplyBox>
          </ComponentExample>
        </PageSection>

        <PageSection id="note-mode" label="Note mode">
          <h2 className="text-lg font-semibold">Note mode</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Note mode turns the body yellow. This is presentational only for now.
          </p>

          <ComponentExample>
            <ReplyBox defaultNoteMode channel={{ type: "email", label: "Email" }}>
              <ReplyBoxHeader showChannelSwitcher />
              <ReplyBoxContent />
              <ReplyBoxFooter showTray />
            </ReplyBox>
          </ComponentExample>
        </PageSection>

        <PageSection id="textarea" label="Textarea">
          <h2 className="text-lg font-semibold">Textarea</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Textarea variant: no header, no send button, but the icon tray is still
            available.
          </p>

          <ComponentExample>
            <ReplyBox variant="textarea" channel={{ type: "live-chat", label: "Live chat" }}>
              <ReplyBoxContent />
              <ReplyBoxFooter showTray showSend={false} />
            </ReplyBox>
          </ComponentExample>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            A single-line input with an inline send button.
          </p>

          <ComponentExample>
            <ReplyBox variant="basic">
              <ReplyBoxContent />
            </ReplyBox>
          </ComponentExample>
        </PageSection>

        <PageSection id="basic-actions" label="Basic with actions">
          <h2 className="text-lg font-semibold">Basic with actions</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Add action buttons to the left of the send button.
          </p>

          <ComponentExample>
            <ReplyBox variant="basic">
              <ReplyBoxContent items={basicItems} />
            </ReplyBox>
          </ComponentExample>
        </PageSection>

      </div>
      <PageSectionNav />
    </div>
  )
}

