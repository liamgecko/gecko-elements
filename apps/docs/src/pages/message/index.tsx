import type { ReactNode } from "react"
import { Reply, SmilePlus } from "lucide-react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Avatar, AvatarFallback, AvatarImage } from "@gecko/ui/components/avatar"
import {
  Bubble,
  BubbleActions,
  BubbleAuthor,
  BubbleContent,
  BubbleHeader,
  BubbleReactions,
  BubbleTimestamp,
} from "@gecko/ui/components/bubble"
import { Button } from "@gecko/ui/components/button"
import { Code } from "@gecko/ui/components/code"
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
} from "@gecko/ui/components/emoji-picker"
import {
  Message,
  MessageAiActions,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageInfo,
  MessageMeta,
} from "@gecko/ui/components/message"

const userAvatar = {
  src: "",
  alt: "User",
  fallback: "U",
}

const agentAvatar = {
  src: "",
  alt: "Agent",
  fallback: "A",
}

const exampleTimestamp = new Date("2026-03-24T04:00:00")

const userMessageInfo = {
  channel: "Admissions live chat",
  page: {
    title: "Undergraduate Admissions",
    url: "https://www.geckouniversity.ac.uk/admissions/undergraduate",
  },
  receivedAt: "08/01/2024 @ 15:54",
  sentTo: ["info@geckouniversity.ac.uk", "admissions@geckouniversity.ac.uk"],
  cc: ["finance@geckouniversity.ac.uk", "support@geckouniversity.ac.uk"],
}

const agentMessageInfo = {
  source: {
    source: "Generative",
    references: [
      {
        title: "Undergraduate Admissions",
        url: "https://www.geckouniversity.ac.uk/admissions/undergraduate",
      },
      {
        title: "Entry Requirements",
        url: "https://www.geckouniversity.ac.uk/admissions/requirements",
      },
      {
        title: "International Students",
        url: "https://www.geckouniversity.ac.uk/international",
      },
    ],
  },
  channel: "Admissions live chat",
  receivedAt: "08/01/2024 @ 15:54",
}

