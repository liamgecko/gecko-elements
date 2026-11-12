# Chat head

Import: `@geckolabs/elements/components/chat-head`  
Status: Stable  
Source: `src/components/chat-head.tsx`  
Human documentation: `apps/docs/src/pages/chat-head/index.tsx`

## Purpose

One Chat head is one selectable conversation item in the Inbox. It displays that conversation's identity, latest-message preview, relative time, presence, unread state, selection treatment and conversation controls.

Compose multiple Chat heads inside a native `ul` or `ol` to form a conversation list. The parent owns the collection, order, selected conversation ID, fetching, filtering, sorting, scrolling and pagination. Chat head does not render or control a list.

Use Message and Message scroller for the selected conversation's contents. Do not use Chat head as app navigation, a profile card, a message or a floating chat launcher.

## Canonical application usage

```tsx
<ul aria-label="Conversations" className="space-y-px">
  <ChatHead
    item={conversation}
    selected={selectedConversationId === conversation.id}
    onSelect={(item) => setSelectedConversationId(item.id)}
    onCloseConversation={closeConversation}
    onReopenConversation={reopenConversation}
    onDeleteConversation={requestConversationDeletion}
  />
</ul>
```

Chat head renders one `li`. Its selection target and conversation controls are sibling native buttons; interactive controls are never nested. Its forwarded ref points to that `li`.

## List composition

```tsx
<ul aria-label="Conversations" className="space-y-px">
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
</ul>
```

Use a stable application or database ID as the React key. Render the parent's items in their supplied order. Keep scrolling, infinite-loading sentinels and empty/error presentation outside the individual Chat head. Do not create a list inside every row or add another list component just to render these items.

For application adapters, an existing conversation-item component may retain its participant, typing and action hooks, then render one Chat head. Keep domain subscriptions, routing and requests out of Elements.

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

Supply a valid `Date` for `timestamp` and a plain-text preview for `messageSnippet`. Omit `avatarSrc` when no image is available; Avatar derives the fallback from `name`. Omit `presence` when the person's presence is unknown.

## Selection and keyboard behaviour

The parent supplies `selected` for this row. `onSelect` receives this row's complete item; the parent updates its selected ID or navigates to the conversation. Chat head does not update selection internally.

- `Tab` moves through the selection button and its conversation controls in native order.
- `Enter` and `Space` activate the focused native button.
- `aria-current` identifies the selected conversation.
- Hover and keyboard focus expose the same actions.
- After the final control, native Tab order continues into the next item or leaves the list.

Collection-wide arrow-key navigation, Home/End shortcuts and focus recovery after removal belong to the parent list. An individual Chat head does not inspect siblings, register other rows or intercept those keys. Native `li` keyboard handlers remain available for parent composition.

## Message preview

| `lastMessageSender` | Meaning                                | Display                  |
| ------------------- | -------------------------------------- | ------------------------ |
| `"contact"`         | The contact sent the latest message    | Preview without a prefix |
| `"agent"`           | The Inbox user sent the latest message | Adds `You:`              |

`"contact"` is the default. Supply the preview without a `You:` prefix. Named senders, typing presentation and translated prefix overrides are not introduced by the single-row boundary change; they need an approved library extension before product integration that requires them.

## Presence and unread state

Approved presence values are `"online"`, `"unavailable"` and `"offline"`. An omitted value means unknown and renders no indicator; do not convert unknown to offline.

Set `unread: true` while this conversation contains unread activity. The product owns unread and presence state; Chat head does not infer either from timestamps or selection. Avatar owns the approved indicators and neutral fallback styling.

## Conversation state and controls

| `item.state` | Meaning               | Controls shown on hover or focus |
| ------------ | --------------------- | -------------------------------- |
| `"open"`     | Active conversation   | Close                            |
| `"closed"`   | Finished conversation | Re-open and Delete               |

`"open"` is the default. Elements owns the controls' appearance, placement, tooltips, accessible names and state mapping. The timestamp yields to the controls. Delete uses Button's `outline-destructive` treatment.

Connect the three action callbacks to application behaviour. Each receives this row's item. Controls remain visible according to state even without a callback; production applications must connect them. Omitting a callback does not disable or hide an action.

Callbacks report intent. The application owns confirmation, persistence, permissions, pending/error feedback and changes to the controlled item or list. Per-action disabled/pending configuration and translated labels remain integration requirements where the product needs them; do not claim that callback omission supplies those capabilities. Do not bypass application restrictions by directly wiring an unavailable action.

When removing a conversation invalidates the current selection, the parent selects another conversation or clears selection and restores focus to an appropriate remaining control.

## Relative time

Each Chat head converts `timestamp` into the approved abbreviated form: `now`, `12m`, `3h`, `2d`, `4w` or `1y`. Relative time refreshes every minute. The semantic `time` element retains the original timestamp and a full-date title.

## Loading, empty and error states

The parent conversation surface owns collection loading, empty and error states. Retain known rows during refresh and use bounded Skeleton for unknown content. Use Empty for confirmed empty results and Alert for load failures.

Do not add loading, empty, error, filtering, sorting or pagination properties to Chat head without explicit consent. This row-boundary change does not add participant-identity loading presentation.

## Interface

| Property               | Type                           | Default  | Meaning                                 |
| ---------------------- | ------------------------------ | -------- | --------------------------------------- |
| `item`                 | `ChatHeadItem`                 | required | One conversation to render              |
| `selected`             | `boolean`                      | `false`  | Whether this conversation is current    |
| `onSelect`             | `(item: ChatHeadItem) => void` | required | Reports selection of this conversation  |
| `onCloseConversation`  | `(item: ChatHeadItem) => void` | none     | Close intent for an open conversation   |
| `onReopenConversation` | `(item: ChatHeadItem) => void` | none     | Reopen intent for a closed conversation |
| `onDeleteConversation` | `(item: ChatHeadItem) => void` | none     | Delete intent for a closed conversation |

Chat head accepts native `li` properties except `children` and the native DOM `onSelect` event. Its domain `onSelect` exclusively reports conversation selection. Internal content is library-owned.

### Change from the former list interface

`items` and `selectedId` are removed. Map the collection in the parent and pass `item` and `selected` to each Chat head. Root native attributes and refs now target one `li`, not a `ul`. List labels/refs/keyboard collection handlers belong on the parent list. Existing item fields and action callback payloads are unchanged.

## Styling and accessibility

Elements owns row spacing, typography, truncation, active/hover surfaces, Avatar size, timestamps, controls and focus treatment. Use `className` only for surrounding layout. Keep list spacing on the parent; the documented composition uses `space-y-px`.

The selection button announces the visible identity, preview, time, unread state and presence. Its Avatar is decorative to avoid repeating identity. Icon-only actions have accessible names and tooltips. Row/action transitions respect reduced motion.

Agents must obtain explicit user consent before changing item fields, states, presence values, controls, behaviours, visual variants or styling.

## Related components

- **Message / Message scroller** — content of the selected conversation.
- **Avatar** — identity outside the conversation row.
- **Marker** — conversation status presentation; typing composition requires its agreed extension.
- **Skeleton / Empty / Alert** — parent-owned loading, empty and error states.
