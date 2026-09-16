import React from "react";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  DataTableTextCell,
  DataTableMultiLineCell,
} from "@geckolabs/elements/components/data-table";
import { TooltipProvider } from "@geckolabs/elements/components/tooltip";
let available;
let callbacks;
beforeEach(() => {
  available = 100;
  callbacks = new Set();
  vi.stubGlobal("PointerEvent", MouseEvent);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {
        callbacks.add(this.callback);
      }
      disconnect() {
        callbacks.delete(this.callback);
      }
    },
  );
  Element.prototype.getAnimations = () => [];
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    () => available,
  );
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function () {
      return (this.textContent || "").length * 8;
    },
  );
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
it("reveals a clipped link on keyboard focus without adding a duplicate tab stop and closes on Escape", async () => {
  const value = "A very long template name that cannot fit in its column";
  const { container } = render(
    <TooltipProvider delay={0}>
      <DataTableTextCell>
        <a href="#template">{value}</a>
      </DataTableTextCell>
    </TooltipProvider>,
  );
  const line = container.querySelector('[data-slot="data-table-text-cell"]');
  expect(line.getAttribute("tabindex")).toBeNull();
  act(() => container.querySelector("a").focus());
  await vi.waitFor(() =>
    expect(
      document.querySelector('[data-slot="tooltip-content"]')?.textContent,
    ).toBe(value),
  );
  fireEvent.keyDown(document.activeElement, { key: "Escape" });
  await vi.waitFor(() =>
    expect(document.querySelector('[data-slot="tooltip-content"]')).toBeNull(),
  );
}, 40000);
it("makes only clipped multiline values focusable and recalculates after resizing", () => {
  const { container } = render(
    <TooltipProvider>
      <DataTableMultiLineCell
        primary="Alexandra Montgomery"
        secondary="15 Sep"
      />
    </TooltipProvider>,
  );
  const lines = container.querySelectorAll(
    '[data-slot="data-table-text-cell"]',
  );
  expect(lines[0].tabIndex).toBe(0);
  expect(lines[1].getAttribute("tabindex")).toBeNull();
  act(() => {
    available = 400;
    [...callbacks].forEach((callback) => callback([]));
  });
  expect(lines[0].getAttribute("tabindex")).toBeNull();
});
