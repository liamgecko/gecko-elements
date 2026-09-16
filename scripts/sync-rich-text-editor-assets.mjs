import { cp, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const source = fileURLToPath(
  new URL("../packages/ui/src/vendor/tinymce-4/", import.meta.url),
);
const destination = fileURLToPath(
  new URL("../apps/docs/public/elements/tinymce-4/", import.meta.url),
);
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
console.log(
  "Copied the pinned Rich text editor runtime into the docs public assets.",
);
