"use client"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { FileTree } from "@/components/ui/file-tree"
import type { FileTreeNode } from "@/components/ui/file-tree"

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
]

export function FileTreePage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">File tree</h1>
          <p className="text-sm text-muted-foreground">
            A hierarchical file tree built with nested collapsibles.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Supports nested folders, folder/file icons, and connector borders.
          </p>
          <ComponentExample>
            <div className="max-w-md">
              <FileTree
                nodes={fileTreeNodes}
              />
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

