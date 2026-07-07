import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@gecko/ui/lib/utils"
import { Input } from "@gecko/ui/components/input"

type DateInputSize = "sm" | "md" | "lg"

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
  yearDigits: 2 | 4
): Date | undefined {
  const day = parseInt(dayStr, 10)
  const month = parseInt(monthStr, 10)
  if (Number.isNaN(day) || Number.isNaN(month)) return undefined
  if (day < 1 || day > 31 || month < 1 || month > 12) return undefined

  const year =
    yearDigits === 4
      ? parseInt(yearStr, 10)
      : parseYear2Digit(yearStr)
  if (Number.isNaN(year) || yearStr.length !== yearDigits) return undefined

  const d = new Date(year, month - 1, day)
  if (Number.isNaN(d.getTime())) return undefined
  if (d.getDate() !== day || d.getMonth() !== month - 1 || d.getFullYear() !== year) return undefined
  return d
}

function padSegment(val: string, maxLength: number): string {
  const n = parseInt(val, 10)
  if (Number.isNaN(n) || val.length >= maxLength) return val
  return n >= 1 && n <= (maxLength === 2 ? 9 : 99) ? String(n).padStart(maxLength, "0") : val
}

export type DateInputProps = Omit<React.ComponentProps<"div">, "size" | "onChange"> & {
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  yearDigits?: 2 | 4
  monthFirst?: boolean
  size?: DateInputSize
  disabled?: boolean
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(function DateInput(
  {
    value,
    onChange,
    yearDigits = 2,
    monthFirst = false,
    size = "md",
    disabled = false,
    className,
    id: idProp,
    ...props
  },
  ref
) {
  const rootId = idProp ?? React.useId()
  const yearLen = yearDigits
  const yearPlaceholder = yearDigits === 4 ? "YYYY" : "YY"

  const valueDay = value ? String(value.getDate()).padStart(2, "0") : ""
  const valueMonth = value ? String(value.getMonth() + 1).padStart(2, "0") : ""
  const valueYear =
    value
      ? yearDigits === 4
        ? String(value.getFullYear())
        : String(value.getFullYear()).slice(-2)
      : ""

  const [dayStr, setDayStr] = React.useState(valueDay)
  const [monthStr, setMonthStr] = React.useState(valueMonth)
  const [yearStr, setYearStr] = React.useState(valueYear)

  React.useEffect(() => {
    setDayStr(valueDay)
    setMonthStr(valueMonth)
    setYearStr(valueYear)
  }, [valueDay, valueMonth, valueYear])

  const emitChange = React.useCallback(
    (d: string, m: string, y: string) => {
      const parsed = parseDateFromSegments(d, m, y, yearDigits)
      onChange?.(parsed)
    },
    [onChange, yearDigits]
  )

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 2)
    if (raw.length === 2) {
      const n = parseInt(raw, 10)
      if (n > 31) raw = "31"
      else if (n === 0) raw = ""
    }
    setDayStr(raw)
    emitChange(raw, monthStr, yearStr)
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 2)
    if (raw.length === 2) {
      const n = parseInt(raw, 10)
      if (n > 12) raw = "12"
      else if (n === 0) raw = ""
    }
    setMonthStr(raw)
    emitChange(dayStr, raw, yearStr)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, yearLen)
    setYearStr(raw)
    emitChange(dayStr, monthStr, raw)
  }

  const focusSegment = (index: number) => {
    const el = document.getElementById(`${rootId}-segment-${index}`)
    if (el && "focus" in el) (el as HTMLInputElement).focus()
  }

  const handleDayInput = (e: React.FormEvent<HTMLInputElement>) => {
    const v = (e.target as HTMLInputElement).value.replace(/\D/g, "").slice(0, 2)
    if (v.length === 2) focusSegment(monthFirst ? 2 : 1)
  }

  const handleMonthInput = (e: React.FormEvent<HTMLInputElement>) => {
    const v = (e.target as HTMLInputElement).value.replace(/\D/g, "").slice(0, 2)
    if (v.length === 2) focusSegment(monthFirst ? 1 : 2)
  }

  const handleYearInput = (e: React.FormEvent<HTMLInputElement>) => {
    const v = (e.target as HTMLInputElement).value.replace(/\D/g, "").slice(0, yearLen)
    if (v.length === yearLen) (e.target as HTMLInputElement).blur()
  }

  const handleDayBlur = () => {
    if (dayStr.length === 1) {
      const padded = padSegment(dayStr, 2)
      if (padded !== dayStr) setDayStr(padded)
    }
  }

  const handleMonthBlur = () => {
    if (monthStr.length === 1) {
      const padded = padSegment(monthStr, 2)
      if (padded !== monthStr) setMonthStr(padded)
    }
  }

  const segmentProps = {
    inputMode: "numeric" as const,
    size,
    disabled,
    "aria-invalid": props["aria-invalid"],
  }

  const firstSegmentId = `${rootId}-segment-0`
  const secondSegmentId = `${rootId}-segment-1`
  const thirdSegmentId = `${rootId}-segment-2`

  const dayInput = (
    <Input
      id={monthFirst ? secondSegmentId : firstSegmentId}
      data-slot="date-input-day"
      placeholder="DD"
      maxLength={2}
      value={dayStr}
      onChange={handleDayChange}
      onInput={handleDayInput}
      onBlur={handleDayBlur}
      className="w-14 text-center"
      {...segmentProps}
    />
  )

  const monthInput = (
    <Input
      id={monthFirst ? firstSegmentId : secondSegmentId}
      data-slot="date-input-month"
      placeholder="MM"
      maxLength={2}
      value={monthStr}
      onChange={handleMonthChange}
      onInput={handleMonthInput}
      onBlur={handleMonthBlur}
      className="w-14 text-center"
      {...segmentProps}
    />
  )

  const yearInput = (
    <Input
      id={thirdSegmentId}
      data-slot="date-input-year"
      placeholder={yearPlaceholder}
      maxLength={yearLen}
      value={yearStr}
      onChange={handleYearChange}
      onInput={handleYearInput}
      className={cn("text-center", yearDigits === 2 ? "w-14" : "w-16")}
      {...segmentProps}
    />
  )

  const handleRootFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) focusSegment(0)
  }

  const mergedRootProps = mergeProps<"div">(
    {
      id: rootId,
      role: "group",
      tabIndex: 0,
      onFocus: handleRootFocus,
      className: cn(
        "has-[[data-slot=date-input-day][aria-invalid=true]]:has-[input]:border-input-destructive has-[[data-slot=date-input-month][aria-invalid=true]]:has-[input]:border-input-destructive has-[[data-slot=date-input-year][aria-invalid=true]]:has-[input]:border-input-destructive flex items-center gap-2",
        className
      ),
    },
    props
  )

  return (
    <div ref={ref} data-slot="date-input" {...mergedRootProps}>
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
})

export { DateInput }
