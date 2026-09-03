# Card

Import: `@gecko/ui/components/card`  
Status: Stable  
Source: `src/components/card.tsx`  
Human documentation: `apps/docs/src/pages/card/index.tsx`

## Purpose

Card groups one related block of information and its optional contextual or workflow actions. It provides a consistent surface, header, body and footer so callers do not coordinate borders, radius, spacing or action alignment.

Use Card for a distinct dashboard block, summary, chart or similarly self-contained piece of page content. Do not use it as the page layout, wrap every line of content, represent a conversational message or group content that has no meaningful relationship.

## Canonical application usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@gecko/ui/components/card";

<Card>
  <CardHeader>
    <CardTitle>Application activity</CardTitle>
    <CardDescription>Applications received this week.</CardDescription>
  </CardHeader>
  <CardContent>{/* related content */}</CardContent>
</Card>;
```

CardTitle renders an `h3` by default. Use that default in normal application Cards.

## Composition

The public compound structure is:

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction (optional)
├── CardContent
└── CardFooter (optional)
```

Use only the parts the content needs. Keep each part in its documented position rather than recreating its spacing with arbitrary elements.

## Header and title

Use CardHeader when the block needs a name. CardTitle owns the visual treatment and renders an `h3` by default:

```tsx
<CardTitle>Account health</CardTitle>
```

Only use `render` to override the element when the surrounding page hierarchy genuinely requires another heading level. Do not add `render` routinely.

Use CardDescription for short supporting context. Keep the description visible by default.

## Header action

CardAction contains one contextual action that applies to the complete Card, such as viewing the full report. It remains a real Button or link.

```tsx
<CardHeader>
  <CardTitle>Applications</CardTitle>
  <CardDescription>Applications received this week.</CardDescription>
  <CardAction>
    <Button variant="outline">View all</Button>
  </CardAction>
</CardHeader>
```

Use CardFooter instead when the actions complete or advance a workflow contained in the Card. Do not place multiple unrelated controls in CardAction.

## Header tooltip

Set `tooltip` on CardHeader only when CardDescription is supplementary and the visible title is sufficient to understand the Card. CardHeader moves that description into the approved help tooltip, available on keyboard focus and hover.

```tsx
<CardHeader tooltip>
  <CardTitle>Desktop traffic</CardTitle>
  <CardDescription>
    Monthly sessions by device type for the current year.
  </CardDescription>
</CardHeader>
```

Do not hide essential instructions, status, errors or information needed to interpret the Card. `tooltip` is boolean; the CardDescription is its content. Callers do not compose their own tooltip around CardTitle.

## Content-only Card

CardContent may be the only child when the surrounding page already provides a clear name and the block needs no actions.

```tsx
<Card>
  <CardContent>{/* related content */}</CardContent>
</Card>
```

Do not omit a title merely to save space when several adjacent Cards would become difficult to distinguish.

## Footer actions

CardFooter contains workflow actions and owns their divider, spacing and end alignment. Put the secondary action first and the single primary action last so visual and keyboard order agree.

```tsx
<CardFooter>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</CardFooter>
```

Normally use one default Button in a CardFooter. Use Alert dialog when an irreversible action requires confirmation.

## Images

Card supports a direct image as its first or last child and applies the matching outer corner radius. Images still require purpose-appropriate alternative text. Do not add manual radius classes.

## Accessibility

- Card is a visual grouping and does not create a landmark or interactive control by itself.
- CardTitle renders a semantic `h3` by default. Override it only when the surrounding page hierarchy requires another level.
- CardAction and CardFooter contain native Buttons or links with clear labels.
- A complete Card is not made clickable with an `onClick` handler. Use a real link or Button for the action.
- Tooltip descriptions are supplementary and remain available from the keyboard.
- Footer DOM order matches its visual order: secondary action before primary action.
- Images have purpose-appropriate alternative text.

## Interface

### Parts

| Part              | Meaning                                          |
| ----------------- | ------------------------------------------------ |
| `Card`            | Complete grouped surface                         |
| `CardHeader`      | Name, description and optional contextual action |
| `CardTitle`       | Visual title rendered as an `h3` by default      |
| `CardDescription` | Short supporting context                         |
| `CardAction`      | One contextual action for the complete Card      |
| `CardContent`     | Main content                                     |
| `CardFooter`      | Workflow actions                                 |

All parts except CardTitle accept the native properties of their default `div`. CardTitle accepts native `h3` properties and an optional `render` escape hatch for a different heading level. CardHeader accepts `tooltip?: boolean`.

Card has one standard density. Do not pass or recreate a small size.

## Styling contract

The library owns the Card background, ring, radius, overflow, section borders, padding, title and description treatment, footer alignment, image corners and tooltip trigger.

Use `className` only for documented layout integration such as width, height or placement in a parent grid. Do not override Card chrome, section padding, borders, radius, title treatment or action alignment. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing parts, props, sizes, behaviours, meanings or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s compound Card parts and direct-image handling. Gecko deliberately uses a compact radius, fixed section spacing, structural header and footer dividers, a larger default title and end-aligned footer actions. Gecko adds the approved supplementary-description tooltip and makes CardTitle a semantic `h3` by default, with render composition retained only as an escape hatch. Gecko has one standard density rather than Shadcn’s optional small size.
