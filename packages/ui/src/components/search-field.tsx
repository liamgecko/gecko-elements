"use client"

import * as React from "react"
import { Search, XIcon } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group"

type SearchFieldSize = "sm" | "md" | "lg"

const searchFieldIconSizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4.5",
} as const

export interface SearchFieldProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  size?: SearchFieldSize
  showClear?: boolean
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (props, ref) => {
    const {
      className,
      size = "md",
      showClear = false,
      value,
      defaultValue,
      onChange,
      disabled,
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
        onChange?.(e)
      },
      [isControlled, onChange]
    )

    const handleClear = React.useCallback(() => {
      if (disabled) return
      const input = inputRef.current
      if (input) {
        input.value = ""
        if (isControlled) {
          onChange?.({
            target: input,
          } as React.ChangeEvent<HTMLInputElement>)
        } else {
          input.dispatchEvent(new Event("input", { bubbles: true }))
          setHasValueUncontrolled(false)
        }
        input.focus()
      }
    }, [disabled, isControlled, onChange])

    return (
      <InputGroup size={size} className={cn("w-full", className)}>
        <InputGroupAddon align="inline-start">
          <Search
            aria-hidden
            className={searchFieldIconSizeMap[size]}
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
          {...rest}
        />
        {showClear && (
          <InputGroupAddon align="inline-end">
            {hasValue && (
              <InputGroupButton
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={handleClear}
                aria-label="Clear"
              >
                <XIcon className="pointer-events-none" />
              </InputGroupButton>
            )}
          </InputGroupAddon>
        )}
      </InputGroup>
    )
  }
)

SearchField.displayName = "SearchField"

export { SearchField }
