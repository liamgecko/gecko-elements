import * as React from "react"

export type UseControllableStateOptions<T> = {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const resolved = isControlled ? (value as T) : uncontrolled

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const computed =
        typeof next === "function" ? (next as (prev: T) => T)(resolved) : next
      if (!isControlled) setUncontrolled(computed)
      onChange?.(computed)
    },
    [isControlled, onChange, resolved]
  )

  return [resolved, setValue] as const
}
