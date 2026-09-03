# Attachment

Import: `@gecko/ui/components/attachment`  
Status: Stable  
Source: `src/components/attachment.tsx`  
Human documentation: `apps/docs/src/pages/attachment/index.tsx`

## Purpose

Attachment is Gecko’s extended single-file upload field. It lets someone choose or drop one file, then presents upload progress, failure, retry, completion, and removal in the same compact row.

Use Attachment for a file upload inside a form or fieldset. Use Drop zone for a large dedicated upload surface. Use File field when a basic picker is sufficient and upload status is not required.

Attachment is intentionally not the compound Shadcn attachment-display interface. Do not compose media, content, actions, groups, orientations, previews, or triggers around it.

## Import

```tsx
import { Attachment } from "@gecko/ui/components/attachment";
```

## Canonical managed mode

Managed mode is canonical. Omit `state` and provide `onUpload`. Attachment owns the lifecycle, progress display, retry, completion, and removal.

```tsx
<Attachment
  accept="image/*"
  description="SVG, PNG, JPG or GIF (max. 800 × 400 px)"
  onUpload={async (file, onProgress) => {
    validateFile(file);
    await uploadFile(file, onProgress);
  }}
/>
```

The `onUpload` handler must:

- Validate the selected file.
- Perform the upload.
- Call `onProgress` with values from 0 to 100 when progress is available.
- Throw or return a rejected promise when the upload fails.

Attachment constrains displayed progress to 0–100. A rejected upload enters the error state and exposes the built-in retry and remove actions.

Use `onFileChange` only when the parent needs notification of selection or clearing. Do not use it to duplicate Attachment’s managed lifecycle.

## Within form

Attachment uploads before the surrounding form is submitted. Store the uploaded file reference and submit that reference with the form state:

```tsx
const [attachmentId, setAttachmentId] = useState<string>();

async function handleUpload(file, onProgress) {
  const attachment = await uploadFile(file, onProgress);
  setAttachmentId(attachment.id);
}

<form onSubmit={(event) => handleSubmit(event, { attachmentId })}>
  <Field
    aria-labelledby="supporting-document-label"
    aria-describedby="supporting-document-description"
  >
    <FieldTitle id="supporting-document-label">Supporting document</FieldTitle>
    <Attachment
      label="Choose a file or drag and drop"
      accept=".pdf"
      description="PDF, up to 10 MB"
      onUpload={handleUpload}
    />
    <FieldDescription id="supporting-document-description">
      Upload the document required for this application.
    </FieldDescription>
  </Field>
  <Button type="submit">Save application</Button>
</form>;
```

Attachment does not contribute a native named value to FormData. Keep submit enabled and validate the uploaded reference on submission. Button retains its intrinsic width.

## Controlled mode

Use controlled mode only when an external upload process genuinely owns the lifecycle. Providing `state` enables controlled mode and prevents `onUpload` from being supplied.

The approved states are a closed set:

| State       | Meaning                        | Required data                                                     |
| ----------- | ------------------------------ | ----------------------------------------------------------------- |
| `empty`     | No file has been selected      | `onFileChange`                                                    |
| `uploading` | The external upload is running | `name`; `progress` when available                                 |
| `error`     | The external upload failed     | `name`; `onRetry` and `onRemove` when those actions are available |
| `done`      | The file uploaded successfully | `name`; `onRemove` when removal is available                      |

### Empty

```tsx
<Attachment
  state="empty"
  description="PDF up to 10 MB"
  onFileChange={selectFile}
/>
```

The parent starts the upload when `onFileChange` receives the selected file and then changes the controlled state to `uploading`.

### Uploading

```tsx
<Attachment
  state="uploading"
  name="design-system.zip"
  progress={64}
  onRemove={removeFile}
/>
```

### Error

```tsx
<Attachment
  state="error"
  name="financial-model.xlsx"
  onRetry={retryUpload}
  onRemove={removeFile}
/>
```

### Done

```tsx
<Attachment
  state="done"
  name="uploaded-report.pdf"
  description="Uploaded · 1.8 MB"
  onRemove={removeFile}
/>
```

Agents must not add states or reinterpret their meaning without explicit user consent.

## Single-file contract

Attachment accepts exactly one file. The file picker does not expose multiple selection, and a drop uses the first file.

Do not use Attachment for a multi-file picker or upload list. Do not add a `multiple` prop without explicit consent.

## File requirements and validation

`accept` is a hint for the operating-system file picker. It is not validation and does not guarantee that a dropped or selected file is allowed.

Validate file type, file size, image dimensions, and any security requirements inside `onUpload` in managed mode or the external selection handler in controlled mode.

