import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";
import { toast } from "@gecko/ui/components/toast";

import { ReplyBox } from "@gecko/ui/components/reply-box";

import { useVirtualEvents } from "@/context/virtual-events-context";

import { formatChatTimestamp } from "./format-chat-timestamp";
import { LiveChat } from "./live-chat";
import { LiveChatMentionList } from "./live-chat-mention-list";
import { LiveChatReplyField } from "./live-chat-reply-field";
import {
  filterPeopleByMentionQuery,
  getMentionAtCursor,
  getMentionedNames,
  insertMention,
  type MentionRange,
} from "./live-chat-mentions";
import { LIVE_CHAT_PEOPLE, type LiveChatPerson } from "./live-chat-people";
import { addReactionToMessage } from "./live-chat-reactions";
import {
  MOCK_LIVE_CHAT_MESSAGES,
  MOCK_USER_REPLIES,
  MOCK_USER_REPLY_DELAY_MS,
  type LiveChatMessage,
} from "./live-chat-messages";

const CURRENT_USER_NAME = "You";

type LiveChatPanelProps = {
  initialMessages?: LiveChatMessage[];
  senderName?: string;
};

export function LiveChatPanel({
  initialMessages = MOCK_LIVE_CHAT_MESSAGES,
  senderName = CURRENT_USER_NAME,
}: LiveChatPanelProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [mentionRange, setMentionRange] = useState<MentionRange | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyIndexRef = useRef(0);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addMentionNotification } = useVirtualEvents();

  const filteredPeople = useMemo(() => {
    if (!mentionRange) {
      return [];
    }

    return filterPeopleByMentionQuery(mentionRange.query, LIVE_CHAT_PEOPLE);
  }, [mentionRange]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  function updateMentionFromInput(input: HTMLInputElement) {
    const mention = getMentionAtCursor(
      input.value,
      input.selectionStart ?? input.value.length,
      LIVE_CHAT_PEOPLE,
    );

    setMentionRange(mention);

    if (mention) {
      setHighlightedIndex(0);
    }
  }

  function handleInputBlur() {
    window.setTimeout(() => {
      const activeElement = document.activeElement;

      if (activeElement?.closest("[data-mention-list]")) {
        return;
      }

      setMentionRange(null);
    }, 0);
  }

  function handleDraftChange(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.target.value);
    updateMentionFromInput(event.target);
  }

  function handleInputEvent(event: SyntheticEvent<HTMLInputElement>) {
    updateMentionFromInput(event.currentTarget);
  }

  function handleSelectPerson(person: LiveChatPerson) {
    if (!mentionRange) {
      return;
    }

    const { nextValue, nextCursor } = insertMention(
      draft,
      mentionRange,
      person.name,
    );

    setDraft(nextValue);
    setMentionRange(null);
    setHighlightedIndex(0);

    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      input.focus();
      input.setSelectionRange(nextCursor, nextCursor);
    });
  }

  function queueMockUserReply() {
    const reply =
      MOCK_USER_REPLIES[replyIndexRef.current % MOCK_USER_REPLIES.length];
    replyIndexRef.current += 1;

    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }

    replyTimeoutRef.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `chat-${crypto.randomUUID()}`,
          name: reply.name,
          text: reply.text,
          timestamp: formatChatTimestamp(new Date()),
          role: "user",
        },
      ]);
      replyTimeoutRef.current = null;
    }, MOCK_USER_REPLY_DELAY_MS);
  }

  function addReaction(messageId: string, emoji: string) {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? addReactionToMessage(message, emoji)
          : message,
      ),
    );
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const messageId = `chat-${crypto.randomUUID()}`;
    const mentionedNames = getMentionedNames(text);

    setMessages((current) => [
      ...current,
      {
        id: messageId,
        name: senderName,
        text,
        timestamp: formatChatTimestamp(new Date()),
        role: "user",
      },
    ]);
    setDraft("");
    setMentionRange(null);

    if (mentionedNames.length > 0) {
      addMentionNotification(senderName, messageId);
      toast.add({ title: `${senderName} mentioned you in a message` });
    }

    queueMockUserReply();
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (mentionRange) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((current) =>
          Math.min(current + 1, Math.max(filteredPeople.length - 1, 0)),
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((current) => Math.max(current - 1, 0));
        return;
      }

      if (event.key === "Enter" && filteredPeople.length > 0) {
        event.preventDefault();
        handleSelectPerson(filteredPeople[highlightedIndex]!);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setMentionRange(null);
        return;
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <LiveChat
          messages={messages}
          onReact={addReaction}
          onReply={() => {
            inputRef.current?.focus();
          }}
        />
      </div>

      <div className="border-border shrink-0 border-t p-4">
        <div className="relative">
          {mentionRange ? (
            <LiveChatMentionList
              people={filteredPeople}
              highlightedIndex={highlightedIndex}
              onHighlight={setHighlightedIndex}
              onSelect={handleSelectPerson}
            />
          ) : null}

          <ReplyBox variant="basic" onSend={sendMessage}>
            <LiveChatReplyField
              placeholder="Ask a question and chat with attendees..."
              inputProps={{
                ref: inputRef,
                value: draft,
                onChange: handleDraftChange,
                onKeyDown: handleInputKeyDown,
                onKeyUp: handleInputEvent,
                onClick: handleInputEvent,
                onSelect: handleInputEvent,
                onBlur: handleInputBlur,
              }}
            />
          </ReplyBox>
          <p className="text-muted-foreground mt-2 text-2xs">
            This chat is moderated.
          </p>
        </div>
      </div>
    </>
  );
}
