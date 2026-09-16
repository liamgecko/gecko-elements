import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  DataTable,
  DataTableColumnHeader,
} from "@geckolabs/elements/components/data-table";
import { TooltipProvider } from "@geckolabs/elements/components/tooltip";
import { resolveColumnWidths } from "@geckolabs/elements/components/data-table/data-table-layout";

let width;
let observers;
beforeEach(() => {
  width = 800;
  observers = new Set();
  vi.stubGlobal("PointerEvent", MouseEvent);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe(element) {
        if (element.dataset.slot === "table-container")
          observers.add(this.callback);
      }
      disconnect() {
        observers.delete(this.callback);
      }
    },
  );
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    function () {
      return this.dataset.slot === "table-container" ? width : 0;
    },
  );
  Element.prototype.getAnimations = () => [];
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const rows = Array.from({ length: 17 }, (_, i) => ({
  id: String(i),
  name:
    i === 16
      ? "A very long template name with considerably more content than the first page"
      : "Template " + i,
  type: "Email",
  subject: "Your next steps",
}));
const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    minSize: 180,
    meta: { grow: 2 },
  },
  { accessorKey: "type", header: "Type", size: 136 },
  {
    accessorKey: "subject",
    header: "Subject",
    minSize: 220,
    meta: { grow: 3 },
  },
];
function Example(props) {
  return (
    <TooltipProvider>
      <DataTable
        aria-label="Templates"
        columns={columns}
        data={rows}
        pagination
        sorting
        getRowId={(row) => row.id}
        toolbar={{
          search: { placeholder: "Search templates" },
          columnToggle: true,
        }}
        rowActions={[{ id: "details", label: "Details" }]}
        onRowAction={() => {}}
        selectActions={[{ id: "export", label: "Export" }]}
        onSelectAction={() => {}}
        {...props}
      />
    </TooltipProvider>
  );
}
const widths = () =>
  Object.fromEntries(
    [...screen.getByRole("table").querySelectorAll("col")].map((column) => [
      column.dataset.columnId,
      Number.parseFloat(column.style.width),
    ]),
  );
it("keeps ordinary tables within their container and widths stable across page, query, loading, error and empty states", () => {
  const { rerender } = render(<Example />);
  const initial = widths();
  expect(Object.values(initial).reduce((a, b) => a + b, 0)).toBe(800);
  expect(initial.select).toBe(40);
  expect(initial.actions).toBe(48);
  expect(initial.type).toBe(136);
  expect(screen.queryByRole("region", { name: "Templates" })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Go to next page" }));
  expect(screen.getByText(/A very long template name/)).toBeTruthy();
  expect(widths()).toEqual(initial);
  fireEvent.change(screen.getByPlaceholderText("Search templates"), {
    target: { value: "no match" },
  });
  expect(screen.getByText("No results found")).toBeTruthy();
  expect(widths()).toEqual(initial);
  rerender(<Example loading />);
  expect(widths()).toEqual(initial);
  rerender(<Example error="Unavailable" />);
  expect(widths()).toEqual(initial);
  rerender(<Example data={[]} />);
  expect(widths()).toEqual(initial);
});

it("preserves minimum widths in narrow containers and returns to a fitted table when space is restored", () => {
  render(<Example />);
  act(() => {
    width = 400;
    [...observers].forEach((callback) => callback([]));
  });
  expect(screen.getByRole("region", { name: "Templates" }).tabIndex).toBe(0);
  expect(widths()).toEqual({
    select: 40,
    name: 180,
    type: 136,
    subject: 220,
    actions: 48,
  });
  act(() => {
    width = 800;
    [...observers].forEach((callback) => callback([]));
  });
  expect(screen.queryByRole("region", { name: "Templates" })).toBeNull();
  expect(Object.values(widths()).reduce((sum, value) => sum + value, 0)).toBe(
    800,
  );
});

it("redistributes spare width when a flexible column reaches its maximum and retains minimum widths in narrow containers", () => {
  const definitions = [
    { id: "id", size: 40, minSize: 40, maxSize: 40, grow: 0 },
    { id: "name", size: 160, minSize: 120, maxSize: 200, grow: 1 },
    { id: "subject", size: 160, minSize: 120, maxSize: 1000, grow: 1 },
  ];
  expect(Object.fromEntries(resolveColumnWidths(definitions, 800))).toEqual({
    id: 40,
    name: 200,
    subject: 560,
  });
  expect(Object.fromEntries(resolveColumnWidths(definitions, 200))).toEqual({
    id: 40,
    name: 120,
    subject: 120,
  });
});
