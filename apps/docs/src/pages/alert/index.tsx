import Sparkles from "@hugeicons/core-free-icons/SparklesIcon";
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
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@gecko/ui/components/alert";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";

const variants = [
  {
    key: "default",
    title: "Scheduled maintenance",
    description: "Reporting will be unavailable for 15 minutes from 22:00.",
    actionLabel: "View schedule",
  },
  {
    key: "info",
    title: "New feature available",
    description: "You can now export this report as a CSV file.",
    actionLabel: "View feature",
    variant: "info" as const,
  },
  {
    key: "success",
    title: "Integration connected",
    description: "New submissions will be sent to your connected account.",
    actionLabel: "View integration",
    variant: "success" as const,
  },
  {
    key: "warning",
    title: "Connection needs attention",
    description: "Reconnect the integration to continue receiving updates.",
    actionLabel: "Reconnect",
    variant: "warning" as const,
  },
  {
    key: "destructive",
    title: "Unable to load submissions",
    description: "Check your connection and try again.",
    actionLabel: "Try again",
    variant: "destructive" as const,
  },
];

export function AlertPage() {
  const importSnippet = `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@gecko/ui/components/alert"`;

  const compositionSnippet = `Alert
├── AlertTitle
├── AlertDescription
└── AlertAction (optional)`;

  const basicExampleSnippet = `<Alert>
  <AlertTitle>Scheduled maintenance</AlertTitle>
  <AlertDescription>
    Reporting will be unavailable for 15 minutes from 22:00.
  </AlertDescription>
</Alert>`;

  const destructiveExampleSnippet = `<Alert variant="destructive">
  <AlertTitle>Unable to load submissions</AlertTitle>
  <AlertDescription>
    Check your connection and try again.
  </AlertDescription>
</Alert>`;

  const infoExampleSnippet = `<Alert variant="info">
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>
    You can now export this report as a CSV file.
  </AlertDescription>
</Alert>`;

  const successExampleSnippet = `<Alert variant="success">
  <AlertTitle>Integration connected</AlertTitle>
  <AlertDescription>
    New submissions will be sent to your connected account.
  </AlertDescription>
</Alert>`;

  const warningExampleSnippet = `<Alert variant="warning">
  <AlertTitle>Connection needs attention</AlertTitle>
  <AlertDescription>
    Reconnect the integration to continue receiving updates.
  </AlertDescription>
</Alert>`;

  const iconDefaultSnippet = `<Alert variant="default|info|success|warning|destructive" icon>
  <AlertTitle>Alert title</AlertTitle>
  <AlertDescription>Alert description.</AlertDescription>
</Alert>`;

  const iconCustomSnippet = `<Alert variant="info" icon={<Sparkles />}>
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>
    You can now export this report as a CSV file.
  </AlertDescription>
</Alert>`;

  const actionSnippet = `<Alert variant="default|info|success|warning|destructive" icon>
  <AlertTitle>Alert title</AlertTitle>
  <AlertDescription>Alert description.</AlertDescription>
  <AlertAction>
    <Button size="sm">Action label</Button>
  </AlertAction>
</Alert>`;

  const dismissibleSnippet = `<Alert
  variant="default|info|success|warning|destructive"
  icon
  dismissible={{ onDismiss: handleDismiss }}
>
  <AlertTitle>Alert title</AlertTitle>
  <AlertDescription>Alert description.</AlertDescription>
</Alert>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Alert"
        description="Alert is a persistent, non-blocking callout for important information within a page or section."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Alert for important information that must remain visible in
            context until the parent removes it. Make it dismissible only when
            the message is safe to acknowledge and clear.
            <br />
            <br />
            Use a <DocsPageLink to="/components/toast">Toast</DocsPageLink> for
            brief post-action feedback. Use an{" "}
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            when someone must confirm an action before it happens. Use a
            field-level error for a problem with one form control.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Alert and the content parts used by the message. Import Button separately when the alert has an action."
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
          description={
            <>
              Put the primary message in <Code>AlertTitle</Code> and supporting
              detail in <Code>AlertDescription</Code>. <Code>AlertAction</Code>{" "}
              positions one Button or link; it does not create the control.
            </>
          }
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
        id="basic-example"
        title="Basic example"
        description="Use the default variant for an important neutral notice without a more specific status."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Alert>
              <AlertTitle>Scheduled maintenance</AlertTitle>
              <AlertDescription>
                Reporting will be unavailable for 15 minutes from 22:00.
              </AlertDescription>
            </Alert>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="variants"
        title="Variants"
        description="Choose a variant for the meaning of the message. A variant does not turn Alert into confirmation or temporary feedback."
      >
        <ChildSection
          id="variants-destructive"
          title="Destructive"
          description="Use for an error, failure, or critical state. Give a clear recovery step where one exists. Use Alert dialog—not Alert—to confirm an irreversible action."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Alert variant="destructive">
                <AlertTitle>Unable to load submissions</AlertTitle>
                <AlertDescription>
                  Check your connection and try again.
                </AlertDescription>
              </Alert>
              <Code
                variant="block"
                language="tsx"
                code={destructiveExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-info"
          title="Info"
          description="Use for contextual information about the current state or available options when the blue informational treatment is useful."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Alert variant="info">
                <AlertTitle>New feature available</AlertTitle>
                <AlertDescription>
                  You can now export this report as a CSV file.
                </AlertDescription>
              </Alert>
              <Code
                variant="block"
                language="tsx"
                code={infoExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-success"
          title="Success"
          description="Use for a successful state that must remain visible. Use Toast for ordinary feedback immediately after an action succeeds."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Alert variant="success">
                <AlertTitle>Integration connected</AlertTitle>
                <AlertDescription>
                  New submissions will be sent to your connected account.
                </AlertDescription>
              </Alert>
              <Code
                variant="block"
                language="tsx"
                code={successExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="variants-warning"
          title="Warning"
          description="Use for a potential problem that needs attention while the rest of the page remains available."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Alert variant="warning">
                <AlertTitle>Connection needs attention</AlertTitle>
                <AlertDescription>
                  Reconnect the integration to continue receiving updates.
                </AlertDescription>
              </Alert>
              <Code
                variant="block"
                language="tsx"
                code={warningExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="icon"
        title="Icon"
        description="Icons support scanning but never carry the meaning alone. The title and description must still explain the message."
      >
        <ChildSection
          id="icon-default"
          title="Default icons"
          description={
            <>
              Set <Code>icon</Code> to use the library-owned icon mapped to the
              current variant. Prefer this over choosing an icon manually.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="space-y-3">
                {variants.map(({ key, title, description, variant }) => (
                  <Alert key={key} variant={variant} icon>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{description}</AlertDescription>
                  </Alert>
                ))}
              </div>
              <Code
                variant="block"
                language="tsx"
                code={iconDefaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="icon-custom"
          title="Custom icons"
          description="Pass a React node only when an approved, context-specific icon communicates more clearly than the variant default. Agents must not invent or substitute icons without consent."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Alert variant="info" icon={<HugeiconsIcon icon={Sparkles} />}>
                <AlertTitle>New feature available</AlertTitle>
                <AlertDescription>
                  You can now export this report as a CSV file.
                </AlertDescription>
              </Alert>
              <Code
                variant="block"
                language="tsx"
                code={iconCustomSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="action"
        title="Action"
        description={
          <>
            Use <Code>AlertAction</Code> to position one relevant Button or
            link. The action automatically inherits the Alert treatment while
            the nested control owns its label and behaviour. Use a visible,
            verb-first label that names the next step.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              {variants.map(
                ({ key, title, description, actionLabel, variant }) => (
                  <Alert key={key} variant={variant} icon>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{description}</AlertDescription>
                    <AlertAction>
                      <Button size="sm">{actionLabel}</Button>
                    </AlertAction>
                  </Alert>
                ),
              )}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={actionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="dismissible"
        title="Dismissible"
        description={
          <>
            Set <Code>dismissible</Code> only when the message can be safely
            acknowledged and removed. Keep unresolved errors, required
            instructions, and ongoing conditions visible. Use an action or a
            dismiss control, not both.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              {variants.map(({ key, title, description, variant }) => (
                <Alert key={key} variant={variant} icon dismissible>
                  <AlertTitle>{title}</AlertTitle>
                  <AlertDescription>{description}</AlertDescription>
                </Alert>
              ))}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={dismissibleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep the message important, persistent, and focused on one meaning."
      >
        <DocsDoDont
          doItems={[
            <>
              Match <Code>variant</Code> to the meaning of the message.
            </>,
            <>
              Use a short <Code>AlertTitle</Code> and clear supporting detail.
            </>,
            <>Use the mapped default icon when an icon improves scanning.</>,
            <>
              Place one Button or link inside <Code>AlertAction</Code>.
            </>,
            <>
              Use <Code>role=&quot;status&quot;</Code> when a dynamically
              inserted message is informative rather than urgent.
            </>,
          ]}
          dontItems={[
            <>Don’t use Alert for temporary post-action feedback; use Toast.</>,
            <>
              Don’t use Alert to confirm an irreversible action; use Alert
              dialog.
            </>,
            <>
              Don’t combine <Code>AlertAction</Code> and{" "}
              <Code>dismissible</Code>.
            </>,
            <>Don’t rely on colour or an icon to communicate the message.</>,
            <>
              Don’t override the Alert chrome or add variants, icons, or
              behaviour props without consent.
            </>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Alert.">
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"default" | "destructive" | "info" | "success" | "warning"',
              defaultValue: '"default"',
              description: "The meaning and visual treatment of the message.",
            },
            {
              name: "icon",
              type: "boolean | React.ReactNode",
              defaultValue: "false",
              description:
                "true uses the mapped icon for the variant. A React node supplies an approved custom icon.",
            },
            {
              name: "dismissible",
              type: "boolean | { label?: string; ariaLabel?: string; onDismiss?: () => void }",
              defaultValue: "false",
              description:
                "Adds an internal dismiss button and optionally reports dismissal to the parent.",
            },
            {
              name: "role",
              type: "React.AriaRole",
              defaultValue: '"alert"',
              description:
                "Inherited from div. Override with status only for a non-urgent dynamic announcement.",
            },
            {
              name: "AlertAction",
              type: 'React.ComponentProps<"div">',
              description:
                "Positions one child Button or link. It does not create the interactive control.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/alert">
                Shadcn Alert documentation
              </DocsExternalLink>{" "}
              for the source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose a different feedback surface when the message should not remain inline."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/toast">Toast</DocsPageLink> — brief
            post-action feedback that can disappear.
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — confirmation required before an action proceeds.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — an error
            or instruction belonging to one form control.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
