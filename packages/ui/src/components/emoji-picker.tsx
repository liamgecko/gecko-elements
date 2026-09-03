"use client";

import * as React from "react";
import { EmojiPicker as FrimousseEmojiPicker } from "frimousse";
import { SmilePlus } from "lucide-react";

import { Button } from "@gecko/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover";
import { cn } from "@gecko/ui/lib/utils";
import { useControllableState } from "@gecko/ui/hooks/use-controllable-state";

import "./emoji-picker.css";

const EMOJI_COLUMNS = 9;

/** Default quick-reaction emojis used by the tray. */
export const DEFAULT_TRAY_EMOJIS = [
  "👍",
  "❤️",
  "😂",
  "😮",
  "😢",
  "👏",
] as const;

type EmojiPickerView = "picker" | "tray";

type EmojiPickerContextValue = {
  defaultView: EmojiPickerView;
  trayEmojis: readonly string[];
  showPickerFromTray: boolean;
  onEmojiSelect?: (emoji: string) => void;
};

const EmojiPickerContext = React.createContext<EmojiPickerContextValue | null>(
  null,
);

function useEmojiPicker(component: string) {
  const context = React.useContext(EmojiPickerContext);
  if (!context) {
    throw new Error(`${component} must be used within EmojiPicker.`);
  }
  return context;
}

type EmojiPickerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * What the trigger opens by default when `EmojiPickerContent` has no
   * children. `"picker"` opens the full emoji panel; `"tray"` opens the
   * quick-reaction tray.
   * @default "picker"
   */
  defaultView?: EmojiPickerView;
  /**
   * Quick-reaction emojis when using the tray.
   * @default DEFAULT_TRAY_EMOJIS
   */
  trayEmojis?: readonly string[];
  /**
   * When using the tray, whether it includes a control that opens the full
   * emoji panel. Set to `false` for tray-only selection.
   * @default true
   */
  showPickerFromTray?: boolean;
  onEmojiSelect?: (emoji: string) => void;
  children: React.ReactNode;
};

function EmojiPicker({
  defaultView = "picker",
  trayEmojis = DEFAULT_TRAY_EMOJIS,
  showPickerFromTray = true,
  onEmojiSelect,
  open: openProp,
  onOpenChange,
  defaultOpen,
  children,
}: EmojiPickerProps) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const handleEmojiSelect = React.useCallback(
    (emoji: string) => {
      onEmojiSelect?.(emoji);
      setOpen(false);
    },
    [onEmojiSelect, setOpen],
  );

  const contextValue = React.useMemo<EmojiPickerContextValue>(
    () => ({
      defaultView,
      trayEmojis,
      showPickerFromTray,
      onEmojiSelect: handleEmojiSelect,
    }),
    [defaultView, trayEmojis, showPickerFromTray, handleEmojiSelect],
  );

  return (
    <EmojiPickerContext.Provider value={contextValue}>
      <Popover data-slot="emoji-picker" open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </EmojiPickerContext.Provider>
  );
}

function EmojiPickerTrigger({
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  return <PopoverTrigger data-slot="emoji-picker-trigger" {...props} />;
}

function EmojiPickerContent({
  className,
  side,
  align,
  alignOffset = 0,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  const { defaultView } = useEmojiPicker("EmojiPickerContent");
  const resolvedSide = side ?? (defaultView === "tray" ? "top" : "bottom");
  const resolvedAlign = align ?? (defaultView === "tray" ? "start" : "center");

  return (
    <PopoverContent
      data-slot="emoji-picker-content"
      side={resolvedSide}
      align={resolvedAlign}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "w-auto gap-0 overflow-hidden p-0",
        defaultView === "tray" && !children && "rounded-full",
        className,
      )}
      {...props}
    >
      {children ??
        (defaultView === "tray" ? <EmojiPickerTray /> : <EmojiPickerPanel />)}
    </PopoverContent>
  );
}

type EmojiPickerTrayProps = React.ComponentProps<"div"> & {
  /** Controlled open state for the nested full picker. */
  pickerOpen?: boolean;
  onPickerOpenChange?: (open: boolean) => void;
};

