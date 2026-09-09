import {
  readFile,
  writeFile,
  readdir,
  rm,
  mkdir,
  copyFile,
  stat,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";
import { compile } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");
const dist = path.join(root, "dist");
const require = createRequire(import.meta.url);
await rm(dist, { recursive: true, force: true });
const configPath = path.join(root, "tsconfig.build.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error)
  throw new Error(
    ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
  );
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const result = program.emit();
const diagnostics = [
  ...parsed.errors,
  ...ts.getPreEmitDiagnostics(program),
  ...result.diagnostics,
];
if (diagnostics.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCurrentDirectory: () => root,
      getCanonicalFileName: (x) => x,
      getNewLine: () => "\n",
    }),
  );
  process.exit(1);
}

async function files(directory) {
  return (await readdir(directory, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));
}
// TypeScript does not copy CSS, fonts, or the vendored JavaScript implementation.
for (const file of await files(src)) {
  const relative = path.relative(src, file);
  if (
    !/\.(?:css|woff2|js)$/.test(file) &&
    !relative.startsWith(`vendor${path.sep}`) &&
    !/assets\/fonts\/.*\.(?:txt|md)$/.test(relative)
  )
    continue;
  const target = path.join(dist, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(file, target);
}

// Resolve internal aliases and extensionless ESM imports in both JS and declarations.
// Use TypeScript's parser so ordinary strings, comments and class names are untouched.
async function resolveSpecifier(specifier, file) {
  let target;
  if (specifier.startsWith("@geckolabs/elements/"))
    target = path.join(dist, specifier.slice("@geckolabs/elements/".length));
  else if (specifier.startsWith("."))
    target = path.resolve(path.dirname(file), specifier);
  else return specifier;
  if (!path.extname(target)) {
    const candidates = [target + ".js", path.join(target, "index.js")];
    target = await (async () => {
      for (const candidate of candidates)
        if (await stat(candidate).catch(() => null)) return candidate;
      throw new Error(`Unresolved internal import ${specifier} in ${file}`);
    })();
  } else if (/\.tsx?$/.test(target)) target = target.replace(/\.tsx?$/, ".js");
  let relative = path
    .relative(path.dirname(file), target)
    .split(path.sep)
    .join("/");
  if (!relative.startsWith(".")) relative = "./" + relative;
  return relative;
}
for (const file of await files(dist)) {
  if (!/\.(js|ts)$/.test(file)) continue;
  let text = await readFile(file, "utf8");
  const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const literals = [];
  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      literals.push(node.moduleSpecifier);
    if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument) &&
      ts.isStringLiteral(node.argument.literal)
    )
      literals.push(node.argument.literal);
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      ts.isStringLiteral(node.arguments[0])
    )
      literals.push(node.arguments[0]);
    ts.forEachChild(node, visit);
  }
  visit(tree);
  for (const literal of literals.sort((a, b) => b.pos - a.pos)) {
    const replacement = await resolveSpecifier(literal.text, file);
    if (replacement !== literal.text)
      text =
        text.slice(0, literal.getStart(tree)) +
        JSON.stringify(replacement) +
        text.slice(literal.end);
  }
  await writeFile(file, text);
}

// Flatten our CSS imports, keeping only Tailwind as the consumer build dependency.
// Both modes have identical tokens, fonts, base styles and component utilities.
async function resolveCssPackage(name) {
  for (const directory of require.resolve.paths(name)) {
    const manifestPath = path.join(directory, name, "package.json");
    const manifest = await readFile(manifestPath, "utf8")
      .then(JSON.parse)
      .catch(() => null);
    if (manifest)
      return path.join(
        directory,
        name,
        manifest.exports?.["."]?.style ?? manifest.main,
      );
  }
  throw new Error(`Cannot resolve stylesheet ${name}`);
}
async function inlineCss(file) {
  let css = await readFile(file, "utf8");
  const imports = [...css.matchAll(/@import\s+["']([^"']+)["'];/g)];
  for (const match of imports) {
    if (match[1] === "tailwindcss") continue;
    const imported = match[1].startsWith(".")
      ? path.resolve(path.dirname(file), match[1])
      : await resolveCssPackage(match[1]);
    css = css.replace(match[0], await inlineCss(imported));
  }
  // Font URLs originate in files alongside the font binaries.
  css = css.replace(
    /url\((["'])(\.\/[^"']+\.woff2)\1\)/g,
    (_, quote, url) =>
      `url(${quote}./assets/fonts/${path.basename(url)}${quote})`,
  );
  return css;
}
let css = await inlineCss(path.join(src, "styles/globals.css"));
css = css
  .replace(/@source\s+[^;]+;\n/g, "")
  .replace('@import "tailwindcss";', "");
css = '@import "tailwindcss" source(none);\n' + css;
css += '\n@source "./**/*.js";\n';
await writeFile(path.join(dist, "tailwind.css"), css);
const compiler = await compile(css, { base: dist, onDependency() {} });
const scanner = new Scanner({ sources: compiler.sources });
await writeFile(path.join(dist, "globals.css"), compiler.build(scanner.scan()));
// Only the top-level distribution stylesheets are public; remove unused source entries.
await rm(path.join(dist, "styles"), { recursive: true, force: true });
await mkdir(path.join(dist, "licenses"), { recursive: true });
for (const name of ["tailwindcss", "tw-animate-css"]) {
  const cssPath =
    name === "tailwindcss"
      ? require.resolve("tailwindcss/package.json")
      : await resolveCssPackage(name);
  const directory =
    name === "tailwindcss"
      ? path.dirname(cssPath)
      : path.resolve(path.dirname(cssPath), "..");
  await copyFile(
    path.join(directory, "LICENSE"),
    path.join(dist, "licenses", `${name}.txt`),
  );
}
console.log(
  "Built Elements JavaScript, declarations, compiled CSS and Tailwind entry.",
);