function MessageDemoAvatar({
  src,
  alt,
  fallback,
}: {
  src: string
  alt: string
  fallback: string
}) {
  return (
    <Avatar size="md">
      {src ? <AvatarImage src={src} alt={alt} /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

function MessageExample({
  variant,
  children,
  status,
  info,
  showAvatar = true,
  onResend,
  fullWidth = false,
  showMeta = true,
}: {
  variant: "user" | "agent" | "ai" | "note"
  children: ReactNode
  status?: "sent" | "delivered" | "read" | "failed"
  info?: ReactNode
  showAvatar?: boolean
  onResend?: () => void
  fullWidth?: boolean
  showMeta?: boolean
}) {
  const avatar = variant === "user" ? userAvatar : agentAvatar
  const showFailedFooter = status === "failed" && variant === "agent"

  return (
    <Message variant={variant}>
      {showAvatar ? (
        <MessageAvatar>
          <MessageDemoAvatar {...avatar} />
        </MessageAvatar>
      ) : (
        <MessageAvatar />
      )}
      <MessageContent>
        <Bubble
          fullWidth={fullWidth}
          variant={status === "failed" ? "destructive" : undefined}
        >
          <BubbleContent>
            <div>{children}</div>
            {showMeta ? (
              <MessageMeta
                timestamp={exampleTimestamp}
                status={status}
                info={info}
                actions={
                  variant === "ai" ? (
                    <MessageAiActions copyText={String(children)} />
                  ) : undefined
                }
              />
            ) : null}
          </BubbleContent>
        </Bubble>
        {showFailedFooter ? (
          <MessageFooter className="px-0 font-normal text-red-700 dark:text-rose-200">
            <span>
              This message failed to send -{" "}
              <button
                type="button"
                className="underline hover:text-red-800 dark:hover:text-rose-300"
                onClick={onResend}
              >
                Resend message
              </button>
            </span>
          </MessageFooter>
        ) : null}
      </MessageContent>
    </Message>
  )
}

function LiveChatExample() {
  return (
    <Message>
      <MessageContent>
        <Bubble variant="secondary" fullWidth>
          <BubbleContent>
            <BubbleHeader>
              <BubbleAuthor>James Wright</BubbleAuthor>
              <BubbleTimestamp dateTime="08:04">08:04</BubbleTimestamp>
            </BubbleHeader>
            <div>Brilliant, thank you!</div>
          </BubbleContent>
          <BubbleActions aria-label="Message actions">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Reply to message"
            >
              <Reply strokeWidth={2.25} />
            </Button>
            <EmojiPicker defaultView="tray">
              <EmojiPickerTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Add reaction"
                  />
                }
              >
                <SmilePlus strokeWidth={2.25} />
              </EmojiPickerTrigger>
              <EmojiPickerContent />
            </EmojiPicker>
          </BubbleActions>
          <BubbleReactions align="start" aria-label="Reactions: 👍">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

export function MessagePage() {
  const importSnippet = `import { Avatar, AvatarFallback } from "@gecko/ui/components/avatar"
import {
  Bubble,
  BubbleActions,
  BubbleAuthor,
  BubbleContent,
  BubbleHeader,
  BubbleReactions,
  BubbleTimestamp,
} from "@gecko/ui/components/bubble"
import {
  Message,
  MessageAiActions,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageInfo,
  MessageMeta,
} from "@gecko/ui/components/message"`

  const compositionSnippet = `Message
├── MessageAvatar
└── MessageContent
    ├── Bubble
    │   ├── BubbleContent
    │   │   ├── BubbleHeader
    │   │   │   ├── BubbleAuthor
    │   │   │   └── BubbleTimestamp
    │   │   ├── body
    │   │   └── MessageMeta
    │   ├── BubbleActions
    │   └── BubbleReactions
    └── MessageFooter`

  const groupCompositionSnippet = `MessageGroup
├── Message
└── Message`

  const userSnippet = `<Message variant="user">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>Hello, this is a chat message</div>
        <MessageMeta timestamp={new Date()} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const agentSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>Hello, I'm an agent. How can I help you today?</div>
        <MessageMeta timestamp={new Date()} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const aiSnippet = `<Message variant="ai">
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>Here is a concise answer based on your question.</div>
        <MessageMeta
          timestamp={new Date()}
          actions={<MessageAiActions copyText="Here is a concise answer…" />}
        />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const noteSnippet = `<Message variant="note">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>This isn't a message, it's a note!</div>
        <MessageMeta timestamp={new Date()} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const inboxSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>The component and example JSON now live under the UI registry.</div>
        <MessageMeta timestamp={new Date()} status="read" />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const chatWidgetSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>The component and example JSON now live under the UI registry.</div>
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const liveChatSnippet = `<Message>
  <MessageContent>
    <Bubble variant="secondary" fullWidth>
      <BubbleContent>
        <BubbleHeader>
          <BubbleAuthor>James Wright</BubbleAuthor>
          <BubbleTimestamp dateTime="08:04">08:04</BubbleTimestamp>
        </BubbleHeader>
        <div>Brilliant, thank you!</div>
      </BubbleContent>
      <BubbleActions>
        <Button variant="ghost" size="icon-sm" aria-label="Reply">
          <Reply />
        </Button>
        <EmojiPicker defaultView="tray">
          <EmojiPickerTrigger
            render={<Button variant="ghost" size="icon-sm" aria-label="Add reaction" />}
          >
            <SmilePlus />
          </EmojiPickerTrigger>
          <EmojiPickerContent />
        </EmojiPicker>
      </BubbleActions>
      <BubbleReactions align="start">
        <span>👍</span>
      </BubbleReactions>
    </Bubble>
  </MessageContent>
</Message>`

  const fullWidthSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>Default: grows with content up to 85%…</div>
        <MessageMeta timestamp={new Date()} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>

<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble fullWidth>
      <BubbleContent>
        <div>Full width: can grow up to 100%…</div>
        <MessageMeta timestamp={new Date()} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const statusSentSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>This message has been sent.</div>
        <MessageMeta timestamp={new Date()} status="sent" />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const statusDeliveredSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>This message has been delivered.</div>
        <MessageMeta timestamp={new Date()} status="delivered" />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const statusReadSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>This message has been read.</div>
        <MessageMeta timestamp={new Date()} status="read" />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const statusFailedSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble variant="destructive">
      <BubbleContent>
        <div>Oops, something went wrong. This message wasn't sent.</div>
        <MessageMeta timestamp={new Date()} status="failed" />
      </BubbleContent>
    </Bubble>
    <MessageFooter>
      This message failed to send -{" "}
      <button type="button" onClick={onResend}>
        Resend message
      </button>
    </MessageFooter>
  </MessageContent>
</Message>`

  const groupSnippet = `<MessageGroup>
  <Message variant="agent">
    <MessageAvatar />
    <MessageContent>
      <Bubble>
        <BubbleContent>
          <div>I checked the registry addresses.</div>
          <MessageMeta timestamp={new Date()} status="read" />
        </BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message variant="agent">
    <MessageAvatar>
      <Avatar size="md">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble>
        <BubbleContent>
          <div>The component and example JSON now live under the UI registry.</div>
          <MessageMeta timestamp={new Date()} status="read" />
        </BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`

  const userInfoSnippet = `<Message variant="user">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>I have a question about entry requirements.</div>
        <MessageMeta
          timestamp={new Date()}
          info={<MessageInfo userInfo={userMessageInfo} />}
        />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  const agentInfoSnippet = `<Message variant="agent">
  <MessageAvatar>
    <Avatar size="md">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>I have pulled this from the admissions guidance.</div>
        <MessageMeta
          timestamp={new Date()}
          status="read"
          info={<MessageInfo agentInfo={agentMessageInfo} />}
        />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Message"
          description={
            <>
              Lays out a single message in a conversation — avatar, alignment,
              types, and in-bubble metadata. Render the visible surface with{" "}
              <Code>Bubble</Code>. Set <Code>variant</Code> on{" "}
              <Code>Message</Code> and nested bubbles inherit the matching
              surface. Compose differently for inbox, chat widget, or live chat.
            </>
          }
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Message owns the row and type. Bubble inherits surface styling from
              Message unless you override it (for example{" "}
              <Code>variant=&quot;destructive&quot;</Code> on failed sends). Put
              timestamp, status, and info inside the bubble with{" "}
              <Code>MessageMeta</Code>. Put failed resend in{" "}
              <Code>MessageFooter</Code> below the bubble.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Message primitives alongside Bubble."
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
          description="Use the following composition to build a message:"
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

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              Set <Code>variant</Code> on <Code>Message</Code> for the sender
              type. Alignment and bubble surface inherit from that variant.
            </>
          }
        />

        <PageSubsectionHeader
          id="variants-user"
          title="User"
          description="User messages align to the start (left) and use the secondary bubble."
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="user">
                Hello, this is a chat message
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={userSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-agent"
          title="Agent"
          description={
            <>
              Set <Code>variant=&quot;agent&quot;</Code> for operator messages:
              they align to the end (right) and use the default tinted bubble.
            </>
          }
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent">
                Hello, I&apos;m an agent. How can I help you today?
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={agentSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-ai"
          title="AI"
          description={
            <>
              Use <Code>variant=&quot;ai&quot;</Code> for generative replies:
              ghost bubble (no chrome), no avatar, end-aligned with metadata.
              Pass <Code>MessageAiActions</Code> into <Code>MessageMeta</Code>{" "}
              for copy, feedback, and share.
            </>
          }
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="ai" showAvatar={false}>
                Here is a concise answer based on your question—no padded bubble
                chrome.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={aiSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-note"
          title="Note"
          description={
            <>
              Use <Code>variant=&quot;note&quot;</Code> for internal notes.
              Nested bubbles inherit the note surface — no Bubble variant needed.
              Status is ignored.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="note">
                This isn&apos;t a message, it&apos;s a note!
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={noteSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="types" label="Types">
        <PageSectionHeader
          title="Types"
          description={
            <>
              The same Message and Bubble primitives support different product
              layouts. These are compositions, not separate components.
            </>
          }
        />

        <PageSubsectionHeader
          id="types-inbox"
          title="Inbox"
          description={
            <>
              Full inbox message: avatar, bubble body, and{" "}
              <Code>MessageMeta</Code> for status, relative time, and optional
              info.
            </>
          }
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent" status="read">
                The component and example JSON now live under the UI registry.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={inboxSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="types-chat-widget"
          title="Chat widget"
          description="Minimal message: avatar and bubble body only — no metadata row."
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent" showMeta={false}>
                The component and example JSON now live under the UI registry.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={chatWidgetSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="types-live-chat"
          title="Live chat"
          description={
            <>
              Live chat style: use <Code>BubbleHeader</Code>,{" "}
              <Code>BubbleAuthor</Code>, and <Code>BubbleTimestamp</Code> inside
              the bubble. Reply and emoji live on <Code>BubbleActions</Code>;
              reactions use <Code>BubbleReactions</Code>.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-sm">
              <LiveChatExample />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={liveChatSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="full-width" label="Full width">
        <PageSectionHeader
          title="Full width"
          description={
            <>
              Bubbles always size to their content and wrap when needed. By
              default the max-width is <Code>85%</Code>. Pass{" "}
              <Code>fullWidth</Code> on <Code>Bubble</Code> to raise that cap to{" "}
              <Code>100%</Code> — useful in tight sidebars and narrow panels.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-6">
              <MessageExample variant="agent">
                Default: grows with content up to 85% of the container, then wraps.
                Keep adding copy and the bubble stops expanding once it hits that
                85% cap — anything longer wraps onto additional lines instead of
                stretching across the full row.
              </MessageExample>
              <MessageExample variant="agent" fullWidth>
                Full width: still sizes to the text, but can grow up to 100% before
                wrapping. With enough copy the bubble fills the entire row, then
                wraps onto the next line — useful in tighter layouts like sidebars
                where the usual 85% gap would leave unused space.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={fullWidthSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="status" label="Status">
        <PageSectionHeader
          title="Status"
          description={
            <>
              Use <Code>status</Code> on <Code>MessageMeta</Code> for agent
              messages to show delivery indicators inside the bubble.
            </>
          }
        />

        <PageSubsectionHeader
          id="status-sent"
          title="Sent"
          description="Single check when the message has left the client."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent" status="sent">
                This message has been sent.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={statusSentSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="status-delivered"
          title="Delivered"
          description="Double check when the message reaches the recipient."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent" status="delivered">
                This message has been delivered.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={statusDeliveredSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="status-read"
          title="Read"
          description="Highlighted double check when the message has been read."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent" status="read">
                This message has been read.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={statusReadSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="status-failed"
          title="Failed"
          description="Override the inherited bubble with variant destructive; resend copy lives in MessageFooter below the bubble."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample variant="agent" status="failed">
                Oops, something went wrong. This message wasn&apos;t sent.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={statusFailedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="group" label="Group">
        <PageSectionHeader
          title="Group"
          description={
            <>
              Use <Code>MessageGroup</Code> for consecutive messages from the
              same sender. Render an empty <Code>MessageAvatar</Code> on earlier
              messages so the avatar sits on the last message only.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="text"
            code={groupCompositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-6">
              <MessageExample variant="user">
                Can you check the entry requirements?
              </MessageExample>
              <MessageGroup>
                <Message variant="agent">
                  <MessageAvatar />
                  <MessageContent>
                    <Bubble>
                      <BubbleContent>
                        <div>I checked the registry addresses.</div>
                        <MessageMeta timestamp={exampleTimestamp} status="read" />
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
                <Message variant="agent">
                  <MessageAvatar>
                    <MessageDemoAvatar {...agentAvatar} />
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble>
                      <BubbleContent>
                        <div>
                          The component and example JSON now live under the UI
                          registry.
                        </div>
                        <MessageMeta timestamp={exampleTimestamp} status="read" />
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageGroup>
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
      </PageSection>

      <PageSection id="info-popover" label="Info popover">
        <PageSectionHeader
          title="Info popover"
          description={
            <>
              Add <Code>MessageInfo</Code> to <Code>MessageMeta</Code> for
              message metadata. User and agent messages render different grids.
            </>
          }
        />

        <PageSubsectionHeader
          id="info-popover-user-message"
          title="User message"
          description="Channel, page, recipients, and received time for inbound messages."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample
                variant="user"
                info={<MessageInfo userInfo={userMessageInfo} />}
              >
                I have a question about entry requirements.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={userInfoSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="info-popover-agent-message"
          title="Agent message"
          description="Source references, channel, and sent time for outbound replies."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full">
              <MessageExample
                variant="agent"
                status="read"
                info={<MessageInfo agentInfo={agentMessageInfo} />}
              >
                I have pulled this from the admissions guidance.
              </MessageExample>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={agentInfoSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
