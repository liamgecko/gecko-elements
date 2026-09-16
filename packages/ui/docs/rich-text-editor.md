# Rich text editor

Import: `@geckolabs/elements/components/rich-text-editor`  
Status: Experimental — TinyMCE 4 migration compatibility  
Source: `src/components/rich-text-editor.tsx`  
Human documentation: `apps/docs/src/pages/rich-text-editor/index.tsx`  
Live route: `/components/rich-text-editor`

## Purpose and ownership

Use RichTextEditor for formatted HTML content throughout the app, including descriptions, instructions, messages and documents. Use Textarea for plain text and Reply box for conversation composition. This component uses the **exact TinyMCE 4.7.1** runtime from Admin, not a newer v4 patch or TinyMCE 7/8.

The library owns editor loading, the legacy toolbar/dialogs, content events, focus, read-only state, theme integration and the public ref. The application owns fetching records, content-specific actions and insertion pickers, content validation, saving, toast messages, dirty-navigation guards, permissions, content transformation, attachments and upload services.

Do not import TinyMCE directly in application code or access `window.tinymce`. No runtime configuration escape hatch is exposed. Add new capabilities through this contract and the owning library implementation.

## Install the runtime assets

The package includes an unmodified runtime under `dist/vendor/tinymce-4`, including its supporting files, licence and provenance. Copy the entire directory during the consuming application's build:

```sh
mkdir -p public/elements/tinymce-4
cp -R node_modules/@geckolabs/elements/dist/vendor/tinymce-4/. public/elements/tinymce-4/
```

Serve this directory as static files with the original structure and correct MIME types. The default `assetBaseUrl` is `/elements/tinymce-4`. Override it for a deployment prefix, existing Admin asset directory or another same-origin static directory. Example: `${import.meta.env.BASE_URL}elements/tinymce-4`.

The docs app runs `scripts/sync-rich-text-editor-assets.mjs` before dev/build; generated public files are ignored in Git. All supporting files must deploy with the script; copying only `tinymce.min.js` will fail. Keep the licence/provenance alongside the deployed files. The component rejects a runtime other than 4.7.1.

No external CDN, upload endpoint or Tiny Cloud key is introduced. Production CSP must permit the same-origin frame, script, CSS, font assets and the legacy editor's inline styles. This integration has not been certified for restrictive CSP configurations. Do not weaken a host CSP automatically; resolve deployment constraints explicitly.

## Canonical usage

```tsx
import { useRef, useState } from "react";
import {
  RichTextEditor,
  type RichTextEditorHandle,
} from "@geckolabs/elements/components/rich-text-editor";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@geckolabs/elements/components/field";

const editor = useRef<RichTextEditorHandle>(null);
const [content, setContent] = useState(record.content);

<Field data-invalid={Boolean(error)}>
  <FieldLabel htmlFor="content">Content</FieldLabel>
  <RichTextEditor
    ref={editor}
    id="content"
    name="content"
    label="Content"
    value={content}
    onValueChange={setContent}
    onDirtyChange={setDirty}
    required
    aria-invalid={Boolean(error)}
    aria-describedby="content-description"
  />
  {error ? (
    <FieldError id="content-description">{error}</FieldError>
  ) : (
    <FieldDescription id="content-description">
      Add the details you want to share.
    </FieldDescription>
  )}
</Field>;
```

`label` is the editor's accessible name and must match its visible label. It is not automatically rendered as visible text. `id` connects the visible FieldLabel and the composite control, including label-click focus and the required marker. `name` adds a hidden form field containing HTML; use app-owned submit handling for content-specific transformations.

## Content and persistence

Use `value` with `onValueChange` for controlled state, or `defaultValue` for an uncontrolled initial document. Keep the state update synchronous; debounce server persistence rather than `onValueChange`. Do not switch controlled/uncontrolled mode on the same instance. Initialisation does not report a user edit or dirty state.

External `value` replacements reset the editor's undo history and dirty state. Use a React `key` for switching record identities so content, selection and readiness cannot leak across records. `defaultValue` is initial-only. Supply body HTML or a full HTML document; fullpage may normalise either into a document. Do not assume byte-identical HTML on output.

`onValueChange` reports full-document HTML on editing, tag insertion, source changes, undo and redo. `getContent()` gets the latest serialised HTML; before readiness it returns the latest supplied content. `resetDirty()` marks a successful save. It does not perform persistence. Only call it when the version actually saved still matches the current editor content; edits may continue while a request is pending.

Keep any existing content normalisation, wrappers and display rules in the consuming feature’s save adapter. These are product requirements, not universal editor behaviour. Review existing storage/rendering expectations before replacing another editor: full-document HTML is not interchangeable with plain text or a body-only fragment.

