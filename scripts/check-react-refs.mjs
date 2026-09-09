import ts from "typescript";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = path.join(root, "packages/ui");
const config = ts.readConfigFile(path.join(packageRoot, "tsconfig.json"), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, packageRoot);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const errors = [];
let checked = 0;
for (const source of program.getSourceFiles()) {
  if (!source.fileName.startsWith(path.join(packageRoot, "src")) || source.isDeclarationFile) continue;
  function visit(node) {
    if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      const name = node.name?.getText(source) ?? (ts.isVariableDeclaration(node.parent) ? node.parent.name.getText(source) : "");
      if (/^[A-Z]/.test(name) && node.parameters[0] && checker.getTypeAtLocation(node.parameters[0]).getProperty("ref")) {
        checked++;
        const parent = node.parent;
        const wrapper = ts.isCallExpression(parent) ? parent.expression.getText(source) : "";
        if (!/^(withRef|React\.forwardRef|forwardRef)$/.test(wrapper)) {
          errors.push(`${path.relative(root, source.fileName)}: ${name} accepts ref without a React 18 forwarding boundary`);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`React ref audit passed (${checked} component render functions checked).`);
