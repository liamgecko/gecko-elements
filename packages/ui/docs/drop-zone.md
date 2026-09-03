# Drop zone

Import: `@gecko/ui/components/drop-zone`  
Status: Stable  
Source: `src/components/drop-zone.tsx`  
Human documentation: `apps/docs/src/pages/drop-zone/index.tsx`

## Purpose

Drop zone is Gecko's large, dedicated file-selection surface. People can drop files onto it or open the native file picker. The component presents the current selection and owns file removal.

Use Drop zone when selecting files is the main purpose of a large surface, such as choosing a hero image inside a dialog. Use Attachment for a single-file upload inside a form or fieldset when upload progress, retry, completion, and removal belong together. Use File field only when a basic native picker is sufficient.

Drop zone selects files; it does not upload or persist them. The product owns validation, upload behaviour, and storage.

## Canonical application usage

Use the controlled interface when the product needs the selected file.

```tsx
import { useState } from "react";

import { DropZone } from "@gecko/ui/components/drop-zone";

const [files, setFiles] = useState<File[]>([]);

<DropZone value={files} onValueChange={setFiles} />;
```

Drop zone selects one file by default. The value remains an array so the same state interface supports single and multiple selection.

## Multiple files

Set `multiple` only when the product can handle more than one file. New selections are appended to the current controlled or uncontrolled value.

```tsx
<DropZone multiple value={files} onValueChange={setFiles} />
```

The default prompt and browse label change to their plural forms automatically. Override `label`, `description`, or `browseLabel` only when the upload purpose or requirements need to be more specific.

## Validation ownership

`accept` is a hint for the operating-system file picker. It is not validation and does not guarantee that a selected or dropped file is allowed.

Validate type, size, image dimensions, and security requirements in product code after `onValueChange`. Keep the selected value unchanged or restore the last valid value as appropriate, then pass the resulting message through `error`.

```tsx
<DropZone
  accept="image/png,image/jpeg"
  value={files}
  onValueChange={validateAndSetFiles}
  error={fileError}
/>
```

`error` sets the native input's invalid state and replaces the supporting description. Passing `aria-invalid` without `error` uses the library's neutral fallback message. Do not use `accept` as the only client-side or server-side validation.

## Controlled and uncontrolled state

Use `value` with `onValueChange` for controlled state. Use `defaultValue` when the component may own the selection after its initial value.

`onValueChange` runs after files are selected, dropped, or removed. In controlled mode, the product must apply the received array for the visible list to update.

## Accessibility

- A native file input owns keyboard interaction and opens the operating-system picker.
- The complete drop surface is associated with that input and reflects its `focus-visible` treatment.
- The visible label names the file input; the description and validation message describe it.
- Selected files render as a named list, and selection-count changes use a polite status message.
- Remove actions are native Buttons whose accessible names include the filename.
- `disabled` uses the native input's disabled behaviour and prevents dropping and removal.

## Interface

| Property           | Type                           | Default                     | Meaning                                                  |
| ------------------ | ------------------------------ | --------------------------- | -------------------------------------------------------- |
| `value`            | `File[]`                       | none                        | Controlled selected files                                |
| `defaultValue`     | `File[]`                       | `[]`                        | Initial uncontrolled selected files                      |
| `onValueChange`    | `(files: File[]) => void`      | none                        | Receives additions and removals                          |
| `multiple`         | `boolean`                      | `false`                     | Allows multiple selection and pluralises default copy    |
| `accept`           | `string`                       | none                        | Native picker hint; not validation                       |
| `disabled`         | `boolean`                      | `false`                     | Prevents browsing, dropping, and removal                 |
| `label`            | `string`                       | `"Drag & drop a file here"` | Primary visible instruction                              |
| `description`      | `string`                       | `"Or click to browse"`      | Supporting instruction or requirements                   |
| `browseLabel`      | `string`                       | `"Browse file"`             | Visible browse affordance                                |
| `error`            | `string`                       | none                        | Product validation message; also marks the input invalid |
| `id`               | `string`                       | generated                   | Native file-input identifier                             |
| `name`             | `string`                       | none                        | Name forwarded to the native file input                  |
| `aria-invalid`     | `boolean \| "true" \| "false"` | `false`                     | Invalid state when no product error message is available |
| `aria-describedby` | `string`                       | none                        | Additional external description ids                      |
| `className`        | `string`                       | none                        | Positions the complete component in its parent layout    |

Plural defaults are `"Drag & drop files here"` and `"Browse files"` when `multiple` is true.

## Styling contract

Drop zone owns the selection surface, prompt, browse affordance, drag feedback, invalid and disabled states, selected-file rows, file-size formatting, and remove actions.

Use `className` only to position the complete component in its surrounding layout. Application code supplies selection state, requirements, validation messages, and upload behaviour without restyling the component's chrome.

Agents must obtain explicit user consent before adding sizes, visual variants, previews, upload lifecycle states, product actions, or styling props.

## Agent rules

- Use the single-file default unless the requirement explicitly allows several files.
- Prefer controlled state when product code validates or uploads the selection.
- Treat `accept` as a picker hint and perform real validation in the product.
- Use `error` for the actual validation result.
- Keep upload progress, retry, and completion out of Drop zone; use Attachment when that lifecycle belongs in the component.
- Keep the library-owned selection surface and file rows unstyled by application code.
- Use the trusted docs application only for examples; prototype projects are not component guidance.

## Related components

- **Attachment** — single-file upload lifecycle inside a form or fieldset.
- **File field** — basic native file selection.
- **Sortable list** — reorders existing items rather than adding files.
