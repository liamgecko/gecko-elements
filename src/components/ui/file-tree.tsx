"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export type FileTreeNode = {
  id: string
  label: string
  type: "folder" | "file"
  children?: FileTreeNode[]
}

export type FileTreeProps = React.ComponentProps<"div"> & {
  nodes: FileTreeNode[]
  defaultExpandedIds?: string[]
}

const treeRowVariants = cva(
  "relative flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm leading-5 select-none text-foreground",
  {
    variants: {
      kind: {
        folder:
          "border border-transparent hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-ring",
        file: "",
      },
    },
    defaultVariants: {
      kind: "file",
    },
  }
)

function FileTreeList({
  nodes,
  depth,
  defaultExpandedIds,
}: {
  nodes: FileTreeNode[]
  depth: number
  defaultExpandedIds?: string[]
}) {
  if (nodes.length === 0) return null

  return (
    <div
      data-slot="file-tree-list"
      className="relative"
      style={{ paddingLeft: depth === 0 ? undefined : `${depth * 18}px` }}
    >
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1

        if (node.type === "folder") {
          const defaultOpen =
            depth === 0 && (defaultExpandedIds ?? []).includes(node.id)
          return (
            <Collapsible
              key={node.id}
              data-slot="file-tree-folder"
              defaultOpen={defaultOpen}
              className={cn(
                "relative",
                depth > 0 &&
                  "before:absolute before:left-[-10px] before:top-0 before:bottom-0 before:w-px before:bg-border"
              )}
            >
              <div
                data-slot="file-tree-row-wrap"
                data-depth={depth}
                data-last={isLast ? "true" : "false"}
                className={cn(
                  "relative",
                  depth > 0 &&
                    "after:absolute after:left-[-10px] after:top-1/2 after:h-px after:w-3 after:bg-border"
                )}
              >
                <CollapsibleTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        treeRowVariants({ kind: "folder" }),
                        "group w-full justify-start transition-colors duration-150 hover:bg-gray-50 aria-expanded:bg-transparent aria-expanded:hover:bg-gray-50"
                      )}
                    >
                      <ChevronRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                        aria-hidden="true"
                      />
                      <Folder
                        className="size-4 shrink-0 text-muted-foreground group-data-[state=open]:hidden"
                        aria-hidden="true"
                      />
                      <FolderOpen
                        className="hidden size-4 shrink-0 text-muted-foreground group-data-[state=open]:inline"
                        aria-hidden="true"
                      />
                      <span className="truncate">{node.label}</span>
                    </Button>
                  }
                />
              </div>

              <CollapsibleContent className="pb-0 pt-0">
                <FileTreeList nodes={node.children ?? []} depth={depth + 1} />
              </CollapsibleContent>
            </Collapsible>
          )
        }

        return (
          <div
            key={node.id}
            data-slot="file-tree-file"
            data-depth={depth}
            data-last={isLast ? "true" : "false"}
            className={cn(
              "relative",
              depth > 0 &&
                "before:absolute before:left-[-10px] before:top-0 before:bottom-0 before:w-px before:bg-border",
              depth > 0 &&
                "after:absolute after:left-[-10px] after:top-1/2 after:h-px after:w-3 after:bg-border",
              depth > 0 && isLast && "before:bottom-1/2"
            )}
          >
            <div className={cn(treeRowVariants({ kind: "file" }))}>
              <span className="size-4 shrink-0" aria-hidden="true" />
              <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="truncate">{node.label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function FileTree({
  className,
  nodes,
  defaultExpandedIds,
  ...props
}: FileTreeProps) {
  return (
    <div data-slot="file-tree" className={cn("w-full", className)} {...props}>
      <FileTreeList nodes={nodes} depth={0} defaultExpandedIds={defaultExpandedIds} />
    </div>
  )
}

