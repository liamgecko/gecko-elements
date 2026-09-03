import type { ChartConfig } from "@gecko/ui/components/chart";

export type SingleBarChartExampleDatum = {
  month: string;
  desktop: number;
};

export const singleBarChartExampleData: SingleBarChartExampleDatum[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 214 },
  { month: "August", desktop: 214 },
  { month: "September", desktop: 214 },
  { month: "October", desktop: 214 },
  { month: "November", desktop: 214 },
  { month: "December", desktop: 214 },
];

export const singleBarChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

export type MultipleBarChartExampleDatum = {
  month: string;
  desktop: number;
  mobile: number;
};

/**
 * 12-month dataset (Jan..Dec) for the "multiple bar" example.
 * Mirrors shadcn-style chartData/chartConfig: a single array plus series metadata.
 */
export const multipleBarChartExampleData: MultipleBarChartExampleDatum[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 230, mobile: 150 },
  { month: "August", desktop: 245, mobile: 160 },
  { month: "September", desktop: 215, mobile: 145 },
  { month: "October", desktop: 260, mobile: 170 },
  { month: "November", desktop: 280, mobile: 180 },
  { month: "December", desktop: 240, mobile: 165 },
];

export const multipleBarChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
} satisfies ChartConfig;

export type StackedBarChartExampleDatum = {
  month: string;
  desktop: number;
  mobile: number;
};

/**
 * 12-month dataset (Jan..Dec) for the "stacked bar" example.
 * Uses the same series keys as the grouped example for consistency.
 */
export const stackedBarChartExampleData: StackedBarChartExampleDatum[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 230, mobile: 150 },
  { month: "August", desktop: 245, mobile: 160 },
  { month: "September", desktop: 215, mobile: 145 },
  { month: "October", desktop: 260, mobile: 170 },
  { month: "November", desktop: 280, mobile: 180 },
  { month: "December", desktop: 240, mobile: 165 },
];

export const stackedBarChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
} satisfies ChartConfig;

export type SingleLineChartExampleDatum = {
  month: string;
  desktop: number;
};

export const singleLineChartExampleData: SingleLineChartExampleDatum[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 230 },
  { month: "August", desktop: 245 },
  { month: "September", desktop: 215 },
  { month: "October", desktop: 260 },
  { month: "November", desktop: 280 },
  { month: "December", desktop: 240 },
];

export const singleLineChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

export type MultipleLineChartExampleDatum = {
  month: string;
  desktop: number;
  mobile: number;
};

export const multipleLineChartExampleData: MultipleLineChartExampleDatum[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 230, mobile: 150 },
  { month: "August", desktop: 245, mobile: 160 },
  { month: "September", desktop: 215, mobile: 145 },
  { month: "October", desktop: 260, mobile: 170 },
  { month: "November", desktop: 280, mobile: 180 },
  { month: "December", desktop: 240, mobile: 165 },
];

export const multipleLineChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
} satisfies ChartConfig;

export type LineWithDotsChartExampleDatum = {
  month: string;
  desktop: number;
};

export const lineWithDotsChartExampleData: LineWithDotsChartExampleDatum[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 230 },
  { month: "August", desktop: 245 },
  { month: "September", desktop: 215 },
  { month: "October", desktop: 260 },
  { month: "November", desktop: 280 },
  { month: "December", desktop: 240 },
];

export const lineWithDotsChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

export type AreaSingleChartExampleDatum = {
  month: string;
  desktop: number;
};

export const areaSingleChartExampleData: AreaSingleChartExampleDatum[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 230 },
  { month: "August", desktop: 245 },
  { month: "September", desktop: 215 },
  { month: "October", desktop: 260 },
  { month: "November", desktop: 280 },
  { month: "December", desktop: 240 },
];

export const areaSingleChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

export type AreaMultipleChartExampleDatum = {
  month: string;
  desktop: number;
  mobile: number;
};

export const areaMultipleChartExampleData: AreaMultipleChartExampleDatum[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 230, mobile: 150 },
  { month: "August", desktop: 245, mobile: 160 },
  { month: "September", desktop: 215, mobile: 145 },
  { month: "October", desktop: 260, mobile: 170 },
  { month: "November", desktop: 280, mobile: 180 },
  { month: "December", desktop: 240, mobile: 165 },
];

export const areaMultipleChartExampleConfig = {
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
} satisfies ChartConfig;

export type AreaStackedChartExampleDatum = AreaMultipleChartExampleDatum;

export const areaStackedChartExampleData: AreaStackedChartExampleDatum[] =
  areaMultipleChartExampleData;

export const areaStackedChartExampleConfig =
  areaMultipleChartExampleConfig satisfies ChartConfig;

export type AreaGradientChartExampleDatum = AreaMultipleChartExampleDatum;

export const areaGradientChartExampleData: AreaGradientChartExampleDatum[] =
  areaMultipleChartExampleData;

export const areaGradientChartExampleConfig =
  areaMultipleChartExampleConfig satisfies ChartConfig;

export type PieChartExampleDatum = {
  browser: "chrome" | "safari" | "firefox" | "edge" | "other";
  visitors: number;
  fill: string;
};

/**
 * 5-slice dataset for Pie examples.
 * Uses `fill` per datum so the Pie renders correctly without any tooltip helpers.
 */
export const pieChartExampleData: PieChartExampleDatum[] = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

export const pieChartExampleConfig = {
  chrome: { label: "Chrome" },
  safari: { label: "Safari" },
  firefox: { label: "Firefox" },
  edge: { label: "Edge" },
  other: { label: "Other" },
} satisfies ChartConfig;

export type RadarChartExampleDatum = {
  month: string;
  desktop: number;
  mobile: number;
};

// 6 points as requested.
export const radarChartExampleData: RadarChartExampleDatum[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export const radarChartExampleConfig = {
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },
} satisfies ChartConfig;

export type RadialDefaultChartExampleDatum = {
  browser: "chrome" | "safari" | "firefox" | "edge" | "other";
  visitors: number;
};

export const radialDefaultChartExampleData: RadialDefaultChartExampleDatum[] = [
  { browser: "chrome", visitors: 1_286 },
  { browser: "safari", visitors: 942 },
  { browser: "firefox", visitors: 734 },
  { browser: "edge", visitors: 513 },
  { browser: "other", visitors: 286 },
];

export const radialDefaultChartExampleConfig = {
  visitors: { label: "Visitors" },
} satisfies ChartConfig;

export const radialTextChartExampleData: RadialDefaultChartExampleDatum[] = [
  { browser: "chrome", visitors: 1_286 },
];

export type RadialStackedChartExampleDatum = {
  browser: "chrome";
  mobile: number;
  desktop: number;
};

export const radialStackedChartExampleData: RadialStackedChartExampleDatum[] = [
  { browser: "chrome", mobile: 386, desktop: 900 },
];

export const radialStackedChartExampleConfig = {
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },
} satisfies ChartConfig;
