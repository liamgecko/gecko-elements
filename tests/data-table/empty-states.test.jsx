import React from "react";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { DataTable } from "@geckolabs/elements/components/data-table";
import { TooltipProvider } from "@geckolabs/elements/components/tooltip";

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
  vi.unstubAllGlobals();
});
const columns = [{ accessorKey: "name", header: "Name" }];
function Example({ data = [], ...props }) {
  return (
    <TooltipProvider>
      <DataTable
        aria-label="Records"
        columns={columns}
        data={data}
        pagination
        toolbar={{ search: { placeholder: "Search records" } }}
        {...props}
      />
    </TooltipProvider>
  );
}
it("renders only Empty for a confirmed empty collection", () => {
  render(<Example />);
  expect(screen.getByText("No items yet")).toBeTruthy();
  expect(screen.queryByRole("table")).toBeNull();
  expect(screen.queryByPlaceholderText("Search records")).toBeNull();
  expect(screen.queryByText(/per page/)).toBeNull();
});
it("keeps the table and search controls when a search has no matches", () => {
  render(<Example data={[{ name: "Alpha" }]} />);
  fireEvent.change(screen.getByPlaceholderText("Search records"), {
    target: { value: "Missing" },
  });
  expect(
    screen.getByRole("table").contains(screen.getByText("No results found")),
  ).toBe(true);
  fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: "Clear search" }));
  expect(screen.getByText("Alpha")).toBeTruthy();
});
it("keeps a remote filtered zero result inside the table", () => {
  render(
    <Example
      remote={{
        state: {
          globalFilter: "",
          columnFilters: [{ id: "name", value: "Missing" }],
          sorting: [],
          pagination: { pageIndex: 0, pageSize: 15 },
        },
        onStateChange() {},
        rowCount: 0,
      }}
    />,
  );
  expect(
    screen.getByRole("table").contains(screen.getByText("No results found")),
  ).toBe(true);
  expect(screen.getByRole("button", { name: "Clear filters" })).toBeTruthy();
});
it("does not render no-data success while loading or after failure", () => {
  const { rerender } = render(<Example loading />);
  expect(screen.queryByText("No items yet")).toBeNull();
  rerender(<Example error="Could not load records" />);
  expect(screen.queryByText("No items yet")).toBeNull();
  expect(screen.getByText("Could not load records")).toBeTruthy();
});
