import * as React from "react";

import { cn } from "@gecko/ui/lib/utils";
import { Button } from "@gecko/ui/components/button";
import ChevronLeftIcon from "@hugeicons/core-free-icons/ChevronLeftIcon";
import ChevronRightIcon from "@hugeicons/core-free-icons/ChevronRightIcon";
import EllipsisIcon from "@hugeicons/core-free-icons/EllipsisIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("gap-1 flex items-center", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size" | "variant"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  variant,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : (variant ?? "ghost")}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  iconOnly = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string;
  iconOnly?: boolean;
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("ps-2!", className)}
      {...props}
    >
      <HugeiconsIcon
        icon={ChevronLeftIcon}
        data-icon="inline-start"
        className="transition-transform duration-150 ease-out group-active/button:-translate-x-0.5 rtl:rotate-180 rtl:group-active/button:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-active/button:translate-x-0"
        aria-hidden="true"
      />
      {!iconOnly ? <span className="hidden sm:block">{text}</span> : null}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  iconOnly = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string;
  iconOnly?: boolean;
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pe-2!", className)}
      {...props}
    >
      {!iconOnly ? <span className="hidden sm:block">{text}</span> : null}
      <HugeiconsIcon
        icon={ChevronRightIcon}
        data-icon="inline-end"
        className="transition-transform duration-150 ease-out group-active/button:translate-x-0.5 rtl:rotate-180 rtl:group-active/button:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-active/button:translate-x-0"
        aria-hidden="true"
      />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "size-9 [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <HugeiconsIcon icon={EllipsisIcon} aria-hidden="true" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
