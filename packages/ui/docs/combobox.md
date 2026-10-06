# Combobox

Import: `@geckolabs/elements/components/combobox`  
Status: Stable  
Source: `src/components/combobox.tsx`  
Human documentation: `apps/docs/src/pages/combobox/index.tsx`

## Purpose

Combobox lets someone filter suggestions and select one or more values. The default configuration restricts selection to supplied options; `variant="creatable"` also allows explicit creation of string values. Use it when the list is long enough that typing materially helps someone find an option.

Use Select for a short predefined list that does not need filtering. Use the creatable variant to select existing options or create new ones inline, such as tags, labels or categories. Use a text field when suggestions are unnecessary. Use Command for a searchable palette of actions rather than a form value.

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

ComboboxInput shows the square options trigger by default. The component owns its “Show options” accessible name. Its chevron rotates when the popup opens and returns when it closes. The popup spans the complete field width, including the trigger area.

Set `showClear` when an optional current selection should be easy to remove. The component owns the clear control and its “Clear selection” accessible name. Trigger and clear controls occupy the same fixed square slot so the trailing icon remains stationary when the control changes. Both controls participate in the normal tab order when displayed and enabled. Enter or Space on the clear control removes the selection and returns focus to the input. Do not build a separate clear Button.

Only set `showTrigger={false}` when the design explicitly requires the field to open through typing or focus alone. Do not replace either control with custom chrome.

## Groups

Use ComboboxGroup with ComboboxLabel when real categories make a long list easier to scan. Use ComboboxCollection to render the group’s items and ComboboxSeparator between groups. Do not group options solely for decoration.

## Filtering and highlighting

Typing filters the supplied items. `autoHighlight` defaults to `false`; keep that default unless automatically highlighting the first result is explicitly intended. When enabled, Enter may select the highlighted result, so the product decision must be deliberate.

The default Combobox restricts selection to supplied items. In the creatable variant, a typed query remains uncommitted until the user selects the Create option. Blur, Tab and Escape do not create values.

## Creatable

Use `variant="creatable"` when the product allows options to be created inline, such as tags, labels or categories. Use single selection when only one option may be chosen, and `multiple` when several options may be chosen. It supports single selection and `multiple` using the same labelled input, list and chips composition. It accepts a **flat string array**, not grouped options or object records. Keep the list render function: it renders both supplied options and the library-provided creation option. ComboboxItem owns the creation label; do not add an application-owned Create button or keyboard handler.

### Single select

Choose one category from the list, or create a new category inline. Only one category can be selected at a time.

```tsx
<Field>
  <FieldLabel htmlFor="category">Category</FieldLabel>
  <Combobox
    variant="creatable"
    items={["Open days", "Campus tours", "Applicant events"]}
    name="category"
  >
    <ComboboxInput
      id="category"
      placeholder="Select or add a category"
      showClear
    />
    <ComboboxContent>
      <ComboboxEmpty>No categories found.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>
```

### Multi select

Choose multiple labels from the list, or create new labels inline. Each selected label appears as a removable chip.

Use the canonical multiple-selection composition above, adding `variant="creatable"` and a flat `string[]` for `items`. `value`/`defaultValue` are `string[]`; single selection uses `string | null`. Retain the full chips anchor and labelled ComboboxChipsInput. Both configurations support controlled and uncontrolled selection. Root `disabled`, `readOnly`, `required`, input error relationships and form `name` retain their normal behaviour.

```tsx
const anchor = useComboboxAnchor()

<Field>
  <FieldLabel htmlFor="labels">Labels</FieldLabel>
  <Combobox variant="creatable" items={["Prospective student", "Offer holder", "Follow up required"]} name="labels" multiple>
    <ComboboxChips ref={anchor}>
      <ComboboxValue>
        {(values: string[]) => (
          <>
            {values.map((value) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
            <ComboboxChipsInput id="labels" placeholder="Select or add labels" />
          </>
        )}
      </ComboboxValue>
    </ComboboxChips>
    <ComboboxContent anchor={anchor}>
      <ComboboxEmpty>No labels found.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>
```

### Creation and ownership

- Typing a nonblank query offers `Create “value”` as a normal option. Arrow keys highlight it and Enter selects it; pointer selection does the same. With default `autoHighlight={false}`, Enter does not implicitly create unhighlighted text.
- Values are trimmed. Blank queries and duplicates (trimmed, case-insensitive comparison against supplied, created and selected values) do not offer creation. Selected spelling remains unchanged.
- New values remain in the mounted field’s suggestions after clearing/removing them. Unmounting resets these local suggestions; the application must supply saved values/options when reopening. Changing record identity should remount the field.
- `onValueChange` receives the selected value(s), including a newly created value. Persist through the normal application save flow. `onCreate` is an optional notification after an accepted creation, not an async factory, validation hook or automatic API call. Do not save twice using both callbacks.
- `isValidNewValue(value)` synchronously decides whether a trimmed query may be offered. Use it for product rules (for example label length or allowed characters); the application owns validation messages through FieldDescription/FieldError and submit validation. Do not trigger API calls in this predicate.
- `getCreateLabel(value)` customises/translates the option label. Include the proposed value in an actionable label. Default: `Create “value”`.
- Controlled `inputValue`/`onInputValueChange` remain supported; update the query synchronously. The variant owns filtering and does not accept custom `filter` or `filteredItems`.
- For server-created IDs or object records, use the default Combobox with an explicit application-owned creation flow. Remote pagination and virtualisation remain unsupported.

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

Creatable-only props: `variant="creatable"`, `items: readonly string[]`, `isValidNewValue?: (value: string) => boolean`, `onCreate?: (value: string) => void`, `getCreateLabel?: (value: string) => string`. Single and multiple selection types follow the mode. Its filtering, string conversion and equality are library-owned.

The default Combobox also accepts Base UI Combobox Root properties.

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
- Use default Combobox when values must come from supplied options. Use `variant="creatable"` only when user-created strings are a product requirement; typing alone must not commit a value.
- Put form, controlled-state, required and disabled props on Combobox.
- Use `useComboboxAnchor` for the multiple configuration.
- Use conversion props for custom object shapes.
- Keep `autoHighlight` off unless explicitly requested.
- Use specific empty messages and actionable validation copy.
- For remote data, use the approved [remote selector recipe](recipes/remote-combobox.tsx), with application-owned requests, selection and error handling. The remote recipe does not add server-backed creation, virtualization or remote pagination; verify and document those capabilities before extending it.
- Do not copy application-specific implementations from prototype projects.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI composition, filtering, selection, popup positioning, groups and form integration. Gecko adds its approved InputGroup presentation, automatic trigger and optional clear control, multiple-selection chips with placeholder handling, wrapping chip layout, descriptive control names and the shared `useComboboxAnchor` helper.

## Related components

- **Select** — a short predefined list without filtering.
- **Native select** — a platform-native selection control.
- **Command** — a searchable palette of commands or actions.
- **Field** — the visible label, validation relationship and form layout around Combobox.

## Application integration

Use the [tested application patterns](application-patterns.md) for data ownership, loading, asynchronous operations and navigation. Preserve source behaviour with the [migration checklist](migration-checklist.md). Common action glyphs come from the [action icon map](action-icons.md).
