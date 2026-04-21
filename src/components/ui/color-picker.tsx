"use client"

import * as React from "react"
import { HexColorPicker } from "react-colorful"

import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/
const DEFAULT_COLOR = "#FFFFFF"

function normalizeHex(value: string) {
  return value.toUpperCase()
}

function parseHex(value: string | undefined) {
  if (!value) return null
  return HEX_PATTERN.test(value) ? normalizeHex(value) : null
}

type ColorPickerProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
}

export function ColorPicker({
  value,
  defaultValue,
  onChange,
  onValueChange,
  size = "md",
  disabled,
  className,
  ...props
}: ColorPickerProps) {
  const inputSize = size ?? "md"
  const buttonSizeMap = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  } as const

  const inputPaddingLeftMap = {
    sm: "pl-9",
    md: "pl-10",
    lg: "pl-11",
  } as const

  const buttonSize = buttonSizeMap[inputSize]
  const inputPaddingLeft = inputPaddingLeftMap[inputSize]
  const isControlled = value !== undefined
  const { id, name, placeholder, ...inputProps } = props

  const [internalInputValue, setInternalInputValue] = React.useState(
    defaultValue ?? ""
  )
  const [selectedHex, setSelectedHex] = React.useState<string>(() => {
    return parseHex(value ?? defaultValue) ?? DEFAULT_COLOR
  })

  const inputValue = isControlled ? value ?? "" : internalInputValue

  React.useEffect(() => {
    if (!isControlled) return
    const parsed = parseHex(value)
    if (parsed) {
      setSelectedHex(parsed)
    }
  }, [isControlled, value])

  function setValue(next: string) {
    if (!isControlled) {
      setInternalInputValue(next)
    }
    onValueChange?.(next)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value
    setValue(next)
    onChange?.(event)

    const parsed = parseHex(next)
    if (parsed) {
      setSelectedHex(parsed)
    }
  }

  function handlePickerChange(color: string) {
    const next = normalizeHex(color)
    setSelectedHex(next)
    setValue(next)
  }

  return (
    <Popover>
      <div className="group/color-picker relative flex w-full items-center">
        <PopoverTrigger
          render={
            <button
              type="button"
              disabled={disabled}
              aria-label="Pick color"
              className={cn(
                "absolute left-2 rounded-full bg-red p-0 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]",
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:opacity-75",
                buttonSize
              )}
              style={{
                backgroundColor: selectedHex,
              }}
            />
          }
        />

        <Input
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          size={inputSize}
          className={cn(
            "w-full max-w-[126px]",
            !disabled && "group-hover/color-picker:border-input-hover",
            className,
            inputPaddingLeft
          )}
          id={id}
          name={name}
          placeholder={placeholder}
          {...inputProps}
        />
      </div>

      <PopoverContent className="flex w-auto flex-col gap-3 p-3">
        <HexColorPicker color={selectedHex} onChange={handlePickerChange} />

        <Input
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          size={inputSize}
          id={id ? `${id}-popover` : undefined}
          placeholder={placeholder}
          {...inputProps}
        />
      </PopoverContent>
    </Popover>
  )
}

