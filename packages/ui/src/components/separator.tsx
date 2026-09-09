"use client";
import { withRef } from "@geckolabs/elements/lib/with-ref";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@geckolabs/elements/lib/utils";

const Separator = /* @__PURE__ */ withRef(function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-separator shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
});

export { Separator };
