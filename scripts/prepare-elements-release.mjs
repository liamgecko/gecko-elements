import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed`);
  return result.stdout;
}
const manifest = JSON.parse(
  await readFile(path.join(root, "packages/ui/package.json"), "utf8"),
);
assert.equal(manifest.name, "@geckolabs/elements");
assert(
  /^\d+\.\d+\.\d+-next\.\d+$/.test(manifest.version),
  "Only next prereleases are supported",
);
assert.equal(
  manifest.private,
  true,
  "Keep the source workspace protected from direct publishing",
);
const output = path.join(root, ".releases", manifest.version);
await mkdir(output, { recursive: true });
// A failed rerun must never leave a previous success receipt behind.
await rm(path.join(output, "verified.json"), { force: true });
run("npm", ["run", "build:package"]);
const stage = await mkdtemp(path.join(tmpdir(), "elements-release-"));
try {
  for (const item of ["dist", "docs", "README.md"])
    await cp(path.join(root, "packages/ui", item), path.join(stage, item), {
      recursive: true,
    });
  delete manifest.private;
  delete manifest.scripts;
  delete manifest.devDependencies;
  manifest.publishConfig = {
    registry: "https://registry.npmjs.org/",
    access: "restricted",
    tag: "next",
  };
  await writeFile(
    path.join(stage, "package.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  const packed = JSON.parse(
    run(
      "npm",
      [
        "pack",
        stage,
        "--ignore-scripts",
        "--json",
        "--pack-destination",
        output,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] },
    ),
  )[0];
  const tarball = path.join(output, packed.filename);
  for (const mode of ["compiled", "tailwind"]) {
    run(process.execPath, ["scripts/test-react-compat.mjs"], {
      env: {
        ...process.env,
        ELEMENTS_PACKAGE_TARBALL: tarball,
        ELEMENTS_CSS_MODE: mode,
      },
    });
  }
  run("npm", [
    "publish",
    tarball,
    "--dry-run",
    "--ignore-scripts",
    "--registry=https://registry.npmjs.org/",
    "--access=restricted",
    "--tag=next",
  ]);
  const receipt = {
    name: manifest.name,
    version: manifest.version,
    filename: packed.filename,
    registry: manifest.publishConfig.registry,
    access: "restricted",
    tag: "next",
    sha256: createHash("sha256")
      .update(await readFile(tarball))
      .digest("hex"),
    verifiedAt: new Date().toISOString(),
    checks: [
      "react-18-compiled",
      "react-19-compiled",
      "react-18-tailwind",
      "react-19-tailwind",
      "npm-publish-dry-run",
    ],
  };
  await writeFile(
    path.join(output, "verified.json"),
    JSON.stringify(receipt, null, 2) + "\n",
  );
  console.log(
    `Verified private prerelease: ${tarball}\nNothing has been published. Run npm run release:publish -- ${manifest.version} when npm access is configured.`,
  );
} finally {
  await rm(stage, { recursive: true, force: true });
}
