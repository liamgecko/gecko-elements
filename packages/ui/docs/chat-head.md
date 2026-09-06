# Chat head

Import: `@gecko/ui/components/chat-head`  
Status: Stable  
Source: `src/components/chat-head.tsx`  
Human documentation: `apps/docs/src/pages/chat-head/index.tsx`

## Purpose

Chat head is Gecko’s selectable conversation list for the Inbox left column. Despite its name, it is the complete list rather than an individual floating chat launcher. It renders each supplied conversation with identity, latest-message preview, relative time, presence, unread state, selection treatment, and the approved conversation controls.

Use Chat head to choose the conversation displayed in the Inbox. Use Message and Message scroller for the selected conversation’s contents. Do not use Chat head as app navigation, a profile card, a message, or a floating chat launcher.

## Canonical application usage

Pass the current conversations, the selected conversation ID, and the product’s selection handler:

```tsx
<ChatHead
  items={conversations}
  selectedId={selectedConversationId}
  onSelect={(conversation) => {
    setSelectedConversationId(conversation.id);
  }}
/>
```

Chat head renders items in the supplied order. The product owns fetching, filtering, sorting, search, and the selected conversation’s content.

## Item data

```ts
type ChatHeadItem = {
  id: string;
  name: string;
  messageSnippet: string;
  timestamp: Date;
  avatarSrc?: string;
  presence?: "online" | "unavailable" | "offline";
  lastMessageSender?: "contact" | "agent";
  state?: "open" | "closed";
  unread?: boolean;
};
```

Rules:

- Use a stable application or database identifier for `id`.
- Supply items in the order they should appear. Chat head does not sort them.
- Pass a valid `Date` for `timestamp`.
- Pass only the latest message’s plain-text preview through `messageSnippet`.
- Omit `avatarSrc` when no image is available. Avatar derives the fallback from `name`.
- Omit `presence` when the person’s presence is unknown.

## Selection

`onSelect` receives the complete selected item. Use its `id` to update product state or navigate to the conversation. `selectedId` controls the active row.

Chat head renders the selection target as a native Button. The close, re-open, and delete controls are sibling Buttons rather than descendants, so the structure never nests interactive controls.

Only one item should normally match `selectedId`. Omit `selectedId` when no conversation is selected.

### Keyboard navigation

Chat head uses native Tab order with additional arrow-key navigation:

- `Tab` moves through each conversation and its visible controls in supplied order.
- `ArrowUp` and `ArrowDown` move focus between conversations without selecting them.
- `Home` and `End` move focus to the first or last conversation.
- `Enter` and `Space` select the focused conversation through the native Button.
- After a row’s final control, `Tab` moves to the next conversation. After the final row’s controls, it leaves the list.

Arrow movement is manual activation: moving focus does not call `onSelect`.

## Message preview

`lastMessageSender` is an approved closed set:

| Value       | Meaning                                | Display                  |
| ----------- | -------------------------------------- | ------------------------ |
| `"contact"` | The contact sent the latest message    | Message without a prefix |
| `"agent"`   | The Inbox user sent the latest message | Chat head adds `You:`    |

`"contact"` is the default. Set `"agent"` only when the latest message was sent by the Inbox user. Callers supply the message without a `You:` prefix because Chat head owns that wording.

## Presence

The approved presence values are `"online"`, `"unavailable"`, and `"offline"`. Chat head passes the value to Avatar and owns its approved indicator.

Presence is optional. An omitted value means unknown and renders no indicator; it must not be converted to `"offline"`.

This is a closed set. Agents must obtain explicit user consent before adding another presence value or indicator.

## Unread

Set `unread: true` while the conversation contains activity the Inbox user has not read. Chat head places the approved notification marker on the Avatar.

The product owns the unread state. Chat head does not infer unread status from timestamps or selection.

## Conversation state and controls

`state` is an approved closed set:

| Value      | Meaning                 | Controls shown     |
| ---------- | ----------------------- | ------------------ |
| `"open"`   | An active conversation  | Close              |
| `"closed"` | A finished conversation | Re-open and delete |

`"open"` is the default.

The library owns the controls’ appearance, placement, tooltips, accessible names, and mapping to conversation state. Their product behaviour is intentionally outside the current interface and will be decided during product integration.

Delete uses Button’s `outline-destructive` treatment. It matches the neutral outline controls at rest, then communicates destructive intent through its interaction states.

Agents must preserve the existing controls and must not add callbacks, action implementations, confirmation flows, permissions, or alternative controls without explicit user consent.

## Relative time

Chat head converts each `timestamp` into the approved abbreviated relative form:

- Less than one minute: `now`
- Minutes: `12m`
- Hours: `3h`
- Days: `2d`
- Weeks: `4w`
- Years: `1y`

The list refreshes relative values every minute. Each value is rendered as a semantic `time` element containing the original timestamp.

## Loading, empty, and error states

The parent Inbox surface owns these states:

- Use Spinner while conversations are loading.
- Use Empty when no conversations match the current view.
- Use Alert when conversations cannot be loaded.

Do not add loading, empty, error, filtering, sorting, or pagination properties to Chat head without explicit consent.

## Accessibility

- Chat head renders a semantic list.
- Each conversation selection target is a native Button.
- `aria-current` identifies the selected conversation.
- Native Tab order moves through every conversation and its controls; arrow keys provide a shortcut between conversation Buttons.
- Selection and conversation controls are sibling Buttons; interactive controls are never nested.
- Every icon-only control has a visible Tooltip and an accessible name.
- Chat head gives each selection Button one clear identity and announces its presence and unread state. The nested Avatar is decorative in this context to avoid repeating the person’s name.
- Relative timestamps use semantic `time` elements.
- Keyboard focus exposes the same controls as pointer hover.

## Interface

### ChatHead

| Property     | Type                           | Default  | Meaning                                       |
| ------------ | ------------------------------ | -------- | --------------------------------------------- |
| `items`      | `readonly ChatHeadItem[]`      | required | Conversations rendered in supplied order      |
| `selectedId` | `string`                       | none     | Currently selected conversation ID            |
| `onSelect`   | `(item: ChatHeadItem) => void` | required | Reports conversation selection to the product |

Chat head also accepts native `ul` properties except `children` and the native DOM `onSelect` event. Its `onSelect` property exclusively reports conversation selection. Callers provide data through `items`; they do not compose rows manually.

## Styling contract

The library owns row composition, spacing, typography, truncation, active and hover surfaces, Avatar size, presence and unread indicators, relative-time presentation, controls, tooltips, and focus treatment.

Use `className` only to position or size the complete list within its parent layout. Do not override row surfaces, internal spacing, typography, Avatar treatment, timestamps, controls, or interaction states. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing fields, states, presence values, controls, behaviours, visual variants, or styling.

## Related components

- **Message / Message scroller** — content of the selected conversation.
- **Avatar** — identity outside the conversation list.
- **Spinner** — parent-owned loading state.
- **Empty** — parent-owned empty state.
- **Alert** — parent-owned error state.
