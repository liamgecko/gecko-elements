import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { beforeEach, afterEach, it, expect, vi } from "vitest";
import {
  DataTable,
  DataTableMultiLineCell,
} from "@geckolabs/elements/components/data-table";
import { TooltipProvider } from "@geckolabs/elements/components/tooltip";

const data = [
  {
    id: "1",
    name: "Welcome",
    subject: "A long subject with enough detail to overflow",
    href: "/templates/1",
  },
  { id: "2", name: "Unavailable", subject: "—" },
];
const columns = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "subject",
    header: "Subject",
    meta: { cellLayout: "content" },
    cell: ({ row }) => (
      <DataTableMultiLineCell
        primary={row.original.subject}
        secondary="15 September 2026"
      />
    ),
  },
  {
    id: "control",
    header: "Control",
    meta: { cellLayout: "content" },
    cell: () => <button>Independent action</button>,
  },
  { id: "other", header: "Other", cell: () => <a href="/help">Help</a> },
];
const rowLink = {
  getHref: (row) => row.href,
  columnIds: ["name", "subject", "select", "actions", "expand"],
  primaryColumnId: "name",
};
function Example(props) {
  return (
    <TooltipProvider delay={0}>
      <DataTable
        aria-label="Templates"
        columns={columns}
        data={data}
        rowLink={rowLink}
        rowSelection
        getRowId={(row) => row.id}
        {...props}
      />
    </TooltipProvider>
  );
}
beforeEach(() => {
  vi.stubGlobal("PointerEvent", MouseEvent);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  Element.prototype.getAnimations = () => [];
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
it("renders real cell links with a single keyboard destination and independent controls", () => {
  const { container, getAllByRole } = render(<Example />);
  const links = [
    ...container.querySelectorAll('[data-slot="data-table-cell-link"]'),
  ];
  expect(
    links.map((link) => [
      link.tagName,
      link.getAttribute("href"),
      link.tabIndex,
    ]),
  ).toEqual([
    ["A", "/templates/1", 0],
    ["A", "/templates/1", -1],
  ]);
  expect(links[1].getAttribute("aria-describedby")).toContain(links[0].id);
  expect(
    container.querySelector('a a, a button, a input, a [role="checkbox"]'),
  ).toBeNull();
  expect(
    container.querySelectorAll('[data-slot="data-table-cell-link"] [tabindex]')
      .length,
  ).toBe(0);
  const checkbox = getAllByRole("checkbox")[1];
  fireEvent.click(checkbox);
  expect(checkbox.getAttribute("aria-checked")).toBe("true");
  expect(
    getAllByRole("button", { name: "Independent action" })[0].closest("a"),
  ).toBeNull();
  expect(getAllByRole("link", { name: "Help" })[0].getAttribute("href")).toBe(
    "/help",
  );
  for (const event of [
    new MouseEvent("contextmenu", { bubbles: true, cancelable: true }),
    new MouseEvent("auxclick", { button: 1, bubbles: true, cancelable: true }),
  ]) {
    links[1].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  }
});
it("keeps one keyboard link when the primary column is hidden and omits links during loading", () => {
  const { container, rerender } = render(
    <Example initialState={{ columnVisibility: { name: false } }} />,
  );
  expect(
    container.querySelector('[data-slot="data-table-cell-link"]').tabIndex,
  ).toBe(0);
  rerender(<Example loading />);
  expect(
    container.querySelector('[data-slot="data-table-cell-link"]'),
  ).toBeNull();
});
it("shows one combined tooltip for clipped multiline cell content on link focus", async () => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function () {
      return (this.textContent || "").length * 8;
    },
  );
  const { container } = render(<Example />);
  const link = container.querySelectorAll(
    '[data-slot="data-table-cell-link"]',
  )[1];
  act(() => link.focus());
  await vi.waitFor(() =>
    expect(
      document.querySelector('[data-slot="tooltip-content"]')?.textContent,
    ).toBe(data[0].subject + "\n15 September 2026"),
  );
  expect(
    document.querySelectorAll('[data-slot="tooltip-content"]').length,
  ).toBe(1);
  fireEvent.keyDown(link, { key: "Escape" });
  await vi.waitFor(() =>
    expect(document.querySelector('[data-slot="tooltip-content"]')).toBeNull(),
  );
}, 40000);
