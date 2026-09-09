import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

// Inspect the installed tarball, not the source workspace or its generated output.
export async function checkPackedElements(root) {
  const manifest = JSON.parse(
    await readFile(path.join(root, "package.json"), "utf8"),
  );
  assert.equal(manifest.name, "@geckolabs/elements");
  assert.equal(
    manifest.private,
    true,
    "Publishing remains a separate release step",
  );
  assert.deepEqual(manifest.sideEffects, ["**/*.css"]);
  assert(
    !manifest.dependencies.shadcn && !manifest.dependencies["tw-animate-css"],
  );
  assert(!manifest.dependencies.react && !manifest.dependencies["react-dom"]);
  assert(!(await readdir(root)).includes("src"));
  const dist = path.join(root, "dist");
  const files = (await readdir(dist, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));
  assert(files.length > 100);
  assert(
    !files.some((file) => file.endsWith(".tsx") || /\.(otf|ttf)$/.test(file)),
  );
  const hasFile = async (file) =>
    assert(
      (await stat(file).catch(() => null))?.isFile(),
      `Missing packed file ${file}`,
    );
  for (const file of files) {
    if (!/\.(js|ts)$/.test(file)) continue;
    const text = await readFile(file, "utf8");
    assert(
      !text.includes("@geckolabs/elements/"),
      `Unrewritten internal alias in ${file}`,
    );
    assert(!text.includes("node_modules/"), `Non-portable type in ${file}`);
    const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const imports = [];
    function visit(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      )
        imports.push(node.moduleSpecifier.text);
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteral(node.argument.literal)
      )
        imports.push(node.argument.literal.text);
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        ts.isStringLiteral(node.arguments[0])
      )
        imports.push(node.arguments[0].text);
      ts.forEachChild(node, visit);
    }
    visit(tree);
    for (const specifier of imports.filter((value) => value.startsWith("."))) {
      assert(
        path.extname(specifier),
        `Extensionless ESM import in ${file}: ${specifier}`,
      );
      const resolved = path.resolve(path.dirname(file), specifier);
      assert(resolved.startsWith(dist + path.sep));
      await hasFile(resolved);
      if (file.endsWith(".d.ts") && specifier.endsWith(".js"))
        await hasFile(resolved.replace(/\.js$/, ".d.ts"));
    }
  }
  for (const name of ["globals.css", "tailwind.css"]) {
    const css = await readFile(path.join(dist, name), "utf8");
    assert(!/https?:\/\/(?:fonts\.googleapis|fonts\.gstatic)/.test(css));
    assert(
      !css.includes("../../../apps") && !css.includes("../../../components"),
    );
    for (const match of css.matchAll(/url\(["']([^"']+\.woff2)["']\)/g))
      await hasFile(path.resolve(dist, match[1]));
    if (name === "globals.css")
      assert(!/@(?:import|source|theme|utility|apply)\b/.test(css));
    else
      assert(
        css.startsWith('@import "tailwindcss" source(none);') &&
          css.includes('@source "./**/*.js";'),
      );
  }
  for (const file of [
    "vendor/shadcn-message-scroller/index.js",
    "vendor/shadcn-message-scroller/LICENSE.md",
    "vendor/shadcn-tailwind/LICENSE.md",
    "assets/fonts/Geist-OFL.txt",
    "assets/fonts/Satoshi-FFL.txt",
    "assets/fonts/README.md",
    "licenses/tailwindcss.txt",
    "licenses/tw-animate-css.txt",
  ])
    await hasFile(path.join(dist, file));
  console.log(
    `PASS packed distribution: ${files.length} files, portable imports, CSS, fonts and notices`,
  );
}
