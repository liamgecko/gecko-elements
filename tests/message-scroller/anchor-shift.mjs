import assert from "node:assert/strict";
import { chromium } from "playwright";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const server = process.env.DOCS_URL
  ? null
  : await createServer({
      root: fileURLToPath(new URL("../../apps/docs", import.meta.url)),
      server: { host: "127.0.0.1", port: 0 },
    });
await server?.listen();
const url = process.env.DOCS_URL ?? server.resolvedUrls.local[0];
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {},
);
try {
  for (const reducedMotion of ["no-preference", "reduce"]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1100 },
      reducedMotion,
    });
    await page.route("https://fonts.googleapis.com/**", (route) =>
      route.fulfill({ body: "", contentType: "text/css" }),
    );
    await page.goto(new URL("components/message-scroller", url).href);
    await page.evaluate(() => document.fonts.ready);
    const card = page
      .locator('[data-slot="card"]')
      .filter({ has: page.getByText("Anchoring Turns", { exact: true }) });
    await card.scrollIntoViewIfNeeded();
    for (const role of ["user", "assistant"]) {
      await card
        .getByRole("button", { name: `Anchor ${role} messages`, exact: true })
        .click();
      const reset = card.getByRole("button", { name: "Reset anchored turns" });
      if (await reset.isEnabled()) await reset.click();
      for (let index = 0; index < 6; index++) {
        const isNewAnchor = (index % 2 === 0 ? "user" : "assistant") === role;
        // Capture every frame, including the first paint following append. End
        // positions alone would miss a transient correction during animation.
        await card.evaluate((element) => {
          const viewport = element.querySelector(
            '[data-slot="message-scroller-viewport"]',
          );
          const items = [...element.querySelectorAll("[data-message-id]")];
          const samples = { maxDrift: 0, frames: 0, stop: false };
          window.anchorSamples = samples;
          if (!viewport) return;
          const top = (item) =>
            item.getBoundingClientRect().top -
            viewport.getBoundingClientRect().top;
          const positions = items.map(top);
          function sample() {
            if (samples.stop) return;
            samples.frames++;
            items.forEach((item, i) => {
              samples.maxDrift = Math.max(
                samples.maxDrift,
                Math.abs(top(item) - positions[i]),
              );
            });
            requestAnimationFrame(sample);
          }
          requestAnimationFrame(sample);
        });
        await card
          .getByRole("button", { name: "Send Message", exact: true })
          .click();
        await page.waitForTimeout(400);
        const result = await page.evaluate(() => {
          window.anchorSamples.stop = true;
          return window.anchorSamples;
        });
        if (index > 0 && !isNewAnchor) {
          assert(result.frames > 0);
          assert(
            result.maxDrift < 0.5,
            `${role}/${reducedMotion}, append ${index + 1}: existing messages shifted ${result.maxDrift}px`,
          );
          console.log(
            `PASS ${role}/${reducedMotion}, reply ${index + 1}: ${result.maxDrift}px drift`,
          );
        }
      }
      const growthDrift = await card.evaluate(async (element) => {
        const viewport = element.querySelector(
          '[data-slot="message-scroller-viewport"]',
        );
        const items = [...element.querySelectorAll("[data-message-id]")];
        const top = (item) =>
          item.getBoundingClientRect().top -
          viewport.getBoundingClientRect().top;
        const positions = items.map(top);
        let maxDrift = 0;
        // Grow the last reply in chunks, as streaming text or reserved media
        // resolving would. Its existing anchor must stay in the same place.
        const extra = document.createElement("div");
        items.at(-1).append(extra);
        for (let frame = 0; frame < 30; frame++) {
          extra.style.height = `${(frame + 1) * 4}px`;
          await new Promise(requestAnimationFrame);
          items.forEach((item, index) => {
            maxDrift = Math.max(
              maxDrift,
              Math.abs(top(item) - positions[index]),
            );
          });
        }
        return maxDrift;
      });
      assert(
        growthDrift < 0.5,
        `${role}/${reducedMotion}: reply growth shifted messages ${growthDrift}px`,
      );
      console.log(
        `PASS ${role}/${reducedMotion}, reply growth: ${growthDrift}px drift`,
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
  await server?.close();
}
