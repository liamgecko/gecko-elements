import { useState } from "react"

import { ComponentExample } from "@/components/layout/component-example"
import { DocsApiTable } from "@/components/layout/docs-api-table"
import { DocsDoDont } from "@/components/layout/docs-do-dont"
import { DocsPageLink } from "@/components/layout/docs-page-link"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"

import { Code } from "@gecko/ui/components/code"
import {
  ReplyBox,
  ReplyBoxContent,
  ReplyBoxFooter,
  ReplyBoxHeader,
  type ReplyBoxActionId,
} from "@gecko/ui/components/reply-box"

export function ReplyBoxPage() {
  const [sending, setSending] = useState(false)
  const basicItems: ReplyBoxActionId[] = ["attachment", "emoji", "image"]

  const importSnippet = [
    "import {",
    "  ReplyBox,",
    "  ReplyBoxContent,",
    "  ReplyBoxFooter,",
    "  ReplyBoxHeader,",
    '} from "@gecko/ui/components/reply-box"',
  ].join("\n")

  const compositionSnippet = [
    "ReplyBox",
    "├── ReplyBoxHeader",
    "├── ReplyBoxContent",
    "└── ReplyBoxFooter",
  ].join("\n")

  const defaultSnippet = [
    '<ReplyBox channel={{ type: "email", label: "Select a channel" }}>',
    "  <ReplyBoxHeader showChannelSwitcher showExpand />",
    "  <ReplyBoxContent />",
    "  <ReplyBoxFooter showTray />",
    "</ReplyBox>",
  ].join("\n")

  const footerOnlySnippet = [
    "<ReplyBox>",
    "  <ReplyBoxContent />",
    "  <ReplyBoxFooter showTray />",
    "</ReplyBox>",
  ].join("\n")

  const noteModeSnippet = [
    "<ReplyBox defaultNoteMode>",
    "  <ReplyBoxHeader />",
    "  <ReplyBoxContent />",
    "  <ReplyBoxFooter showTray />",
    "</ReplyBox>",
  ].join("\n")

  const textareaSnippet = [
    '<ReplyBox variant="textarea">',
    "  <ReplyBoxContent />",
    "  <ReplyBoxFooter showTray showSend={false} />",
    "</ReplyBox>",
  ].join("\n")

  const basicSnippet = [
    "const [sending, setSending] = useState(false)",
    "",
    "<ReplyBox",
    '  variant="basic"',
    "  stopEnabled={sending}",
    "  onSend={() => setSending(true)}",
    "  onStop={() => setSending(false)}",
    ">",
    "  <ReplyBoxContent />",
    "</ReplyBox>",
  ].join("\n")

  const basicActionsSnippet = [
    'const actions = ["attachment", "emoji", "image"]',
    "",
    '<ReplyBox variant="basic">',
    "  <ReplyBoxContent items={actions} />",
    "</ReplyBox>",
  ].join("\n")

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Reply box"
          description="The Reply box provides the composer structure for Gecko chat products, from a full conversation composer to a compact single-line reply."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Reply box to compose a response within a conversation. The
              application owns the message value, submission rules, channel data
              and action integrations.
              <br />
              <br />
              Use{" "}
              <DocsPageLink to="/components/textarea">
                Textarea
              </DocsPageLink>{" "}
              for an ordinary multiline form field without composer controls.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Reply box family from its public entry point."
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
          description="Compose the regions required by the product experience."
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

      <PageSection id="default" label="Default">
        <PageSectionHeader
          title="Default"
          description="The full conversation composer includes channel context, an expandable writing area, actions and the send control. The application connects the channel and action behaviour."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ReplyBox channel={{ type: "email", label: "Select a channel" }}>
              <ReplyBoxHeader showChannelSwitcher showExpand />
              <ReplyBoxContent />
              <ReplyBoxFooter showTray />
            </ReplyBox>
            <Code
              variant="block"
              language="tsx"
              code={defaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="footer-only" label="Footer only">
        <PageSectionHeader
          title="Footer only"
          description="Remove the header when a composer does not need channel context or expansion."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ReplyBox>
              <ReplyBoxContent />
              <ReplyBoxFooter showTray />
            </ReplyBox>
            <Code
              variant="block"
              language="tsx"
              code={footerOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="note-mode" label="Note mode">
        <PageSectionHeader
          title="Note mode"
          description="Use the internal-note state when the content is for teammates rather than the customer."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ReplyBox defaultNoteMode>
              <ReplyBoxHeader />
              <ReplyBoxContent />
              <ReplyBoxFooter showTray />
            </ReplyBox>
            <Code
              variant="block"
              language="tsx"
              code={noteModeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="textarea" label="Textarea">
        <PageSectionHeader
          title="Textarea"
          description="Use the multiline layout when the product supplies composer actions but does not need the full panel treatment."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ReplyBox variant="textarea">
              <ReplyBoxContent />
              <ReplyBoxFooter showTray showSend={false} />
            </ReplyBox>
            <Code
              variant="block"
              language="tsx"
              code={textareaSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="basic" label="Basic">
        <PageSectionHeader
          title="Basic"
          description="Use the compact single-line composer in constrained chat interfaces. This example also demonstrates the send and stop states."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ReplyBox
              variant="basic"
              stopEnabled={sending}
              onSend={() => setSending(true)}
              onStop={() => setSending(false)}
            >
              <ReplyBoxContent />
            </ReplyBox>
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

      <PageSection id="basic-actions" label="Basic with actions">
        <PageSectionHeader
          title="Basic with actions"
          description="Add product actions beside the writing control when the compact composer needs them. Action identifiers provide Gecko presentation; the application connects their behaviour."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ReplyBox variant="basic">
              <ReplyBoxContent items={basicItems} />
            </ReplyBox>
            <Code
              variant="block"
              language="tsx"
              code={basicActionsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Choose the smallest composer that supports the conversation workflow."
        />
        <DocsDoDont
          doItems={[
            <>
              Keep the message value and submission rules in application state.
            </>,
            <>Supply channel data from the chat product.</>,
            <>Connect every visible action to its product behaviour.</>,
            <>
              Override the writing control’s accessible name when its purpose is
              more specific than a message or internal note.
            </>,
          ]}
          dontItems={[
            <>Don’t use Reply box for an ordinary form field.</>,
            <>Don’t show actions that the product has not implemented.</>,
            <>Don’t recreate the composer from separate inputs and buttons.</>,
            <>Don’t infer message submission from a visual send state alone.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Reply box."
        />
        <PageSubsectionHeader
          id="api-reply-box"
          title="ReplyBox"
          description="Controls the composer layout and shared state."
        />
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"chat" | "textarea" | "basic"',
              defaultValue: '"chat"',
              description:
                "Selects the full, multiline, or compact composer layout.",
            },
            {
              name: "channel",
              type: "ReplyBoxChannel",
              description:
                "Provides application-owned channel data for display.",
            },
            {
              name: "items",
              type: "ReplyBoxTrayItem[]",
              description:
                "Overrides the action tray items for the composed footer.",
            },
            {
              name: "expanded",
              type: "boolean",
              description: "Controls the expanded writing state.",
            },
            {
              name: "defaultExpanded",
              type: "boolean",
              defaultValue: "false",
              description: "Initializes the uncontrolled expanded state.",
            },
            {
              name: "onExpandedChange",
              type: "(expanded: boolean) => void",
              description: "Reports an expansion change.",
            },
            {
              name: "noteMode",
              type: "boolean",
              description: "Controls the internal-note state.",
            },
            {
              name: "defaultNoteMode",
              type: "boolean",
              defaultValue: "false",
              description: "Initializes the uncontrolled internal-note state.",
            },
            {
              name: "onNoteModeChange",
              type: "(noteMode: boolean) => void",
              description: "Reports an internal-note state change.",
            },
            {
              name: "onSend",
              type: "() => void",
              description:
                "Runs when the send or add-note control is activated.",
            },
            {
              name: "sendIcon",
              type: "LucideIcon",
              description: "Replaces the default send icon.",
            },
            {
              name: "stopEnabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Changes the send control to its stop state when a stop handler is available.",
            },
            {
              name: "onStop",
              type: "() => void",
              description: "Runs when the stop control is activated.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-content"
          className="mt-6"
          title="ReplyBoxContent"
          description="Configures the message input and compact actions."
        />
        <DocsApiTable
          rows={[
            {
              name: "placeholder",
              type: "string",
              description: "Overrides the message or internal-note prompt.",
            },
            {
              name: "inputProps",
              type: 'ComponentProps<"input">',
              description:
                "Passes application state and native properties to the compact input.",
            },
            {
              name: "textareaProps",
              type: 'ComponentProps<"textarea">',
              description:
                "Passes application state and native properties to the multiline control.",
            },
            {
              name: "items",
              type: "ReplyBoxTrayItem[]",
              description: "Adds actions to the compact composer.",
            },
            {
              name: "showSend",
              type: "boolean",
              defaultValue: "true",
              description: "Shows the compact send control.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-header"
          className="mt-6"
          title="ReplyBoxHeader"
          description="Configures the channel and expansion controls."
        />
        <DocsApiTable
          rows={[
            {
              name: "showChannelSwitcher",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the application-integrated channel control.",
            },
            {
              name: "showExpand",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the expansion control.",
            },
            {
              name: "channels",
              type: "ReplyBoxChannel[]",
              description: "Supplies application-owned channel choices.",
            },
            {
              name: "channel",
              type: "ReplyBoxChannel",
              description: "Overrides the channel displayed by this header.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-footer"
          className="mt-6"
          title="ReplyBoxFooter"
          description="Configures the action tray and send control."
        />
        <DocsApiTable
          rows={[
            {
              name: "showTray",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the action tray.",
            },
            {
              name: "showSend",
              type: "boolean",
              defaultValue: "true",
              description: "Shows the footer send control.",
            },
            {
              name: "items",
              type: "ReplyBoxTrayItem[]",
              description: "Overrides action items for this footer.",
            },
            {
              name: "channelType",
              type: "ReplyBoxChannelType",
              description: "Selects the built-in action presentation set.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-custom-action"
          className="mt-6"
          title="ReplyBoxTrayCustomAction"
          description="Defines an application-owned action for the composer tray."
        />
        <DocsApiTable
          rows={[
            {
              name: "id",
              type: "string",
              description: "Provides a stable identity for the action.",
            },
            {
              name: "label",
              type: "string",
              description: "Names the action in tooltips and menus.",
            },
            {
              name: "icon",
              type: "LucideIcon",
              description: "Provides the default action icon.",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Runs when the default action is activated.",
            },
            {
              name: "render",
              type: "ReactNode",
              description: "Replaces the inline action control.",
            },
            {
              name: "overflowRender",
              type: "ReactNode",
              description:
                "Provides the action representation used inside More actions.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Compose Reply box with the surrounding conversation experience."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — for
            content already in the conversation.
          </li>
          <li>
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>{" "}
            — for keeping the latest conversation content in view.
          </li>
          <li>
            <DocsPageLink to="/components/textarea">Textarea</DocsPageLink> —
            for multiline input without composer controls.
          </li>
        </ul>
      </PageSection>
    </div>
  )
}
