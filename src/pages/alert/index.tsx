import { ComponentExample } from "@/components/layout/component-example"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { ArrowRight, Sparkles } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"

export function AlertPage() {
  const importSnippet = `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"`

  const compositionSnippet = `Alert
├── AlertTitle
├── AlertDescription
└── AlertAction`

  const basicExampleSnippet = `<Alert>
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const destructiveExampleSnippet = `<Alert variant="destructive">
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const infoExampleSnippet = `<Alert variant="info">
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const successExampleSnippet = `<Alert variant="success">
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const warningExampleSnippet = `<Alert variant="warning">
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const actionSnippet = `import { ArrowRight } from "lucide-react"

<Alert>
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
  <AlertAction
    label=""
    icon={<ArrowRight />}
  />
</Alert>`

  const iconDefaultSnippet = `<Alert icon>
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const iconCustomSnippet = `import { Sparkles } from "lucide-react"

<Alert
  variant="success"
  icon={<Sparkles />}
>
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const dismissibleSnippet = `<Alert dismissible>
  <AlertTitle></AlertTitle>
  <AlertDescription></AlertDescription>
</Alert>`

  const dismissibleVariants: Array<{
    key: string
    title: string
    description: string
    variant?: React.ComponentProps<typeof Alert>["variant"]
  }> = [
    {
      key: "default",
      title: "Default",
      description: "A general notification for the user.",
    },
    {
      key: "info",
      title: "Info",
      description: "Additional context that doesn’t require action.",
      variant: "info",
    },
    {
      key: "success",
      title: "Success",
      description: "An action has completed successfully.",
      variant: "success",
    },
    {
      key: "warning",
      title: "Warning",
      description: "Something may require attention soon.",
      variant: "warning",
    },
    {
      key: "destructive",
      title: "Destructive",
      description: "An error or high-risk state.",
      variant: "destructive",
    },
  ]

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Alert"
          description={
            <>
              The Alert component displays important contextual messages that need to stand out from surrounding content. It is used to communicate status, warnings, errors, confirmations, or actions that require the user’s attention without interrupting their workflow.
            </>
          }
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use an Alert when a message needs stronger visual emphasis than standard body text but does not require a modal or blocking interaction. Alerts should be concise, specific, and matched to the correct intent through variants such as success, warning, destructive, or informational.
              <br />
              <br />
              Avoid using alerts for general page copy, repeated messages, or information that does not require attention. If the message is persistent and part of the normal layout, consider using standard content or another component instead.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description={
            <>
              Import the Alert and its subcomponents to compose the message content. The base Alert controls the visual treatment, while the title, description, and action elements provide structure for the message.
            </>
          }
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
          description={
            <>
              The Alert follows a compound component pattern. Use <Code>AlertTitle</Code> for the primary message, <Code>AlertDescription</Code> for supporting detail, and <Code>AlertAction</Code> when the alert includes a clear next step. Icons can be added to reinforce the alert’s intent, but the message should remain understandable without relying on the icon alone.
            </>
          }
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

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
            Demonstrates the default Alert structure with a title and supporting description. Use this as the baseline for communicating non-critical information where context is helpful but no immediate action is required.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
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
      </PageSection>

      <PageSection id="variations" label="Variations">
        <PageSectionHeader
          title="Variations"
          description={
            <>
              The Alert supports multiple variants to communicate intent through visual styling. Choose the variant that matches the meaning of the message rather than the severity alone.
            </>
          }
        />

        <PageSubsectionHeader
          id="variations-destructive"
          title="Destructive"
          description={
            <>
              Use for errors or irreversible actions that could result in data loss or system impact. This variant should clearly communicate risk and, where possible, guide the user toward resolution or recovery.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Alert variant="destructive">
              <AlertTitle>Destructive</AlertTitle>
              <AlertDescription>
                An error or high-risk state.
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

        <PageSubsectionHeader
          id="variations-info"
          title="Info"
          description={
            <>
              Use for neutral or contextual information that helps the user understand the current state or available options. This variant should not imply urgency or require immediate action.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                Additional context that doesn’t require action.
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

        <PageSubsectionHeader
          id="variations-success"
          title="Success"
          description={
            <>
              Use for confirming that an action has completed successfully. This is typically used after user-initiated events such as form submissions, updates, or completed processes.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                An action has completed successfully.
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

        <PageSubsectionHeader
          id="variations-warning"
          title="Warning"
          description={
            <>
              Use for potential issues that need attention. The warning variant is designed to communicate a potential problem that requires immediate user intervention. It is typically paired with a clear call-to-action in the action slot.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Something may require attention soon.
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
      </PageSection>

      <PageSection id="icon" label="Icon">
        <PageSectionHeader
          title="Icon"
          description={
            <>
              Alerts can include an icon to reinforce the message intent and improve visual scanning. Icons should support the meaning of the alert rather than carry it, the message should remain clear without relying on the icon alone.
            </>
          }
        />

        <PageSubsectionHeader
          id="icon-default"
          title="Default icons"
          description={
            <>
              Enable the <Code>icon</Code> prop to render the default icon associated with the selected variant. This ensures consistent visual meaning across the system without requiring manual icon selection.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Alert icon>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                This alert uses the default icon for its variant.
              </AlertDescription>
            </Alert>
            <Code
              variant="block"
              language="tsx"
              code={iconDefaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="icon-custom"
          title="Custom icons"
          description={
            <>
              Provide a custom icon by passing a React node to the <Code>icon</Code> prop. Use this when the default variant icon does not match the context or when a more specific visual cue is needed.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Alert
              variant="success"
              icon={<Sparkles />}
            >
              <AlertTitle>New feature</AlertTitle>
              <AlertDescription>
                This alert uses a custom icon passed via the icon prop.
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
      </PageSection>

      <PageSection id="action" label="Action">
        <PageSectionHeader
          title="Action"
          description={
            <>
            Adds an optional call-to-action within the alert using <Code>AlertAction</Code>. Use this when the message requires a clear next step, such as retrying an action, navigating to a related view, or resolving an issue.
            <br />
            <br />
            Actions should be direct and relevant to the message. Avoid including multiple actions or unrelated links, as this reduces clarity and weakens the alert’s purpose.
            </>
          }
        />

        <ComponentExample className="mb-6">
          <div className="space-y-3">
            {dismissibleVariants.map(({ key, title, description, variant }) => {
              return (
                <Alert key={key} variant={variant}>
                  <AlertTitle>{title}</AlertTitle>
                  <AlertDescription>{description}</AlertDescription>
                  <AlertAction
                    label="Action"
                    icon={<ArrowRight />}
                  />
                </Alert>
              )
            })}
          </div>
        </ComponentExample>

        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={actionSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="dismissible" label="Dismissible">
        <PageSectionHeader
          title="Dismissible"
          description={
            <>
            Use the <Code>dismissible</Code> prop to allow the alert to be dismissed by the user via a close action. This is suitable for non-critical messages that can be acknowledged and removed, such as temporary notifications or contextual feedback.
            <br />
            <br />
            Avoid using dismissible for alerts that represent an ongoing state or require user action, such as errors that still need resolving or system conditions that must remain visible.
            </>
          }
        />

        <ComponentExample className="mb-6">
          <div className="space-y-3">
            {dismissibleVariants.map(({ key, title, description, variant }) => {
              return (
                <Alert key={key} variant={variant} dismissible>
                  <AlertTitle>{title}</AlertTitle>
                  <AlertDescription>{description}</AlertDescription>
                </Alert>
              )
            })}
          </div>
        </ComponentExample>

        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={dismissibleSnippet}
            showCopyButton
            copyLabel="Copy example"
          />
        </ComponentExample>
      </PageSection>
    </div>
  )
}
