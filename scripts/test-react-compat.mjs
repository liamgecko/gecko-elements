import { spawnSync } from "node:child_process";
import {
  mkdtemp,
  cp,
  readFile,
  writeFile,
  readdir,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const versions = {
  18: { react: "18.3.1", dom: "18.3.1", types: "18.3.31", domTypes: "18.3.7" },
  19: { react: "19.2.5", dom: "19.2.5", types: "19.2.18", domTypes: "19.2.3" },
};
const requested = process.argv.slice(2);
const matrix = requested.length ? requested : Object.keys(versions);
for (const major of matrix)
  assert(versions[major], `Unsupported test version ${major}`);
function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed`);
}
const scratch = await mkdtemp(path.join(tmpdir(), "gecko-react-compat-"));
console.log(`Compatibility artifacts: ${scratch}`);
let passed = false;
try {
  run(
    "npm",
    [
      "pack",
      "--workspace",
      "@gecko/ui",
      "--pack-destination",
      scratch,
      "--quiet",
    ],
    root,
  );
  const tarball = (await readdir(scratch)).find((name) =>
    name.endsWith(".tgz"),
  );
  const components = path.join(root, "packages/ui/src/components");
  const files = await readdir(components, { recursive: true });
  const imports = files
    .filter((name) => name.endsWith(".tsx") || name.endsWith("/index.ts"))
    .sort()
    .map(
      (name) =>
        `@gecko/ui/components/${name.replace(/\.tsx?$/, "").replace(/\/index$/, "")}`,
    );
  for (const major of matrix) {
    const version = versions[major];
    const fixture = path.join(scratch, `react-${major}`);
    await cp(path.join(root, "tests/react-compat"), fixture, {
      recursive: true,
    });
    const manifest = JSON.parse(
      await readFile(path.join(fixture, "package.json")),
    );
    manifest.dependencies = {
      "@gecko/ui": `file:../${tarball}`,
      react: version.react,
      "react-dom": version.dom,
      "react-is": version.react,
    };
    manifest.devDependencies["@types/react"] = version.types;
    manifest.devDependencies["@types/react-dom"] = version.domTypes;
    await writeFile(
      path.join(fixture, "package.json"),
      JSON.stringify(manifest, null, 2),
    );
    // Every component module is compiled and loaded, even those not rendered by
    // the interaction fixture. No monorepo aliases or hoisted React are used.
    await writeFile(
      path.join(fixture, "exports.tsx"),
      imports
        .map(
          (name, i) => `import * as module${i} from ${JSON.stringify(name)};`,
        )
        .join("\n") +
        `\n(globalThis as unknown as {compatModules: unknown[]}).compatModules = [${imports.map((_, i) => `module${i}`).join(",")}];\n`,
    );
    await writeFile(path.join(fixture, "component-imports.json"), JSON.stringify(imports));
    console.log(`\nTesting React ${version.react}`);
    run(
      "npm",
      ["install", "--ignore-scripts", "--no-audit", "--no-fund"],
      fixture,
    );
    run("npm", ["ls", "react", "react-dom"], fixture);
    run(path.join(fixture, "node_modules/.bin/tsc"), ["--noEmit"], fixture);
    run(path.join(fixture, "node_modules/.bin/vite"), ["build"], fixture);
    const { createServer, preview } = await import(
      pathToFileURL(path.join(fixture, "node_modules/vite/dist/node/index.js"))
    );
    // Development mode preserves React warnings; production mode verifies the
    // actual built artifact and production JSX runtime separately.
    for (const mode of ["development", "production"]) {
      const server =
        mode === "development"
          ? await createServer({
              root: fixture,
              server: { host: "127.0.0.1", port: 0 },
            })
          : await preview({
              root: fixture,
              preview: { host: "127.0.0.1", port: 0 },
            });
      if (mode === "development") await server.listen();
      const url = server.resolvedUrls.local[0];
      const browser = await chromium.launch(
        process.env.PLAYWRIGHT_CHANNEL
          ? { channel: process.env.PLAYWRIGHT_CHANNEL }
          : {},
      );
      try {
        const page = await browser.newPage({
          viewport: { width: 1280, height: 1000 },
          reducedMotion: "reduce",
        });
        const errors = [];
        page.on(
          "pageerror",
          (error) => (errors.push(error.message), console.error(error.message)),
        );
        page.on("console", (message) => {
          if (message.type() === "error" || message.type() === "warning")
            errors.push(message.text());
        });
        await page.route("https://fonts.googleapis.com/**", (route) =>
          route.fulfill({ contentType: "text/css", body: "" }),
        );
        console.log(`Browser checks: React ${major} ${mode}`);
        await page.goto(url);
        await page
          .getByRole("heading", { name: `React ${version.react}` })
          .waitFor();
        await page
          .getByRole("button", { name: "Focus name", exact: true })
          .click();
        assert(
          await page
            .getByLabel("Name", { exact: true })
            .evaluate((el) => document.activeElement === el),
        );
        await page.waitForFunction(() => document.querySelectorAll(".recharts-bar-rectangle").length === 2);
        await page.getByLabel("Name", { exact: true }).fill("Gecko");
        assert.equal(
          await page.getByTestId("name-value").textContent(),
          "Gecko",
        );
        await page.getByRole("button", { name: "Save", exact: true }).click();
        assert.equal(await page.evaluate(() => window.compat.calls), 1);
        await page.getByRole("button", { name: "Saving", exact: true }).focus();
        await page.keyboard.press("Enter");
        assert.equal(await page.evaluate(() => window.compat.calls), 1);
        await page.getByRole("checkbox", { name: "Enabled" }).check();
        await page.getByRole("switch", { name: "Notifications" }).click();
        assert.equal(
          await page.getByRole("switch").getAttribute("aria-checked"),
          "true",
        );
        await page.getByRole("button", { name: "Open dialog" }).click();
        await page.getByRole("dialog", { name: "Profile" }).waitFor();
        await page.getByLabel("Dialog name").fill("Updated");
        await page.keyboard.press("Escape");
        await page.getByRole("dialog").waitFor({ state: "hidden" });
        await page.waitForFunction(
          () => document.activeElement === window.compat.refs["dialog-trigger"],
        );
        await page
          .getByRole("combobox", { name: "Fruit", exact: true })
          .click();
        await page.getByRole("option", { name: "Banana" }).click();
        assert.equal(
          await page.getByTestId("selected").textContent(),
          "Banana",
        );
        await page.getByRole("combobox", { name: "Find fruit" }).fill("Cher");
        await page.getByRole("option", { name: "Cherry" }).click();
        assert.equal(await page.getByTestId("combo").textContent(), "Cherry");
        await page
          .getByRole("button", { name: "Actions", exact: true })
          .click();
        await page.getByRole("menuitem", { name: "Notify" }).click();
        await page.getByText("Action completed", { exact: true }).waitFor();
        await page.getByRole("button", { name: "Jump to message" }).click();
        await page.waitForFunction(
          () =>
            window.compat.refs.viewport.scrollTop > 0 &&
            window.compat.refs.viewport.scrollTop < 1000,
        );
        await page.waitForFunction(() =>
          document
            .querySelector('[data-testid="visible-messages"]')
            .textContent.includes("message-4"),
        );
        const anchorBefore = await page.evaluate(
          () =>
            window.compat.refs.item.getBoundingClientRect().top -
            window.compat.refs.viewport.getBoundingClientRect().top,
        );
        await page.getByRole("button", { name: "Prepend message" }).click();
        await page.waitForFunction(
          (before) =>
            Math.abs(
              window.compat.refs.item.getBoundingClientRect().top -
                window.compat.refs.viewport.getBoundingClientRect().top -
                before,
            ) < 2,
          anchorBefore,
        );
        await page.getByRole("button", { name: "Latest message" }).click();
        await page.getByRole("button", { name: "Append message" }).click();
        await page.waitForFunction(() => {
          const el = window.compat.refs.viewport;
          return Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;
        });
        await page.waitForFunction(() =>
          window.compat.refs["scroll-button"].hasAttribute("inert"),
        );
        const expected = [
          "button",
          "textarea",
          "search",
          "file",
          "checkbox",
          "switch",
          "dialog-trigger",
          "select",
          "combobox",
          "menu-trigger",
          "scroller",
          "viewport",
          "content",
          "item",
          "scroll-button",
        ];
        assert.deepEqual(
          await page.evaluate(
            (names) =>
              names.filter(
                (name) => !(window.compat.refs[name] instanceof Element),
              ),
            expected,
          ),
          [],
        );
        assert(
          await page
            .getByTestId("collapsed-action")
            .evaluate((el) => Boolean(el.closest("[inert]"))),
        );
        const cleanupsBefore = await page.evaluate(
          () => window.compat.cleanups,
        );
        await page.evaluate(() => window.compat.unmount());
        assert.equal(
          await page.evaluate(() => window.compat.cleanups),
          cleanupsBefore + 1,
        );
        assert.deepEqual(
          await page.evaluate(() =>
            Object.keys(window.compat.refs).filter(
              (name) => window.compat.refs[name] !== null,
            ),
          ),
          [],
        );
        assert.deepEqual(
          errors,
          [],
          `Unexpected ${mode} console output on React ${major}`,
        );
        console.log(
          `PASS React ${version.react} ${mode}: all modules, refs, forms, dialog focus, choices, menu/toast, scrolling and unmount`,
        );
      } finally {
        await browser.close();
        if (mode === "development") await server.close();
        else await new Promise((resolve) => server.httpServer.close(resolve));
      }
    }
  }
  passed = true;
} finally {
  if (passed && !process.env.KEEP_REACT_COMPAT)
    await rm(scratch, { recursive: true, force: true });
  else console.log(`Kept compatibility artifacts at ${scratch}`);
}
