import React from "react";
import {
  act,
  waitFor,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { DataTable } from "@geckolabs/elements/components/data-table";
import { TooltipProvider } from "@geckolabs/elements/components/tooltip";

const columns = [{ accessorKey: "name", header: "Name" }];
const data = Array.from({ length: 18 }, (_, index) => ({
  id: `row-${index + 1}`,
  name: `${index < 3 ? "Match" : "Other"} ${index + 1}`,
}));
const actions = [
  { id: "delete", label: "Delete", variant: "destructive" },
  { id: "export", label: "Export" },
  { id: "archive", label: "Archive" },
];
const onAction = vi.fn();
function Example(props) {
  return (
    <TooltipProvider>
      <DataTable
        aria-label="Templates"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        pagination
        selectActions={actions}
        onSelectAction={onAction}
        selectActionsDisplay="floating"
        {...props}
      />
    </TooltipProvider>
  );
}
beforeEach(() => {
  onAction.mockReset();
  // jsdom 24 does not implement the PointerEvent constructor used by Checkbox.
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
  vi.restoreAllMocks();
});
const bar = () => screen.getByRole("group", { name: "Selection actions" });
const selectRow = (index) =>
  fireEvent.click(
    screen.getByRole("checkbox", { name: `Select row ${index}` }),
  );

it("stays hidden until selection and does not steal focus when shown", () => {
  render(<Example />);
  expect(screen.queryByRole("group", { name: "Selection actions" })).toBeNull();
  const row = screen.getByRole("checkbox", { name: "Select row 1" });
  row.focus();
  fireEvent.click(row);
  expect(within(bar()).getAllByText("1 item selected")).toBeTruthy();
  expect(document.activeElement).toBe(row);
  expect(
    screen.queryByRole("button", { name: "Actions on selected" }),
  ).toBeNull();
});

it("selects all filtered rows across pages and passes the complete selection to actions", () => {
  render(<Example />);
  selectRow(1);
  fireEvent.click(within(bar()).getByRole("button", { name: "Select all" }));
  expect(within(bar()).getAllByText("18 items selected")).toBeTruthy();
  expect(
    within(bar()).getByRole("button", { name: "Select all" }).disabled,
  ).toBe(true);
  fireEvent.click(within(bar()).getByRole("button", { name: "Export" }));
  expect(onAction.mock.calls[0][0]).toBe("export");
  expect(
    onAction.mock.calls[0][1].selectedRows.map((row) => row.original.id),
  ).toEqual(data.map((row) => row.id));
  expect(within(bar()).getAllByText("18 items selected")).toBeTruthy();
});

it("keeps the header checkbox scoped to the current page", () => {
  render(<Example />);
  fireEvent.click(
    screen.getByRole("checkbox", { name: "Select all visible rows" }),
  );
  expect(within(bar()).getAllByText("15 items selected")).toBeTruthy();
});

it("select all respects filters and retains previously selected hidden rows", () => {
  render(<Example toolbar={{ search: { placeholder: "Search templates" } }} />);
  selectRow(5);
  fireEvent.change(screen.getByPlaceholderText("Search templates"), {
    target: { value: "Match" },
  });
  fireEvent.click(within(bar()).getByRole("button", { name: "Select all" }));
  expect(within(bar()).getAllByText("4 items selected")).toBeTruthy();
  fireEvent.click(within(bar()).getByRole("button", { name: "Delete" }));
  expect(
    onAction.mock.calls[0][1].selectedRows.map((row) => row.original.id),
  ).toEqual(["row-1", "row-2", "row-3", "row-5"]);
});

it("clears every selection including initial and hidden rows, restoring table focus", () => {
  render(
    <Example
      initialState={{ rowSelection: { "row-1": true, "row-18": true } }}
    />,
  );
  const clear = within(bar()).getByRole("button", {
    name: "Deselect all items",
  });
  clear.focus();
  fireEvent.click(clear);
  expect(screen.queryByRole("group", { name: "Selection actions" })).toBeNull();
  const header = screen.getByRole("checkbox", {
    name: "Select all visible rows",
  });
  expect(document.activeElement).toBe(header);
  expect(header.getAttribute("aria-checked")).toBe("false");
  selectRow(2);
  expect(within(bar()).getAllByText("1 item selected")).toBeTruthy();
});

it("orders destructive actions last, separated from ordinary actions", () => {
  render(<Example />);
  selectRow(1);
  expect(
    within(bar())
      .getAllByRole("button")
      .map((button) => button.textContent),
  ).toEqual(["", "Select all", "Export", "Archive", "Delete"]);
  expect(within(bar()).getAllByRole("separator")).toHaveLength(2);
  fireEvent.click(within(bar()).getByRole("button", { name: "Delete" }));
  expect(onAction.mock.calls[0][0]).toBe("delete");
});

it("retains the last selection during the exit fade but immediately disables its controls", async () => {
  render(<Example />);
  selectRow(1);
  const surface = bar();
  await waitFor(() => expect(Number(surface.style.opacity)).toBe(1));
  fireEvent.click(
    within(surface).getByRole("button", { name: "Deselect all items" }),
  );
  expect(surface.isConnected).toBe(true);
  expect(surface.hasAttribute("inert")).toBe(true);
  expect(surface.getAttribute("aria-hidden")).toBe("true");
  expect(surface.textContent).toContain("1 item selected");
  fireEvent.click(
    within(surface).getByText("Export", {
      selector: "button[data-selection-action]",
    }),
  );
  expect(onAction).not.toHaveBeenCalled();
  await waitFor(() => expect(surface.isConnected).toBe(false));
});

it("supports translated count and control labels", () => {
  render(
    <Example
      selectActionsLabels={{
        label: "Acciones de selección",
        clearSelection: "Deseleccionar todo",
        selectAll: "Seleccionar todo",
        selectedCount: (count) =>
          count === 1
            ? "1 plantilla seleccionada"
            : `${count} plantillas seleccionadas`,
      }}
    />,
  );
  selectRow(1);
  const group = screen.getByRole("group", { name: "Acciones de selección" });
  expect(within(group).getAllByText("1 plantilla seleccionada")).toBeTruthy();
  fireEvent.click(
    within(group).getByRole("button", { name: "Seleccionar todo" }),
  );
  expect(
    within(group).getAllByText("18 plantillas seleccionadas"),
  ).toBeTruthy();
  fireEvent.click(
    within(group).getByRole("button", { name: "Deseleccionar todo" }),
  );
  expect(
    screen.queryByRole("group", { name: "Acciones de selección" }),
  ).toBeNull();
});

it("remains compatible with the default button-trigger presentation", () => {
  render(<Example selectActionsDisplay={undefined} />);
  selectRow(1);
  expect(
    screen.getByRole("button", { name: "Actions on selected" }),
  ).toBeTruthy();
  expect(screen.queryByRole("group", { name: "Selection actions" })).toBeNull();
});

it("drops rows removed from the loaded dataset from the count and callbacks", () => {
  const { rerender } = render(<Example />);
  selectRow(1);
  selectRow(2);
  rerender(<Example data={data.slice(1)} />);
  expect(within(bar()).getAllByText("1 item selected")).toBeTruthy();
  fireEvent.click(within(bar()).getByRole("button", { name: "Export" }));
  expect(
    onAction.mock.calls[0][1].selectedRows.map((row) => row.original.id),
  ).toEqual(["row-2"]);
});

it("moves excess actions into a menu as the container shrinks and restores them when it grows", async () => {
  let width = 800;
  const observers = new Set();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback) {
        this.callback = callback;
      }
      observe(element) {
        if (element.dataset.slot === "data-table-root")
          observers.add(this.callback);
      }
      disconnect() {
        observers.delete(this.callback);
      }
    },
  );
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    function () {
      return this.dataset.slot === "data-table-root" ? width : 0;
    },
  );
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(
    function () {
      return (
        { controls: 280, overflow: 40, export: 100, archive: 100, delete: 70 }[
          this.dataset.selectionMeasure
        ] ?? 0
      );
    },
  );
  const resize = (next) =>
    act(() => {
      width = next;
      [...observers].forEach((callback) => callback([]));
    });
  render(<Example data={data.slice(0, 2)} />);
  selectRow(1);
  expect(
    within(bar()).queryByRole("button", { name: "More actions" }),
  ).toBeNull();
  within(bar()).getByRole("button", { name: "Archive" }).focus();
  resize(570);
  expect(within(bar()).getByRole("button", { name: "Export" })).toBeTruthy();
  expect(within(bar()).getByRole("button", { name: "Delete" })).toBeTruthy();
  expect(within(bar()).queryByRole("button", { name: "Archive" })).toBeNull();
  const more = within(bar()).getByRole("button", { name: "More actions" });
  await waitFor(() => expect(document.activeElement).toBe(more));
  fireEvent.click(more);
  fireEvent.click(await screen.findByRole("menuitem", { name: "Archive" }));
  expect(onAction.mock.calls[0][0]).toBe("archive");
  expect(onAction.mock.calls[0][1].selectedRows.map((row) => row.id)).toEqual([
    "row-1",
  ]);
  resize(380);
  expect(within(bar()).queryByRole("button", { name: "Delete" })).toBeNull();
  fireEvent.click(within(bar()).getByRole("button", { name: "More actions" }));
  await screen.findByRole("menuitem", { name: "Delete" });
  expect(
    screen.getAllByRole("menuitem").map((item) => item.textContent),
  ).toEqual(["Export", "Archive", "Delete"]);
  resize(800);
  await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  expect(
    within(bar()).queryByRole("button", { name: "More actions" }),
  ).toBeNull();
  expect(within(bar()).getByRole("button", { name: "Archive" })).toBeTruthy();
  await waitFor(() =>
    expect(document.activeElement).toBe(
      within(bar()).getByRole("button", { name: "Export" }),
    ),
  );
}, 30000);
