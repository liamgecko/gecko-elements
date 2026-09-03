# Avatar

Import: `@gecko/ui/components/avatar`  
Status: Stable  
Source: `src/components/avatar.tsx`  
Human documentation: `apps/docs/src/pages/avatar/index.tsx`

## Purpose

Avatar represents one person or account with a photograph or initials. Use it wherever identity needs to remain recognisable, including data-table attribution, messages, account controls, and profile displays.

Avatar is passive identity content. When it needs to trigger an action or navigate, compose it inside the appropriate Button or link rather than adding interaction to Avatar.

Use Avatar group when several people must be represented together. Avatar group has its own Gecko interface and documentation; do not recreate the Shadcn Avatar Group composition from the Avatar primitives.

## Import

```tsx
import {
  Avatar,
  AvatarDescription,
  AvatarImage,
  AvatarLabel,
} from "@gecko/ui/components/avatar";
```

`AvatarBadge` is an internal visual foundation. It is not a public export. Use `status` and `notification` to request the approved badge treatments.

## Canonical usage

Always provide the full `name`. Avatar uses it as the accessible identity and automatically generates the fallback. Add `AvatarImage` when a photo is available.

```tsx
<Avatar name={person.name}>
  <AvatarImage src={person.photoUrl} />
</Avatar>
```

Avatar uses the first-name initial at `xs` and `sm`. From `md` upward it uses the first and last name initials. For example, “Liam Young” renders `L` at `sm` and `LY` at `md`.

## Image alternative text

Avatar exposes `name` as the complete accessible identity. `AvatarImage` therefore defaults to `alt=""` so the photograph does not duplicate that name. Do not rely on the photograph or generated initials as the accessible label.

```tsx
<Avatar name={person.name}>
  <AvatarImage src={person.photoUrl} />
  <AvatarLabel>Liam Young</AvatarLabel>
</Avatar>
```

## Label and description

`AvatarLabel` adds the primary identity text beside the avatar. `AvatarDescription` adds supporting identity information such as an email address or role.

Both must be direct children of `Avatar` so the component can place them beside the image.

```tsx
<Avatar name={person.name}>
  <AvatarImage src={person.photoUrl} />
  <AvatarLabel>Liam Young</AvatarLabel>
  <AvatarDescription>liam@example.com</AvatarDescription>
</Avatar>
```

Use plain Avatar when surrounding UI already owns the identity text. Use the label and description children for a self-contained, passive identity row.

## Sizes

Omit `size` for canonical standard usage. The `default` value maps to `xl`, a 32 px avatar.

| Size  | Diameter | Canonical context                                            |
| ----- | -------- | ------------------------------------------------------------ |
| `xs`  | 16 px    | Exceptional space constraints and non-interactive indicators |
| `sm`  | 20 px    | Very compact supporting identity                             |
| `md`  | 24 px    | Dense lists, data tables, and messages                       |
| `lg`  | 28 px    | Compact identity rows                                        |
| `xl`  | 32 px    | Standard usage; the default                                  |
| `2xl` | 36 px    | Prominent account controls                                   |
| `3xl` | 48 px    | Profile headings and larger identity displays                |

Choose a size because the surrounding layout or another component's documentation requires it. Agents must not introduce another size or override the diameter with `className` without explicit user consent.

## Availability status

Use `status` only when knowing the person's current availability helps the task.

The approved values are a closed set:

| Value         | Meaning               | Badge treatment      |
| ------------- | --------------------- | -------------------- |
| `online`      | Currently available   | Green, bottom right  |
| `unavailable` | Currently unavailable | Orange, bottom right |
| `offline`     | Not currently online  | Grey, bottom right   |

```tsx
<Avatar name="Liam Young" status="online" />
```

Avatar automatically injects the correctly sized internal badge and accessible text such as “Status: online”. Agents must not compose a badge manually, remap a status colour, or add another status without explicit user consent.

## Unread activity

Set `notification` when there is unread activity associated with the person or account. Avatar automatically injects a red badge at the top left and the accessible text “Unread activity”.

Notification and availability status may appear together because they occupy different positions:

```tsx
<Avatar name="Liam Young" status="online" notification />
```

Use Counter when an exact unread quantity is required. `notification` communicates presence only and does not carry a count.

## Accessibility

- Always provide the person or account’s full `name`; Avatar owns the fallback and accessible identity.
- Let `AvatarImage` use its empty default `alt` unless a documented exception requires otherwise.
- Status and notification badges contain screen-reader text and never rely on colour alone.
- Avatar is not interactive by itself. Place it inside a semantic Button or link when the complete surrounding control is interactive.
- The smallest sizes are visual indicators, not standalone pointer targets.
- Keep visible identity text available when a photograph or initials alone would be ambiguous.

## Interface

### Avatar

| Property                | Type                                                                  | Default     | Meaning                                                                |
| ----------------------- | --------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `name`                  | `string`                                                              | —           | Required identity; generates fallback initials and the accessible name |
| `size`                  | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "default"` | `"default"` | Approved avatar diameter; `default` maps to `xl`                       |
| `status`                | `"online" \| "unavailable" \| "offline"`                              | none        | Approved bottom-right availability badge                               |
| `notification`          | `boolean`                                                             | `false`     | Top-left unread-activity badge                                         |
| Base UI Root properties | `AvatarPrimitive.Root.Props`                                          | —           | Underlying non-interactive avatar-root properties                      |

### AvatarImage

Accepts Base UI Avatar Image properties, including `src`, `alt`, and `onLoadingStatusChange`.

### AvatarLabel and AvatarDescription

Both accept native `span` properties. They must be direct Avatar children and are automatically sized to match the avatar.

## Styling contract

The library owns fallback generation, diameter, circular shape, fallback typography, image cropping, indicator position, indicator size, indicator colour, and the surrounding ring.

Use `className` for layout adjustments that do not change those semantics. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, sizes, statuses, badge meanings, or visual variants.

## Relationship to Shadcn

Gecko retains the Base UI image and fallback foundation internally while extending the Shadcn Avatar with automatic initials, additional sizes, identity text, availability status, and unread activity. Gecko's approved properties replace direct composition of `AvatarFallback` and Shadcn's public `AvatarBadge` customisation.
