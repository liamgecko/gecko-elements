import * as React from "react";
import {
  Legend,
  ResponsiveContainer,
  Tooltip,
  type DefaultLegendContentProps,
  type DefaultTooltipContentProps,
  type TooltipValueType,
} from "recharts";

import { cn } from "@gecko/ui/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;
const AUTOMATIC_CHART_COLOR_COUNT = 5;
type TooltipNameType = number | string;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  layout = "cartesian",
  title,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  /** Accessible chart name passed to the Recharts chart. */
  title: string;
  /** Cartesian charts are wide; polar charts use the approved square layout. */
  layout?: "cartesian" | "polar";
  children: React.ComponentProps<typeof ResponsiveContainer>["children"];
  initialDimension?: {
    width: number;
    height: number;
  };
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  const accessibleChart = React.cloneElement(
    children as React.ReactElement<{ title?: string }>,
    { title },
  );

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        data-layout={layout}
        className={cn(
          "flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-pie-label-text]:fill-foreground [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden [&_.recharts-tooltip-wrapper]:z-50 [&_.recharts-legend-wrapper]:z-0",
          layout === "polar"
            ? "mx-auto aspect-square w-full max-w-[250px]"
            : "aspect-video",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer initialDimension={initialDimension}>
          {accessibleChart}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config);

  const firstUncolouredOverflow = colorConfig.findIndex(
    ([, itemConfig], index) =>
      index >= AUTOMATIC_CHART_COLOR_COUNT &&
      !itemConfig.theme &&
      !itemConfig.color,
  );

  if (firstUncolouredOverflow !== -1) {
    throw new Error(
      "ChartConfig automatically colours up to five series. Request an approved library treatment before adding more.",
    );
  }

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig], index) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color ??
      `var(--chart-${index + 1})`;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = Tooltip;

type ChartAxisTickProps = {
  x?: number | string;
  y?: number | string;
  payload?: { value?: unknown };
  // Recharts passes this for category axes; useful for centering/wrapping.
  width?: number | string;
};

function wrapTickLabel(
  value: string,
  maxCharsPerLine: number,
  maxLines: number,
) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxCharsPerLine || current.length === 0) {
      current = next;
      continue;
    }

    lines.push(current);
    current = word;

    if (lines.length >= maxLines) break;
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    return lines.slice(0, maxLines);
  }

  // If we exceeded maxLines while still having remaining words, add ellipsis.
  const usedWords = lines.join(" ").split(/\s+/).filter(Boolean).length;
  if (usedWords < words.length) {
    const lastIndex = Math.min(maxLines, lines.length) - 1;
    lines[lastIndex] = `${lines[lastIndex].replace(/\.*$/, "")}…`;
  }

  return lines;
}

