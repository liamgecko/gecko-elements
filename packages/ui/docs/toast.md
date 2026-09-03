# Toast

Import: `@gecko/ui/components/toast`  
Status: Stable  
Source: `src/components/toast.tsx`  
Human documentation: `apps/docs/src/pages/toast/index.tsx`

## Purpose

Toast gives brief, non-blocking feedback after an action or while short asynchronous work is progressing.

Use Alert when feedback must remain in the page. Use Alert dialog when a decision must block the next action. Use a field error when feedback belongs to one form control.

Toast uses Shadcn’s composition built on Base UI. Sonner is not part of the component or public API.

## Application setup

Render one Toaster near the application root:

```tsx
<App>
  <Routes />
  <Toaster />
</App>
```

Use the exported shared manager to trigger feedback:

```tsx
import { toast } from "@gecko/ui/components/toast"

toast.add({
  title: "Event created",
  type: "success",
})
```

Do not import Base UI Toast directly into application code. Do not create another global manager unless an isolated application surface genuinely requires its own notification queue.

## Composition

```text
ToastProvider
└── ToastPortal
    └── ToastViewport
        └── Toast
            └── ToastContent
                ├── ToastTitle
                ├── ToastDescription
                ├── ToastAction
                └── ToastClose
```

Toaster assembles this composition and renders notifications from the shared manager. The individual parts are exported for advanced library compositions, not for ordinary product calls.

## Message structure

`title` is the primary message. Keep it short and state what happened:

```tsx
toast.add({
  title: "Changes saved",
  description: "Your changes are now available to the team.",
})
```

Use `description` only when the title needs supporting context. Do not place essential instructions in a temporary toast.

## Types

Use a type only when it communicates meaning:

```tsx
toast.add({
  title: "Event created",
  type: "success",
})

toast.add({
  title: "Your export is ready to download",
  type: "info",
})

toast.add({
  title: "Check the audience before publishing",
  type: "warning",
})

toast.add({
  title: "Changes could not be saved",
  type: "error",
  priority: "high",
  timeout: 0,
})

toast.add({
  title: "Syncing data…",
  type: "loading",
  timeout: 0,
})
```

The approved types are `success`, `info`, `warning`, `error` and `loading`. Untyped toasts use the neutral presentation.

The type selects Gecko’s icon treatment. It does not replace a specific title, description or appropriate announcement priority.

## Actions

Use one action for a reversible outcome:

```tsx
toast.add({
  title: "Conversation closed",
  description: "The conversation was moved out of the inbox.",
  timeout: 0,
  actionProps: {
    children: "Undo",
    onClick: restoreConversation,
  },
})
```

Actionable toasts persist with `timeout: 0` so keyboard and screen-reader users have time to reach the action. Keep the action label concise and specific. Do not place several actions or a confirmation flow in a toast.

An action replaces the close control. Never render both controls on the same toast.

## Asynchronous work

Prefer `toast.promise` when success and failure follow one promise:

```tsx
void toast.promise(createProject(), {
  loading: {
    title: "Creating project…",
  },
  success: (project) => ({
    title: `${project.name} created`,
    type: "success",
  }),
  error: (error) => ({
    title: "Project could not be created",
    description: error instanceof Error ? error.message : undefined,
    type: "error",
    priority: "high",
  }),
})
```

Use `add` and `update` when the lifecycle is not represented by one promise:

```tsx
const id = toast.add({
  title: "Syncing data…",
  type: "loading",
  timeout: 0,
})

toast.update(id, {
  title: "Data synced",
  type: "success",
  timeout: 5000,
})
```

Update the existing notification instead of adding a new toast for every stage.

Keep promise state copy in the same content field. Gecko uses `title` for loading, success and error so each update replaces the previous message. A string promise state maps to Base UI’s `description` field and can remain visible if the next state updates only `title`.

## Manager interface

| Method    | Signature                              | Meaning                                                    |
| --------- | -------------------------------------- | ---------------------------------------------------------- |
| `add`     | `(options) => string`                  | Adds a toast and returns its id                            |
| `update`  | `(id, options) => void`                | Updates a toast and refreshes its auto-dismiss timer       |
| `close`   | `(id?) => void`                        | Closes one toast, or every toast when no id is supplied    |
| `promise` | `(promise, options) => Promise<Value>` | Tracks loading, success and failure for an existing promise |

