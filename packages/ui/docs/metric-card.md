# Metric card

Import: `@gecko/ui/components/metric-card`  
Status: Stable  
Source: `src/components/metric-card.tsx`  
Human documentation: `apps/docs/src/pages/metric-card/index.tsx`

## Purpose

Metric card presents one headline KPI with optional supporting detail, comparison, short description, sparkline, definition and secondary actions.

Use Metric card on dashboards, reporting views and individual product screens such as an event’s success metrics. Cards are typically laid out in rows of three. Use Chart for detailed analysis, Table for exact non-interactive values and Card for content that is not centred on one metric.

Metric card is owned by Gecko. It composes Gecko Card, Tooltip and Dropdown menu, and uses Recharts internally for the optional sparkline. Application code must not import Recharts to modify a Metric card.

## Import

```tsx
import {
  MetricCard,
  type MetricCardMenuItem,
  type MetricCardProps,
  type MetricCardSentiment,
  type MetricCardSparkline,
  type MetricCardSparklineDatum,
  type MetricCardTrend,
} from "@gecko/ui/components/metric-card";
```

## Canonical metric

```tsx
<MetricCard title="Median first response time" value="1m 28s" />
```

Each card contains one headline value. Add context only when it helps someone interpret or act on that value.

## Trend

Direction describes movement. Sentiment describes whether that movement is beneficial, harmful or neutral. Do not infer sentiment from direction: a lower response time is positive, while a lower conversion rate is negative.

```tsx
<MetricCard
  title="Median first response time"
  value="1m 28s"
  trend={{
    direction: "down",
    sentiment: "positive",
    label: "3s",
    compareTo: "vs last week",
  }}
/>
```

The component exposes the direction and sentiment to assistive technology as well as through the icon and colour.

## Sparkline

Use a sparkline only for a compact view of change over time. Use Chart when people need axes, multiple series, detailed comparison or analysis.

```tsx
<MetricCard
  title="Median first response time"
  value="1m 28s"
  sparkline={{
    sentiment: "positive",
    formatLabel: formatLongDate,
    formatValue: formatSeconds,
    data: responseTimes,
  }}
/>
```

The sparkline inherits its accessible name from a string title. Set `sparkline.ariaLabel` when the title is a React element. Keep `showTooltip` enabled when exact points matter.

Recharts owns the internal responsive geometry and keyboard navigation. Gecko owns the approved dimensions, tooltip, semantic colours and accessible naming.

## Detail and description

Use `detail` for a unit, count or closely related secondary figure beside the headline value. Use `description` for a short explanation below it. Do not repeat the same information in both.

```tsx
<MetricCard
  title="Open rate"
  value="74%"
  detail="123 unique opens"
  description="Percentage of delivered recipients who opened the message."
/>
```

## Help

Use `helpText` for a concise definition or calculation explanation. It supplements the visible title and must not contain instructions required to use the page.

For a string title, the help button is named `Help for {title}`. Set `helpLabel` when the title is a React element or when the inherited name is unsuitable.

## Secondary actions

Use `menuItems` for secondary actions such as viewing detail or exporting. Keep the primary action visible outside the menu.

For a string title, the menu button is named `Options for {title}`. Set `menuLabel` when the title is a React element or when the inherited name is unsuitable.

## Interface

### MetricCard properties

| Property      | Type                   | Default               | Meaning                                         |
| ------------- | ---------------------- | --------------------- | ----------------------------------------------- |
| `title`       | `React.ReactNode`      | Required              | Names the metric                                |
| `value`       | `React.ReactNode`      | Required              | Headline metric value                           |
| `detail`      | `React.ReactNode`      | —                     | Closely related label beside the value          |
| `description` | `React.ReactNode`      | —                     | Short supporting explanation below the value    |
| `helpText`    | `React.ReactNode`      | —                     | Definition shown in the help tooltip            |
| `helpLabel`   | `string`               | `Help for {title}`    | Accessible name override for the help button    |
| `trend`       | `MetricCardTrend`      | —                     | Directional comparison                          |
| `sparkline`   | `MetricCardSparkline`  | —                     | Compact time-series chart                       |
| `menuItems`   | `MetricCardMenuItem[]` | —                     | Secondary actions                               |
| `menuLabel`   | `string`               | `Options for {title}` | Accessible name override for the options button |

