# Message scroller

Import: `@gecko/ui/components/message-scroller`  
Status: Stable  
Source: `src/components/message-scroller.tsx`  
Human documentation: `apps/docs/src/pages/message-scroller/index.tsx`

## Purpose

Message scroller is the transcript-aware scroll container for product conversations. It anchors meaningful turns, follows streamed replies only while the reader is at the live edge, preserves position when earlier history is loaded and provides commands and state for navigating long conversations.

Use Message scroller for a conversation transcript. Use Scroll area for general overflowing content and Message for each complete conversation row.

Message scroller is Shadcn’s styled wrapper around the headless `@shadcn/react/message-scroller` package. Gecko owns the approved styling and composition. Application code imports the Gecko component rather than the implementation package.

## Import

```tsx
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@gecko/ui/components/message-scroller";
```

## Composition

```text
MessageScrollerProvider
└── MessageScroller
    ├── MessageScrollerViewport
    │   └── MessageScrollerContent
    │       └── MessageScrollerItem
    └── MessageScrollerButton
```

Every direct child of MessageScrollerContent must be wrapped in MessageScrollerItem. The item boundary lets the primitive measure rows, preserve the reader’s position, track visibility and target a row by id.

MessageScroller fills its parent. Render it inside a height-constrained layout.

## Canonical transcript

```tsx
<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={startsTurn(message)}
          >
            <Message variant={message.variant} />
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

Use stable `messageId` values. In Gecko, a turn anchor is the first message after a sender streak changes. Do not mark every message as an anchor.

## Live-edge following

Set `autoScroll` when replies can stream or new transcript rows can arrive. Following continues only while the reader is already at the live edge. Wheel, touch, keyboard scrolling and explicit jumps release the viewport so new content does not pull the reader away from what they are reading.

MessageScrollerButton provides the return-to-latest action. The headless primitive makes the button inert and removes it from the tab order while no content exists in its direction.

## Opening saved transcripts

`defaultScrollPosition` controls the first non-empty render:

| Value           | Use                                                       |
| --------------- | --------------------------------------------------------- |
| `"start"`       | Open at the beginning                                     |
| `"end"`         | Open at the absolute latest content; component default    |
| `"last-anchor"` | Reopen at the last meaningful turn with its reply in view |

Prefer `"last-anchor"` when restoring a saved conversation. It depends on stable turn anchors and falls back to the end when no useful anchor exists.

## Loading earlier history

MessageScrollerViewport preserves the first visible item when rows are prepended by default. Keep `preserveScrollOnPrepend` enabled for conversation history and preserve every row’s stable `messageId`.

## Keeping context visible

`scrollPreviousItemPeek` keeps part of the preceding row visible above a newly anchored turn. Its default is 64 pixels. Change it only when the approved transcript layout needs a different amount of context.

## Commands and state

`useMessageScroller` provides programmatic commands such as scrolling to the start, end or a stable message id. Use it for transcript search results, permalinks and explicit navigation controls.

`useMessageScrollerScrollable` reports which edges remain scrollable. Prefer the primitive’s `data-scrollable` attribute when styling the scroller itself.

`useMessageScrollerVisibility` reports the current anchored turn and visible message ids. Visibility tracking runs only while something subscribes to the hook, and only items with a `messageId` participate.

## Interface

| Property                                          | Type                                | Default    | Meaning                                                   |
| ------------------------------------------------- | ----------------------------------- | ---------- | --------------------------------------------------------- |
| `MessageScrollerProvider.autoScroll`              | `boolean`                           | `false`    | Follows new content while the reader is at the live edge  |
| `MessageScrollerProvider.defaultScrollPosition`   | `"start" \| "end" \| "last-anchor"` | `"end"`    | Sets the opening position                                 |
| `MessageScrollerProvider.scrollEdgeThreshold`     | `number`                            | `8`        | Distance from an edge that still counts as that edge      |
| `MessageScrollerProvider.scrollMargin`            | `number`                            | `0`        | Space applied to aligned programmatic scroll targets      |
| `MessageScrollerProvider.scrollPreviousItemPeek`  | `number`                            | `64`       | Amount of the previous row retained above a new anchor    |
| `MessageScrollerViewport.preserveScrollOnPrepend` | `boolean`                           | `true`     | Preserves the visible row when earlier rows are prepended |
| `MessageScrollerItem.messageId`                   | `string`                            | —          | Stable address and visibility id for a transcript row     |
| `MessageScrollerItem.scrollAnchor`                | `boolean`                           | `false`    | Marks a row as the start of a meaningful turn             |
| `MessageScrollerButton.direction`                 | `"start" \| "end"`                  | `"end"`    | Chooses the edge targeted by the scroll button            |
| `MessageScrollerButton.behavior`                  | `ScrollBehavior`                    | `"smooth"` | Sets the browser scrolling behaviour                      |

The exported hooks and inherited native properties remain available. Consult the upstream API before extending the Gecko wrapper.

## Accessibility

- The primitive gives MessageScrollerViewport a keyboard-focusable labelled region and lets it receive native scroll-key input.
- MessageScrollerContent is a transcript log whose additions can be announced without turning every complete Message into a live region.
- Keep visible focus styling on the viewport and scroll controls.
- MessageScrollerButton supplies an accessible name for both directions and is inert when inactive.
- Preserve the reader’s position after wheel, touch, keyboard, selection or explicit navigation input.
- Do not force focus into the transcript when new content arrives.
- Avoid unnecessary entrance motion and respect reduced-motion preferences in product-owned message animations.

## Agent rules

1. Import Message scroller parts and hooks from `@gecko/ui/components/message-scroller`.
2. Place MessageScroller inside a height-constrained parent.
3. Wrap every direct transcript row in MessageScrollerItem.
4. Supply a stable `messageId` for every addressable or visibility-tracked row.
5. Mark only meaningful turn boundaries with `scrollAnchor`.
6. Use `autoScroll` for streamed content and never force the reader back to the live edge after they scroll away.
7. Include MessageScrollerButton when the transcript can overflow.
8. Keep prepend preservation enabled when loading earlier history.
9. Use the exported hooks for navigation and state instead of adding another scrolling library.
10. Do not override the viewport’s transcript semantics, keyboard focusability or the inactive button behaviour.
11. Do not import `@shadcn/react/message-scroller` directly in application code.

## API reference

- [Shadcn Message scroller documentation](https://ui.shadcn.com/docs/components/base/message-scroller)
- [`@shadcn/react` Message scroller API](https://ui.shadcn.com/docs/react/message-scroller)

## Related

- **Message** — complete conversation row rendered inside an item.
- **Bubble** — visible message surface inside Message.
- **Marker** — brief system or progress row that can also be wrapped as an item.
- **Scroll area** — general scrolling without transcript behaviour.
