import { ComponentExample } from "@/components/layout/component-example"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

import {
  singleBarChartExampleConfig,
  singleBarChartExampleData,
  multipleBarChartExampleConfig,
  multipleBarChartExampleData,
  stackedBarChartExampleConfig,
  stackedBarChartExampleData,
  singleLineChartExampleConfig,
  singleLineChartExampleData,
  multipleLineChartExampleConfig,
  multipleLineChartExampleData,
  lineWithDotsChartExampleConfig,
  lineWithDotsChartExampleData,
  areaSingleChartExampleConfig,
  areaSingleChartExampleData,
  areaMultipleChartExampleConfig,
  areaMultipleChartExampleData,
  areaStackedChartExampleConfig,
  areaStackedChartExampleData,
  areaGradientChartExampleConfig,
  areaGradientChartExampleData,
  pieChartExampleConfig,
  pieChartExampleData,
  radarChartExampleConfig,
  radarChartExampleData,
  radialDefaultChartExampleConfig,
  radialDefaultChartExampleData,
  radialStackedChartExampleConfig,
  radialStackedChartExampleData,
  radialTextChartExampleData,
} from "./charts-example-data"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts"

export function ChartsPage() {
  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Charts</h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Recharts-based charts with shared styling, tooltips, and legends.
          </p>
        </PageSection>

        <PageSection id="chart-bar" label="Bar">
          <h2 className="text-lg font-semibold">Bar</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Bar chart examples: single, grouped, stacked, and horizontal variations.
          </p>

          <h3 id="chart-bar-single" className="mb-3 text-base font-semibold">
            Single bar
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={singleBarChartExampleData}
                    margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        typeof value === "string"
                          ? value.slice(0, 3)
                          : String(value).slice(0, 3)
                      }
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-bar-multiple" className="mb-3 text-base font-semibold">
            Multiple bar
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={multipleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={multipleBarChartExampleData}
                    margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-bar-stacked" className="mb-3 text-base font-semibold">
            Stacked bar
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={stackedBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={stackedBarChartExampleData}
                    margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Bar
                      dataKey="desktop"
                      stackId="a"
                      fill="var(--color-desktop)"
                      radius={[0, 0, 4, 4]}
                    />
                    <Bar
                      dataKey="mobile"
                      stackId="a"
                      fill="var(--color-mobile)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-line" label="Line">
          <h2 className="text-lg font-semibold">Line</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Line charts for trends over time or ordered categories.
          </p>

          <h3 id="chart-line-single" className="mb-3 text-base font-semibold">
            Single line
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={singleLineChartExampleConfig}>
                  <LineChart
                    accessibilityLayer
                    data={singleLineChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Line
                      dataKey="desktop"
                      type="natural"
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-line-multiple"className="mb-3 text-base font-semibold">
            Multiple lines
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={multipleLineChartExampleConfig}>
                  <LineChart
                    accessibilityLayer
                    data={multipleLineChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="mobile"
                      type="monotone"
                      stroke="var(--color-mobile)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-line-dots" className="mb-3 text-base font-semibold">
            Line with dots
          </h3>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer config={lineWithDotsChartExampleConfig}>
                  <LineChart
                    accessibilityLayer
                    data={lineWithDotsChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Line
                      dataKey="desktop"
                      type="natural"
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                      dot={{
                        fill: "var(--color-desktop)",
                      }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-area" label="Area">
          <h2 className="text-lg font-semibold">Area</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Area chart examples: single, multiple, stacked, and gradient fills.
          </p>

          <h3 id="chart-area-single" className="mb-3 text-base font-semibold">
            Area single
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={areaSingleChartExampleConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={areaSingleChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-area-multiple" className="mb-3 text-base font-semibold">
            Area multiple
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={areaMultipleChartExampleConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={areaMultipleChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="var(--color-mobile)"
                      fillOpacity={0.4}
                      stroke="var(--color-mobile)"
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-area-stacked" className="mb-3 text-base font-semibold">
            Area stacked
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer config={areaStackedChartExampleConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={areaStackedChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="var(--color-mobile)"
                      fillOpacity={0.4}
                      stroke="var(--color-mobile)"
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-area-gradient" className="mb-3 text-base font-semibold">
            Area gradient
          </h3>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer config={areaGradientChartExampleConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={areaGradientChartExampleData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <defs>
                      <linearGradient
                        id="fillDesktopArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-desktop)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-desktop)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillMobileArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-mobile)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-mobile)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="url(#fillMobileArea)"
                      fillOpacity={0.4}
                      stroke="var(--color-mobile)"
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="url(#fillDesktopArea)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-pie" label="Pie">
          <h2 className="text-lg font-semibold">Pie</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Pie chart examples: default, labels, donut, and donut with text.
          </p>

          <h3 id="chart-pie-default" className="mb-3 text-base font-semibold">
            Default
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={pieChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <Pie data={pieChartExampleData} dataKey="visitors" nameKey="browser" />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-pie-labels" className="mb-3 text-base font-semibold">
            With labels
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={pieChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                  <PieChart>
                    <Pie
                      data={pieChartExampleData}
                      dataKey="visitors"
                      label
                      nameKey="browser"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-pie-donut" className="mb-3 text-base font-semibold">
            Donut
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={pieChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <Pie
                      data={pieChartExampleData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-pie-donut-text" className="mb-3 text-base font-semibold">
            Donut with text
          </h3>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer
                  config={pieChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <Pie
                      data={pieChartExampleData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          const totalVisitors = pieChartExampleData.reduce(
                            (sum, item) => sum + item.visitors,
                            0
                          )

                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Visitors
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-radar" label="Radar">
          <h2 className="text-lg font-semibold">Radar</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Radar chart examples (6 data points).
          </p>

          <h3 id="chart-radar-default" className="mb-3 text-base font-semibold">
            Default
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={radarChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadarChart data={radarChartExampleData}>
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid />
                    <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-radar-dots" className="mb-3 text-base font-semibold">
            With dots
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={radarChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadarChart data={radarChartExampleData}>
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid />
                    <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0.6}
                      dot={{ r: 4, fillOpacity: 1 }}
                    />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-radar-lines" className="mb-3 text-base font-semibold">
            Lines
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={radarChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadarChart data={radarChartExampleData}>
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid radialLines={false} />
                    <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0}
                      stroke="var(--color-desktop)"
                      strokeWidth={2}
                    />
                    <Radar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      fillOpacity={0}
                      stroke="var(--color-mobile)"
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3
            id="chart-radar-multiple"
            className="mb-3 text-base font-semibold"
          >
            Multiple
          </h3>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer
                  config={radarChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadarChart data={radarChartExampleData}>
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid />
                    <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0.6}
                    />
                    <Radar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-radial" label="Radial">
          <h2 className="text-lg font-semibold">Radial</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Radial chart examples for progress and stacked totals.
          </p>

          <h3 id="chart-radial-default" className="mb-3 text-base font-semibold">
            Default
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={radialDefaultChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadialBarChart
                    data={radialDefaultChartExampleData}
                    innerRadius={30}
                    outerRadius={110}
                  >
                    <RadialBar dataKey="visitors" fill="var(--color-visitors)" background />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-radial-text" className="mb-3 text-base font-semibold">
            With text
          </h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <ChartContainer
                  config={radialDefaultChartExampleConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadialBarChart
                    data={radialTextChartExampleData}
                    startAngle={0}
                    endAngle={250}
                    outerRadius={90}
                    innerRadius={80}
                  >
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-muted last:fill-background"
                      polarRadius={[90, 80]}
                    />
                    <RadialBar
                      dataKey="visitors"
                      fill="var(--color-visitors)"
                      background
                      cornerRadius={10}
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-4xl font-bold"
                                >
                                  {radialTextChartExampleData
                                    .reduce((sum, item) => sum + item.visitors, 0)
                                    .toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Visitors
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-radial-stacked" className="mb-3 text-base font-semibold">
            Stacked
          </h3>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer
                  config={radialStackedChartExampleConfig}
                  className="mx-auto aspect-square w-full max-w-[250px]"
                >
                  <RadialBarChart
                    data={radialStackedChartExampleData}
                    endAngle={180}
                    innerRadius={80}
                    outerRadius={110}
                  >
                    <RadialBar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      stackId="a"
                      cornerRadius={5}
                      className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                      dataKey="desktop"
                      stackId="a"
                      cornerRadius={5}
                      fill="var(--color-desktop)"
                      className="stroke-transparent stroke-2"
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) => {
                          const totalVisitors = radialStackedChartExampleData.reduce(
                            (sum, item) => sum + item.desktop + item.mobile,
                            0
                          )

                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 16}
                                  className="fill-foreground text-2xl font-bold"
                                >
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 4}
                                  className="fill-muted-foreground"
                                >
                                  Visitors
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-tooltip" label="Tooltip">
          <h2 className="text-lg font-semibold">Tooltip</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Tooltip behaviour and content for chart interactions.
          </p>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart accessibilityLayer data={singleBarChartExampleData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                      cursor={true}
                      defaultIndex={1}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-legend" label="Legend">
          <h2 className="text-lg font-semibold">Legend</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Legend layout and series labels.
          </p>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer config={multipleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={multipleBarChartExampleData}
                    margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => String(value).slice(0, 3)}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-axis" label="Axis">
          <h2 className="text-lg font-semibold">Axis</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Axis configuration, ticks, and labels.
          </p>

          <h3 id="chart-axis-x" className="text-base font-semibold">
            X axis
          </h3>
          <p className="mb-4 text-sm text-muted-foreground text-pretty">
            Category axis on the bottom: month labels shortened to three letters.
          </p>
          <ComponentExample className="mb-10">
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={singleBarChartExampleData}
                    margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        typeof value === "string"
                          ? value.slice(0, 3)
                          : String(value).slice(0, 3)
                      }
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-axis-y" className="text-base font-semibold">
            Y axis
          </h3>
          <p className="mb-4 text-sm text-muted-foreground text-pretty">
            Value axis on the left: tick styling aligned with the chart container.
          </p>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={singleBarChartExampleData}
                    margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        typeof value === "string"
                          ? value.slice(0, 3)
                          : String(value).slice(0, 3)
                      }
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-grid" label="Grid">
          <h2 className="text-lg font-semibold">Grid</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Grid lines and background reference.
          </p>

          <h3 id="chart-grid-x" className="text-base font-semibold">
            X axis grid
          </h3>
          <p className="mb-4 text-sm text-muted-foreground text-pretty">
            Vertical lines only, aligned with the category axis.
          </p>
          <ComponentExample className="mb-10">
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={singleBarChartExampleData}
                    margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical horizontal={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        typeof value === "string"
                          ? value.slice(0, 3)
                          : String(value).slice(0, 3)
                      }
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-grid-y" className="text-base font-semibold">
            Y axis grid
          </h3>
          <p className="mb-4 text-sm text-muted-foreground text-pretty">
            Horizontal lines only, aligned with the value axis.
          </p>
          <ComponentExample className="mb-10">
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={singleBarChartExampleData}
                    margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} horizontal />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        typeof value === "string"
                          ? value.slice(0, 3)
                          : String(value).slice(0, 3)
                      }
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="chart-grid-none" className="text-base font-semibold">
            No grid
          </h3>
          <p className="mb-4 text-sm text-muted-foreground text-pretty">
            Grid lines disabled; CartesianGrid remains mounted with both vertical and
            horizontal lines turned off.
          </p>
          <ComponentExample>
            <Card>
              <CardContent>
                <ChartContainer config={singleBarChartExampleConfig}>
                  <BarChart
                    accessibilityLayer
                    data={singleBarChartExampleData}
                    margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        typeof value === "string"
                          ? value.slice(0, 3)
                          : String(value).slice(0, 3)
                      }
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="chart-layout" label="Layout">
          <h2 className="text-lg font-semibold">Layout</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Combine charts with card headers, metric headlines, and body content for
            dashboards and detail views.
          </p>

          <PageSection id="chart-with-header" label="With header">
            <h3 className="text-base font-semibold">With header</h3>
            <p className="mb-4 text-sm text-muted-foreground text-pretty">
              Place the chart in a card with CardHeader for the title and CardContent for
              the chart area. Set the tooltip prop on CardHeader to move CardDescription
              into the help tooltip instead of under the title.
            </p>
            <ComponentExample className="mb-6">
              <Card>
                <CardHeader tooltip>
                  <CardTitle>Desktop traffic</CardTitle>
                  <CardDescription>
                    Monthly sessions by device type for the current year.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={singleBarChartExampleConfig}>
                    <BarChart
                      accessibilityLayer
                      data={singleBarChartExampleData}
                      margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                          typeof value === "string"
                            ? value.slice(0, 3)
                            : String(value).slice(0, 3)
                        }
                      />
                      <Bar
                        dataKey="desktop"
                        fill="var(--color-desktop)"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </ComponentExample>
          </PageSection>

          <PageSection id="chart-with-metric" label="With metric">
            <h3 className="text-base font-semibold">With metric</h3>
            <p className="mb-4 text-sm text-muted-foreground text-pretty">
              ChartMetric is a standalone headline above ChartContainer (siblings). Add
              spacing with the parent (for example CardContent space-y-4). This example
              reuses the single bar data; swap the value and label for other aggregations.
            </p>
            <ComponentExample className="mb-6">
              <Card>
                <CardContent>
                  <ChartMetric
                    value={singleBarChartExampleData.reduce(
                      (sum, d) => sum + d.desktop,
                      0
                    )}
                    label="Total desktop views"
                  />
                  <ChartContainer config={singleBarChartExampleConfig}>
                    <BarChart
                      accessibilityLayer
                      data={singleBarChartExampleData}
                      margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                          typeof value === "string"
                            ? value.slice(0, 3)
                            : String(value).slice(0, 3)
                        }
                      />
                      <Bar
                        dataKey="desktop"
                        fill="var(--color-desktop)"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </ComponentExample>
          </PageSection>

          <PageSection
            id="chart-with-header-and-metric"
            label="With header and metric"
          >
            <h3 className="text-base font-semibold">With header and metric</h3>
            <p className="mb-4 text-sm text-muted-foreground text-pretty">
              CardHeader for the title (use the tooltip prop to show CardDescription in the
              help icon), then CardContent with ChartMetric and ChartContainer as siblings.
            </p>
            <ComponentExample>
              <Card>
                <CardHeader tooltip>
                  <CardTitle>Desktop traffic</CardTitle>
                  <CardDescription>
                    Monthly sessions by device type for the current year.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartMetric
                    value={singleBarChartExampleData.reduce(
                      (sum, d) => sum + d.desktop,
                      0
                    )}
                    label="Total desktop views"
                  />
                  <ChartContainer config={singleBarChartExampleConfig}>
                    <BarChart
                      accessibilityLayer
                      data={singleBarChartExampleData}
                      margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) =>
                          typeof value === "string"
                            ? value.slice(0, 3)
                            : String(value).slice(0, 3)
                        }
                      />
                      <Bar
                        dataKey="desktop"
                        fill="var(--color-desktop)"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </ComponentExample>
          </PageSection>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