## Toast options

| Property          | Type                                                        | Default | Meaning                                                  |
| ----------------- | ----------------------------------------------------------- | ------- | -------------------------------------------------------- |
| `id`              | `string`                                                    | —       | Supplies a stable id or updates a toast with that id     |
| `title`           | `React.ReactNode`                                           | —       | Sets the primary message                                 |
| `description`     | `React.ReactNode`                                           | —       | Adds supporting detail                                   |
| `type`            | `"success" \| "info" \| "warning" \| "error" \| "loading"` | —       | Selects the semantic visual treatment                    |
| `timeout`         | `number`                                                    | `5000`  | Sets auto-dismiss time; zero persists                    |
| `priority`        | `"low" \| "high"`                                         | `"low"` | Selects polite or urgent announcement behaviour          |
| `actionProps`     | `ComponentPropsWithoutRef<"button">`                        | —       | Adds one action and removes the close control            |
| `onClose`         | `() => void`                                                | —       | Runs when closing begins                                 |
| `onRemove`        | `() => void`                                                | —       | Runs after the toast is removed following exit animation |
| `positionerProps` | Base UI positioner properties                               | —       | Anchors an advanced toast to an element                  |
| `data`            | Application-defined object                                  | —       | Supplies custom data to an advanced renderer             |

## Toaster interface

| Property       | Type           | Default | Meaning                                      |
| -------------- | -------------- | ------- | -------------------------------------------- |
| `timeout`      | `number`       | `5000`  | Sets the default auto-dismiss time           |
| `limit`        | `number`       | `3`     | Sets the maximum number displayed at once    |
| `toastManager` | `ToastManager` | `toast` | Supplies the manager used by this provider   |

Toaster also accepts children rendered inside ToastProvider.

## Accessibility

- Base UI owns the live-region announcements, focus management, F6 navigation, dismissal and swipe behaviour.
- Use low priority for routine status feedback.
- Use high priority only when an urgent failure needs immediate announcement.
- Keep actionable toasts and important errors available until dismissed.
- The visible title and description must contain the text that needs announcing. Do not rely on arbitrary visual children for urgent announcements.
- Keep the close control’s accessible name.
- Do not move focus to a toast when it appears.
- Do not use colour or an icon as the only indication of meaning.
- Structural toast motion is removed when reduced motion is requested. The loading icon remains the established indeterminate indicator.

## Styling contract

Toast owns viewport placement, stacking, entrance and exit motion, expanded layout, swipe movement, surface, border, shadow, focus treatment, spacing and close/action controls.

Gecko adds the approved status icons and colours:

- success uses the green confirmation icon;
- info uses the blue information icon;
- warning uses the yellow warning icon;
- error uses the red destructive icon;
- loading uses the muted rotating loader.

Application code selects `type`. It does not recolour the toast, replace its status icons, change its radius, or restyle its internal parts.

## Agent rules

1. Import `toast` and `Toaster` from `@gecko/ui/components/toast`.
2. Render one Toaster near the application root.
3. Use `toast.add` for ordinary feedback and choose a type based on meaning.
4. Write a concise, specific title that states what happened.
5. Add a description only when it gives useful supporting context.
6. Use `toast.promise` or update one toast during asynchronous work.
7. Give loading toasts `timeout: 0` until they are updated or closed.
8. Keep actionable toasts available with `timeout: 0`.
9. Never show a close control on a toast that has an action.
10. Use high priority sparingly for urgent failures.
11. Use Alert for persistent feedback, Alert dialog for confirmation, and field errors for form controls.
12. Do not import Base UI Toast or recreate the Shadcn composition in application code.
13. Preserve Gecko’s type styling, close control, motion, stacking and focus behaviour.

## API reference

- [Shadcn Toast documentation](https://ui.shadcn.com/docs/components/base/toast)
- [Base UI Toast API](https://base-ui.com/react/components/toast)

## Related

- **Alert** — persistent feedback within the page.
- **Alert dialog** — a blocking decision or confirmation.
- **Spinner** — indeterminate loading inside an existing interface.
- **Progress** — measurable completion.
