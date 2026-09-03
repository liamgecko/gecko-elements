# Dropdown menu

Import: `@gecko/ui/components/dropdown-menu`  
Status: Stable compound component  
Source: `src/components/dropdown-menu.tsx`  
Human documentation: `apps/docs/src/pages/dropdown-menu/index.tsx`

## Purpose

Dropdown menu presents a short list of actions from a visible trigger. Base UI owns opening, positioning, focus movement, selection semantics and dismissal. Gecko owns the visual treatment, searchable-menu behaviour and item variants.

Use Dropdown menu for button-triggered actions such as account menus and Data table row actions. Use Select or Combobox for a form value, Context menu for actions opened by right-click or long-press, and Popover for supporting content that is not an action list.

## Canonical pattern

```tsx
<DropdownMenu>
  <DropdownMenuTrigger
    render={
      <Button variant="outline" dropdown>
        Open dropdown
      </Button>
    }
  />
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={onDuplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onClick={onDelete}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Product code owns action handlers and application state. The component library does not perform product operations.

## Composition

```text
DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
```

`DropdownMenuContent` and `DropdownMenuSubContent` create their own portals. Do not wrap them in `DropdownMenuPortal` in normal application code.

## Items

- Use `DropdownMenuItem` for an action and pass the product handler to `onClick`.
- Use `variant="destructive"` for a high-risk action. Open an Alert dialog before an irreversible operation.
- Use `disabled` when an action is unavailable.
- Add an icon only when it reinforces the visible item label.
- Use `DropdownMenuShortcut` only when the product implements the displayed shortcut. It is a visual hint, not a keyboard binding.
- An Avatar may lead an item when the item represents a person.

## Checkbox and radio items

Use `DropdownMenuCheckboxItem` for independent selections where zero, one or several items may be checked. A checked item displays a check and changes to an X on pointer hover or keyboard focus to communicate that activating it again removes the selection. This icon change is visual only; Base UI retains checkbox role, state and activation.

Use `checked` and `onCheckedChange` when product state is controlled. Use `defaultChecked` only for local uncontrolled state.

Use `DropdownMenuRadioGroup` and `DropdownMenuRadioItem` when exactly one option must remain selected. Radio items are not clearable. If the product permits no selection, add a separate, visibly labelled clear action outside the radio group.

## Search

Set `searchable` on `DropdownMenu` for a long action list. The component inserts and focuses the search field, filters item text, and resets the query when the menu closes.

```tsx
<DropdownMenu
  searchable
  searchPlaceholder="Search agents..."
  searchLabel="Search agents"
>
  <DropdownMenuTrigger
    render={<Button variant="outline">Assign agent</Button>}
  />
  <DropdownMenuContent>
    {agents.map((agent) => (
      <DropdownMenuCheckboxItem
        key={agent.id}
        checked={selectedAgentIds.includes(agent.id)}
        onCheckedChange={(checked) => updateAgent(agent.id, checked)}
        searchValue={agent.name}
      >
        <Avatar name={agent.name} size="md">
          <AvatarImage src={agent.avatarUrl} />
        </Avatar>
        {agent.name}
      </DropdownMenuCheckboxItem>
    ))}
    <DropdownMenuEmpty>No agents found.</DropdownMenuEmpty>
  </DropdownMenuContent>
