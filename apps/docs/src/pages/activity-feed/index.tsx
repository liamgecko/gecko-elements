import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import {
  ActivityFeed,
  ActivityFeedContent,
  ActivityFeedIcon,
  ActivityFeedItem,
  ActivityFeedLabel,
  ActivityFeedMeta,
} from "@gecko/ui/components/activity-feed"
import { Code } from "@gecko/ui/components/code"

const sampleItems = [
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
] as const

export function ActivityFeedPage() {
  const importSnippet = `import {
  ActivityFeed,
  ActivityFeedItem,
  ActivityFeedIcon,
  ActivityFeedContent,
  ActivityFeedLabel,
  ActivityFeedMeta,
} from "@gecko/ui/components/activity-feed"`

  const compositionSnippet = `ActivityFeed
└─ ActivityFeedItem
   ├─ ActivityFeedIcon
   └─ ActivityFeedContent
      ├─ ActivityFeedLabel
      └─ ActivityFeedMeta`

  const basicExampleSnippet = `<ActivityFeed>
  <ActivityFeedItem key={item.id} data-activity-type={item.type}>
    <ActivityFeedIcon type={item.type} />
    <ActivityFeedContent>
      <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
      <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
    </ActivityFeedContent>
  </ActivityFeedItem>
</ActivityFeed>`

  const condensedExampleSnippet = `<ActivityFeed variant="condensed">
  <ActivityFeedItem key={item.id} data-activity-type={item.type}>
    <ActivityFeedIcon type={item.type} />
    <ActivityFeedContent>
      <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
      <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
    </ActivityFeedContent>
  </ActivityFeedItem>
</ActivityFeed>`

  const paginationExampleSnippet = `<ActivityFeed pagination={{ perPage: 5 }}>
  <ActivityFeedItem key={item.id} data-activity-type={item.type}>
    <ActivityFeedIcon type={item.type} />
    <ActivityFeedContent>
      <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
      <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
    </ActivityFeedContent>
  </ActivityFeedItem>
</ActivityFeed>`

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <PageOverviewHeader
            title="Activity feed"
            description={
              <>
                The Activity Feed component displays a chronological timeline of events related to a contact or entity. Each item represents a discrete action such as a form submission, conversation, event attendance, marketing interaction, call activity, or system-generated update. Content is structured with an icon, a primary label, and supporting metadata such as timestamps or attribution, allowing users to quickly understand what happened and when.
              </>
            }
          />
        </PageSection>

        <PageSection id="usage" label="Usage">
          <PageSectionHeader
            title="Usage"
            description={
              <>
                Use the Activity Feed when you need to present a history of actions in a clear, ordered format. It is best suited to contact profiles, audit trails, and any interface where understanding the sequence of events is important. Labels should be concise and action-oriented, with metadata used to provide additional context such as time, source, or actor.
              </>
            }
          />

          <PageSubsectionHeader
            id="usage-import"
            title="Import"
            description="Import the Activity Feed and its subcomponents to compose the feed structure. The component follows a compound pattern, where each part is responsible for a specific piece of the UI."
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

          <PageSubsectionHeader
            id="usage-composition"
            title="Composition"
            description={
              <>
                The Activity Feed is composed of structured subcomponents rather than a single data-driven API. Each item is built using <Code>ActivityFeedItem</Code>, with <Code>ActivityFeedIcon</Code> for the visual indicator and <Code>ActivityFeedContent</Code> for the text content. Within the content, <Code>ActivityFeedLabel</Code> represents the primary message and <Code>ActivityFeedMeta</Code> provides supporting context such as time or attribution.
              </>
            }
          />
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <PageSectionHeader
            title="Basic example"
            description="Demonstrates the default Activity Feed layout using standard spacing and full visual hierarchy. Each item maps an activity type to an icon and displays a label with supporting metadata. Use this as the baseline implementation for primary views where the feed is a key part of the interface."
          />
          <ComponentExample>
            <div className="space-y-6">
              <ActivityFeed>
                {sampleItems.map((item) => (
                  <ActivityFeedItem key={item.id} data-activity-type={item.type}>
                    <ActivityFeedIcon type={item.type} />
                    <ActivityFeedContent>
                      <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
                      <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
                    </ActivityFeedContent>
                  </ActivityFeedItem>
                ))}
              </ActivityFeed>
              <Code
                variant="block"
                language="tsx"
                code={basicExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="condensed" label="Condensed">
          <PageSectionHeader
            title="Condensed"
            description={
              <>
                Shows the Activity Feed in its condensed variant, reducing spacing and icon size while preserving structure and readability. Use this when the feed is secondary or space is limited, such as within side panels or embedded contexts.
              </>
            }
          />
          <ComponentExample>
            <div className="space-y-6">
              <ActivityFeed variant="condensed">
                {sampleItems.map((item) => (
                  <ActivityFeedItem key={item.id} data-activity-type={item.type}>
                    <ActivityFeedIcon type={item.type} />
                    <ActivityFeedContent>
                      <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
                      <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
                    </ActivityFeedContent>
                  </ActivityFeedItem>
                ))}
              </ActivityFeed>
              <Code
                variant="block"
                language="tsx"
                code={condensedExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="pagination" label="Pagination">
          <PageSectionHeader
            title="Pagination"
            description={
              <>
                Demonstrates how to paginate the Activity Feed when working with longer activity histories. Pagination limits the number of visible items and introduces navigation controls, helping maintain performance and preventing the feed from becoming overwhelming in data-heavy scenarios.
              </>
            }
          />
          <ComponentExample>
            <div className="min-w-0 w-full space-y-6">
              <div className="w-80 border border-border rounded-md p-6">
                <ActivityFeed pagination={{ perPage: 5 }}>
                  {sampleItems.map((item) => (
                    <ActivityFeedItem key={item.id} data-activity-type={item.type}>
                      <ActivityFeedIcon type={item.type} />
                      <ActivityFeedContent>
                        <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
                        <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
                      </ActivityFeedContent>
                    </ActivityFeedItem>
                  ))}
                </ActivityFeed>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={paginationExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
