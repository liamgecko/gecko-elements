import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleInfo,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { Code } from "@/components/ui/code"

const defaultAvatar = {
  src: "",
  alt: "",
  fallback: "U",
}

const agentAvatar = {
  src: "",
  alt: "",
  fallback: "A"
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
      {
        title: "Accommodation",
        url: "https://www.geckouniversity.ac.uk/accommodation",
      },
      {
        title: "Student Life",
        url: "https://www.geckouniversity.ac.uk/student-life",
      },
    ],
  },
  channel: "Admissions live chat",
  receivedAt: "08/01/2024 @ 15:54",
}

export function ChatBubblePage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Chat bubble</h1>
          <p className="text-sm text-muted-foreground">
            A simple message bubble with avatar, body text, and relative time
            metadata.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            The base <Code>ChatBubble</Code> includes an avatar, message body,
            and a relative timestamp rendered from a required date on the root
            component.
          </p>
          <ComponentExample>
            <ChatBubble>
              <ChatBubbleAvatar {...defaultAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp}>
                Hello, this is a chat message
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </PageSection>

        <PageSection id="agent" label="Agent">
          <h2 className="text-lg font-semibold">Agent</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>agent</Code> on <Code>ChatBubble</Code> to align agent
            messages to the right.
          </p>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp}>
                Hello, I'm an agent. How can I help you today?
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </PageSection>

        <PageSection id="status" label="Status">
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>status</Code> on <Code>ChatBubbleMessage</Code> for agent
            messages to show read-state indicators.
          </p>

          <h3 id="status-sent" className="mb-3 text-base font-semibold">
            Sent
          </h3>
          <ComponentExample className="mb-6">
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="sent">
                This message has been sent.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>

          <h3 id="status-delivered" className="mb-3 text-base font-semibold">
            Delivered
          </h3>
          <ComponentExample className="mb-6">
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="delivered">
                This message has been delivered.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>

          <h3 id="status-read" className="mb-3 text-base font-semibold">
            Read
          </h3>
          <ComponentExample className="mb-6">
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="read">
                This message has been read.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>

          <h3 id="status-failed" className="mb-3 text-base font-semibold">
            Failed
          </h3>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="failed">
                Oops, something went wrong. This message wasn't sent.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </PageSection>

        <PageSection id="note" label="Note">
          <h2 className="text-lg font-semibold">Note</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>variant="note"</Code> for conversation notes. Notes
            default to agent alignment and only display the timestamp (status is
            ignored).
          </p>
          <ComponentExample>
            <ChatBubble variant="note">
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp}>
                This isn&apos;t a message, it&apos;s a note!
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </PageSection>

        <PageSection id="info-popover" label="Info popover">
          <h2 className="text-lg font-semibold">Info popover</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add <Code>ChatBubbleInfo</Code> to show a message-information
            popover. User and agent messages render different grid content.
          </p>

          <h3 id="info-popover-user-message" className="mb-3 text-base font-semibold">
            User message
          </h3>
          <ComponentExample className="mb-6">
            <ChatBubble>
              <ChatBubbleAvatar {...defaultAvatar} />
              <ChatBubbleMessage
                timestamp={exampleTimestamp}
                info={<ChatBubbleInfo userInfo={userMessageInfo} />}
              >
                I have a question about entry requirements.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>

          <h3 id="info-popover-agent-message" className="mb-3 text-base font-semibold">
            Agent message
          </h3>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage
                timestamp={exampleTimestamp}
                info={<ChatBubbleInfo agentInfo={agentMessageInfo} />}
              >
                I have pulled this from the admissions guidance.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

