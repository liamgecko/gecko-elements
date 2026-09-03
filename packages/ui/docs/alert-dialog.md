# Alert dialog

Import: `@gecko/ui/components/alert-dialog`  
Status: Stable  
Source: `src/components/alert-dialog.tsx`  
Human documentation: `apps/docs/src/pages/alert-dialog/index.tsx`

## Purpose

Alert dialog is a blocking confirmation for an important decision that must be answered before the user can continue. Use it immediately before a consequential action.

Deletion always requires an Alert dialog. Alert dialog is also the canonical confirmation when leaving would discard unsaved work, or when changes must be confirmed before saving.

Do not use Alert dialog for reversible actions, informational messages, forms, or general content.

## Import

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gecko/ui/components/alert-dialog";
```

## Composition

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

Always include a title, description, cancel control, and action control.

## Decision matrix

| Situation                     | Configuration            | Action treatment        |
| ----------------------------- | ------------------------ | ----------------------- |
| Confirm deletion              | Alert dialog is required | `variant="destructive"` |
| Discard unsaved changes       | Alert dialog             | Omit `variant`          |
| Confirm changes before saving | Alert dialog             | Omit `variant`          |

`destructive` is the only Alert dialog variant. Discarding changes and confirming a save are default usage recipes, not variants.

Agents must not add `unsaved-changes`, `confirm-save`, or any other variant or prop without explicit user consent.

Set the treatment on `AlertDialog`. Do not override `variant` directly on `AlertDialogAction`.

## Canonical configurations

### Delete an object

Deletion always uses the destructive variant. Name the object in the title and action.

```tsx
<AlertDialog variant="destructive">
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Delete account
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete account?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently deletes the account and all of its data. This action
        cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteAccount}>
        Delete account
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Discard unsaved changes

This is the canonical setup when navigation would lose work. The cancel control keeps the current editing surface open. The action discards the changes and performs the navigation.

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Leave page
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
      <AlertDialogDescription>
        If you leave now, the changes you have made will be lost.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep editing</AlertDialogCancel>
      <AlertDialogAction onClick={discardChanges}>
        Discard changes
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Do not label `AlertDialogCancel` “Discard changes.” Cancel is the safe route back to editing.

### Confirm save

Use the default treatment when changes must be confirmed before saving.

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Save changes
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Save changes?</AlertDialogTitle>
      <AlertDialogDescription>
        Saving will apply these changes to every active campaign using this
        form.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={saveChanges}>Save changes</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Action behaviour

- `AlertDialogCancel` is the safe exit. It closes the dialog without performing the consequential operation.
- `AlertDialogAction` is the confirmed route. Its `onClick` handler performs the deletion, discard, save, or navigation.
- Both controls use the Base UI close primitive and close the dialog when activated.
- Use a controlled `open` state when an application must keep the dialog open while an asynchronous operation completes.
- Keep the trigger label, title, and action label specific to the object or consequence.

Use labels such as “Delete account”, “Discard changes”, and “Save changes”. Do not use “OK”, “Continue”, “Confirm”, “Confirm deletion”, or “Are you absolutely sure?”.

## Accessibility

- Base UI owns the modal semantics, focus containment, keyboard interaction, and focus restoration.
- Always provide `AlertDialogTitle` and `AlertDialogDescription` so the decision and consequence are announced.
- Always provide `AlertDialogCancel`; do not trap the user in the consequential route.
- Do not rely on colour or button treatment to communicate risk.
- Keep action labels specific and unambiguous.

## Interface

| Property  | Component           | Type                 | Default | Meaning                                                  |
| --------- | ------------------- | -------------------- | ------- | -------------------------------------------------------- |
| `variant` | `AlertDialog`       | `"destructive"`      | none    | Applies the destructive treatment to `AlertDialogAction` |
| `onClick` | `AlertDialogAction` | Button click handler | none    | Performs the confirmed application operation             |

The component parts also accept their corresponding Base UI or native element properties.

## Styling contract

Use the existing composition and variant. Do not override the overlay, panel, spacing, radius, typography, button order, action treatment, or responsive layout with `className`.

Agents must not add variants, sizes, behaviour props, media, or custom styling without explicit user consent. Stop and ask when the existing interface cannot satisfy a requirement.

## Related components

- **Dialog** — forms or general modal content that are not a confirmation.
- **Alert** — persistent page information that does not require a decision.
- **Toast** — brief feedback and reversible actions that can offer undo.
