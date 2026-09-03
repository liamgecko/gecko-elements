# Context menu

Import: `@gecko/ui/components/context-menu`  
Status: Stable primitive; Data table integration not yet exposed  
Source: `src/components/context-menu.tsx`  
Human documentation: `apps/docs/src/pages/context-menu/index.tsx`

## Purpose

Context menu presents actions for the object someone right-clicks or long-presses. Base UI owns opening, positioning, focus movement, selection semantics and dismissal. Gecko owns the visual treatment and the approved product scope.

Use Context menu exclusively for Data table row actions. Keep the same actions available from the row’s visible actions control so the context menu is an accelerator rather than the only route.

Use Dropdown menu when a visible control opens the actions. Use Popover for supporting controls or content rather than an action list.

## Canonical product pattern

The canonical menu is a short, flat list of actions for one Data table row. It mirrors that row’s visible actions menu and calls the same product handlers.

The current DataTable interface owns its visible Dropdown menu but does not expose a row-level ContextMenuTrigger seam. There is therefore no approved copy-and-paste Context menu integration yet. Ask for component-library direction before changing DataTable or wrapping its generated table markup. Do not attach one Context menu to the complete table because it cannot identify the intended row safely.

The examples in the human documentation demonstrate the primitive’s available parts against a neutral trigger. Treat them as capability references rather than Gecko application recipes.

## Composition

```text
ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel (when useful)
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    └── ContextMenuSub (exceptional)
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
```

Default to a flat list. Add groups only when they clarify distinct action categories. Use a submenu only when a reviewed row-action set cannot remain short and flat.

## Items and actions

Use ContextMenuItem for an action and provide its product handler through `onClick`. Base UI closes an ordinary item after activation by default.

Use `disabled` when an action is visible but unavailable. Provide a nearby product explanation when the reason is not apparent.

Use `variant="destructive"` for a destructive action. For irreversible actions such as deletion, selecting the item opens the canonical Alert dialog; confirmation performs the action. The Context menu item does not delete immediately.

Item icons reinforce the visible text and never replace it. Use the approved icon for the action and mark caller-provided decorative icons with `aria-hidden="true"`.

## Checkbox and radio items

Use ContextMenuCheckboxItem for independent on/off options. Use `checked` with `onCheckedChange` when the product owns the current state, or `defaultChecked` for a genuinely local uncontrolled option.

Use ContextMenuRadioGroup with ContextMenuRadioItem when exactly one value in the group may be active. Every radio item has a stable `value`; the group owns `value` and `onValueChange`.

Checkbox and radio items remain available capabilities, but they have no approved Gecko Data table use case yet. Ask for direction before introducing them into product UI.

## Shortcuts

ContextMenuShortcut displays a keyboard shortcut that the product already implements. It does not register a keyboard listener or run the action.

Keep the action available from the visible row actions control. Display shortcuts using the platform-appropriate symbols and text used elsewhere in the product.

## Accessibility and interaction

- Right-click opens the menu at the pointer.
- Long-press opens it for touch input.
- Base UI moves focus through menu items with the arrow keys and loops by default.
- Enter or Space activates the highlighted item.
- Right Arrow opens a submenu; Left Arrow returns to its parent in left-to-right interfaces.
- Escape closes the active submenu or menu and restores interaction to the trigger.
- Disabled items are skipped and cannot be activated.
- Checkbox and radio state is exposed by Base UI.
- The visible row actions control remains the reliable keyboard and discoverability route.

Use Base UI’s interaction model without adding competing keyboard handlers or ARIA roles.

## Interface

### ContextMenu

| Property       | Type                               | Default | Meaning                              |
| -------------- | ---------------------------------- | ------- | ------------------------------------ |
| `defaultOpen`  | `boolean`                          | `false` | Initial uncontrolled open state      |
| `open`         | `boolean`                          | —       | Controlled open state                |
| `onOpenChange` | `(open: boolean, details) => void` | —       | Reports open-state changes           |
| `disabled`     | `boolean`                          | `false` | Prevents the complete menu opening   |
| `loopFocus`    | `boolean`                          | `true`  | Wraps arrow-key focus at list bounds |

### ContextMenuContent

| Property      | Type                                                                       | Default        | Meaning                                      |
| ------------- | -------------------------------------------------------------------------- | -------------- | -------------------------------------------- |
| `side`        | `"inline-start" \| "inline-end" \| "top" \| "bottom" \| "left" \| "right"` | `"inline-end"` | Preferred logical side of the pointer anchor |
| `align`       | `"start" \| "center" \| "end"`                                             | `"start"`      | Alignment along the preferred side           |
| `sideOffset`  | `number`                                                                   | `0`            | Distance from the pointer anchor             |
| `alignOffset` | `number`                                                                   | `4`            | Offset along the alignment axis              |

Keep the Gecko positioning defaults unless a reviewed layout requires another placement.

### Items

| Component               | Property          | Type                         | Default      | Meaning                                          |
| ----------------------- | ----------------- | ---------------------------- | ------------ | ------------------------------------------------ |
| ContextMenuItem         | `onClick`         | `(event) => void`            | —            | Runs the product-owned action                    |
| ContextMenuItem         | `variant`         | `"default" \| "destructive"` | `"default"`  | Sets action emphasis                             |
| ContextMenuItem         | `disabled`        | `boolean`                    | `false`      | Makes the action unavailable                     |
| ContextMenuItem         | `inset`           | `boolean`                    | `false`      | Aligns text with items that have leading content |
| ContextMenuCheckboxItem | `checked`         | `boolean`                    | uncontrolled | Controlled independent option state              |
| ContextMenuCheckboxItem | `onCheckedChange` | `(checked: boolean) => void` | —            | Reports independent option changes               |
| ContextMenuRadioGroup   | `value`           | `unknown`                    | uncontrolled | Controlled single-choice value                   |
| ContextMenuRadioGroup   | `onValueChange`   | `(value: unknown) => void`   | —            | Reports single-choice changes                    |
| ContextMenuRadioItem    | `value`           | `unknown`                    | required     | Stable single-choice option value                |

Context menu parts also accept their corresponding Base UI Context Menu properties.

## Styling contract

The library owns popup styling, positioning defaults, spacing, radii, shadows, icons, item alignment, selected, destructive and disabled treatments, animations and RTL behaviour.

Use `className` only to integrate the complete trigger region with its parent layout. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, variants, icons, behaviours, keyboard interactions, DataTable integration or styling.

## Agent rules

- Use Context menu only for an approved Data table row integration.
- Mirror the visible row actions and call the same handlers.
- Start with a short, flat item list.
- Open Alert dialog before an irreversible action.
- Display a shortcut only when product code implements it.
- Keep icons paired with visible text.
- Preserve Base UI interaction and state ownership.
- Treat checkbox, radio and submenu configurations as available but unapproved for Gecko Data table use.
- Ask for direction before changing DataTable to expose a row trigger seam.
- Use the trusted docs application only for capability examples; prototype projects are not component guidance.

## Relationship to Shadcn and Base UI

Gecko retains Shadcn’s Base UI composition, submenu, checkbox and radio support, positioning and interaction. Gecko changes design-system styling, uses logical RTL positioning and adds safe decorative treatment to its built-in icons. Product action behaviour remains outside the component library.

## Related components

- **Data table** — the only approved product context for Context menu.
- **Dropdown menu** — the visible route to the same row actions.
- **Alert dialog** — confirms an irreversible action selected from the menu.
- **Popover** — supporting content or controls rather than an action list.
