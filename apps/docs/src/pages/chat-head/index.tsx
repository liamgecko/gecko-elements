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
import {
  ChatHead,
  type ChatHeadItem,
} from "@geckolabs/elements/components/chat-head";
import { Button } from "@geckolabs/elements/components/button";
import { Code } from "@/components/layout/docs-code";

const now = Date.now();
const conversations: ChatHeadItem[] = [
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
    timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000),
    presence: "offline",
    state: "closed",
  },
];

const defaultSnippet = `<ul aria-label="Conversations" className="space-y-px">
  <ChatHead
    item={conversation}
    selected={selectedConversationId === conversation.id}
    onSelect={(item) => setSelectedConversationId(item.id)}
    onCloseConversation={closeConversation}
    onReopenConversation={reopenConversation}
    onDeleteConversation={requestConversationDeletion}
  />
</ul>`;

const listSnippet = `<ul aria-label="Conversations" className="space-y-px">
  {conversations.map((conversation) => (
    <ChatHead
      key={conversation.id}
      item={conversation}
      selected={selectedConversationId === conversation.id}
      onSelect={(item) => setSelectedConversationId(item.id)}
      onCloseConversation={closeConversation}
      onReopenConversation={reopenConversation}
      onDeleteConversation={requestConversationDeletion}
    />
  ))}
</ul>`;

