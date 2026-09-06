import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import CircleHelp from "@hugeicons/core-free-icons/HelpCircleIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { cn } from "@gecko/ui/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "ring-foreground/10 bg-card text-card-foreground gap-0 overflow-hidden rounded-sm text-sm ring-1 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-sm *:[img:last-child]:rounded-b-sm group/card flex flex-col",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"h3">) {
  return useRender({
    defaultTagName: "h3",
    props: mergeProps<"h3">(
      {
        className: cn("text-lg leading-normal font-semibold", className),
        children,
      },
      props,
    ),
    render,
    state: {
      slot: "card-title",
    },
  });
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
CardDescription.displayName = "CardDescription";

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}
CardAction.displayName = "CardAction";

/** Matches after Fast Refresh when `child.type` is a stale reference from the previous module. */
type CardHeaderSlotComponent = typeof CardAction | typeof CardDescription;

function isElementOfType(
  child: React.ReactElement,
  Component: CardHeaderSlotComponent,
): boolean {
  if (child.type === Component) return true;
  const a = child.type as { displayName?: string; name?: string };
  const b = Component as { displayName?: string; name?: string };
  const aName = a.displayName ?? a.name;
  const bName = b.displayName ?? b.name;
  return Boolean(aName && bName && aName === bName);
}

function partitionCardHeaderChildren(children: React.ReactNode) {
  const actions: React.ReactNode[] = [];
  const descriptions: React.ReactElement[] = [];
  const main: React.ReactNode[] = [];
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child) && isElementOfType(child, CardAction)) {
      actions.push(child);
    } else if (
      React.isValidElement(child) &&
      isElementOfType(child, CardDescription)
    ) {
      descriptions.push(child);
    } else {
      main.push(child);
    }
  }
  return { actions, descriptions, main };
}

function CardHeader({
  className,
  children,
  tooltip,
  ...props
}: React.ComponentProps<"div"> & {
  /** Show CardDescription in a help tooltip instead of under the title. */
  tooltip?: boolean;
}) {
  const { actions, descriptions, main } = partitionCardHeaderChildren(children);

  const descriptionTooltipBody =
    descriptions.length > 0 ? (
      <div className="space-y-1">
        {descriptions.map((d, i) => (
          <React.Fragment key={i}>
            {(d.props as { children?: React.ReactNode }).children}
          </React.Fragment>
        ))}
      </div>
    ) : null;

  const showTooltipHelp = tooltip === true && descriptionTooltipBody != null;

  if (!showTooltipHelp) {
    return (
      <div
        data-slot="card-header"
        className={cn(
          "gap-0.5 rounded-t-sm border-b p-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      data-slot="card-header"
      className={cn(
        "rounded-t-sm border-b p-4 group/card-header @container/card-header",
        actions.length > 0
          ? "grid grid-cols-[1fr_auto] items-start gap-x-2 gap-y-1"
          : "flex flex-col gap-1",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "inline-flex max-w-full min-w-0 items-center gap-2 **:data-[slot=card-title]:inline-block **:data-[slot=card-title]:min-w-0 **:data-[slot=card-title]:max-w-full **:data-[slot=card-title]:truncate",
          actions.length > 0 && "col-start-1 row-start-1",
        )}
      >
        {main}
        <Tooltip>
          <TooltipTrigger aria-label="More information">
            <HugeiconsIcon icon={CircleHelp} className="size-3.5" aria-hidden />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-pretty">
            {descriptionTooltipBody}
          </TooltipContent>
        </Tooltip>
      </div>
      {actions.map((action, index) =>
        React.isValidElement(action) && isElementOfType(action, CardAction)
          ? React.cloneElement(
              action as React.ReactElement<{ className?: string }>,
              {
                key: action.key ?? index,
                className: cn(
                  (action.props as { className?: string }).className,
                  "row-span-1",
                ),
              },
            )
          : action,
      )}
    </div>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-4", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "rounded-b-sm border-t p-4 flex items-center justify-end gap-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
