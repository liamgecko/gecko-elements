import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { ChatHead, ChatHeadItem } from "@/components/ui/chat-head"
import { Code } from "@/components/ui/code"

const defaultAvatar = {
  src: "",
  alt: "",
  fallback: "ML",
}

const timestampRecent = new Date("2026-03-24T09:30:00")
const timestampUnread = new Date("2026-03-24T11:15:00")
const timestampClosed = new Date("2026-03-22T14:00:00")
const timestampActive = new Date("2026-03-24T10:45:00")

export function ChatHeadPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Chat head</h1>
          <p className="text-sm text-muted-foreground">
            A conversation-list component for rendering chat heads with avatar,
            latest message preview, relative timestamp, and hover actions.
          </p>
        </PageSection>

        <PageSection id="default" label="Default">
          <h2 className="text-lg font-semibold">Default</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>ChatHead</Code> as a wrapper and render one or more{" "}
            <Code>ChatHeadItem</Code> rows. Set <Code>isOnline</Code> and{" "}
            <Code>isActive</Code> on the item to reflect state.
          </p>
          <ComponentExample>
            <ChatHead>
              <ChatHeadItem
                name="Matt Lanham"
                messageSnippet="Could you provide information about financial aid and tuition costs?"
                timestamp={timestampRecent}
                avatar={defaultAvatar}
                isOnline
              />
            </ChatHead>
          </ComponentExample>
        </PageSection>

        <PageSection id="closed" label="Closed">
          <h2 className="text-lg font-semibold">Closed</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>closed</Code> on <Code>ChatHead</Code> to apply closed
            behavior for its child items.
          </p>
          <ComponentExample>
            <ChatHead closed>
              <ChatHeadItem
                name="Marcus Thompson"
                messageSnippet="Thank you for your support yesterday."
                timestamp={timestampClosed}
                avatar={defaultAvatar}
                isOnline={false}
              />
            </ChatHead>
          </ComponentExample>
        </PageSection>

        <PageSection id="unread-notification" label="Unread notification">
          <h2 className="text-lg font-semibold">Unread notification</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>isUnread</Code> on <Code>ChatHeadItem</Code> to show an
            unread notification marker on the avatar.
          </p>
          <ComponentExample>
            <ChatHead>
              <ChatHeadItem
                name="Aisha Patel"
                messageSnippet="I&apos;m really excited about the scholarship opportunities."
                timestamp={timestampUnread}
                avatar={defaultAvatar}
                isUnread
              />
            </ChatHead>
          </ComponentExample>
        </PageSection>

        <PageSection id="active-state" label="Active state">
          <h2 className="text-lg font-semibold">Active state</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>isActive</Code> on <Code>ChatHeadItem</Code> to indicate
            the selected conversation with an active background.
          </p>
          <ComponentExample>
            <ChatHead>
              <ChatHeadItem
                name="Matt Lanham"
                messageSnippet="I&apos;m considering applying to Gecko University."
                timestamp={timestampActive}
                avatar={defaultAvatar}
                isOnline
                isActive
              />
            </ChatHead>
          </ComponentExample>
        </PageSection>
    </div>
  )
}

