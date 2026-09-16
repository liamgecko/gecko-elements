import ts from "typescript";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const forbidden = [
  "@base-ui/react",
  "@radix-ui",
  "react-bootstrap",
  "react-select",
  "@tinymce/tinymce-react",
  "tinymce",
  "cmdk",
  "sonner",
  "@hugeicons/react",
  "react-colorful",
  "react-day-picker",
  "input-otp",
  "frimousse",
  "react-phone-number-input",
  "recharts",
];
export function checkSource(text, filename = "consumer.tsx") {
  const source = ts.createSourceFile(
    filename,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const issues = [];
  const names = new Map();
  function issue(node, rule, message) {
    issues.push({
      file: filename,
      line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      rule,
      message,
    });
  }
  function checkImport(node, value, typeOnly = false) {
    if (
      forbidden.some((pkg) => value === pkg || value.startsWith(pkg + "/")) ||
      (value.startsWith("@tanstack/react-table") && !typeOnly)
    )
      issue(
        node,
        "public-ui-import",
        "Use the approved Elements interface; read docs/dependencies.md for exceptions.",
      );
  }
  source.forEachChild((node) => {
    if (
      !ts.isImportDeclaration(node) ||
      !ts.isStringLiteral(node.moduleSpecifier)
    )
      return;
    const value = node.moduleSpecifier.text;
    const bindings = node.importClause?.namedBindings;
    const typeOnly =
      node.importClause?.isTypeOnly ||
      (bindings &&
        ts.isNamedImports(bindings) &&
        bindings.elements.length > 0 &&
        bindings.elements.every((e) => e.isTypeOnly));
    checkImport(node, value, Boolean(typeOnly));
    if (
      value.startsWith("@geckolabs/elements/") &&
      bindings &&
      ts.isNamedImports(bindings)
    )
      for (const item of bindings.elements)
        names.set(item.name.text, item.propertyName?.text ?? item.name.text);
  });
  function staticallyRequired(attribute) {
    if (!attribute) return false;
    return (
      !attribute.initializer ||
      (ts.isJsxExpression(attribute.initializer) &&
        attribute.initializer.expression?.kind === ts.SyntaxKind.TrueKeyword)
    );
  }
  function visit(node) {
    if (ts.isCallExpression(node)) {
      const fn = node.expression;
      if (
        (fn.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(fn) && fn.text === "require")) &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      )
        checkImport(node, node.arguments[0].text);
      const globalCall =
        ts.isIdentifier(fn) && ["confirm", "alert"].includes(fn.text);
      const memberCall =
        ts.isPropertyAccessExpression(fn) &&
        ts.isIdentifier(fn.expression) &&
        ["window", "globalThis"].includes(fn.expression.text) &&
        ["confirm", "alert"].includes(fn.name.text);
      if (globalCall || memberCall)
        issue(
          node,
          "native-dialog",
          "Use Elements AlertDialog for application decisions; beforeunload is the browser-only exception.",
        );
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const name = names.get(node.tagName.getText(source));
      const attrs = node.attributes.properties.filter(ts.isJsxAttribute);
      const attr = (key) => attrs.find((a) => a.name.getText(source) === key);
      if (name === "Card" && !attr("size"))
        issue(
          node,
          "content-card-size",
          "Choose an explicit Card size; application content blocks use sm.",
        );
      if (
        ["Input", "Textarea"].includes(name) &&
        staticallyRequired(attr("required"))
      ) {
        const id = attr("id")?.initializer;
        // Only assert static associations we can prove; dynamic schemas need runtime tests.
        if (id && ts.isStringLiteral(id)) {
          let requiredLabel = false;
          function findLabel(other) {
            if (
              (ts.isJsxOpeningElement(other) ||
                ts.isJsxSelfClosingElement(other)) &&
              ["FieldLabel", "Label"].includes(
                names.get(other.tagName.getText(source)),
              )
            ) {
              const a = other.attributes.properties.filter(ts.isJsxAttribute);
              const forValue = a.find(
                (p) => p.name.getText(source) === "htmlFor",
              )?.initializer;
              if (
                forValue &&
                ts.isStringLiteral(forValue) &&
                forValue.text === id.text &&
                staticallyRequired(
                  a.find((p) => p.name.getText(source) === "required"),
                )
              )
                requiredLabel = true;
            }
            ts.forEachChild(other, findLabel);
          }
          findLabel(source);
          if (!requiredLabel)
            issue(
              node,
              "required-label",
              "A statically required field needs an associated label with required.",
            );
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return issues;
}
async function scan(target) {
  const info = await stat(target);
  if (info.isDirectory())
    return (
      await Promise.all(
        (await readdir(target))
          .filter((name) => !["node_modules", "dist", ".git"].includes(name))
          .map((name) => scan(path.join(target, name))),
      )
    ).flat();
  if (!/\.[jt]sx?$/.test(target)) return [];
  return checkSource(await readFile(target, "utf8"), target);
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const targets = process.argv.slice(2);
  const issues = (
    await Promise.all(
      (targets.length ? targets : ["packages/ui/docs/recipes"]).map(scan),
    )
  ).flat();
  for (const issue of issues)
    console.error(
      `${issue.file}:${issue.line} [${issue.rule}] ${issue.message}`,
    );
  console.log(
    `Application contract check: ${issues.length} issues. Static rules are intentionally bounded; see docs/verification.md.`,
  );
  process.exitCode = issues.length ? 1 : 0;
}
