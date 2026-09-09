import { version } from "react";

/** Preserve the native inert attribute on React 18 and React 19. */
export function inertProps(inert: boolean): { inert?: boolean } {
  // React 18 treats inert as an unknown attribute and drops boolean values.
  // Keep its empty-string serialization internal; React 19 knows the boolean.
  return {
    inert: inert ? (version.startsWith("18.") ? "" : true) : undefined,
  } as { inert?: boolean };
}
