"use client"

import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group"

type SearchSize = "sm" | "md" | "lg"

const searchIconSizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4.5",
} as const

export interface SearchProps
  extends Omit<
    React.ComponentProps<"input">,
    "size" | "value" | "defaultValue"
  > {
  size?: SearchSize
  showClear?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (props, ref) => {
    const {
      className,
      size = "md",
      showClear = false,
      value,
      defaultValue,
      onChange,
      onValueChange,
      disabled,
      "aria-label": ariaLabel = "Search",
      ...rest
    } = props

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    const isControlled = value !== undefined
    const [hasValueUncontrolled, setHasValueUncontrolled] = React.useState(
      () => Boolean(defaultValue && String(defaultValue).length > 0)
    )

    const hasValue = isControlled
      ? Boolean(value != null && String(value).length > 0)
      : hasValueUncontrolled

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setHasValueUncontrolled(e.target.value.length > 0)
        onValueChange?.(e.currentTarget.value)
        onChange?.(e)
      },
      [isControlled, onChange, onValueChange]
    )

    const handleClear = React.useCallback(() => {
      if (disabled) return
      const input = inputRef.current
      if (input) {
        const valueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )?.set

        if (valueSetter) valueSetter.call(input, "")
        else input.value = ""
        input.dispatchEvent(new Event("input", { bubbles: true }))
        input.focus()
      }
    }, [disabled])

    return (
      <InputGroup size={size} className={cn("w-full", className)}>
        <InputGroupAddon align="inline-start">
          <SearchIcon
            aria-hidden="true"
            className={searchIconSizeMap[size]}
          />
        </InputGroupAddon>
        <InputGroupInput
          ref={mergedRef}
          type="search"
          className="[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:[-webkit-appearance:none]"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          aria-label={ariaLabel}
          {...rest}
        />
        {showClear && hasValue ? (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              className="min-h-6 min-w-6"
              disabled={disabled}
              onClick={handleClear}
              aria-label="Clear search"
            >
              <XIcon aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    )
  }
)

Search.displayName = "Search"

export { Search }
