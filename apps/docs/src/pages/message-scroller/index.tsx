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
import { Message, MessageContent } from "@gecko/ui/components/message"
import { Bubble, BubbleContent } from "@gecko/ui/components/bubble"`

  const compositionSnippet = `MessageScrollerProvider
└── MessageScroller
    ├── MessageScrollerViewport
    │   └── MessageScrollerContent
    │       └── MessageScrollerItem
    │           └── Message → Bubble
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
            <Message
              variant={message.role === "user" ? "user" : "ai"}
              align={message.role === "user" ? "end" : "start"}
            >
              <MessageContent>
                <Bubble>
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

  const anchorSnippet = `<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message
              variant={message.role === "user" ? "user" : "ai"}
              align={message.role === "user" ? "end" : "start"}
            >
              <MessageContent>
                <Bubble>
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

  const peekSnippet = `<MessageScrollerProvider scrollPreviousItemPeek={64}>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message
              variant={message.role === "user" ? "user" : "ai"}
              align={message.role === "user" ? "end" : "start"}
            >
              <MessageContent>
                <Bubble>
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

  const autoScrollSnippet = `<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message
              variant={message.role === "user" ? "user" : "ai"}
              align={message.role === "user" ? "end" : "start"}
            >
              <MessageContent>
                <Bubble>
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

  const animationSnippet = `import { motion } from "motion/react"
import { MESSAGE_ANIMATIONS } from "@gecko/ui/lib/message-animations"

const MotionItem = motion.create(MessageScrollerItem)

<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => {
          const isUser = message.role === "user"

          return (
            <MotionItem
              key={message.id}
              messageId={message.id}
              scrollAnchor={isUser}
              variants={MESSAGE_ANIMATIONS.pop.variants}
              initial={isUser ? "initial" : false}
              animate="animate"
            >
              <Message
                variant={isUser ? "user" : "ai"}
                align={isUser ? "end" : "start"}
              >
                <MessageContent>
                  <Bubble>
                    <BubbleContent>{message.text}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MotionItem>
          )
        })}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

  const scrollStateSnippet = `import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@gecko/ui/components/message-scroller"

function ScrollEdges() {
  const { start, end } = useMessageScrollerScrollable()

  return (
    <p>
      Can scroll up: {String(start)} · Can scroll down: {String(end)}
    </p>
  )
}

<MessageScrollerProvider>
  <ScrollEdges />
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message
              variant={message.role === "user" ? "user" : "ai"}
              align={message.role === "user" ? "end" : "start"}
            >
              <MessageContent>
                <Bubble>
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
  </MessageScroller>
</MessageScrollerProvider>`

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
          description="Import the scroller primitives alongside Message and Bubble."
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
        <ComponentExample>
          <div className="space-y-6">
            <MessageScrollerAnchoringDemo />
            <Code
              variant="block"
              language="tsx"
              code={anchorSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="context" label="Keeping context visible">
        <PageSectionHeader
          title="Keeping context visible"
          description="scrollPreviousItemPeek keeps a slice of the previous item visible above the anchor so the new turn stays connected to its context."
        />
        <ComponentExample>
          <div className="space-y-6">
            <MessageScrollerContextDemo />
            <Code
              variant="block"
              language="tsx"
              code={peekSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="auto-scroll" label="Following the live edge">
        <PageSectionHeader
          title="Following the live edge"
          description="autoScroll keeps streamed replies in view while the reader is at the bottom. Scrolling away releases the view until they return with MessageScrollerButton."
        />
        <ComponentExample>
          <div className="space-y-6">
            <MessageScrollerStreamingDemo />
            <Code
              variant="block"
              language="tsx"
              code={autoScrollSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="animation" label="Animating new messages">
        <PageSectionHeader
          title="Animating new messages"
          description="Compose MessageScrollerItem with motion presets directly. User messages animate on send; assistant replies stream in below without an entrance animation."
        />
        <ComponentExample>
          <div className="space-y-6">
            <MessageScrollerAnimationDemo />
            <Code
              variant="block"
              language="tsx"
              code={animationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="scroll-state" label="Reading scroll state">
        <PageSectionHeader
          title="Reading scroll state"
          description="useMessageScrollerScrollable reports which edges the viewport can still scroll toward. Prefer data-scrollable on the viewport when styling the scroller itself."
        />
        <ComponentExample>
          <div className="space-y-6">
            <MessageScrollerScrollStateDemo />
            <Code
              variant="block"
              language="tsx"
              code={scrollStateSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
