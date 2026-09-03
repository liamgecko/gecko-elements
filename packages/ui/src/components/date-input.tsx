"use client"

import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"
import { Input } from "@gecko/ui/components/input"

type DateInputSize = "sm" | "md" | "lg"

function dateKey(date: Date | undefined): number | undefined {
  return date?.getTime()
}

function parseYear2Digit(yy: string): number {
  const n = parseInt(yy, 10)
  if (Number.isNaN(n)) return NaN
  if (n <= 30) return 2000 + n
  return 1900 + n
}

function parseDateFromSegments(
  dayStr: string,
  monthStr: string,
  yearStr: string,
  yearDigits: 2 | 4,
): Date | undefined {
  const day = parseInt(dayStr, 10)
  const month = parseInt(monthStr, 10)
  if (Number.isNaN(day) || Number.isNaN(month)) return undefined
  if (day < 1 || day > 31 || month < 1 || month > 12) return undefined

  const year =
    yearDigits === 4 ? parseInt(yearStr, 10) : parseYear2Digit(yearStr)
  if (Number.isNaN(year) || yearStr.length !== yearDigits) return undefined

  const d = new Date(year, month - 1, day)
  if (Number.isNaN(d.getTime())) return undefined
  if (
    d.getDate() !== day ||
    d.getMonth() !== month - 1 ||
    d.getFullYear() !== year
  )
    return undefined
  return d
}

function padSegment(val: string, maxLength: number): string {
  const n = parseInt(val, 10)
  if (Number.isNaN(n) || val.length >= maxLength) return val
  return n >= 1 && n <= (maxLength === 2 ? 9 : 99)
    ? String(n).padStart(maxLength, "0")
    : val
}

export type DateInputProps = Omit<
  React.ComponentProps<"div">,
  "size" | "onChange"
