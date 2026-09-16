# Action icons

Import: `@geckolabs/elements/lib/action-icons`  
Status: Stable  
Source: `src/lib/action-icons.ts`  
Human documentation: `apps/docs/src/pages/guides/action-icons.tsx`

## Purpose

Use `actionIcons` for common application actions. Render with `HugeiconsIcon` from `@geckolabs/elements/lib/icon`, `aria-hidden="true"` and `data-icon="inline-start"` inside a labelled Button. For Header actions, supply the icon node through its `icon` property. Button remains a general primitive and does not infer an icon from its label.

The common map follows the React app's shared Button presets (Close, Cancel, Save, Delete, Add, Copy, Actions and Confirm), with Edit and Update named explicitly. Equivalent actions share a glyph; committing an update uses Save, while entering editing mode uses Edit. These are the approved Hugeicons equivalents of the app's older icon names.

| Action | Keys | Glyph |
| --- | --- | --- |
| Close / Cancel | close, cancel | XIcon |
| Save / Update | save, update | CheckCheckIcon |
| Edit / Keep editing | edit, keepEditing | Edit02Icon |
| Delete / Remove / Discard | delete, remove, discard | Delete02Icon |
| Create / Add | create, add | PlusIcon |
| Copy / Clone | copy, clone | Copy01Icon |
| Actions | actions | Settings01Icon |
| Confirm | confirm | Tick02Icon |

Keep feature-specific icons in the owning feature's documentation; they are not universal button categories. Existing `restore`, `lock`, `updatePermissions` and `submitForApproval` exports remain available for compatibility, but are not part of the common reference map. Their glyphs remain DeletePutBackIcon, SquareLockCheck01Icon (both lock keys) and CheckmarkSquare03Icon respectively.

Cancel is outline. Use the appropriate destructive AlertDialog treatment for deletion; discarding edits uses the default dialog treatment. Save buttons never enter a loading/saving or pending-disabled state. Keep their label and icon unchanged, guard duplicate submissions in the handler and use Toast for the result. Other action labels also remain stable. New domain actions still require deliberate icon choice; this map does not define permissions or behaviour.

Executable examples: [async form](recipes/async-form.tsx), [persistent editor](recipes/persistent-editor.tsx).

For unsaved edits, follow the [Alert dialog navigation contract](alert-dialog.md#unsaved-change-navigation-contract): Keep editing uses `edit` (or `keepEditing`), and Discard changes uses `delete` (or `discard`). The label and dialog context distinguish discarding edits from deleting a record.

`confirm` is an icon category, not recommended dialog button copy. Alert dialog actions must name the consequence, such as “Delete account” or “Discard changes”, rather than “Confirm”.
