# Calendar

Import: `@gecko/ui/components/calendar`  
Status: Stable  
Source: `src/components/calendar.tsx`  
Human documentation: `apps/docs/src/pages/calendar/index.tsx`

## Purpose

Calendar lets a person choose one date or a start and end date from a month grid. It is the calendar interface itself, not a complete form field.

Use Date picker when a calendar should open from a form control. Use Date field when typing a date is more appropriate, including date of birth. Do not use Calendar to display appointments, events or a schedule.

## Selection decision

The approved modes are:

| Need                        | Configuration                            |
| --------------------------- | ---------------------------------------- |
| Choose one day              | `mode="single"`                          |
| Choose a start and end date | `mode="range"` with `numberOfMonths={2}` |

React DayPicker technically supports `mode="multiple"`, but multiple independent dates are not an approved Gecko pattern. Obtain explicit user consent before using it or introducing another selection behaviour.

## Single date

```tsx
import { useState } from "react";
import { Calendar } from "@gecko/ui/components/calendar";

const [date, setDate] = useState<Date>();

<Calendar mode="single" selected={date} onSelect={setDate} />;
```

Use controlled state so the application owns the selected value. `onSelect` can return `undefined` when the selection is cleared, so the state type must allow it.

## Date range

```tsx
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@gecko/ui/components/calendar";

const [dateRange, setDateRange] = useState<DateRange>();

<Calendar
  mode="range"
  defaultMonth={dateRange?.from}
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>;
```

Two months is the canonical range configuration because it makes a range spanning a month boundary visible.

## Month and year selectors

Use dropdown navigation only when a person needs to move far from the current month. Always supply deliberate navigation boundaries.

```tsx
const currentYear = new Date().getFullYear();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
  startMonth={new Date(currentYear - 10, 0)}
  endMonth={new Date(currentYear + 10, 11)}
/>;
```

Choose `startMonth` and `endMonth` from the product requirement. Do not copy the ten-year example when the valid domain is different. Omitting these boundaries causes React DayPicker to create a much broader default year range.

## Unavailable and booked dates

Use `bookedDates` for booked days. Calendar disables them and applies the approved strike-through treatment automatically:

```tsx
<Calendar
  mode="single"
  defaultMonth={date}
  selected={date}
  onSelect={setDate}
  bookedDates={bookedDates}
/>
```

Use `disabled` separately for non-booked restrictions, such as dates outside an allowed period. Calendar merges both sets while reserving the strike-through treatment for booked dates.

## Navigation and boundaries

- The previous and next buttons move by month and disable at the supplied boundaries.
- `startMonth` and `endMonth` define the navigable range; they do not disable individual dates.
- Use `bookedDates` for booked days and `disabled` for other dates a person may see but cannot choose.
- `showOutsideDays` defaults to `true` so adjacent-month days preserve a consistent grid.

## Accessibility

- Calendar inherits React DayPicker’s labelled grid and keyboard interaction.
- Arrow keys move focus between dates; Enter or Space selects the focused date.
- Day buttons expose full date labels rather than only their visible day number.
- Disabled dates remain unavailable to pointer and keyboard selection.
- Selected, today, range and disabled meanings must not rely on colour alone.
- Do not replace internal components unless the replacement preserves the supplied properties, reference and accessibility semantics.

## Interface

| Property          | Type                                                             | Default   | Meaning                                                    |
| ----------------- | ---------------------------------------------------------------- | --------- | ---------------------------------------------------------- |
| `mode`            | `"single" \| "range" \| "multiple"`                              | —         | Selection model; only single and range are approved        |
| `selected`        | `Date \| DateRange \| Date[]`                                    | —         | Controlled selection corresponding to `mode`               |
| `onSelect`        | function                                                         | —         | Receives the next selection                                |
| `numberOfMonths`  | `number`                                                         | `1`       | Visible months; use `2` for a range                        |
| `captionLayout`   | `"label" \| "dropdown" \| "dropdown-months" \| "dropdown-years"` | `"label"` | Caption navigation treatment                               |
| `startMonth`      | `Date`                                                           | —         | Earliest navigable month; required for dropdown navigation |
| `endMonth`        | `Date`                                                           | —         | Latest navigable month; required for dropdown navigation   |
| `showOutsideDays` | `boolean`                                                        | `true`    | Whether adjacent-month days appear in the grid             |
| `bookedDates`     | `Matcher \| Matcher[]`                                           | —         | Booked dates; disabled and styled automatically            |
| `disabled`        | `Matcher \| Matcher[]`                                           | —         | Non-booked dates that cannot be selected                   |

Calendar also accepts React DayPicker properties. That technical availability does not make every property or composition an approved Gecko pattern.

## Styling contract

The library owns the default border and radius, cell size, spacing, typography, navigation buttons, focus treatment, selected states, range geometry, today, outside days, disabled days, hover states and right-to-left behaviour. Embedded library components suppress the outer Calendar border where their own surface already provides one.

Use `className` only to position the complete Calendar. Do not override `buttonVariant`, `components`, `classNames`, `modifiers`, `modifiersClassNames`, formatters or day styling without explicit user consent. Request a library change when a legitimate treatment is missing.

Agents must not create or change props, variants, modifiers, behaviours or visual treatments without explicit user consent.

## Relationship to Shadcn

Gecko retains Shadcn’s React DayPicker composition and supports its advanced integration properties. Gecko deliberately uses denser 32px cells, selected-date hover treatments, logical start and end range styling for right-to-left layouts, outside days by default and a semantic `bookedDates` interface that owns the approved disabled and strike-through treatment.

The library follows React DayPicker’s current `month_grid` structure and keeps keyboard focus synchronized with DayPicker’s focused date.
