"use client";

import { DataTableTextCell } from "./data-table-text-cell";

import type { Column } from "@tanstack/react-table";
import ArrowDown from "@hugeicons/core-free-icons/ArrowDown02Icon";
import ArrowUp from "@hugeicons/core-free-icons/ArrowUp02Icon";
import ArrowUpDown from "@hugeicons/core-free-icons/ArrowUpDownIcon";
import CircleHelp from "@hugeicons/core-free-icons/HelpCircleIcon";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

import { Button } from "@geckolabs/elements/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip";
import { cn } from "@geckolabs/elements/lib/utils";

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  helpText?: React.ReactNode;
  sortLabels?: { ascending: string; descending: string; clear: string };
  className?: string;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  helpText,
  sortLabels,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort();
  const nextSortOrder = column.getNextSortingOrder();
  const sortLabel =
    nextSortOrder === "asc"
      ? (sortLabels?.ascending ?? `Sort ${title} ascending`)
      : nextSortOrder === "desc"
        ? (sortLabels?.descending ?? `Sort ${title} descending`)
        : (sortLabels?.clear ?? `Clear sorting for ${title}`);

  return (
    <div className={cn("flex min-w-0 items-center gap-1", className)}>
      <DataTableTextCell>{title}</DataTableTextCell>

      <div className="flex shrink-0 items-center">
        {helpText ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Help: ${title}`}
                />
              }
            >
              <HugeiconsIcon icon={CircleHelp} className="size-3 shrink-0" />
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              {helpText}
            </TooltipContent>
          </Tooltip>
        ) : null}

        {canSort ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="hover:bg-foreground/5"
            onClick={column.getToggleSortingHandler()}
            aria-label={sortLabel}
          >
            {column.getIsSorted() === "desc" ? (
              <HugeiconsIcon icon={ArrowDown} className="size-3 shrink-0" />
            ) : column.getIsSorted() === "asc" ? (
              <HugeiconsIcon icon={ArrowUp} className="size-3 shrink-0" />
            ) : (
              <HugeiconsIcon icon={ArrowUpDown} className="size-3 shrink-0" />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
