import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

export type ColorChipProps = {
  className?: string
  /** Classes for the top swatch area (e.g. `bg-white`, `bg-blue-500`). */
  swatchClassName?: string
  /** Inline styles for the swatch (e.g. `backgroundColor`) when you need values outside Tailwind. */
  swatchStyle?: React.CSSProperties
  /** Extra classes on the swatch container (min-height, padding, etc.). */
  swatchContainerClassName?: string
  /** WCAG / contrast label shown on the swatch. */
  contrastLabel?: React.ReactNode
  /** Text classes for the contrast label on the swatch. */
  contrastClassName?: string
  /** Extra wrapper around the contrast label. */
  contrastSlotClassName?: string
  /**
   * Renders a divider between swatch and footer (e.g. for light swatches on a light page).
   * @default false
   */
  showSwatchDivider?: boolean
  /** Primary label (first line under the swatch). */
  name?: React.ReactNode
  nameClassName?: string
  /** Secondary line: token, hex, oklch, etc. */
  value?: React.ReactNode
  valueClassName?: string
  /** Optional third line, rendered under `value`. */
  value2?: React.ReactNode
  value2ClassName?: string
  /** Classes on the default footer `<ul>`. */
  footerClassName?: string
  /**
   * Replace the default name/value footer entirely (e.g. custom rows or actions).
   * When set, `name`, `value`, and footer class props are ignored.
   */
  footer?: React.ReactNode
}

export function ColorChip({
  className,
  swatchClassName,
  swatchStyle,
  swatchContainerClassName,
  contrastLabel,
  contrastClassName,
  contrastSlotClassName,
  showSwatchDivider = false,
  name,
  nameClassName,
  value,
  valueClassName,
  value2,
  value2ClassName,
  footerClassName,
  footer,
}: ColorChipProps) {
  const hasDefaultFooter =
    footer === undefined && (name != null || value != null || value2 != null)

  return (
    <div
      className={cn(
        "max-w-none min-w-0 overflow-hidden rounded-md border border-border shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "mb-1 flex items-center justify-center py-5 text-sm",
          "rounded-t-md",
          swatchClassName,
          showSwatchDivider && "border-b border-border",
          swatchContainerClassName
        )}
        style={swatchStyle}
      >
        {contrastLabel != null && (
          <div
            className={cn(
              "flex flex-col text-center",
              contrastSlotClassName
            )}
          >
            <span
              className={cn(
                "text-xs font-medium uppercase",
                contrastClassName
              )}
            >
              {contrastLabel}
            </span>
          </div>
        )}
      </div>

      {footer !== undefined ? (
        footer
      ) : hasDefaultFooter ? (
        <ul
          className={cn(
            "m-0 list-none space-y-0.5 p-2",
            footerClassName
          )}
        >
          {name != null && (
            <li className={cn("font-medium text-sm text-primary", nameClassName)}>
              {name}
            </li>
          )}
          {value != null && (
            <li
              className={cn(
                "font-mono text-2xs text-muted-foreground",
                valueClassName
              )}
            >
              {value}
            </li>
          )}
          {value2 != null && (
            <li
              className={cn(
                "font-mono text-2xs text-muted-foreground",
                value2ClassName
              )}
            >
              {value2}
            </li>
          )}
        </ul>
      ) : null}
    </div>
  )
}
