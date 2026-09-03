# File field

Import: `@gecko/ui/components/file-input`  
Status: Stable  
Source: `src/components/file-input.tsx`  
Human documentation: `apps/docs/src/pages/file-field/index.tsx`

## Purpose

File field provides Gecko’s native file-selection control for a form. It fixes the input type to `file`, inherits the approved Input presentation and keeps file-selection behaviour in the browser.

Use File field when someone selects files through a conventional form control and the product owns validation and submission. Use Attachment when upload progress, retry, completion and removal belong in the interface. Use Drop zone when dragging files into a larger surface is the primary interaction.

The documented component name is **File field**. The exported React component is `FileInput`.

## Import

```tsx
import { FileInput } from "@gecko/ui/components/file-input";
```

## Canonical composition

Compose FileInput as one labelled Field. State accepted formats and size limits before selection and connect the description to the control.

```tsx
<Field>
  <FieldLabel htmlFor="supporting-document">Supporting document</FieldLabel>
  <FileInput
    id="supporting-document"
    name="supportingDocument"
    accept=".pdf"
    aria-describedby="supporting-document-description"
  />
  <FieldDescription id="supporting-document-description">
    PDF, up to 10 MB.
  </FieldDescription>
</Field>
```

One File field does not need FieldGroup or FieldSet. Use FieldGroup only to arrange adjacent fields. Use FieldSet and FieldLegend only when several controls need one shared accessible name.

## Within form

FileInput is a native form control. Give it a `name` and keep its requirements beside it:

```tsx
<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="supporting-document">Supporting document</FieldLabel>
    <FileInput
      id="supporting-document"
      name="supportingDocument"
      accept=".pdf"
      aria-describedby="supporting-document-description"
    />
    <FieldDescription id="supporting-document-description">
      PDF, up to 10 MB.
    </FieldDescription>
  </Field>
  <Button type="submit">Submit document</Button>
</form>
```

Button retains its intrinsic width. The product and server validate the selected file on submission.

## Selection

Read the selected `FileList` from the native change event. The product decides whether to retain, preview, validate or upload those files.

```tsx
<FileInput
  id="supporting-document"
  name="supportingDocument"
  onChange={(event) => {
    const files = event.currentTarget.files;
    handleFiles(files);
  }}
/>
```

File inputs cannot be controlled with a file path. `FileInputProps` therefore excludes `value` and `defaultValue`. Use the containing form’s `reset()` method or set an input ref’s value to an empty string when a product workflow explicitly clears the selection.

## Accepted files

Use `accept` to hint which extensions or MIME types the native picker should offer. The browser may still allow another file to be selected, so the product validates every selected file and the server repeats authoritative validation.

Prefer extensions when the requirement is expressed as a format:

```tsx
<FileInput accept=".pdf,.doc,.docx" />
```

Prefer MIME types for a category:

```tsx
<FileInput accept="image/png,image/jpeg" />
```

State the accepted formats and maximum size in FieldDescription. The `accept` attribute does not communicate a size limit.

## Multiple files

Set `multiple` when the product accepts more than one file. Use plural label and description copy and validate every item in the FileList.

```tsx
<Field>
  <FieldLabel htmlFor="supporting-documents">Supporting documents</FieldLabel>
  <FileInput
    id="supporting-documents"
    name="supportingDocuments"
    accept=".pdf"
    multiple
    aria-describedby="supporting-documents-description"
  />
  <FieldDescription id="supporting-documents-description">
    PDFs, up to 10 MB each.
  </FieldDescription>
</Field>
```

## Required and disabled states

Set native `required` when at least one file must be selected before submission. FieldLabel displays the library-owned required marker.

Set native `disabled` on FileInput and `data-disabled` on Field when selection is temporarily unavailable. Disabled controls are omitted from form submission.

## Validation

The product owns file requirements and when validation runs. On unsuccessful submission, focus the first invalid control and render the complete Field invalid state:

- `data-invalid` on Field;
- `aria-invalid="true"` on FileInput;
- `aria-describedby` on FileInput referencing FieldError;
- FieldError with the referenced ID and a corrective message.

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="supporting-document">Supporting document</FieldLabel>
  <FileInput
    id="supporting-document"
    name="supportingDocument"
    accept=".pdf"
    aria-invalid
    aria-describedby="supporting-document-error"
  />
  <FieldError id="supporting-document-error">
    Choose a PDF smaller than 10 MB.
  </FieldError>
</Field>
```

Validate file count, extension or MIME type, size and any product-specific content requirements. Server validation remains authoritative.

## Accessibility

- Every FileInput has a visible FieldLabel connected through matching `htmlFor` and `id` values.
- Every control has a stable `name` for form submission.
- File requirements appear before selection and are connected with `aria-describedby`.
- Invalid controls expose `aria-invalid` and reference a corrective FieldError.
- Native keyboard behaviour, focus and the operating-system picker remain intact.
- The product focuses the first invalid FileInput after unsuccessful submission.
- Native `disabled`, `required`, `multiple`, `accept` and `capture` properties remain on FileInput.

## Interface

FileInput accepts native input properties and Gecko Input’s `size` property except `type`, `value` and `defaultValue`.

| Property       | Type                                         | Default | Meaning                                                           |
| -------------- | -------------------------------------------- | ------- | ----------------------------------------------------------------- |
| `size`         | `"sm" \| "md" \| "lg"`                       | `"md"`  | Approved control size                                             |
| `accept`       | `string`                                     | none    | File extensions or MIME types offered by the native picker        |
| `multiple`     | `boolean`                                    | `false` | Allows more than one file                                         |
| `capture`      | `boolean \| "user" \| "environment"`         | none    | Requests a capture source on supporting devices                   |
| `onChange`     | `React.ChangeEventHandler<HTMLInputElement>` | none    | Reports native selection changes                                  |
| `required`     | `boolean`                                    | `false` | Requires at least one file for native form validation             |
| `disabled`     | `boolean`                                    | `false` | Makes selection unavailable and omits the control from submission |
| `aria-invalid` | `boolean \| "grammar" \| "spelling"`         | `false` | Exposes the product validation state                              |

`type`, `value` and `defaultValue` are library-owned or unsupported and are not part of `FileInputProps`.

## Styling contract

The library owns control height, typography, native file-button presentation, borders, disabled treatment, invalid treatment and focus-visible styling.

Use `size` to match the surrounding form controls. Use `className` only to place the complete Field within its parent layout. Request a library change when a legitimate File field treatment is missing.

## Agent rules

- Start with the canonical labelled Field composition.
- State formats and size limits in connected FieldDescription text.
- Keep selection, validation, upload and clearing behaviour in the product.
- Read selected files from `event.currentTarget.files`.
- Treat `accept` as a picker hint and validate files in product and server code.
- Use `multiple` only when the product accepts multiple files.
- Preserve native file-input behaviour and Gecko’s Field state composition.
- Import FileInput from Gecko; use the documented File field name in product and documentation copy.
- Use the trusted docs application only for visual examples; prototype projects are not component guidance.

## Ownership

File field is a Gecko-owned component composed from Gecko Input and the native file-input element. It has no separate third-party behavioural dependency.

## Related components

- **Field** — visible label, requirements and validation.
- **Attachment** — file upload lifecycle inside a form or fieldset.
- **Drop zone** — large drag-and-drop selection surface.
- **Input field** — ordinary single-line text entry.
