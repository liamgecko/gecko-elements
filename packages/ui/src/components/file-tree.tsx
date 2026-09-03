"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";

import { Button } from "@gecko/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible";
import { cn } from "@gecko/ui/lib/utils";

export type FileTreeNode =
  | {
      id: string;
      label: string;
      type: "folder";
      children?: readonly FileTreeNode[];
    }
  | {
      id: string;
      label: string;
      type: "file";
      children?: never;
    };

export type FileTreeProps = Omit<React.ComponentProps<"ul">, "children"> & {
  nodes: readonly FileTreeNode[];
  defaultExpandedIds?: readonly string[];
};

const treeRowVariants = cva(
  "relative flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm leading-5 select-none text-foreground",
  {
    variants: {
      kind: {
        folder:
          "border border-transparent hover:bg-muted focus-visible:bg-muted",
        file: "",
      },
    },
    defaultVariants: {
      kind: "file",
    },
  },
);

function FileTreeList({
  nodes,
  depth,
  defaultExpandedIds,
}: {
  nodes: readonly FileTreeNode[];
  depth: number;
  defaultExpandedIds: ReadonlySet<string>;
}) {
  if (nodes.length === 0) return null;

  return (
    <ul
      data-slot="file-tree-list"
      className="relative m-0 list-none p-0 pl-[18px]"
    >
      <FileTreeItems
        nodes={nodes}
        depth={depth}
        defaultExpandedIds={defaultExpandedIds}
      />
    </ul>
  );
}

function FileTreeItems({
  nodes,
  depth,
  defaultExpandedIds,
}: {
  nodes: readonly FileTreeNode[];
  depth: number;
  defaultExpandedIds: ReadonlySet<string>;
}) {
  return nodes.map((node, index) => {
    const isLast = index === nodes.length - 1;
    const itemClasses = cn(
      "relative",
      depth > 0 &&
        "before:absolute before:left-[-10px] before:top-0 before:bottom-0 before:w-px before:bg-border",
      depth > 0 && isLast && "before:bottom-1/2",
    );
    const rowClasses = cn(
      "relative",
      depth > 0 &&
        "after:absolute after:left-[-10px] after:top-1/2 after:h-px after:w-3 after:bg-border",
    );

    if (node.type === "folder") {
      const hasChildren = Boolean(node.children?.length);

      if (!hasChildren) {
        return (
          <li
            key={node.id}
            data-slot="file-tree-folder"
            data-depth={depth}
            data-last={isLast ? "true" : "false"}
            className={itemClasses}
          >
            <div data-slot="file-tree-row-wrap" className={rowClasses}>
              <div className={treeRowVariants({ kind: "file" })}>
                <span className="size-4 shrink-0" aria-hidden="true" />
                <Folder
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="truncate">{node.label}</span>
              </div>
            </div>
          </li>
        );
      }

      return (
        <li
          key={node.id}
          data-slot="file-tree-folder"
          data-depth={depth}
          data-last={isLast ? "true" : "false"}
          className={itemClasses}
        >
          <Collapsible defaultOpen={defaultExpandedIds.has(node.id)}>
            <div data-slot="file-tree-row-wrap" className={rowClasses}>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      treeRowVariants({ kind: "folder" }),
                      "group w-full justify-start transition-colors duration-150 hover:bg-muted aria-expanded:bg-transparent aria-expanded:hover:bg-muted",
                    )}
                  >
                    <ChevronRight
                      className="size-4 shrink-0 text-muted-foreground motion-safe:transition-transform group-aria-expanded:rotate-90"
                      aria-hidden="true"
                    />
                    <Folder
                      className="size-4 shrink-0 text-muted-foreground group-aria-expanded:hidden"
                      aria-hidden="true"
                    />
                    <FolderOpen
                      className="hidden size-4 shrink-0 text-muted-foreground group-aria-expanded:inline"
                      aria-hidden="true"
                    />
                    <span className="truncate">{node.label}</span>
                  </Button>
                }
              />
            </div>

            <CollapsibleContent className="pb-0 pt-0">
              <FileTreeList
                nodes={node.children ?? []}
                depth={depth + 1}
                defaultExpandedIds={defaultExpandedIds}
              />
            </CollapsibleContent>
          </Collapsible>
        </li>
      );
    }

    return (
      <li
        key={node.id}
        data-slot="file-tree-file"
        data-depth={depth}
        data-last={isLast ? "true" : "false"}
        className={itemClasses}
      >
        <div data-slot="file-tree-row-wrap" className={rowClasses}>
          <div className={treeRowVariants({ kind: "file" })}>
            <span className="size-4 shrink-0" aria-hidden="true" />
            <FileText
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="truncate">{node.label}</span>
          </div>
        </div>
      </li>
    );
  });
}

export function FileTree({
  className,
  nodes,
  defaultExpandedIds = [],
  ...props
}: FileTreeProps) {
  const defaultExpandedIdSet = new Set(defaultExpandedIds);

  return (
    <ul
      data-slot="file-tree"
      className={cn("m-0 w-full list-none p-0", className)}
      {...props}
    >
      <FileTreeItems
        nodes={nodes}
        depth={0}
        defaultExpandedIds={defaultExpandedIdSet}
      />
    </ul>
  );
}
