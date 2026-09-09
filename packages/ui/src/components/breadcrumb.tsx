import { withRef } from "@geckolabs/elements/lib/with-ref";
import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@geckolabs/elements/lib/utils";
import ChevronRightIcon from "@hugeicons/core-free-icons/ChevronRightIcon";
import EllipsisIcon from "@hugeicons/core-free-icons/EllipsisIcon";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

const Breadcrumb = /* @__PURE__ */ withRef(function Breadcrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
});

const BreadcrumbList = /* @__PURE__ */ withRef(function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground gap-1.5 text-2xs sm:gap-2.5 flex flex-wrap items-center wrap-break-word",
        className,
      )}
      {...props}
    />
  );
});

const BreadcrumbItem = /* @__PURE__ */ withRef(function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("gap-1.5 inline-flex items-center", className)}
      {...props}
    />
  );
});

const BreadcrumbLink = /* @__PURE__ */ withRef(function BreadcrumbLink({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("hover:text-foreground transition-colors", className),
        children,
      },
      props,
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
});

const BreadcrumbPage = /* @__PURE__ */ withRef(function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
});

const BreadcrumbSeparator = /* @__PURE__ */ withRef(
  function BreadcrumbSeparator({
    children,
    className,
    ...props
  }: React.ComponentProps<"li">) {
    return (
      <li
        data-slot="breadcrumb-separator"
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        {...props}
      >
        {children ?? (
          <HugeiconsIcon icon={ChevronRightIcon} className="rtl:rotate-180" />
        )}
      </li>
    );
  },
);

const BreadcrumbEllipsis = /* @__PURE__ */ withRef(function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "size-5 [&>svg]:size-4 flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <HugeiconsIcon icon={EllipsisIcon} />
    </span>
  );
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
