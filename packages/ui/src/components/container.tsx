import * as React from "react";

import { cn } from "@gecko/ui/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn("bg-background p-6", className)}
      {...props}
    />
  );
}

export { Container };
export type { ContainerProps };
