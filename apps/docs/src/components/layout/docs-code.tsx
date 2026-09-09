import { Code as GeckoCode, type CodeProps } from "@geckolabs/elements/components/code";

/** Documentation examples keep only the copy action in sequential Tab order. */
export function Code(props: CodeProps) {
  return props.variant === "block" ? (
    <GeckoCode {...props} tabIndex={-1 as const} />
  ) : (
    <GeckoCode {...props} />
  );
}
