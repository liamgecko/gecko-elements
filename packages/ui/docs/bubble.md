# Bubble

Import: `@gecko/ui/components/bubble`  
Status: Stable  
Source: `src/components/bubble.tsx`  
Human documentation: `apps/docs/src/pages/bubble/index.tsx`

## Purpose

Bubble renders the spoken content of a message in a conversation. It owns the message surface, wrapping, alignment, optional actions, and applied emoji reactions.

Compose Bubble inside Message for application conversations. Message coordinates speaker identity, alignment, treatment, metadata, status, and avatars. Use Bubble directly only for a deliberately lightweight conversation that does not require those features.

Use Card for grouped page content, Tooltip for a short contextual hint, Alert for a page-level notice, and MessageMeta for message status or delivery information.

## Canonical application usage

```tsx
import { Bubble, BubbleContent } from "@gecko/ui/components/bubble";
import {
  Message,
  MessageContent,
  MessageMeta,
} from "@gecko/ui/components/message";

<Message variant="user">
  <MessageContent>
    <Bubble>
      <BubbleContent>
        <div>Could you update my application?</div>
        <MessageMeta timestamp={message.sentAt} />
      </BubbleContent>
    </Bubble>
  </MessageContent>
</Message>;
```

Inside Message, omit Bubble `variant` and `align` unless a documented exceptional treatment requires an override. Message applies the approved mapping:

| Message variant | Bubble treatment                          | Alignment |
| --------------- | ----------------------------------------- | --------- |
| `user`          | `secondary`                               | `start`   |
| `agent`         | `default`                                 | `end`     |
| `ai`            | `ghost`                                   | `end`     |
| `note`          | `secondary` with Message’s note treatment | `end`     |

## Composition

The approved anatomy is:

```text
Bubble
├── BubbleContent
│   ├── BubbleHeader
│   │   ├── BubbleAuthor
│   │   └── BubbleTimestamp
├── BubbleActions
└── BubbleReactions
```

`BubbleHeader`, `BubbleAuthor`, and `BubbleTimestamp` are optional live-chat parts inside `BubbleContent`. `BubbleActions` and `BubbleReactions` are optional siblings of `BubbleContent`.

## Variants

The approved variants are a closed set:

| Variant       | Use                                                                                   |
| ------------- | ------------------------------------------------------------------------------------- |
| `default`     | Team or agent message; selected automatically by `Message variant="agent"`            |
| `secondary`   | Customer or external-user message; selected automatically by `Message variant="user"` |
| `ghost`       | AI response or deliberately unframed rich conversational content                      |
| `outline`     | Quiet bordered conversational treatment on a visually busy surface                    |
| `destructive` | Failed conversational action, accompanied by explanatory text                         |

Choose a variant from the speaker or meaning, not visual preference. Message should own the normal speaker mapping. Agents must obtain explicit user consent before adding or changing variants, props, meanings, or visual treatments.

## Standalone alignment

Standalone Bubble defaults to `align="start"`. Use `start` for customer messages and `end` for team, agent, AI, or note messages.

```tsx
<Bubble variant="secondary">
  <BubbleContent>Customer message</BubbleContent>
</Bubble>

<Bubble align="end">
  <BubbleContent>Team message</BubbleContent>
</Bubble>
```

Prefer Message for application conversations so callers do not coordinate alignment manually.

## Width

Bubble sizes to its content and wraps at 85% of its container by default. Set `fullWidth` in a narrow panel where the normal remaining gap wastes necessary space. This raises the maximum width to 100%; it does not force a short Bubble to fill the row.

## Groups

Use `BubbleGroup` for consecutive standalone bubbles from the same speaker. Set alignment on each Bubble, not on BubbleGroup.

Use `MessageGroup` when grouping complete application messages.

## Actions

Use `BubbleActions` for compact actions such as Reply or Add reaction. Place it after `BubbleContent`. Its default position follows the Bubble alignment and sits outside the message surface.

