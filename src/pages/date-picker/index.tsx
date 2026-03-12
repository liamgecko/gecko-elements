import { useState } from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { parseDate } from "chrono-node"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function formatLongDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(value: Date | undefined) {
  if (!value) return false
  return !isNaN(value.getTime())
}

export function DatePickerPage() {
  const [basicDate, setBasicDate] = useState<Date | undefined>()
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  const [dobOpen, setDobOpen] = useState(false)
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined)
  const [inputOpen, setInputOpen] = useState(false)
  const [inputDate, setInputDate] = useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [inputMonth, setInputMonth] = useState<Date | undefined>(inputDate)
  const [inputValue, setInputValue] = useState<string>(
    formatLongDate(inputDate)
  )
  const [timeOpen, setTimeOpen] = useState(false)
  const [timeDate, setTimeDate] = useState<Date | undefined>(undefined)
  const [naturalOpen, setNaturalOpen] = useState(false)
  const [naturalValue, setNaturalValue] = useState("In 2 days")
  const [naturalDate, setNaturalDate] = useState<Date | undefined>(
    parseDate("In 2 days") || undefined
  )

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Date picker</h1>
          <p className="text-sm text-muted-foreground">
            Choose single dates or ranges using a calendar-based picker.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A single-date picker with a calendar popup.
          </p>
          <ComponentExample>
            <Field className="w-44">
              <FieldLabel htmlFor="date-picker-basic">Date</FieldLabel>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      id="date-picker-basic"
                      className="justify-start font-normal"
                    >
                      {basicDate ? (
                        format(basicDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={basicDate}
                    onSelect={setBasicDate}
                    defaultMonth={basicDate}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="range" label="Range picker">
          <h2 className="text-lg font-semibold">Range picker</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Select a start and end date for booking windows or reporting periods.
          </p>
          <ComponentExample>
            <Field className="w-60">
              <FieldLabel htmlFor="date-picker-range">Date range</FieldLabel>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      id="date-picker-range"
                      className="justify-start px-2.5 font-normal"
                    >
                      <CalendarIcon data-icon="inline-start" />
                      {rangeDate?.from ? (
                        rangeDate.to ? (
                          <>
                            {format(rangeDate.from, "LLL dd, y")} -{" "}
                            {format(rangeDate.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(rangeDate.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={rangeDate?.from}
                    selected={rangeDate}
                    onSelect={setRangeDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="dob" label="Date of birth">
          <h2 className="text-lg font-semibold">Date of birth</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A date picker optimised for selecting dates of birth.
          </p>
          <ComponentExample>
            <Field className="w-44">
              <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
              <Popover open={dobOpen} onOpenChange={setDobOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      id="date-of-birth"
                      className="justify-start font-normal"
                    >
                      {dobDate
                        ? dobDate.toLocaleDateString()
                        : "Select date"}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dobDate}
                    defaultMonth={dobDate}
                    captionLayout="dropdown"
                    onSelect={(value) => {
                      setDobDate(value)
                      setDobOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="input" label="Input">
          <h2 className="text-lg font-semibold">Input</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine a date picker with a text input for manual entry and calendar selection.
          </p>
          <ComponentExample>
            <Field className="w-48">
                <FieldLabel htmlFor="date-required">Subscription date</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="date-required"
                    value={inputValue}
                    placeholder="June 01, 2025"
                    onChange={(e) => {
                      const raw = e.target.value
                      setInputValue(raw)
                      const parsed = new Date(raw)
                      if (isValidDate(parsed)) {
                        setInputDate(parsed)
                        setInputMonth(parsed)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setInputOpen(true)
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={inputOpen} onOpenChange={setInputOpen}>
                      <PopoverTrigger
                        render={
                          <InputGroupButton
                            id="date-picker-input"
                            variant="ghost"
                            aria-label="Select date"
                          >
                            <CalendarIcon />
                            <span className="sr-only">Select date</span>
                          </InputGroupButton>
                        }
                      />
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={inputDate}
                          month={inputMonth}
                          onMonthChange={setInputMonth}
                          onSelect={(value) => {
                            setInputDate(value)
                            setInputValue(formatLongDate(value))
                            setInputOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="time-picker" label="Time picker">
          <h2 className="text-lg font-semibold">Time picker</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine a date picker with a time input to capture both parts of a timestamp.
          </p>
          <ComponentExample>
            <FieldGroup className="max-w-xs flex-row">
              <Field>
                <FieldLabel htmlFor="date-picker-time">Date</FieldLabel>
                <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        id="date-picker-time"
                        className="w-32 justify-between font-normal"
                      >
                        {timeDate ? format(timeDate, "PPP") : "Select date"}
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={timeDate}
                      captionLayout="dropdown"
                      defaultMonth={timeDate}
                      onSelect={(value) => {
                        setTimeDate(value)
                        setTimeOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field className="w-32">
                <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
                <Input
                  type="time"
                  id="time-picker-optional"
                  step="1"
                  defaultValue="10:30:00"
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
            </FieldGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="natural-language" label="Natural language">
          <h2 className="text-lg font-semibold">Natural language</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Parse phrases like &quot;next Friday&quot; or &quot;in two weeks&quot; into concrete dates.
          </p>
          <ComponentExample>
            <Field className="max-w-xs">
              <FieldLabel htmlFor="date-optional">Schedule date</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="date-optional"
                  value={naturalValue}
                  placeholder="Tomorrow or next week"
                  onChange={(e) => {
                    const raw = e.target.value
                    setNaturalValue(raw)
                    const parsed = parseDate(raw)
                    if (parsed) {
                      setNaturalDate(parsed)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault()
                      setNaturalOpen(true)
                    }
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <Popover open={naturalOpen} onOpenChange={setNaturalOpen}>
                    <PopoverTrigger
                      render={
                        <InputGroupButton
                          id="date-picker-natural"
                          variant="ghost"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Select date</span>
                        </InputGroupButton>
                      }
                    />
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="end"
                      sideOffset={8}
                    >
                      <Calendar
                        mode="single"
                        selected={naturalDate}
                        captionLayout="dropdown"
                        defaultMonth={naturalDate}
                        onSelect={(value) => {
                          setNaturalDate(value)
                          setNaturalValue(formatLongDate(value))
                          setNaturalOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
              <div className="text-xs text-muted-foreground">
                Your post will be published on{" "}
                <span className="font-medium">
                  {formatLongDate(naturalDate)}
                </span>
                .
              </div>
            </Field>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