Keep the visible `description` aligned with the actual validation rules.

```tsx
<Attachment
  accept="application/pdf"
  description="PDF up to 10 MB"
  onUpload={async (file, onProgress) => {
    validatePdf(file, { maximumBytes: 10_000_000 });
    await uploadFile(file, onProgress);
  }}
/>
```

## Icons

Attachment owns this approved icon mapping:

| Purpose       | Library-owned treatment |
| ------------- | ----------------------- |
| Empty         | `CloudUpload`           |
| Uploading     | Spinner                 |
| Error         | `FileWarning`           |
| Done          | `Check`                 |
| Retry action  | `RefreshCw`             |
| Remove action | `Trash2`                |

These preset icons are canonical. Agents must not replace, rename, or remap them without explicit user consent.

Use `icon` when an approved context-specific icon is required:

```tsx
<Attachment
  icon={<ImageUp />}
  label="Upload brand assets"
  description="PNG, JPG or SVG"
  onUpload={uploadBrandAsset}
/>
```

A custom `icon` replaces the state-derived icon throughout the lifecycle. Status wording still communicates uploading, error, and completion. Custom icons are decorative and hidden from assistive technology.

## Copy

The default empty-state label is “Choose a file or drag and drop”. Override it only when the upload’s purpose needs to be named more specifically.

Use `description` for concrete requirements such as accepted formats, maximum file size, or image dimensions. Do not use it for vague encouragement.

Attachment owns the managed status wording:

- `Uploading · X%`
- `Upload failed. Try again.`
- `Uploaded · [file size]`

## Actions

- Managed error state owns retry and remove behaviour.
- Managed done state owns remove behaviour.
- In controlled mode, `onRetry` and `onRemove` determine whether the corresponding actions render.
- `disabled` disables file selection, retry, and removal.
- Action accessible names include the filename when it is a string.

Do not add application-specific actions to Attachment without explicit consent.

## Accessibility

- The empty state uses a native file input for pointer and keyboard interaction.
- The visible label provides the file input’s accessible name when it is a string. A non-string label uses “Choose a file” as the accessible fallback.
- Upload status uses a polite live region and is not communicated by colour or icons alone.
- Library and custom state icons are decorative and hidden from assistive technology.
- Retry and remove are native buttons with descriptive accessible names.
- Disabled state uses native disabled controls.

## Interface

### Shared properties

| Property       | Type                           | Default                            | Meaning                                                              |
| -------------- | ------------------------------ | ---------------------------------- | -------------------------------------------------------------------- |
| `accept`       | `string`                       | none                               | File-picker hint; not validation                                     |
| `label`        | `React.ReactNode`              | `"Choose a file or drag and drop"` | Empty-state instruction                                              |
| `description`  | `React.ReactNode`              | none                               | Empty-state requirements or controlled status override               |
| `icon`         | `React.ReactNode`              | mapped state icon                  | Approved custom state icon                                           |
| `onFileChange` | `(file: File \| null) => void` | none                               | Selection/clearing notification; required for controlled empty state |
| `onRemove`     | `() => void`                   | none                               | Removal notification or controlled remove action                     |
| `onRetry`      | `() => void`                   | none                               | Controlled retry action                                              |
| `disabled`     | `boolean`                      | `false`                            | Disables selection, retry, and removal                               |

### Managed mode

| Property   | Type                                          | Requirement                          |
| ---------- | --------------------------------------------- | ------------------------------------ |
| `onUpload` | `(file, onProgress) => void \| Promise<void>` | Required                             |
| `state`    | never                                         | Omit                                 |
| `name`     | never                                         | Omit; derived from the selected file |
| `progress` | never                                         | Omit; reported through `onProgress`  |

### Controlled mode

| Property   | Type                                          | Requirement                                |
| ---------- | --------------------------------------------- | ------------------------------------------ |
| `state`    | `"empty" \| "uploading" \| "error" \| "done"` | Required                                   |
| `name`     | `React.ReactNode`                             | Required for uploading, error, and done    |
| `progress` | `number`                                      | Optional for uploading                     |
| `onUpload` | never                                         | Omit; the external process owns the upload |

## Styling contract

Attachment has one supported size and horizontal row layout. Do not override its border, colour, spacing, radius, typography, state icons, progress treatment, or action placement with `className`.

Agents must not add sizes, orientations, groups, image previews, triggers, states, actions, or behaviour props without explicit user consent. Stop and ask when the current interface cannot satisfy a requirement.

## Related components

- **Drop zone** — a large dedicated upload surface.
- **File field** — a basic picker without upload lifecycle.
