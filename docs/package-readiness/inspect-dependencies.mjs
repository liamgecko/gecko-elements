// Read-only inventory of direct package usage and locked dependency paths.
// Run from any directory: node docs/package-readiness/inspect-dependencies.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const manifest = read("packages/ui/package.json");
const lock = read("package-lock.json").packages;
const uses = new Map();
const packageName = (spec) =>
  spec.startsWith("@")
    ? spec.split("/").slice(0, 2).join("/")
    : spec.split("/")[0];
function record(spec, file, kind, node, source) {
  if (/^(\.|\/|https?:|node:|#)/.test(spec) || spec.startsWith("@gecko/ui/"))
    return;
  const name = packageName(spec);
  const entries = uses.get(name) ?? [];
  entries.push({
    file,
    line: source
      ? source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
      : node,
    kind,
    specifier: spec,
  });
  uses.set(name, entries);
}
function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), {
    withFileTypes: true,
  })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    if (!/\.(tsx?|m?js|css)$/.test(file)) continue;
    const text = fs.readFileSync(path.join(root, file), "utf8");
    if (file.endsWith(".css")) {
      for (const match of text.matchAll(
        /@import\s+(?:url\()?['"]([^'"]+)['"]/g,
      ))
        record(
          match[1],
          file,
          "css",
          text.slice(0, match.index).split("\n").length,
        );
      continue;
    }
    const source = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
    );
    function visit(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const clause = node.importClause;
        const named = clause?.namedBindings;
        const typeOnly =
          node.isTypeOnly ||
          clause?.isTypeOnly ||
          (!clause?.name &&
            named &&
            ts.isNamedImports(named) &&
            named.elements.length > 0 &&
            named.elements.every((x) => x.isTypeOnly));
        record(
          node.moduleSpecifier.text,
          file,
          typeOnly || file.endsWith(".d.ts") ? "type" : "value",
          node,
          source,
        );
      }
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) &&
            node.expression.text === "require")) &&
        node.arguments.length &&
        ts.isStringLiteral(node.arguments[0])
      )
        record(node.arguments[0].text, file, "dynamic", node, source);
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteral(node.argument.literal)
      )
        record(node.argument.literal.text, file, "type", node, source);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk("packages/ui/src");
function resolve(from, name) {
  let current = from;
  while (true) {
    const candidate = `${current ? current + "/" : ""}node_modules/${name}`;
    if (lock[candidate]) return candidate;
    if (!current) return null;
    current = path.posix.dirname(current);
    if (current === ".") current = "";
  }
}
function closure(name) {
  const first = resolve("packages/ui", name);
  if (!first) return {};
  const paths = { [first]: [name] };
  const queue = [first];
  for (let i = 0; i < queue.length; i++) {
    const from = queue[i];
    for (const dep of Object.keys({
      ...lock[from].dependencies,
      ...lock[from].optionalDependencies,
    })) {
      const to = resolve(from, dep);
      if (to && !paths[to]) {
        paths[to] = [...paths[from], dep];
        queue.push(to);
      }
    }
  }
  return paths;
}
const inventory = [];
for (const name of new Set([
  ...Object.keys(manifest.dependencies),
  ...Object.keys(manifest.devDependencies),
  ...Object.keys(manifest.peerDependencies),
])) {
  const location = resolve("packages/ui", name);
  const installedPath = location && path.join(root, location, "package.json");
  const installed =
    installedPath && fs.existsSync(installedPath)
      ? JSON.parse(fs.readFileSync(installedPath, "utf8"))
      : {};
  inventory.push({
    name,
    declared: Object.fromEntries(
      ["dependencies", "devDependencies", "peerDependencies"]
        .filter((k) => manifest[k]?.[name])
        .map((k) => [k, manifest[k][name]]),
    ),
    lockedVersion: lock[location]?.version,
    installedVersion: installed.version,
    node: installed.engines?.node ?? null,
    license: installed.license ?? null,
    peers: installed.peerDependencies ?? {},
    optionalPeers: installed.peerDependenciesMeta ?? {},
    sourceUses: uses.get(name) ?? [],
  });
}
const undeclared = [...uses]
  .filter(([name]) => !inventory.some((x) => x.name === name))
  .map(([name, sourceUses]) => ({ name, sourceUses }));
console.log(
  JSON.stringify(
    {
      method:
        "TS AST imports/re-exports/literal dynamic imports/import types and CSS imports under packages/ui/src; lock graph follows dependencies and present optional dependencies, not peer edges. Paths are install reachability, not browser bundle reachability.",
      inventory,
      undeclared,
      productionClosures: Object.fromEntries(
        Object.keys(manifest.dependencies).map((name) => [name, closure(name)]),
      ),
    },
    null,
    2,
  ),
);
