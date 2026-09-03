# Combobox

Import: `@gecko/ui/components/combobox`  
Status: Stable  
Source: `src/components/combobox.tsx`  
Human documentation: `apps/docs/src/pages/combobox/index.tsx`

## Purpose

Combobox lets someone filter a predefined list and select one or more values. Use it when the list is long enough that typing materially helps someone find an option.

Use Select for a short predefined list that does not need filtering. Use a text field when values outside the list are valid. Use Command for a searchable palette of actions rather than a form value.

## Canonical single selection

Always place Combobox in a Field with a visible FieldLabel. A placeholder is a hint, not a label. Put the native form `name` on the Combobox root.

```tsx
<Field>
  <FieldLabel htmlFor="framework">Framework</FieldLabel>
  <Combobox items={frameworks} name="framework">
    <ComboboxInput id="framework" placeholder="Select a framework" />
    <ComboboxContent>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>
```

Write the empty state for the options being searched. Prefer “No frameworks found” to a generic “No items found.”

## Controlled and uncontrolled state

Prefer uncontrolled state unless application state must read or change the selection. Use `defaultValue` for an initial uncontrolled value. Use `value` with `onValueChange` for controlled state.

```tsx
const [framework, setFramework] = useState<string | null>(null)

<Combobox
  items={frameworks}
  name="framework"
  value={framework}
  onValueChange={setFramework}
>
  {/* canonical input and content */}
</Combobox>
```

The product owns persisted values, submission and business logic. Combobox owns selection interaction, filtering, presentation and accessibility.

## Multiple selection

Use `multiple` with ComboboxChips when more than one value may be selected. Use `useComboboxAnchor` to anchor the popup to the complete chips field.

```tsx
const anchor = useComboboxAnchor()

<Field>
  <FieldLabel htmlFor="frameworks">Frameworks</FieldLabel>
  <Combobox items={frameworks} name="frameworks" multiple>
    <ComboboxChips ref={anchor}>
      <ComboboxValue>
        {(values) => (
          <>
            {values.map((value) => (
              <ComboboxChip key={value}>{value}</ComboboxChip>
            ))}
            <ComboboxChipsInput id="frameworks" placeholder="Select frameworks" />
          </>
        )}
      </ComboboxValue>
    </ComboboxChips>
    <ComboboxContent anchor={anchor}>
      {/* canonical empty state and list */}
    </ComboboxContent>
  </Combobox>
</Field>
```

Chips wrap automatically. ComboboxChip supplies its remove control. Plain text children produce a descriptive accessible name such as “Remove Next.js”. When chip children are not plain text, supply `removeLabel="Remove Next.js"`.

ComboboxChipsInput hides its placeholder after a value is selected. The visible FieldLabel remains the accessible name throughout; never rely on the placeholder as the name.

## Object items

Strings may be passed directly. For object items, provide `itemToStringLabel` so Base UI can display and filter the item, and `itemToStringValue` so forms submit a stable scalar value.

```tsx
<Combobox
  items={people}
  name="owner"
  itemToStringLabel={(person) => person.name}
  itemToStringValue={(person) => person.id}
>
  <ComboboxInput id="owner" placeholder="Select an owner" />
  <ComboboxContent>
    <ComboboxEmpty>No people found.</ComboboxEmpty>
    <ComboboxList>
      {(person) => (
        <ComboboxItem key={person.id} value={person}>
          {person.name}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

Base UI understands the common `{ value, label }` shape automatically. Still use explicit conversion functions for other shapes; do not stringify an object ad hoc inside application code.

## Clear and trigger controls

ComboboxInput shows the options trigger by default. The component owns its “Show options” accessible name.

Set `showClear` when an optional current selection should be easy to remove. The component owns the clear control and its “Clear selection” accessible name. Do not build a separate clear Button.

Only set `showTrigger={false}` when the design explicitly requires the field to open through typing or focus alone. Do not replace either control with custom chrome.

## Groups

Use ComboboxGroup with ComboboxLabel when real categories make a long list easier to scan. Use ComboboxCollection to render the group’s items and ComboboxSeparator between groups. Do not group options solely for decoration.

## Filtering and highlighting

Typing filters the supplied items. `autoHighlight` defaults to `false`; keep that default unless automatically highlighting the first result is explicitly intended. When enabled, Enter may select the highlighted result, so the product decision must be deliberate.

Combobox is not free-form entry. A typed query is only a filter and does not become a valid value unless it matches a supplied item.

## Disabled, required and invalid

Put `disabled` and `required` on Combobox, not ComboboxInput. Root ownership keeps the input, popup and related controls in one state.

Reflect a validation error on the surrounding Field and visible input:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="framework">Framework</FieldLabel>
  <Combobox items={frameworks} name="framework" required>
    <ComboboxInput
      id="framework"
      aria-invalid
      aria-describedby="framework-error"
      placeholder="Select a framework"
    />
    {/* canonical content */}
  </Combobox>
  <FieldError id="framework-error">
    Choose a framework from the list.
  </FieldError>
</Field>
```