function ChatHeadDemo({
  initialItems,
  initialSelectedId,
  label,
}: {
  initialItems: ChatHeadItem[];
  initialSelectedId?: string;
  label: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [feedback, setFeedback] = useState(
    "Select a conversation, or hover or focus it to use its actions.",
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
      <ul aria-label={label} className="space-y-px">
        {items.map((item) => (
          <ChatHead
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={(selectedItem) => {
              setSelectedId(selectedItem.id);
              setFeedback(`Selected ${selectedItem.name}.`);
            }}
            onCloseConversation={(current) => changeState(current, "closed")}
            onReopenConversation={(current) => changeState(current, "open")}
            onDeleteConversation={(current) => {
              setItems((previous) =>
                previous.filter((row) => row.id !== current.id),
              );
              if (selectedId === current.id) setSelectedId(undefined);
              setFeedback(`${current.name}: example conversation removed.`);
              resetRef.current?.focus();
            }}
          />
        ))}
      </ul>
      <p role="status" className="text-sm text-muted-foreground">
        {feedback}
      </p>
      <div>
        <Button
          ref={resetRef}
          variant="outline"
          onClick={() => {
            setItems(initialItems);
            setSelectedId(initialSelectedId);
            setFeedback("Example reset.");
          }}
        >
          Reset example
        </Button>
      </div>
    </div>
  );
}

export function ChatHeadPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Chat head"
        description="One Chat head is one selectable conversation item. It shows identity, latest-message preview, presence, unread state, relative time and conversation actions."
      />
      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use one ChatHead for one conversation. Compose multiple instances
            inside a native list. The parent owns the collection, selected ID,
            requests, ordering, scrolling and pagination. Use{" "}
            <DocsPageLink to="/components/message">Message</DocsPageLink> and{" "}
            <DocsPageLink to="/components/message-scroller">
              Message scroller
            </DocsPageLink>{" "}
            for the selected conversation's contents.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the row component and its item type."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={
                'import { ChatHead, type ChatHeadItem } from "@geckolabs/elements/components/chat-head"'
              }
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>
      <MainSection
        id="default"
        title="Default"
        description="A single ChatHead renders one list item. Elements owns its row composition and visual states. The callbacks in these examples update local data only."
      >
        <ComponentExample>
          <div className="space-y-6">
            <ChatHeadDemo
              initialItems={[conversations[0]]}
              label="Default conversation"
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
        id="list-composition"
        title="List composition"
        description="Multiple ChatHeads make a conversation list. The native ul belongs to the parent, with a stable key and controlled selected flag for each row. No list component or collection state is hidden inside ChatHead."
      >
        <ComponentExample>
          <div className="space-y-6">
            <ChatHeadDemo
              initialItems={conversations}
              initialSelectedId={conversations[0].id}
              label="Example conversations"
            />
            <Code
              variant="block"
              language="tsx"
              code={listSnippet}
              showCopyButton
              copyLabel="Copy list composition"
            />
          </div>
        </ComponentExample>
      </MainSection>
      <MainSection
        id="closed"
        title="Closed"
        description={
          <>
            Set <Code>item.state="closed"</Code> for a finished conversation.
            Re-open and Delete appear on hover or focus. The application owns
            requests and any deletion confirmation.
          </>
        }
      >
        <ComponentExample>
          <ChatHeadDemo
            initialItems={[conversations[2]]}
            label="Closed conversation"
          />
        </ComponentExample>
      </MainSection>
      <MainSection
        id="unread-notification"
        title="Unread notification"
        description={
          <>
            Set <Code>item.unread</Code> while this conversation contains unread
            activity. The parent owns that state; selection does not clear it
            automatically.
          </>
        }
      >
        <ComponentExample>
          <ChatHeadDemo
            initialItems={[conversations[1]]}
            label="Unread conversation"
          />
        </ComponentExample>
      </MainSection>
      <MainSection
        id="active-state"
        title="Active state"
        description={
          <>
            Pass <Code>selected</Code> to the current row. Elements applies its
            active treatment and <Code>aria-current</Code>. The selected
            conversation ID belongs to the parent.
          </>
        }
      >
        <ComponentExample>
          <ChatHeadDemo
            initialItems={[conversations[0]]}
            initialSelectedId={conversations[0].id}
            label="Selected conversation"
          />
        </ComponentExample>
      </MainSection>
      <MainSection
        id="message-preview"
        title="Message preview"
        description={
          <>
            Pass plain text in <Code>item.messageSnippet</Code>. Contact
            messages have no prefix; <Code>item.lastMessageSender="agent"</Code>{" "}
            adds “You:” for the Inbox user's message. Named-sender and typing
            presentation are separate library extensions.
          </>
        }
      />
      <MainSection
        id="controls"
        title="Controls"
        description="Open conversations show Close; closed conversations show Re-open and Delete. Controls and selection are sibling buttons. All callbacks receive this row's item; the product owns permissions, pending/error feedback, confirmation and persistence. Omitting a callback does not disable its action."
      >
        <ComponentExample>
          <ChatHeadDemo
            initialItems={[conversations[0], conversations[2]]}
            label="Conversation action examples"
          />
        </ComponentExample>
      </MainSection>
      <MainSection
        id="keyboard"
        title="Keyboard"
        description="Tab moves through each row's selection button and controls. Enter and Space activate the focused button. Native Tab order continues into the next row. Collection-wide arrow navigation, Home/End shortcuts and focus recovery after removal belong to the parent list; ChatHead does not intercept those keys."
      />
      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Let ChatHead own one row's presentation and keep collection behaviour in the parent."
      >
        <DocsDoDont
          doItems={[
            <>
              Pass one <Code>item</Code> to each ChatHead.
            </>,
            <>
              Map conversations inside a native <Code>ul</Code> or{" "}
              <Code>ol</Code>, using stable keys.
            </>,
            <>
              Pass a valid <Code>Date</Code> and omit unknown presence.
            </>,
            <>
              Connect selection and conversation action callbacks to application
              behaviour.
            </>,
          ]}
          dontItems={[
            <>
              Don’t pass a collection or selected conversation ID to a single
              ChatHead.
            </>,
            <>Don’t add another list inside each row.</>,
            <>Don’t put requests, filters or pagination into ChatHead.</>,
            <>
              Don’t override row styling or assemble its internal controls
              yourself.
            </>,
          ]}
        />
      </MainSection>
      <MainSection
        id="api"
        title="API"
        description="ChatHead renders one li and forwards native list-item properties and its ref. Children and the native DOM onSelect event are excluded."
      >
        <DocsApiTable
          rows={[
            {
              name: "item",
              type: "ChatHeadItem",
              description: "One conversation to render; required.",
            },
            {
              name: "selected",
              type: "boolean",
              defaultValue: "false",
              description: "Whether this row is the current conversation.",
            },
            {
              name: "onSelect",
              type: "(item: ChatHeadItem) => void",
              description: "Reports selection of this conversation; required.",
            },
            {
              name: "onCloseConversation",
              type: "(item: ChatHeadItem) => void",
              description: "Handles Close for this open conversation.",
            },
            {
              name: "onReopenConversation",
              type: "(item: ChatHeadItem) => void",
              description: "Handles Re-open for this closed conversation.",
            },
            {
              name: "onDeleteConversation",
              type: "(item: ChatHeadItem) => void",
              description: "Handles Delete for this closed conversation.",
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
              description: "Latest message's plain-text preview.",
            },
            {
              name: "item.timestamp",
              type: "Date",
              description: "Valid timestamp rendered as live relative time.",
            },
            {
              name: "item.avatarSrc",
              type: "string",
              description: "Optional avatar image.",
            },
            {
              name: "item.presence",
              type: '"online" | "unavailable" | "offline"',
              description: "Optional presence state; omit when unknown.",
            },
            {
              name: "item.lastMessageSender",
              type: '"contact" | "agent"',
              defaultValue: '"contact"',
              description: "Adds You: for the Inbox user's own message.",
            },
            {
              name: "item.state",
              type: '"open" | "closed"',
              defaultValue: '"open"',
              description: "Controls the conversation actions.",
            },
            {
              name: "item.unread",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the unread marker.",
            },
          ]}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          The former <Code>items</Code> and <Code>selectedId</Code> props are
          removed. Map items in the parent and pass <Code>item</Code> and{" "}
          <Code>selected</Code> to each ChatHead.
        </p>
      </MainSection>
      <MainSection
        id="related"
        title="Related"
        description="Compose the Inbox from components with separate responsibilities."
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
            — the conversation transcript.
          </li>
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> —
            identity outside a conversation row.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
