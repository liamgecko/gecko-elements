"use client";

import * as React from "react";
import { Check, PenSquare, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Input } from "@gecko/ui/components/input";
import { Button } from "@gecko/ui/components/button";
import { cn } from "@gecko/ui/lib/utils";

const inlineEditViewRootVariants = cva(
  "group flex w-full min-w-0 items-center justify-between overflow-hidden whitespace-nowrap rounded-sm border border-transparent bg-transparent p-0 text-start font-[inherit] text-foreground transition-colors",
  {
    variants: {
      size: {
        sm: "h-7 text-2xs",
        md: "h-8 text-sm",
        lg: "h-9 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

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
  },
);

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
});

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
});

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
});

const inlineEditInputControlVariants = cva(
  "flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
);

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
});

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
  },
);

const inlineEditViewActionsRowVariants = cva("flex items-center");

export type InlineEditProps = Omit<React.ComponentProps<"span">, "onSubmit"> &
  VariantProps<typeof inlineEditViewRootVariants> & {
    value: string;
    onSave: (next: string) => void;
    placeholder?: string;
    "aria-label": string;
  };

const InlineEdit = React.forwardRef<HTMLSpanElement, InlineEditProps>(
  function InlineEdit(
    {
      className,
      value,
      onSave,
      size = "md",
      placeholder = "",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(value);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const viewButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const restoreFocusRef = React.useRef(false);

    const resolvedSize = size ?? "md";

    React.useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
        inputRef.current?.select();
        return;
      }

      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;
        viewButtonRef.current?.focus();
      }
    }, [isEditing]);

    const commitSave = React.useCallback(() => {
      onSave(draft);
      restoreFocusRef.current = true;
      setIsEditing(false);
    }, [draft, onSave]);

    const cancelEdit = React.useCallback(() => {
      setDraft(value);
      restoreFocusRef.current = true;
      setIsEditing(false);
    }, [value]);

    const openEdit = React.useCallback(() => {
      setDraft(value);
      setIsEditing(true);
    }, [value]);

    const displayValue = value || placeholder;

    return (
      <span
        ref={ref}
        data-slot="inline-edit"
        data-size={resolvedSize}
        data-editing={isEditing ? "true" : "false"}
        className={cn("block w-full min-w-0", className)}
        {...props}
      >
        {isEditing ? (
          <span className={inlineEditEditShellVariants({ size: resolvedSize })}>
            <Input
              ref={inputRef}
              value={draft}
              size={resolvedSize}
              aria-label={ariaLabel}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
              className={cn(
                inlineEditInputControlVariants(),
                inlineEditInputEndPaddingVariants({ size: resolvedSize }),
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitSave();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancelEdit();
                }
              }}
            />

            <span
              className={inlineEditActionToolbarVariants({
                size: resolvedSize,
              })}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Cancel editing ${ariaLabel}`}
                onClick={cancelEdit}
              >
                <X
                  className={cn(
                    "pointer-events-none",
                    inlineEditGlyphIconVariants({ size: resolvedSize }),
                  )}
                  aria-hidden="true"
                />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Save ${ariaLabel}`}
                onClick={commitSave}
              >
                <Check
                  className={cn(
                    "pointer-events-none",
                    inlineEditGlyphIconVariants({ size: resolvedSize }),
                  )}
                  aria-hidden="true"
                />
              </Button>
            </span>
          </span>
        ) : (
          <Button
            ref={viewButtonRef}
            type="button"
            variant="ghost"
            size={resolvedSize === "md" ? "default" : resolvedSize}
            aria-label={`Edit ${ariaLabel}${value ? `: ${value}` : ""}`}
            onClick={openEdit}
            className={inlineEditViewRootVariants({ size: resolvedSize })}
          >
            <span
              className={cn(
                inlineEditViewValueVariants({ size: resolvedSize }),
                !value && "text-muted-foreground",
              )}
            >
              {displayValue}
            </span>

            <span className={inlineEditViewActionsRowVariants()}>
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
            </span>
          </Button>
        )}
      </span>
    );
  },
);

InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
