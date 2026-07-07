import * as React from "react"
import { CheckIcon, ChevronDownIcon, InfoIcon } from "lucide-react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Code } from "@gecko/ui/components/code"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@gecko/ui/components/bubble"
import { Button } from "@gecko/ui/components/button"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@gecko/ui/components/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"

const showMoreText = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.`

const previewLength = 120

function BubbleShowMore() {
  const [open, setOpen] = React.useState(false)
  const isLong = showMoreText.length > previewLength
  const preview = `${showMoreText.slice(0, previewLength)}...`

  return (
    <Bubble variant="secondary" align="end">
      <BubbleContent className="whitespace-pre-line">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div>{open || !isLong ? showMoreText : preview}</div>
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
              <ChevronDownIcon className={open ? "rotate-180" : undefined} />
            </CollapsibleTrigger>
          ) : null}
        </Collapsible>
      </BubbleContent>
    </Bubble>
  )
}

export function BubblePage() {
  const importSnippet = `import { Bubble, BubbleContent, BubbleReactions } from "@gecko/ui/components/bubble"`

  const compositionSnippet = `Bubble
├── BubbleContent
└── BubbleReactions`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Bubble"
          description="A framed conversational surface for chat text, short structured output, quoted replies, suggestions, and reactions. Scoped to the bubble surface only — place avatars, names, and metadata in Message."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description="Compose bubbles with content and optional reactions."
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Bubble primitives to build conversational surfaces."
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
          description="Use the following composition to build a bubble:"
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

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              Use the <Code>variant</Code> prop to change the visual treatment
              of the bubble.
            </>
          }
        />
        <PageSubsectionHeader
          id="variants-default"
          title="Default"
          description="A strong primary bubble, usually for the current user."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-sm">
            <Bubble>
              <BubbleContent>This is the default primary bubble.</BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-secondary"
          title="Secondary"
          description="The standard neutral bubble for conversation content."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-sm">
            <Bubble variant="secondary" align="end">
              <BubbleContent>This is the secondary variant.</BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-outline"
          title="Outline"
          description="A bordered bubble for secondary or rich content."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-sm">
            <Bubble variant="outline">
              <BubbleContent>We can also use an outlined variant.</BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-ghost"
          title="Ghost"
          description="Unframed content for assistant text or rich content."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-sm">
            <Bubble variant="ghost">
              <BubbleContent>
                Ghost bubbles are unframed for assistant text and rich content.
              </BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-destructive"
          title="Destructive"
          description="A destructive bubble for error or failed actions."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-sm">
            <Bubble variant="destructive" align="end">
              <BubbleContent>A destructive variant for errors.</BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-note"
          title="Note"
          description="A note bubble for internal conversation notes."
        />
        <ComponentExample>
          <div className="w-full max-w-sm">
            <Bubble variant="note">
              <BubbleContent>
                A note bubble for internal conversation notes.
              </BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="alignment" label="Alignment">
        <PageSectionHeader
          title="Alignment"
          description={
            <>
              Use <Code>align</Code> to position the bubble at the start or end
              of the conversation.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-sm flex-col gap-8">
            <Bubble variant="secondary">
              <BubbleContent>
                This bubble is aligned to the start (default).
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>
                This bubble is aligned to the end — use it for user messages.
              </BubbleContent>
            </Bubble>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="group" label="Group">
        <PageSectionHeader
          title="Group"
          description={
            <>
              Use <Code>BubbleGroup</Code> to stack consecutive bubbles from the
              same sender. Set <Code>align</Code> on each <Code>Bubble</Code>,
              not the group.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-sm flex-col gap-8">
            <Bubble variant="secondary">
              <BubbleContent>Can you tell me what&apos;s the issue?</BubbleContent>
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
            </BubbleGroup>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="reactions" label="Reactions">
        <PageSectionHeader
          title="Reactions"
          description={
            <>
              Use <Code>BubbleReactions</Code> for reactions or quick actions.
              Reactions anchor to the bottom edge and overlap the bubble, so
              leave vertical space between rows.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-sm flex-col gap-12">
            <Bubble variant="secondary" align="start">
              <BubbleContent>
                I don&apos;t need tests, I know my code works.
              </BubbleContent>
              <BubbleReactions
                align="start"
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
        </ComponentExample>
      </PageSection>

      <PageSection id="tooltip" label="Tooltip">
        <PageSectionHeader
          title="Tooltip"
          description={
            <>
              Wrap a reaction in a <Code>Tooltip</Code> to reveal metadata on
              hover, such as when a message was read.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Bubble variant="secondary">
              <BubbleContent>Did you remove the stale route?</BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>Yes, removed it from the registry.</BubbleContent>
              <BubbleReactions>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="ghost" size="icon-xs" />}
                  >
                    <CheckIcon />
                  </TooltipTrigger>
                  <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
                </Tooltip>
              </BubbleReactions>
            </Bubble>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="show-more" label="Show more">
        <PageSectionHeader
          title="Show more"
          description={
            <>
              Compose long bubble content with <Code>Collapsible</Code> for a
              show more / show less interaction.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-sm flex-col gap-8">
            <Bubble variant="secondary">
              <BubbleContent>How can I help you today?</BubbleContent>
            </Bubble>
            <BubbleShowMore />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="popover" label="Popover">
        <PageSectionHeader
          title="Popover"
          description={
            <>
              Pair a bubble with a <Code>Popover</Code> to surface more
              information on demand, such as the full error message for a failed
              action.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Bubble align="end">
              <BubbleContent>Run the build script.</BubbleContent>
            </Bubble>
            <Bubble variant="destructive">
              <BubbleContent>Failed to run the command.</BubbleContent>
              <BubbleReactions>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Show error details"
                        className="aria-expanded:text-destructive"
                      />
                    }
                  >
                    <InfoIcon />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>
                      <PopoverTitle className="text-sm">
                        Command failed with exit code 1
                      </PopoverTitle>
                      <PopoverDescription className="text-sm">
                        ENOENT: no such file or directory, open pnpm-lock.yaml
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              </BubbleReactions>
            </Bubble>
          </div>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
