import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { MessageScrollerAnchoringDemo } from "@/pages/message-scroller/demos/anchoring-demo"
import { MessageScrollerAnimationDemo } from "@/pages/message-scroller/demos/animation-demo"
import { MessageScrollerContextDemo } from "@/pages/message-scroller/demos/context-demo"
import { MessageScrollerScrollStateDemo } from "@/pages/message-scroller/demos/scroll-state-demo"
import { MessageScrollerStreamingDemo } from "@/pages/message-scroller/demos/streaming-demo"
import { Code } from "@gecko/ui/components/code"

export function MessageScrollerPage() {
  const installSnippet = `npm install @shadcn/react motion ai @ai-sdk/react`

  const importSnippet = `import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@gecko/ui/components/message-scroller"
import { MessageAnimated } from "@gecko/ui/components/message-animated"`

  const compositionSnippet = `MessageScrollerProvider
└── MessageScroller
    ├── MessageScrollerViewport
    │   └── MessageScrollerContent
    │       └── MessageScrollerItem
    └── MessageScrollerButton`

  const basicUsageSnippet = `<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message>...</Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

  const anchorSnippet = `<MessageScrollerItem
  messageId={message.id}
  scrollAnchor={message.role === "user"}
/>`

  const peekSnippet = `<MessageScrollerProvider scrollPreviousItemPeek={64}>
  <MessageScroller>...</MessageScroller>
</MessageScrollerProvider>`

  const autoScrollSnippet = `<MessageScrollerProvider autoScroll>
  <MessageScroller>...</MessageScroller>
</MessageScrollerProvider>`

  const animationSnippet = `import { MessageAnimated } from "@gecko/ui/components/message-animated"

<MessageAnimated
  message={message}
  scrollAnchor={message.role === "user"}
/>`

  const scrollStateSnippet = `import { useMessageScrollerScrollable } from "@gecko/ui/components/message-scroller"

const { start, end } = useMessageScrollerScrollable()`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Message scroller"
          description="A chat transcript scroller for anchored turns, streamed replies, and live-edge following. Wrap your message list in MessageScrollerProvider and compose rows with MessageScrollerItem."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description="MessageScroller fills its parent, so place it inside a height-constrained container."
        />
        <PageSubsectionHeader
          id="usage-installation"
          title="Installation"
          description="Install the scroll behavior package, motion library, and AI SDK packages used by the scripted demos. Copy createChat from apps/docs/src/lib/ai.ts for scripted chat transport."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="bash"
            code={installSnippet}
            showCopyButton
            copyLabel="Copy install command"
          />
        </ComponentExample>
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the scroller primitives and optional MessageAnimated helper."
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
          description="Use the following composition to build a scrollable transcript."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
        <PageSubsectionHeader
          id="usage-basic"
          title="Basic example"
          description="Turn on autoScroll to follow the live edge while the reader is already at the bottom."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={basicUsageSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="anchoring" label="Anchoring turns">
        <PageSectionHeader
          title="Anchoring turns"
          description="Mark the row that should anchor a new turn with scrollAnchor. In AI chat, that is usually the user's message."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={anchorSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
        <ComponentExample>
          <MessageScrollerAnchoringDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="context" label="Keeping context visible">
        <PageSectionHeader
          title="Keeping context visible"
          description="scrollPreviousItemPeek keeps a slice of the previous item visible above the anchor so the new turn stays connected to its context."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={peekSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
        <ComponentExample>
          <MessageScrollerContextDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="auto-scroll" label="Following the live edge">
        <PageSectionHeader
          title="Following the live edge"
          description="autoScroll keeps streamed replies in view while the reader is at the bottom. Scrolling away releases the view until they return with MessageScrollerButton."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={autoScrollSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
        <ComponentExample>
          <MessageScrollerStreamingDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="animation" label="Animating new messages">
        <PageSectionHeader
          title="Animating new messages"
          description="MessageAnimated wraps MessageScrollerItem with motion presets. User messages animate on send; assistant replies stream in below without an entrance animation."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={animationSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
        <ComponentExample>
          <MessageScrollerAnimationDemo />
        </ComponentExample>
      </PageSection>

      <PageSection id="scroll-state" label="Reading scroll state">
        <PageSectionHeader
          title="Reading scroll state"
          description="useMessageScrollerScrollable reports which edges the viewport can still scroll toward. Prefer data-scrollable on the viewport when styling the scroller itself."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={scrollStateSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
        <ComponentExample>
          <MessageScrollerScrollStateDemo />
        </ComponentExample>
      </PageSection>
    </div>
  )
}
