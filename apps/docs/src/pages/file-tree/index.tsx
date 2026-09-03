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
import { Code } from "@gecko/ui/components/code";
import { FileTree } from "@gecko/ui/components/file-tree";
import type { FileTreeNode } from "@gecko/ui/components/file-tree";

const fileTreeNodes: FileTreeNode[] = [
  {
    id: "components",
    label: "components",
    type: "folder",
    children: [
      {
        id: "ui",
        label: "ui",
        type: "folder",
        children: [
          { id: "button.tsx", label: "button.tsx", type: "file" },
          { id: "card.tsx", label: "card.tsx", type: "file" },
          { id: "dialog.tsx", label: "dialog.tsx", type: "file" },
          { id: "input.tsx", label: "input.tsx", type: "file" },
        ],
      },
      { id: "login-form.tsx", label: "login-form.tsx", type: "file" },
      { id: "register-form.tsx", label: "register-form.tsx", type: "file" },
    ],
  },
  {
    id: "lib",
    label: "lib",
    type: "folder",
    children: [
      { id: "utils.ts", label: "utils.ts", type: "file" },
      { id: "api.ts", label: "api.ts", type: "file" },
    ],
  },
  { id: "README.md", label: "README.md", type: "file" },
  { id: ".gitignore", label: ".gitignore", type: "file" },
];

export function FileTreePage() {
  const importSnippet = `import { FileTree } from "@gecko/ui/components/file-tree"
import type { FileTreeNode } from "@gecko/ui/components/file-tree"`;

  const basicExampleSnippet = `<FileTree
  nodes={nodes}
  defaultExpandedIds={["components", "ui"]}
  aria-label="Project files"
/>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="File tree"
          description="The File tree shows folders and files in a nested list. Folders expand and collapse; files sit at the leaves."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use File tree when people need to scan a nested folder structure —
              for example a website map for AI scraping. Pass a tree of nodes
              with folder and file types.
              <br />
              <br />
              File tree is not currently used in Gecko product UI; adopt it only
              for nested structure browsing. Avoid using it for a flat list, or
              when people need to pick a file to upload — that is{" "}
              <DocsPageLink to="/components/attachment">
                Attachment
              </DocsPageLink>{" "}
              or{" "}
              <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink>.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import FileTree and the node type to render a hierarchy."
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

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              A nested list using the <Code>nodes</Code> prop. Each node has an{" "}
              <Code>id</Code>, <Code>label</Code>, and <Code>type</Code> of{" "}
              <Code>folder</Code> or <Code>file</Code>. Use this when the
              hierarchy is already known.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-md">
              <FileTree
                nodes={fileTreeNodes}
                defaultExpandedIds={["components", "ui"]}
                aria-label="Project files"
              />
            </div>
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

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use a clear node hierarchy and preserve the meaning of folders and files."
        />
        <DocsDoDont
          doItems={[
            <>
              Give every node a unique <Code>id</Code> and a concise{" "}
              <Code>label</Code>.
            </>,
            <>
              Use <Code>type=&quot;folder&quot;</Code> for expandable branches
              and <Code>type=&quot;file&quot;</Code> for leaves.
            </>,
            <>
              Use <Code>defaultExpandedIds</Code> only for folders that should
              be visible on first render.
            </>,
            <>Keep nesting shallow enough to scan without losing context.</>,
          ]}
          dontItems={[
            <>Don’t use a File tree for a flat list.</>,
            <>Don’t add children to nodes that are presented as files.</>,
            <>
              Don’t add tree roles or arrow-key handlers; File tree uses native
              nested lists and disclosure buttons.
            </>,
            <>
              Don’t use it to upload files. Use a{" "}
              <DocsPageLink to="/components/file-field">
                File field
              </DocsPageLink>
              .
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on File tree."
        />
        <DocsApiTable
          rows={[
            {
              name: "nodes",
              type: "readonly FileTreeNode[]",
              description:
                'Nested items with a unique id, label, and type of "folder" or "file". Only folders accept children.',
            },
            {
              name: "defaultExpandedIds",
              type: "readonly string[]",
              description:
                "Folder ids at any depth that start expanded on first render.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              File tree uses Gecko Collapsible internally. See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/collapsible">
                Shadcn Collapsible documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/collapsible">
                Base UI Collapsible API
              </DocsExternalLink>{" "}
              for the underlying disclosure behaviour.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different component when the task is choosing a local file."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/file-field">File field</DocsPageLink>{" "}
            — when someone needs to choose a file from their device.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