## Content insertion

```tsx
// Product code supplies the HTML to insert at the current selection.
const inserted = editor.current?.insertContent("<strong>Important</strong>");
```

`insertContent(html)` restores focus and inserts at the current TinyMCE selection. It returns `false` before readiness or in read-only mode. The caller must retain/disable its insertion action until `onReady`. It accepts HTML, not arbitrary untrusted text: escape external text before insertion. Do not expose the legacy editor object or create a second app-owned toolbar.

If a feature uses placeholders or merge tags, its picker and token formatting remain application-owned. Include those values in that feature’s round-trip checks.

## States and accessibility

- Loading reserves the configured height and shows an accessible status with Spinner. It only applies to runtime initialisation, not typing or saving.
- Script/init failures report `onLoadError`, display a translated error and offer retry. Missing plugins/skins/language packs that prevent readiness time out after 20 seconds. Retry recreates the instance using the latest content.
- `readOnly` prevents editing and insertion while preserving selection, focus and copying. Do not set it while saving. There is deliberately no `disabled` prop.
- `required` is semantic: the label shows an asterisk and the editable body exposes `aria-required`. App validation must check meaningful content rather than the truthiness of an HTML string such as `<p><br></p>`.
- `aria-invalid` must accompany FieldError and `aria-describedby`. Call `ref.focus()` to focus an invalid editor. The hidden form value does not participate in native constraint validation.
- Labels, required/invalid/read-only state and description text are mirrored into the actual editing frame. ARIA ID references cannot cross documents. Change the description/error through React so it is mirrored on render.
- The legacy toolbar uses Alt+F10, arrow navigation, and Escape for dialogs. Preserve native selection, copying, pasting, IME input and keyboard editing.
- The component's React boundary supports React 18.3.1 and 19. Ref is forwarded through `React.forwardRef`.

Retaining the legacy engine is not a claim of full modern WCAG conformance. Do not silently replace its keyboard or focus handling without testing editing and dialogs.

## Language

Translate `label`, surrounding Field text and `messages` through the application. The loading/error defaults are English. `messages` supports `loading`, `loadError`, `retry`.

The legacy toolbar/dialogs default to English. For another locale, supply both `language` (TinyMCE 4 locale code) and `languageUrl` (absolute or app-relative URL of a matching self-hosted TinyMCE 4 pack). Non-English packs are not bundled. Loading a missing pack is an asset error, not a reason to silently show untranslated controls. Changing the asset or language configuration recreates the runtime while retaining current HTML; keep configuration stable during editing.

## Layout, theme and runtime isolation

`height` reserves the entire editor viewport, defaults to 480 pixels and is clamped to a minimum of 360. Content scrolls inside the editing area. Toolbar groups wrap at narrower desktop widths. Legacy dialogs/menus are contained in this viewport; choose an adequate height for the surrounding panel. This intentionally replaces Admin's unbounded `autoresize` layout; the plugin is retained in the asset copy but not activated by this component.

Each component instance owns a same-origin outer iframe, including its TinyMCE global and popup handlers. TinyMCE uses a nested classic editing iframe because fullpage is not an inline editor feature. Removing one component removes only that runtime. Parent-window TinyMCE 4/7 instances are untouched. The frame is runtime/style isolation, **not a security sandbox**; preserve the application's existing trusted-content boundaries.

The component includes the Gecko skin: bundled Satoshi typography, compact toolbar controls, subtle hover/pressed states, bordered inputs, rounded menus and themed dialogs. It uses Elements colour, radius and elevation tokens and follows the nearest `.dark` ancestor without reinitialising or changing content. The private skin layers over the bundled Lightgray layout inside the isolated UI frame; consumers do not load or configure a separate skin. The content canvas is not recoloured by dark mode: authored HTML and styles determine its presentation. Toolbar glyphs use Gecko Hugeicons, rendered through the library icon renderer into generated CSS masks for TinyMCE’s DOM. Regenerate them with `node scripts/generate-rich-text-editor-icons.mjs` after a package build when changing the mapping. Toolbar grouping places history and typography first, followed by formatting, alignment, lists, insertion and utilities. Controls wrap as complete groups in narrower desktop panels. TinyMCE still owns the commands, keyboard handling, colour dialogs and source dialog under this explicit migration exception. Do not recreate them with application CSS or override their internal selectors.

`className` may position the complete component or set its width. Use `height` for viewport sizing. Do not override chrome, padding, borders, typography or content styling via consumer classes. Changing height remounts the legacy runtime, so set it for the layout rather than on every keystroke.

## Interface

