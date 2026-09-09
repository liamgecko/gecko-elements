import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const verifyOnly = process.argv.includes("--verify-only");
const [version, ...extra] = process.argv
  .slice(2)
  .filter((arg) => arg !== "--verify-only");
assert(
  /^\d+\.\d+\.\d+-next\.\d+$/.test(version ?? "") && extra.length === 0,
  "Usage: npm run release:publish -- 0.1.0-next.1",
);
const directory = path.join(root, ".releases", version);
const receipt = JSON.parse(
  await readFile(path.join(directory, "verified.json"), "utf8"),
);
assert.equal(receipt.name, "@geckolabs/elements");
assert.equal(receipt.version, version);
assert.equal(receipt.registry, "https://registry.npmjs.org/");
assert.equal(receipt.access, "restricted");
assert.equal(receipt.tag, "next");
assert.equal(receipt.filename, `geckolabs-elements-${version}.tgz`);
assert.deepEqual(receipt.checks, [
  "react-18-compiled",
  "react-19-compiled",
  "react-18-tailwind",
  "react-19-tailwind",
  "npm-publish-dry-run",
]);
const tarball = path.join(directory, receipt.filename);
assert.equal(
  createHash("sha256")
    .update(await readFile(tarball))
    .digest("hex"),
  receipt.sha256,
  "Tarball differs from tested artifact; prepare again",
);
function run(args) {
  const result = spawnSync("npm", args, { cwd: root, stdio: "inherit" });
  assert.equal(result.status, 0, `npm ${args.join(" ")} failed`);
}
run(["whoami", "--registry=https://registry.npmjs.org/"]);
if (!verifyOnly) {
  run([
    "publish",
    tarball,
    "--ignore-scripts",
    "--registry=https://registry.npmjs.org/",
    "--access=restricted",
    "--tag=next",
  ]);
}
async function query(args) {
  for (let attempt = 0; attempt < 13; attempt++) {
    const result = spawnSync(
      "npm",
      [
        ...args,
        "--json",
        "--prefer-online",
        "--registry=https://registry.npmjs.org/",
      ],
      {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    let data;
    try {
      data = JSON.parse(result.stdout);
    } catch {
      /* Non-JSON CLI errors fail below. */
    }
    if (result.status === 0) return data;
    if (data?.error?.code === "E404" && attempt < 12) {
      console.log(
        "Waiting for npm registry metadata to become available (read-only retry)...",
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      continue;
    }
    console.error(result.stderr);
    throw new Error(
      "Registry verification failed. Do not republish; use release:verify after resolving access or registry availability.",
    );
  }
}
const access = await query(["access", "get", "status", "@geckolabs/elements"]);
assert(
  ["private", "restricted"].includes(access["@geckolabs/elements"]),
  "Verify package access in npm immediately",
);
const published = await query(["view", `@geckolabs/elements@${version}`]);
assert.equal(published.version, version);
const expectedIntegrity =
  "sha512-" +
  createHash("sha512")
    .update(await readFile(tarball))
    .digest("base64");
assert.equal(
  published.dist.integrity,
  expectedIntegrity,
  "Registry artifact differs from tested tarball",
);
const tags = await query([
  "view",
  `@geckolabs/elements@${version}`,
  "dist-tags",
]);
assert.equal(tags.next, version);
if (tags.latest === version) {
  console.warn(
    `npm also tags ${version} as latest. Install this prerelease by exact version; next-only tagging is not established.`,
  );
}
console.log(
  `Verified @geckolabs/elements@${version}: private access, next tag, exact tarball integrity.`,
);
