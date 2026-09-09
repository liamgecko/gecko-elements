import { withRef } from "@geckolabs/elements/lib/with-ref";
import { cn } from "@geckolabs/elements/lib/utils";

const Skeleton = /* @__PURE__ */ withRef(function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-md animate-pulse", className)}
      {...props}
    />
  );
});

export { Skeleton };
