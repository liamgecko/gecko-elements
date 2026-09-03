import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@gecko/ui/lib/utils";

export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "default";

const sizeMap = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  default: "xl",
} as const;

type ResolvedAvatarSize = (typeof sizeMap)[AvatarSize];

const textColumnClass: Record<ResolvedAvatarSize, string> = {
  xs: "-space-y-0.5",
  sm: "-space-y-1",
  md: "-space-y-0.5",
  lg: "-space-y-0.5",
  xl: "-space-y-1",
  "2xl": "-space-y-1",
  "3xl": "-space-y-1",
};

const labelClass: Record<ResolvedAvatarSize, string> = {
  xs: "text-5xs/3",
  sm: "text-4xs/3.5",
  md: "text-sm/4.25",
  lg: "text-sm/4.25",
  xl: "text-sm/5",
  "2xl": "text-base/5.5",
  "3xl": "text-lg/6",
};

const descriptionClass: Record<ResolvedAvatarSize, string> = {
  xs: "text-5xs/2.75",
  sm: "text-4xs/3.5",
  md: "text-2xs/3.75",
  lg: "text-sm/4.25",
  xl: "text-sm/5",
  "2xl": "text-base/5.5",
  "3xl": "text-lg/6",
};

export type AvatarStatus = "online" | "unavailable" | "offline";

const statusClass: Record<AvatarStatus, string> = {
  online: "bg-emerald-500 dark:bg-teal-500",
  unavailable: "bg-orange-500",
  offline: "bg-gray-500 dark:bg-gray-400",
};

const badgeSizeClass =
  "absolute z-10 rounded-full ring-2 ring-background select-none " +
  "group-data-[size=xs]/avatar:ring-1 group-data-[size=sm]/avatar:ring-1 " +
  "group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-1.5 " +
  "group-data-[size=md]/avatar:size-2 group-data-[size=lg]/avatar:size-2 " +
  "group-data-[size=xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:size-3 group-data-[size=3xl]/avatar:size-3";

const badgePositionClass = {
  status: "end-0 bottom-0",
  notification: "top-0 start-0",
} as const;

type AvatarContextValue = {
  size: AvatarSize;
  resolvedSize: ResolvedAvatarSize;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const context = React.useContext(AvatarContext);

  if (!context) {
    throw new Error("Avatar compound components must be used within Avatar.");
  }

  return context;
}

function isAvatarChild(
  child: React.ReactNode,
  component: { displayName?: string },
) {
  return React.isValidElement(child) && child.type === component;
}

function getInitials(name: string, size: ResolvedAvatarSize) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const firstInitial = Array.from(words[0] ?? "")[0] ?? "?";

  if (size === "xs" || size === "sm" || words.length < 2) {
    return firstInitial.toUpperCase();
  }

  const lastInitial = Array.from(words.at(-1) ?? "")[0] ?? "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function Avatar({
  className,
  name,
  size = "default",
  status,
  notification,
  children,
  ...props
}: Omit<AvatarPrimitive.Root.Props, "children" | "role" | "aria-label"> & {
  name: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  notification?: boolean;
  children?: React.ReactNode;
}) {
  const resolvedSize = sizeMap[size];
  const childArray = React.Children.toArray(children);
  const avatarChildren: React.ReactNode[] = [];
  let label: React.ReactNode = null;
  let description: React.ReactNode = null;

  for (const child of childArray) {
    if (isAvatarChild(child, AvatarLabel)) {
      label = child;
      continue;
    }

    if (isAvatarChild(child, AvatarDescription)) {
      description = child;
      continue;
    }

    avatarChildren.push(child);
  }

  const hasText = label != null || description != null;

  const root = (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={resolvedSize}
      role="img"
      aria-label={name}
      className={cn(
        "rounded-full group/avatar relative flex shrink-0 select-none ring-2 ring-background data-[size=xs]:ring-1 data-[size=sm]:ring-1",
        "data-[size=xs]:size-4 data-[size=sm]:size-5 data-[size=md]:size-6 data-[size=lg]:size-7 data-[size=xl]:size-8 data-[size=2xl]:size-9 data-[size=3xl]:size-12",
        className,
      )}
      {...props}
    >
      {avatarChildren}
      <AvatarFallback>{getInitials(name, resolvedSize)}</AvatarFallback>
      {status != null && (
        <AvatarBadge
          position="status"
          className={statusClass[status]}
          accessibleLabel={`Status: ${status}`}
        />
      )}
      {notification && (
        <AvatarBadge
          position="notification"
          className="bg-red-600 dark:bg-rose-600"
          accessibleLabel="Unread activity"
        />
      )}
    </AvatarPrimitive.Root>
  );

  return (
    <AvatarContext.Provider value={{ size, resolvedSize }}>
      {hasText ? (
        <div className="flex items-center gap-1.5">
          {root}
          <div
            className={cn(
              "flex min-w-0 flex-col",
              textColumnClass[resolvedSize],
            )}
          >
            {label}
            {description}
          </div>
        </div>
      ) : (
        root
      )}
    </AvatarContext.Provider>
  );
}

function AvatarImage({
  className,
  alt = "",
  ...props
}: Omit<AvatarPrimitive.Image.Props, "alt"> & { alt?: string }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "rounded-full aspect-square size-full object-cover",
        className,
      )}
      alt={alt}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted text-foreground rounded-full flex size-full items-center justify-center font-medium uppercase",
        "group-data-[size=xs]/avatar:text-[8px] group-data-[size=sm]/avatar:text-5xs group-data-[size=md]/avatar:text-4xs group-data-[size=lg]/avatar:text-2xs group-data-[size=xl]/avatar:text-sm group-data-[size=2xl]/avatar:text-base group-data-[size=3xl]/avatar:text-lg",
        className,
      )}
      {...props}
    />
  );
}

function AvatarLabel({ className, ...props }: React.ComponentProps<"span">) {
  const { resolvedSize } = useAvatarContext();

  return (
    <span
      data-slot="avatar-label"
      className={cn(
        "truncate font-medium text-foreground",
        labelClass[resolvedSize],
        className,
      )}
      {...props}
    />
  );
}
AvatarLabel.displayName = "AvatarLabel";

function AvatarDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { resolvedSize } = useAvatarContext();

  return (
    <span
      data-slot="avatar-description"
      className={cn(
        "truncate text-muted-foreground",
        descriptionClass[resolvedSize],
        className,
      )}
      {...props}
    />
  );
}
AvatarDescription.displayName = "AvatarDescription";

function AvatarBadge({
  position,
  accessibleLabel,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  position: keyof typeof badgePositionClass;
  accessibleLabel: string;
}) {
  return (
    <span
      data-slot="avatar-badge"
      data-position={position}
      className={cn(badgeSizeClass, badgePositionClass[position], className)}
      {...props}
    >
      <span className="sr-only">{accessibleLabel}</span>
    </span>
  );
}

export { Avatar, AvatarImage, AvatarLabel, AvatarDescription };
