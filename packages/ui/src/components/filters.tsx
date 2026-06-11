"use client"

import * as React from "react"
import {
  ArrowDownWideNarrow,
  icons,
  ListFilterPlus,
  X,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { Counter } from "@gecko/ui/components/counter"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuEmpty,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Calendar } from "@gecko/ui/components/calendar"
import { Separator } from "@gecko/ui/components/separator"
import { cn } from "@gecko/ui/lib/utils"
import type { DateRange } from "react-day-picker"

export type FilterOption = {
  value: string
  label: string
}

export type FilterCategory = {
  id: string
  label: string
  options: FilterOption[]
  /** When false, the submenu has no search field (e.g. short static lists). @default true */
  searchable?: boolean
  searchPlaceholder?: string
}

export type SortOption = {
  value: string
  label: string
}

export type SortProps = React.ComponentProps<"div"> & {
  options: SortOption[]
  value: string
  onValueChange: (value: string) => void
  /** Button label. Also used as the aria-label when `trigger=\"icon\"`. */
  triggerLabel?: string
  /** Default renders icon + label; icon renders an icon-only trigger. */
  trigger?: "default" | "icon"
  /** Any lucide icon name (e.g. \"arrow-down-wide-narrow\", \"Funnel\", \"FunnelPlus\"). */
  triggerIcon?: string | LucideIcon
}

export type FilterOperator = "is" | "is not" | "is any of"

export type FilterProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  categories: FilterCategory[]
  /** Button label. Also used as the aria-label when `trigger=\"icon\"`. */
  triggerLabel?: string
  /** Default renders icon + label; icon renders an icon-only trigger. */
  trigger?: "default" | "icon"
  /** Any lucide icon name (e.g. \"funnel\", \"Funnel\", \"FunnelPlus\"). */
  triggerIcon?: string | LucideIcon
  /**
   * Called when selected values or per-category operators change.
   * Second argument is required for negated filters (`is not`).
   */
  onChange?: (
    values: Record<string, string[]>,
    operators: Record<string, FilterOperator>
  ) => void
  /** Default shows active filter chips; condensed shows a counter on the trigger. */
  variant?: "default" | "condensed"
}

function pluralize(label: string) {
  const text = label.toLowerCase().trim()
  if (text.endsWith("s")) return text
  if (text.endsWith("y")) return `${text.slice(0, -1)}ies`
  return `${text}s`
}

