# Dialog

Import: `@gecko/ui/components/dialog`  
Status: Stable  
Source: `src/components/dialog.tsx`  
Human documentation: `apps/docs/src/pages/dialog/index.tsx`

## Purpose

Dialog presents a focused setup or editing task above the current page while Base UI makes the rest of the interface unavailable.

Use Dialog for create and edit forms, configuration tasks and similarly focused modal workflows. Use Alert dialog for deletion, discarding unsaved changes, confirming a save or another consequential decision. Use Sheet when the task should enter from an edge while retaining more page context.

## Canonical application usage

```tsx
import { Button } from "@gecko/ui/components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogWrapper,
} from "@gecko/ui/components/dialog";
import { Field, FieldLabel } from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Edit project
  </DialogTrigger>
  <DialogContent>
    <DialogWrapper>
      <DialogHeader>
        <DialogTitle>Edit project</DialogTitle>
        <DialogDescription>
          Update the project details, then save your changes.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <form id="edit-project-form" onSubmit={saveProject}>
          <Field>
            <FieldLabel htmlFor="project-name">Project name</FieldLabel>
            <Input id="project-name" name="projectName" />
          </Field>
        </form>
      </DialogBody>
    </DialogWrapper>
    <DialogFooter showCloseButton closeButtonText="Cancel">
      <Button type="submit" form="edit-project-form">
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

The product owns form state, validation, submission and the result of the primary action. Dialog owns modal behaviour, structure, dismissal and presentation.

## Composition

```text
Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogWrapper
    │   ├── DialogHeader
    │   │   ├── DialogTitle
    │   │   └── DialogDescription
    │   └── DialogBody
    └── DialogFooter
```

`DialogTitle` is required. `DialogDescription`, `DialogBody` and `DialogFooter` are included when the task needs them. `DialogWrapper` is the padded, scrollable content region; keep the header and body inside it. Keep `DialogFooter` as a direct child of `DialogContent` so its actions remain available while long content scrolls.

## Titles and descriptions

Every Dialog includes one concise `DialogTitle`. Base UI uses it as the modal’s accessible name.

Add `DialogDescription` when the title alone does not explain the task or its effect. Keep essential instructions beside the relevant control in `DialogBody` rather than placing every instruction in the description.

## Actions and closing

Use `DialogFooter` for task actions. Set `showCloseButton` with `closeButtonText="Cancel"` for the standard secondary dismissal, then place the single primary action in `children`.

```tsx
<DialogFooter showCloseButton closeButtonText="Cancel">
  <Button type="submit" form="settings-form">
    Save changes
  </Button>
</DialogFooter>
```

The footer dismissal uses Base UI’s close primitive and closes the Dialog automatically. The product supplies the primary action handler and decides when a successful asynchronous action closes a controlled Dialog.

`DialogContent` shows the corner close action by default. Set `showCloseButton={false}` only when another `DialogClose` is rendered inside `DialogContent`, including the close action supplied by `DialogFooter`. A modal Dialog always retains a visible close route for touch and screen-reader users.

Use verb-first labels that name the outcome, such as “Save changes”, “Create project” and “Cancel”.

## Sizes

Set `size` on `DialogContent`. Omit it for the canonical `md` size.

| Size | Width from `sm` upwards | Use                                                     |
| ---- | ----------------------- | ------------------------------------------------------- |
| `xs` | `max-w-md`              | Compact single-step tasks                               |
| `sm` | `max-w-xl`              | Short forms with few fields                             |
| `md` | `max-w-2xl`             | Standard forms and setup tasks; default                 |
| `lg` | `max-w-4xl`             | Multi-section forms or wider content                    |
| `xl` | `max-w-6xl`             | Dense editors or previews that genuinely need the width |

Choose the smallest size that presents the task without crowding. Use a page when the workflow has grown into a full workspace rather than expanding Dialog further.

The Dialog always remains within the viewport. `DialogWrapper` scrolls long content and keeps an optional footer available.

## Controlled state

Use the Base UI `open` and `onOpenChange` props when application state must control the Dialog, including asynchronous submissions that keep it open until the operation succeeds.

Keep submission behaviour in the product. Do not add workflow-specific loading, saving or request props to Dialog.

## Accessibility

- Base UI owns modal semantics, scroll locking, focus containment, Escape handling and focus restoration.
- `DialogTitle` provides the accessible name and is required.
- `DialogDescription` provides optional supporting context.
- Keep a `DialogClose` inside every modal Dialog. The default corner control satisfies this unless it is disabled in favour of another visible close action.
- Keep form labels, errors and descriptions associated with their controls inside `DialogBody`.
- Preserve DOM action order: secondary dismissal first and the primary action last.

## Interface

### Parts

| Part                | Meaning                                                |
| ------------------- | ------------------------------------------------------ |
| `Dialog`            | Root state and modal behaviour                         |
| `DialogTrigger`     | Opens the Dialog                                       |
| `DialogContent`     | Portal, overlay, panel, width and corner close action  |
| `DialogWrapper`     | Padded, scrollable header and body region              |
| `DialogHeader`      | Groups title and optional description                  |
| `DialogTitle`       | Required accessible and visible title                  |
| `DialogDescription` | Optional supporting context                            |
| `DialogBody`        | Main task content                                      |
| `DialogFooter`      | Task actions and optional standard dismissal           |
| `DialogClose`       | Low-level close primitive for a custom close control   |
| `DialogPortal`      | Low-level portal already composed by `DialogContent`   |
| `DialogOverlay`     | Low-level backdrop already composed by `DialogContent` |

### Gecko properties

| Property          | Component       | Type                                   | Default   | Meaning                             |
| ----------------- | --------------- | -------------------------------------- | --------- | ----------------------------------- |
| `size`            | `DialogContent` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`    | Selects an approved panel width     |
| `showCloseButton` | `DialogContent` | `boolean`                              | `true`    | Shows the corner close action       |
| `showCloseButton` | `DialogFooter`  | `boolean`                              | `false`   | Adds the standard outline dismissal |
| `closeButtonText` | `DialogFooter`  | `string`                               | `"Close"` | Labels the footer dismissal         |

The compound parts also accept their corresponding Base UI or native element properties. `DialogContent` already composes `DialogPortal` and `DialogOverlay`; application code does not compose those parts separately.

## Styling contract

The library owns the overlay, panel, width scale, viewport containment, internal scrolling, spacing, radius, typography, footer divider, action alignment and close controls.

Use `className` only for a documented layout integration that cannot be expressed by the component interface. Keep the approved internal chrome unchanged and request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing parts, props, sizes, behaviours, meanings or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI modal foundation, compound trigger/content/title/description parts, overlay, portal, corner close action and responsive footer. Gecko adds the approved width scale, `DialogWrapper`, `DialogBody`, footer dismissal label and viewport-safe scrolling. Gecko keeps padding in the scrollable wrapper and the footer outside it so long tasks do not hide their actions.
