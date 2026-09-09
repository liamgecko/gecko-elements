import { useRef, useState } from "react";

import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { ChatHead, type ChatHeadItem } from "@geckolabs/elements/components/chat-head";
import { Button } from "@geckolabs/elements/components/button";
import { Code } from "@/components/layout/docs-code";

const now = Date.now();

const defaultConversations: ChatHeadItem[] = [
  {
    id: "matt-lanham",
    name: "Matt Lanham",
    messageSnippet:
      "Could you provide information about financial aid and tuition costs?",
    timestamp: new Date(now - 12 * 60 * 1000),
    presence: "online",
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    messageSnippet: "I have sent the application form across.",
    timestamp: new Date(now - 48 * 60 * 1000),
    lastMessageSender: "agent",
    unread: true,
  },
  {
    id: "marcus-thompson",
    name: "Marcus Thompson",
    messageSnippet: "Thank you for your support yesterday.",
    timestamp: new Date(now - 24 * 60 * 60 * 1000),
    presence: "offline",
  },
];

const closedConversations: ChatHeadItem[] = [
  {
    id: "closed-marcus-thompson",
    name: "Marcus Thompson",
    messageSnippet: "Thank you for your support yesterday.",
    timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000),
    presence: "offline",
    state: "closed",
  },
];

const unreadConversations: ChatHeadItem[] = [
  {
    id: "unread-aisha-patel",
    name: "Aisha Patel",
    messageSnippet: "I'm really excited about the scholarship opportunities.",
    timestamp: new Date(now - 5 * 60 * 1000),
    unread: true,
  },
];

const activeConversations: ChatHeadItem[] = [
  {
    id: "active-matt-lanham",
    name: "Matt Lanham",
    messageSnippet: "I'm considering applying to Gecko University.",
    timestamp: new Date(now - 18 * 60 * 1000),
    presence: "online",
  },
];

const importSnippet = `import { ChatHead } from "@geckolabs/elements/components/chat-head"`;

const defaultSnippet = `<ChatHead
  items={conversations}
  selectedId={selectedConversationId}
  onSelect={(conversation) => {
    setSelectedConversationId(conversation.id)
  }}
/>`;

const closedSnippet = `const conversations = [
  {
    id: "marcus-thompson",
    name: "Marcus Thompson",
    messageSnippet: "Thank you for your support yesterday.",
    timestamp,
    presence: "offline",
    state: "closed",
  },
]

<ChatHead
  items={conversations}
  selectedId={selectedConversationId}
  onSelect={(conversation) => {
    setSelectedConversationId(conversation.id)
  }}
/>`;

const unreadSnippet = `const conversations = [
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    messageSnippet: "I'm really excited about the scholarship opportunities.",
    timestamp,
    unread: true,
  },
]

<ChatHead
  items={conversations}
  selectedId={selectedConversationId}
  onSelect={(conversation) => {
    setSelectedConversationId(conversation.id)
  }}
/>`;

const activeSnippet = `<ChatHead
  items={conversations}
  selectedId="matt-lanham"
  onSelect={(conversation) => {
    setSelectedConversationId(conversation.id)
  }}
/>`;

function ConversationActionsExample() {
  const [items, setItems] = useState([
    ...defaultConversations,
    ...closedConversations,
  ]);
  const [selectedId, setSelectedId] = useState<string>();
  const [feedback, setFeedback] = useState(
    "Hover or focus a row to use its conversation actions.",
  );
  const resetRef = useRef<HTMLButtonElement>(null);
  const changeState = (item: ChatHeadItem, state: "open" | "closed") => {
    setItems((previous) =>
      previous.map((row) => (row.id === item.id ? { ...row, state } : row)),
    );
    setFeedback(
      `${item.name}: conversation ${state === "open" ? "reopened" : "closed"}.`,
    );
    resetRef.current?.focus();
  };
  return (
    <div className="grid gap-4">
      <ChatHead
        items={items}
        selectedId={selectedId}
        onSelect={(item) => setSelectedId(item.id)}
        onCloseConversation={(item) => changeState(item, "closed")}
        onReopenConversation={(item) => changeState(item, "open")}
        onDeleteConversation={(item) => {
          setItems((previous) => previous.filter((row) => row.id !== item.id));
          if (selectedId === item.id) setSelectedId(undefined);
          setFeedback(`${item.name}: example conversation removed.`);
          resetRef.current?.focus();
        }}
      />
      <p role="status">{feedback}</p>
      <div>
        <Button
          ref={resetRef}
          variant="outline"
          onClick={() => {
            setItems([...defaultConversations, ...closedConversations]);
            setSelectedId(undefined);
            setFeedback("Example conversations reset.");
          }}
        >
          Reset conversations
        </Button>
      </div>
    </div>
  );
}

