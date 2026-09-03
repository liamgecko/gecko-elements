"use client"

import * as React from "react"
import { HexColorPicker } from "react-colorful"

import { Input } from "@gecko/ui/components/input"
import { Popover, PopoverContent, PopoverTrigger } from "@gecko/ui/components/popover"
import { cn } from "@gecko/ui/lib/utils"

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/
const HEX_INPUT_PATTERN = "#[0-9A-Fa-f]{6}"
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
  "type" | "value" | "defaultValue" | "onChange" | "inputMode" | "spellCheck" | "autoComplete" | "pattern" | "maxLength"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function ColorPicker({
  value,
  defaultValue,
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
    sm: "ps-9",
    md: "ps-10",
    lg: "ps-11",
  } as const

  const buttonSize = buttonSizeMap[inputSize]
  const inputPaddingLeft = inputPaddingLeftMap[inputSize]
  const isControlled = value !== undefined
  const {
    id,
    name,
    placeholder,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
    ...inputProps
  } = props

  const [internalInputValue, setInternalInputValue] = React.useState(parseHex(defaultValue) ?? defaultValue ?? "")
  const controlledInputValue = parseHex(value) ?? value ?? ""
  const inputValue = isControlled ? controlledInputValue : internalInputValue
  const selectedHex = parseHex(inputValue)

  function setValue(next: string) {
    if (!isControlled) {
      setInternalInputValue(next)
    }
    onValueChange?.(next)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const typedValue = event.target.value
    const next = parseHex(typedValue) ?? typedValue
    setValue(next)
  }

  function handlePickerChange(color: string) {
    const next = normalizeHex(color)
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
              aria-label={selectedHex ? `Choose colour. Current value ${selectedHex}` : "Choose colour"}
              className={cn(
                "absolute start-2 rounded-full bg-muted p-0 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)] after:absolute after:-inset-1",
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:opacity-75",
                buttonSize,
              )}
              style={{
                backgroundColor: selectedHex ?? undefined,
              }}
            />
          }
        />

        <Input
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          pattern={HEX_INPUT_PATTERN}
          maxLength={7}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          size={inputSize}
          className={cn(
            "w-full max-w-[126px]",
            !disabled && "group-hover/color-picker:border-input-hover",
            className,
            inputPaddingLeft,
          )}
          id={id}
          name={name}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />
      </div>

      <PopoverContent className="flex w-auto flex-col gap-3 p-3">
        <HexColorPicker color={selectedHex ?? DEFAULT_COLOR} onChange={handlePickerChange} />

        <Input
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          pattern={HEX_INPUT_PATTERN}
          maxLength={7}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          size={inputSize}
          id={id ? `${id}-popover` : undefined}
          placeholder={placeholder}
          aria-label="Hex colour"
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
        />
      </PopoverContent>
    </Popover>
  )
}
