# Scroll area

Import: `@gecko/ui/components/scroll-area`  
Status: Stable  
Source: `src/components/scroll-area.tsx`  
Human documentation: `apps/docs/src/pages/scroll-area/index.tsx`

## Purpose

Scroll area provides a styled scrollbar for content that must scroll inside a deliberately bounded region. Use it for constrained sidebars, panels, pickers and lists.

Keep native document scrolling for the primary page unless the product shell deliberately owns that scroll container. Use Message scroller for conversation transcripts that require position management and automatic scrolling.

Scroll area wraps Base UI through Shadcn’s composition. Application code must import the Gecko parts rather than importing either dependency directly.

## Composition

```text
ScrollArea
└── ScrollBar
```

ScrollArea renders the viewport, vertical scrollbar and corner internally. Compose ScrollBar when another direction is required.

## Canonical vertical region

Give the root a constrained block size so its content can overflow:

```tsx
<ScrollArea className="h-72 rounded-lg border">{content}</ScrollArea>
```

Do not add overflow utilities to the child content. The internal viewport owns scrolling.

## Horizontal region

Keep the outer width responsive and compose the horizontal scrollbar explicitly:

```tsx
<ScrollArea className="w-full max-w-96 whitespace-nowrap rounded-lg border">
  <div className="flex w-max gap-4 p-4">{items}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

Use logical layout and `gap` so the content remains correct in right-to-left interfaces. Do not use horizontal scrolling when content can wrap without losing meaning.

## Layout

- Constrain at least one axis before expecting overflow.
- In flex and grid shells, ensure the relevant ancestors can shrink, normally with `min-h-0` or `min-w-0`.
- Avoid nested scroll regions unless each boundary and purpose is clear.
- Keep interactive content in logical DOM order.
- Do not use Scroll area as a blanket replacement for native page scrolling.

## Interface

### ScrollArea

| Property    | Type              | Default | Meaning                                            |
| ----------- | ----------------- | ------- | -------------------------------------------------- |
| `children`  | `React.ReactNode` | —       | Renders content inside the scrollable viewport     |
| `className` | `string`          | —       | Sets the root dimensions and approved presentation |

ScrollArea accepts Base UI Scroll Area Root properties.

### ScrollBar

| Property      | Type                         | Default      | Meaning                                                          |
| ------------- | ---------------------------- | ------------ | ---------------------------------------------------------------- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Selects the direction controlled by the scrollbar                |
| `keepMounted` | `boolean`                    | `false`      | Keeps the scrollbar mounted when its direction does not overflow |
| `className`   | `string`                     | —            | Extends the scrollbar presentation                               |

ScrollBar accepts Base UI Scroll Area Scrollbar properties.

## Accessibility

- Allow Base UI to manage whether the viewport belongs in the keyboard tab order. It makes overflowing viewports focusable and leaves non-scrollable viewports out of the sequence.
- Preserve the viewport focus ring.
- Gecko scrollbars remain hidden until the region is hovered or receives focus. Do not override that interaction in application code.
- Keep content in a meaningful reading and tab order.
- Do not apply presentation roles or a fixed tab index to the viewport.
- Avoid placing one independently scrolling region inside another unless the relationship is clear.

## Agent rules

1. Import ScrollArea and ScrollBar from `@gecko/ui/components/scroll-area`.
2. Use Scroll area only for deliberately bounded regions.
3. Keep native document scrolling unless the product shell owns a separate scroll container.
4. Set a constrained height or width on the root.
5. Compose a horizontal ScrollBar for horizontal overflow.
6. Preserve Base UI’s overflow-aware keyboard focus behaviour.
7. Preserve Gecko’s hover and focus-within scrollbar visibility treatment.
8. Keep layouts responsive and use logical spacing for right-to-left support.
9. Use Message scroller for managed conversation transcripts.
10. Do not import Shadcn or Base UI Scroll Area directly in application code.

## API reference

- [Shadcn Scroll area documentation](https://ui.shadcn.com/docs/components/base/scroll-area)
- [Base UI Scroll Area API](https://base-ui.com/react/components/scroll-area)

## Related

- **Message scroller** — conversation scrolling with automatic position management.
- **Separator** — a visual boundary between rows inside scrollable content.
