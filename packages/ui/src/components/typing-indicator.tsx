"use client";

import * as React from "react";

import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
import { Marker, MarkerContent, MarkerIcon } from "@gecko/ui/components/marker";
import { cn } from "@gecko/ui/lib/utils";

export interface TypingIndicatorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Whether someone is currently typing. Keep the component mounted so exit motion can complete. */
  active?: boolean;
  /** Displays a compact dot bubble or a named text status. */
  variant?: "dots" | "text";
  /** Identifies the person in the text status and accessible announcement. */
  name?: string;
  /** Displays an image URL or custom avatar beside the indicator. */
  avatar?: React.ReactNode;
}

const dotDelays = ["0ms", "200ms", "400ms"] as const;

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  (
    { active = true, variant = "dots", name, avatar, className, ...props },
    ref,
  ) => {
    const statusText = name ? `${name} is typing…` : "Someone is typing…";
    const avatarNode =
      typeof avatar === "string" ? (
        <Avatar
          name={name ?? "Person typing"}
          size={variant === "dots" ? "sm" : "xs"}
        >
          <AvatarImage src={avatar} />
        </Avatar>
      ) : (
        avatar
      );

    return (
      <div
        {...props}
        ref={ref}
        data-slot="typing-indicator"
        data-active={active}
        role="status"
        aria-live={active ? "polite" : "off"}
        aria-atomic="true"
        aria-hidden={active ? undefined : true}
        className={cn(
          "w-fit transition-[opacity,translate] duration-200 data-[active=false]:pointer-events-none data-[active=false]:translate-y-2 data-[active=false]:opacity-0 data-[active=false]:ease-in data-[active=true]:translate-y-0 data-[active=true]:opacity-100 data-[active=true]:ease-out motion-reduce:translate-y-0 motion-reduce:transition-none",
          className,
        )}
      >
        <div className="w-fit">
          {variant === "text" ? (
            <Marker className="w-fit text-2xs">
              {avatarNode ? (
                <MarkerIcon className="size-auto">{avatarNode}</MarkerIcon>
              ) : null}
              <MarkerContent shimmer>{statusText}</MarkerContent>
            </Marker>
          ) : (
            <div className="inline-flex items-center gap-2">
              {avatarNode ? <span aria-hidden="true">{avatarNode}</span> : null}
              <span className="sr-only">{statusText}</span>
              <span
                aria-hidden="true"
                className="relative inline-flex items-center gap-1 rounded-lg rounded-es-none bg-muted p-2.5 text-muted-foreground"
              >
                {dotDelays.map((delay) => (
                  <span
                    key={delay}
                    className="size-2 animate-typing-dot rounded-full bg-current"
                    style={{ animationDelay: delay }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

TypingIndicator.displayName = "TypingIndicator";

export { TypingIndicator };
