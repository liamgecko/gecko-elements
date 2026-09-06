"use client";

import * as React from "react";
import View from "@hugeicons/core-free-icons/ViewIcon";
import EyeOff from "@hugeicons/core-free-icons/EyeOffIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { cn } from "@gecko/ui/lib/utils";
import { useControllableState } from "@gecko/ui/hooks/use-controllable-state";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";

type SensitiveFieldSize = "sm" | "md" | "lg";

/** Masked display always shows this many bullets, independent of value length. */
const MASK_DOT_COUNT = 10;
const MASK_DISPLAY = "•".repeat(MASK_DOT_COUNT);

const maskOverlayPadding = {
  sm: "px-2 text-xs",
  md: "px-2.5 text-sm",
  lg: "px-3 text-base",
} as const satisfies Record<SensitiveFieldSize, string>;

export interface SensitiveFieldProps extends Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "readOnly"
> {
  size?: SensitiveFieldSize;
  /** When true, the value is visible and the field is editable. Default is false (masked, read-only). */
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const SensitiveField = React.forwardRef<HTMLInputElement, SensitiveFieldProps>(
  (props, ref) => {
    const {
      className,
      size = "md",
      value,
      defaultValue,
      onChange,
      onFocus,
      disabled,
      defaultVisible = false,
      visible: visibleProp,
      onVisibleChange,
      autoComplete = "off",
      tabIndex,
      ...rest
    } = props;

    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible,
      onChange: onVisibleChange,
    });

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
      },
      [onChange],
    );

    const handleToggleVisible = React.useCallback(() => {
      const next = !visible;
      if (visible && !next) {
        innerRef.current?.blur();
      }
      setVisible(next);
      if (next) {
        queueMicrotask(() => innerRef.current?.focus());
      }
    }, [visible, setVisible]);

    const handleToggleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        handleToggleVisible();
      },
      [handleToggleVisible],
    );

    const isEditMode = visible;

    return (
      <InputGroup
        size={size}
        className={cn("w-full", !isEditMode && "hover:border-input", className)}
      >
        <div
          className={cn(
            "relative min-w-0 flex-1",
            !visible && "cursor-not-allowed",
          )}
        >
          <InputGroupInput
            ref={mergedRef}
            type={visible ? "text" : "password"}
            readOnly={!isEditMode}
            tabIndex={visible ? tabIndex : -1}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={(e) => {
              if (!visible) {
                e.currentTarget.blur();
                return;
              }
              onFocus?.(e);
            }}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-readonly={!isEditMode}
            className={cn(
              "w-full min-w-0",
              !visible &&
                "pointer-events-none text-transparent caret-transparent",
              visible && "text-foreground",
            )}
            {...rest}
          />
          {!visible && (
            <span
              className={cn(
                "pointer-events-none absolute inset-y-0 start-0 flex items-center select-none text-foreground",
                maskOverlayPadding[size],
              )}
              aria-hidden
            >
              {MASK_DISPLAY}
            </span>
          )}
        </div>
        <InputGroupAddon
          align="inline-end"
          onClick={(e) => {
            if (!visible) return;
            if ((e.target as HTMLElement).closest("button")) {
              return;
            }
            e.currentTarget.parentElement?.querySelector("input")?.focus();
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton
                    type="button"
                    variant="ghost"
                    size={size}
                    disabled={disabled}
                    onClick={handleToggleVisible}
                    onKeyDown={handleToggleKeyDown}
                    aria-label={
                      visible ? "Hide sensitive value" : "Show sensitive value"
                    }
                    aria-pressed={visible}
                  />
                }
              >
                {visible ? (
                  <HugeiconsIcon
                    icon={EyeOff}
                    className="pointer-events-none"
                    aria-hidden
                  />
                ) : (
                  <HugeiconsIcon
                    icon={View}
                    className="pointer-events-none"
                    aria-hidden
                  />
                )}
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>
                  {visible ? "Hide sensitive value" : "Show sensitive value"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InputGroupAddon>
      </InputGroup>
    );
  },
);
SensitiveField.displayName = "SensitiveField";

export { SensitiveField };
