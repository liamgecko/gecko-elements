import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Code } from "@gecko/ui/components/code"

export function MessagePage() {
  const importSnippet = `import { Bubble, BubbleContent } from "@gecko/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@gecko/ui/components/message"`

  const compositionSnippet = `Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter`

  const groupCompositionSnippet = `MessageGroup
├── Message
└── Message`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Message"
          description={
            <>
              Lays out a single message in a conversation — avatar, alignment,
              header, and footer around the message surface. Render the visible
              surface inside it with <Code>Bubble</Code>.
            </>
          }
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Message owns the row layout — avatar, alignment, header, and
              footer. Render the visible message surface inside it with{" "}
              <Code>Bubble</Code>.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Message primitives alongside Bubble to compose a conversation row."
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

      <PageSection id="composition" label="Composition">
        <PageSectionHeader
          title="Composition"
          description="Use the following composition to build a message:"
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
          title="Group"
          description={
            <>
              Use <Code>MessageGroup</Code> to stack consecutive messages from
              the same sender:
            </>
          }
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={groupCompositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>
    </div>
  )
}
