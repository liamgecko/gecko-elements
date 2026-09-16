import { readFile, readdir, writeFile, access, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const docs = path.join(root, "packages/ui/docs");
const patterns = {
  header: [
    "persistent-editor.tsx",
    "Presentation metadata is not permission authority; mount above child routes.",
  ],
  "alert-dialog": [
    "persistent-editor.tsx",
    "The application must connect router blockers; browser refresh/close cannot use custom dialogs.",
  ],
  field: [
    "async-form.tsx",
    "Application owns schema and shared mutation validation.",
  ],
  attachment: [
    "upload-field.tsx",
    "Application owns upload/scan service, durable references and abandoned upload cleanup.",
  ],
  combobox: [
    "remote-combobox.tsx",
    "Remote recipe covers search, selection and races; no built-in remote pagination or virtualization.",
  ],
  "data-table": [
    "remote-table.tsx",
    "Backend must support requested query keys. rowLink uses native anchors and browser context menus; visible row actions use Dropdown menu.",
  ],
  "context-menu": [
    null,
    "No current DataTable row integration. Preserve native browser menus on rowLink anchors; visible row actions use Dropdown menu.",
  ],
  empty: [
    "remote-table.tsx",
    "Render only for confirmed empty data; preserve cached empty during refresh.",
  ],
  skeleton: [
    "persistent-editor.tsx",
    "Match known control geometry; do not guess an unknown collection shape.",
  ],
  card: [
    "async-form.tsx",
    "Use size sm for application content blocks; default size remains available for other contexts.",
  ],
  toast: [
    "async-form.tsx",
    "Field validation belongs beside fields; operation feedback must not shift page layout.",
  ],
  "rich-text-editor": [
    null,
    "Vendored TinyMCE 4.7.1 compatibility runtime; same-origin frame is not an HTML security boundary. Serve its assets.",
  ],
  "action-icons": [
    "async-form.tsx",
    "Glyph mapping only; no action behaviour or permissions.",
  ],
};
const entries = [];
for (const filename of (await readdir(docs))
  .filter((name) => name.endsWith(".md"))
  .sort()) {
  const source = await readFile(path.join(docs, filename), "utf8");
  const importPath = source.match(/^Import:\s*`?([^`\s]+)`?/m)?.[1];
  const sourcePath = source.match(/^Source:\s*`?([^`\s]+)`?/m)?.[1];
  if (!importPath || !sourcePath) continue;
  const id = filename.replace(/\.md$/, "");
  const implementation = path.join(root, "packages/ui", sourcePath);
  await access(implementation);
  const code = (await stat(implementation)).isDirectory()
    ? (
        await Promise.all(
          (await readdir(implementation))
            .filter((name) => /\.[jt]sx?$/.test(name))
            .map((name) => readFile(path.join(implementation, name), "utf8")),
        )
      ).join("\n")
    : await readFile(implementation, "utf8");
  const dependencies = [
    ...new Set(
      [...code.matchAll(/(?:from\s+|import\s*)["']([^"']+)["']/g)]
        .map((match) => match[1])
        .filter(
          (name) =>
            !name.startsWith(".") &&
            !name.startsWith("@geckolabs/") &&
            !["react", "react-dom"].includes(name),
        )
        .map((name) =>
          name.startsWith("@")
            ? name.split("/").slice(0, 2).join("/")
            : name.split("/")[0],
        ),
    ),
  ].sort();
  if (id === "rich-text-editor") dependencies.push("vendored TinyMCE 4.7.1");
  const [recipe, limits] = patterns[id] ?? [
    null,
    "Use the documented composition and variants; application owns domain data and effects.",
  ];
  if (recipe) await access(path.join(docs, "recipes", recipe));
  entries.push({
    id,
    title: source.match(/^# (.+)/m)?.[1] ?? id,
    import: importPath,
    contract: `docs/${filename}`,
    source: sourcePath,
    implementationDependencies: dependencies,
    dependencyPolicy: "docs/dependencies.md",
    recipes: recipe ? [`docs/recipes/${recipe}`] : [],
    limits,
    checks: recipe
      ? ["npm run typecheck", "npm run check:contracts", "npm run test:recipes"]
      : id === "rich-text-editor"
        ? ["npm run typecheck", "npm run test:rich-text-editor"]
        : ["npm run typecheck"],
  });
}
const json =
  JSON.stringify(
    {
      schemaVersion: 1,
      generatedBy: "scripts/generate-capabilities.mjs",
      scope:
        "Declared component contracts. Dependency names are observed implementation imports, not approval for direct app imports. Checks identify relevant suites, not exhaustive per-prop coverage.",
      capabilities: entries,
    },
    null,
    2,
  ) + "\n";
const md =
  "# Capability index\n\nGenerated from component contracts and their declared sources. Run `npm run generate:capabilities` after changing a contract or dependency. [Machine-readable index](capabilities.json) includes imports, implementation dependencies, limits and checks. Read [dependency policy](dependencies.md) before adding an external import. This is a routing index, not a replacement for each contract.\n\n| Capability | Import | Recipe | Important boundary |\n| --- | --- | --- | --- |\n" +
  entries
    .map(
      (item) =>
        `| [${item.title}](${item.contract.replace("docs/", "")}) | \`${item.import}\` | ${item.recipes.map((file) => `[Source](${file.replace("docs/", "")})`).join(", ") || "See contract"} | ${item.limits} |`,
    )
    .join("\n") +
  "\n";
for (const [name, content] of [
  ["capabilities.json", json],
  ["capabilities.md", md],
]) {
  const target = path.join(docs, name);
  if (process.argv.includes("--check")) {
    if ((await readFile(target, "utf8").catch(() => "")) !== content)
      throw new Error(`${name} is stale; run npm run generate:capabilities`);
  } else await writeFile(target, content);
}
console.log(`Capability index: ${entries.length} contracts verified.`);
