import * as React from "react";
import ChevronDownIcon from "@hugeicons/core-free-icons/ChevronDownIcon";
import ReplyIcon from "@hugeicons/core-free-icons/ReplyIcon";
import SmilePlusIcon from "@hugeicons/core-free-icons/SmilePlusIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Code } from "@gecko/ui/components/code";
import {
  Bubble,
  BubbleActions,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@gecko/ui/components/bubble";
import { Button } from "@gecko/ui/components/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible";

const showMoreText = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.`;

const previewLength = 120;

function BubbleShowMore() {
  const [open, setOpen] = React.useState(false);
  const isLong = showMoreText.length > previewLength;

  return (
    <Bubble variant="secondary" align="end">
      <BubbleContent className="whitespace-pre-line">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className={open || !isLong ? undefined : "line-clamp-3"}>
            {showMoreText}
          </div>
          {isLong ? (
            <CollapsibleTrigger
              render={
                <Button
                  variant="link"
                  className="mt-2 p-0 text-muted-foreground"
                  size="sm"
                />
              }
            >
              {open ? "Show less" : "Show more"}
              <HugeiconsIcon
                icon={ChevronDownIcon}
                className="transition-transform duration-200 ease-out group-aria-expanded/button:rotate-180 motion-reduce:transition-none"
              />
            </CollapsibleTrigger>
          ) : null}
        </Collapsible>
      </BubbleContent>
    </Bubble>
  );
}

export function BubblePage() {
  const importSnippet = `import {
  Bubble,
  BubbleActions,
  BubbleAuthor,
  BubbleContent,
  BubbleHeader,
  BubbleReactions,
  BubbleTimestamp,
} from "@gecko/ui/components/bubble"`;

  const compositionSnippet = `Bubble
├── BubbleContent
│   ├── BubbleHeader
│   │   ├── BubbleAuthor
│   │   └── BubbleTimestamp
├── BubbleActions
└── BubbleReactions`;

  const defaultSnippet = `<Bubble align="end">
  <BubbleContent>This is a team message.</BubbleContent>
</Bubble>`;

  const secondarySnippet = `<Bubble variant="secondary">
  <BubbleContent>This is a customer message.</BubbleContent>
</Bubble>`;

  const outlineSnippet = `<Bubble variant="outline">
  <BubbleContent>We can also use an outlined variant.</BubbleContent>
</Bubble>`;

  const ghostSnippet = `<Bubble variant="ghost">
  <BubbleContent>
    Ghost bubbles are unframed for assistant text and rich content.
  </BubbleContent>
</Bubble>`;

  const destructiveSnippet = `<Bubble variant="destructive" align="end">
  <BubbleContent>A destructive variant for errors.</BubbleContent>
</Bubble>`;

  const alignmentSnippet = `<Bubble variant="secondary">
  <BubbleContent>
    Customer messages align to the start.
  </BubbleContent>
</Bubble>

<Bubble align="end">
  <BubbleContent>
    Team messages align to the end.
  </BubbleContent>
</Bubble>`;

  const fullWidthSnippet = `<Bubble variant="secondary" align="end">
  <BubbleContent>Default: grows with content up to 85%…</BubbleContent>
</Bubble>

<Bubble variant="secondary" align="end" fullWidth>
  <BubbleContent>Full width: can grow up to 100%…</BubbleContent>
</Bubble>`;

  const groupSnippet = `<Bubble variant="secondary">
  <BubbleContent>Can you tell me what's the issue?</BubbleContent>
</Bubble>

<BubbleGroup>
  <Bubble align="end">
    <BubbleContent>You tell me!</BubbleContent>
  </Bubble>
  <Bubble align="end">
    <BubbleContent>It worked yesterday. You broke it!</BubbleContent>
  </Bubble>
  <Bubble align="end">
    <BubbleContent>Find the bug and fix it.</BubbleContent>
  </Bubble>
</BubbleGroup>`;

  const reactionsSnippet = `<Bubble variant="secondary" align="start">
  <BubbleContent>
    I don't need tests, I know my code works.
  </BubbleContent>
  <BubbleReactions role="img" aria-label="Reactions: thumbs up, surprised">
    <span>👍</span>
    <span>😮</span>
  </BubbleReactions>
</Bubble>

<Bubble variant="default" align="end">
  <BubbleContent>
    Tests passed on the first try. All 142 of them.
  </BubbleContent>
  <BubbleReactions role="img" aria-label="Reactions: party popper, clapping hands">
    <span>🎉</span>
    <span>👏</span>
  </BubbleReactions>
</Bubble>`;

  const actionsSnippet = `<Bubble variant="secondary" align="start">
  <BubbleContent>Can we ship the bubbles tomorrow?</BubbleContent>
  <BubbleActions>
    <Button variant="ghost" size="icon-xs" aria-label="Reply">
      <ReplyIcon />
    </Button>
    <Button variant="ghost" size="icon-xs" aria-label="Add reaction">
      <SmilePlusIcon />
    </Button>
  </BubbleActions>
  <BubbleReactions role="img" aria-label="Reactions: thumbs up">
    <span>👍</span>
  </BubbleReactions>
</Bubble>

<Bubble variant="default" align="end">
  <BubbleContent>hi</BubbleContent>
  <BubbleActions>
    <Button variant="ghost" size="icon-xs" aria-label="Reply">
      <ReplyIcon />
    </Button>
    <Button variant="ghost" size="icon-xs" aria-label="Add reaction">
      <SmilePlusIcon />
    </Button>
  </BubbleActions>
</Bubble>`;

  const showMoreSnippet = `<Bubble variant="secondary" align="end">
  <BubbleContent className="whitespace-pre-line">
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={open ? undefined : "line-clamp-3"}>{fullText}</div>
      <CollapsibleTrigger
        render={<Button variant="link" size="sm" />}
      >
        {open ? "Show less" : "Show more"}
        <ChevronDownIcon className="transition-transform duration-200 ease-out group-aria-expanded/button:rotate-180 motion-reduce:transition-none" />
      </CollapsibleTrigger>
    </Collapsible>
  </BubbleContent>
</Bubble>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Bubble"
        description="The Bubble component is the speech in a conversation — the framed text of a message. It holds the words, and can sit with hover actions and reactions, without the avatar or name."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use a Bubble for the words in a conversation. Compose it inside a{" "}
            <DocsPageLink to="/components/message">Message</DocsPageLink> for
            application conversations so speaker, alignment and treatment stay
            coordinated.
            <br />
            <br />
            Use Bubble directly only for a deliberately lightweight conversation
            that does not need message identity or metadata. Avoid using it as a
            card, a tooltip, or a page notice.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Bubble and its parts to compose a message."
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
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="The bubble holds the text. Hover actions and reactions sit beside it or on the edge."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="variants"
        title="Variants"
        description={
          <>
            Set the look with the <Code>variant</Code> prop. Use a stronger
            style for the person speaking, and a quieter style for everyone
            else.
          </>
        }
      >
        <ChildSection
          id="variants-default"
          title="Default"
          description={
            <>
              The main bubble using <Code>variant=&quot;default&quot;</Code>.
              Message selects this automatically for team or agent messages.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full">
                <Bubble align="end">
                  <BubbleContent>This is a team message.</BubbleContent>
                </Bubble>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={defaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-secondary"
          title="Secondary"
          description={
            <>
              A quieter bubble using <Code>variant=&quot;secondary&quot;</Code>.
              Message selects this automatically for customer or external user
              messages.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full">
                <Bubble variant="secondary">
                  <BubbleContent>This is a customer message.</BubbleContent>
                </Bubble>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={secondarySnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-outline"
          title="Outline"
          description={
            <>
              A bordered bubble using <Code>variant=&quot;outline&quot;</Code>.
              Use this when the content should feel secondary or sit on a busy
              background.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full">
                <Bubble variant="outline">
                  <BubbleContent>
                    We can also use an outlined variant.
                  </BubbleContent>
                </Bubble>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={outlineSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-ghost"
          title="Ghost"
          description={
            <>
              An unframed bubble using <Code>variant=&quot;ghost&quot;</Code>.
              Use this when the content should not look like a framed chip.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full">
                <Bubble variant="ghost">
                  <BubbleContent>
                    Ghost bubbles are unframed for assistant text and rich
                    content.
                  </BubbleContent>
                </Bubble>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={ghostSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-destructive"
          title="Destructive"
          description={
            <>
              An error bubble using <Code>variant=&quot;destructive&quot;</Code>
              . Use this when an action in the thread failed.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="w-full">
                <Bubble variant="destructive" align="end">
                  <BubbleContent>
                    A destructive variant for errors.
                  </BubbleContent>
                </Bubble>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={destructiveSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="alignment"
        title="Alignment"
        description={
          <>
            Positions a standalone bubble with the <Code>align</Code> prop.
            Customer messages align to the start; team, agent, AI and note
            messages align to the end. Message applies this mapping
            automatically.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-8">
              <Bubble variant="secondary">
                <BubbleContent>
                  Customer messages align to the start.
                </BubbleContent>
              </Bubble>
              <Bubble align="end">
                <BubbleContent>Team messages align to the end.</BubbleContent>
              </Bubble>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={alignmentSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="full-width"
        title="Full width"
        description={
          <>
            Raises the max width using the <Code>fullWidth</Code> prop. Use this
            in a tight layout, where the usual gap would leave unused space.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-8">
              <Bubble variant="secondary" align="end">
                <BubbleContent>
                  Default: grows with content up to 85% of the container width,
                  then text wraps onto the next line when it reaches that limit.
                  Keep adding copy and you will see the bubble stop expanding
                  once it hits that 85% cap — anything longer wraps onto
                  additional lines instead of stretching across the full row.
                </BubbleContent>
              </Bubble>
              <Bubble variant="secondary" align="end" fullWidth>
                <BubbleContent>
                  Full width: still sizes to the text, but can grow up to 100%
                  of the container before wrapping. With enough copy the bubble
                  fills the entire row, then wraps onto the next line — useful
                  in tighter layouts like sidebars where the usual 85% gap would
                  leave unused space.
                </BubbleContent>
              </Bubble>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={fullWidthSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="group"
        title="Group"
        description={
          <>
            Stacks consecutive bubbles from the same person using{" "}
            <Code>BubbleGroup</Code>. Set <Code>align</Code> on each{" "}
            <Code>Bubble</Code>, not the group. Use this when someone sends
            several messages in a row.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-8">
              <Bubble variant="secondary">
                <BubbleContent>
                  Can you tell me what&apos;s the issue?
                </BubbleContent>
              </Bubble>
              <BubbleGroup>
                <Bubble align="end">
                  <BubbleContent>You tell me!</BubbleContent>
                </Bubble>
                <Bubble align="end">
                  <BubbleContent>
                    It worked yesterday. You broke it!
                  </BubbleContent>
                </Bubble>
                <Bubble align="end">
                  <BubbleContent>Find the bug and fix it.</BubbleContent>
                </Bubble>
              </BubbleGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={groupSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="reactions"
        title="Reactions"
        description={
          <>
            Adds applied emoji using <Code>BubbleReactions</Code>. Use this when
            people have reacted to the message.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-12">
              <Bubble variant="secondary" align="start">
                <BubbleContent>
                  I don&apos;t need tests, I know my code works.
                </BubbleContent>
                <BubbleReactions
                  role="img"
                  aria-label="Reactions: thumbs up, surprised"
                >
                  <span>👍</span>
                  <span>😮</span>
                </BubbleReactions>
              </Bubble>
              <Bubble variant="default" align="end">
                <BubbleContent>
                  Tests passed on the first try. All 142 of them.
                </BubbleContent>
                <BubbleReactions
                  align="start"
                  role="img"
                  aria-label="Reactions: party popper, clapping hands"
                >
                  <span>🎉</span>
                  <span>👏</span>
                </BubbleReactions>
              </Bubble>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={reactionsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="actions"
        title="Actions"
        description={
          <>
            Adds hover controls using <Code>BubbleActions</Code>. Place it after{" "}
            <Code>BubbleContent</Code>. Use this for reply or react without
            crowding the text.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-8">
              <Bubble variant="secondary" align="start">
                <BubbleContent>Can we ship the bubbles tomorrow?</BubbleContent>
                <BubbleActions>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Reply"
                  >
                    <HugeiconsIcon icon={ReplyIcon} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Add reaction"
                  >
                    <HugeiconsIcon icon={SmilePlusIcon} />
                  </Button>
                </BubbleActions>
                <BubbleReactions role="img" aria-label="Reactions: thumbs up">
                  <span>👍</span>
                </BubbleReactions>
              </Bubble>
              <Bubble variant="default" align="end">
                <BubbleContent>hi</BubbleContent>
                <BubbleActions>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Reply"
                  >
                    <HugeiconsIcon icon={ReplyIcon} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Add reaction"
                  >
                    <HugeiconsIcon icon={SmilePlusIcon} />
                  </Button>
                </BubbleActions>
              </Bubble>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={actionsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="show-more"
        title="Show more"
        description={
          <>
            Compose long text with <Code>Collapsible</Code>. Use this when the
            message is too long to show in full at first.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex w-full flex-col gap-8">
              <Bubble variant="secondary">
                <BubbleContent>How can I help you today?</BubbleContent>
              </Bubble>
              <BubbleShowMore />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={showMoreSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use variant and align for who is speaking. Do not restyle the bubble chrome."
      >
        <DocsDoDont
          doItems={[
            <>
              Compose inside{" "}
              <DocsPageLink to="/components/message">Message</DocsPageLink> for
              application conversations so identity, metadata, alignment and
              treatment stay coordinated.
            </>,
            <>
              Let Message map customer messages to <Code>secondary</Code> and{" "}
              <Code>start</Code>, and team or agent messages to{" "}
              <Code>default</Code> and <Code>end</Code>.
            </>,
            <>
              Group consecutive messages with <Code>BubbleGroup</Code>. Set{" "}
              <Code>align</Code> on each <Code>Bubble</Code>, not the group.
            </>,
            <>
              Give <Code>BubbleReactions</Code> a{" "}
              <Code>role=&quot;img&quot;</Code> and an <Code>aria-label</Code>.
              Give icon-only actions an <Code>aria-label</Code>.
            </>,
            <>
              Use <Code>fullWidth</Code> in a tight layout. Compose long text
              with <Code>Collapsible</Code>.
            </>,
          ]}
          dontItems={[
            <>
              Don’t override padding, radius, or colour with{" "}
              <Code>className</Code>. Use an approved <Code>variant</Code>.
            </>,
            <>
              Don’t use a Bubble as a card, a tooltip, or a page notice. If
              there is no conversation, it is not a bubble.
            </>,
            <>
              Don’t set <Code>align</Code> on <Code>BubbleGroup</Code>.
            </>,
            <>
              Don’t rely on the destructive colour alone. Keep the error in the
              message text.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Bubble."
      >
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "destructive"',
              defaultValue: '"default"',
              description:
                "Look. Message selects default for team or agent messages, secondary for customer messages, and ghost for AI messages. Use destructive when an action in the thread failed.",
            },
            {
              name: "align",
              type: '"start" | "end"',
              defaultValue: '"start"',
              description:
                "Inline position on a standalone Bubble. Message maps customer messages to start and team, agent, AI and note messages to end. BubbleReactions also accepts align to override its inherited anchor.",
            },
            {
              name: "fullWidth",
              type: "boolean",
              defaultValue: "false",
              description:
                "Raises the max width from 85% to 100%. The bubble still sizes to its content.",
            },
            {
              name: "side",
              type: '"start" | "end"',
              description:
                "On BubbleActions. Which side of the content the hover controls sit on.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/bubble">
                Shadcn Bubble documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/handbook/composition">
                Base UI composition guide
              </DocsExternalLink>{" "}
              for the source composition and render API.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different control when the Bubble is the wrong shape for the job."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/message">Message</DocsPageLink> — when
            you need a face, a name, or a timestamp beside the words.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
