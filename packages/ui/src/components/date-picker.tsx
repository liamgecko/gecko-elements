import * as React from "react"
import { cva } from "class-variance-authority"
import { format } from "date-fns"
import type { DateRange, Matcher } from "react-day-picker"
import { CalendarIcon } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import { useControllableState } from "@gecko/ui/hooks/use-controllable-state"
import { Button } from "@gecko/ui/components/button"
import { Calendar } from "@gecko/ui/components/calendar"
import { Field, FieldLabel } from "@gecko/ui/components/field"
import { Input } from "@gecko/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover"

const NATIVE_DATE_OR_TIME_INPUT_CLASSES =
  "appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"

const datePickerTriggerVariants = cva("min-w-0", {
  variants: {
    variant: {
      default: "",
      dob: "",
      natural: "w-full max-w-full",
      time: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type DatePickerMode = "single" | "range"

type DatePickerSharedProps = {
  id?: string
  className?: string
  /** Accessible name for the trigger (button, native date input, natural text, or time fields). */
  "aria-label"?: string
  /**
   * For single-date pickers, choose between a native `type="date"` field (`input`, default)
   * or an outline button trigger (`button`).
   *
   * - `mode="range"` always uses a button trigger.
   * - `variant="natural"` always uses its text field trigger.
   */
  trigger?: "input" | "button"
  disabled?: boolean
  /** Open state */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Close popover after a complete selection (default: true for single, false for range) */
  closeOnSelect?: boolean
  /** `natural`, or single `default` / `dob` with `trigger="input"`: open calendar on ArrowDown in the field */
  openOnArrowDown?: boolean
  /** Passed to `Calendar` — dates that cannot be selected */
  disabledDates?: Matcher | Matcher[] | undefined
  numberOfMonths?: number
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"]
  locale?: React.ComponentProps<typeof Calendar>["locale"]
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  /** Popover content positioning (defaults follow input-like vs button-like triggers). */
  contentAlign?: React.ComponentProps<typeof PopoverContent>["align"]
  contentAlignOffset?: React.ComponentProps<typeof PopoverContent>["alignOffset"]
  contentSide?: React.ComponentProps<typeof PopoverContent>["side"]
  contentSideOffset?: React.ComponentProps<typeof PopoverContent>["sideOffset"]
  contentClassName?: string
  /** Button trigger only */
  buttonSize?: React.ComponentProps<typeof Button>["size"]
  /** Button trigger only: where the calendar icon renders. @default "end" */
  calendarIconPosition?: "start" | "end"
  /**
   * Button trigger only: stretch to the container width with left-aligned label text.
   * Use `false` for inline toolbar controls that should match a standard `Button`.
   * @default true
   */
  buttonFullWidth?: boolean
  buttonClassName?: string
  placeholder?: string
  /** Single: format selected date. Range: format range label. */
  formatDate?: (date: Date) => string
  formatRange?: (range: DateRange) => string
  /** Range: show trailing calendar icon on the button trigger (default true) */
  showRangeCalendarIcon?: boolean
  /** Optional icons for button variant */
  buttonStartIcon?: React.ReactNode
  buttonEndIcon?: React.ReactNode

  /** `trigger="input"`: passed to wrapping `InputGroup`. */
  inputGroupSize?: React.ComponentProps<typeof InputGroup>["size"]
  /** `trigger="input"`: extra classes on the native date `InputGroupInput`. */
  inputClassName?: string
  /** Validation styling on date/text inputs (`trigger="input"` and `variant="natural"`). */
  "aria-invalid"?: boolean | "true" | "false"
  /** Linked to a visible error message (e.g. `FieldError` with a matching `id`). */
  "aria-describedby"?: string
}

type DatePickerSingleDefaultProps = DatePickerSharedProps & {
  mode?: "single"
  variant?: "default"
  value?: Date | undefined
  defaultValue?: Date | undefined
  onChange?: (date: Date | undefined) => void
}

type DatePickerSingleDobProps = DatePickerSharedProps & {
  mode?: "single"
  variant: "dob"
  value?: Date | undefined
  defaultValue?: Date | undefined
  onChange?: (date: Date | undefined) => void
}

type DatePickerRangeDefaultProps = DatePickerSharedProps & {
  mode: "range"
  variant?: "default"
  value?: DateRange | undefined
  defaultValue?: DateRange | undefined
  onChange?: (range: DateRange | undefined) => void
}

type DatePickerSingleNaturalProps = DatePickerSharedProps & {
  mode?: "single"
  variant: "natural"
  value?: Date | undefined
  defaultValue?: Date | undefined
  onChange?: (date: Date | undefined) => void
  /** Controlled text field */
  textValue: string
  onTextChange: (value: string) => void
  textPlaceholder?: string
  /** Parse typed text into a date (e.g. chrono `parseDate`) */
  parseText?: (raw: string) => Date | undefined
  /** When picking from calendar, format back into the text field */
  formatTextFromDate?: (date: Date | undefined) => string
  inputPlaceholder?: string
}

type DatePickerTimeProps = DatePickerSharedProps & {
  mode?: "single"
  variant: "time"
  value?: Date | undefined
  defaultValue?: Date | undefined
  onChange?: (date: Date | undefined) => void
  /** Field labels */
  dateLabel?: string
  timeLabel?: string
  /**
   * `step` on the native time input (seconds). Default `60` for minute precision (HH:mm, no seconds).
   */
  timeStep?: number | string
}

export type DatePickerProps =
  | DatePickerSingleDefaultProps
  | DatePickerSingleDobProps
  | DatePickerRangeDefaultProps
  | DatePickerSingleNaturalProps
  | DatePickerTimeProps

function defaultFormatSingle(date: Date) {
  return format(date, "PPP")
}

function defaultFormatRange(range: DateRange) {
  if (!range.from) return ""
  if (!range.to) return format(range.from, "LLL dd, y")
  return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
}

/** Local calendar date as `YYYY-MM-DD` for `<input type="date" />`. */
function formatDateForNativeInput(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function parseNativeDateInput(iso: string): Date | undefined {
  if (!iso) return undefined
  const [yStr, mStr, dStr] = iso.split("-")
  const y = Number(yStr)
  const m = Number(mStr)
  const d = Number(dStr)
  if (!y || !m || !d) return undefined
  const parsed = new Date(y, m - 1, d)
  if (Number.isNaN(parsed.getTime())) return undefined
  if (
    parsed.getFullYear() !== y ||
    parsed.getMonth() !== m - 1 ||
    parsed.getDate() !== d
  ) {
    return undefined
  }
  return parsed
}

function mergeCalendarPreserveTime(
  prev: Date | undefined,
  picked: Date
): Date {
  const out = new Date(picked)
  if (prev) {
    out.setHours(
      prev.getHours(),
      prev.getMinutes(),
      prev.getSeconds(),
      prev.getMilliseconds()
    )
  }
  return out
}

/** `HH:mm` for `<input type="time" step={60} />` (no seconds). */
function formatTimeHmForInput(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0")
  const m = String(d.getMinutes()).padStart(2, "0")
  return `${h}:${m}`
}

function applyTimeStringToDay(day: Date, timeStr: string): Date | undefined {
  if (!timeStr) return undefined
  const parts = timeStr.split(":").map((p) => Number(p))
  const hh = parts[0]
  const mm = parts[1] ?? 0
  const ss = parts[2] ?? 0
  if (Number.isNaN(hh) || hh === undefined) return undefined
  const out = new Date(day)
  out.setHours(hh, mm, ss, 0)
  return out
}

function DatePicker(props: DatePickerProps) {
  const generatedId = React.useId()
  const {
    id,
    className,
    "aria-label": ariaLabel,
    disabled = false,
    open: openProp,
    defaultOpen,
    onOpenChange,
    closeOnSelect: closeOnSelectProp,
    openOnArrowDown = true,
    disabledDates,
    numberOfMonths = 1,
    captionLayout = "label",
    locale,
    defaultMonth,
    month: monthProp,
    onMonthChange,
    contentAlign: contentAlignProp,
    contentAlignOffset: contentAlignOffsetProp,
    contentSide: contentSideProp,
    contentSideOffset: contentSideOffsetProp,
    contentClassName,
    buttonSize,
    calendarIconPosition = "end",
    buttonFullWidth = true,
    buttonClassName,
    placeholder = "Select a date",
    formatDate = defaultFormatSingle,
    formatRange = defaultFormatRange,
    showRangeCalendarIcon = true,
    buttonStartIcon,
    buttonEndIcon,
  } = props

  const ariaDescribedBy = (props as DatePickerSharedProps)["aria-describedby"]

  const mode: DatePickerMode = props.mode ?? "single"
  const variant = props.variant ?? "default"

  if (mode === "range" && variant !== "default") {
    throw new Error('DatePicker: range mode only supports variant="default"')
  }

  const isSingle = mode === "single"
  const resolvedTrigger: "input" | "button" =
    mode === "range"
      ? "button"
      : variant === "natural"
        ? "input"
        : (props as DatePickerSharedProps).trigger ?? "input"

  const inputLikePopover =
    variant === "natural" || resolvedTrigger === "input"
  const effectiveContentAlign =
    contentAlignProp ?? (inputLikePopover ? "end" : "start")
  const effectiveContentAlignOffset =
    contentAlignOffsetProp ?? (inputLikePopover ? -8 : 0)
  const effectiveContentSide = contentSideProp ?? "bottom"
  const effectiveContentSideOffset =
    contentSideOffsetProp ?? (inputLikePopover ? 10 : 4)

  const resolvedCaptionLayout =
    variant === "time" || variant === "dob" || variant === "natural"
      ? "dropdown"
      : captionLayout

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  })

  const closeOnSelect =
    closeOnSelectProp ?? (mode === "single" ? true : false)

  const singleControlled = isSingle && "value" in props
  const rangeControlled = mode === "range" && "value" in props

  const resolvedSingleFormatDate =
    variant === "dob" && isSingle
      ? (props as DatePickerSingleDobProps).formatDate ??
        ((d: Date) => d.toLocaleDateString())
      : formatDate

  const [singleUncontrolled, setSingleUncontrolled] = React.useState<
    Date | undefined
  >(() => {
    if (!isSingle || singleControlled) return undefined
    if (!("defaultValue" in props)) return undefined
    return (props as { defaultValue?: Date | undefined }).defaultValue
  })
  const [rangeUncontrolled, setRangeUncontrolled] = React.useState<
    DateRange | undefined
  >(() => {
    if (mode !== "range" || rangeControlled) return undefined
    if (!("defaultValue" in props)) return undefined
    return (props as { defaultValue?: DateRange | undefined }).defaultValue
  })

  const singleValue: Date | undefined = isSingle
    ? singleControlled
      ? (
          props as
            | DatePickerSingleDefaultProps
            | DatePickerSingleDobProps
            | DatePickerSingleNaturalProps
            | DatePickerTimeProps
        ).value
      : singleUncontrolled
    : undefined

  const rangeValue: DateRange | undefined =
    mode === "range"
      ? rangeControlled
        ? (props as DatePickerRangeDefaultProps).value
        : rangeUncontrolled
      : undefined

  const setSingleValue = React.useCallback(
    (next: Date | undefined) => {
      if (!isSingle) return
      const onSingleChange = (
        props as
          | DatePickerSingleDefaultProps
          | DatePickerSingleDobProps
          | DatePickerSingleNaturalProps
          | DatePickerTimeProps
      ).onChange
      if (singleControlled) {
        onSingleChange?.(next)
      } else {
        setSingleUncontrolled(next)
        onSingleChange?.(next)
      }
    },
    [isSingle, singleControlled, props]
  )

  const setRangeValue = React.useCallback(
    (next: DateRange | undefined) => {
      if (mode !== "range") return
      if (rangeControlled) {
        ;(props as DatePickerRangeDefaultProps).onChange?.(next)
      } else {
        setRangeUncontrolled(next)
        ;(props as DatePickerRangeDefaultProps).onChange?.(next)
      }
    },
    [mode, rangeControlled, props]
  )

  const defaultMonthForCalendar =
    defaultMonth ??
    (mode === "range" ? rangeValue?.from : singleValue) ??
    new Date()

  const [monthUncontrolled, setMonthUncontrolled] = React.useState<Date>(
    () => monthProp ?? defaultMonthForCalendar
  )

  React.useEffect(() => {
    if (monthProp !== undefined) return
    if (singleValue) {
      setMonthUncontrolled(singleValue)
    } else if (rangeValue?.from) {
      setMonthUncontrolled(rangeValue.from)
    }
  }, [monthProp, singleValue, rangeValue?.from])

  const viewMonth = monthProp ?? monthUncontrolled

  const handleMonthChange = React.useCallback(
    (m: Date) => {
      if (monthProp === undefined) setMonthUncontrolled(m)
      onMonthChange?.(m)
    },
    [monthProp, onMonthChange]
  )

  const handleSelectSingle = React.useCallback(
    (value: Date | undefined) => {
      if (variant === "time" && value) {
        setSingleValue(mergeCalendarPreserveTime(singleValue, value))
      } else {
        setSingleValue(value)
      }
      if (variant === "natural") {
        const textProps = props as DatePickerSingleNaturalProps
        const fmt =
          textProps.formatTextFromDate ??
          ((d: Date | undefined) =>
            d
              ? d.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "")
        textProps.onTextChange(fmt(value))
      }
      if (closeOnSelect) setOpen(false)
    },
    [
      setSingleValue,
      closeOnSelect,
      setOpen,
      variant,
      props,
      singleValue,
    ]
  )

  const handleSelectRange = React.useCallback(
    (value: DateRange | undefined) => {
      setRangeValue(value)
      if (closeOnSelect && value?.from && value?.to) setOpen(false)
    },
    [setRangeValue, closeOnSelect, setOpen]
  )

  const calendarShared = {
    defaultMonth: defaultMonthForCalendar,
    month: viewMonth,
    onMonthChange: handleMonthChange,
    numberOfMonths,
    captionLayout: resolvedCaptionLayout,
    locale,
    disabled: disabledDates,
  } as const

  const calendar =
    mode === "range" ? (
      <Calendar
        mode="range"
        selected={rangeValue}
        onSelect={(range: DateRange | undefined) => handleSelectRange(range)}
        {...calendarShared}
      />
    ) : (
      <Calendar
        mode="single"
        selected={singleValue}
        onSelect={(day: Date | undefined) => handleSelectSingle(day)}
        {...calendarShared}
      />
    )

  const popoverContent = (
    <PopoverContent
      className={cn("w-auto overflow-hidden p-0", contentClassName)}
      align={effectiveContentAlign}
      alignOffset={effectiveContentAlignOffset}
      side={effectiveContentSide}
      sideOffset={effectiveContentSideOffset}
    >
      {calendar}
    </PopoverContent>
  )

  const triggerCalendarButton = (
    triggerId: string | undefined,
    ariaLabel: string
  ) => (
    <PopoverTrigger
      disabled={disabled}
      render={
        <InputGroupButton
          id={triggerId}
          variant="ghost"
          disabled={disabled}
          aria-label={ariaLabel}
        >
          <CalendarIcon />
          <span className="sr-only">{ariaLabel}</span>
        </InputGroupButton>
      }
    />
  )

  if (variant === "time" && isSingle) {
    const timeProps = props as DatePickerTimeProps
    const dateId = id
    const timeId = id ? `${id}-time` : `${generatedId}-time`
    const dateLabel = timeProps.dateLabel ?? "Date"
    const timeLabel = timeProps.timeLabel ?? "Time"
    const timeStep = timeProps.timeStep ?? 60

    const onTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const timeStr = e.target.value
      if (!timeStr) {
        setSingleValue(undefined)
        return
      }
      const day =
        singleValue ??
        (() => {
          const t = new Date()
          t.setHours(0, 0, 0, 0)
          return t
        })()
      const merged = applyTimeStringToDay(day, timeStr)
      if (merged) setSingleValue(merged)
    }

    const timeDateField =
      resolvedTrigger === "input" ? (
        <Popover open={open} onOpenChange={setOpen}>
          <div className="w-full min-w-0">
            <InputGroup
              size={timeProps.inputGroupSize ?? "md"}
              className="min-w-0 w-full"
            >
              <InputGroupInput
                id={dateId}
                type="date"
                value={singleValue ? formatDateForNativeInput(singleValue) : ""}
                onChange={(e) => {
                  const nextDay = parseNativeDateInput(e.target.value)
                  const next = nextDay
                    ? mergeCalendarPreserveTime(singleValue, nextDay)
                    : undefined
                  setSingleValue(next)
                  if (next) handleMonthChange(next)
                }}
                disabled={disabled}
                aria-invalid={timeProps["aria-invalid"]}
                aria-describedby={ariaDescribedBy}
                aria-label={ariaLabel}
                className={cn(
                  "min-w-0 flex-1 [color-scheme:inherit]",
                  NATIVE_DATE_OR_TIME_INPUT_CLASSES,
                  timeProps.inputClassName
                )}
                onKeyDown={(e) => {
                  if (!openOnArrowDown || disabled) return
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setOpen(true)
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                {triggerCalendarButton(
                  dateId ? `${dateId}-calendar` : undefined,
                  "Select a date"
                )}
              </InputGroupAddon>
            </InputGroup>
          </div>
          {popoverContent}
        </Popover>
      ) : (
        <div className="min-w-0 w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              disabled={disabled}
              render={
                <Button
                  type="button"
                  variant="outline"
                  id={dateId}
                  aria-label={ariaLabel}
                  aria-describedby={ariaDescribedBy}
                  data-slot="date-picker-trigger"
                  className={cn(
                    buttonFullWidth
                      ? "w-full min-w-0 justify-start"
                      : "w-auto max-w-full",
                    buttonClassName
                  )}
                >
                  <span
                    className={cn(
                      "min-w-0 truncate",
                      buttonFullWidth && "flex-1 text-start"
                    )}
                  >
                    {singleValue
                      ? resolvedSingleFormatDate(singleValue)
                      : placeholder}
                  </span>
                  <CalendarIcon
                    aria-hidden="true"
                    className="pointer-events-none shrink-0 text-foreground"
                  />
                </Button>
              }
            />
            {popoverContent}
          </Popover>
        </div>
      )

    return (
      <div
        data-slot="date-picker"
        role="group"
        className={cn(
          datePickerTriggerVariants({ variant: "time" }),
          "flex w-full max-w-full min-w-0 flex-row flex-nowrap items-end gap-2"
        )}
      >
        <Field className={cn("min-w-0 flex-1 basis-0", className)}>
          <FieldLabel htmlFor={dateId}>{dateLabel}</FieldLabel>
          {timeDateField}
        </Field>
        <Field className="w-20 shrink-0 basis-20">
          <FieldLabel htmlFor={timeId}>{timeLabel}</FieldLabel>
          <Input
            type="time"
            id={timeId}
            step={timeStep}
            disabled={disabled}
            value={singleValue ? formatTimeHmForInput(singleValue) : ""}
            onChange={onTimeInputChange}
            aria-describedby={ariaDescribedBy}
            className={cn(
              "w-full tabular-nums",
              NATIVE_DATE_OR_TIME_INPUT_CLASSES
            )}
          />
        </Field>
      </div>
    )
  }

  if (
    isSingle &&
    (variant === "default" || variant === "dob") &&
    resolvedTrigger === "input"
  ) {
    const seg = props as
      | DatePickerSingleDefaultProps
      | DatePickerSingleDobProps
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div
          data-slot="date-picker"
          className={cn(
            datePickerTriggerVariants({ variant }),
            "w-full max-w-full",
            className
          )}
        >
          <InputGroup
            size={seg.inputGroupSize ?? "md"}
            className="min-w-0 w-full"
          >
            <InputGroupInput
              id={id}
              type="date"
              value={singleValue ? formatDateForNativeInput(singleValue) : ""}
              onChange={(e) => {
                const next = parseNativeDateInput(e.target.value)
                setSingleValue(next)
                if (next) handleMonthChange(next)
              }}
              disabled={disabled}
              aria-invalid={seg["aria-invalid"]}
              aria-describedby={ariaDescribedBy}
              aria-label={ariaLabel}
              className={cn(
                "min-w-0 flex-1 [color-scheme:inherit]",
                NATIVE_DATE_OR_TIME_INPUT_CLASSES,
                seg.inputClassName
              )}
              onKeyDown={(e) => {
                if (!openOnArrowDown || disabled) return
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              {triggerCalendarButton(
                id ? `${id}-calendar` : undefined,
                "Select a date"
              )}
            </InputGroupAddon>
          </InputGroup>
        </div>
        {popoverContent}
      </Popover>
    )
  }

  if (variant === "natural" && isSingle) {
    const textProps = props as DatePickerSingleNaturalProps
    const parse = textProps.parseText
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div
          data-slot="date-picker"
          className={cn(
            datePickerTriggerVariants({ variant: "natural" }),
            className
          )}
        >
          <InputGroup className="w-full">
            <InputGroupInput
              id={id}
              value={textProps.textValue}
              placeholder={
                textProps.textPlaceholder ?? textProps.inputPlaceholder
              }
              disabled={disabled}
              aria-label={ariaLabel}
              aria-invalid={textProps["aria-invalid"]}
              aria-describedby={ariaDescribedBy}
              onChange={(e) => {
                const raw = e.target.value
                textProps.onTextChange(raw)
                const parsed = parse?.(raw)
                if (parsed) {
                  setSingleValue(parsed)
                  handleMonthChange(parsed)
                }
              }}
              onKeyDown={(e) => {
                if (!openOnArrowDown || disabled) return
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              {triggerCalendarButton(
                id ? `${id}-calendar` : undefined,
                "Select a date"
              )}
            </InputGroupAddon>
          </InputGroup>
        </div>
        {popoverContent}
      </Popover>
    )
  }

  const showCalendarOnButton =
    mode !== "range" || showRangeCalendarIcon

  const buttonLabel =
    mode === "range"
      ? rangeValue?.from
        ? formatRange(rangeValue)
        : placeholder
      : singleValue
        ? resolvedSingleFormatDate(singleValue)
        : placeholder

  const calendarIconNode = showCalendarOnButton ? (
    <CalendarIcon
      aria-hidden="true"
      className="pointer-events-none shrink-0 text-foreground"
    />
  ) : null

  const endCalendarIcon =
    calendarIconPosition === "end" ? calendarIconNode : null
  const hasEndCluster = Boolean(buttonEndIcon) || Boolean(endCalendarIcon)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            type="button"
            variant="outline"
            size={buttonSize}
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            data-slot="date-picker"
            className={cn(
              datePickerTriggerVariants({
                variant: variant === "dob" ? "dob" : "default",
              }),
              buttonFullWidth
                ? "w-full min-w-0 justify-start"
                : "w-auto max-w-full",
              className,
              buttonClassName
            )}
          >
            {buttonStartIcon ? (
              <span className="inline-flex shrink-0 items-center">
                {buttonStartIcon}
              </span>
            ) : null}
            {calendarIconPosition === "start" ? calendarIconNode : null}
            <span
              className={cn(
                "min-w-0 truncate",
                buttonFullWidth && "flex-1 text-start"
              )}
            >
              {buttonLabel}
            </span>
            {hasEndCluster ? (
              <span className="inline-flex shrink-0 items-center gap-1.5">
                {buttonEndIcon}
                {endCalendarIcon}
              </span>
            ) : null}
          </Button>
        }
      />
      {popoverContent}
    </Popover>
  )
}

export { DatePicker }
