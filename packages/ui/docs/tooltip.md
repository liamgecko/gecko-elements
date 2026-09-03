# Tooltip

Import: `@gecko/ui/components/tooltip`  
Status: Stable  
Source: `src/components/tooltip.tsx`  
Human documentation: `apps/docs/src/pages/tooltip/index.tsx`

## Purpose

Tooltip displays a short, supplementary label when its trigger is hovered or focused. Use it to clarify an icon-only control or an unfamiliar action without adding persistent text to the layout.

The interface must remain understandable without the tooltip. Use Popover for interactive or longer content and visible page copy for required instructions.

Tooltip wraps Base UI through Shadcn’s composition. Application code must import the Gecko parts rather than either dependency directly.

## Composition

```text
TooltipProvider
└── Tooltip
    ├── TooltipTrigger
    └── TooltipContent
```

Place one TooltipProvider near the application root. TooltipContent owns its portal and positioning layer. The Gecko composition is intentionally arrowless.

## Canonical tooltip

```tsx
<Tooltip>
  <TooltipTrigger
    render={
      <Button variant="outline" size="icon" aria-label="Add to library" />
    }
  >
    <BookmarkPlusIcon />
  </TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>
```

The accessible name of an icon-only trigger must closely match the tooltip label. Do not use Tooltip to supply the only accessible name for a control.

## Provider

```tsx
<TooltipProvider>{children}</TooltipProvider>
```

Gecko defaults to a 150 millisecond opening delay. Keep the shared provider default unless a product interaction has a reviewed timing requirement. Do not wrap every tooltip in a separate provider.

## Positioning

TooltipContent defaults to the top centre of its trigger with a four-pixel side offset. Set placement only when the surrounding layout requires a different preference:

```tsx
<TooltipContent side="right" align="start">
  Add to library
</TooltipContent>
```

Base UI collision handling may flip or shift the tooltip to keep it visible. Treat side and alignment as preferences. Prefer logical inline sides when placement should follow text direction, and do not recreate placement with margins or transforms.

## Interface

### TooltipProvider

| Property     | Type     | Default | Meaning                                           |
| ------------ | -------- | ------- | ------------------------------------------------- |
| `delay`      | `number` | `150`   | Sets the delay before a tooltip opens             |
| `closeDelay` | `number` | `0`     | Sets the delay before a tooltip closes            |
| `timeout`    | `number` | `400`   | Sets the warm-up window shared by nearby tooltips |

### Tooltip

| Property       | Type                                    | Default | Meaning                                  |
| -------------- | --------------------------------------- | ------- | ---------------------------------------- |
| `open`         | `boolean`                               | —       | Controls whether the tooltip is open     |
| `defaultOpen`  | `boolean`                               | `false` | Sets the initial uncontrolled open state |
| `onOpenChange` | `(open: boolean, eventDetails) => void` | —       | Runs when the open state changes         |
| `disabled`     | `boolean`                               | `false` | Prevents the tooltip from opening        |

### TooltipTrigger

| Property     | Type                       | Default | Meaning                                |
| ------------ | -------------------------- | ------- | -------------------------------------- |
| `render`     | `ReactElement \| function` | —       | Uses another element as the trigger    |
| `delay`      | `number`                   | —       | Overrides the provider’s opening delay |
| `closeDelay` | `number`                   | `0`     | Overrides the provider’s closing delay |

### TooltipContent

| Property      | Type                                                             | Default    | Meaning                                     |
| ------------- | ---------------------------------------------------------------- | ---------- | ------------------------------------------- |
| `side`        | `"top" \| "right" \| "bottom" \| "left" \| logical inline sides` | `"top"`    | Sets the preferred side                     |
| `sideOffset`  | `number`                                                         | `4`        | Sets the distance from the trigger          |
| `align`       | `"start" \| "center" \| "end"`                                   | `"center"` | Aligns the content along its selected side  |
| `alignOffset` | `number`                                                         | `0`        | Shifts the content along its alignment axis |

The components also accept their corresponding Base UI properties. TooltipContent accepts Base UI Popup properties plus the positioning properties listed above.

## Accessibility

- Use a native Gecko Button or another keyboard-operable trigger.
- Give icon-only triggers an explicit accessible name that closely matches the tooltip.
- Keep required instructions and essential status information visible outside the tooltip.
- Do not place links, buttons or other interactive content inside TooltipContent.
- Preserve hover and focus behaviour; do not make the interaction hover-only.
- Preserve Base UI collision handling and dismissal behaviour.

## Agent rules

1. Import Tooltip parts from `@gecko/ui/components/tooltip`.
2. Place one TooltipProvider near the application root.
3. Use Tooltip only for short, supplementary, non-interactive content.
4. Give every icon-only trigger an accessible name that closely matches its tooltip label.
5. Keep required instructions visible outside TooltipContent.
6. Treat side and alignment as placement preferences and retain collision handling.
7. Preserve Gecko’s 150 millisecond provider delay and arrowless presentation.
8. Do not restyle TooltipContent in application code.
9. Do not import Shadcn or Base UI Tooltip parts directly.

## API reference

- [Shadcn Tooltip documentation](https://ui.shadcn.com/docs/components/base/tooltip)
- [Base UI Tooltip API](https://base-ui.com/react/components/tooltip)

## Related

- **Popover** — richer or interactive anchored content.
- **Button** — the canonical action trigger.
