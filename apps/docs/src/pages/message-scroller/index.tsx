import { ComponentExample } from "@/components/layout/component-example"
import { DocsApiTable } from "@/components/layout/docs-api-table"
import { DocsDoDont } from "@/components/layout/docs-do-dont"
import { DocsExternalLink } from "@/components/layout/docs-external-link"
import { DocsPageLink } from "@/components/layout/docs-page-link"
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
          description={
            <>
              Use Message scroller when a conversation needs transcript-aware
              scrolling: anchored turns, live-edge following, and returning to
              the latest reply.
              <br />
              <br />
              Avoid using it for a single message row or a static short list.
              Pair it with{" "}
              <DocsPageLink to="/components/message">Message</DocsPageLink> for
              each row. MessageScroller fills its parent, so place it inside a
              height-constrained container.
            </>
          }
        />
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
          description="Wrap the transcript in MessageScrollerProvider, then render each row inside MessageScrollerItem."
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
          description={
            <>
              Turn on <Code>autoScroll</Code> to follow the live edge while the
              reader is already at the bottom. Use this when replies stream in.
            </>
          }
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
          description={
            <>
              Mark the row that should anchor a new turn with{" "}
              <Code>scrollAnchor</Code>. In Gecko, that is the first message
              after a sender streak changes.
            </>
          }
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
          description={
            <>
              <Code>scrollPreviousItemPeek</Code> keeps a slice of the previous
              item visible above the anchor so the new turn stays connected to
              its context.
            </>
          }
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
          description={
            <>
              <Code>autoScroll</Code> keeps streamed replies in view while the
              reader is at the bottom. Scrolling away releases the view until
              they return with <Code>MessageScrollerButton</Code>.
            </>
          }
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
          description={
            <>
              Compose <Code>MessageScrollerItem</Code> with motion presets
              directly. User messages animate on send; assistant replies stream
              in below without an entrance animation.
            </>
          }
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
          description={
            <>
              <Code>useMessageScrollerScrollable</Code> reports which edges the
              viewport can still scroll toward. Prefer{" "}
              <Code>data-scrollable</Code> on the viewport when styling the
              scroller itself.
            </>
          }
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

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep conversation turns anchored without taking control away from the reader."
        />
        <DocsDoDont
          doItems={[
            <>Place MessageScroller inside a height-constrained container.</>,
            <>
              Set <Code>scrollAnchor</Code> on the row that starts a new turn.
            </>,
            <>
              Use <Code>autoScroll</Code> to follow streamed replies while the
              reader is at the live edge.
            </>,
            <>
              Include <Code>MessageScrollerButton</Code> so the reader can
              return to the latest message.
            </>,
            <>
              Use <Code>scrollPreviousItemPeek</Code> to keep part of the
              previous turn visible.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use MessageScroller for a single message or short static
              list.
            </>,
            <>Don’t mark every message as a scroll anchor.</>,
            <>
              Don’t force the viewport back to the bottom after the reader
              scrolls away.
            </>,
            <>
              Don’t omit a stable <Code>messageId</Code> from each item.
            </>,
            <>
              Don’t add a second nested vertical scroller around the viewport.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Message scroller."
        />
        <DocsApiTable
          rows={[
            {
              name: "MessageScrollerProvider.autoScroll",
              type: "boolean",
              defaultValue: "false",
              description:
                "Follows new and streaming content while the viewport is at the live edge.",
            },
            {
              name: "MessageScrollerProvider.defaultScrollPosition",
              type: '"start" | "end" | "last-anchor"',
              defaultValue: '"end"',
              description:
                "Sets the opening position when the first non-empty transcript renders.",
            },
            {
              name: "MessageScrollerProvider.scrollEdgeThreshold",
              type: "number",
              defaultValue: "8",
              description:
                "Sets the distance from an edge that still counts as the start or end.",
            },
            {
              name: "MessageScrollerProvider.scrollMargin",
              type: "number",
              defaultValue: "0",
              description:
                "Adds space at the aligned edge for programmatic scroll targets.",
            },
            {
              name: "MessageScrollerProvider.scrollPreviousItemPeek",
              type: "number",
              defaultValue: "64",
              description:
                "Keeps this many pixels of the previous item visible above an anchored turn.",
            },
            {
              name: "MessageScrollerViewport.preserveScrollOnPrepend",
              type: "boolean",
              defaultValue: "true",
              description:
                "Keeps the first visible item stable when earlier transcript rows are prepended.",
            },
            {
              name: "MessageScrollerItem.messageId",
              type: "string",
              description: "Stable identifier used to track a message row.",
            },
            {
              name: "MessageScrollerItem.scrollAnchor",
              type: "boolean",
              defaultValue: "false",
              description:
                "Marks the item that should anchor the current conversation turn.",
            },
            {
              name: "MessageScrollerButton.direction",
              type: '"start" | "end"',
              defaultValue: '"end"',
              description:
                "Chooses which transcript edge the button scrolls to.",
            },
            {
              name: "MessageScrollerButton.behavior",
              type: "ScrollBehavior",
              defaultValue: '"smooth"',
              description:
                "Sets the browser scroll behaviour used by the control.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/message-scroller">
                Shadcn Message scroller documentation
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/react/message-scroller">
                @shadcn/react Message scroller API
              </DocsExternalLink>{" "}
              for the complete behaviour, data attributes and hooks.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Choose between transcript-aware and general scrolling."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — for
            each conversation row inside the scroller.
          </li>
          <li>
            <DocsPageLink to="/components/scroll-area">
              Scroll area
            </DocsPageLink>{" "}
            — for general scrollable content without transcript anchoring.
          </li>
        </ul>
      </PageSection>
    </div>
  )
}