> & {
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  yearDigits?: 2 | 4
  monthFirst?: boolean
  size?: DateInputSize
  disabled?: boolean
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  function DateInput(
    {
      value,
      onChange,
      yearDigits = 4,
      monthFirst = false,
      size = "md",
      disabled = false,
      className,
      id: idProp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...rootProps
    },
    ref,
  ) {
    const generatedId = React.useId()
    const rootId = idProp ?? generatedId
    const yearLen = yearDigits
    const yearPlaceholder = yearDigits === 4 ? "YYYY" : "YY"

    const valueDay = value ? String(value.getDate()).padStart(2, "0") : ""
    const valueMonth = value
      ? String(value.getMonth() + 1).padStart(2, "0")
      : ""
    const valueYear = value
      ? yearDigits === 4
        ? String(value.getFullYear())
        : String(value.getFullYear()).slice(-2)
      : ""

    const [dayStr, setDayStr] = React.useState(valueDay)
    const [monthStr, setMonthStr] = React.useState(valueMonth)
    const [yearStr, setYearStr] = React.useState(valueYear)

    const dayRef = React.useRef<HTMLInputElement>(null)
    const monthRef = React.useRef<HTMLInputElement>(null)
    const yearRef = React.useRef<HTMLInputElement>(null)
    const externalValueKey = dateKey(value)
    const previousExternalValueKeyRef = React.useRef(externalValueKey)
    const pendingChangeRef = React.useRef<{
      from: number | undefined
      to: number | undefined
    } | null>(null)

    React.useLayoutEffect(() => {
      const pendingChange = pendingChangeRef.current

      if (
        pendingChange &&
        pendingChange.from === previousExternalValueKeyRef.current &&
        pendingChange.to === externalValueKey
      ) {
        pendingChangeRef.current = null
        previousExternalValueKeyRef.current = externalValueKey
        return
      }

      pendingChangeRef.current = null

      if (previousExternalValueKeyRef.current !== externalValueKey) {
        previousExternalValueKeyRef.current = externalValueKey
        setDayStr(valueDay)
        setMonthStr(valueMonth)
        setYearStr(valueYear)
      }
    }, [
      dayStr,
      externalValueKey,
      monthStr,
      valueDay,
      valueMonth,
      valueYear,
      yearStr,
    ])

    const emitChange = React.useCallback(
      (d: string, m: string, y: string) => {
        const parsed = parseDateFromSegments(d, m, y, yearDigits)
        pendingChangeRef.current = {
          from: externalValueKey,
          to: dateKey(parsed),
        }
        onChange?.(parsed)
      },
      [externalValueKey, onChange, yearDigits],
    )

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
      setDayStr(raw)
      emitChange(raw, monthStr, yearStr)

      const day = Number(raw)
      if (raw.length === 2 && day >= 1 && day <= 31) {
        const nextInput = monthFirst ? yearRef : monthRef
        nextInput.current?.focus()
      }
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 2)
      setMonthStr(raw)
      emitChange(dayStr, raw, yearStr)

      const month = Number(raw)
      if (raw.length === 2 && month >= 1 && month <= 12) {
        const nextInput = monthFirst ? dayRef : yearRef
        nextInput.current?.focus()
      }
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, yearLen)
      setYearStr(raw)
      emitChange(dayStr, monthStr, raw)
    }

  const handleDayBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value
    if (currentValue.length === 1) {
      const padded = padSegment(currentValue, 2)
      if (padded !== currentValue) setDayStr(padded)
    }
  }

  const handleMonthBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value
    if (currentValue.length === 1) {
      const padded = padSegment(currentValue, 2)
      if (padded !== currentValue) setMonthStr(padded)
    }
  }

    const segmentProps = {
      inputMode: "numeric" as const,
      size,
      disabled,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    }

    const dayInputId = monthFirst ? `${rootId}-day` : rootId
    const monthInputId = monthFirst ? rootId : `${rootId}-month`
    const yearInputId = `${rootId}-year`
    const accessibleName = ariaLabel ? `${ariaLabel}, ` : ""

    const dayInput = (
      <Input
        ref={dayRef}
        id={dayInputId}
        data-slot="date-input-day"
        placeholder="DD"
        aria-label={`${accessibleName}day`}
        maxLength={2}
        value={dayStr}
        onChange={handleDayChange}
        onBlur={handleDayBlur}
        className="w-14 text-center"
        {...segmentProps}
      />
    )

    const monthInput = (
      <Input
        ref={monthRef}
        id={monthInputId}
        data-slot="date-input-month"
        placeholder="MM"
        aria-label={`${accessibleName}month`}
        maxLength={2}
        value={monthStr}
        onChange={handleMonthChange}
        onBlur={handleMonthBlur}
        className="w-14 text-center"
        {...segmentProps}
      />
    )

    const yearInput = (
      <Input
        ref={yearRef}
        id={yearInputId}
        data-slot="date-input-year"
        placeholder={yearPlaceholder}
        aria-label={`${accessibleName}year`}
        maxLength={yearLen}
        value={yearStr}
        onChange={handleYearChange}
        className={cn("text-center", yearDigits === 2 ? "w-14" : "w-16")}
        {...segmentProps}
      />
    )

    return (
      <div
        ref={ref}
        id={`${rootId}-group`}
        data-slot="date-input"
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "has-[[data-slot=date-input-day][aria-invalid=true]]:has-[input]:border-input-destructive has-[[data-slot=date-input-month][aria-invalid=true]]:has-[input]:border-input-destructive has-[[data-slot=date-input-year][aria-invalid=true]]:has-[input]:border-input-destructive flex items-center gap-2",
          className,
        )}
        {...rootProps}
      >
        {monthFirst ? (
          <>
            {monthInput}
            {dayInput}
            {yearInput}
          </>
        ) : (
          <>
            {dayInput}
            {monthInput}
            {yearInput}
          </>
        )}
      </div>
    )
  },
)

export { DateInput }
