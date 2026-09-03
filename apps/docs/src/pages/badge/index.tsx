import { useState } from "react";
import { Bell, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
import { Badge } from "@gecko/ui/components/badge";
import { Code } from "@gecko/ui/components/code";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const sizeLabels: Record<(typeof sizes)[number], string> = {
  xs: "Extra small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
};

const avatarSrc =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces";

export function BadgePage() {
  const [dismissed, setDismissed] = useState(false);

  const importSnippet = `import { Badge } from "@gecko/ui/components/badge"`;

  const defaultSnippet = `<Badge>Default badge</Badge>`;

  const coloursSnippet = `<Badge variant="primary|secondary|info|warning|destructive|success|light">
  Badge
</Badge>`;

  const borderedSnippet = `<Badge
  variant="primary|secondary|info|warning|destructive|success|light"
  bordered
>
  Badge
</Badge>`;

  const roundedSnippet = `<Badge
  variant="primary|secondary|info|warning|destructive|success|light"
  rounded
>
  Badge
</Badge>`;

  const sizesSnippet = `<Badge size="xs|sm|md|lg|xl">Badge</Badge>`;

  const leftIconSnippet = `<Badge leftIcon={<Bell />}>
  Icon left
</Badge>`;

  const rightIconSnippet = `<Badge rightIcon={<ChevronRight />}>
  Icon right
</Badge>`;

  const bothIconsSnippet = `<Badge
  leftIcon={<Bell />}
  rightIcon={<ChevronRight />}
>
  Both icons
</Badge>`;

  const avatarSnippet = `<Badge size="xs|sm|md|lg|xl">
  <Avatar name="John Doe">
    <AvatarImage src="${avatarSrc}" />
  </Avatar>
  John Doe
</Badge>`;

  const dismissibleSnippet = `<Badge
  dismissible={{
    ariaLabel: "Remove status",
    onDismiss: handleDismiss,
  }}
>
  Dismissible badge
</Badge>`;

  const notificationSnippet = `<Badge notificationCount={3}>Inbox</Badge>

<Badge notificationCount={12}>Messages</Badge>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Badge"
          description="The Badge component is a short label for status, category, or a count. It helps people scan without reading a full sentence."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Badge for status in Data table columns (for example a campaign
              marked Active) and for labels or tags. Keep the wording short.
              <br />
              <br />
              Avoid using it for sentences, instructions, or headings. Prefer
              these status and tag patterns; expand only when product needs it.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Badge to label a status or category. Badge also owns optional icons, dismissal, and notification counts."
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

      <PageSection id="default" label="Default badge">
        <PageSectionHeader
          title="Default badge"
          description={
            <>A quiet badge for a short label. This is the default treatment.</>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Badge>Default badge</Badge>
            <Code
              variant="block"
              language="tsx"
              code={defaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              Change colour with <Code>variant</Code>, add an outline with{" "}
              <Code>bordered</Code>, or a pill shape with <Code>rounded</Code>.
              Choose the look that matches how important the label is.
            </>
          }
        />

        <PageSubsectionHeader
          id="variants-colours"
          title="Colours"
          description={
            <>
              Set colour with the <Code>variant</Code> prop. Use a quiet colour
              for everyday tags, and a status colour when something succeeded,
              needs attention, or has gone wrong.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge>Secondary</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="light">Light</Badge>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={coloursSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-bordered"
          title="Bordered"
          description={
            <>
              Adds an outline using the <Code>bordered</Code> prop. Use this
              when the label needs a little more definition against a busy
              background.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" bordered>
                Primary
              </Badge>
              <Badge bordered>Secondary</Badge>
              <Badge variant="info" bordered>
                Info
              </Badge>
              <Badge variant="warning" bordered>
                Warning
              </Badge>
              <Badge variant="destructive" bordered>
                Destructive
              </Badge>
              <Badge variant="success" bordered>
                Success
              </Badge>
              <Badge variant="light" bordered>
                Light
              </Badge>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={borderedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-rounded"
          title="Rounded"
          description={
            <>
              Makes a pill shape using the <Code>rounded</Code> prop. Use this
              when the label should feel like a tag rather than a status chip.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" rounded>
                Primary
              </Badge>
              <Badge rounded>Secondary</Badge>
              <Badge variant="info" rounded>
                Info
              </Badge>
              <Badge variant="warning" rounded>
                Warning
              </Badge>
              <Badge variant="destructive" rounded>
                Destructive
              </Badge>
              <Badge variant="success" rounded>
                Success
              </Badge>
              <Badge variant="light" rounded>
                Light
              </Badge>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={roundedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description={
            <>
              Set the size with the <Code>size</Code> prop. Use a smaller size
              in dense tables and lists, and a larger size when the label is a
              focus of the layout.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="xs">Extra small</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
              <Badge size="xl">Extra large</Badge>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-icons" label="With icons">
        <PageSectionHeader
          title="With icons"
          description="An icon can sit with the text to make the type of badge easier to recognise."
        />

        <PageSubsectionHeader
          id="with-icons-left"
          title="Left icon"
          description={
            <>
              Places an icon before the text using the <Code>leftIcon</Code>{" "}
              prop. Use this when a symbol helps people recognise the kind of
              label at a glance.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Badge leftIcon={<Bell />}>Icon left</Badge>
            <Code
              variant="block"
              language="tsx"
              code={leftIconSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="with-icons-right"
          title="Right icon"
          description={
            <>
              Places an icon after the text using the <Code>rightIcon</Code>{" "}
              prop. Use this when a trailing symbol adds meaning to the label.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Badge rightIcon={<ChevronRight />}>Icon right</Badge>
            <Code
              variant="block"
              language="tsx"
              code={rightIconSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="with-icons-both"
          title="Both icons"
          description={
            <>
              Places icons on both sides using <Code>leftIcon</Code> and{" "}
              <Code>rightIcon</Code>. Use this when the badge needs a type on
              the left and additional context on the right.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Badge leftIcon={<Bell />} rightIcon={<ChevronRight />}>
              Both icons
            </Badge>
            <Code
              variant="block"
              language="tsx"
              code={bothIconsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-avatar" label="With avatar">
        <PageSectionHeader
          title="With avatar"
          description={
            <>
              Nest an <Code>Avatar</Code> as a child of the badge. Use this when
              the label is about a person.
            </>
          }
        />

        <PageSubsectionHeader
          id="with-avatar-sizes"
          title="Avatar sizes"
          description={
            <>
              The avatar scales from the badge <Code>size</Code> prop. Use the
              size that matches the surrounding layout.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {sizes.map((size) => (
                <Badge key={size} size={size}>
                  <Avatar name="John Doe">
                    <AvatarImage src={avatarSrc} />
                  </Avatar>
                  {sizeLabels[size]}
                </Badge>
              ))}
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
      </PageSection>

      <PageSection id="dismissible" label="Dismissible">
        <PageSectionHeader
          title="Dismissible"
          description={
            <>
              Adds an internal remove control using <Code>dismissible</Code>.
              Use this when the complete badge can be removed.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            {!dismissed ? (
              <Badge
                dismissible={{
                  ariaLabel: "Remove status",
                  onDismiss: () => setDismissed(true),
                }}
              >
                Dismissible badge
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">
                Badge dismissed.
              </span>
            )}
            <Code
              variant="block"
              language="tsx"
              code={dismissibleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="notification" label="Notification indicator">
        <PageSectionHeader
          title="Notification indicator"
          description={
            <>
              Set <Code>notificationCount</Code> when the label needs an unread
              count. Badge creates and positions the Counter automatically.
              Counts of ten or more show as 9+, and zero is hidden.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Badge notificationCount={3}>Inbox</Badge>
              <Badge notificationCount={12}>Messages</Badge>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={notificationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use variant, size, and shape for emphasis. Do not restyle the badge chrome."
        />
        <DocsDoDont
          doItems={[
            <>
              Keep the wording to a word or two. Use <Code>variant</Code> for
              colour, <Code>size</Code> for density, and <Code>bordered</Code>{" "}
              or <Code>rounded</Code> for shape.
            </>,
            <>
              Place symbols with <Code>leftIcon</Code> and{" "}
              <Code>rightIcon</Code>. Nest an{" "}
              <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> when
              the label is about a person.
            </>,
            <>
              Set <Code>dismissible</Code> when the badge can be removed. Add an
              accessible label that names what will be removed.
            </>,
            <>
              Set <Code>notificationCount</Code> for an unread total. Badge
              creates and positions the Counter.
            </>,
          ]}
          dontItems={[
            <>
              Don’t override colour, padding, or radius with{" "}
              <Code>className</Code>. Use <Code>variant</Code>,{" "}
              <Code>size</Code>, <Code>bordered</Code>, and <Code>rounded</Code>
              .
            </>,
            <>
              Don’t use a Badge for a sentence, an instruction, or a heading.
            </>,
            <>
              Don’t use Badge as an action or link. Use Button, Toggle, or a
              semantic link instead.
            </>,
            <>
              Don’t combine <Code>rightIcon</Code> with <Code>dismissible</Code>
              ; the dismiss control owns that position.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Badge."
        />
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "info" | "warning" | "destructive" | "success" | "light"',
              defaultValue: '"secondary"',
              description:
                "Colour. Use a quiet colour for everyday tags, and a status colour when something succeeded, needs attention, or has gone wrong.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              defaultValue: '"sm"',
              description:
                "Height and type size. Use smaller sizes in dense lists.",
            },
            {
              name: "bordered",
              type: "boolean",
              defaultValue: "false",
              description:
                "Adds an outline. Use this against a busy background.",
            },
            {
              name: "rounded",
              type: "boolean",
              defaultValue: "false",
              description:
                "Makes a pill shape. Use this when the label should feel like a tag.",
            },
            {
              name: "leftIcon",
              type: "React.ReactNode",
              description: "Symbol before the text.",
            },
            {
              name: "rightIcon",
              type: "React.ReactNode",
              description: "Symbol after the text.",
            },
            {
              name: "dismissible",
              type: "boolean | { label?: string; ariaLabel?: string; onDismiss?: () => void }",
              defaultValue: "false",
              description:
                "Adds an internal dismiss button and removes the badge when activated. Cannot be combined with rightIcon.",
            },
            {
              name: "notificationCount",
              type: "number",
              description:
                "Unread total positioned automatically. Values of 10 or more show as 9+; zero and invalid values are hidden.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/badge">
                Shadcn Badge documentation
              </DocsExternalLink>{" "}
              for the source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different control when the Badge is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — when
            the control is an action, not a short label.
          </li>
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> — when
            you only need the person, without a status chip.
          </li>
          <li>
            <DocsPageLink to="/components/counter">Counter</DocsPageLink> — when
            you need a standalone count. Badge uses Counter automatically when
            <Code>notificationCount</Code> is set.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
