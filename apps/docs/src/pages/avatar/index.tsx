import {
  Avatar,
  AvatarDescription,
  AvatarImage,
  AvatarLabel,
} from "@gecko/ui/components/avatar";
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

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;

const avatarSrc =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces";

export function AvatarPage() {
  const importSnippet = `import {
  Avatar,
  AvatarDescription,
  AvatarImage,
  AvatarLabel,
} from "@gecko/ui/components/avatar"`;

  const compositionSnippet = `Avatar
├── AvatarImage
├── AvatarLabel
└── AvatarDescription`;

  const defaultSnippet = `<Avatar name="Gecko Engage" />

<Avatar name="Gecko Engage">
  <AvatarImage src="${avatarSrc}" />
</Avatar>`;

  const sizesSnippet = `<Avatar name="Gecko Engage" size="xs|sm|md|lg|xl|2xl|3xl" />`;

  const imageSnippet = `<Avatar name="Gecko Engage">
  <AvatarImage src="${avatarSrc}" />
</Avatar>`;

  const statusSnippet = `<Avatar name="Gecko Engage" status="online|unavailable|offline" />`;

  const notificationSnippet = `<Avatar name="Gecko Engage" status="online" notification />`;

  const labelSnippet = `<Avatar name="Gecko Engage">
  <AvatarLabel>Gecko Engage</AvatarLabel>
</Avatar>`;

  const labelDescriptionSnippet = `<Avatar name="Gecko Engage" size="xs|sm|md|lg|xl|2xl|3xl">
  <AvatarLabel>Gecko Engage</AvatarLabel>
  <AvatarDescription>gecko@geckoengage.com</AvatarDescription>
</Avatar>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Avatar"
          description="The Avatar component represents a person or account. It shows a photo when one is available, and initials when it is not, so people stay identifiable."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Avatar whenever displaying a user — especially in Data table
              “created by” columns. Initials are enough when there is no photo.
              <br />
              <br />
              Avoid using it for generic icons, product logos, or decorative
              images that are not a person. For several people together (for
              example conversation assignees), use an{" "}
              <DocsPageLink to="/components/avatar-group">
                Avatar group
              </DocsPageLink>
              .
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Avatar and its parts to compose a profile image."
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
          description="The Avatar owns its automatic fallback. An optional image, name label, and supporting line can be added."
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

      <PageSection id="default" label="Default avatar">
        <PageSectionHeader
          title="Default avatar"
          description={
            <>
              Pass the person’s full name and Avatar generates the correct
              initials automatically. Add <Code>AvatarImage</Code> when a photo
              is available. Use this as the baseline wherever a person needs to
              be recognised.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-6">
              <Avatar name="Gecko Engage" />
              <Avatar name="Gecko Engage">
                <AvatarImage src={avatarSrc} />
              </Avatar>
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
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description={
            <>
              Set the size with the <Code>size</Code> prop. Omit it for the
              standard avatar size. Use a smaller size in dense lists and
              messages, and reserve the largest sizes for prominent account or
              profile displays.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-6">
              {sizes.map((size) => (
                <Avatar key={size} name="Gecko Engage" size={size} />
              ))}
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

      <PageSection id="image" label="With image">
        <PageSectionHeader
          title="With image"
          description={
            <>
              Shows a photo using <Code>AvatarImage</Code> with a{" "}
              <Code>src</Code>. Avatar automatically shows initials if the photo
              cannot load.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Avatar name="Gecko Engage">
              <AvatarImage src={avatarSrc} />
            </Avatar>
            <Code
              variant="block"
              language="tsx"
              code={imageSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="status" label="Status">
        <PageSectionHeader
          title="Status"
          description={
            <>
              Shows availability using the <Code>status</Code> prop. Avatar
              automatically renders the approved badge at the bottom right and
              exposes the status to assistive technology. The example contains
              every approved status.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-8">
              <Avatar name="Gecko Engage" status="online" />
              <Avatar name="Gecko Engage" status="unavailable" />
              <Avatar name="Gecko Engage" status="offline" />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={statusSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="notification" label="Notification">
        <PageSectionHeader
          title="Notification"
          description={
            <>
              Shows unread activity using the <Code>notification</Code> prop.
              Avatar automatically renders its badge at the top left, so it can
              appear alongside a bottom-right status badge without overlap.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Avatar name="Gecko Engage" status="online" notification />
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

      <PageSection id="label-only" label="Label">
        <PageSectionHeader
          title="Label"
          description={
            <>
              Adds a name beside the avatar using <Code>AvatarLabel</Code>. Use
              this in lists and headers where the photo alone is not enough.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Avatar name="Gecko Engage">
              <AvatarLabel>Gecko Engage</AvatarLabel>
            </Avatar>
            <Code
              variant="block"
              language="tsx"
              code={labelSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="label-description" label="Label and description">
        <PageSectionHeader
          title="Label and description"
          description={
            <>
              Adds a name and supporting line using <Code>AvatarLabel</Code> and{" "}
              <Code>AvatarDescription</Code>. Use this when extra context helps
              someone tell people apart.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-6">
              {sizes.map((size) => (
                <Avatar key={size} name="Gecko Engage" size={size}>
                  <AvatarLabel>Gecko Engage</AvatarLabel>
                  <AvatarDescription>gecko@geckoengage.com</AvatarDescription>
                </Avatar>
              ))}
            </div>
            <Code
              variant="block"
              language="tsx"
              code={labelDescriptionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use the approved properties for identity, availability, unread activity, and scale."
        />
        <DocsDoDont
          doItems={[
            <>
              Always pass the full <Code>name</Code> so Avatar can generate
              initials and expose the person’s identity.
            </>,
            <>
              Add <Code>AvatarImage</Code> with a <Code>src</Code> when a photo
              is available.
            </>,
            <>
              Omit <Code>size</Code> for standard use. Set it when a documented
              layout needs a different scale.
            </>,
            <>
              Use <Code>status</Code> when availability helps, and{" "}
              <Code>notification</Code> for unread activity.
            </>,
            <>
              Add <Code>AvatarLabel</Code> and <Code>AvatarDescription</Code>{" "}
              when the photo alone is not enough.
            </>,
          ]}
          dontItems={[
            <>
              Don’t override size or radius with <Code>className</Code>. Use{" "}
              <Code>size</Code>.
            </>,
            <>
              Don’t use Avatar for logos or decorative images that are not a
              person or account.
            </>,
            <>
              Don’t calculate or supply initials yourself. Avatar owns its
              fallback.
            </>,
            <>
              Don’t compose or style badges manually. Use <Code>status</Code>{" "}
              and <Code>notification</Code>.
            </>,
            <>
              Don’t use Avatar for several people. Use an{" "}
              <DocsPageLink to="/components/avatar-group">
                Avatar group
              </DocsPageLink>
              .
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Avatar."
        />
        <DocsApiTable
          rows={[
            {
              name: "name",
              type: "string",
              description:
                "Required person or account name. Generates the fallback initials and accessible identity.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "default"',
              defaultValue: '"default"',
              description:
                "Diameter. default maps to xl. Omit for standard use; use md in dense lists and messages.",
            },
            {
              name: "status",
              type: '"online" | "unavailable" | "offline"',
              description: "Availability marker on the avatar.",
            },
            {
              name: "notification",
              type: "boolean",
              defaultValue: "false",
              description:
                "Top-left badge indicating unread activity. May be combined with status.",
            },
            {
              name: "AvatarImage src",
              type: "string",
              description: "On AvatarImage. Optional profile-photo URL.",
            },
            {
              name: "AvatarImage alt",
              type: "string",
              description:
                "Optional. Defaults to an empty value because Avatar itself exposes the accessible name.",
            },
            {
              name: "AvatarLabel children",
              type: "React.ReactNode",
              description:
                "Optional primary identity text beside the avatar. Must be a direct child of Avatar.",
            },
            {
              name: "AvatarDescription children",
              type: "React.ReactNode",
              description:
                "Optional supporting identity text beside the avatar. Must be a direct child of Avatar.",
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
              <DocsExternalLink href="https://base-ui.com/react/components/avatar">
                Base UI Avatar API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/avatar">
                Shadcn Avatar documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different control when the Avatar is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/avatar-group">
              Avatar group
            </DocsPageLink>{" "}
            — when several people need to be shown together.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