export function ChatHeadPage() {
  const [selectedConversationId, setSelectedConversationId] =
    useState("active-matt-lanham");

  const handleSelect = (conversation: ChatHeadItem) => {
    setSelectedConversationId(conversation.id);
  };

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Chat head"
        description="Chat head presents the selectable conversation list in Inbox. It shows who each thread is with, its latest message, presence, unread state, and relative time."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Chat head for the conversation list in the Inbox left column.
            Pass conversation data to the component and let the product respond
            when a conversation is selected.
            <br />
            <br />
            Avoid using it as app navigation, a profile card, or a conversation
            transcript. Use{" "}
            <DocsPageLink to="/components/message">Message</DocsPageLink> inside
            a{" "}
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>{" "}
            for the conversation itself.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import ChatHead and pass it the current conversations."
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
        id="default"
        title="Default"
        description="The canonical conversation list. Chat head owns row composition, avatar fallback, relative time, and the visual treatment of conversation states."
      >
        <ComponentExample>
          <div className="space-y-6">
            <ChatHead
              items={defaultConversations}
              selectedId={selectedConversationId}
              onSelect={handleSelect}
            />
            <Code
              variant="block"
              language="tsx"
              code={defaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="closed"
        title="Closed"
        description={
          <>
            Set an item’s <Code>state</Code> to <Code>"closed"</Code> for a
            finished conversation. Re-open and delete appear on hover or
            keyboard focus; callbacks connect their application behaviour.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ChatHead
              items={closedConversations}
              selectedId={selectedConversationId}
              onSelect={handleSelect}
            />
            <Code
              variant="block"
              language="tsx"
              code={closedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="unread-notification"
        title="Unread notification"
        description={
          <>
            Set <Code>unread</Code> while a conversation contains activity the
            Inbox user has not read. Chat head places the approved notification
            marker on the avatar.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ChatHead
              items={unreadConversations}
              selectedId={selectedConversationId}
              onSelect={handleSelect}
            />
            <Code
              variant="block"
              language="tsx"
              code={unreadSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="active-state"
        title="Active state"
        description={
          <>
            Pass the selected conversation’s ID to <Code>selectedId</Code>. Chat
            head applies the active treatment and exposes the current selection
            to assistive technology.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <ChatHead
              items={activeConversations}
              selectedId={selectedConversationId}
              onSelect={handleSelect}
            />
            <Code
              variant="block"
              language="tsx"
              code={activeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="message-preview"
        title="Message preview"
        description={
          <>
            Contact messages display without a prefix. Set{" "}
            <Code>lastMessageSender="agent"</Code> when the latest message was
            sent by the Inbox user; Chat head adds “You:” automatically.
          </>
        }
      ></MainSection>

      <MainSection
        id="controls"
        title="Controls"
        description="Hover or focus a conversation to reveal its state-based actions. Callbacks connect close, reopen and delete to application behaviour; they do not control visibility. The application updates items and handles persistence, permissions and confirmation. This example changes local data only."
      >
        <ComponentExample>
          <ConversationActionsExample />
        </ComponentExample>
      </MainSection>

      <MainSection
        id="keyboard"
        title="Keyboard"
        description="Tab moves through each conversation and its visible controls in order. Use Up and Down to move directly between conversations, Home and End to jump to the first or last conversation, and Enter or Space to select. After a row’s final control, Tab continues to the next conversation."
      ></MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Provide conversation data and state; let Chat head render each row consistently."
      >
        <DocsDoDont
          doItems={[
            <>
              Give every item a stable application or database <Code>id</Code>.
            </>,
            <>
              Pass a real <Code>Date</Code> to <Code>timestamp</Code>.
            </>,
            <>
              Use <Code>lastMessageSender="agent"</Code> only for messages sent
              by the Inbox user.
            </>,
            <>
              Omit <Code>presence</Code> when the person’s status is unknown.
            </>,
          ]}
          dontItems={[
            <>Don’t assemble conversation rows manually.</>,
            <>
              Don’t add avatar fallback text; Avatar derives it from the name.
            </>,
            <>
              Don’t use <Code>unread</Code> for activity already read by the
              Inbox user.
            </>,
            <>Don’t use Chat head for messages inside a conversation.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Chat head."
      >
        <DocsApiTable
          rows={[
            {
              name: "items",
              type: "readonly ChatHeadItem[]",
              description: "Conversations rendered in the supplied order.",
            },
            {
              name: "selectedId",
              type: "string",
              description: "ID of the conversation currently displayed.",
            },
            {
              name: "onSelect",
              type: "(item: ChatHeadItem) => void",
              description:
                "Notifies the product when a conversation is selected.",
            },
            {
              name: "onCloseConversation",
              type: "(item: ChatHeadItem) => void",
              description: "Handles the close action for open conversations.",
            },
            {
              name: "onReopenConversation",
              type: "(item: ChatHeadItem) => void",
              description:
                "Handles the reopen action for closed conversations.",
            },
            {
              name: "onDeleteConversation",
              type: "(item: ChatHeadItem) => void",
              description:
                "Handles the delete action for closed conversations.",
            },
            {
              name: "item.id",
              type: "string",
              description: "Stable conversation identifier.",
            },
            {
              name: "item.name",
              type: "string",
              description: "Person or thread name.",
            },
            {
              name: "item.messageSnippet",
              type: "string",
              description: "Latest message preview.",
            },
            {
              name: "item.timestamp",
              type: "Date",
              description: "Timestamp rendered as live relative time.",
            },
            {
              name: "item.avatarSrc",
              type: "string",
              description: "Optional avatar image source.",
            },
            {
              name: "item.presence",
              type: '"online" | "unavailable" | "offline"',
              description: "Optional approved presence state.",
            },
            {
              name: "item.lastMessageSender",
              type: '"contact" | "agent"',
              defaultValue: '"contact"',
              description: "Controls whether Chat head adds the “You:” prefix.",
            },
            {
              name: "item.state",
              type: '"open" | "closed"',
              defaultValue: '"open"',
              description: "Controls the conversation treatment and controls.",
            },
            {
              name: "item.unread",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the unread marker on the avatar.",
            },
          ]}
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use these components for the selected conversation and identity outside the list."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — a
            message inside the selected conversation.
          </li>
          <li>
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>{" "}
            — the complete conversation transcript.
          </li>
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> — a
            person’s identity outside a conversation row.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
