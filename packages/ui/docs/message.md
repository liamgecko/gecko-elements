# Message

Import: `@gecko/ui/components/message`  
Status: Stable  
Source: `src/components/message.tsx`  
Human documentation: `apps/docs/src/pages/message/index.tsx`

## Purpose

Message lays out one row in a conversation. It coordinates participant type, alignment, avatar, the visible Bubble surface, metadata, delivery status and message-level actions.

Use Message inside MessageScroller for product conversations. Use Marker for a brief system or progress row that does not contain a full message.

Message begins with Shadcn’s native-element composition. Gecko extends it with product message variants, automatic Bubble mapping, delivery metadata, information popovers and AI-response actions. There is no standalone Base UI Message primitive.

## Import

```tsx
import {
  Message,
  MessageAiActions,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
  MessageInfo,
  MessageMeta,
} from "@gecko/ui/components/message";
```

Import Avatar and Bubble separately.

## Composition

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    │   ├── BubbleContent
    │   │   ├── body
    │   │   └── MessageMeta
    │   ├── BubbleActions
    │   └── BubbleReactions
    └── MessageFooter
```

Message owns the row. Bubble owns the visible message surface. MessageMeta belongs inside BubbleContent; MessageHeader and MessageFooter sit outside Bubble.

Use BubbleHeader, BubbleAuthor and BubbleTimestamp inside BubbleContent only for the documented live-chat composition. MessageHeader is the outside-surface Shadcn slot for row-level content above Bubble.

## Canonical message

```tsx
<Message variant="user">
  <MessageAvatar>
    <Avatar name="User" size="md" />
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>Could you check my application?</div>
        <MessageMeta timestamp={message.sentAt} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

Omit Bubble `variant` and `align` in the normal composition. Message supplies the approved values through context.

## Variants and alignment

| Message variant | Meaning                         | Alignment | Bubble treatment                    |
| --------------- | ------------------------------- | --------- | ----------------------------------- |
| `user`          | Customer or reader message      | `start`   | `secondary`                         |
| `agent`         | Human administrator or operator | `end`     | `default`                           |
| `ai`            | Generative reply                | `end`     | `ghost`                             |
| `note`          | Internal agent-only note        | `end`     | `secondary` with the note treatment |

`user` is the component default. Override `align` only when viewer-relative placement requires it, such as the chat widget where the current participant’s messages appear at the end.

AI messages suppress MessageAvatar. Notes and system messages remain in the transcript but must never be exposed to customers.

## Product compositions

### Inbox

Use the full composition: avatar, Bubble body, MessageMeta, delivery state and MessageInfo where available.

### Chat widget

Use the avatar and Bubble body without the inbox metadata row. Determine alignment from the widget viewer rather than assuming the inbox default.

### Live chat

Use BubbleHeader, BubbleAuthor and BubbleTimestamp inside BubbleContent. BubbleActions and BubbleReactions remain siblings of BubbleContent.

## Metadata and delivery state

MessageMeta requires `timestamp` and renders Gecko’s compact relative time. It can also contain delivery `status`, `info` and `actions`.

```tsx
<MessageMeta
  timestamp={message.sentAt}
  status="read"
  info={<MessageInfo agentInfo={message.info} />}
/>
```

Delivery status appears only for `agent` messages:

| Status      | Meaning                                      |
| ----------- | -------------------------------------------- |
| `sent`      | Message left the client                      |
| `delivered` | Message reached the recipient                |
| `read`      | Recipient read the message                   |
| `failed`    | Message was not sent and needs recovery copy |

For a failed message, use Bubble’s destructive treatment and put the explanatory resend action in MessageFooter. Do not rely on the status icon or colour alone.

MessageInfo chooses its metadata grid from Message variant. Pass `userInfo` for inbound customer context and `agentInfo` for administrator or AI context.

## AI actions

Pass MessageAiActions through MessageMeta’s `actions` property on AI responses:

```tsx
<MessageMeta
  timestamp={message.createdAt}
  actions={<MessageAiActions copyText={message.text} />}
/>
```

MessageAiActions supplies copy, good-response, bad-response and share controls using one consistent ghost treatment. Connect the relevant callbacks when the product needs to persist feedback or open sharing. Every icon-only action retains its accessible label and tooltip.

## Grouping

Use MessageGroup for consecutive messages from one sender. Render an empty MessageAvatar on earlier rows to preserve the avatar column, then render the participant’s Avatar on the final row:

