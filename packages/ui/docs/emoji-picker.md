# Emoji picker

Import: `@gecko/ui/components/emoji-picker`  
Status: Stable compound component  
Source: `src/components/emoji-picker.tsx`  
Human documentation: `apps/docs/src/pages/emoji-picker/index.tsx`  
Approved implementation dependency: `frimousse`

## Purpose

Emoji picker lets someone choose an emoji from a full searchable panel or a short reaction tray. Gecko owns the product interface, visual treatment, Popover composition and tray defaults. Frimousse owns emoji data, search, the virtualised grid, emoji metadata, skin tones and grid keyboard interaction.

Use the full picker to insert an emoji into message text. Use the reaction tray for Message reactions. Use Popover directly when the overlay does not select emoji.

Application code imports this Gecko module. `frimousse` is an internal implementation dependency and is not an application interface.

## Canonical full picker

```tsx
<EmojiPicker onEmojiSelect={insertEmoji}>
  <EmojiPickerTrigger
    render={
      <Button variant="ghost" size="icon" aria-label="Open emoji picker" />
    }
  >
    <Smile aria-hidden="true" />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>
```

`onEmojiSelect` receives the selected emoji string and the library closes the overlay. Product code owns inserting it at the correct cursor position.

## Canonical reaction tray

```tsx
<EmojiPicker defaultView="tray" onEmojiSelect={addReaction}>
  <EmojiPickerTrigger
    render={<Button variant="ghost" size="icon-sm" aria-label="Add reaction" />}
  >
    <SmilePlus aria-hidden="true" />
  </EmojiPickerTrigger>
  <EmojiPickerContent />
</EmojiPicker>
```

The tray uses `DEFAULT_TRAY_EMOJIS` and includes a control for opening the full picker. Set `showPickerFromTray={false}` only when the supplied `trayEmojis` are the complete approved choice.

## Composition

```text
EmojiPicker
├── EmojiPickerTrigger
└── EmojiPickerContent
    ├── EmojiPickerPanel (picker view)
    └── EmojiPickerTray (tray view)
        └── EmojiPickerPanel (optional full picker)
```

`EmojiPickerContent` renders the correct internal view when it has no children. This is the canonical application composition. `EmojiPickerPanel` and `EmojiPickerTray` remain exported for reviewed compositions that cannot use the automatic view.

## Views

| View     | Product use                       | Default placement  |
| -------- | --------------------------------- | ------------------ |
| `picker` | Insert an emoji into message text | Bottom, centred    |
| `tray`   | Add a reaction to a Message       | Top, start-aligned |

`side` and `align` on `EmojiPickerContent` override the placement through the Gecko Popover interface. Use an override only when the surrounding layout requires it; the human documentation visually demonstrates every supported position.

## State and selection

Use `open` with `onOpenChange` for controlled state. Use `defaultOpen` only for an initially open uncontrolled picker. Omit all three for the standard internally managed overlay.

Use `onEmojiSelect` for the product operation. Selection from the panel or tray invokes the same callback and closes the outer picker.

`trayEmojis` accepts emoji strings in display order. Keep the default set unless product requirements specify another reviewed set.

## Keyboard and accessibility

- The trigger is a Button and requires an accessible name when icon-only.
- Popover owns opening, dismissal and focus restoration.
- Search has the library-owned accessible name “Search emoji”.
- Frimousse exposes the full picker as a grid, labels each emoji and announces the active emoji.
- Arrow keys move through the emoji grid; Enter selects the active emoji.
- The reaction tray is one toolbar Tab stop. Arrow keys move between reactions, Home moves to the first and End to the last. Enter or Space selects.
- Built-in decorative icons and visible emoji duplicates are hidden from assistive technology where an accessible label already supplies the action.

Preserve these roles and keyboard paths. Product code supplies trigger labels and does not add competing focus management.

## Interface

### EmojiPicker

| Property             | Type                      | Default               | Meaning                                  |
| -------------------- | ------------------------- | --------------------- | ---------------------------------------- |
| `defaultView`        | `"picker" \| "tray"`      | `"picker"`            | Chooses the automatically rendered view  |
| `trayEmojis`         | `readonly string[]`       | `DEFAULT_TRAY_EMOJIS` | Sets quick-reaction choices              |
| `showPickerFromTray` | `boolean`                 | `true`                | Adds the full-picker control to the tray |
| `onEmojiSelect`      | `(emoji: string) => void` | —                     | Runs the product selection operation     |
| `open`               | `boolean`                 | uncontrolled          | Controls the outer Popover               |
| `defaultOpen`        | `boolean`                 | `false`               | Sets its initial uncontrolled state      |
| `onOpenChange`       | `(open: boolean) => void` | —                     | Reports outer Popover state changes      |

### EmojiPickerContent

| Property      | Type                           | Default        | Meaning                                  |
| ------------- | ------------------------------ | -------------- | ---------------------------------------- |
| `side`        | Popover side                   | view-dependent | Overrides the placement side             |
| `align`       | `"start" \| "center" \| "end"` | view-dependent | Overrides alignment                      |
| `sideOffset`  | `number`                       | `8`            | Sets distance from the trigger           |
| `alignOffset` | `number`                       | `0`            | Offsets content along its alignment axis |

### EmojiPickerTray

| Property             | Type                      | Default      | Meaning                             |
| -------------------- | ------------------------- | ------------ | ----------------------------------- |
| `pickerOpen`         | `boolean`                 | uncontrolled | Controls the nested full picker     |
| `onPickerOpenChange` | `(open: boolean) => void` | —            | Reports nested picker state changes |

## Data loading

Frimousse currently loads `emojibase-data` at runtime from its default jsDelivr URL and caches the result in browser storage. This is an approved existing behaviour, not a general permission for components to introduce runtime CDNs.

A Content Security Policy, privacy, offline-support or availability requirement may require self-hosting that data. Treat that as a library-level decision: update this component and the approved dependency policy rather than configuring Frimousse independently in application code.

## Styling contract

The library owns panel and tray dimensions, responsive viewport containment, Popover chrome, spacing, emoji grid, search, category headings, active and hover states, footer, reaction buttons, focus treatment and skin-tone control.

Use `className` only to place the complete picker in its parent layout. Use `side` and `align` for supported positioning. Request a library change when a legitimate internal treatment is missing.

## Agent rules

- Import Emoji picker from `@gecko/ui`; keep Frimousse behind this interface.
- Use `picker` for inserting emoji and `tray` for reactions.
- Connect `onEmojiSelect` to the product operation.
- Start with the default tray emoji set and placement.
- Retain the library-owned panel, search, grid, footer and keyboard behaviour.
- Consult `packages/ui/docs/dependencies.md` before changing the underlying dependency or data-hosting model.
- Obtain explicit consent before adding views, props, tray sets, labels, styling or runtime data sources.

## Related components

- **Message** — owns the reaction context.
- **Reply box** — inserts emoji into message text.
- **Popover** — owns overlay positioning and dismissal.
- **Button** — provides the trigger and reaction controls.
