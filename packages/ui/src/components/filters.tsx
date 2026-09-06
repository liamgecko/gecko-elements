"use client";

import * as React from "react";
import ArrowDownWideNarrow from "@hugeicons/core-free-icons/ArrowDownWideNarrowIcon";
import Check from "@hugeicons/core-free-icons/CheckIcon";
import Funnel from "@hugeicons/core-free-icons/FunnelIcon";
import ListFilterPlus from "@hugeicons/core-free-icons/ListFilterPlusIcon";
import X from "@hugeicons/core-free-icons/XIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { Button } from "@gecko/ui/components/button";
import { Counter } from "@gecko/ui/components/counter";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { Calendar } from "@gecko/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover";
import { Separator } from "@gecko/ui/components/separator";
import { cn } from "@gecko/ui/lib/utils";
import { renderGeckoIcon, type GeckoIcon } from "@gecko/ui/lib/icon";
import type { DateRange } from "react-day-picker";

const FILTER_TRIGGER_ICONS = {
  funnel: Funnel,
  Funnel,
  "arrow-down-wide-narrow": ArrowDownWideNarrow,
  ArrowDownWideNarrow,
  "list-filter-plus": ListFilterPlus,
  ListFilterPlus,
} as const satisfies Record<string, GeckoIcon>;

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterCategory = {
  id: string;
  label: string;
  options: readonly FilterOption[];
  /** When false, the submenu has no search field (e.g. short static lists). @default true */
  searchable?: boolean;
  searchPlaceholder?: string;
};

export type SortOption = {
  value: string;
  label: string;
};

export type SortProps = React.ComponentProps<"div"> & {
  options: readonly SortOption[];
  value: string;
  onValueChange: (value: string) => void;
  /** Button label. Also used as the aria-label when `trigger=\"icon\"`. */
  triggerLabel?: string;
  /** Default renders icon + label; icon renders an icon-only trigger. */
  trigger?: "default" | "icon";
  /** Hugeicons glyph, compatible SVG icon component, or a curated string alias. */
  triggerIcon?: string | GeckoIcon;
};

export type FilterOperator = "is" | "is not" | "is any of";

export type FilterProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  categories: readonly FilterCategory[];
  /** Button label. Also used as the aria-label when `trigger=\"icon\"`. */
  triggerLabel?: string;
  /** Default renders icon + label; icon renders an icon-only trigger. */
  trigger?: "default" | "icon";
  /** Hugeicons glyph, compatible SVG icon component, or a curated string alias (e.g. `"funnel"`). */
  triggerIcon?: string | GeckoIcon;
  /**
   * Called when selected values or per-category operators change.
   * Second argument is required for negated filters (`is not`).
   */
  onChange?: (
    values: Record<string, string[]>,
    operators: Record<string, FilterOperator>,
  ) => void;
  /** Controlled selections keyed by category id. */
  values?: Record<string, string[]>;
  /** Controlled operators keyed by category id. */
  operators?: Record<string, FilterOperator>;
  /** Initial selected values (uncontrolled). */
  defaultValues?: Record<string, string[]>;
  /** Initial per-category operators (uncontrolled). */
  defaultOperators?: Record<string, FilterOperator>;
  /** Default shows active filter chips; condensed shows a counter on the trigger. */
  variant?: "default" | "condensed";
};

