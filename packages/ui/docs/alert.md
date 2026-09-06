# Alert

Import: `@gecko/ui/components/alert`  
Status: Stable  
Source: `src/components/alert.tsx`  
Human documentation: `apps/docs/src/pages/alert/index.tsx`

## Purpose

Alert is a persistent, non-blocking callout for important information within a page or section. The parent removes it when the underlying condition ends. Make an Alert dismissible only when the message is safe to acknowledge and clear.

Use Toast for brief post-action feedback. Use Alert dialog when someone must confirm an action before it happens. Use a field-level error for a problem belonging to one form control.

## Import

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@gecko/ui/components/alert";
```

Import Button separately when the Alert has an action.

## Composition

```text
Alert
├── AlertTitle
├── AlertDescription
└── AlertAction (optional)
```

`AlertAction` is a positioned wrapper. It does not create an interactive control. Put one Button or link inside it and give that control a visible, verb-first label. Omit the Button variant: `AlertAction` automatically applies the same contextual treatment as the dismiss control and inherits semantic hover and focus states from the owning Alert.

```tsx
<Alert variant="warning" icon>
  <AlertTitle>Connection needs attention</AlertTitle>
  <AlertDescription>
    Reconnect the integration to continue receiving updates.
  </AlertDescription>
  <AlertAction>
    <Button size="sm">
      Reconnect
    </Button>
  </AlertAction>
</Alert>
```

Use an action or dismissal, not both. When `AlertAction` is present, Alert does not render its automatic dismiss button.

## Variants

| Variant       | Use when                                                             | Do not use for                                                       |
| ------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `default`     | An important neutral notice has no more specific status              | Ordinary page copy                                                   |
| `info`        | Contextual information about the current state or available options  | Temporary post-action feedback                                       |
| `success`     | A successful state must remain visible                               | Ordinary success feedback after an action; use Toast                 |
| `warning`     | A potential problem needs attention while the page remains available | Blocking confirmation                                                |
| `destructive` | An error, failure, or critical state needs to remain visible         | Confirming deletion or another irreversible action; use Alert dialog |

Choose the variant for the meaning of the message. Agents must not add or reinterpret variants without explicit user consent.

## Icons

Set `icon` to render the library-owned icon mapped to the current variant.

```tsx
<Alert variant="warning" icon>
  <AlertTitle>Connection needs attention</AlertTitle>
  <AlertDescription>
    Reconnect the integration to continue receiving updates.
  </AlertDescription>
</Alert>
```

Pass a React node only when an approved, context-specific icon communicates more clearly than the default. Agents must not invent or substitute icons without explicit user consent.

Icons are decorative. The title and description must communicate the complete message without relying on colour or an icon.

## Dismissal

Use `dismissible` only when the message can be safely acknowledged and removed.

```tsx
<Alert variant="info" icon dismissible={{ onDismiss: handleDismiss }}>
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>
    You can now export this report as a CSV file.
  </AlertDescription>
</Alert>
```

Keep these messages visible:

- Unresolved errors.
- Required instructions.
- Ongoing conditions.
- Messages with an action the person still needs to take.

`dismissible` accepts `true` or an object containing optional `label`, `ariaLabel`, and `onDismiss` values. Alert owns the dismiss button and local exit state. The parent can use `onDismiss` to update application state. The exit treatment respects reduced-motion preferences.

## Accessibility

- Alert uses `role="alert"` by default, matching the Shadcn composition.
- Use Alert only for important callouts that warrant announcement when dynamically inserted.
- Override with `role="status"` when a dynamic update is informative rather than urgent.
- Keep the complete meaning in visible text; icons are hidden from assistive technology.
- Put a native Button or an appropriate link inside `AlertAction`.
- Use a visible action label that names the next step.
- The automatic dismiss button has an accessible name. Supply `dismissible.ariaLabel` only when “Dismiss alert” is not specific enough.

## Interface

| Property      | Type                                                                        | Default     | Meaning                                                                |
| ------------- | --------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `variant`     | `"default" \| "destructive" \| "info" \| "success" \| "warning"`            | `"default"` | Message meaning and visual treatment                                   |
| `icon`        | `boolean \| React.ReactNode`                                                | `false`     | `true` uses the mapped icon; a node supplies an approved custom icon   |
| `dismissible` | `boolean \| { label?: string; ariaLabel?: string; onDismiss?: () => void }` | `false`     | Adds the internal dismiss control                                      |
| `role`        | `React.AriaRole`                                                            | `"alert"`   | Inherited from `div`; use `status` only for non-urgent dynamic updates |

`AlertAction` accepts standard `div` properties and renders its children unchanged.

## Styling contract

Use the existing variants and composition. Do not override Alert colour, border, padding, radius, typography, action placement, or dismissal treatment with `className`.

Agents must not add variants, icons, action modes, or behaviour props without explicit user consent. Stop and ask when the current interface cannot satisfy a requirement.

## Do and don't

Do:

- Keep the title short and the supporting text actionable.
- Match the variant to the meaning.
- Prefer the mapped default icon.
- Use one Button or link inside `AlertAction`.
- Make dismissal available only for messages that are safe to clear.

Don't:

- Use Alert for ordinary page copy or temporary feedback.
- Use destructive Alert to confirm an irreversible action.
- Combine `AlertAction` with `dismissible`.
- Rely on colour or an icon to communicate meaning.
- Extend or restyle the interface without consent.

## Related components

- **Toast** — brief post-action feedback that can disappear.
- **Alert dialog** — confirmation required before an action proceeds.
- **Field** — an error or instruction belonging to one form control.
