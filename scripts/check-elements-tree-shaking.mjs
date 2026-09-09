import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function checkElementsTreeShaking(fixture) {
  const entry = path.join(fixture, "button-only.ts");
  await writeFile(
    entry,
    'export { Button } from "@geckolabs/elements/components/button";\n',
  );
  const { build } = await import(
    pathToFileURL(path.join(fixture, "node_modules/vite/dist/node/index.js"))
  );
  const result = await build({
    root: fixture,
    configFile: false,
    logLevel: "warn",
    build: {
      write: false,
      minify: false,
      lib: { entry, formats: ["es"] },
      rolldownOptions: {
        external: ["react", "react/jsx-runtime", "react-dom"],
      },
    },
  });
  const chunks = (Array.isArray(result) ? result : [result])
    .flatMap((output) => output.output)
    .filter((item) => item.type === "chunk");
  const modules = chunks.flatMap((chunk) => Object.keys(chunk.modules));
  assert(
    modules.some((name) =>
      name.includes("/elements/dist/components/button.js"),
    ),
  );
  const unrelated = modules.filter((name) =>
    /\/(?:recharts|shiki|frimousse|@dnd-kit)\//.test(name),
  );
  assert.deepEqual(
    unrelated,
    [],
    "Button-only bundle must not include unrelated component engines",
  );
  console.log(
    "PASS tree shaking: Button import excludes charts, syntax highlighting, emoji and drag engines",
  );
}
