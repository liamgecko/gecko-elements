# Button

Import: `@gecko/ui/components/button`  
Status: Stable  
Source: `src/components/button.tsx`  
Human documentation: `apps/docs/src/pages/button/index.tsx`

## Purpose

Button starts an action. Its visible label states the outcome, such as “Save changes”, “Add person”, or “Remove filter”.

Use a native link for navigation. Use Toggle for a persistent on/off choice, Dropdown menu for a list of actions, and Alert dialog when an irreversible action needs confirmation.

## Canonical usage

Default is the primary treatment. Omit `variant` and `size` for the main action.

```tsx
import { Button } from "@gecko/ui/components/button";

<Button onClick={saveChanges}>Save changes</Button>;
```

Normally use one default Button per Header, dialog footer, form action row, or other local decision area. Use Outline for the normal secondary action.

```tsx
<Button variant="outline" onClick={cancelChanges}>Cancel</Button>
<Button onClick={saveChanges}>Save changes</Button>
```

## Variants

The approved variants are a closed set:

| Variant               | Use                                                                           |
| --------------------- | ----------------------------------------------------------------------------- |
| `default`             | Main action; normally one per local decision area                             |
| `outline`             | Canonical secondary action                                                    |
| `outline-destructive` | Neutral outline whose interaction states communicate destructive intent       |
| `secondary`           | Soft-filled contextual action used only by a documented component composition |
| `ghost`               | Low-emphasis toolbar or icon control on a standard surface                    |
| `ghost-light`         | Contextual control on a light specialised surface, including Reply Box        |
| `ghost-dark`          | Contextual control on a dark surface, including App Header                    |
| `destructive`         | Prominent destructive or high-risk action                                     |
| `ghost-destructive`   | Quiet remove action in a row, list, menu, or compact control                  |
| `link`                | Low-emphasis action that still behaves as a button                            |

Choose variants from action hierarchy and context, not colour preference. `ghost-light`, `ghost-dark`, and `secondary` require a documented component recipe. Agents must obtain explicit user consent before adding or changing variants, props, meanings, or visual treatments.

`variant="link"` remains an action. Navigation uses an anchor or application router Link with `buttonVariants` when it needs Button styling.

## Sizes

Omit `size` for normal use. The default height is 32 px.

Button uses its intrinsic content width in every layout, including forms, FieldGroup and FieldSet. Set `className="w-full"` only when the design explicitly requires a full-width action.

| Size       | Use                                                                                   |
| ---------- | ------------------------------------------------------------------------------------- |
| `xs`       | Dense labelled controls                                                               |
| `sm`       | Compact toolbars and supporting actions                                               |
| `default`  | Standard application action                                                           |
| `lg`       | Deliberately prominent action in a spacious composition                               |
| `icon-xs`  | Dense icon-only control                                                               |
| `icon-sm`  | Compact icon-only control                                                             |
| `icon`     | Standard icon-only control                                                            |
| `icon-lg`  | Prominent icon-only control                                                           |
| `icon-2xs` | Internal 20 px control used only by an approved dense composition such as Inline Edit |

Use the icon size corresponding to the surrounding labelled Button size. `icon-2xs` relies on the approved composition’s spacing to meet the interaction-target requirement and is not a general-purpose size.

## Icons

Place a supporting icon beside visible text and mark its logical position with `data-icon`. Button owns icon sizing and adjusts logical padding.

```tsx
<Button>
  <PlusIcon data-icon="inline-start" />
  Add person
</Button>

<Button variant="outline">
  Continue
  <ArrowRightIcon data-icon="inline-end" />
</Button>
```

Use `inline-start` and `inline-end`, not physical left and right, so the composition remains direction-aware. Icons are decorative when the visible label states the action.

Icon-only Buttons use an icon size and a contextual accessible name:

```tsx
<Button size="icon" aria-label="Open settings">
  <SettingsIcon />
</Button>
```

## Loading

Set `loading` while the action is running.

```tsx
import { useState } from "react";

import { Button } from "@gecko/ui/components/button";

export function SaveChangesButton({
  saveChanges,
}: {
  saveChanges: () => Promise<void>;
}) {
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);

    try {
      await saveChanges();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Button loading={isSaving} onClick={handleSave}>
      {isSaving ? "Saving changes" : "Save changes"}
    </Button>
  );
}
```

