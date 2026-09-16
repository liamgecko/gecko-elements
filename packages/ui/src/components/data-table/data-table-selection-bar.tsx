"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { Row } from "@tanstack/react-table";
import Cancel01Icon from "@hugeicons/core-free-icons/Cancel01Icon";
import EllipsisIcon from "@hugeicons/core-free-icons/EllipsisIcon";
import { Button } from "@geckolabs/elements/components/button";
import { Separator } from "@geckolabs/elements/components/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@geckolabs/elements/components/dropdown-menu";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import { inertProps } from "@geckolabs/elements/lib/inert";
import { useDataTableContext } from "./data-table-context";
import type { DataTableRowAction } from "./data-table";

export type DataTableSelectionBarLabels = {
  label?: string;
  clearSelection?: string;
  selectAll?: string;
  moreActions?: string;
  /** Supply translated domain copy, for example “4 templates selected”. */
  selectedCount?: (count: number) => string;
};
export type DataTableSelectionBarProps = {
  labels?: DataTableSelectionBarLabels;
};
const ghostClasses =
  "hover:bg-selection-bar-hover hover:text-selection-bar-foreground [&[aria-haspopup][aria-expanded=true]]:bg-selection-bar-hover [&[aria-haspopup][aria-expanded=true]]:text-selection-bar-foreground";
const destructiveClasses =
  "[--destructive-muted:var(--destructive-solid)] [--destructive-muted-foreground:var(--destructive-solid-foreground)]";

function BarSeparator() {
  return (
    <Separator
      orientation="vertical"
      className="my-1 shrink-0 bg-selection-bar-border"
    />
  );
}

