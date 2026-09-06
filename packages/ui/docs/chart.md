# Chart

Import: `@gecko/ui/components/chart`  
Status: Stable  
Source: `src/components/chart.tsx`  
Human documentation: `apps/docs/src/pages/charts/index.tsx`

## Purpose

Chart presents a trend, comparison, distribution or part-to-whole relationship visually. Gecko uses Recharts for chart geometry and owns the responsive container, approved colour assignment, accessible naming, tooltip, legend and headline metric treatment.

Use a chart only when the visual shape helps answer the question faster than reading every value. Use Table when exact values are the primary content. Use Metric card for a single number.

## Canonical application usage

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@gecko/ui/components/chart";

const data = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
];

const config = {
  desktop: { label: "Desktop" },
};

<ChartContainer title="Monthly desktop users" config={config}>
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" />
  </BarChart>
</ChartContainer>;
```

ChartContainer assigns `--chart-1` to `desktop` automatically and exposes it as `--color-desktop`. Application code names the series but does not select its colour.

## Composition

Chart is intentionally composed with Recharts rather than wrapping every Recharts primitive:

```text
ChartContainer
└── Recharts chart
    ├── axis or grid (when needed)
    ├── ChartTooltip (canonical)
    ├── ChartLegend (multiple series)
    └── Recharts series
```

ChartMetric is an optional sibling above ChartContainer, normally inside CardContent. It is not a child of the Recharts chart.

Do not render a Recharts chart without ChartContainer. Do not render ChartStyle directly; ChartContainer owns it.

## Choosing a chart family

The approved chart families are closed. Agents must obtain explicit consent before adding another family or visual treatment.

| Question                                               | Approved family | Rule                                                           |
| ------------------------------------------------------ | --------------- | -------------------------------------------------------------- |
| Compare values across categories                       | Bar             | Default choice for category comparison                         |
| Show change over time                                  | Line            | Use dots only for a small number of important points           |
| Emphasise magnitude over time                          | Area            | Use stacked areas only when the series form a meaningful total |
| Show parts of one whole                                | Pie or donut    | Use no more than five categories                               |
| Compare a multivariate profile                         | Radar           | Use sparingly; never use for a time series                     |
| Show a compact circular measure or total made of parts | Radial          | Do not use when a linear bar is easier to compare              |

Default to the documented basic treatment for the chosen family. Do not invent curves, gradients, radii, dots, grid treatments, labels or stacking arrangements. Use the trusted human-documentation recipe that matches the requested treatment.

## Configuration and colours

Config keys match Recharts `dataKey` values. Each entry provides a human-readable label and may provide an approved icon.

```tsx
const config = {
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },
};
```

ChartContainer assigns the approved tokens in config order:

```text
first entry  → --chart-1 → var(--color-desktop)
second entry → --chart-2 → var(--color-mobile)
```

Automatic assignment supports up to five series. Do not hard-code colours, reorder config merely for appearance, use raw colour values, provide a theme override or add a sixth series without explicit consent. Request a library treatment when the approved palette is insufficient.

Colour is never the only series identifier. Use labels, tooltip content and a legend where required.

## Cartesian and polar layout

ChartContainer defaults to `layout="cartesian"`, which owns the approved wide responsive ratio for bar, line and area charts.

Use `layout="polar"` for pie, donut, radar and radial charts:

```tsx
<ChartContainer title="Visitors by browser" config={config} layout="polar">
  <PieChart>{/* approved Pie recipe */}</PieChart>
</ChartContainer>
```

Polar layout owns centring, square proportions and maximum size. Do not add aspect-ratio, height, width, centring or Recharts label-colour classes.

## Tooltip and legend

Use ChartTooltip with ChartTooltipContent when people need exact values. The custom tooltip is available through pointer and Recharts keyboard navigation and announces updates politely.

```tsx
<ChartTooltip content={<ChartTooltipContent />} />
```

Use ChartLegend with ChartLegendContent for multiple-series charts so colour is not the only identifier:

```tsx
<ChartLegend content={<ChartLegendContent />} />
```

A legend is optional for one clearly named series. Keep the default dot tooltip indicator unless the trusted recipe specifically uses `line` or `dashed`.

## Headline metric

ChartMetric presents one summary value above a chart. It owns its value formatting, typography and spacing.

```tsx
<ChartMetric value={1_284} label="Total desktop views" />
<ChartContainer title="Monthly desktop views" config={config}>
  {/* Recharts chart */}
</ChartContainer>
```

Do not put arbitrary children inside ChartMetric or override its value and label styling. Use Metric card instead when the number is the primary component rather than context for a chart.

## Accessibility

- `title` is required on ChartContainer and must concisely describe the chart’s subject, not its visual appearance.
- ChartContainer applies the title as the Recharts chart’s accessible name without rendering a native browser tooltip.
- Recharts 3 enables its accessibility layer by default. Do not add the redundant prop and never disable it without explicit approval.
- Keyboard users tab to the chart and use the arrow keys to navigate its data points.
- Use ChartTooltip so navigated values can be announced.
- Use a legend for multiple series; colour alone is insufficient.
- Use a nearby Table instead when every exact value must be available without exploring the chart.
- Do not rely on a chart as the only communication of a critical status, instruction or error.

## Approved public interface

| Part                  | Meaning                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `ChartContainer`      | Required responsive context, accessible name, colours and layout |
| `ChartTooltip`        | Recharts tooltip primitive                                       |
| `ChartTooltipContent` | Approved tooltip presentation                                    |
| `ChartLegend`         | Recharts legend primitive                                        |
| `ChartLegendContent`  | Approved legend presentation                                     |
| `ChartMetric`         | Optional summary value above a chart                             |

### ChartContainer props

| Prop               | Type                                | Default         | Rule                                                |
| ------------------ | ----------------------------------- | --------------- | --------------------------------------------------- |
| `title`            | `string`                            | required        | Concise accessible chart name                       |
| `config`           | `ChartConfig`                       | required        | Series labels and optional approved icons           |
| `layout`           | `"cartesian" \| "polar"`            | `"cartesian"`   | Polar only for pie, radar and radial families       |
| `initialDimension` | `{ width: number; height: number }` | library default | Do not set in normal application use                |
| `className`        | `string`                            | —               | Parent-layout integration only; never chart styling |

ChartTooltipContent retains Shadcn’s `indicator`, `hideLabel`, `hideIndicator`, `labelKey` and `nameKey` options. Use a non-default option only when the trusted recipe requires it.

## Unapproved Gecko extensions

`ChartTooltipGroupedContent`, `ChartLegendGroupedContent` and `ChartXAxisTickLabel` remain exported for compatibility but are not approved for new AI-generated implementation. They have no trusted human-documentation example. Ask for explicit review and consent before using, changing or documenting them.

## Styling contract

The library owns container proportions, polar sizing, series token assignment, axis and grid colour, pie-label colour, tooltip and legend presentation, metric typography and tooltip layering.

Use Recharts props exactly as shown in an approved recipe. Use ChartContainer `className` only for placement in a parent layout. Do not override chart tokens, container size, tooltip chrome, legend layout or metric styling. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing chart families, series limits, colours, public parts, props, behaviours or visual treatments.

## Relationship to Shadcn and Recharts

Gecko retains Shadcn’s composition model, ChartConfig, generated CSS variables, tooltip and legend. Recharts continues to own the chart geometry so the library is not locked behind a bespoke wrapper.

Gecko adds automatic approved colours, required accessible naming, cartesian and polar container layouts, headline metrics and compatibility extensions. These additions reduce application styling decisions without replacing Recharts.
