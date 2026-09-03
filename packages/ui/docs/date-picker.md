# Date picker

Import: `@gecko/ui/components/date-picker`  
Status: Stable  
Source: `src/components/date-picker.tsx`  
Human documentation: `apps/docs/src/pages/date-picker/index.tsx`

## Purpose

Date picker combines Gecko's Calendar and Popover with a date input or button trigger. Use it when a person benefits from choosing a date from a calendar. Use Date field when direct entry is sufficient, including date of birth, unless the product explicitly requires a calendar.

The product owns the selected value and what happens after it changes. Date picker owns trigger presentation, calendar composition, popover state, date formatting defaults and accessible calendar-button naming.

## Canonical application usage

```tsx
import { DatePicker } from "@gecko/ui/components/date-picker";
import { Field, FieldLabel } from "@gecko/ui/components/field";

const [date, setDate] = React.useState<Date>();

<Field>
  <FieldLabel htmlFor="event-date">Event date</FieldLabel>
  <DatePicker id="event-date" value={date} onChange={setDate} />
</Field>;
```

The visible FieldLabel provides the field name. DatePicker derives the calendar button's accessible name from that label context; use `calendarButtonAriaLabel` only when the derived action needs a more specific name.

## Within form

DatePicker reports a controlled Date value. Submit that state with the rest of the form:

```tsx
<form onSubmit={(event) => handleSubmit(event, { subscriptionDate })}>
  <Field>
    <FieldLabel htmlFor="subscription-date">Subscription date</FieldLabel>
    <DatePicker
      id="subscription-date"
      value={subscriptionDate}
      onChange={setSubscriptionDate}
    />
  </Field>
  <Button type="submit">Save subscription</Button>
</form>
```

Button retains its intrinsic width. Keep submit enabled and validate the controlled date on submission.

## Approved configurations

| Need                         | Configuration                                                    |
| ---------------------------- | ---------------------------------------------------------------- |
| One date                     | Default `mode="single"` with the input trigger                   |
| Date range                   | `mode="range"`; the button trigger is automatic                  |
| Calendar-based date of birth | `variant="dob"`; prefer Date field unless a calendar is required |
| Date and time                | `variant="time"`; time is never presented without its date       |
| Button trigger               | `trigger="button"` for an approved non-input composition         |

Use `numberOfMonths={2}` for a range when seeing both sides of a month boundary helps selection.

## State and selection

Use `value` and `onChange` for controlled product state. Use `defaultValue` only when local uncontrolled state is deliberate.

Single-date selection closes the popover by default. Range selection remains open until the range is complete or the person dismisses it. `closeOnSelect` changes that behaviour only when the product requirement is explicit.

Use `disabledDates` for dates that cannot be selected. Date picker passes calendar behaviour through the Gecko Calendar interface; application code does not style matchers or day states itself.

## Accessibility

- Pair DatePicker with a visible FieldLabel.
- `aria-label` can name the field when visible label inheritance is unavailable and also provides context for the calendar button.
- `calendarButtonAriaLabel` overrides only the calendar button's accessible name.
- Connect invalid help with `aria-invalid` and `aria-describedby`.
- `disabled` applies to every control in the composition.
- Calendar keyboard behaviour and focus management come from Gecko Calendar and Popover.

## Interface

| Property                  | Type                             | Default           | Meaning                                      |
| ------------------------- | -------------------------------- | ----------------- | -------------------------------------------- |
| `mode`                    | `"single" \| "range"`            | `"single"`        | Selects one date or a start and end date     |
| `variant`                 | `"default" \| "dob" \| "time"`   | `"default"`       | Selects the approved entry composition       |
| `trigger`                 | `"input" \| "button"`            | `"input"`         | Selects the single-date trigger presentation |
| `value`                   | `Date \| DateRange \| undefined` | uncontrolled      | Controlled selected value                    |
| `defaultValue`            | `Date \| DateRange \| undefined` | none              | Initial uncontrolled selected value          |
| `onChange`                | function                         | none              | Receives the next selected value             |
| `open`                    | `boolean`                        | uncontrolled      | Controlled popover state                     |
| `defaultOpen`             | `boolean`                        | `false`           | Initial uncontrolled popover state           |
| `onOpenChange`            | `(open: boolean) => void`        | none              | Reports popover state changes                |
| `disabledDates`           | `Matcher \| Matcher[]`           | none              | Dates that cannot be selected                |
| `numberOfMonths`          | `number`                         | `1`               | Number of visible calendar months            |
| `aria-label`              | `string`                         | inherited context | Field name and calendar-button context       |
| `calendarButtonAriaLabel` | `string`                         | derived           | Explicit calendar-button name                |

DatePicker exposes additional Calendar navigation, Popover positioning, formatting and button-composition properties defined by its TypeScript interface. Their technical availability does not establish a new approved product pattern.

## Styling contract

The library owns trigger styling, icon placement, field grouping, calendar surface, popover placement defaults, focus, disabled and invalid treatment. Use layout properties only for integration into the surrounding form. Request a library change when an approved configuration cannot represent the requirement.

Agents must obtain explicit user consent before adding a mode, variant, trigger treatment, date format or selection behaviour.

## Related components

- **Date field** — direct segmented date entry without a calendar.
- **Calendar** — an always-visible calendar interface.
- **Field** — visible label, description, disabled treatment and validation message.