</DropdownMenu>
```

`searchPlaceholder` becomes the search field’s accessible name by default. Set `searchLabel` when the accessible name should differ. Use `searchValue` when visible item content does not provide useful searchable text, particularly for composed content.

`DropdownMenuSubContent` supports its own `searchable`, `searchPlaceholder` and `searchLabel` props. Its query is scoped independently from the parent menu.

## Keyboard and accessibility

- Enter, Space, Arrow Down or Arrow Up opens the menu from its trigger according to Base UI behaviour.
- Arrow keys move through enabled menu items; Tab leaves the menu.
- When search is present, focus starts in the search field. Arrow Down moves to the first visible item and Arrow Up to the last.
- Escape closes the current menu and restores focus through Base UI.
- Enter or Space activates the focused item.
- Right Arrow opens a submenu and Left Arrow returns to its parent in left-to-right interfaces.
- Checkbox and radio roles, checked state and disabled state come from Base UI.
- Built-in icons are decorative and hidden from assistive technology.

Do not add competing menu roles, tab stops or keyboard handlers in product code.

## Interface

### DropdownMenu

| Property            | Type                      | Default             | Meaning                                                |
| ------------------- | ------------------------- | ------------------- | ------------------------------------------------------ |
| `searchable`        | `boolean`                 | `false`             | Adds an automatically managed search field             |
| `searchPlaceholder` | `string`                  | `"Search..."`       | Sets placeholder text and the fallback accessible name |
| `searchLabel`       | `string`                  | `searchPlaceholder` | Overrides the search field’s accessible name           |
| `open`              | `boolean`                 | uncontrolled        | Controlled open state                                  |
| `onOpenChange`      | `(open, details) => void` | —                   | Reports open-state changes                             |
| `disabled`          | `boolean`                 | `false`             | Prevents the complete menu opening                     |

### Content

| Property      | Type                                                                       | Default    | Meaning                            |
| ------------- | -------------------------------------------------------------------------- | ---------- | ---------------------------------- |
| `side`        | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Preferred placement side           |
| `align`       | `"start" \| "center" \| "end"`                                             | `"start"`  | Alignment along the placement side |
| `sideOffset`  | `number`                                                                   | `4`        | Distance from the trigger          |
| `alignOffset` | `number`                                                                   | `0`        | Offset along the alignment axis    |

### Items

| Component                     | Property          | Type                         | Default           | Meaning                        |
| ----------------------------- | ----------------- | ---------------------------- | ----------------- | ------------------------------ |
| DropdownMenuItem              | `variant`         | `"default" \| "destructive"` | `"default"`       | Sets action emphasis           |
| DropdownMenuItem              | `onClick`         | `(event) => void`            | —                 | Runs the product action        |
| Item, CheckboxItem, RadioItem | `disabled`        | `boolean`                    | `false`           | Makes the item unavailable     |
| Item, CheckboxItem, RadioItem | `searchValue`     | `string`                     | visible item text | Overrides search matching text |
| DropdownMenuCheckboxItem      | `checked`         | `boolean`                    | uncontrolled      | Controlled independent state   |
| DropdownMenuCheckboxItem      | `onCheckedChange` | `(checked, details) => void` | —                 | Reports checkbox state changes |
| DropdownMenuRadioGroup        | `value`           | `unknown`                    | uncontrolled      | Controlled single-choice value |
| DropdownMenuRadioGroup        | `onValueChange`   | `(value, details) => void`   | —                 | Reports the selected value     |
| DropdownMenuRadioItem         | `value`           | `unknown`                    | required          | Identifies the option          |

All parts also accept their corresponding Base UI Menu properties.

## Styling contract

The library owns popup positioning defaults, spacing, radii, shadow, item alignment, focus, selected, destructive and disabled treatments, built-in icons, motion and RTL behaviour.

Use `className` only for integration constraints such as an approved menu width or maximum height. Do not restyle individual item states in application code; request a library change when a legitimate treatment is missing.

## Agent rules

- Start with the canonical flat action list.
- Retain Avatar items where a menu selects or acts on people.
- Add search only for a list that benefits from filtering; include `DropdownMenuEmpty`.
- Use checkbox items for zero-or-more selection and radio items for exactly-one selection.
- Use a separate clear action when a radio-backed product choice permits no value.
- Keep all product behaviour in handlers and state outside the library.
- Keep icons paired with visible text and mark caller-provided decorative icons `aria-hidden="true"`.
- Preserve Base UI keyboard, focus and selection semantics.
- Do not add props, variants, examples or styling without explicit product-library direction.

## Relationship to Shadcn and Base UI

Gecko retains Shadcn’s Base UI composition and interaction model. Gecko adds design-system styling, logical RTL positioning, searchable root and submenu content, automatic empty-state handling, Avatar guidance and the checked-checkbox removal affordance.

## Related components

- **Context menu** — actions opened by right-click or long-press.
- **Select** — one value in a form.
- **Combobox** — a searchable form value.
- **Popover** — supporting content or controls.
- **Alert dialog** — confirms irreversible actions.
