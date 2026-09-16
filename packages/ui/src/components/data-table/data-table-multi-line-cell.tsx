"use client";

import * as React from "react";

import { DataTableTextCell } from "./data-table-text-cell";

import { cn } from "@geckolabs/elements/lib/utils";

export type DataTableMultiLineCellProps = {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

export function DataTableMultiLineCell({
  primary,
  secondary,
  className,
  primaryClassName,
  secondaryClassName,
}: DataTableMultiLineCellProps) {
  return (
    <div
      data-slot="data-table-multi-line-cell"
      className={cn("grid min-w-0 max-w-full gap-0.5", className)}
    >
      <DataTableTextCell className={cn("leading-snug", primaryClassName)}>
        {primary}
      </DataTableTextCell>
      {secondary != null && secondary !== "" ? (
        <DataTableTextCell
          className={cn(
            "min-w-0 text-2xs leading-snug text-muted-foreground",
            secondaryClassName,
          )}
        >
          {secondary}
        </DataTableTextCell>
      ) : null}
    </div>
  );
}
