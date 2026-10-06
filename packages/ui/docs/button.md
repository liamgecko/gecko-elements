# Button

Import: `@geckolabs/elements/components/button`  
Status: Stable  
Source: `src/components/button.tsx`  
Human documentation: `apps/docs/src/pages/button/index.tsx`

Use an explicit `preset` for common action icons and default variants. Labels, translations and handlers remain application-owned.

## Purpose

Button starts an action. Its visible label states the outcome, such as “Save changes”, “Add person”, or “Remove filter”.

Use descriptive, verb-first task labels that name the object or outcome: “Add to category”, “Send test”, “Update permissions”, or “Unlock template”. Do not use vague primary labels such as “OK”, “Add”, “Send”, or “Save” when the task can be named. Override preset labels with the product action; presets supply icons and variants, not sufficient task context. Standard dismissals such as “Cancel” and navigation such as “Next” remain concise.

Use a native link for navigation. Use Toggle for a persistent on/off choice, Dropdown menu for a list of actions, and Alert dialog when an irreversible action needs confirmation.

## Canonical usage

Default is the primary treatment. Omit `variant` and `size` for the main action.

```tsx
import { Button } from "@geckolabs/elements/components/button";

<Button preset="save" onClick={saveChanges}>
  Save changes
</Button>;
```

Normally use one default Button per Header, dialog footer, form action row, or other local decision area. Use Outline for the normal secondary action.

```tsx
<Button preset="cancel" onClick={cancelChanges}>Cancel</Button>
<Button preset="save" onClick={saveChanges}>Save changes</Button>
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

`destructive` uses a solid red background with white text in light mode. Dark mode retains its muted destructive background and destructive-coloured text.

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

## Action presets

For common actions, choose an explicit `preset`. It supplies the approved decorative
icon and default variant; labels, translations, permissions and handlers remain
application-owned. Nothing is inferred from the label.

```tsx
import { Button } from "@geckolabs/elements/components/button";

<Button preset="save" type="submit">Save settings</Button>
<Button preset="cancel" onClick={cancel}>Cancel</Button>
<Button preset="delete" onClick={requestDeletion}>Delete device</Button>
<Button preset="edit" variant="ghost" onClick={edit}>Edit device</Button>
```

| Preset     | Default variant | Use                                 |
| ---------- | --------------- | ----------------------------------- |
| `add`      | `default`       | Add or create an item               |
| `save`     | `default`       | Save or update settings or a record |
| `cancel`   | `outline`       | Cancel, close, or clear a search    |
| `edit`     | `outline`       | Edit or keep editing                |
| `delete`   | `destructive`   | Delete, remove, or discard          |
| `copy`     | `outline`       | Copy or clone                       |
| `actions`  | `outline`       | Open an action menu                 |
| `retry`    | `outline`       | Retry a failed action               |
| `next`     | `default`       | Move to the next step               |
| `previous` | `outline`       | Move to the previous step           |

These are the complete supported `ButtonPreset` keys. Presets are optional; not every button needs one. Labels, translations,
permissions and handlers remain application-owned. Do not derive a preset from
button text or add a manual icon alongside a preset. Explicit `variant` overrides
the preset default; for example, discarding edits uses `preset="delete"` in a
normal Alert dialog, whose context retains the primary action treatment.
Icon-only preset buttons require an accessible name. Save may use `loading` while
its label remains unchanged.

Header primary and secondary button actions accept `preset`. Secondary actions
retain outline hierarchy unless an explicit variant is supplied. DialogFooter's
built-in Close/Cancel action uses `cancel`. AlertDialogCancel accepts `cancel` or
`edit`; AlertDialogAction accepts `delete` and retains the dialog's variant.

## Icons

Place a supporting icon beside visible text and mark its logical position with `data-icon`. Button owns icon sizing and adjusts logical padding.

```tsx
<Button>
  <HugeiconsIcon icon={PlusIcon} data-icon="inline-start" />
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
  <HugeiconsIcon icon={Settings01Icon} />
</Button>
```

## Saving

Save buttons may use `loading` while saving. Keep the label unchanged: “Save changes” remains “Save changes”, never “Saving…”. Guard duplicate submission synchronously in the handler (a ref or the shared async-action recipe), release the guard in `finally`, and show success or failure through Toast. Validation remains beside the field.

```tsx
const pending = useRef(false);
async function handleSave() {
  if (pending.current) return;
  pending.current = true;
  try {
    await saveChanges();
    // Show the application's success toast.
  } catch (error) {
    // Show the application's error toast.
  } finally {
    pending.current = false;
  }
}
<Button preset="save" onClick={handleSave}>
  Save changes
</Button>;
```

## Loading

Use `loading` when a button is waiting for its action to complete, including Save
and Update. Button owns the Loader, busy semantics, repeated-activation protection
and focus retention. Keep the visible label and accessible name unchanged. Set
loading back to false when the action finishes, including on failure.

```tsx
<Button preset="save" loading={isSaving} onClick={saveChanges}>
  Save changes
</Button>
```

## Disabled

Set `disabled` only when an action is genuinely unavailable because of permission or context. A disabled Button is excluded from normal interaction unless the advanced Base UI `focusableWhenDisabled` property is explicitly required.

Keep form submission enabled before validation. On submit, show field errors and focus the first invalid field. Use `loading` while submission is pending and keep the label unchanged. Guard duplicate requests in the handler as well.

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
  <Button preset="save" type="submit">
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
| `preset`                  | `ButtonPreset`                                                                                                                                                 | —           | Explicit action icon and default variant; see Action presets                                  |
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

Both `outline` and `outline-destructive` use `bg-background` as their resting surface. Their existing hover, popup-open, focus and disabled treatments still apply.

Ghost Button treatments use shared semantic surface roles. `ghost-light` uses the light-surface hover role, which remains a dark translucent overlay in both appearance modes so it contrasts with pale specialised surfaces. `ghost-dark` uses the dark-surface foreground and hover roles, which remain light in both appearance modes. Do not hardcode contextual surface colours in Button compositions.

Use `className` only for documented layout integration such as width or parent alignment. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, variants, sizes, behaviours, meanings, or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI Button foundation, CVA variant interface, native semantics, render composition, focus treatment, disabled behaviour, and icon-position attributes. Gecko applies its compact radius, spacing and colours; adds contextual ghost treatments, outlined and quiet destructive treatments, `icon-2xs`, the approved dropdown chevron, and an owned loading state. Gecko deliberately uses focused colour transitions rather than `transition-all`.

## Application integration

Use the [tested application patterns](application-patterns.md) for data ownership, loading, asynchronous operations and navigation. Preserve source behaviour with the [migration checklist](migration-checklist.md). Common action glyphs come from the [action icon map](action-icons.md).