The product decides when validation runs. Callers provide relationships and useful error text; they do not add error colours or classes.

## Accessibility and keyboard behaviour

- Every Combobox has a visible FieldLabel connected to its input ID.
- The options trigger and clear control have library-owned accessible names.
- Each plain-text chip remove control includes the selected value in its accessible name.
- Down Arrow opens the popup and moves through options.
- Up and Down Arrow move through open options; Enter selects the highlighted option.
- Escape closes the popup without moving focus away from the field.
- Typing filters the supplied options.
- Tab follows the page’s normal focus order.
- Disabled state belongs on the root so every part consistently ignores interaction.
- Do not add custom keyboard handlers or ARIA roles; Base UI owns the combobox pattern.

## Interface

### Combobox root

| Property            | Type                     | Default      | Meaning                                            |
| ------------------- | ------------------------ | ------------ | -------------------------------------------------- |
| `items`             | `Item[]`                 | none         | Predefined selectable options                      |
| `name`              | `string`                 | none         | Native form field name                             |
| `defaultValue`      | `Item \| Item[]`         | empty        | Initial uncontrolled selection                     |
| `value`             | `Item \| Item[] \| null` | uncontrolled | Controlled selection                               |
| `onValueChange`     | `(value: Item) => void`  | none         | Reports selection changes                          |
| `multiple`          | `boolean`                | `false`      | Enables multiple selection                         |
| `disabled`          | `boolean`                | `false`      | Disables the complete field                        |
| `required`          | `boolean`                | `false`      | Requires a submitted selection                     |
| `autoHighlight`     | `boolean`                | `false`      | Automatically highlights the first filtered option |
| `itemToStringLabel` | `(item: Item) => string` | inferred     | Display and filter text for object items           |
| `itemToStringValue` | `(item: Item) => string` | inferred     | Native submitted value for object items            |

Combobox also accepts Base UI Combobox Root properties.

### Gecko subcomponents

| Component         | Property      | Type      | Default | Meaning                                             |
| ----------------- | ------------- | --------- | ------- | --------------------------------------------------- |
| `ComboboxInput`   | `showTrigger` | `boolean` | `true`  | Shows the library-owned options trigger             |
| `ComboboxInput`   | `showClear`   | `boolean` | `false` | Shows the library-owned clear control               |
| `ComboboxChip`    | `showRemove`  | `boolean` | `true`  | Shows the library-owned chip remove control         |
| `ComboboxChip`    | `removeLabel` | `string`  | derived | Names removal when chip children are not plain text |
| `ComboboxContent` | `anchor`      | `Ref`     | input   | Anchors multiple-selection content to ComboboxChips |

## Styling contract

The library owns input and popup styling, widths, spacing, icons, option states, chip wrapping, clear and trigger controls, hover, focus, disabled and invalid treatments.

Use `className` only to position the complete Combobox within its parent layout. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, variants, icons, behaviours, keyboard interactions or styling.

## Agent rules

- Start from the canonical labelled pattern.
- Keep the options as the source of valid values; never turn Combobox into free-form input.
- Put form, controlled-state, required and disabled props on Combobox.
- Use `useComboboxAnchor` for the multiple configuration.
- Use conversion props for custom object shapes.
- Keep `autoHighlight` off unless explicitly requested.
- Use specific empty messages and actionable validation copy.
- Do not invent async loading, creation, virtualization or remote-search behaviour. Ask for direction before expanding the interface.
- Do not copy application-specific implementations from prototype projects.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI composition, filtering, selection, popup positioning, groups and form integration. Gecko adds its approved InputGroup presentation, automatic trigger and optional clear control, multiple-selection chips with placeholder handling, wrapping chip layout, descriptive control names and the shared `useComboboxAnchor` helper.

## Related components

- **Select** — a short predefined list without filtering.
- **Native select** — a platform-native selection control.
- **Command** — a searchable palette of commands or actions.
- **Field** — the visible label, validation relationship and form layout around Combobox.
