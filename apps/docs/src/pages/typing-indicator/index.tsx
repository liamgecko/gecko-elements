import { useState } from "react";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import { TypingIndicator } from "@gecko/ui/components/typing-indicator";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { HeaderSection, MainSection } from "@/components/layout/docs-section";

const placeholderAvatar = "https://picsum.photos/seed/avatar/200";

export function TypingIndicatorPage() {
  const [isTyping, setIsTyping] = useState(true);

  const importSnippet = `import { TypingIndicator } from "@gecko/ui/components/typing-indicator"`;

  const defaultSnippet = `<TypingIndicator />`;

  const namedSnippet = `<TypingIndicator variant="text" name="Liam" />`;

  const avatarSnippet = `<TypingIndicator
  variant="dots|text"
  name="Liam"
  avatar={avatarUrl}
/>`;

  const presenceSnippet = `<TypingIndicator
  active={isTyping}
  variant="text"
  name="Liam"
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Typing indicator"
        description="The Typing indicator communicates that someone is currently composing a message."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Typing indicator for remote, real-time typing activity in the
            inbox or chat widget. Keep it separate from the transcript and
            pinned near the message composer. Use{" "}
            <DocsPageLink to="/components/message">Message</DocsPageLink> for
            content that has been sent.
          </>
        }
      >
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </MainSection>

      <MainSection
        id="basic-example"
        title="Basic example"
        description="Use the compact dots when the person typing is already clear from the conversation context."
      >
        <ComponentExample>
          <div className="space-y-6">
            <TypingIndicator />
            <Code
              variant="block"
              language="tsx"
              code={defaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="named"
        title="Named"
        description="Use the named presentation when the interface needs to identify who is composing the message."
      >
        <ComponentExample>
          <div className="space-y-6">
            <TypingIndicator variant="text" name="Liam" />
            <Code
              variant="block"
              language="tsx"
              code={namedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="with-avatar"
        title="With avatar"
        description="Add an avatar when visual identity helps distinguish the person from others in the conversation."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-4">
              <TypingIndicator avatar={placeholderAvatar} name="Liam" />
              <TypingIndicator
                variant="text"
                name="Liam"
                avatar={placeholderAvatar}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={avatarSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="presence"
        title="Presence"
        description="Keep the indicator mounted and update its active state. It slides up while fading in, then fades out while sliding down."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setIsTyping((current) => !current)}
              >
                {isTyping ? "Stop typing" : "Start typing"}
              </Button>
              <TypingIndicator active={isTyping} variant="text" name="Liam" />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={presenceSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Show brief, current typing activity without presenting it as a message."
      >
        <DocsDoDont
          doItems={[
            <>Drive the indicator from remote real-time activity.</>,
            <>Identify the person when the surrounding context is ambiguous.</>,
            <>Keep the component mounted when exit motion is required.</>,
            <>Remove the active state promptly after typing stops.</>,
          ]}
          dontItems={[
            <>Don’t derive the indicator from the local composer input.</>,
            <>Don’t render it as a transcript message.</>,
            <>Don’t add an avatar when the person is already clear.</>,
            <>Don’t show duplicate indicators for the same person.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Typing indicator."
      >
        <DocsApiTable
          rows={[
            {
              name: "active",
              type: "boolean",
              defaultValue: "true",
              description:
                "Shows or hides the indicator while preserving its transitions.",
            },
            {
              name: "variant",
              type: '"dots" | "text"',
              defaultValue: '"dots"',
              description: "Sets the compact or named presentation.",
            },
            {
              name: "name",
              type: "string",
              description:
                "Identifies the person in visible and accessible status text.",
            },
            {
              name: "avatar",
              type: "string | React.ReactNode",
              description: "Shows an image URL or custom avatar.",
            },
          ]}
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use conversation components according to whether content is pending or already sent."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/marker">Marker</DocsPageLink> — the
            status-text foundation used by the named presentation.
          </li>
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — for
            content that has already been sent.
          </li>
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> — for
            identifying the person who is typing.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
