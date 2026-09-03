import { useState } from "react";

import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import {
  ActivityFeed,
  type ActivityFeedEntry,
} from "@gecko/ui/components/activity-feed";
import { Code } from "@gecko/ui/components/code";

const PAGE_SIZE = 5;

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
] satisfies readonly ActivityFeedEntry[];

export function ActivityFeedPage() {
  const [page, setPage] = useState(1);
  const pageItems = sampleItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const importSnippet = `import { ActivityFeed } from "@gecko/ui/components/activity-feed"`;

  const basicExampleSnippet = `<ActivityFeed items={activities} />`;

  const condensedExampleSnippet = `<ActivityFeed
  items={activities}
  variant="condensed"
/>`;

  const paginationExampleSnippet = `<ActivityFeed
  items={activities}
  pagination={{
    page,
    pageSize: 20,
    totalItems,
    onPageChange: setPage,
  }}
/>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Activity feed"
          description="Activity feed displays a chronological history of actions. Each entry has a decorative activity icon, a label that describes what happened, and supporting metadata such as a timestamp or attribution."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Activity feed for a history of actions on a contact view or in
              the Inbox contact-details sidebar. Supply entries newest first and
              use the default variant unless condensed is explicitly required.
              The parent surface supplies loading, empty, and error states.
              <br />
              <br />
              Avoid using Activity feed for a conversation transcript — use{" "}
              <DocsPageLink to="/components/message">
                Message
              </DocsPageLink> and{" "}
              <DocsPageLink to="/components/message-scroller">
                Message scroller
              </DocsPageLink>{" "}
              instead.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Activity feed and pass it the current activity entries."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description="Pass activities in newest-first order. Activity feed maps each approved activity type to its icon and renders the label and metadata consistently."
        />
        <ComponentExample>
          <div className="space-y-6">
            <ActivityFeed items={sampleItems} />
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
              Set <Code>variant=&quot;condensed&quot;</Code> only when the
              denser treatment is explicitly required. Otherwise use the default
              variant, including in constrained layouts.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <ActivityFeed items={sampleItems} variant="condensed" />
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
              Activity feed renders its own accessible pagination controls. The
              parent fetches and supplies only the current page of entries, plus
              the current page, page size, total item count, and page-change
              callback. Pages are one-based: the first page is <Code>1</Code>.
            </>
          }
        />
        <ComponentExample>
          <div className="w-full min-w-0 space-y-6">
            <div className="w-80 rounded-md border border-border p-6">
              <ActivityFeed
                items={pageItems}
                pagination={{
                  page,
                  pageSize: PAGE_SIZE,
                  totalItems: sampleItems.length,
                  onPageChange: setPage,
                }}
              />
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

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Supply approved activity data and let Activity feed own its rows and pagination interface. Do not extend or restyle the module without consent."
        />
        <DocsDoDont
          doItems={[
            <>
              Supply entries through <Code>items</Code>, ordered newest first.
            </>,
            <>
              Make the <Code>label</Code> describe the activity without relying
              on its decorative icon.
            </>,
            <>
              Link only the relevant object within the label, such as a
              conversation or event name.
            </>,
            <>
              Put the timestamp and relevant attribution in <Code>meta</Code>.
            </>,
            <>
              For long histories, fetch one page at a time and pass controlled{" "}
              <Code>pagination</Code> data.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Activity feed for a conversation transcript. Use{" "}
              <DocsPageLink to="/components/message">Message</DocsPageLink>.
            </>,
            <>Don’t make the entire activity row interactive.</>,
            <>
              Don’t override the timeline, icons, spacing, or typography with{" "}
              <Code>className</Code>.
            </>,
            <>
              Don’t add an activity type, icon, variant, or behaviour prop
              without explicit consent.
            </>,
            <>
              Don’t pass the full history when using server-backed pagination;
              supply only the requested page.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Activity feed."
        />
        <DocsApiTable
          rows={[
            {
              name: "items",
              type: "readonly ActivityFeedEntry[]",
              description:
                "The current entries to render, ordered newest first. Each entry contains id, type, label, and meta.",
            },
            {
              name: "variant",
              type: '"default" | "condensed"',
              defaultValue: '"default"',
              description:
                "Density. Use default unless condensed is explicitly requested.",
            },
            {
              name: "pagination",
              type: "{ page: number; pageSize: number; totalItems: number; onPageChange: (page: number) => void }",
              description:
                "Controlled, one-based pagination. Activity feed renders the controls; the parent supplies the requested page of items.",
            },
            {
              name: "ActivityFeedEntry.type",
              type: '"conversation-started" | "conversation-closed" | "form-submission" | "email-sent" | "sms-sent" | "added-to-campaign" | "call-made" | "added-to-event" | "system-alert"',
              description:
                "The approved closed set of activity types. Determines the decorative icon.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use another module when the content is not a chronological history of actions."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — when
            the list is a conversation transcript.
          </li>
          <li>
            <DocsPageLink to="/components/pagination">Pagination</DocsPageLink>{" "}
            — for paginating other kinds of content. Activity feed already owns
            its pagination controls.
          </li>
          <li>
            <DocsPageLink to="/components/empty">Empty</DocsPageLink>,{" "}
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink>, and{" "}
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> — compose
            these at the parent surface for empty, loading, and error states.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