function toPascalCase(input: string) {
  return input
    .trim()
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function resolveFilterIcon(icon: unknown): GeckoIcon {
  if (!icon) return ListFilterPlus;

  if (typeof icon === "function" || typeof icon === "object") {
    return icon as GeckoIcon;
  }

  if (typeof icon !== "string") return ListFilterPlus;

  const raw = icon.trim();
  const direct = FILTER_TRIGGER_ICONS[raw as keyof typeof FILTER_TRIGGER_ICONS];
  if (direct) return direct;

  const pascal = toPascalCase(raw);
  const resolved =
    FILTER_TRIGGER_ICONS[pascal as keyof typeof FILTER_TRIGGER_ICONS];
  if (resolved) return resolved;

  return ListFilterPlus;
}

type FilterUiState = {
  values: Record<string, string[]>;
  operators: Record<string, FilterOperator>;
};

function applyUpdateCategory(
  state: FilterUiState,
  categoryId: string,
  updater: (current: string[]) => string[],
): FilterUiState {
  const current = state.values[categoryId] ?? [];
  const next = updater(current);
  const nextValues = { ...state.values, [categoryId]: next };
  let nextOperators = { ...state.operators };
  const isEmpty = next.length === 0;

  if (!isEmpty && nextOperators[categoryId] == null) {
    nextOperators = { ...nextOperators, [categoryId]: "is" };
  }

  if (
    current.length < 2 &&
    next.length >= 2 &&
    nextOperators[categoryId] !== "is not"
  ) {
    nextOperators = { ...nextOperators, [categoryId]: "is any of" };
  }

  if (isEmpty) {
    nextOperators = { ...nextOperators };
    delete nextOperators[categoryId];
  }

  if (next.length < 2 && nextOperators[categoryId] === "is any of") {
    nextOperators = { ...nextOperators, [categoryId]: "is" };
  }

  return {
    values: nextValues,
    operators: nextOperators,
  };
}

function applySetOperator(
  state: FilterUiState,
  categoryId: string,
  operator: FilterOperator,
): FilterUiState {
  return {
    ...state,
    operators: { ...state.operators, [categoryId]: operator },
  };
}

function applyClearCategory(
  state: FilterUiState,
  categoryId: string,
): FilterUiState {
  const nextOperators = { ...state.operators };
  delete nextOperators[categoryId];
  return {
    values: { ...state.values, [categoryId]: [] },
    operators: nextOperators,
  };
}

export function Filter({
  className,
  categories,
  triggerLabel = "Filter",
  trigger = "default",
  triggerIcon,
  onChange,
  values: controlledValues,
  operators: controlledOperators,
  defaultValues,
  defaultOperators,
  variant = "default",
  ...props
}: FilterProps) {
  const [uncontrolledState, setUncontrolledState] =
    React.useState<FilterUiState>(() => ({
      values: defaultValues ?? {},
      operators: defaultOperators ?? {},
    }));

  const values = controlledValues ?? uncontrolledState.values;
  const operators = controlledOperators ?? uncontrolledState.operators;

  const commitState = React.useCallback(
    (updater: (prev: FilterUiState) => FilterUiState) => {
      const next = updater({ values, operators });

      if (controlledValues === undefined || controlledOperators === undefined) {
        setUncontrolledState((current) => ({
          values: controlledValues === undefined ? next.values : current.values,
          operators:
            controlledOperators === undefined
              ? next.operators
              : current.operators,
        }));
      }

      onChange?.(next.values, next.operators);
    },
    [controlledOperators, controlledValues, onChange, operators, values],
  );

  const categoriesById = React.useMemo(() => {
    const map = new Map<string, FilterCategory>();
    for (const category of categories) map.set(category.id, category);
    return map;
  }, [categories]);

  const updateCategory = React.useCallback(
    (categoryId: string, updater: (current: string[]) => string[]) => {
      commitState((prev) => applyUpdateCategory(prev, categoryId, updater));
    },
    [commitState],
  );

  const setOperator = React.useCallback(
    (categoryId: string, next: FilterOperator) => {
      commitState((prev) => applySetOperator(prev, categoryId, next));
    },
    [commitState],
  );

  const clearCategory = React.useCallback(
    (categoryId: string) => {
      commitState((prev) => applyClearCategory(prev, categoryId));
    },
    [commitState],
  );

  const activeCategoryIds = React.useMemo(() => {
    const active = new Set<string>();
    for (const [id, selected] of Object.entries(values)) {
      if ((selected ?? []).length > 0) active.add(id);
    }
    return categories
      .map((category) => category.id)
      .filter((id) => active.has(id));
  }, [categories, values]);

  const selectedItemCount = React.useMemo(() => {
    return Object.values(values).reduce((sum, selected) => {
      return sum + (selected?.length ?? 0);
    }, 0);
  }, [values]);

  const getTermDisplayText = React.useCallback(
    (category: FilterCategory, selectedValues: string[]) => {
      if (selectedValues.length === 1) {
        const match = category.options.find(
          (o) => o.value === selectedValues[0],
        );
        return match?.label ?? selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    },
    [],
  );

  const triggerIconNode = React.useMemo(() => {
    return renderGeckoIcon(resolveFilterIcon(triggerIcon), {
      "aria-hidden": true,
    });
  }, [triggerIcon]);

  return (
    <div
      className={cn("flex items-center gap-2 flex-wrap", className)}
      {...props}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size={trigger === "icon" ? "icon-sm" : "sm"}
              className="relative"
              aria-label={
                trigger === "icon"
                  ? `${triggerLabel}${selectedItemCount > 0 ? `, ${selectedItemCount} selected` : ""}`
                  : undefined
              }
              disabled={categories.length === 0}
            >
              {triggerIconNode}
              {trigger === "default" && triggerLabel}
              {variant === "condensed" && selectedItemCount > 0 && (
                <Counter
                  value={selectedItemCount}
                  size="sm"
                  variant="success"
                  className="absolute -top-1.5 -right-1.5"
                  aria-label={`${selectedItemCount} selected`}
                />
              )}
            </Button>
          }
        />
        <DropdownMenuContent align="start">
          {categories.map((category) => {
            const searchable = category.searchable !== false;
            const selected = values[category.id] ?? [];

            return (
              <DropdownMenuSub key={category.id}>
                <DropdownMenuSubTrigger
                  disabled={category.options.length === 0}
                >
                  {category.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  searchable={searchable}
                  searchPlaceholder={
                    category.searchPlaceholder ??
                    `Search ${category.label.toLowerCase()}`
                  }
                >
                  {category.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selected.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const isOn = checked === true;
                        updateCategory(category.id, (current) =>
                          isOn
                            ? current.includes(option.value)
                              ? current
                              : [...current, option.value]
                            : current.filter((v) => v !== option.value),
                        );
                      }}
                      searchValue={option.label}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {variant === "default" && activeCategoryIds.length > 0 && (
        <>
          <Separator orientation="vertical" className="h-7!" />
          <div className="flex items-center flex-wrap gap-1">
            {activeCategoryIds.map((categoryId) => {
              const category = categoriesById.get(categoryId);
              if (!category) return null;

              const selected = values[categoryId] ?? [];
              if (selected.length === 0) return null;

              const op: FilterOperator =
                operators[categoryId] ??
                (selected.length >= 2 ? "is any of" : "is");

              const termText = getTermDisplayText(category, selected);
              const showAnyOf = selected.length >= 2;
              const searchable = category.searchable !== false;

              return (
                <div
                  key={categoryId}
                  className="bg-background border border-border rounded h-7 flex items-center"
                >
                  <span className="text-2xs text-muted-foreground border-r border-border px-2 h-full flex items-center rounded-s-[inherit]">
                    {category.label}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="xs"
                          className="h-full rounded-none border-0 border-r border-border px-2 focus-visible:z-10"
                          aria-label={`Change ${category.label} operator, current value ${op}`}
                        >
                          {op}
                        </Button>
                      }
                    />
                    <DropdownMenuContent
                      align="start"
                      side="bottom"
                      sideOffset={4}
                      className="min-w-[140px]"
                    >
                      <DropdownMenuRadioGroup
                        value={op}
                        onValueChange={(next) =>
                          setOperator(categoryId, next as FilterOperator)
                        }
                      >
                        <DropdownMenuRadioItem value="is">
                          is
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="is not">
                          is not
                        </DropdownMenuRadioItem>
                        {showAnyOf && (
                          <DropdownMenuRadioItem value="is any of">
                            is any of
                          </DropdownMenuRadioItem>
                        )}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu
                    searchable={searchable}
                    searchPlaceholder={
                      category.searchPlaceholder ??
                      `Search ${category.label.toLowerCase()}`
                    }
                  >
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="xs"
                          className="h-full rounded-none border-0 border-r border-border px-2 focus-visible:z-10"
                          aria-label={`Change ${category.label} values, current value ${termText}`}
                        >
                          {termText}
                        </Button>
                      }
                    />
                    <DropdownMenuContent
                      align="start"
                      side="bottom"
                      sideOffset={4}
                    >
                      {category.options.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          checked={selected.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const isOn = checked === true;
                            updateCategory(categoryId, (current) =>
                              isOn
                                ? current.includes(option.value)
                                  ? current
                                  : [...current, option.value]
                                : current.filter((v) => v !== option.value),
                            );
                          }}
                          searchValue={option.label}
                        >
                          {option.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => clearCategory(categoryId)}
                    className="h-full rounded-none rounded-e-[inherit] hover:bg-muted focus-visible:z-10"
                    aria-label={`Remove ${category.label} filter`}
                  >
                    <HugeiconsIcon
                      icon={X}
                      className="size-3"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export { Filter as Filters };

export function Sort({
  className,
  options,
  value,
  onValueChange,
  triggerLabel = "Sort",
  trigger = "default",
  triggerIcon = ArrowDownWideNarrow,
  ...props
}: SortProps) {
  const [open, setOpen] = React.useState(false);
  const triggerIconNode = React.useMemo(() => {
    return renderGeckoIcon(resolveFilterIcon(triggerIcon), {
      "aria-hidden": true,
    });
  }, [triggerIcon]);

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            trigger === "icon" ? (
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={triggerLabel}
                disabled={options.length === 0}
              >
                {triggerIconNode}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={options.length === 0}
              >
                {triggerIconNode}
                {triggerLabel}
              </Button>
            )
          }
        />
        <DropdownMenuContent align="start" className="min-w-[220px]">
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(next) => {
              onValueChange(next);
              setOpen(false);
            }}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export type DateRangeFilterPreset = {
  id: string;
  label: string;
  /**
   * Create a date range relative to `now`.
   * Use `from`/`to` in the local timezone (DatePicker uses local dates).
   */
  getRange: (now: Date) => DateRange;
};

function ordinalSuffix(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  const mod10 = n % 10;
  if (mod10 === 1) return "st";
  if (mod10 === 2) return "nd";
  if (mod10 === 3) return "rd";
  return "th";
}

function formatDateForLabel(d: Date) {
  const day = d.getDate();
  const suffix = ordinalSuffix(day);
  const month = d.toLocaleString(undefined, { month: "long" });
  const year = d.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}

function formatRangeForLabel(range: DateRange) {
  const { from, to } = range;
  if (!from) return "";
  if (!to) return formatDateForLabel(from);
  return `${formatDateForLabel(from)} – ${formatDateForLabel(to)}`;
}

export type DateRangeFilterProps = Omit<
  React.ComponentProps<"div">,
  "onChange"
> & {
  /**
   * When nothing is selected, the trigger shows this label.
   * @default "Filter by date"
   */
  triggerLabel?: string;
  /**
   * Label for the Custom submenu trigger.
   * @default "Custom"
   */
  customLabel?: string;
  /**
   * Preset list shown above the separator.
   * @default: Past 24 hours / Past 7 days / Past 4 weeks / Past 3 months
   */
  presets?: readonly DateRangeFilterPreset[];
  /**
   * Controlled selected range.
   * When undefined, the trigger shows `triggerLabel`.
   */
  value?: DateRange | undefined;
  /**
   * Called when a preset, complete custom range, or clear action is selected.
   */
  onChange?: (range: DateRange | undefined) => void;
  /**
   * Closes the popover after a preset or complete custom range is selected.
   */
  closeOnSelect?: boolean;
};

export function DateRangeFilter({
  className,
  triggerLabel = "Filter by date",
  customLabel = "Custom",
  presets,
  value,
  onChange,
  closeOnSelect = true,
  ...props
}: DateRangeFilterProps) {
  const resolvedPresets = React.useMemo<readonly DateRangeFilterPreset[]>(
    () =>
      presets ?? [
        {
          id: "last-24-hours",
          label: "Past 24 hours",
          getRange: (now) => ({
            from: new Date(now.getTime() - 24 * 60 * 60 * 1000),
            to: now,
          }),
        },
        {
          id: "last-7-days",
          label: "Past 7 days",
          getRange: (now) => ({
            from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            to: now,
          }),
        },
        {
          id: "last-4-weeks",
          label: "Past 4 weeks",
          getRange: (now) => ({
            from: new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000),
            to: now,
          }),
        },
        {
          id: "last-3-months",
          label: "Past 3 months",
          getRange: (now) => ({
            from: new Date(
              now.getFullYear(),
              now.getMonth() - 3,
              now.getDate(),
              now.getHours(),
              now.getMinutes(),
            ),
            to: now,
          }),
        },
      ],
    [presets],
  );

  const [selectedPreset, setSelectedPreset] = React.useState<{
    id: string;
    range: DateRange;
  } | null>(null);

  const [customRange, setCustomRange] = React.useState<DateRange | undefined>(
    undefined,
  );
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    () => value?.from ?? new Date(),
  );

  const selectedPresetMatchesValue =
    Boolean(selectedPreset?.range.from && selectedPreset.range.to) &&
    selectedPreset?.range.from?.getTime() === value?.from?.getTime() &&
    selectedPreset?.range.to?.getTime() === value?.to?.getTime();

  const resolvedTriggerLabel = React.useMemo(() => {
    if (!value?.from || !value?.to) return triggerLabel;

    const preset = selectedPresetMatchesValue
      ? resolvedPresets.find((p) => p.id === selectedPreset?.id)
      : undefined;
    if (preset) return preset.label;

    // Custom selected: show formatted range
    return formatRangeForLabel(value);
  }, [
    resolvedPresets,
    selectedPreset?.id,
    selectedPresetMatchesValue,
    triggerLabel,
    value,
  ]);

  const handlePresetSelect = React.useCallback(
    (presetId: string) => {
      const preset = resolvedPresets.find((p) => p.id === presetId);
      if (!preset) return;
      const range = preset.getRange(new Date());
      setSelectedPreset({ id: presetId, range });
      setCustomRange(range);
      onChange?.(range);
    },
    [onChange, resolvedPresets],
  );

  const handleCustomChange = React.useCallback(
    (next: DateRange | undefined) => {
      if (!next?.from || !next?.to) {
        setCustomRange(next);
        // Don’t call onChange until we have a complete range.
        return;
      }

      setSelectedPreset(null);
      setCustomRange(next);
      onChange?.(next);
    },
    [onChange],
  );

  const [open, setOpen] = React.useState(false);
  const [showCustom, setShowCustom] = React.useState(false);

  const clearRange = React.useCallback(() => {
    setSelectedPreset(null);
    setCustomRange(undefined);
    setCalendarMonth(new Date());
    onChange?.(undefined);
    setOpen(false);
  }, [onChange]);

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setCustomRange(value);
            setCalendarMonth(value?.from ?? new Date());
          }
          setOpen(nextOpen);
        }}
      >
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm" className="gap-2">
              <HugeiconsIcon
                icon={ListFilterPlus}
                aria-hidden="true"
                className="size-4"
              />
              {resolvedTriggerLabel}
            </Button>
          }
        />
        <PopoverContent align="start" className="w-auto gap-0 p-0">
          <div className="flex flex-col md:flex-row">
            <div className="flex min-w-52 flex-col gap-1 p-1">
              {resolvedPresets.map((preset) => {
                const isSelected =
                  selectedPresetMatchesValue &&
                  selectedPreset?.id === preset.id;

                return (
                  <Button
                    key={preset.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    aria-pressed={isSelected}
                    onClick={() => {
                      handlePresetSelect(preset.id);
                      if (closeOnSelect) setOpen(false);
                    }}
                  >
                    <HugeiconsIcon
                      icon={Check}
                      className={cn("size-3.5", !isSelected && "invisible")}
                      aria-hidden="true"
                    />
                    {preset.label}
                  </Button>
                );
              })}
              <Separator />
              <Button
                variant="ghost"
                size="sm"
                className="justify-start"
                aria-expanded={showCustom}
                onClick={() => {
                  setSelectedPreset(null);
                  setShowCustom((current) => !current);
                }}
              >
                <span className="size-3.5" aria-hidden="true" />
                {customLabel}
              </Button>
              {value?.from && (
                <Button
                  variant="ghost-destructive"
                  size="sm"
                  className="justify-start"
                  onClick={clearRange}
                >
                  <HugeiconsIcon
                    icon={X}
                    className="size-3.5"
                    aria-hidden="true"
                  />
                  Clear date filter
                </Button>
              )}
            </div>
            {showCustom && (
              <div className="border-t border-border md:border-t-0 md:border-s">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  selected={customRange}
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  onSelect={(next) => {
                    setCustomRange(next);
                    if (next?.from) setCalendarMonth(next.from);
                    handleCustomChange(next);
                    if (closeOnSelect && next?.from && next?.to) {
                      setOpen(false);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