function SelectionBarSurface({
  labels,
  summary,
  selectedRows,
}: {
  labels?: DataTableSelectionBarLabels;
  summary: string;
  selectedRows: Row<unknown>[];
}) {
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const { table, selectActions, onSelectAction } =
    useDataTableContext<unknown>();
  const regular = React.useMemo(
    () => selectActions.filter((action) => action.variant !== "destructive"),
    [selectActions],
  );
  const destructive = React.useMemo(
    () => selectActions.filter((action) => action.variant === "destructive"),
    [selectActions],
  );
  const barRef = React.useRef<HTMLDivElement>(null);
  const controlsRef = React.useRef<HTMLDivElement>(null);
  const overflowMeasureRef = React.useRef<HTMLButtonElement>(null);
  const overflowRef = React.useRef<HTMLButtonElement>(null);
  const actionRefs = React.useMemo(
    () =>
      new Map(
        selectActions.map((action) => [
          action.id,
          React.createRef<HTMLSpanElement>(),
        ]),
      ),
    [selectActions],
  );
  const [layout, setLayout] = React.useState({
    regular: regular.length,
    destructive: destructive.length,
  });
  const [open, setOpen] = React.useState(false);
  const focusFrame = React.useRef<number | undefined>(undefined);
  React.useEffect(
    () => () => cancelAnimationFrame(focusFrame.current ?? 0),
    [],
  );

  React.useLayoutEffect(() => {
    const bar = barRef.current;
    const host = bar?.closest<HTMLElement>('[data-slot="data-table-root"]');
    if (!bar || !host) return;
    const compute = () => {
      const controls = controlsRef.current?.offsetWidth ?? 0;
      const more = overflowMeasureRef.current?.offsetWidth ?? 0;
      const widths = (actions: DataTableRowAction[]) =>
        actions.map(
          (action) => actionRefs.get(action.id)?.current?.offsetWidth ?? 0,
        );
      const regularWidths = widths(regular),
        destructiveWidths = widths(destructive);
      if (
        !host.clientWidth ||
        !controls ||
        !more ||
        [...regularWidths, ...destructiveWidths].some((width) => !width)
      )
        return;
      const style = getComputedStyle(bar);
      const padding =
        (parseFloat(style.paddingLeft) || 0) +
        (parseFloat(style.paddingRight) || 0) +
        (parseFloat(style.borderLeftWidth) || 0) +
        (parseFloat(style.borderRightWidth) || 0);
      const available = host.clientWidth - padding - 2;
      const groupWidth = (items: number[]) =>
        items.reduce((sum, width) => sum + width, 0) +
        Math.max(0, items.length - 1) * 4;
      const total = (r: number, d: number, overflow: boolean) => {
        const actions = [
          ...regularWidths.slice(0, r),
          ...(overflow ? [more] : []),
        ];
        // Main groups use gap-2 around a 1px separator; action groups use gap-1.
        return (
          controls +
          (actions.length ? 17 + groupWidth(actions) : 0) +
          (d ? 17 + groupWidth(destructiveWidths.slice(0, d)) : 0)
        );
      };
      let r = regular.length,
        d = destructive.length;
      if (total(r, d, false) > available) {
        while (r > 0 && total(r, d, true) > available) r--;
        while (d > 0 && total(r, d, true) > available) d--;
      }
      const hiddenIds = [...regular.slice(r), ...destructive.slice(d)].map(
        (action) => action.id,
      );
      const focused = document.activeElement;
      const focusedAction =
        focused instanceof HTMLElement && bar.contains(focused)
          ? focused.dataset.selectionAction
          : undefined;
      if (focusedAction && hiddenIds.includes(focusedAction)) {
        cancelAnimationFrame(focusFrame.current ?? 0);
        focusFrame.current = requestAnimationFrame(() =>
          overflowRef.current?.focus({ preventScroll: true }),
        );
      }
      if (!hiddenIds.length && open) {
        setOpen(false);
        focusFrame.current = requestAnimationFrame(() =>
          bar
            .querySelector<HTMLButtonElement>("[data-selection-action]")
            ?.focus({ preventScroll: true }),
        );
      }
      setLayout((current) =>
        current.regular === r && current.destructive === d
          ? current
          : { regular: r, destructive: d },
      );
    };
    const observer = new ResizeObserver(compute);
    [
      host,
      controlsRef.current,
      overflowMeasureRef.current,
      ...[...actionRefs.values()].map((ref) => ref.current),
    ].forEach((element) => {
      if (element) observer.observe(element);
    });
    compute();
    return () => {
      observer.disconnect();
    };
  }, [regular, destructive, actionRefs, summary, labels?.selectAll, open]);

  const hidden = [
    ...regular.slice(layout.regular),
    ...destructive.slice(layout.destructive),
  ];
  const matchingRows = table
    .getFilteredRowModel()
    .flatRows.filter((row) => row.getCanSelect());
  const allSelected =
    matchingRows.length === 0 ||
    matchingRows.every((row) => row.getIsSelected());
  const run = (action: DataTableRowAction) => {
    if (isPresent) onSelectAction?.(action.id, { selectedRows });
  };
  const renderAction = (
    action: DataTableRowAction,
    index: number,
    measure = false,
  ) => (
    <span
      key={action.id}
      ref={measure ? actionRefs.get(action.id) : undefined}
      data-selection-measure={measure ? action.id : undefined}
      className="inline-flex shrink-0 items-center gap-1"
    >
      {action.separatorBefore &&
        index > 0 &&
        action.variant !== "destructive" && <BarSeparator />}
      <Button
        type="button"
        variant={action.variant === "destructive" ? "destructive" : "ghost"}
        className={
          action.variant === "destructive" ? destructiveClasses : ghostClasses
        }
        tabIndex={measure ? -1 : undefined}
        data-selection-action={measure ? undefined : action.id}
        onClick={measure ? undefined : () => run(action)}
      >
        {action.icon}
        {action.label}
      </Button>
    </span>
  );
  const controls = (measure = false) => (
    <div
      ref={measure ? controlsRef : undefined}
      data-selection-measure={measure ? "controls" : undefined}
      className={
        measure
          ? "flex w-max items-center gap-2"
          : "flex min-w-0 items-center gap-2"
      }
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        tabIndex={measure ? -1 : undefined}
        className={`shrink-0 ${ghostClasses}`}
        aria-label={labels?.clearSelection ?? "Deselect all items"}
        onClick={
          measure
            ? undefined
            : (event) => {
                const checkbox = event.currentTarget
                  .closest('[data-slot="data-table-root"]')
                  ?.querySelector<HTMLElement>(
                    '[data-slot="data-table-content"] [role="checkbox"]',
                  );
                table.resetRowSelection(true);
                checkbox?.focus({ preventScroll: true });
              }
        }
      >
        <HugeiconsIcon icon={Cancel01Icon} aria-hidden="true" />
      </Button>
      <span className="min-w-0 truncate text-sm font-medium" title={summary}>
        {summary}
      </span>
      <Button
        type="button"
        variant="ghost"
        tabIndex={measure ? -1 : undefined}
        disabled={allSelected}
        className={`min-w-0 truncate ${ghostClasses}`}
        onClick={
          measure
            ? undefined
            : () =>
                table.setRowSelection((current) => {
                  const next = { ...current };
                  matchingRows.forEach((row) => {
                    next[row.id] = true;
                  });
                  return next;
                })
        }
      >
        {labels?.selectAll ?? "Select all"}
      </Button>
    </div>
  );
  return (
    <motion.div
      ref={barRef}
      data-slot="data-table-selection-bar"
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
      transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
      aria-hidden={!isPresent || undefined}
      {...inertProps(!isPresent)}
      role="group"
      aria-label={labels?.label ?? "Selection actions"}
      className="sticky bottom-4 z-20 mx-auto flex w-max max-w-full flex-nowrap items-center gap-2 rounded-lg border border-selection-bar-border bg-selection-bar p-2 text-selection-bar-foreground shadow-lg"
    >
      {controls()}
      {(layout.regular > 0 || hidden.length > 0) && (
        <>
          <BarSeparator />
          <div className="flex shrink-0 items-center gap-1">
            {regular
              .slice(0, layout.regular)
              .map((action, index) => renderAction(action, index))}
            {hidden.length > 0 && (
              <DropdownMenu open={isPresent && open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      ref={overflowRef}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={ghostClasses}
                      aria-label={labels?.moreActions ?? "More actions"}
                    >
                      <HugeiconsIcon icon={EllipsisIcon} aria-hidden="true" />
                    </Button>
                  }
                />
                <DropdownMenuContent side="top" align="end">
                  <DropdownMenuGroup>
                    {hidden.map((action, index) => (
                      <React.Fragment key={action.id}>
                        {index > 0 &&
                          (action.separatorBefore ||
                            (action.variant === "destructive" &&
                              hidden[index - 1].variant !== "destructive")) && (
                            <DropdownMenuSeparator />
                          )}
                        <DropdownMenuItem
                          variant={action.variant}
                          onClick={() => run(action)}
                        >
                          {action.icon}
                          {action.label}
                        </DropdownMenuItem>
                      </React.Fragment>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </>
      )}
      {layout.destructive > 0 && (
        <>
          <BarSeparator />
          <div className="flex shrink-0 items-center gap-1">
            {destructive
              .slice(0, layout.destructive)
              .map((action, index) => renderAction(action, index))}
          </div>
        </>
      )}
      <div
        aria-hidden="true"
        {...inertProps(true)}
        className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
      >
        {controls(true)}
        <Button
          ref={overflowMeasureRef}
          data-selection-measure="overflow"
          variant="ghost"
          size="icon"
          tabIndex={-1}
        >
          <HugeiconsIcon icon={EllipsisIcon} />
        </Button>
        <div className="flex w-max">
          {regular.map((action, index) => renderAction(action, index, true))}
          {destructive.map((action, index) =>
            renderAction(action, index, true),
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** Alternative mass-action presentation, scoped to its DataTableRoot. */
export function DataTableSelectionBar({ labels }: DataTableSelectionBarProps) {
  const { table, selectActions, loading, updating, error } =
    useDataTableContext<unknown>();
  const selectedRows = table.getSelectedRowModel().rows;
  const count = selectedRows.length;
  const summary =
    labels?.selectedCount?.(count) ??
    `${count} ${count === 1 ? "item" : "items"} selected`;
  const visible =
    count > 0 && selectActions.length > 0 && !loading && !updating && !error;
  return (
    <>
      <span role="status" aria-atomic="true" className="sr-only">
        {count > 0 ? summary : ""}
      </span>
      <AnimatePresence initial={false}>
        {visible && (
          <SelectionBarSurface
            key="selection-bar"
            labels={labels}
            summary={summary}
            selectedRows={selectedRows}
          />
        )}
      </AnimatePresence>
    </>
  );
}
