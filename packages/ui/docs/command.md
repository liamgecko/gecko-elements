# Command

Import: `@gecko/ui/components/command`  
Status: Available, not adopted in Gecko product UI  
Source: `src/components/command.tsx`  
Human documentation: `apps/docs/src/pages/command/index.tsx`

## Purpose

Command presents a searchable list of actions. It uses cmdk for filtering, selection and keyboard navigation, and Gecko owns its presentation and dialog composition.

Use Command when someone must search a sizeable set of actions. Use Combobox when the result becomes a form value. Use Dropdown menu for a short set of actions attached to a visible control.

Command has not been adopted in Gecko product UI. Obtain product approval before introducing it, especially as an application-wide palette.

## Canonical configuration

After product adoption is approved, start with CommandDialog. The product owns the trigger, open state and action handlers.

```tsx
const [open, setOpen] = useState(false)

<Button variant="outline" onClick={() => setOpen(true)}>
  Open command
</Button>

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command label="Quick actions">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar" onSelect={openCalendar}>
          <Calendar aria-hidden="true" />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem value="settings" onSelect={openSettings}>
          <Settings aria-hidden="true" />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>
```

Use the inline Command composition only when searchable actions are deliberately part of the page surface. It is an available composition, not Gecko’s canonical default.

## Action ownership

Every CommandItem in application code has an explicit, stable `value` and a product-owned `onSelect` handler. Keep the visible label concise and use `keywords` only for genuine alternative search terms.

Command owns filtering and selection mechanics. The product owns what each action does, whether selecting it closes the dialog, and any navigation or state change it triggers.

CommandShortcut is a visual hint only. The product registers the corresponding keyboard shortcut and keeps the action available without that shortcut.

## Accessible names and content

Command defaults to `label="Command menu"`, and CommandList defaults to `label="Suggestions"`, so omitted labels remain safely named. Override the Command label with a concise contextual name such as `Quick actions` or `Page actions` whenever the purpose is more specific.

CommandDialog defaults to the accessible title “Command Palette” and description “Search for a command to run...”. Override both when the dialog has a more specific purpose.

Use CommandGroup headings for meaningful categories and CommandEmpty for a useful no-results message. Mark item icons as decorative when the visible item text already names the action.

## Keyboard behaviour

- Typing filters the items.
- Up Arrow and Down Arrow move through matching items.
- Home and End move to the first and last matching items.
- Enter runs the selected item.
- Escape closes CommandDialog through the dialog primitive.
- Tab follows the page’s normal focus order.
- `loop` defaults to `false`; enable it only when wrapping navigation is intentional.

cmdk owns this interaction model. Application code does not add competing keyboard handlers or ARIA roles.

## Interface

### Command

| Property        | Type                      | Default          | Meaning                                          |
| --------------- | ------------------------- | ---------------- | ------------------------------------------------ |
| `label`         | `string`                  | `"Command menu"` | Accessible name for the searchable command menu  |
| `value`         | `string`                  | uncontrolled     | Controlled selected command value                |
| `onValueChange` | `(value: string) => void` | none             | Reports keyboard or pointer selection changes    |
| `loop`          | `boolean`                 | `false`          | Wraps keyboard navigation at the list boundaries |
| `shouldFilter`  | `boolean`                 | `true`           | Uses cmdk’s built-in filtering                   |
| `filter`        | `CommandFilter`           | cmdk default     | Supplies an approved custom ranking function     |

### CommandList and CommandItem

| Component    | Property   | Type                      | Default         | Meaning                                 |
| ------------ | ---------- | ------------------------- | --------------- | --------------------------------------- |
| CommandList  | `label`    | `string`                  | `"Suggestions"` | Accessible name for the results list    |
| CommandItem  | `value`    | `string`                  | inferred        | Stable searchable item value            |
| CommandItem  | `keywords` | `string[]`                | `[]`            | Alternative search terms                |
| CommandItem  | `disabled` | `boolean`                 | `false`         | Makes the action unavailable            |
| CommandItem  | `onSelect` | `(value: string) => void` | none            | Runs the product-owned action           |
| CommandGroup | `heading`  | `React.ReactNode`         | none            | Visible and accessible category heading |

Prefer an explicit CommandItem value even though cmdk can infer one from its text content.

### CommandDialog

| Property          | Type                      | Default                            | Meaning                        |
| ----------------- | ------------------------- | ---------------------------------- | ------------------------------ |
| `title`           | `string`                  | `"Command Palette"`                | Accessible dialog title        |
| `description`     | `string`                  | `"Search for a command to run..."` | Accessible dialog description  |
| `showCloseButton` | `boolean`                 | `false`                            | Shows the dialog close control |
| `open`            | `boolean`                 | uncontrolled                       | Controlled open state          |
| `onOpenChange`    | `(open: boolean) => void` | none                               | Reports open-state changes     |

Command and its subcomponents also accept their corresponding cmdk properties. CommandDialog accepts Gecko Dialog root properties.

## Styling contract

The library owns the command surface, input, groups, items, selected state, empty state, dialog placement, spacing, icons, hover, focus and disabled treatments.

Use `className` only to position the complete Command within its parent layout. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, variants, icons, behaviours, keyboard interactions or styling.

## Agent rules

- Confirm product approval before using Command.
- Start with CommandDialog after adoption is approved.
- Give every application CommandItem an explicit value and onSelect handler.
- Use CommandShortcut only as a visual representation of a product-owned shortcut.
- Keep important actions available through the ordinary interface.
- Preserve cmdk’s filtering and keyboard interaction.
- Keep technical state and filtering guidance in this document rather than adding visual examples to the human documentation.
- Ask for direction before adding async loading, nested pages, remote search or application-wide shortcut behaviour.
- Use the trusted docs application only for examples; prototype projects are not component guidance.

## Relationship to Shadcn and cmdk

Gecko retains Shadcn’s cmdk composition, filtering, groups, selection, empty state, shortcuts and optional Dialog wrapper. Gecko adds its own design-system styling, dialog placement and safe accessible labels. The product continues to own triggers and action behaviour.

## Related components

- **Combobox** — searches predefined values for a form field.
- **Dropdown menu** — presents a short set of actions attached to a visible control.
- **Dialog** — presents modal content that is not a searchable action list.
