import * as React from "react";

/**
 * Keep the component's existing props (including its ref type) while routing refs
 * through React.forwardRef. React 18 does not pass ref to ordinary functions.
 * This is an implementation helper, not a product composition API.
 */
export function withRef<Props extends { ref?: unknown }>(
  render: (props: Props) => React.ReactElement | null,
): React.NamedExoticComponent<Props> {
  const Component = React.forwardRef<unknown, Omit<Props, "ref">>(
    (props, ref) => render({ ...props, ref } as unknown as Props),
  );
  Component.displayName = render.name;
  // forwardRef changes the runtime representation, not the JSX props contract.
  return Component as unknown as React.NamedExoticComponent<Props>;
}
