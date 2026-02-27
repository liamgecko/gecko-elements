import { useState } from "react"
import { Bell, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Badge,
  NotificationCount,
} from "@/components/ui/badge"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

const sizes = ["xs", "sm", "md", "lg", "xl"] as const

const sizeLabels: Record<(typeof sizes)[number], string> = {
  xs: "Extra small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
}

export function BadgePage() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Badge</h1>
          <p className="text-sm text-muted-foreground">
            A small badge component for displaying status, labels, or counts.
          </p>
        </PageSection>

        <PageSection id="default" label="Default badge">
          <h2 className="text-lg font-semibold">Default badge</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A basic badge that displays a message.
          </p>
          <ComponentExample className="mb-6">
            <Badge variant="secondary">Default badge</Badge>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Badges come in different variants for different use cases.
          </p>

          <h3 className="text-base font-semibold mt-6">Colours</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Semantic variants for status, labels, and emphasis.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="light">Light</Badge>
            </div>
          </ComponentExample>

          <h3 className="text-base font-semibold mt-6">Bordered</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Use bordered for a visible border around the badge.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge bordered>Primary</Badge>
              <Badge variant="secondary" bordered>Secondary</Badge>
              <Badge variant="info" bordered>Info</Badge>
              <Badge variant="warning" bordered>Warning</Badge>
              <Badge variant="destructive" bordered>Destructive</Badge>
              <Badge variant="success" bordered>Success</Badge>
              <Badge variant="light" bordered>Light</Badge>
            </div>
          </ComponentExample>

          <h3 className="text-base font-semibold mt-6">Rounded</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Rounded badges are pill-shaped.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge rounded>Primary</Badge>
              <Badge variant="secondary" rounded>Secondary</Badge>
              <Badge variant="info" rounded>Info</Badge>
              <Badge variant="warning" rounded>Warning</Badge>
              <Badge variant="destructive" rounded>Destructive</Badge>
              <Badge variant="success" rounded>Success</Badge>
              <Badge variant="light" rounded>Light</Badge>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Badges come in five different sizes to suit various use cases.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" size="xs">
                Extra small
              </Badge>
              <Badge variant="secondary" size="sm">
                Small
              </Badge>
              <Badge variant="secondary" size="md">
                Medium
              </Badge>
              <Badge variant="secondary" size="lg">
                Large
              </Badge>
              <Badge variant="secondary" size="xl">
                Extra large
              </Badge>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="with-icons" label="With icons">
          <h2 className="text-lg font-semibold">With icons</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Badges can include icons in different positions to enhance their
            meaning and visual appeal.
          </p>

          <h3 className="text-base font-semibold mt-6">Left icon</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Place an icon on the left side of the badge text.
          </p>
          <ComponentExample className="mb-6">
            <Badge variant="secondary" leftIcon={<Bell />}>
              Icon left
            </Badge>
          </ComponentExample>

          <h3 className="text-base font-semibold mt-6">Right icon</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Place an icon on the right to indicate action or direction.
          </p>
          <ComponentExample className="mb-6">
            <Badge variant="secondary" rightIcon={<ChevronRight />}>
              Icon right
            </Badge>
          </ComponentExample>

          <h3 className="text-base font-semibold mt-6">Both icons</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Use icons on both sides for a more complex badge.
          </p>
          <ComponentExample className="mb-6">
            <Badge
              variant="secondary"
              leftIcon={<Bell />}
              rightIcon={<ChevronRight />}
            >
              Both icons
            </Badge>
          </ComponentExample>

          <h3 className="text-base font-semibold mt-6">Icon only</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            A compact badge with just an icon for simple status indicators.
          </p>
          <ComponentExample className="mb-6">
            <Badge variant="secondary" leftIcon={<Bell />} />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-avatar" label="With avatar">
          <h2 className="text-lg font-semibold">With avatar</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Badges can include avatars that automatically size based on the
            badge size.
          </p>

          <h3 className="text-base font-semibold mt-6">Avatar sizes</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Avatars automatically adjust their size based on the badge size.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {sizes.map((size) => (
                <Badge key={size} variant="secondary" size={size}>
                  <Avatar>
                    <AvatarImage
                      src="https://picsum.photos/seed/avatar/200"
                      alt=""
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {sizeLabels[size]}
                </Badge>
              ))}
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="dismissible" label="Dismissible">
          <h2 className="text-lg font-semibold">Dismissible</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Badges can include a dismiss button to remove them from the
            interface.
          </p>
          <ComponentExample className="mb-6">
            {!dismissed ? (
              <Badge
                variant="secondary"
                dismiss
                onDismiss={() => setDismissed(true)}
              >
                Dismissible badge
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">
                Badge dismissed.
              </span>
            )}
          </ComponentExample>
        </PageSection>

        <PageSection id="notification" label="Notification indicator">
          <h2 className="text-lg font-semibold">Notification indicator</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A small circular badge positioned in the top-right corner of a
            badge, perfect for showing unread counts or notifications (e.g. 9+
            when ≥10).
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="secondary">
                Inbox
                <NotificationCount count={3} />
              </Badge>
              <Badge variant="secondary">
                Messages
                <NotificationCount count={12} />
              </Badge>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="as-button" label="As button">
          <h2 className="text-lg font-semibold">As button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Badges can be rendered as buttons, making them interactive and
            clickable.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" asButton onClick={() => {}}>
                Secondary
              </Badge>
              <Badge variant="info" asButton onClick={() => {}}>
                Info
              </Badge>
              <Badge variant="warning" asButton onClick={() => {}}>
                Warning
              </Badge>
              <Badge variant="destructive" asButton onClick={() => {}}>
                Destructive
              </Badge>
              <Badge variant="success" asButton onClick={() => {}}>
                Success
              </Badge>
              <Badge variant="light" asButton onClick={() => {}}>
                Light
              </Badge>
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
