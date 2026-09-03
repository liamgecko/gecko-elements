# Progress

Import: `@gecko/ui/components/progress`  
Status: Stable  
Source: `src/components/progress.tsx`  
Human documentation: `apps/docs/src/pages/progress/index.tsx`

## Purpose

Progress communicates the completion of a measurable task. Use a bar when horizontal space is available and a ring when the indicator needs a compact square footprint.

Use Spinner when the amount of work completed cannot be measured. Do not use Progress as decoration or as a general score without a clear minimum and maximum.

Progress wraps Base UI through Shadcn’s composition. Application code must import the Gecko parts rather than importing either dependency directly.

## Composition

```text
Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator
```

Progress renders ProgressTrack and ProgressIndicator internally for the standard bar. ProgressLabel and ProgressValue remain available for a custom child composition.

## Canonical progress bar

```tsx
<Progress value={50} aria-label="Export progress" />
```

Supply a visible `label` when the surrounding interface does not name the task:

```tsx
<Progress value={65} label="Exporting contacts" valueLabel="65%" />
```

The label is associated with the Base UI progress root. Set `aria-valuetext` when the visible formatted value needs an equivalent human-readable value for assistive technology.

## Ring

```tsx
<Progress type="ring" value={75} label="Storage used" valueLabel="75%" />
```

The ring is a Gecko extension. Its SVG is decorative because the Base UI root owns the progress semantics. Use a bar or Spinner rather than a ring when the value is indeterminate.

## Size

Progress supports small, default and large presentations:

```tsx
<Progress size="sm|default|lg" value={60} aria-label="Upload progress" />
```

Use the default size unless density or prominence requires another approved size. Do not recreate a size with application classes.

## Value colours

Set `showValueColors` only when the colour thresholds communicate meaningful status or urgency. Always show a label or formatted value so colour is not the only indication:

```tsx
<Progress value={20} valueLabel="20%" showValueColors />
```

The built-in thresholds are 25 or below, 50 or below, 75 or below, and above 75. Do not use this presentation when those thresholds do not match the domain meaning.

## Interface

| Property          | Type                        | Default     | Meaning                                                  |
| ----------------- | --------------------------- | ----------- | -------------------------------------------------------- |
| `type`            | `"default" \| "ring"`       | `"default"` | Chooses the bar or ring presentation                     |
| `size`            | `"sm" \| "default" \| "lg"` | `"default"` | Sets the bar height or ring diameter                     |
| `label`           | `string`                    | —           | Shows and associates the task name                       |
| `valueLabel`      | `string`                    | —           | Shows a formatted value and supplies its accessible text |
| `showValueColors` | `boolean`                   | `false`     | Applies Gecko’s value-tier colours                       |
| `value`           | `number \| null`            | —           | Sets the current completion value                        |
| `min`             | `number`                    | `0`         | Sets the minimum value                                   |
| `max`             | `number`                    | `100`       | Sets the maximum value                                   |
| `aria-valuetext`  | `string`                    | —           | Supplies a human-readable accessible value               |

Progress accepts Base UI Progress Root properties. ProgressTrack, ProgressIndicator, ProgressLabel and ProgressValue accept the corresponding Base UI properties.

## Accessibility

- Give every progress indicator an accessible task name through `label`, `aria-label` or `aria-labelledby`.
- Keep the visible value consistent with the value exposed to assistive technology.
- Use `aria-valuetext` for values that are clearer as words or domain-specific text.
- Show text alongside tiered colours so colour is not the only status cue.
- Use Spinner when completion cannot be measured.
- Do not place interactive controls inside Progress.

## Agent rules

1. Import Progress parts from `@gecko/ui/components/progress`.
2. Use the canonical Progress component instead of rebuilding the track and indicator.
3. Give the task an accessible name.
4. Keep values within the configured minimum and maximum.
5. Show a formatted value when exact completion matters.
6. Use tiered colours only when their thresholds have domain meaning and include a textual cue.
7. Use Spinner for indeterminate page or panel waits.
8. Preserve Gecko’s approved sizes, ring geometry and colour thresholds.
9. Do not import Shadcn or Base UI Progress directly.

## API reference

- [Shadcn Progress documentation](https://ui.shadcn.com/docs/components/base/progress)
- [Base UI Progress API](https://base-ui.com/react/components/progress)

## Related

- **Spinner** — indeterminate page or panel loading.
- **Metric card** — a labelled metric that may include measurable progress.
