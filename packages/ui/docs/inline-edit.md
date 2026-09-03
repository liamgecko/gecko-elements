# Inline edit

Import: `@gecko/ui/components/inline-edit`  
Status: Stable  
Source: `src/components/inline-edit.tsx`  
Human documentation: `apps/docs/src/pages/inline-edit/index.tsx`

## Purpose

Inline edit changes one short string without moving to a separate form. Use it for editable headers, short single-line descriptions, and applicable values in table rows.

The product owns the controlled value, persistence, validation, and error handling. Inline edit owns the transition between display and editing, its controls, keyboard behaviour, and focus.

Render ordinary text when a value is not editable. Use Field with Input when the value needs a visible label, help text, validation, or a conventional form layout. Use Textarea field for multiline editing.

## Canonical usage

Keep the value controlled and name the editable content by its purpose rather than its current value.

```tsx
import { useState } from "react";

import { InlineEdit } from "@gecko/ui/components/inline-edit";

const [title, setTitle] = useState("Registration form");

<InlineEdit
  aria-label="Form title"
  value={title}
  onSave={(nextTitle) => {
    setTitle(nextTitle);
    updateForm({ title: nextTitle });
  }}
/>;
```

Use optimistic controlled state when persistence is asynchronous so the saved value remains visible after the editor closes. Present request failures through the product’s established error pattern; Inline edit does not render validation or request errors.

## Placement

Inline edit renders a phrasing-content wrapper so it can preserve the surrounding structure. Place it inside the existing heading, paragraph, table cell, or equivalent semantic container.

```tsx
<h1>
  <InlineEdit
    aria-label="Form title"
    value={title}
    onSave={setTitle}
    size="lg"
  />
</h1>
```

Choose `size` to match the surrounding interface density. Size changes control height and text size; it does not establish heading hierarchy.

## Empty values

Supply `placeholder` whenever an empty value is valid. The placeholder remains visible in display mode and appears in the input during editing.

```tsx
<InlineEdit
  aria-label="Form description"
  value={description}
  onSave={setDescription}
  placeholder="Add a description"
/>
```

The placeholder is visual guidance. `aria-label` remains required because a placeholder is not an accessible field label.

## Interaction and focus

- Selecting the display button opens the editor, focuses the input, and selects its current text.
- Enter or Space opens the focused display button.
- Enter in the input saves the draft.
- Escape in the input cancels the draft.
- The visible Cancel and Save buttons perform the same actions.
- Saving or cancelling restores focus to the display button.
- Moving focus away does not save or cancel automatically.

The draft is initialized from `value` whenever editing begins. Inline edit does not trim, normalize, or validate the draft before calling `onSave`.

## Accessible names

`aria-label` names the editable content, for example `"Form title"`, `"Form description"`, or `"Agent name"`. It is applied contextually:

- the display button announces the edit action, label, and current value;
- the input announces the label;
- the save and cancel controls announce both their action and label.

Use a stable label that distinguishes adjacent Inline edits. Do not include “Edit”, “Save”, or “Cancel” in the supplied label because the component adds those actions.

## Interface

| Property      | Type                     | Default  | Meaning                                                      |
| ------------- | ------------------------ | -------- | ------------------------------------------------------------ |
| `aria-label`  | `string`                 | Required | Accessible name describing the editable content              |
| `value`       | `string`                 | Required | Controlled text shown in display mode and loaded for editing |
| `onSave`      | `(next: string) => void` | Required | Receives the draft when Save or Enter is used                |
| `size`        | `"sm" \| "md" \| "lg"`   | `"md"`   | Matches the surrounding interface density                    |
| `placeholder` | `string`                 | `""`     | Visible guidance when `value` is empty                       |
| `className`   | `string`                 | none     | Positions or sizes the complete control in its parent        |

InlineEdit accepts native `span` properties except `onSubmit`. Event handlers apply to the stable outer wrapper and receive bubbled events from the current display or editing controls.

## Styling contract

The library owns the display button, edit icon, input integration, save and cancel controls, spacing, truncation, sizes, hover treatment, focus-visible treatment, and empty-value presentation.

Use `className` only to position or size the complete Inline edit in its parent. Preserve the surrounding semantic element and request a library change when a legitimate visual treatment is missing.

## Agent rules

- Use Inline edit only for an editable short single-line string.
- Use it for headers, short descriptions, and applicable table-row values.
- Keep `value` controlled and update it through `onSave`.
- Supply a specific `aria-label` describing the content.
- Supply `placeholder` when an empty value is valid.
- Preserve the surrounding heading, paragraph, or table-cell semantics.
- Render ordinary text when the content is not editable.
- Use Field with Input for labelled or validated form input and Textarea field for multiline content.
- Keep persistence, validation, and error presentation in the product.
- Preserve Enter-to-save, Escape-to-cancel, explicit action controls, and focus restoration.
- Import InlineEdit from Gecko rather than assembling Input and Button locally.
- Obtain explicit consent before adding another editing mode, automatic blur behaviour, validation UI, or product persistence logic.

## Ownership

Inline edit is Gecko-owned. It composes Gecko Input and Button internally. Application code imports InlineEdit from Gecko and does not recreate its editing controls.

## Related components

- **Input field** — conventional single-line form input.
- **Textarea field** — multiline editing.
- **Field** — label, description, validation, and form layout.
- **Data table** — tabular values that may contain an approved Inline edit.
