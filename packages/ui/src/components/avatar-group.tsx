import * as React from "react";

import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
import type { AvatarSize } from "@gecko/ui/components/avatar";
import { Button } from "@gecko/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@gecko/ui/components/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";
import { cn } from "@gecko/ui/lib/utils";

export type AvatarGroupItem = {
  /** Stable identity used when people are reordered. */
  id: string;
  /** Person or account name. */
  name: string;
  /** Optional profile-image URL. */
  src?: string;
};

type ResolvedAvatarGroupSize = Exclude<AvatarSize, "default">;

const resolvedSize: Record<AvatarSize, ResolvedAvatarGroupSize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  default: "xl",
};

const overlapClass: Record<ResolvedAvatarGroupSize, string> = {
  xs: "-ms-1",
  sm: "-ms-1",
  md: "-ms-1.5",
  lg: "-ms-2",
  xl: "-ms-2",
  "2xl": "-ms-2",
  "3xl": "-ms-3",
};

const countSizeClass: Record<ResolvedAvatarGroupSize, string> = {
  xs: "size-4 text-[7px]",
  sm: "size-5 text-5xs",
  md: "size-6 text-4xs",
  lg: "size-7 text-2xs",
  xl: "size-8 text-2xs",
  "2xl": "size-9 text-sm",
  "3xl": "size-12 text-base",
};

export type AvatarGroupProps = Omit<
  React.ComponentProps<"div">,
  "children" | "role"
> & {
  /** People to display in their supplied order. */
  items: readonly AvatarGroupItem[];
  /** Uses the same size values and diameters as Avatar. */
  size?: AvatarSize;
  /** Maximum visible people before the built-in overflow control appears. */
  maxVisible?: number;
  /** Shows a supplementary visual name on hover and keyboard focus. */
  tooltips?: boolean;
};

function getVisibleCount(maxVisible: number | undefined, total: number) {
  if (maxVisible == null || !Number.isFinite(maxVisible)) return total;
  return Math.min(total, Math.max(1, Math.floor(maxVisible)));
}

function PersonAvatar({
  item,
  size,
}: {
  item: AvatarGroupItem;
  size: AvatarSize;
}) {
  return (
    <Avatar name={item.name} size={size} aria-hidden="true">
      {item.src != null && <AvatarImage src={item.src} />}
    </Avatar>
  );
}

function VisiblePerson({
  item,
  size,
  tooltips,
}: {
  item: AvatarGroupItem;
  size: AvatarSize;
  tooltips: boolean;
}) {
  const identity = (
    <span
      role="img"
      aria-label={item.name}
      tabIndex={tooltips ? 0 : undefined}
      className={cn(
        "relative inline-flex rounded-full outline-none",
        tooltips &&
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <PersonAvatar item={item} size={size} />
    </span>
  );

  if (!tooltips) return identity;

  return (
    <Tooltip>
      <TooltipTrigger render={identity} />
      <TooltipContent>{item.name}</TooltipContent>
    </Tooltip>
  );
}

function OverflowPeople({
  items,
  size,
}: {
  items: readonly AvatarGroupItem[];
  size: ResolvedAvatarGroupSize;
}) {
  const label = `${items.length} more ${items.length === 1 ? "person" : "people"}`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            className={cn(
              "relative rounded-full p-0 ring-2 ring-background hover:bg-muted aria-expanded:bg-muted",
              "after:absolute after:start-1/2 after:top-1/2 after:size-6 after:-translate-x-1/2 after:-translate-y-1/2 after:content-['']",
              countSizeClass[size],
            )}
            aria-label={`Show ${label}`}
          >
            <span aria-hidden="true">+{items.length}</span>
          </Button>
        }
      />
      <PopoverContent align="end" className="w-56 gap-0 p-1">
        <PopoverTitle className="sr-only">{label}</PopoverTitle>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex min-w-0 items-center gap-2 rounded-sm px-2 py-1.5"
            >
              <PersonAvatar item={item} size="sm" />
              <span className="truncate text-sm">{item.name}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export function AvatarGroup({
  items,
  size = "default",
  maxVisible,
  tooltips = false,
  className,
  ...props
}: AvatarGroupProps) {
  const visibleCount = getVisibleCount(maxVisible, items.length);
  const visibleItems = items.slice(0, visibleCount);
  const overflowItems = items.slice(visibleCount);
  const visualSize = resolvedSize[size];

  return (
    <div
      role="list"
      data-slot="avatar-group"
      data-size={visualSize}
      className={cn("flex items-center", className)}
      {...props}
    >
      {visibleItems.map((item, index) => (
        <span
          key={item.id}
          role="listitem"
          className={cn(
            "relative inline-flex shrink-0",
            index > 0 && overlapClass[visualSize],
          )}
        >
          <VisiblePerson item={item} size={size} tooltips={tooltips} />
        </span>
      ))}
      {overflowItems.length > 0 && (
        <span
          role="listitem"
          className={cn(
            "relative inline-flex shrink-0",
            visibleItems.length > 0 && overlapClass[visualSize],
          )}
        >
          <OverflowPeople items={overflowItems} size={visualSize} />
        </span>
      )}
    </div>
  );
}
