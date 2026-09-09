import { withRef } from "@geckolabs/elements/lib/with-ref";
import * as React from "react";

import { Input } from "@geckolabs/elements/components/input";

export type FileInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "defaultValue"
>;

export const FileInput = /* @__PURE__ */ withRef(function FileInput(
  props: FileInputProps,
) {
  return <Input type="file" {...props} />;
});
