import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const root = path.resolve(import.meta.dirname, "..");
const server = await createServer({
  configFile: false,
  root: path.join(root, "tests/application-recipes"),
  publicDir: path.join(root, "apps/docs/public"),
  plugins: [react(), tailwind()],
  resolve: {
    alias: [
      {
        find: "@geckolabs/elements/globals.css",
        replacement: path.join(root, "packages/ui/src/styles/globals.css"),
      },
      {
        find: "@geckolabs/elements",
        replacement: path.join(root, "packages/ui/src"),
      },
    ],
  },
  server: {
    hmr: false,
    watch: null,
    host: "127.0.0.1",
    port: 5198,
    fs: { allow: [root] },
  },
});
await server.listen();
const base = server.resolvedUrls.local[0];
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
});
let passed = 0;
const onlyRTE = process.argv.includes("--rte");
const errors = [];
async function scenario(name, run) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.setDefaultTimeout(10000);
  page.on("pageerror", (error) => errors.push(`${name}: ${error.stack}`));
  console.log(`RUN ${name}`);
  try {
    await run(page);
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(errors);
    console.error((await page.locator("body").innerText()).slice(0, 2500));
    throw error;
  } finally {
    await page.close();
  }
}
async function open(page, recipe) {
  await page.goto(`${base}?recipe=${recipe}`);
  await page.waitForFunction(() => Boolean(window.recipeTest));
}
async function resolve(page, kind, value) {
  await page.waitForFunction(
    (k) => window.recipeTest.pending.some((p) => p.kind === k),
    kind,
  );
  await page.evaluate(
    ({ kind, value }) => {
      for (const p of [...window.recipeTest.pending].filter(
        (p) => p.kind === kind,
      ))
        window.recipeTest.resolve(kind, value);
    },
    { kind, value },
  );
}
async function reject(page, kind) {
  await page.evaluate((k) => {
    for (const p of [...window.recipeTest.pending].filter((p) => p.kind === k))
      window.recipeTest.reject(k);
  }, kind);
}
async function count(page, kind) {
  return page.evaluate(
    (k) => window.recipeTest.calls.filter((c) => c.kind === k).length,
    kind,
  );
}
async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
}
async function shown(locator) {
  await locator.waitFor({ state: "visible" });
}
try {
  if (!onlyRTE) {
    await scenario(
      "required validation, duplicate save, edits during save and recovery",
      async (page) => {
        await open(page, "form");
        const input = page.getByRole("textbox", { name: /^Name/ });
        const save = page.getByRole("button", { name: "Save changes" });
        await input.fill("");
        await save.click();
        await shown(page.getByText("Enter a name."));
        await page.getByRole("button", { name: "Submit for approval" }).click();
        await shown(page.getByText("Enter a name."));
        assert.equal(await count(page, "save"), 0);
        assert.equal(await input.getAttribute("aria-invalid"), "true");
        assert.equal(
          await input.evaluate((e) => e === document.activeElement),
          true,
        );
        await input.fill("Submitted");
        const beforeSave = await save.boundingBox();
        await save.dblclick({ force: true });
        assert.equal(await save.isEnabled(), true);
        assert.equal(await save.getAttribute("aria-busy"), null);
        assert.equal(await save.innerText(), "Save changes");
        const duringSave = await save.boundingBox();
        assert.equal(duringSave.width, beforeSave.width);
        assert.equal(duringSave.height, beforeSave.height);
        assert.equal(await count(page, "save"), 1);
        await input.fill("Later edit");
        await resolve(page, "save");
        await shown(page.getByText("Unsaved changes", { exact: true }));
        assert.equal(await input.inputValue(), "Later edit");
        assert.equal(await save.isEnabled(), true);
        await save.click();
        await reject(page, "save");
        await shown(page.getByText("Changes could not be saved. Try again."));
        assert.equal(await save.isEnabled(), true);
        await save.click();
        await resolve(page, "save");
        await shown(page.getByText("All changes saved", { exact: true }));
      },
    );
    await scenario("unmounted save ignores completion", async (page) => {
      await open(page, "form");
      await page.getByRole("button", { name: "Save changes" }).click();
      await page.evaluate(() => window.recipeTest.unmount());
      await page
        .getByRole("button", { name: "Save changes" })
        .waitFor({ state: "hidden" });
      await resolve(page, "save");
      assert.equal(
        await page.getByText("Changes saved.", { exact: true }).count(),
        0,
      );
    });
    await scenario(
      "header and action geometry persist through load and tabs; dialog guards dirty edits",
      async (page) => {
        await open(page, "editor");
        const save = page.getByRole("button", { name: "Save changes" });
        await shown(save);
        const box = await save.boundingBox();
        assert.equal(
          await page.getByRole("heading", { name: "Known record" }).count(),
          1,
        );
        await shown(page.getByRole("button", { name: "Actions", exact: true }));
        assert.equal(await save.isEnabled(), true);
        await resolve(page, "load", "Original");
        await shown(page.getByRole("textbox", { name: /^Body/ }));
        assert.deepEqual(await save.boundingBox(), box);
        await page.getByRole("tab", { name: "Settings", exact: true }).click();
        assert.deepEqual(await save.boundingBox(), box);
        assert.equal(await save.isEnabled(), true);
        await page.getByRole("tab", { name: "Editor", exact: true }).click();
        await page.getByRole("textbox", { name: /^Body/ }).fill("Changed");
        await page.getByRole("tab", { name: "Settings", exact: true }).click();
        await shown(page.getByRole("alertdialog"));
        assert.equal(
          await page
            .locator('[role="tab"]')
            .filter({ hasText: "Editor" })
            .getAttribute("aria-selected"),
          "true",
        );
        await page.getByRole("button", { name: "Keep editing" }).click();
        assert.equal(
          await page.getByRole("textbox", { name: /^Body/ }).inputValue(),
          "Changed",
        );
        await page.getByRole("tab", { name: "Settings", exact: true }).click();
        await page.getByRole("button", { name: "Discard changes" }).click();
        await page.getByRole("tab", { name: "Editor", exact: true }).click();
        assert.equal(
          await page.getByRole("textbox", { name: /^Body/ }).inputValue(),
          "Original",
        );
        assert.deepEqual(await save.boundingBox(), box);
      },
    );
    await scenario(
      "navigation transition cancel, focus return and proceed exactly once",
      async (page) => {
        await open(page, "guard");
        const trigger = page.getByRole("button", {
          name: "Navigate",
          exact: true,
        });
        await trigger.click();
        await shown(page.getByRole("alertdialog"));
        await page.getByRole("button", { name: "Keep editing" }).click();
        await page.getByRole("alertdialog").waitFor({ state: "hidden" });
        assert.equal(await count(page, "cancel"), 1);
        assert.equal(await count(page, "proceed"), 0);
        await page.waitForFunction(
          () => document.activeElement?.textContent === "Navigate",
        );
        await trigger.click();
        await page.getByRole("button", { name: "Discard changes" }).click();
        await shown(page.getByText("Destination page"));
        assert.equal(await count(page, "proceed"), 1);
      },
    );
    await scenario(
      "remote options retain complete list after selection and ignore stale searches",
      async (page) => {
        await open(page, "combobox");
        const input = page.getByRole("combobox");
        const all = [
          { value: "a", label: "Admissions form" },
          { value: "v", label: "Visit form" },
        ];
        await resolve(page, "search", all);
        await input.click();
        await page.getByRole("option", { name: "Admissions form" }).click();
        await input.click();
        await shown(page.getByRole("option", { name: "Visit form" }));
        await input.fill("Ad");
        await page.waitForFunction(() =>
          window.recipeTest.pending.some(
            (p) => p.kind === "search" && p.value === "Ad",
          ),
        );
        await input.fill("Visit");
        await page.waitForFunction(() =>
          window.recipeTest.pending.some(
            (p) => p.kind === "search" && p.value === "Visit",
          ),
        );
        await page.evaluate(() => {
          const test = window.recipeTest;
          const i = test.pending
            .filter((p) => p.kind === "search")
            .findIndex((p) => p.value === "Visit");
          test.resolve("search", [{ value: "v", label: "Visit form" }], i);
        });
        await resolve(page, "search", [
          { value: "a", label: "Admissions form" },
        ]);
        await shown(page.getByRole("option", { name: "Visit form" }));
        assert.equal(
          await page.getByRole("option", { name: "Admissions form" }).count(),
          0,
        );
        await page.evaluate(() => window.recipeTest.resetParent());
        await resolve(page, "search", all);
        assert.equal(await input.inputValue(), "");
      },
    );
    await scenario(
      "remote selector failure is retryable and trigger remains operable",
      async (page) => {
        await open(page, "combobox");
        await reject(page, "search");
        await shown(page.getByRole("button", { name: "Retry forms" }));
        assert.equal(await page.getByRole("combobox").isEnabled(), true);
        await page.getByRole("button", { name: "Retry forms" }).click();
        await resolve(page, "search", [{ value: "v", label: "Visit form" }]);
        await page.getByRole("combobox").click();
        await shown(page.getByRole("option", { name: "Visit form" }));
      },
    );
    await scenario(
      "unknown collection becomes Empty without table or pagination",
      async (page) => {
        await open(page, "table");
        assert.equal(await page.getByRole("table").count(), 0);
        assert.equal(await page.getByText("No usage yet").count(), 0);
        await resolve(page, "rows", { rows: [], total: 0 });
        await shown(page.getByText("No usage yet"));
        assert.equal(await page.getByRole("table").count(), 0);
        assert.equal(await page.getByText(/Found 0 results/).count(), 0);
      },
    );
    await scenario(
      "cached Empty persists during refresh and failed refresh offers retry",
      async (page) => {
        await open(page, "cached-empty");
        await shown(page.getByText("No usage yet"));
        assert.equal(await page.locator('[data-slot="skeleton"]').count(), 0);
        await reject(page, "rows");
        await shown(page.getByRole("button", { name: "Retry usage" }));
        await shown(page.getByText("No usage yet"));
        await page.getByRole("button", { name: "Retry usage" }).click();
        await resolve(page, "rows", { rows: [], total: 0 });
      },
    );
    await scenario(
      "known rows persist while remote sorting refreshes",
      async (page) => {
        await open(page, "table");
        const result = {
          rows: [
            {
              id: "a",
              name: "Workflow A",
              description: "A multiline description",
            },
          ],
          total: 1,
        };
        await resolve(page, "rows", result);
        await shown(page.getByText("Workflow A"));
        await page
          .getByRole("button", { name: /Sort.*Name|Name.*sort/i })
          .click();
        await shown(page.getByText("Workflow A"));
        await resolve(page, "rows", result);
        await shown(page.getByText("Workflow A"));
      },
    );
    await scenario("independent uploads, failure and retry", async (page) => {
      await open(page, "upload");
      const file = (name) => ({
        name,
        mimeType: "image/png",
        buffer: Buffer.from("image fixture"),
      });
      await page.locator("#recipe-upload-logo").setInputFiles(file("logo.png"));
      await page
        .locator("#recipe-upload-banner")
        .setInputFiles(file("banner.png"));
      const save = page.getByRole("button", { name: "Save images" });
      assert.equal(await save.isDisabled(), true);
      await page.evaluate(() =>
        window.recipeTest.resolve("upload", "file:logo"),
      );
      assert.equal(await save.isDisabled(), true);
      await reject(page, "upload");
      await page.waitForFunction(
        () => !document.querySelector('button[type="submit"]').disabled,
      );
      await shown(page.getByRole("button", { name: /retry/i }));
      await page.getByRole("button", { name: /retry/i }).click();
      assert.equal(await save.isDisabled(), true);
      await resolve(page, "upload", "file:banner");
      await save.click();
      assert.deepEqual(
        await page.evaluate(
          () => window.recipeTest.calls.find((c) => c.kind === "save").value,
        ),
        { logo: "file:logo", banner: "file:banner" },
      );
      await resolve(page, "save");
    });
    await scenario(
      "removed upload cannot reinsert its late result",
      async (page) => {
        await open(page, "upload");
        await page.locator("#recipe-upload-logo").setInputFiles({
          name: "logo.png",
          mimeType: "image/png",
          buffer: Buffer.from("fixture"),
        });
        await page.getByRole("button", { name: "Remove logo.png" }).click();
        await resolve(page, "upload", "abandoned:file");
        await page.getByRole("button", { name: "Save images" }).click();
        assert.deepEqual(
          await page.evaluate(
            () =>
              window.recipeTest.calls.find((call) => call.kind === "save")
                .value,
          ),
          {},
        );
        await resolve(page, "save");
      },
    );
    await scenario(
      "editor validates body and recovers from failed initial load",
      async (page) => {
        await open(page, "editor");
        await reject(page, "load");
        await shown(page.getByRole("button", { name: "Retry content" }));
        await page.getByRole("button", { name: "Retry content" }).click();
        await resolve(page, "load", "");
        await page.getByRole("button", { name: "Save changes" }).click();
        await shown(page.getByText("Enter body content."));
        assert.equal(await count(page, "save"), 0);
        assert.equal(
          await page
            .getByRole("textbox", { name: /^Body/ })
            .getAttribute("aria-invalid"),
          "true",
        );
      },
    );
    await scenario("desktop and dark-mode recipe geometry", async (page) => {
      await open(page, "editor");
      await resolve(page, "load", "Content");
      await page.evaluate(() => document.documentElement.classList.add("dark"));
      await page.setViewportSize({ width: 1024, height: 900 });
      await shown(page.getByRole("button", { name: "Actions", exact: true }));
      await mkdir(path.join(root, ".artifacts/recipes"), { recursive: true });
      await settle(page);
      await page.screenshot({
        path: path.join(root, ".artifacts/recipes/editor-dark.png"),
        fullPage: true,
      });
      await page.setViewportSize({ width: 800, height: 900 });
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth >= 1024),
      );
    });
  }
  if (onlyRTE) {
    await scenario(
      "real TinyMCE content roundtrip, popups and light/dark chrome",
      async (page) => {
        await open(page, "rte");
        await page.waitForFunction(
          () =>
            [...document.querySelectorAll("iframe")].some((f) =>
              f.contentDocument?.querySelector(".mce-tinymce"),
            ),
          null,
          { timeout: 30000 },
        );
        const outer = page.frameLocator("iframe").first();
        const content = outer.frameLocator("iframe").first();
        await shown(content.locator("body"));
        assert.ok(
          (await content.locator("body").textContent()).includes(
            "Nested content",
          ),
        );
        await content.locator("body").click();
        await page.keyboard.press("ControlOrMeta+End");
        await page.keyboard.type(" Edited");
        await page
          .getByRole("button", { name: "Save and reload editor" })
          .click();
        await page.waitForFunction(() =>
          localStorage.getItem("roundtrip")?.includes("Edited"),
        );
        const saved = await page.evaluate(() =>
          localStorage.getItem("roundtrip"),
        );
        for (const text of [
          "{{contact.name}}",
          "<style",
          "Nested content",
          "Edited",
        ])
          assert.ok(saved.includes(text), text);

        await shown(content.locator("body"));
        for (const text of ["Edited", "café", "😀"])
          assert.ok(
            (await content.locator("body").textContent()).includes(text),
            text,
          );
        const font = outer.getByRole("button", { name: /Font Family/i });
        await font.click();
        const menu = outer.locator(".mce-floatpanel:visible").first();
        await shown(menu);
        const triggerBox = await font.boundingBox(),
          menuBox = await menu.boundingBox();
        assert.ok(
          menuBox.y >= triggerBox.y + triggerBox.height - 2,
          "Menu must not overlap trigger",
        );
        await page.keyboard.press("Escape");
        await mkdir(path.join(root, ".artifacts/recipes"), { recursive: true });
        await settle(page);
        await page.screenshot({
          path: path.join(root, ".artifacts/recipes/rte-light.png"),
        });
        await page.evaluate(() =>
          document.documentElement.classList.add("dark"),
        );
        await settle(page);
        await page.screenshot({
          path: path.join(root, ".artifacts/recipes/rte-dark.png"),
        });
        await page.getByRole("button", { name: "Toggle editor lock" }).click();
        await page.waitForFunction(() => {
          const outer = [...document.querySelectorAll("iframe")].find((f) =>
            f.contentDocument?.querySelector(".mce-tinymce"),
          );
          return (
            outer?.contentDocument?.querySelector("iframe")?.contentDocument
              ?.body.contentEditable === "false"
          );
        });
      },
    );
    await scenario(
      "runtime failure and retry retain content and geometry",
      async (page) => {
        let fail = true;
        await page.route("**/tinymce.min.js", (route) =>
          fail ? route.abort() : route.continue(),
        );
        await open(page, "rte");
        await shown(page.getByRole("button", { name: "Try again" }));
        const region = page.locator('[data-slot="rich-text-editor"]');
        const before = await region.boundingBox();
        fail = false;
        await page.getByRole("button", { name: "Try again" }).click();
        const body = page
          .frameLocator("iframe")
          .first()
          .frameLocator("iframe")
          .first()
          .locator("body");
        await shown(body);
        assert.ok((await body.textContent()).includes("Nested content"));
        assert.deepEqual(await region.boundingBox(), before);
      },
    );
    await scenario(
      "multiple editors isolate content and clean up together",
      async (page) => {
        await open(page, "rte-multiple");
        const first = page
          .getByTestId("first")
          .frameLocator("iframe")
          .first()
          .frameLocator("iframe")
          .first()
          .locator("body");
        const second = page
          .getByTestId("second")
          .frameLocator("iframe")
          .first()
          .frameLocator("iframe")
          .first()
          .locator("body");
        await shown(first);
        await shown(second);
        await page
          .getByTestId("first")
          .getByRole("button", { name: "Replace content" })
          .click();
        await shown(first.getByText("Replacement content"));
        assert.ok((await second.textContent()).includes("Nested content"));
        await page.evaluate(() => window.recipeTest.unmount());
        await page.waitForFunction(
          () => document.querySelectorAll("iframe").length === 0,
        );
      },
    );
    await scenario(
      "controlled replacement during startup uses the newest value",
      async (page) => {
        let release;
        const held = new Promise((resolve) => {
          release = resolve;
        });
        await page.route("**/tinymce.min.js", async (route) => {
          await held;
          await route.continue();
        });
        await open(page, "rte");
        await page.getByRole("button", { name: "Replace content" }).click();
        release();
        const body = page
          .frameLocator("iframe")
          .first()
          .frameLocator("iframe")
          .first()
          .locator("body");
        await shown(body.getByText("Replacement content"));
        assert.equal(
          (await body.textContent()).includes("Nested content"),
          false,
        );
      },
    );
  }
  assert.deepEqual(errors, [], "Browser exceptions");
  console.log(`${passed} browser scenarios passed.`);
} finally {
  await browser.close();
  await server.close();
}
