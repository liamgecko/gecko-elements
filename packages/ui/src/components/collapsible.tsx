import { withRef } from "@gecko/ui/lib/with-ref";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

const Collapsible = /* @__PURE__ */ withRef(function Collapsible({
  ...props
}: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
});

const CollapsibleTrigger = /* @__PURE__ */ withRef(function CollapsibleTrigger({
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
});

const CollapsibleContent = /* @__PURE__ */ withRef(function CollapsibleContent({
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  );
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
