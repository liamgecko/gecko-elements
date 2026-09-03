import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Code } from "@gecko/ui/components/code";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@gecko/ui/components/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
} from "@gecko/ui/components/chart";

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
} from "./charts-example-data";

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
} from "recharts";

export function ChartsPage() {
  const importSnippet = `import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
} from "@gecko/ui/components/chart"`;

  const barSnippet = `<ChartContainer title="Monthly desktop users" config={config}>
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Bar dataKey="desktop" fill="var(--color-desktop)" />
  </BarChart>
</ChartContainer>`;

  const multipleBarSnippet = `<ChartContainer title="Monthly users by device" config={config}>
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Bar dataKey="desktop" fill="var(--color-desktop)" />
    <Bar dataKey="mobile" fill="var(--color-mobile)" />
  </BarChart>
</ChartContainer>`;

  const stackedBarSnippet = `<ChartContainer title="Monthly users by device" config={config}>
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" />
    <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" />
  </BarChart>
</ChartContainer>`;

  const lineSnippet = `<ChartContainer title="Monthly desktop users" config={config}>
  <LineChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" dot={false} />
  </LineChart>
</ChartContainer>`;

  const multipleLineSnippet = `<ChartContainer title="Monthly users by device" config={config}>
  <LineChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Line dataKey="desktop" stroke="var(--color-desktop)" dot={false} />
    <Line dataKey="mobile" stroke="var(--color-mobile)" dot={false} />
  </LineChart>
</ChartContainer>`;

  const lineDotsSnippet = `<ChartContainer title="Monthly desktop users" config={config}>
  <LineChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Line
      dataKey="desktop"
      stroke="var(--color-desktop)"
      dot={{ fill: "var(--color-desktop)" }}
      activeDot={{ r: 6 }}
    />
  </LineChart>
</ChartContainer>`;

  const areaSnippet = `<ChartContainer title="Monthly desktop users" config={config}>
  <AreaChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" stroke="var(--color-desktop)" />
  </AreaChart>
</ChartContainer>`;

  const areaMultipleSnippet = `<ChartContainer title="Monthly users by device" config={config}>
  <AreaChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <Area dataKey="mobile" stackId="a" fill="var(--color-mobile)" stroke="var(--color-mobile)" />
    <Area dataKey="desktop" stackId="a" fill="var(--color-desktop)" stroke="var(--color-desktop)" />
  </AreaChart>
</ChartContainer>`;

  const areaGradientSnippet = `<ChartContainer title="Monthly users by device" config={config}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
        <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
      </linearGradient>
    </defs>
    <Area dataKey="desktop" fill="url(#fillDesktop)" stroke="var(--color-desktop)" />
  </AreaChart>
</ChartContainer>`;

  const pieSnippet = `<ChartContainer title="Visitors by browser" config={config} layout="polar">
  <PieChart>
    <Pie data={data} dataKey="visitors" nameKey="browser" />
  </PieChart>
</ChartContainer>`;

  const pieLabelsSnippet = `<ChartContainer title="Visitors by browser" config={config} layout="polar">
  <PieChart>
    <Pie data={data} dataKey="visitors" nameKey="browser" label />
  </PieChart>
</ChartContainer>`;

  const pieDonutSnippet = `<ChartContainer title="Visitors by browser" config={config} layout="polar">
  <PieChart>
    <Pie data={data} dataKey="visitors" nameKey="browser" innerRadius={60} />
  </PieChart>
</ChartContainer>`;

  const pieDonutTextSnippet = `<ChartContainer title="Visitors by browser" config={config} layout="polar">
  <PieChart>
    <Pie data={data} dataKey="visitors" nameKey="browser" innerRadius={60}>
      <Label />
    </Pie>
  </PieChart>
</ChartContainer>`;

  const radarSnippet = `<ChartContainer title="Monthly device profile" config={config} layout="polar">
  <RadarChart data={data}>
    <PolarAngleAxis dataKey="month" />
    <PolarGrid />
    <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
  </RadarChart>
</ChartContainer>`;

  const radarDotsSnippet = `<ChartContainer title="Monthly device profile" config={config} layout="polar">
  <RadarChart data={data}>
    <PolarAngleAxis dataKey="month" />
    <PolarGrid />
    <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} dot={{ r: 4 }} />
  </RadarChart>
</ChartContainer>`;

  const radarLinesSnippet = `<ChartContainer title="Monthly users by device" config={config} layout="polar">
  <RadarChart data={data}>
    <PolarAngleAxis dataKey="month" />
    <PolarGrid radialLines={false} />
    <Radar dataKey="desktop" fillOpacity={0} stroke="var(--color-desktop)" />
    <Radar dataKey="mobile" fillOpacity={0} stroke="var(--color-mobile)" />
  </RadarChart>
</ChartContainer>`;

  const radarMultipleSnippet = `<ChartContainer title="Monthly users by device" config={config} layout="polar">
  <RadarChart data={data}>
    <PolarAngleAxis dataKey="month" />
    <PolarGrid />
    <Radar dataKey="desktop" fill="var(--color-desktop)" fillOpacity={0.6} />
    <Radar dataKey="mobile" fill="var(--color-mobile)" fillOpacity={0.6} />
  </RadarChart>
</ChartContainer>`;

  const radialSnippet = `<ChartContainer title="Visitors by browser" config={config} layout="polar">
  <RadialBarChart data={data} innerRadius={30} outerRadius={110}>
    <RadialBar dataKey="visitors" background />
  </RadialBarChart>
</ChartContainer>`;

  const radialTextSnippet = `<ChartContainer title="Chrome visitors" config={config} layout="polar">
  <RadialBarChart data={data} innerRadius={80} outerRadius={90}>
    <RadialBar dataKey="visitors" background />
    <PolarRadiusAxis tick={false} axisLine={false}>
      <Label />
    </PolarRadiusAxis>
  </RadialBarChart>
</ChartContainer>`;

  const radialStackedSnippet = `<ChartContainer title="Visitors by device" config={config} layout="polar">
  <RadialBarChart data={data} endAngle={180} innerRadius={80} outerRadius={110}>
    <RadialBar dataKey="mobile" stackId="a" fill="var(--color-mobile)" />
    <RadialBar dataKey="desktop" stackId="a" fill="var(--color-desktop)" />
  </RadialBarChart>
</ChartContainer>`;

  const tooltipSnippet = `<ChartTooltip
  content={<ChartTooltipContent indicator="line" />}
  cursor={true}
  defaultIndex={1}
/>`;

  const legendSnippet = `<ChartLegend content={<ChartLegendContent />} />`;

  const axisXSnippet = `<XAxis
  dataKey="month"
  tickLine={false}
  axisLine={false}
  tickFormatter={(value) => String(value).slice(0, 3)}
/>`;

  const axisYSnippet = `<YAxis tickLine={false} axisLine={false} tickMargin={8} />`;

  const gridXSnippet = `<CartesianGrid vertical horizontal={false} />`;

  const gridYSnippet = `<CartesianGrid vertical={false} horizontal />`;

  const gridNoneSnippet = `<CartesianGrid vertical={false} horizontal={false} />`;

  const layoutHeaderSnippet = `<Card>
  <CardHeader tooltip>
    <CardTitle>Desktop traffic</CardTitle>
    <CardDescription>Monthly sessions by device type for the current year.</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer title="Monthly desktop traffic" config={config}>
      <BarChart data={data}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
      </BarChart>
    </ChartContainer>
  </CardContent>
</Card>`;

  const layoutMetricSnippet = `<Card>
  <CardContent>
    <ChartMetric value={total} label="Total desktop views" />
    <ChartContainer title="Monthly desktop traffic" config={config}>
      <BarChart data={data}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
      </BarChart>
    </ChartContainer>
  </CardContent>
</Card>`;

  const layoutHeaderMetricSnippet = `<Card>
  <CardHeader tooltip>
    <CardTitle>Desktop traffic</CardTitle>
    <CardDescription>Monthly sessions by device type for the current year.</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartMetric value={total} label="Total desktop views" />
    <ChartContainer title="Monthly desktop traffic" config={config}>
      <BarChart data={data}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" />
      </BarChart>
    </ChartContainer>
  </CardContent>
</Card>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Charts"
          description="The Charts components turn numbers into a picture people can scan — bars, lines, areas, and pies. They sit on Recharts, with Gecko colours, tooltips, and legends."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use a chart when a trend, comparison, or share of a whole is
              easier to see than a table — on dashboards, reporting, or inside a{" "}
              <DocsPageLink to="/components/card">Card</DocsPageLink>. Pick the
              shape that matches the question: bars to compare, lines for change
              over time, pies for parts of a whole.
              <br />
              <br />
              Avoid using a chart for a single number — that is a{" "}
              <DocsPageLink to="/components/metric-card">
                Metric card
              </DocsPageLink>
              . When exact values matter more than shape, use a{" "}
              <DocsPageLink to="/components/table">Table</DocsPageLink>.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import ChartContainer, ChartMetric, and the tooltip or legend parts you need. Chart shapes come from Recharts."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-bar" label="Bar">
        <PageSectionHeader
          title="Bar"
          description={
            <>
              Compares values using <Code>BarChart</Code> and <Code>Bar</Code>{" "}
              inside <Code>ChartContainer</Code>. Use this when people need to
              compare amounts side by side.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-bar-single"
          title="Single bar"
          description={
            <>
              One series using a single <Code>Bar</Code>. Use this when there is
              one measure per category.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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
            <Code
              variant="block"
              language="tsx"
              code={barSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-bar-multiple"
          title="Multiple bar"
          description={
            <>
              Several series using more than one <Code>Bar</Code>. Use this when
              comparing two or more measures in the same category.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={multipleBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={multipleBarSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-bar-stacked"
          title="Stacked bar"
          description={
            <>
              Stacks series with <Code>stackId</Code> on each <Code>Bar</Code>.
              Use this when the parts should add up to a total.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={stackedBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={stackedBarSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-line" label="Line">
        <PageSectionHeader
          title="Line"
          description={
            <>
              Shows change over time using <Code>LineChart</Code> and{" "}
              <Code>Line</Code>. Use this when the story is a trend, not a
              comparison of totals.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-line-single"
          title="Single line"
          description={
            <>
              One series using a single <Code>Line</Code>. Use this when there
              is one measure over time.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleLineChartExampleConfig}
                >
                  <LineChart
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

            <Code
              variant="block"
              language="tsx"
              code={lineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-line-multiple"
          title="Multiple lines"
          description={
            <>
              Several series using more than one <Code>Line</Code>. Use this
              when comparing trends side by side.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={multipleLineChartExampleConfig}
                >
                  <LineChart
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

            <Code
              variant="block"
              language="tsx"
              code={multipleLineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-line-dots"
          title="Line with dots"
          description={
            <>
              Marks each point using the <Code>dot</Code> prop on{" "}
              <Code>Line</Code>. Use this when the individual values matter as
              well as the trend.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={lineWithDotsChartExampleConfig}
                >
                  <LineChart
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

            <Code
              variant="block"
              language="tsx"
              code={lineDotsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-area" label="Area">
        <PageSectionHeader
          title="Area"
          description={
            <>
              Fills the space under a trend using <Code>AreaChart</Code> and{" "}
              <Code>Area</Code>. Use this when volume over time should feel
              solid, not just a line.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-area-single"
          title="Area single"
          description={
            <>
              One series using a single <Code>Area</Code>. Use this when there
              is one measure over time.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={areaSingleChartExampleConfig}
                >
                  <AreaChart
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

            <Code
              variant="block"
              language="tsx"
              code={areaSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-area-multiple"
          title="Area multiple"
          description={
            <>
              Several series using more than one <Code>Area</Code>. Use this
              when comparing overlapping volumes.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={areaMultipleChartExampleConfig}
                >
                  <AreaChart
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

            <Code
              variant="block"
              language="tsx"
              code={areaMultipleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-area-stacked"
          title="Area stacked"
          description={
            <>
              Stacks series with <Code>stackId</Code> on each <Code>Area</Code>.
              Use this when the parts should add up to a total over time.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={areaStackedChartExampleConfig}
                >
                  <AreaChart
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

            <Code
              variant="block"
              language="tsx"
              code={areaMultipleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-area-gradient"
          title="Area gradient"
          description={
            <>
              Fades the fill using a <Code>linearGradient</Code> in{" "}
              <Code>defs</Code>. Use this when a hard fill would feel too heavy.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={areaGradientChartExampleConfig}
                >
                  <AreaChart
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

            <Code
              variant="block"
              language="tsx"
              code={areaGradientSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-pie" label="Pie">
        <PageSectionHeader
          title="Pie"
          description={
            <>
              Shows parts of a whole using <Code>PieChart</Code> and{" "}
              <Code>Pie</Code>. Use this when the question is share, not change
              over time.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-pie-default"
          title="Default"
          description={
            <>
              A filled pie using <Code>dataKey</Code> and <Code>nameKey</Code>.
              Use this for a simple breakdown.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Visitors by browser"
                  config={pieChartExampleConfig}
                  layout="polar"
                >
                  <PieChart>
                    <Pie
                      data={pieChartExampleData}
                      dataKey="visitors"
                      nameKey="browser"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={pieSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-pie-labels"
          title="With labels"
          description={
            <>
              Writes the name on each slice using the <Code>label</Code> prop.
              Use this when people should read the categories without a legend.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Visitors by browser"
                  config={pieChartExampleConfig}
                  layout="polar"
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

            <Code
              variant="block"
              language="tsx"
              code={pieLabelsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-pie-donut"
          title="Donut"
          description={
            <>
              Opens the centre using <Code>innerRadius</Code>. Use this when a
              hole in the middle makes the shares easier to scan.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Visitors by browser"
                  config={pieChartExampleConfig}
                  layout="polar"
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

            <Code
              variant="block"
              language="tsx"
              code={pieDonutSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-pie-donut-text"
          title="Donut with text"
          description={
            <>
              Places a total in the hole using <Code>Label</Code> inside{" "}
              <Code>Pie</Code>. Use this when the overall number should sit with
              the breakdown.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Visitors by browser"
                  config={pieChartExampleConfig}
                  layout="polar"
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
                            0,
                          );

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
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={pieDonutTextSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-radar" label="Radar">
        <PageSectionHeader
          title="Radar"
          description={
            <>
              Compares several axes at once using <Code>RadarChart</Code> and{" "}
              <Code>Radar</Code>. Use this for a profile of scores, not a time
              series.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-radar-default"
          title="Default"
          description={
            <>
              One filled series using <Code>Radar</Code> with{" "}
              <Code>PolarGrid</Code>. Use this for a single profile.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly device profile"
                  config={radarChartExampleConfig}
                  layout="polar"
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

            <Code
              variant="block"
              language="tsx"
              code={radarSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-radar-dots"
          title="With dots"
          description={
            <>
              Marks each axis using the <Code>dot</Code> prop on{" "}
              <Code>Radar</Code>. Use this when the individual scores should
              stand out.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly device profile"
                  config={radarChartExampleConfig}
                  layout="polar"
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

            <Code
              variant="block"
              language="tsx"
              code={radarDotsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-radar-lines"
          title="Lines"
          description={
            <>
              Outlines the shape with <Code>fillOpacity=&#123;0&#125;</Code> and
              a <Code>stroke</Code>. Use this when overlapping fills would hide
              the comparison.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={radarChartExampleConfig}
                  layout="polar"
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

            <Code
              variant="block"
              language="tsx"
              code={radarLinesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-radar-multiple"
          title="Multiple"
          description={
            <>
              Several series using more than one <Code>Radar</Code>. Use this
              when comparing two profiles on the same axes.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={radarChartExampleConfig}
                  layout="polar"
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

            <Code
              variant="block"
              language="tsx"
              code={radarMultipleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-radial" label="Radial">
        <PageSectionHeader
          title="Radial"
          description={
            <>
              Shows a total or progress in a ring using{" "}
              <Code>RadialBarChart</Code> and <Code>RadialBar</Code>. Use this
              for a compact score, not a detailed breakdown.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-radial-default"
          title="Default"
          description={
            <>
              A filled ring using <Code>RadialBar</Code> with{" "}
              <Code>background</Code>. Use this for a simple score or count.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Visitors by browser"
                  config={radialDefaultChartExampleConfig}
                  layout="polar"
                >
                  <RadialBarChart
                    data={radialDefaultChartExampleData}
                    innerRadius={30}
                    outerRadius={110}
                  >
                    <RadialBar
                      dataKey="visitors"
                      fill="var(--color-visitors)"
                      background
                    />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={radialSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-radial-text"
          title="With text"
          description={
            <>
              Places a total in the centre using <Code>Label</Code> inside{" "}
              <Code>PolarRadiusAxis</Code>. Use this when the number should sit
              in the hole.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Chrome visitors"
                  config={radialDefaultChartExampleConfig}
                  layout="polar"
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
                                    .reduce(
                                      (sum, item) => sum + item.visitors,
                                      0,
                                    )
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
                            );
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={radialTextSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-radial-stacked"
          title="Stacked"
          description={
            <>
              Stacks series with <Code>stackId</Code> on each{" "}
              <Code>RadialBar</Code>. Use this when the ring is a total made of
              parts.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Visitors by device"
                  config={radialStackedChartExampleConfig}
                  layout="polar"
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
                          const totalVisitors =
                            radialStackedChartExampleData.reduce(
                              (sum, item) => sum + item.desktop + item.mobile,
                              0,
                            );

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
                            );
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={radialStackedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-tooltip" label="Tooltip">
        <PageSectionHeader
          title="Tooltip"
          description={
            <>
              Shows exact values on hover and keyboard navigation using{" "}
              <Code>ChartTooltip</Code> and <Code>ChartTooltipContent</Code>.
              This example sets <Code>indicator=&quot;line&quot;</Code> and{" "}
              <Code>defaultIndex</Code>. Use this when people need the exact
              number without a table.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart data={singleBarChartExampleData}>
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

            <Code
              variant="block"
              language="tsx"
              code={tooltipSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-legend" label="Legend">
        <PageSectionHeader
          title="Legend"
          description={
            <>
              Names the series using <Code>ChartLegend</Code> and{" "}
              <Code>ChartLegendContent</Code>. Use this when colour alone is not
              enough to tell the series apart.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly users by device"
                  config={multipleBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={legendSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-axis" label="Axis">
        <PageSectionHeader
          title="Axis"
          description="Labels the categories and values. Use the axis people need to read the chart; hide the rest."
        />

        <PageSubsectionHeader
          id="chart-axis-x"
          title="X axis"
          description={
            <>
              Category labels using <Code>XAxis</Code>. Use this when the bottom
              of the chart names the groups or months.
            </>
          }
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={axisXSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-axis-y"
          title="Y axis"
          description={
            <>
              Value labels using <Code>YAxis</Code>. Use this when people need
              the scale on the left, not only on hover.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={axisYSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-grid" label="Grid">
        <PageSectionHeader
          title="Grid"
          description={
            <>
              Draws reference lines using <Code>CartesianGrid</Code>. Use the
              lines that help reading; turn off the ones that add noise.
            </>
          }
        />

        <PageSubsectionHeader
          id="chart-grid-x"
          title="X axis grid"
          description={
            <>
              Vertical lines using <Code>vertical</Code> with{" "}
              <Code>horizontal=&#123;false&#125;</Code>. Use this when the
              categories need a column to sit in.
            </>
          }
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={gridXSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-grid-y"
          title="Y axis grid"
          description={
            <>
              Horizontal lines using <Code>horizontal</Code> with{" "}
              <Code>vertical=&#123;false&#125;</Code>. Use this when people are
              reading values across the chart.
            </>
          }
        />
        <ComponentExample className="mb-10">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={gridYSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-grid-none"
          title="No grid"
          description={
            <>
              Turns both directions off with{" "}
              <Code>vertical=&#123;false&#125;</Code> and{" "}
              <Code>horizontal=&#123;false&#125;</Code>. Use this when the chart
              is already clear without reference lines.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop users"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Code
              variant="block"
              language="tsx"
              code={gridNoneSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="chart-layout" label="Layout">
        <PageSectionHeader
          title="Layout"
          description="Puts the chart in a card with a title or a headline number."
        />

        <PageSubsectionHeader
          id="chart-with-header"
          title="With header"
          description={
            <>
              Names the chart using <Code>CardHeader</Code> with{" "}
              <Code>tooltip</Code>. Use this when the title should stay visible
              and the extra copy sits in the help icon.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardHeader tooltip>
                <CardTitle>Desktop traffic</CardTitle>
                <CardDescription>
                  Monthly sessions by device type for the current year.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  title="Monthly desktop traffic"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={layoutHeaderSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-with-metric"
          title="With metric"
          description={
            <>
              A headline number using <Code>ChartMetric</Code> above{" "}
              <Code>ChartContainer</Code>. Use this when the total should be
              readable before the chart.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ChartMetric
                  value={singleBarChartExampleData.reduce(
                    (sum, d) => sum + d.desktop,
                    0,
                  )}
                  label="Total desktop views"
                />
                <ChartContainer
                  title="Monthly desktop traffic"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={layoutMetricSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="chart-with-header-and-metric"
          title="With header and metric"
          description={
            <>
              Combines <Code>CardHeader</Code>, <Code>ChartMetric</Code>, and{" "}
              <Code>ChartContainer</Code>. Use this when the block needs a name
              and a headline number.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
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
                    0,
                  )}
                  label="Total desktop views"
                />
                <ChartContainer
                  title="Monthly desktop traffic"
                  config={singleBarChartExampleConfig}
                >
                  <BarChart
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

            <Code
              variant="block"
              language="tsx"
              code={layoutHeaderMetricSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use ChartContainer and config for colour. Do not restyle the chart chrome."
        />
        <DocsDoDont
          doItems={[
            <>
              Wrap the Recharts chart in <Code>ChartContainer</Code>, give it a
              concise <Code>title</Code>, and provide labels in{" "}
              <Code>config</Code>.
            </>,
            <>
              Fill or stroke each series with <Code>var(--color-…)</Code> from
              its config key. ChartContainer assigns the approved colour.
            </>,
            <>
              Add <Code>ChartTooltip</Code> and <Code>ChartTooltipContent</Code>{" "}
              so values can be read on hover.
            </>,
            <>
              Use <Code>ChartMetric</Code> when a total should be readable
              before the chart.
            </>,
            <>
              Pick the shape that matches the question: bars to compare, lines
              for change over time, pies for parts of a whole.
            </>,
          ]}
          dontItems={[
            <>
              Don’t hard-code or select series colours. Their config order
              assigns the approved palette automatically.
            </>,
            <>
              Don’t use a chart for a single number, or when every figure must
              be read. Use a{" "}
              <DocsPageLink to="/components/table">Table</DocsPageLink>.
            </>,
            <>
              Don’t render Recharts without <Code>ChartContainer</Code>.
            </>,
            <>Don’t disable Recharts’ accessibility layer.</>,
            <>
              Don’t add another chart family or visual treatment without
              explicit approval.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Chart."
        />
        <DocsApiTable
          rows={[
            {
              name: "config",
              type: "ChartConfig",
              description:
                "On ChartContainer. Labels and optional icons for each series. Approved colours are assigned automatically in config order and exposed as var(--color-key).",
            },
            {
              name: "title",
              type: "string",
              description:
                "On ChartContainer. Required concise accessible name passed to the Recharts chart.",
            },
            {
              name: "layout",
              type: '"cartesian" | "polar"',
              defaultValue: '"cartesian"',
              description:
                "On ChartContainer. Polar owns the approved square size for pie, radar, and radial charts.",
            },
            {
              name: "value",
              type: "React.ReactNode",
              description:
                "On ChartMetric. Headline number. Numbers are formatted with toLocaleString().",
            },
            {
              name: "label",
              type: "React.ReactNode",
              description: "On ChartMetric. Short line beside the number.",
            },
            {
              name: "indicator",
              type: '"dot" | "line" | "dashed"',
              defaultValue: '"dot"',
              description:
                "On ChartTooltipContent. Marker style in the tooltip.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://recharts.github.io/en-US/api/">
                Recharts API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/chart">
                Shadcn Chart documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different control when the Chart is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/table">Table</DocsPageLink> — when
            people need to read every figure, not the shape of the data.
          </li>
          <li>
            <DocsPageLink to="/components/card">Card</DocsPageLink> — when the
            chart needs a title, description, or metric around it.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
