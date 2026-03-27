"use client"

import * as React from "react"
import { Check, PenSquare, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const inlineEditViewRootVariants = cva(
  "group flex w-full min-w-0 items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-transparent bg-transparent hover:bg-muted focus-visible:border-ring focus-visible:ring-0 focus-visible:outline-none text-foreground transition-colors",
  {
    variants: {
      size: {
        sm: "h-7.5 text-xs",
        md: "h-8.5 text-sm",
        lg: "h-9.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const inlineEditEditShellVariants = cva(
  "relative flex w-full min-w-0 items-center",
  {
    variants: {
      size: {
        sm: "h-7.5",
        md: "h-8.5",
        lg: "h-9.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const inlineEditViewValueVariants = cva("truncate min-w-0 flex-1", {
  variants: {
    size: {
      sm: "px-2",
      md: "px-2.5",
      lg: "px-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const inlineEditGlyphIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-3.5",
      lg: "size-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const inlineEditActionSlotVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-7.5",
      md: "size-8.5",
      lg: "size-9.5",
    },
    interactive: {
      false: "",
      true: "opacity-0 transition-opacity duration-150 text-foreground group-hover:opacity-100 group-focus-visible:opacity-100",
    },
  },
  defaultVariants: {
    size: "md",
    interactive: false,
  },
})

const inlineEditInputControlVariants = cva(
  "flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
)

const inlineEditInputEndPaddingVariants = cva("", {
  variants: {
    size: {
      sm: "pr-[68px]",
      md: "pr-[78px]",
      lg: "pr-[88px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const inlineEditActionToolbarVariants = cva(
  "absolute flex items-center gap-1",
  {
    variants: {
      size: {
        sm: "right-2",
        md: "right-2.5",
        lg: "right-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const inlineEditViewActionsRowVariants = cva("flex items-center")

const inlineEditActionGhostButtonVariants = cva("", {
  variants: {
    size: {
      sm: "size-5",
      md: "size-5.5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type InlineEditProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSubmit"
> &
  VariantProps<typeof inlineEditViewRootVariants> & {
    value: string
    onSave: (next: string) => void
    placeholder?: string
  }

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  function InlineEdit(
    {
      className,
      value,
      onSave,
      size = "md",
      placeholder = "",
      onKeyDown,
      ...props
    },
    ref
  ) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [draft, setDraft] = React.useState(value)
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const resolvedSize = size ?? "md"

    React.useEffect(() => {
      if (!isEditing) setDraft(value)
    }, [value, isEditing])

    React.useEffect(() => {
      if (!isEditing) return
      inputRef.current?.focus()
      inputRef.current?.select()
    }, [isEditing])

    const commitSave = React.useCallback(() => {
      onSave(draft)
      setIsEditing(false)
    }, [draft, onSave])

    const cancelEdit = React.useCallback(() => {
      setDraft(value)
      setIsEditing(false)
    }, [value])

    const openEdit = React.useCallback(() => {
      setDraft(value)
      setIsEditing(true)
    }, [value])

    if (isEditing) {
      return (
        <div
          ref={ref}
          data-slot="inline-edit"
          data-size={resolvedSize}
          data-editing="true"
          className={cn(
            inlineEditEditShellVariants({ size: resolvedSize }),
            className
          )}
          {...props}
        >
          <Input
            ref={inputRef}
            value={draft}
            size={resolvedSize}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            className={cn(
              inlineEditInputControlVariants(),
              inlineEditInputEndPaddingVariants({ size: resolvedSize })
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                commitSave()
              }
              if (e.key === "Escape") {
                e.preventDefault()
                cancelEdit()
              }
            }}
          />

          <div
            className={inlineEditActionToolbarVariants({
              size: resolvedSize,
            })}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-2xs"
              className={inlineEditActionGhostButtonVariants({
                size: resolvedSize,
              })}
              aria-label="Cancel edit"
              onClick={cancelEdit}
            >
              <X
                className={cn(
                  "pointer-events-none",
                  inlineEditGlyphIconVariants({ size: resolvedSize })
                )}
              />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-2xs"
              className={inlineEditActionGhostButtonVariants({
                size: resolvedSize,
              })}
              aria-label="Save edit"
              onClick={commitSave}
            >
              <Check
                className={cn(
                  "pointer-events-none",
                  inlineEditGlyphIconVariants({ size: resolvedSize })
                )}
              />
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label="Edit"
        data-slot="inline-edit"
        data-size={resolvedSize}
        data-editing="false"
        {...props}
        onClick={openEdit}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            openEdit()
            return
          }
          onKeyDown?.(e)
        }}
        className={cn(
          inlineEditViewRootVariants({ size: resolvedSize }),
          className
        )}
      >
        <span
          className={cn(
            inlineEditViewValueVariants({ size: resolvedSize })
          )}
        >
          {value}
        </span>

        <div className={inlineEditViewActionsRowVariants()}>
          <span
            className={inlineEditActionSlotVariants({
              size: resolvedSize,
              interactive: false,
            })}
            aria-hidden="true"
          />
          <span
            className={inlineEditActionSlotVariants({
              size: resolvedSize,
              interactive: true,
            })}
            aria-hidden="true"
          >
            <PenSquare
              className={inlineEditGlyphIconVariants({
                size: resolvedSize,
              })}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    )
  }
)

InlineEdit.displayName = "InlineEdit"

export { InlineEdit }