function EmojiPickerTray({
  className,
  pickerOpen: pickerOpenProp,
  onPickerOpenChange,
  onKeyDown,
  ...props
}: EmojiPickerTrayProps) {
  const { trayEmojis, showPickerFromTray, onEmojiSelect } =
    useEmojiPicker("EmojiPickerTray");
  const [pickerOpen, setPickerOpen] = useControllableState({
    value: pickerOpenProp,
    defaultValue: false,
    onChange: onPickerOpenChange,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const keys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];
    if (!keys.includes(event.key)) return;

    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        "button:not(:disabled)",
      ),
    );
    const currentIndex = buttons.indexOf(
      event.target instanceof HTMLButtonElement
        ? event.target
        : buttons[activeIndex],
    );
    const lastIndex = buttons.length - 1;
    let nextIndex = currentIndex;

    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = currentIndex >= lastIndex ? 0 : currentIndex + 1;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    buttons[nextIndex]?.focus();
  }

  return (
    <div
      data-slot="emoji-picker-tray"
      role="toolbar"
      aria-orientation="horizontal"
      aria-label="Quick reactions"
      className={cn("flex items-center p-1", className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {trayEmojis.map((emoji, index) => (
        <Button
          key={`${emoji}-${index}`}
          type="button"
          variant="ghost"
          size="icon-xs"
          className="hover:bg-muted size-8 rounded-full text-lg leading-none transition-transform duration-100 ease-out"
          aria-label={`React with ${emoji}`}
          tabIndex={activeIndex === index ? 0 : -1}
          onFocus={() => setActiveIndex(index)}
          onClick={() => onEmojiSelect?.(emoji)}
        >
          <span aria-hidden>{emoji}</span>
        </Button>
      ))}

      {showPickerFromTray ? (
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "text-muted-foreground size-8 rounded-full",
                  pickerOpen && "bg-muted text-foreground",
                )}
                aria-label="Open emoji picker"
                aria-expanded={pickerOpen}
                tabIndex={activeIndex === trayEmojis.length ? 0 : -1}
                onFocus={() => setActiveIndex(trayEmojis.length)}
              >
                <SmilePlus strokeWidth={2.25} aria-hidden="true" />
              </Button>
            }
          />
          <PopoverContent
            side="top"
            align="end"
            sideOffset={10}
            className="w-auto gap-0 overflow-hidden p-0"
          >
            <EmojiPickerPanel />
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}

type EmojiPickerPanelProps = React.ComponentProps<"div">;

function hasVisibleEmojis(children: React.ReactNode) {
  return React.Children.toArray(children).some(
    (child) =>
      React.isValidElement<{ emoji?: { emoji?: string } }>(child) &&
      Boolean(child.props.emoji?.emoji),
  );
}

function getRowStyle(style?: React.CSSProperties): React.CSSProperties {
  return {
    ...style,
    display: "grid",
    gridTemplateColumns: `repeat(${EMOJI_COLUMNS}, minmax(0, 1fr))`,
    alignItems: "center",
    gap: 0,
  };
}

function EmojiPickerPanel({ className, ...props }: EmojiPickerPanelProps) {
  const { onEmojiSelect } = useEmojiPicker("EmojiPickerPanel");

  return (
    <div data-slot="emoji-picker-panel" {...props}>
      <FrimousseEmojiPicker.Root
        className={cn(
          "emoji-picker-panel flex h-[min(300px,calc(100vh-2rem))] w-[calc(100vw-2rem)] max-w-[352px] flex-col bg-popover",
          className,
        )}
        columns={EMOJI_COLUMNS}
        sticky={false}
        onEmojiSelect={({ emoji }) => onEmojiSelect?.(emoji)}
      >
        <div className="border-border border-b px-3 py-2">
          <FrimousseEmojiPicker.Search
            aria-label="Search emoji"
            placeholder="Search emoji…"
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-sm border px-2.5 py-1.5 text-sm outline-none focus-visible:ring-3"
          />
        </div>

        <FrimousseEmojiPicker.Viewport className="min-h-0 flex-1 overflow-y-auto outline-none">
          <FrimousseEmojiPicker.Loading className="text-muted-foreground flex items-center justify-center p-6 text-sm">
            Loading…
          </FrimousseEmojiPicker.Loading>
          <FrimousseEmojiPicker.Empty className="text-muted-foreground flex items-center justify-center p-6 text-sm">
            No emoji found.
          </FrimousseEmojiPicker.Empty>
          <FrimousseEmojiPicker.List
            className="select-none"
            components={{
              CategoryHeader: ({
                category,
                className: categoryClassName,
                style,
                ...categoryProps
              }) => (
                <div
                  {...categoryProps}
                  className={cn(
                    "bg-popover text-foreground flex items-center px-3 pt-3 pb-1.5 text-xs font-semibold capitalize",
                    categoryClassName,
                  )}
                  style={style}
                >
                  {category.label}
                </div>
              ),
              Row: ({
                children,
                className: rowClassName,
                style,
                ...rowProps
              }) => {
                if (!hasVisibleEmojis(children)) {
                  return null;
                }

                return (
                  <div
                    {...rowProps}
                    className={cn("px-1", rowClassName)}
                    style={getRowStyle(style)}
                  >
                    {children}
                  </div>
                );
              },
              Emoji: ({ emoji, className: emojiClassName, ...emojiProps }) => (
                <button
                  type="button"
                  className={cn(
                    "hover:bg-muted data-[active=true]:bg-muted mx-auto flex size-7 items-center justify-center rounded-sm text-lg leading-none",
                    emojiClassName,
                  )}
                  data-active={emoji.isActive || undefined}
                  {...emojiProps}
                >
                  {emoji.emoji}
                </button>
              ),
            }}
          />
        </FrimousseEmojiPicker.Viewport>

        <div className="border-border flex min-h-11 items-center justify-between gap-3 border-t px-3 py-2">
          <FrimousseEmojiPicker.ActiveEmoji>
            {({ emoji }) =>
              emoji ? (
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-2xl leading-none">{emoji.emoji}</span>
                  <span className="text-muted-foreground truncate text-xs capitalize">
                    {emoji.label}
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground text-xs">
                  Select an emoji
                </span>
              )
            }
          </FrimousseEmojiPicker.ActiveEmoji>

          <div className="hover:bg-muted flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-1">
            <FrimousseEmojiPicker.SkinToneSelector
              className="text-muted-foreground flex items-center justify-center p-0 text-lg hover:bg-transparent"
              aria-label="Skin tone"
            />
            <span className="text-muted-foreground text-xs">Skin tone</span>
          </div>
        </div>
      </FrimousseEmojiPicker.Root>
    </div>
  );
}

export {
  EmojiPicker,
  EmojiPickerTrigger,
  EmojiPickerContent,
  EmojiPickerTray,
  EmojiPickerPanel,
  type EmojiPickerView,
};
