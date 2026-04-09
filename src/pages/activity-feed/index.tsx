"use client"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  ActivityFeed,
  type ActivityFeedEntry,
} from "@/components/ui/activity-feed"
import { Code } from "@/components/ui/code"

const sampleItems: ActivityFeedEntry[] = [
  {
    id: "1",
    type: "conversation-started",
    label: (
      <>
        <a href="#/">Conversation</a> started
      </>
    ),
    meta: "26th Mar 2026 at 16:10",
  },
  {
    id: "2",
    type: "conversation-closed",
    label: (
      <>
        <a href="#/">Conversation</a> closed
      </>
    ),
    meta: "26th Mar 2026 at 15:02",
  },
  {
    id: "3",
    type: "form-submission",
    label: "Form submission received",
    meta: "26th Mar 2026 at 14:30",
  },
  {
    id: "4",
    type: "email-sent",
    label: "Email sent to applicant",
    meta: "26th Mar 2026 at 12:00",
  },
  {
    id: "5",
    type: "sms-sent",
    label: "SMS sent with reminder",
    meta: "26th Mar 2026 at 11:53",
  },
  {
    id: "6",
    type: "added-to-campaign",
    label: "Added to nurture campaign",
    meta: "25th Mar 2026 at 09:15",
  },
  {
    id: "7",
    type: "call-made",
    label: "Outbound call completed",
    meta: "24th Mar 2026 at 17:45",
  },
  {
    id: "8",
    type: "added-to-event",
    label: "Registered for open day",
    meta: "24th Mar 2026 at 10:00",
  },
  {
    id: "9",
    type: "system-alert",
    label: "System alert: integration sync delayed",
    meta: "23rd Mar 2026 at 08:00 by System",
  },
]

export function ActivityFeedPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Activity feed</h1>
          <p className="text-sm text-muted-foreground">
            A vertical timeline of activities with an icon, primary label, and
            secondary metadata. Links inside the label use medium weight and
            underline on hover.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Each row maps an activity type to an icon. The dashed rail aligns
            with the icon circles.
          </p>
          <ComponentExample>
            <div className="min-w-0 w-full">
              <ActivityFeed items={sampleItems} />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="condensed" label="Condensed">
          <h2 className="text-lg font-semibold">Condensed</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Use <Code>variant=&quot;condensed&quot;</Code> for tighter spacing, smaller
            circles and icons.
          </p>
          <ComponentExample>
            <div className="min-w-0 w-full">
              <ActivityFeed items={sampleItems} variant="condensed" />
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