MetricCard also accepts native `div` properties. Use `className` only to place the complete card in its parent layout.

### MetricCardTrend

| Property    | Type                                    | Default  | Meaning                         |
| ----------- | --------------------------------------- | -------- | ------------------------------- |
| `direction` | `"up" \| "down" \| "neutral"`           | Required | Direction of change             |
| `sentiment` | `"positive" \| "negative" \| "neutral"` | Required | Product meaning of the change   |
| `label`     | `React.ReactNode`                       | Required | Amount or summary of the change |
| `compareTo` | `React.ReactNode`                       | —        | Comparison period or baseline   |

### MetricCardSparkline

| Property       | Type                                       | Default         | Meaning                                       |
| -------------- | ------------------------------------------ | --------------- | --------------------------------------------- |
| `data`         | `MetricCardSparklineDatum[]`               | Required        | Ordered x and y values                        |
| `sentiment`    | `"positive" \| "negative" \| "neutral"`    | Required        | Semantic chart colour                         |
| `ariaLabel`    | `string`                                   | `{title} trend` | Accessible chart name                         |
| `showTooltip`  | `boolean`                                  | `true`          | Makes exact values available while navigating |
| `tooltipLabel` | `React.ReactNode`                          | —               | Fixed tooltip label                           |
| `formatLabel`  | `(x: string \| number) => React.ReactNode` | —               | Formats each x value                          |
| `formatValue`  | `(value: number) => React.ReactNode`       | —               | Formats each y value                          |

Each datum contains an `x` value and numeric `y` value.

### MetricCardMenuItem

| Property   | Type              | Default  | Meaning                          |
| ---------- | ----------------- | -------- | -------------------------------- |
| `id`       | `string`          | Required | Stable menu item key             |
| `label`    | `React.ReactNode` | Required | Visible action label             |
| `onSelect` | `() => void`      | —        | Runs when the action is selected |
| `disabled` | `boolean`         | `false`  | Makes the action unavailable     |

## Accessibility

- String titles automatically provide contextual names for help, options and sparkline controls. Supply the matching label override when the title is not a string.
- The help and options controls use native buttons and retain Gecko’s focus treatment and minimum target size.
- Trend direction and sentiment are communicated with text as well as colour and iconography.
- Recharts’ accessibility layer makes sparkline points keyboard navigable.
- Tooltips expose exact formatted values when enabled.
- Help text is supplementary and never the only location for required instructions.

## Styling contract

Metric card owns its surface, hierarchy, spacing, typography, semantic colours, icons, sparkline dimensions and tooltip. Application code controls the surrounding grid, not the card’s internal layout.

Use a row of three cards at normal dashboard widths and let the layout collapse responsively. The headline value remains on one line; when the card itself is too narrow for the value and its supporting detail or trend, the supporting content moves below the value. Do not override sentiment colours or supply arbitrary chart colours.

## Agent rules

1. Import MetricCard and its types from `@gecko/ui/components/metric-card`.
2. Give each card one clear title and one headline value.
3. Derive trend sentiment from product meaning, not direction alone.
4. Use a sparkline only for compact change over time; use Chart for detailed analysis.
5. Set `sparkline.ariaLabel`, `helpLabel` and `menuLabel` when the title is not a string.
6. Keep primary actions visible and use `menuItems` only for secondary actions.
7. Use `detail` and `description` for different supporting information.
8. Keep help supplementary; never hide required instructions in a tooltip.
9. Lay cards out in the parent and do not restyle the component’s internals.
10. Do not import Recharts directly to extend Metric card.

## API reference

- [Recharts AreaChart API](https://recharts.github.io/en-US/api/AreaChart/)

## Related

- **Chart** — detailed trends, comparisons and analysis.
- **Table** — exact non-interactive values inside reporting content.
- **Card** — grouped content that is not centred on one KPI.
- **Tooltip** — supplementary clarification used by Metric card help.
