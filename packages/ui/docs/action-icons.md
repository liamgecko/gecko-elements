# Action icons

Import: `@geckolabs/elements/lib/action-icons`  
Status: Stable  
Source: `src/lib/action-icons.ts`  
Human documentation: `apps/docs/src/pages/guides/action-icons.tsx`

## Purpose

Use `preset` on Button and Header actions for common application actions. Elements
renders the approved decorative icon and selects its default variant. Keep labels,
translations, handlers and permissions in the application. Do not add a duplicate
icon child or Header `icon` alongside a preset.

```tsx
import { Button } from "@geckolabs/elements/components/button";
import { Header } from "@geckolabs/elements/components/header";

<Button preset="cancel" onClick={cancel}>Cancel</Button>
<Button preset="save" type="submit">Rename device</Button>
<Header title="Categories" primaryAction={{ preset: "add", label: "Add category", onClick: addCategory }} />
```

[Button](button.md#action-presets) owns preset defaults and explicit variant overrides.
For icons outside Button, the public `actionIcons` map remains available. Render with
`HugeiconsIcon` from `@geckolabs/elements/lib/icon` and `aria-hidden="true"`.
Button does not infer an action from its label.

Presets are optional; use them when they match the action. Button supports these presets:

| Preset     | Glyph            | Default variant |
| ---------- | ---------------- | --------------- |
| `add`      | PlusIcon         | default         |
| `save`     | CheckCheckIcon   | default         |
| `cancel`   | XIcon            | outline         |
| `edit`     | Edit02Icon       | outline         |
| `delete`   | Delete02Icon     | destructive     |
| `copy`     | Copy01Icon       | outline         |
| `actions`  | Settings01Icon   | outline         |
| `retry`    | ReloadIcon       | outline         |
| `next`     | ChevronRightIcon | default         |
| `previous` | ChevronLeftIcon  | outline         |

Use `add` for creating, `save` for updating, `cancel` for closing or clearing,
`edit` for keeping edits, `delete` for removing/discarding, and `copy` for cloning.
The label states the specific outcome. Explicit variants handle context.
The existing `actionIcons` aliases and specialised glyphs remain available for
manual icon compositions; they are not additional Button presets.

Cancel is outline. Use the appropriate destructive AlertDialog treatment for deletion; discarding edits uses the default dialog treatment. Save and Update buttons may use `loading` while their action is in progress. Keep their label unchanged, guard duplicate submissions in the handler and use Toast for the result. Other action labels also remain stable. New domain actions still require deliberate icon choice; this map does not define permissions or behaviour.

Executable examples: [async form](recipes/async-form.tsx), [persistent editor](recipes/persistent-editor.tsx).

For unsaved edits, follow the [Alert dialog navigation contract](alert-dialog.md#unsaved-change-navigation-contract): Keep editing uses `preset="edit"`, and Discard changes uses `preset="delete"`. The label and dialog context distinguish discarding edits from deleting a record.

Confirmation buttons must use a supported preset matching the consequence. Alert dialog actions must name the consequence, such as “Delete account” or “Discard changes”, rather than “Confirm”.

Retry uses `retry`; clearing a search uses `cancel`. Both default to outline.