| Prop               | Type                                                       | Default / meaning                                                         |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `label`            | `string`                                                   | Required accessible name, matching the visible label                      |
| `id`               | `string`                                                   | Generated if omitted; supply for FieldLabel                               |
| `name`             | `string`                                                   | Optional hidden HTML form value                                           |
| `value`            | `string`                                                   | Controlled HTML                                                           |
| `defaultValue`     | `string`                                                   | Initial uncontrolled HTML, default empty                                  |
| `onValueChange`    | `(html: string) => void`                                   | Reports content edits                                                     |
| `onDirtyChange`    | `(dirty: boolean) => void`                                 | Reports unsaved state                                                     |
| `onReady`          | `() => void`                                               | Instance ready, including after retry                                     |
| `onLoadError`      | `(error: Error) => void`                                   | Runtime initialisation failure                                            |
| `assetBaseUrl`     | `string`                                                   | `/elements/tinymce-4`                                                     |
| `height`           | `number`                                                   | 480; minimum 360                                                          |
| `readOnly`         | `boolean`                                                  | false                                                                     |
| `required`         | `boolean`                                                  | false; app validates content                                              |
| `aria-invalid`     | `boolean`                                                  | false                                                                     |
| `aria-describedby` | `string`                                                   | IDs of help/error text                                                    |
| `language`         | `string`                                                   | `en`; TinyMCE 4 locale code                                               |
| `languageUrl`      | `string`                                                   | Self-hosted matching language pack                                        |
| `messages`         | `{ loading?: string; loadError?: string; retry?: string }` | Component-owned UI translations                                           |
| `className`        | `string`                                                   | Whole-component layout only                                               |
| `ref`              | `RichTextEditorHandle`                                     | `focus()`, `getContent()`, `insertContent(html): boolean`, `resetDirty()` |

## Migration limits and verification

The exact runtime is intentionally old. The shared component supports formatted content across the app while preserving the existing engine for compatibility. It does not resolve the engine's security/support lifecycle. Upgrading requires a new dependency decision and representative HTML round-trip tests, especially fullpage support/licensing in TinyMCE 8. Do not change the bundled patch version incidentally during dependency maintenance.

Retained behaviour: formatting toolbar, basic paste/plain-text mode, no pasted data images, image/link/table dialogs, source editing, fullpage document serialization, no automatic URL rewriting and the legacy script/style serializer workaround. Images are URL-based; uploading is not added. The component does not save or publish content.

Before integrating a feature, verify representative content copies through load → edit → save → reopen, including head/styles, inline CSS, nested tables, links, Unicode/IME, source edits and that feature’s rendering path. Test placeholders, wrappers or other transformations where the feature uses them. No customer records need to be mutated to validate the component docs.

For component changes run package/docs builds, focused lint and the regression checks in `tests/rich-text-editor/README.md`. Check multiple instances, parent TinyMCE coexistence, late initialisation/unmount, retries, controlled replacement, dirty/save behaviour, read-only toggling, both themes and desktop resizing.

## Agent rules

1. Import the public RichTextEditor interface; never use a global TinyMCE instance in product code.
2. Serve the full pinned asset directory and preserve its licence/provenance. Do not introduce a CDN.
3. Keep product tags, URLs, save commands, validation, wrappers and uploads in the application.
4. Use the Field pattern and translate both surrounding copy and the legacy editor pack.
5. Keep editing available while saving; mark only successfully saved content clean.
6. Do not upgrade the engine, replace fullpage or broaden HTML rules without explicit scope and compatibility evidence.
7. Document missing capabilities rather than passing arbitrary TinyMCE options through the consumer.

## References

The old TinyMCE v4 website redirects to the latest documentation. Use the official v4 archive for this legacy runtime; continue consuming the Gecko API above.

- [TinyMCE v4 documentation archive](https://github.com/tinymce/tinymce-docs-4x)

- [Vendored runtime and licence](../src/vendor/tinymce-4/README.md)
- [TinyMCE 4.7.1 upstream source](https://github.com/tinymce/tinymce/tree/4.7.1)
- [Dependencies](dependencies.md)
- [Field](field.md), [Textarea](textarea.md), [Reply box](reply-box.md)

## Application integration

Use the [tested application patterns](application-patterns.md) for data ownership, loading, asynchronous operations and navigation. Preserve source behaviour with the [migration checklist](migration-checklist.md). Common action glyphs come from the [action icon map](action-icons.md).

## Lifecycle verification

The wrapper initializes and removes TinyMCE in a layout effect so cleanup completes before the iframe is detached. The real-browser suite exercises edit/save/remount and reports uncaught runtime errors. Run `npm run test:rich-text-editor` when changing lifecycle, serialization or editor chrome; see [verification coverage](verification.md).
