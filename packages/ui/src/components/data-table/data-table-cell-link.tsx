"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip";

import { DataTableCellLinkContext } from "./data-table-context";

export function DataTableCellLink({
  children,
  href,
  id,
  primaryId,
}: {
  children: React.ReactNode;
  href: string;
  id: string;
  primaryId: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [details, setDetails] = React.useState({ clipped: false, text: "" });
  const [open, setOpen] = React.useState(false);
  React.useLayoutEffect(() => {
    const content = ref.current;
    if (!content) return;
    const measure = () => {
      const lines = Array.from(
        content.querySelectorAll<HTMLElement>(
          '[data-slot="data-table-text-cell"]',
        ),
      );
      const next = {
        clipped: lines.some((line) => line.scrollWidth > line.clientWidth + 1),
        text:
          lines.map((line) => line.textContent || "").join("\n") ||
          content.textContent ||
          "",
      };
      setDetails((previous) =>
        previous.clipped === next.clipped && previous.text === next.text
          ? previous
          : next,
      );
    };
    const resize = new ResizeObserver(measure);
    const observe = () => {
      resize.disconnect();
      resize.observe(content);
      content
        .querySelectorAll('[data-slot="data-table-text-cell"]')
        .forEach((line) => resize.observe(line));
      measure();
    };
    observe();
    const mutation = new MutationObserver(observe);
    mutation.observe(content, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) measure();
    });
    return () => {
      active = false;
      resize.disconnect();
      mutation.disconnect();
    };
  }, []);
  return (
    <Tooltip
      disabled={!details.clipped}
      open={details.clipped && open}
      onOpenChange={setOpen}
    >
      <TooltipTrigger
        render={<a href={href} draggable={false} />}
        id={id}
        aria-describedby={id === primaryId ? undefined : primaryId}
        tabIndex={id === primaryId ? 0 : -1}
        data-slot="data-table-cell-link"
        className="block min-w-0 text-inherit no-underline outline-none after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div
          ref={ref}
          className="relative z-[1] min-w-0 max-w-full select-text"
        >
          <DataTableCellLinkContext.Provider value={true}>
            {children}
          </DataTableCellLinkContext.Provider>
        </div>
      </TooltipTrigger>
      {details.clipped && (
        <TooltipContent className="whitespace-pre-line [overflow-wrap:anywhere]">
          {details.text}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
