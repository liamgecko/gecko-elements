import { AvatarGroup } from "@gecko/ui/components/avatar-group";
import { Code } from "@gecko/ui/components/code";
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

const sampleItems = [
  {
    id: "gecko-engage",
    name: "Gecko Engage",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: "alice-brown",
    name: "Alice Brown",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: "charlie-davis",
    name: "Charlie Davis",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: "eve-foster",
    name: "Eve Foster",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: "grace-hill",
    name: "Grace Hill",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
];

const itemsSnippet = (items: typeof sampleItems) =>
  items
    .map(
      ({ id, name, src }) =>
        `    { id: "${id}", name: "${name}", src: "${src}" },`,
    )
    .join("\n");

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;

export function AvatarGroupPage() {
  const importSnippet = `import { AvatarGroup } from "@gecko/ui/components/avatar-group"`;

  const basicExampleSnippet = `<AvatarGroup
  items={[
${itemsSnippet(sampleItems.slice(0, 4))}
  ]}
/>`;

  const overflowSnippet = `<AvatarGroup
  items={[
${itemsSnippet(sampleItems)}
  ]}
  maxVisible={3}
/>`;

  const sizesSnippet = `<AvatarGroup
  items={people}
  maxVisible={3}
  size="xs|sm|md|lg|xl|2xl|3xl"
/>`;

  const tooltipsSnippet = `<AvatarGroup
  items={[
${itemsSnippet(sampleItems.slice(0, 4))}
  ]}
  tooltips
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Avatar group"
        description="The Avatar group shows several people as overlapping avatars. Use it when more than one person is involved."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Avatar group when more than one person must show together — for
            example assignees on a conversation. Do not use it for a single
            person.
            <br />
            <br />
            Avoid using it for one person; use an{" "}
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> instead.
            Do not use it as a cluster of icons or logos that are not people.
            Omit <Code>size</Code> for standard use and follow the same size
            conventions as{" "}
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import AvatarGroup to show several people together."
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
      </MainSection>

      <MainSection
        id="basic"
        title="Basic example"
        description={
          <>
            Pass people in the <Code>items</Code> array. Use this when everyone
            in the group should be visible.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <AvatarGroup items={sampleItems.slice(0, 4)} />
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
        id="with-overflow"
        title="With overflow"
        description={
          <>
            Set <Code>maxVisible</Code> when the group is too large to show in
            full. Avatar group adds the count automatically and lists the extra
            people in a popover.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <AvatarGroup items={sampleItems} maxVisible={3} />
            <Code
              variant="block"
              language="tsx"
              code={overflowSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="sizes"
        title="Sizes"
        description={
          <>
            Set the size with the <Code>size</Code> prop. Use a size that
            matches the surrounding layout — smaller in dense lists, larger in
            headers and summaries.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col gap-6">
              {sizes.map((size) => (
                <div key={size} className="flex items-center gap-4">
                  <span className="w-8 text-2xs text-muted-foreground">
                    {size}
                  </span>
                  <AvatarGroup items={sampleItems} maxVisible={3} size={size} />
                </div>
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
      </MainSection>

      <MainSection
        id="with-tooltips"
        title="With tooltips"
        description={
          <>
            Shows each visible person’s name on hover and keyboard focus using
            the <Code>tooltips</Code> prop. Tooltips are supplementary: Avatar
            group always exposes each person’s name to assistive technology.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <AvatarGroup items={sampleItems.slice(0, 4)} tooltips />
            <Code
              variant="block"
              language="tsx"
              code={tooltipsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Provide people and let Avatar group own identity, overlap, tooltips, and overflow."
      >
        <DocsDoDont
          doItems={[
            <>
              Give every person a stable <Code>id</Code> and <Code>name</Code>.
              Add <Code>src</Code> when a photo is available.
            </>,
            <>
              Let Avatar group derive the approved initials from each person’s{" "}
              <Code>name</Code>.
            </>,
            <>
              Set <Code>maxVisible</Code> when the group is too large to show in
              full.
            </>,
            <>
              Use <Code>tooltips</Code> when everyone is visible but names are
              not written beside them.
            </>,
            <>
              Omit <Code>size</Code> for standard use. Set it when the
              surrounding layout requires another approved Avatar size.
            </>,
          ]}
          dontItems={[
            <>
              Don’t override overlap, radius, or size with{" "}
              <Code>className</Code>. Use <Code>size</Code>.
            </>,
            <>
              Don’t use it for one person. Use an{" "}
              <DocsPageLink to="/components/avatar">Avatar</DocsPageLink>.
            </>,
            <>Don’t use it for logos or icons that are not people.</>,
            <>
              Don’t set <Code>maxVisible</Code> when everyone should stay
              visible.
            </>,
            <>
              Don’t treat tooltips as the accessible name or use them for people
              hidden behind overflow. The extra people are listed in the
              popover.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Avatar group."
      >
        <DocsApiTable
          rows={[
            {
              name: "items",
              type: "AvatarGroupItem[]",
              description:
                "People to show in order. Every item requires a stable id and name; src is optional.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "default"',
              defaultValue: '"default"',
              description:
                "Uses the same values and diameters as Avatar. default maps to xl.",
            },
            {
              name: "maxVisible",
              type: "number",
              description:
                "Maximum visible people. When exceeded, Avatar group adds a count button and popover automatically.",
            },
            {
              name: "tooltips",
              type: "boolean",
              defaultValue: "false",
              description:
                "Shows each visible person’s name on hover and keyboard focus.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/avatar">
                Shadcn Avatar documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/avatar">
                Base UI Avatar API
              </DocsExternalLink>{" "}
              for the underlying avatar composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different control when the Avatar group is the wrong shape for the job."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/avatar">Avatar</DocsPageLink> — when
            there is only one person.
          </li>
          <li>
            <DocsPageLink to="/components/tooltip">Tooltip</DocsPageLink> — when
            you need a name on a single avatar, not a group. Pair this group
            with <Code>tooltips</Code> instead of wrapping each face yourself.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