```tsx
<MessageGroup>
  <Message variant="agent">
    <MessageAvatar />
    <MessageContent>{/* first message */}</MessageContent>
  </Message>
  <Message variant="agent">
    <MessageAvatar>
      <Avatar name="Agent" size="md" />
    </MessageAvatar>
    <MessageContent>{/* final message */}</MessageContent>
  </Message>
</MessageGroup>
```

## Width

Bubble controls the visible surface width. It wraps at an 85% maximum by default. Set Bubble `fullWidth` only in a narrow panel where the remaining gap wastes necessary space.

## Interface

### Parts

| Part                     | Meaning                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| `MessageGroup`           | Stack of consecutive messages from one sender                    |
| `Message`                | Row, participant variant, alignment and Bubble context           |
| `MessageAvatar`          | Avatar column; empty instances preserve grouped alignment        |
| `MessageContent`         | Header, Bubble and footer column                                 |
| `MessageHeader`          | Row-level content above the Bubble                               |
| `MessageFooter`          | Row-level status or actions below the Bubble                     |
| `MessageMeta`            | Relative time, delivery state, information and in-bubble actions |
| `MessageInfo`            | Contextual information popover                                   |
| `MessageAiActions`       | Copy, feedback and share actions for AI responses                |
| `MessageStatusIndicator` | Delivery-state icon and accessible tooltip                       |

### Properties

| Property                    | Type                                          | Default  | Meaning                                                |
| --------------------------- | --------------------------------------------- | -------- | ------------------------------------------------------ |
| `Message.variant`           | `"user" \| "agent" \| "ai" \| "note"`         | `"user"` | Participant type, Bubble mapping and default alignment |
| `Message.align`             | `"start" \| "end"`                            | Variant  | Overrides viewer-relative row alignment                |
| `MessageMeta.timestamp`     | `Date \| string \| number`                    | Required | Value rendered as compact relative time                |
| `MessageMeta.status`        | `"sent" \| "delivered" \| "read" \| "failed"` | —        | Delivery indicator for agent messages                  |
| `MessageMeta.info`          | `ReactNode`                                   | —        | Information control beside the relative time           |
| `MessageMeta.actions`       | `ReactNode`                                   | —        | In-bubble actions beside the relative time             |
| `MessageAiActions.copyText` | `string`                                      | —        | Explicit text copied by the copy action                |
| `MessageAiActions.bodyRef`  | `RefObject<HTMLElement>`                      | —        | Fallback source for copy text                          |
| `MessageInfo.userInfo`      | `MessageUserInfo`                             | —        | Inbound message context                                |
| `MessageInfo.agentInfo`     | `MessageAgentInfo`                            | —        | Administrator or AI message context                    |

## Accessibility

- Message is a presentational layout wrapper; semantic meaning comes from its content and transcript container.
- MessageScroller owns the transcript region and live-update behaviour.
- Icon-only actions have contextual accessible names and tooltips.
- Delivery status tooltips expose the complete status as their accessible name.
- MessageInfo’s information icon is decorative because its button supplies the accessible name.
- Failed delivery includes corrective text and a real button rather than relying on colour or an icon.
- Use Marker with `role="status"` for newly rendered progress updates; do not turn a complete Message into a live region.
- External references opened in a new tab retain `noopener noreferrer`.

## Agent rules

1. Import Message parts from `@gecko/ui/components/message`.
2. Render the visible surface with Bubble inside MessageContent.
3. Set Message `variant` from the participant or note meaning, not visual preference.
4. Let Message choose Bubble variant and alignment unless a documented viewer-relative exception applies.
5. Put MessageMeta inside BubbleContent and MessageFooter outside Bubble.
6. Use MessageGroup and empty MessageAvatar slots for consecutive messages from one sender.
7. Never expose note or system-message content to customers.
8. Show delivery state only on agent messages and include recovery text for failures.
9. Use MessageAiActions only for AI responses.
10. Use MessageScroller for a transcript and Marker for a brief inline status.
11. Do not import Shadcn source or Base UI utilities directly in application code.

## API reference

- [Shadcn Message documentation](https://ui.shadcn.com/docs/components/base/message)

## Related

- **Bubble** — visible message surface and its actions or reactions.
- **Message scroller** — transcript container and scrolling behaviour.
- **Marker** — brief status, system note or labelled separator.
- **Avatar** — participant identity inside MessageAvatar.
- **Emoji picker** — reaction tray used through BubbleActions.
