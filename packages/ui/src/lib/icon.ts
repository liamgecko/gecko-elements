import * as React from "react";
import {
  HugeiconsIcon as HugeiconsPrimitive,
  type HugeiconsIconProps,
  type IconSvgElement,
} from "@hugeicons/react";

export type { HugeiconsIconProps, IconSvgElement } from "@hugeicons/react";

export const HugeiconsIcon = React.forwardRef<
  SVGSVGElement,
  HugeiconsIconProps
>(function HugeiconsIcon({ strokeWidth = 2, ...props }, ref) {
  return React.createElement(HugeiconsPrimitive, {
    ref,
    strokeWidth,
    ...props,
  });
});

export type GeckoIcon =
  | IconSvgElement
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type GeckoIconProps = Omit<
  HugeiconsIconProps,
  "altIcon" | "icon" | "ref"
>;

export function isHugeicon(icon: GeckoIcon): icon is IconSvgElement {
  return Array.isArray(icon);
}

export function renderGeckoIcon(
  icon: GeckoIcon,
  props: GeckoIconProps = {},
): React.ReactElement {
  if (isHugeicon(icon)) {
    return React.createElement(HugeiconsIcon, { icon, ...props });
  }

  return React.createElement(icon, props);
}
