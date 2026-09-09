import { withRef } from "@geckolabs/elements/lib/with-ref";
import * as React from "react";

import { cn } from "@geckolabs/elements/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

const Container = /* @__PURE__ */ withRef(function Container({
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("bg-background p-6", className)}
      {...props}
    />
  );
});

export { Container };
export type { ContainerProps };
