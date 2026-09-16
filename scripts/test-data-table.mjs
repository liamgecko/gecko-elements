import { spawnSync } from "node:child_process";
import { mkdtemp, cp, readdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratch = await mkdtemp(path.join(tmpdir(), "gecko-data-table-"));
function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed`);
}
let passed = false;
try {
  run(
    "npm",
    [
      "pack",
      "--workspace",
      "@geckolabs/elements",
      "--pack-destination",
      scratch,
      "--silent",
    ],
    root,
  );
  const tarball = (await readdir(scratch)).find((name) =>
    name.endsWith(".tgz"),
  );
  for (const react of ["18.3.1", "19.2.5"]) {
    const fixture = path.join(scratch, react);
    await cp(path.join(root, "tests/data-table"), fixture, { recursive: true });
    await writeFile(
      path.join(fixture, "package.json"),
      JSON.stringify(
        {
          private: true,
          type: "module",
          dependencies: {
            "@geckolabs/elements": `file:${path.join(scratch, tarball)}`,
            react,
            "react-dom": react,
            "react-is": react,
          },
          devDependencies: {
            "@testing-library/dom": "10.4.1",
            "@testing-library/react": "16.3.0",
            vitest: "4.1.11",
            vite: "8.2.2",
            jsdom: "24.1.0",
          },
        },
        null,
        2,
      ),
    );
    // Supply the test peers explicitly; npm 10 crashes while resolving Vitest's
    // optional browser/devtools peer graph in a fresh installation.
    run(
      "npm",
      ["install", "--legacy-peer-deps", "--no-audit", "--no-fund"],
      fixture,
    );
    console.log(`Data table selection tests: React ${react}`);
    run("npm", ["exec", "--", "vitest", "run"], fixture);
  }
  passed = true;
} finally {
  if (passed) await rm(scratch, { recursive: true, force: true });
  else console.error(`Failed test artifacts retained at ${scratch}`);
}