```tsx
<BubbleActions aria-label="Message actions">
  <Button variant="ghost" size="icon-xs" aria-label="Reply">
    <ReplyIcon />
  </Button>
  <Button variant="ghost" size="icon-xs" aria-label="Add reaction">
    <SmilePlusIcon />
  </Button>
</BubbleActions>
```

Actions appear on hover for hover-capable pointers, remain visible while focus is within the Bubble, and remain visible on devices without hover. Every icon-only control requires a contextual accessible name.

Use the optional `side` override only when the documented outside position is unsuitable for a specific approved composition.

## Reactions

Use `BubbleReactions` for emoji that people have applied to a message. It attaches to the bottom edge and inherits the Bubble alignment by default.

```tsx
<BubbleReactions
  role="img"
  aria-label="Reactions: thumbs up and clapping hands"
>
  <span aria-hidden>👍</span>
  <span aria-hidden>👏</span>
</BubbleReactions>
```

Supply a concise accessible label for the complete reaction set and hide duplicated emoji glyphs from assistive technology. Override `align` only when the inherited anchor is intentionally unsuitable.

Tooltip and Popover composition is supported by the open children interface but is not a promoted Bubble pattern. Use MessageMeta for ordinary message status, read state, time, and information controls.

## Long content

Compose Collapsible inside BubbleContent when a long message needs an explicit Show more and Show less control. Keep the full message in the DOM and visually clamp the closed state so the Bubble retains a stable intrinsic width and assistive technology receives the complete message. Use a native Button through CollapsibleTrigger.

## Accessibility

- Bubble is a visual layout primitive; the surrounding Message supplies message-level meaning and context.
- Interactive BubbleContent rendered as a button or link preserves native semantics through its `render` property and includes visible focus treatment.
- BubbleActions controls remain keyboard accessible and visible during focus; devices without hover see them persistently.
- Icon-only actions have contextual accessible names.
- BubbleReactions exposes a text alternative for emoji reactions.
- Destructive content explains the failure in text rather than relying on colour.
- Long content wraps and the component remains usable under zoom and text enlargement.

## Interface

### Parts

| Part              | Meaning                                               |
| ----------------- | ----------------------------------------------------- |
| `BubbleGroup`     | Stack of consecutive standalone bubbles               |
| `Bubble`          | Message surface, alignment, width and variant context |
| `BubbleContent`   | Message body; supports Base UI `render` composition   |
| `BubbleHeader`    | Optional live-chat author and timestamp row           |
| `BubbleAuthor`    | Live-chat author label                                |
| `BubbleTimestamp` | Semantic live-chat `time` element                     |
| `BubbleActions`   | Compact message actions outside the surface           |
| `BubbleReactions` | Applied emoji attached to the bottom edge             |

### Bubble properties

| Property                | Type                                                                | Default                        | Meaning                               |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------ | ------------------------------------- |
| `variant`               | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive"` | Message mapping or `"default"` | Approved surface treatment            |
| `align`                 | `"start" \| "end"`                                                  | Message mapping or `"start"`   | Inline position                       |
| `fullWidth`             | `boolean`                                                           | `false`                        | Raises maximum width from 85% to 100% |
| Native `div` properties | `React.ComponentProps<"div">`                                       | —                              | Content and semantic integration      |

`BubbleActions` accepts `side="start" | "end"`. `BubbleReactions` accepts `align="start" | "end"`. All parts accept the native properties of their rendered element. BubbleContent additionally accepts Base UI’s `render` composition property.

## Styling contract

The library owns surface colour, border, radius, spacing, wrapping, maximum width, action positioning, reaction positioning, hover treatment, focus treatment, and Message integration.

Use `className` only for layout integration explicitly required by a documented composition, such as preserving whitespace in long preformatted message text. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, variants, behaviours, meanings, or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI Bubble structure, render composition, alignment, grouped bubbles, and reactions. Gecko applies its approved conversation colours and density, adds Message-aware automatic mapping, `fullWidth`, live-chat header parts, and BubbleActions. Gecko intentionally omits Shadcn’s `muted` and `tinted` variants and does not promote Tooltip or Popover as Bubble patterns.