Button places the approved Loader beside the visible action wording, sets `aria-busy`, prevents repeated activation, and remains focusable. The Loader stops under reduced-motion preferences.

Keep meaningful action wording as children. It may change from the action to its present-progress form, such as “Save changes” to “Saving changes”. For an icon-only loading Button, retain the action’s accessible name:

```tsx
<Button size="icon" loading={isRefreshing} aria-label="Refresh results">
  <RefreshIcon />
</Button>
```

Callers do not add a Spinner, `disabled`, or `focusableWhenDisabled` for this state.

## Disabled

Set `disabled` only when an action is genuinely unavailable because of permission or context. A disabled Button is excluded from normal interaction unless the advanced Base UI `focusableWhenDisabled` property is explicitly required.

Keep form submission enabled before validation. On submit, show field errors and focus the first invalid field. Use `loading` after submission starts.

## Dropdown trigger

Set `dropdown` only on a Button composed with DropdownMenuTrigger. Button supplies the approved chevron; DropdownMenuTrigger supplies menu semantics, state, and interaction.
The chevron rotates when the trigger opens and returns when it closes. Reduced-motion preferences retain the directional state without the transition.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger
    render={
      <Button variant="outline" dropdown>
        Actions
      </Button>
    }
  />
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

The `dropdown` property is not a standalone disclosure implementation.

## Forms

Base UI safely renders Button with `type="button"` by default. Set `type="submit"` explicitly for form submission.

```tsx
<form onSubmit={submitForm}>
  {/* fields */}
  <Button type="submit" loading={isSubmitting}>
    Save changes
  </Button>
</form>
```

## Accessibility

- Button uses native button semantics, keyboard activation, and visible focus treatment.
- The visible label names the action; icon-only Buttons have a contextual `aria-label`.
- Loading keeps action wording visible, communicates `aria-busy`, blocks repeat activation, and retains focus.
- Disabled is reserved for genuinely unavailable actions rather than undisclosed validation requirements.
- Destructive labels state the consequence; colour is not the only cue.
- Small icon targets are used only where the documented spacing or composition meets interaction-target requirements.
- Navigation remains a native link.

## Interface

| Property                  | Type                                                                                                                                                           | Default     | Meaning                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| `variant`                 | `"default" \| "outline" \| "outline-destructive" \| "secondary" \| "ghost" \| "ghost-light" \| "ghost-dark" \| "ghost-destructive" \| "destructive" \| "link"` | `"default"` | Approved action hierarchy and surface treatment                                               |
| `size`                    | `"xs" \| "sm" \| "default" \| "lg" \| "icon-2xs" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg"`                                                             | `"default"` | Approved labelled or square scale                                                             |
| `loading`                 | `boolean`                                                                                                                                                      | `false`     | Owned busy state with Loader, visible action label, activation protection and focus retention |
| `dropdown`                | `boolean`                                                                                                                                                      | `false`     | Adds the approved trailing chevron for DropdownMenuTrigger composition                        |
| `disabled`                | `boolean`                                                                                                                                                      | `false`     | Makes a genuinely unavailable action inactive                                                 |
| `focusableWhenDisabled`   | `boolean`                                                                                                                                                      | `false`     | Advanced Base UI disabled behaviour; loading enables it automatically                         |
| Base UI Button properties | `ButtonPrimitive.Props`                                                                                                                                        | —           | Native button behaviour and event integration                                                 |

`buttonVariants` is exported for applying the approved visual treatment to a real anchor or router Link. Preserve native link behaviour and a real destination.

## Styling contract

The library owns colour, border, radius, spacing, typography, icon sizing, dropdown chevron, focus, hover, disabled, invalid, and loading treatments.

Use `className` only for documented layout integration such as width or parent alignment. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, variants, sizes, behaviours, meanings, or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI Button foundation, CVA variant interface, native semantics, render composition, focus treatment, disabled behaviour, and icon-position attributes. Gecko applies its compact radius, spacing and colours; adds contextual ghost treatments, outlined and quiet destructive treatments, `icon-2xs`, the approved dropdown chevron, and an owned loading state. Gecko deliberately uses focused colour transitions rather than `transition-all`.
