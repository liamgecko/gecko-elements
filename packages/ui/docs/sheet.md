# Sheet

Import: `@gecko/ui/components/sheet`  
Status: Stable  
Source: `src/components/sheet.tsx`  
Human documentation: `apps/docs/src/pages/sheet/index.tsx`

## Purpose

Sheet presents complementary content or a short task in a panel that enters from an edge of the screen. It preserves more visual context than a centred Dialog while Base UI Dialog supplies modal state, focus containment, dismissal and accessible labelling.

Use Sheet for record details, preferences and secondary tasks that belong beside the current page. Use Dialog for focused setup workflows and Alert dialog for consequential decisions or confirmations. Use Sidebar for persistent application navigation.

Sheet follows Shadcn’s composition and wraps Base UI Dialog. Application code must import the Gecko component rather than either dependency directly.

## Canonical application usage

```tsx
import { Button } from "@gecko/ui/components/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@gecko/ui/components/sheet";

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>
    Edit preferences
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Notification preferences</SheetTitle>
      <SheetDescription>
        Choose which updates you want to receive.
      </SheetDescription>
    </SheetHeader>
    <SheetBody>Notification controls</SheetBody>
    <SheetFooter className="border-t">
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save preferences</Button>
      </div>
    </SheetFooter>
  </SheetContent>
</Sheet>;
```

The product owns task state, validation, submission and action results. Sheet owns modal behaviour, structure, viewport containment, internal scrolling and presentation.

## Composition

```text
Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    ├── SheetBody
    └── SheetFooter
```

Every Sheet has a concise `SheetTitle`, normally inside `SheetHeader`, because Base UI uses it as the dialog’s accessible name. Add `SheetDescription`, `SheetBody` and `SheetFooter` when the content requires them.

## Body and scrolling

`SheetBody` composes Gecko Scroll area and is the scrolling region for task content. Keep the header and footer as siblings so the title and actions remain available while long content scrolls.

Do not add another scroll container around or inside `SheetBody`. Do not place task actions at the end of long body content; use `SheetFooter`.

## Sides

Set `side` on `SheetContent`:

```tsx
<SheetContent side="top|right|bottom|left">...</SheetContent>
```

The default is `right`. Use a physical edge that matches the location and relationship of the complementary content.

## Sizes

Set `size` on a left or right `SheetContent`. The default is `md`.

| Size   | Maximum width                  | Use                               |
| ------ | ------------------------------ | --------------------------------- |
| `sm`   | `24rem`                        | Short details or compact controls |
| `md`   | `32rem`                        | Standard secondary tasks          |
| `lg`   | `42rem`                        | Denser forms or record details    |
| `xl`   | `56rem`                        | Complex supporting content        |
| `full` | Viewport minus the Sheet inset | Full-width supporting workspace   |

All sizes remain inside the viewport. Top and bottom sheets use the available inline width and do not use the width scale.

## Overlay

`SheetContent` shows the backdrop by default. Set `hideOverlay` when the visual backdrop is not appropriate:

```tsx
<SheetContent hideOverlay>...</SheetContent>
```

`hideOverlay` changes presentation only. Sheet remains modal by default: focus stays within the Sheet, page scrolling is locked and the background is not interactive. Do not use the absence of a backdrop to communicate non-modal behaviour.

When a product requirement genuinely needs background interaction, set `modal={false}` on `Sheet` deliberately and verify focus, dismissal and interaction behaviour in the application. Do not infer `modal={false}` from `hideOverlay`.

## Accessibility

- Include one `SheetTitle` in every Sheet to provide its accessible name.
- Retain a close action inside every modal Sheet. The default corner close action satisfies this requirement.
- Keep keyboard focus containment, Escape dismissal and focus restoration supplied by Base UI.
- Use `SheetDescription` for concise supporting context and keep task-specific instructions beside their controls.
- Keep long content in `SheetBody` so it remains reachable without moving the title or actions off screen.
- Sheet motion respects reduced-motion preferences.

## Interface

### Parts

| Part               | Meaning                                                     |
| ------------------ | ----------------------------------------------------------- |
| `Sheet`            | Root state and modal behaviour                              |
| `SheetTrigger`     | Opens the Sheet                                             |
| `SheetContent`     | Portal, backdrop, panel, side, size and corner close action |
| `SheetHeader`      | Groups the title and description                            |
| `SheetTitle`       | Required accessible and visible title                       |
| `SheetDescription` | Supporting context                                          |
| `SheetBody`        | Scrollable task content using Gecko Scroll area             |
| `SheetFooter`      | Task actions kept outside the scrolling body                |
| `SheetClose`       | Low-level close primitive for a custom close action         |

### Gecko properties

| Property          | Component      | Type                                     | Default   | Meaning                                                        |
| ----------------- | -------------- | ---------------------------------------- | --------- | -------------------------------------------------------------- |
| `side`            | `SheetContent` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Selects the physical entry edge                                |
| `size`            | `SheetContent` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`    | Selects an approved width for left and right sheets            |
| `showCloseButton` | `SheetContent` | `boolean`                                | `true`    | Shows the corner close action                                  |
| `hideOverlay`     | `SheetContent` | `boolean`                                | `false`   | Visually removes the backdrop without changing modal behaviour |

The compound parts also accept their corresponding Base UI or native element properties. `SheetContent` composes the portal and backdrop; application code does not compose those implementation parts separately.

## Styling contract

The library owns the backdrop, panel inset, radius, border, shadow, motion, side placement, width scale, viewport containment, scrolling, spacing, typography and close control. Preserve the documented footer divider and right-aligned action group when a footer is present.

Use `className` only for a documented layout integration that cannot be expressed by the component interface. Do not add width utilities to Sheet in application code; select the nearest approved `size` instead. Request a library change when a legitimate treatment is missing.

## Agent rules

1. Import Sheet and its parts from `@gecko/ui/components/sheet`.
2. Include one `SheetTitle` in every Sheet.
3. Keep long task content inside `SheetBody` and actions inside `SheetFooter`.
4. Choose the smallest approved size that comfortably presents the content.
5. Use Alert dialog rather than Sheet for deletion, irreversible actions and consequential confirmation.
6. Preserve the default close action unless another visible `SheetClose` remains inside the panel.
7. Treat `hideOverlay` as a visual choice only; it does not enable background interaction.
8. Set `modal={false}` only for a confirmed product requirement and verify the resulting interaction in the application.
9. Preserve the canonical footer divider and right-aligned action group.
10. Do not restyle Sheet geometry or scrolling in application code.
11. Do not import Shadcn Sheet or Base UI Dialog directly in application code.

## API reference

- [Shadcn Sheet documentation](https://ui.shadcn.com/docs/components/base/sheet)
- [Base UI Dialog API](https://base-ui.com/react/components/dialog)

## Related

- **Dialog** — focused modal setup or editing task.
- **Alert dialog** — consequential decision or confirmation.
- **Sidebar** — persistent application navigation.
- **Scroll area** — underlying scrolling treatment used by `SheetBody`.
