"use client";

import * as React from "react";
import { DataTableCellLinkContext } from "./data-table-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip";
import { cn } from "@geckolabs/elements/lib/utils";

/** A bounded text line. Full text remains in the DOM and is revealed when clipped. */
export function DataTableTextCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const insideLink = React.useContext(DataTableCellLinkContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [details, setDetails] = React.useState({
    clipped: false,
    interactive: false,
    text: "",
  });
  const [open, setOpen] = React.useState(false);
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element || insideLink) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const next = {
        clipped: element.scrollWidth > element.clientWidth + 1,
        interactive: !!element.querySelector(
          'a[href],button,input,select,textarea,[tabindex="0"]',
        ),
        text: element.textContent || "",
      };
      setDetails((previous) =>
        previous.clipped === next.clipped &&
        previous.interactive === next.interactive &&
        previous.text === next.text
          ? previous
          : next,
      );
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const mutation = new MutationObserver(measure);
    mutation.observe(element, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      resize.disconnect();
      mutation.disconnect();
    };
  }, [insideLink]);
  if (insideLink) {
    return (
      <div
        data-slot="data-table-text-cell"
        className={cn("block min-w-0 max-w-full truncate", className)}
      >
        {children}
      </div>
    );
  }
  return (
    <Tooltip
      disabled={!details.clipped}
      open={details.clipped && open}
      onOpenChange={setOpen}
    >
      <TooltipTrigger
        render={<div ref={ref} />}
        data-slot="data-table-text-cell"
        className={cn(
          "block min-w-0 max-w-full truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          className,
        )}
        tabIndex={details.clipped && !details.interactive ? 0 : undefined}
        onFocusCapture={() => setOpen(true)}
        onBlurCapture={() => setOpen(false)}
      >
        {children}
      </TooltipTrigger>
      {details.clipped && (
        <TooltipContent className="whitespace-normal [overflow-wrap:anywhere]">
          {details.text}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
