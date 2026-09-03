import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@gecko/ui/components/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

export const AGENT_TRENDS_REPLY_PLAIN =
  "Sure, I can show you registration trends over the last 7 days."

export const AGENT_TRENDS_REPLY_COPY = `${AGENT_TRENDS_REPLY_PLAIN}

As you can see, Thursday is your most popular day for registrations, with 22 registrations. Let me know if you want to drill down further.`

const registrationTrendsChartConfig = {
  registrations: {
    label: "Registrations",
    color: "var(--chart-1)",
  },
  cancellations: {
    label: "Cancellations",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const registrationTrendsChartData = [
  { day: "Mon", registrations: 12, cancellations: 1 },
  { day: "Tue", registrations: 18, cancellations: 2 },
  { day: "Wed", registrations: 15, cancellations: 1 },
  { day: "Thu", registrations: 22, cancellations: 2 },
  { day: "Fri", registrations: 19, cancellations: 1 },
  { day: "Sat", registrations: 9, cancellations: 0 },
  { day: "Sun", registrations: 14, cancellations: 1 },
]

const dayLabels: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
}

function getMostPopularDay() {
  const peak = registrationTrendsChartData.reduce((best, current) =>
    current.registrations > best.registrations ? current : best
  )
  return {
    label: dayLabels[peak.day] ?? peak.day,
    count: peak.registrations,
  }
}

export function AssistantRegistrationTrendsReply() {
  const { label: mostPopularDay, count: mostPopularCount } = getMostPopularDay()

  return (
    <div className="w-full min-w-0 max-w-full">
      <p className="mb-0">{AGENT_TRENDS_REPLY_PLAIN}</p>
      <ChartContainer
        title="Registrations and cancellations over the last 7 days"
        config={registrationTrendsChartConfig}
        className="my-6 aspect-auto h-[220px] w-full min-w-0 max-w-none"
      >
        <LineChart
          accessibilityLayer
          data={registrationTrendsChartData}
          margin={{ left: 4, right: 12, top: 8, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} width={32} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="registrations"
            type="natural"
            stroke="var(--color-registrations)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="cancellations"
            type="natural"
            stroke="var(--color-cancellations)"
            strokeWidth={2}
            dot={false}
          />
          <ChartLegend
            content={
              <ChartLegendContent
                payload={[
                  {
                    value: "registrations",
                    dataKey: "registrations",
                    type: "line",
                    color: "var(--color-registrations)",
                  },
                  {
                    value: "cancellations",
                    dataKey: "cancellations",
                    type: "line",
                    color: "var(--color-cancellations)",
                  },
                ]}
              />
            }
          />
        </LineChart>
      </ChartContainer>
      <p className="mb-0">
        As you can see, {mostPopularDay} is your most popular day for
        registrations, with {mostPopularCount} registrations. Let me know if you
        want to drill down further.
      </p>
    </div>
  )
}
