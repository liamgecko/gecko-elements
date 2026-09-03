import { ComponentExample } from "@/components/layout/component-example";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleInfo,
  ChatBubbleMessage,
} from "@gecko/ui/components/chat-bubble";
import { Code } from "@gecko/ui/components/code";

const defaultAvatar = {
  src: "",
  alt: "",
  fallback: "U",
};

const agentAvatar = {
  src: "",
  alt: "",
  fallback: "A",
};

const exampleTimestamp = new Date("2026-03-24T04:00:00");

const userMessageInfo = {
  channel: "Admissions live chat",
  page: {
    title: "Undergraduate Admissions",
    url: "https://www.geckouniversity.ac.uk/admissions/undergraduate",
  },
  receivedAt: "08/01/2024 @ 15:54",
  sentTo: ["info@geckouniversity.ac.uk", "admissions@geckouniversity.ac.uk"],
  cc: ["finance@geckouniversity.ac.uk", "support@geckouniversity.ac.uk"],
};

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
};

export function ChatBubblePage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title={<>Chat bubble</>}
        description={
          <>
            <span className="text-destructive font-medium">Deprecated.</span>{" "}
            Prefer <Code>Message</Code> + <Code>Bubble</Code> for new work. This
            page is kept as a reference while apps migrate.
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          A simple message bubble with avatar, body text, and relative time
          metadata.
        </p>
      </HeaderSection>

      <MainSection
        id="basic-example"
        title={<>Basic example</>}
        description={
          <>
            The base <Code>ChatBubble</Code> includes an avatar, message body,
            and a relative timestamp. User messages use a muted bubble aligned
            to the end (right).
          </>
        }
      >
        <ComponentExample>
          <ChatBubble>
            <ChatBubbleAvatar {...defaultAvatar} />
            <ChatBubbleMessage timestamp={exampleTimestamp}>
              Hello, this is a chat message
            </ChatBubbleMessage>
          </ChatBubble>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="agent"
        title={<>Agent</>}
        description={
          <>
            Set <Code>agent</Code> on <Code>ChatBubble</Code> for operator or
            assistant messages: they align to the start (left) and use the
            tinted background by default.
          </>
        }
      >
        <ComponentExample>
          <ChatBubble agent>
            <ChatBubbleAvatar {...agentAvatar} />
            <ChatBubbleMessage timestamp={exampleTimestamp}>
              Hello, I'm an agent. How can I help you today?
            </ChatBubbleMessage>
          </ChatBubble>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="ai-agent"
        title={<>AI agent</>}
        description={
          <>
            Use <Code>variant="ai-agent"</Code> with <Code>agent</Code> for
            generative assistant replies: no bubble background or padding, no
            avatar (even if <Code>ChatBubbleAvatar</Code> is present—it renders
            nothing), still start-aligned with metadata.
          </>
        }
      >
        <ComponentExample>
          <ChatBubble agent variant="ai-agent">
            <ChatBubbleMessage timestamp={exampleTimestamp}>
              Here is a concise answer based on your question—no padded bubble
              chrome.
            </ChatBubbleMessage>
          </ChatBubble>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="status"
        title={<>Status</>}
        description={
          <>
            Use <Code>status</Code> on <Code>ChatBubbleMessage</Code> for agent
            messages to show read-state indicators.
          </>
        }
      >
        <ChildSection id="status-sent" title={<>Sent</>}>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="sent">
                This message has been sent.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </ChildSection>
        <ChildSection id="status-delivered" title={<>Delivered</>}>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage
                timestamp={exampleTimestamp}
                status="delivered"
              >
                This message has been delivered.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </ChildSection>
        <ChildSection id="status-read" title={<>Read</>}>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="read">
                This message has been read.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </ChildSection>
        <ChildSection id="status-failed" title={<>Failed</>}>
          <ComponentExample>
            <ChatBubble agent>
              <ChatBubbleAvatar {...agentAvatar} />
              <ChatBubbleMessage timestamp={exampleTimestamp} status="failed">
                Oops, something went wrong. This message wasn't sent.
              </ChatBubbleMessage>
            </ChatBubble>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="note"
        title={<>Note</>}
        description={
          <>
            Use <Code>variant="note"</Code> for conversation notes. Notes
            default to agent alignment and only display the timestamp (status is
            ignored).
          </>
        }
      >
        <ComponentExample>
          <ChatBubble variant="note">
            <ChatBubbleAvatar {...agentAvatar} />
            <ChatBubbleMessage timestamp={exampleTimestamp}>
              This isn&apos;t a message, it&apos;s a note!
            </ChatBubbleMessage>
          </ChatBubble>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="info-popover"
        title={<>Info popover</>}
        description={
          <>
            Add <Code>ChatBubbleInfo</Code> to show a message-information
            popover. User and agent messages render different grid content.
          </>
        }
      >
        <ChildSection id="info-popover-user-message" title={<>User message</>}>
          <ComponentExample>
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
        </ChildSection>
        <ChildSection
          id="info-popover-agent-message"
          title={<>Agent message</>}
        >
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
        </ChildSection>
      </MainSection>
    </div>
  );
}