function toPascalCase(input: string) {
  return input
    .trim()
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function resolveLucideIcon(icon: unknown) {
  if (!icon) return ListFilterPlus

  // lucide-react icons are React components; depending on build they can be
  // functions or forwardRef objects.
  if (typeof icon === "function" || typeof icon === "object") {
    return icon as LucideIcon
  }

  if (typeof icon !== "string") return ListFilterPlus

  const raw = icon.trim()
  const direct = icons[raw as keyof typeof icons]
  if (direct) return direct

  const pascal = toPascalCase(raw)
  const resolved = icons[pascal as keyof typeof icons]
  if (resolved) return resolved

  return ListFilterPlus
}

export function Filter({
  className,
  categories,
  triggerLabel = "Filter",
  trigger = "default",
  triggerIcon,
  onChange,
  variant = "default",
  ...props
}: FilterProps) {
  const [values, setValues] = React.useState<Record<string, string[]>>({})
  const [operators, setOperators] = React.useState<Record<string, FilterOperator>>(
    {}
  )
  const [selectionOrder, setSelectionOrder] = React.useState<string[]>([])

  React.useEffect(() => {
    onChange?.(values, operators)
  }, [values, operators, onChange])

  const categoriesById = React.useMemo(() => {
    const map = new Map<string, FilterCategory>()
    for (const category of categories) map.set(category.id, category)
    return map
  }, [categories])

  const updateCategory = React.useCallback(
    (categoryId: string, updater: (current: string[]) => string[]) => {
      setValues((prev) => {
        const current = prev[categoryId] ?? []
        const next = updater(current)
        const nextValues = { ...prev, [categoryId]: next }

        const wasEmpty = current.length === 0
        const isEmpty = next.length === 0

        if (wasEmpty && !isEmpty) {
          setSelectionOrder((order) =>
            order.includes(categoryId) ? order : [...order, categoryId]
          )
          setOperators((ops) =>
            ops[categoryId] == null ? { ...ops, [categoryId]: "is" } : ops
          )
        }

        if (!wasEmpty && isEmpty) {
          setSelectionOrder((order) => order.filter((id) => id !== categoryId))
          setOperators((ops) => {
            const nextOps = { ...ops }
            delete nextOps[categoryId]
            return nextOps
          })
        }

        if (next.length < 2) {
          setOperators((ops) =>
            ops[categoryId] === "is any of"
              ? { ...ops, [categoryId]: "is" }
              : ops
          )
        }

        return nextValues
      })
    },
    []
  )

  const setOperator = React.useCallback((categoryId: string, next: FilterOperator) => {
    setOperators((prev) => ({ ...prev, [categoryId]: next }))
  }, [])

  const clearCategory = React.useCallback(
    (categoryId: string) => {
      setValues((prev) => {
        const nextValues = { ...prev, [categoryId]: [] }
        return nextValues
      })
      setOperators((prev) => {
        const next = { ...prev }
        delete next[categoryId]
        return next
      })
      setSelectionOrder((prev) => prev.filter((id) => id !== categoryId))
    },
    []
  )

  const activeCategoryIds = React.useMemo(() => {
    const active = new Set<string>()
    for (const [id, selected] of Object.entries(values)) {
      if ((selected ?? []).length > 0) active.add(id)
    }
    return selectionOrder.filter((id) => active.has(id))
  }, [values, selectionOrder])

  const selectedItemCount = React.useMemo(() => {
    return Object.values(values).reduce((sum, selected) => {
      return sum + (selected?.length ?? 0)
    }, 0)
  }, [values])

  const getTermDisplayText = React.useCallback(
    (category: FilterCategory, selectedValues: string[]) => {
      if (selectedValues.length === 1) {
        const match = category.options.find((o) => o.value === selectedValues[0])
        return match?.label ?? selectedValues[0]
      }
      return `${selectedValues.length} ${pluralize(category.label)}`
    },
    []
  )

  const triggerIconNode = React.useMemo(() => {
    const Icon = resolveLucideIcon(triggerIcon)
    // eslint-disable-next-line -- icon component selected from a stable map; no local state
    return <Icon />
  }, [triggerIcon])

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <span className="relative inline-flex">
              {trigger === "icon" ? (
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label={triggerLabel}
                >
                  {triggerIconNode}
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  {triggerIconNode}
                  {triggerLabel}
                </Button>
              )}
              {variant === "condensed" && selectedItemCount > 0 && (
                <Counter
                  value={selectedItemCount}
                  size="sm"
                  variant="success"
                  className="absolute -top-1.5 -right-1.5"
                />
              )}
            </span>
          }
        />
        <DropdownMenuContent align="start">
          {categories.map((category) => {
            const searchable = category.searchable !== false
            const selected = values[category.id] ?? []

            return (
              <DropdownMenuSub key={category.id}>
                <DropdownMenuSubTrigger>{category.label}</DropdownMenuSubTrigger>
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
                        const isOn = checked === true
                        updateCategory(category.id, (current) =>
                          isOn
                            ? current.includes(option.value)
                              ? current
                              : [...current, option.value]
                            : current.filter((v) => v !== option.value)
                        )
                      }}
                      searchValue={option.label}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {variant === "default" && activeCategoryIds.length > 0 && (
        <>
          <Separator orientation="vertical" className="h-7!" />
          <div className="flex items-center flex-wrap gap-1">
            {activeCategoryIds.map((categoryId) => {
              const category = categoriesById.get(categoryId)
              if (!category) return null

              const selected = values[categoryId] ?? []
              if (selected.length === 0) return null

              const op: FilterOperator =
                operators[categoryId] ??
                (selected.length >= 2 ? "is any of" : "is")

              const termText = getTermDisplayText(category, selected)
              const showAnyOf = selected.length >= 2
              const searchable = category.searchable !== false

              return (
                <div
                  key={categoryId}
                  className="bg-background border border-border rounded h-7 flex items-center overflow-hidden"
                >
                  <span className="text-xs text-muted-foreground border-r border-border px-2 h-full flex items-center">
                    {category.label}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button
                          type="button"
                          className="text-xs text-foreground px-2 h-full flex items-center border-r border-border font-medium transition-colors cursor-pointer hover:bg-muted"
                        >
                          {op}
                        </button>
                      }
                    />
                    <DropdownMenuContent
                      align="start"
                      side="bottom"
                      sideOffset={4}
                      className="min-w-[140px]"
                    >
                      <DropdownMenuItem onClick={() => setOperator(categoryId, "is")}>
                        is
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOperator(categoryId, "is not")}
                      >
                        is not
                      </DropdownMenuItem>
                      {showAnyOf && (
                        <DropdownMenuItem
                          onClick={() => setOperator(categoryId, "is any of")}
                        >
                          is any of
                        </DropdownMenuItem>
                      )}
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
                        <button
                          type="button"
                          className="text-xs text-foreground px-2 h-full flex items-center border-r border-border font-medium transition-colors cursor-pointer hover:bg-muted"
                        >
                          {termText}
                        </button>
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
                            const isOn = checked === true
                            updateCategory(categoryId, (current) =>
                              isOn
                                ? current.includes(option.value)
                                  ? current
                                  : [...current, option.value]
                                : current.filter((v) => v !== option.value)
                            )
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
                    className="h-full rounded-none hover:bg-muted"
                    aria-label={`Remove ${category.label} filter`}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export { Filter as Filters }

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
  const [open, setOpen] = React.useState(false)
  const triggerIconNode = React.useMemo(() => {
    const Icon = resolveLucideIcon(triggerIcon)
    // eslint-disable-next-line -- icon component selected from a stable map; no local state
    return <Icon />
  }, [triggerIcon])

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            trigger === "icon" ? (
              <Button variant="outline" size="icon-sm" aria-label={triggerLabel}>
                {triggerIconNode}
              </Button>
            ) : (
              <Button variant="outline" size="sm">
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
              onValueChange(next)
              setOpen(false)
            }}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          {options.length === 0 && (
            <DropdownMenuEmpty>No options.</DropdownMenuEmpty>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export type DateRangeFilterPreset = {
  id: string
  label: string
  /**
   * Create a date range relative to `now`.
   * Use `from`/`to` in the local timezone (DatePicker uses local dates).
   */
  getRange: (now: Date) => DateRange
}

function ordinalSuffix(n: number) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return "th"
  const mod10 = n % 10
  if (mod10 === 1) return "st"
  if (mod10 === 2) return "nd"
  if (mod10 === 3) return "rd"
  return "th"
}

function formatDateForLabel(d: Date) {
  const day = d.getDate()
  const suffix = ordinalSuffix(day)
  const month = d.toLocaleString(undefined, { month: "long" })
  const year = d.getFullYear()
  return `${day}${suffix} ${month} ${year}`
}

function formatRangeForLabel(range: DateRange) {
  const { from, to } = range
  if (!from) return ""
  if (!to) return formatDateForLabel(from)
  return `${formatDateForLabel(from)} - ${formatDateForLabel(to)}`
}

export type DateRangeFilterProps = {
  /**
   * When nothing is selected, the trigger shows this label.
   * @default "Filter by date"
   */
  triggerLabel?: string
  /**
   * Label for the Custom submenu trigger.
   * @default "Custom"
   */
  customLabel?: string
  /**
   * Preset list shown above the separator.
   * @default: Past 24 hours / Past 7 days / Past 4 weeks / Past 3 months
   */
  presets?: readonly DateRangeFilterPreset[]
  /**
   * Controlled selected range.
   * When undefined, the trigger shows `triggerLabel`.
   */
  value?: DateRange | undefined
  /**
   * Called when a preset is selected or when a complete custom range is chosen.
   * Only fires when `range.from` and `range.to` are both set.
   */
  onChange?: (range: DateRange | undefined) => void
  /**
   * When a preset is selected we keep the popover open/closed behaviour native
   * to the DropdownMenu trigger. Default close-on-select is desired so the
   * presets feel like a single-choice control.
   */
  closeOnSelect?: boolean
}

export function DateRangeFilter({
  triggerLabel = "Filter by date",
  customLabel = "Custom",
  presets,
  value,
  onChange,
  closeOnSelect = true,
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
              now.getMinutes()
            ),
            to: now,
          }),
        },
      ],
    [presets]
  )

  // We can’t infer preset selection purely from `value` (relative ranges),
  // so we track the last selected preset id in local state for trigger labeling.
  const [selectedPresetId, setSelectedPresetId] = React.useState<string | null>(
    null
  )

  const [customRange, setCustomRange] = React.useState<DateRange | undefined>(
    undefined
  )
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    () => value?.from ?? new Date()
  )

  // Sync controlled `value` into customRange when parent controls the filter.
  React.useEffect(() => {
    if (value?.from && value?.to) {
      setCustomRange(value)
      setCalendarMonth(value.from)
    }
  }, [value?.from, value?.to])

  const nowForPresetRanges = React.useMemo(() => new Date(), [])

  const resolvedTriggerLabel = React.useMemo(() => {
    if (!value?.from || !value?.to) return triggerLabel

    const preset = selectedPresetId
      ? resolvedPresets.find((p) => p.id === selectedPresetId)
      : undefined
    if (preset) return preset.label

    // Custom selected: show formatted range
    return formatRangeForLabel(value)
  }, [resolvedPresets, selectedPresetId, triggerLabel, value?.from, value?.to])

  const handlePresetSelect = React.useCallback(
    (presetId: string) => {
      const preset = resolvedPresets.find((p) => p.id === presetId)
      if (!preset) return
      setSelectedPresetId(presetId)
      const range = preset.getRange(nowForPresetRanges)
      setCustomRange(range)
      onChange?.(range)
    },
    [nowForPresetRanges, onChange, resolvedPresets]
  )

  const handleCustomChange = React.useCallback(
    (next: DateRange | undefined) => {
      if (!next?.from || !next?.to) {
        setCustomRange(next)
        // Don’t call onChange until we have a complete range.
        return
      }

      setSelectedPresetId(null)
      setCustomRange(next)
      onChange?.(next)
    },
    [onChange]
  )

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <Button variant="outline" size="sm" className="gap-2">
              <ListFilterPlus aria-hidden className="size-4" />
              {resolvedTriggerLabel}
            </Button>
          }
        />
        <DropdownMenuContent align="start" className="min-w-[220px]">
          <DropdownMenuRadioGroup
            value={selectedPresetId ?? ""}
            onValueChange={(next) => {
              handlePresetSelect(next)
              if (closeOnSelect) setOpen(false)
            }}
          >
            {resolvedPresets.map((p) => (
              <DropdownMenuRadioItem key={p.id} value={p.id}>
                {p.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              openOnHover={false}
              onClick={() => setSelectedPresetId(null)}
            >
              {customLabel}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="max-h-none w-max overflow-visible p-0">
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={customRange}
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                onSelect={(next) => {
                  setCustomRange(next)
                  if (next?.from) setCalendarMonth(next.from)
                  handleCustomChange(next)
                  if (closeOnSelect && next?.from && next?.to) {
                    setOpen(false)
                  }
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
