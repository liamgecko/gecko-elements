import * as React from "react"
import { Check, PenSquare, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { Input } from "@gecko/ui/components/input"
import { Button } from "@gecko/ui/components/button"
import { cn } from "@gecko/ui/lib/utils"

const inlineEditViewRootVariants = cva(
  "group flex w-full min-w-0 items-center justify-between whitespace-nowrap overflow-hidden rounded-sm border border-transparent bg-transparent hover:bg-muted focus-visible:border-ring focus-visible:ring-0 focus-visible:outline-none text-foreground transition-colors",
  {
    variants: {
      size: {
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-9 text-base",
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
        sm: "h-7",
        md: "h-8",
        lg: "h-9",
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
      sm: "size-7",
      md: "size-8",
      lg: "size-9",
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
    characterCount: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { size: "sm", characterCount: true, class: "pr-[112px]" },
    { size: "md", characterCount: true, class: "pr-[122px]" },
    { size: "lg", characterCount: true, class: "pr-[132px]" },
  ],
  defaultVariants: {
    size: "md",
    characterCount: false,
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

const inlineEditCharacterCountClassName =
  "shrink-0 text-xs font-medium tabular-nums text-foreground"

export type InlineEditProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSubmit"
> &
  VariantProps<typeof inlineEditViewRootVariants> & {
    value: string
    onSave: (next: string) => void
    onValueChange?: (next: string) => void
    placeholder?: string
    showCharacterCount?: boolean
    maxLength?: number
  }

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  function InlineEdit(
    {
      className,
      value,
      onSave,
      onValueChange,
      size = "md",
      placeholder = "",
      showCharacterCount = false,
      maxLength,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [draft, setDraft] = React.useState(value)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const editStartValueRef = React.useRef(value)

    const resolvedSize = size ?? "md"
    const hasCharacterCount =
      showCharacterCount && typeof maxLength === "number"

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

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
      const previous = editStartValueRef.current
      setDraft(previous)
      onValueChange?.(previous)
      setIsEditing(false)
    }, [onValueChange])

    const openEdit = React.useCallback(() => {
      editStartValueRef.current = value
      setDraft(value)
      setIsEditing(true)
    }, [value])

    const handleDraftChange = React.useCallback(
      (next: string) => {
        setDraft(next)
        onValueChange?.(next)
      },
      [onValueChange]
    )

    React.useEffect(() => {
      if (!isEditing) return

      const onPointerDown = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          commitSave()
        }
      }

      document.addEventListener("pointerdown", onPointerDown)
      return () => document.removeEventListener("pointerdown", onPointerDown)
    }, [isEditing, commitSave])

    if (isEditing) {
      return (
        <div
          ref={setRootRef}
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
            maxLength={maxLength}
            onChange={(e) => handleDraftChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              inlineEditInputControlVariants(),
              inlineEditInputEndPaddingVariants({
                size: resolvedSize,
                characterCount: hasCharacterCount,
              })
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
            {hasCharacterCount ? (
              <span
                className={inlineEditCharacterCountClassName}
                aria-live="polite"
              >
                {draft.length}/{maxLength}
              </span>
            ) : null}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={setRootRef}
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
