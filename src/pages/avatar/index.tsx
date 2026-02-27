import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

export function AvatarPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Avatar</h1>
          <p className="text-sm text-muted-foreground">
            User profile image with optional fallback, status, notification
            indicator, and label or description.
          </p>
        </PageSection>
        <PageSection id="default" label="Default avatar">
          <h2 className="text-lg font-semibold">Default avatar</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default avatars with initials only or with an image. When no image
            loads, the fallback initials are shown.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-6">
              <Avatar>
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/avatar/200" alt="" />
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
            </div>
          </ComponentExample>
        </PageSection>
        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Seven size variants from xs (16px) to 3xl (48px). Use the size prop
            to match your layout.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-end gap-6">
              {sizes.map((size) => (
                <Avatar key={size} size={size}>
                  <AvatarFallback>GE</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </ComponentExample>
        </PageSection>
        <PageSection id="image" label="With image">
          <h2 className="text-lg font-semibold">With image</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use AvatarImage with a src. Provide AvatarFallback for when the
            image fails to load or while it is loading.
          </p>
          <ComponentExample className="mb-6">
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/avatar/200" alt="" />
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
          </ComponentExample>
        </PageSection>
        <PageSection id="status" label="Status">
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Optional status indicator (online, unavailable, offline) as a dot on
            the bottom-right of the avatar.
          </p>
          <ComponentExample className="mb-6">
            <div className="flex flex-wrap items-center gap-8">
              <Avatar status="online">
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <Avatar status="unavailable">
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <Avatar status="offline">
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
            </div>
          </ComponentExample>
        </PageSection>
        <PageSection id="notification" label="Notification">
          <h2 className="text-lg font-semibold">Notification</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Show a notification badge (red dot) on the top-left of the avatar
            when the user has unread or pending items.
          </p>
          <ComponentExample className="mb-6">
            <Avatar notification>
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
          </ComponentExample>
        </PageSection>
        <PageSection id="label-only" label="Label">
          <h2 className="text-lg font-semibold">Label</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pair the avatar with a label. Label text size scales with the avatar
            size.
          </p>
          <ComponentExample className="mb-6">
            <Avatar label="Gecko Engage">
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
          </ComponentExample>
        </PageSection>
        <PageSection id="label-description" label="Label and description">
          <h2 className="text-lg font-semibold">Label and description</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add a description line (e.g. email or role) below the label for more
            context.
          </p>
          <ComponentExample>
            <Avatar
              label="Gecko Engage"
              description="gecko@geckoengage.com"
            >
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
