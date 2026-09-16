import React, { useState } from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, it, expect, vi } from "vitest";
import {
  DataTable,
  DataTableColumnHeader,
} from "@geckolabs/elements/components/data-table";
import { TooltipProvider } from "@geckolabs/elements/components/tooltip";
const rows = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 16),
  name: `Template ${i + 16}`,
}));
const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
];
let query;
function Remote({ loading = false, updating = false, error, onRetry }) {
  const [state, setState] = useState({
    globalFilter: "",
    sorting: [{ id: "name", desc: false }],
    columnFilters: [],
    pagination: { pageIndex: 1, pageSize: 15 },
  });
  const [selection, setSelection] = useState({});
  query = state;
  return (
    <TooltipProvider>
      <DataTable
        aria-label="Remote templates"
        columns={columns}
        data={rows}
        sorting
        pagination
        remote={{ state, onStateChange: setState, rowCount: 70 }}
        selection={{ state: selection, onChange: setSelection }}
        getRowId={(row) => row.id}
        loading={loading}
        updating={updating}
        error={error}
        onRetry={onRetry}
        toolbar={{ search: { placeholder: "Search templates" } }}
        selectActions={[{ id: "delete", label: "Delete" }]}
        onSelectAction={() => {}}
        selectActionsDisplay="floating"
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
  vi.unstubAllGlobals();
});
it("uses the server total and renders the supplied page without slicing it again", () => {
  render(<Remote />);
  expect(screen.getAllByRole("row")).toHaveLength(16);
  expect(screen.getByText("70")).toBeTruthy();
  expect(
    screen.getByRole("combobox", { name: "Select page" }).textContent,
  ).toContain("Page 2 of 5");
  fireEvent.click(screen.getByRole("button", { name: "Go to next page" }));
  expect(query.pagination).toEqual({ pageIndex: 2, pageSize: 15 });
});
it("reports search and sorting atomically with a first-page reset, leaving server rows untouched", () => {
  render(<Remote />);
  fireEvent.change(screen.getByPlaceholderText("Search templates"), {
    target: { value: "no local match" },
  });
  expect(query.globalFilter).toBe("no local match");
  expect(query.pagination.pageIndex).toBe(0);
  expect(screen.getAllByRole("row")).toHaveLength(16);
  fireEvent.click(screen.getByRole("button", { name: "Sort Name descending" }));
  expect(query.sorting).toEqual([{ id: "name", desc: true }]);
  expect(screen.getAllByRole("row")[1].textContent).toContain("Template 16");
});
it("selects only loaded remote rows and hides unsafe actions while replacing rows with skeletons or an error", () => {
  const retry = vi.fn();
  const { rerender } = render(<Remote onRetry={retry} />);
  fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }));
  fireEvent.click(screen.getByRole("button", { name: "Select all" }));
  expect(
    within(
      screen.getByRole("group", { name: "Selection actions" }),
    ).getAllByText("15 items selected"),
  ).toBeTruthy();
  expect(screen.getByRole("button", { name: "Select all" }).disabled).toBe(
    true,
  );
  rerender(<Remote loading onRetry={retry} />);
  expect(screen.getByRole("columnheader", { name: /^Name/ })).toBeTruthy();
  expect(screen.getByPlaceholderText("Search templates")).toBeTruthy();
  expect(screen.queryByText("Template 16")).toBeNull();
  expect(screen.queryByRole("group", { name: "Selection actions" })).toBeNull();
  expect(screen.getByRole("table").getAttribute("aria-busy")).toBe("true");
  expect(
    screen
      .getByRole("checkbox", { name: "Select all visible rows" })
      .getAttribute("aria-disabled"),
  ).toBe("true");
  rerender(<Remote error="Request failed" onRetry={retry} />);
  expect(screen.getByRole("alert").textContent).toContain("Request failed");
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));
  expect(retry).toHaveBeenCalledOnce();
  expect(
    within(screen.getByRole("table")).queryByText("Template 16"),
  ).toBeNull();
});

it("keeps rows visible without loading announcements while queries update", () => {
  const { rerender } = render(<Remote />);
  fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }));
  rerender(<Remote updating />);
  expect(screen.getByText("Template 16")).toBeTruthy();
  expect(screen.getByRole("table").getAttribute("aria-busy")).toBe("false");
  expect(screen.queryByText("Loading rows…")).toBeNull();
  expect(screen.queryByRole("group", { name: "Selection actions" })).toBeNull();
  expect(
    screen
      .getByRole("checkbox", { name: "Select row 1" })
      .getAttribute("aria-disabled"),
  ).toBe("true");
});