function ChartXAxisTickLabel({
  x = 0,
  y = 0,
  width,
  payload,
  maxLines = 2,
  maxCharsPerLine: maxCharsPerLineProp,
  lineHeight = 16,
  className,
}: ChartAxisTickProps & {
  maxLines?: number;
  /** Force wrapping regardless of tick width (useful for dense categorical axes). */
  maxCharsPerLine?: number;
  lineHeight?: number;
  className?: string;
}) {
  const xNumber = typeof x === "number" ? x : Number(x);
  const yNumber = typeof y === "number" ? y : Number(y);
  const widthNumber = typeof width === "number" ? width : Number(width);

  const value = payload?.value;
  const label =
    typeof value === "string" ? value : value == null ? "" : String(value);
  if (!label) return null;

  const tickWidth = Math.max(48, Math.floor(widthNumber || 84));
  // Rough heuristic: average glyph width ~6–7px at text-xs.
  const maxCharsPerLine =
    maxCharsPerLineProp ?? Math.max(6, Math.floor(tickWidth / 6.5));
  const lines = wrapTickLabel(label, maxCharsPerLine, maxLines);

  return (
    <g className={cn("[&_text]:fill-muted-foreground", className)}>
      <text
        x={xNumber}
        y={yNumber + 18}
        textAnchor="middle"
        fontSize={11}
        className="text-muted-foreground"
      >
        {lines.map((line, idx) => (
          <tspan key={idx} x={xNumber} dy={idx === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "grid min-w-44 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color ?? item.payload?.fill ?? item.color;

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-nowrap items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  <div className="min-w-0 w-full flex-1">
                    {formatter(
                      item.value,
                      item.name,
                      item,
                      index,
                      item.payload,
                    )}
                  </div>
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex min-w-0 flex-1 items-center gap-4 leading-none",
                        nestLabel && "items-end",
                      )}
                    >
                      <div className="grid min-w-0 flex-1 gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="shrink-0 font-mono font-medium text-foreground tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

type ChartTooltipPayloadItem = NonNullable<
  DefaultTooltipContentProps<TooltipValueType, TooltipNameType>["payload"]
>[number];

type ChartTooltipItemsProps = {
  payload: ChartTooltipPayloadItem[];
  indicator?: "line" | "dot" | "dashed";
  hideIndicator?: boolean;
  color?: string;
  nameKey?: string;
  formatter?: (
    value: TooltipValueType,
    name: TooltipNameType,
    item: ChartTooltipPayloadItem,
    index: number,
    payload: ChartTooltipPayloadItem["payload"],
  ) => React.ReactNode;
};

function ChartTooltipItems({
  payload,
  indicator = "dot",
  hideIndicator = false,
  color,
  nameKey,
  formatter,
}: ChartTooltipItemsProps) {
  const { config } = useChart();

  return (
    <div className="grid gap-1.5">
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color ?? item.payload?.fill ?? item.color;

          return (
            <div
              key={index}
              className={cn(
                "flex w-full flex-nowrap items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                <div className="min-w-0 w-full flex-1">
                  {formatter(item.value, item.name, item, index, item.payload)}
                </div>
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div className="flex min-w-0 flex-1 items-center gap-4 leading-none">
                    <span className="min-w-0 flex-1 text-muted-foreground">
                      {itemConfig?.label ?? item.name}
                    </span>
                    {item.value != null && (
                      <span className="shrink-0 font-mono font-medium text-foreground tabular-nums">
                        {typeof item.value === "number"
                          ? item.value.toLocaleString()
                          : String(item.value)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}

function ChartTooltipGroupedContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  primaryTitle,
  compareTitle,
  isCompareSeries = (dataKey) => dataKey.startsWith("compare"),
}: React.ComponentProps<typeof Tooltip> &
  React.ComponentProps<"div"> & {
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    primaryTitle: string;
    compareTitle: string;
    isCompareSeries?: (dataKey: string) => boolean;
  } & Omit<
    DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  if (!active || !payload?.length) {
    return null;
  }

  const visiblePayload = payload.filter((item) => item.type !== "none");
  const primaryPayload: ChartTooltipPayloadItem[] = [];
  const comparePayload: ChartTooltipPayloadItem[] = [];

  for (const item of visiblePayload) {
    const dataKey = String(item.dataKey ?? "");
    if (isCompareSeries(dataKey)) {
      comparePayload.push(item);
    } else {
      primaryPayload.push(item);
    }
  }

  const labelContent =
    label != null ? (
      <div
        className={cn(
          "border-b border-border pb-1.5 font-medium",
          labelClassName,
        )}
      >
        {labelFormatter ? labelFormatter(label, payload) : label}
      </div>
    ) : null;

  const itemProps = {
    indicator,
    hideIndicator,
    color,
    nameKey,
    formatter,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "grid min-w-44 items-start gap-2 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {labelContent}
      <div className="grid gap-2">
        <div className="grid gap-1">
          <p className="truncate font-medium text-foreground">{primaryTitle}</p>
          <ChartTooltipItems payload={primaryPayload} {...itemProps} />
        </div>
        <div className="grid gap-1">
          <p className="truncate font-medium text-foreground">{compareTitle}</p>
          <ChartTooltipItems payload={comparePayload} {...itemProps} />
        </div>
      </div>
    </div>
  );
}

const ChartLegend = Legend;

type ChartLegendPayload = NonNullable<DefaultLegendContentProps["payload"]>;

type ChartLegendGroup = {
  title: string;
  payload: ChartLegendPayload;
};

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & DefaultLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function ChartLegendGroupedContent({
  className,
  groups,
  hideIcon = false,
  nameKey,
  verticalAlign = "bottom",
}: React.ComponentProps<"div"> & {
  groups: ChartLegendGroup[];
  hideIcon?: boolean;
  nameKey?: string;
  verticalAlign?: "top" | "bottom";
}) {
  if (!groups.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-2",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {groups.map((group) => (
        <div
          key={group.title}
          className="flex w-full max-w-full flex-col items-center gap-1"
        >
          <p className="max-w-full truncate text-center text-xs font-medium text-foreground">
            {group.title}
          </p>
          <ChartLegendContent
            payload={group.payload}
            hideIcon={hideIcon}
            nameKey={nameKey}
            verticalAlign={verticalAlign}
            className="justify-center pt-0"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Headline metric: primary value + optional muted label. Place above `ChartContainer`
 * as a sibling.
 */
const ChartMetric = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<"div">, "children"> & {
    /** Shown large; numbers are formatted with `toLocaleString()`. */
    value: React.ReactNode;
    label?: React.ReactNode;
  }
>(function ChartMetric({ value, label, className, ...props }, ref) {
  const displayValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      ref={ref}
      data-slot="chart-metric"
      className={cn("mb-8 flex items-baseline gap-2", className)}
      {...props}
    >
      <span className="text-3xl font-semibold tracking-tight text-foreground">
        {displayValue}
      </span>
      {label != null ? (
        <span className="text-xs text-muted-foreground">{label}</span>
      ) : null}
    </div>
  );
});
ChartMetric.displayName = "ChartMetric";

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartContainer,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipGroupedContent,
  ChartXAxisTickLabel,
  ChartLegend,
  ChartLegendContent,
  ChartLegendGroupedContent,
  ChartStyle,
};
