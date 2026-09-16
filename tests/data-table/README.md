# Data table selection tests

Run `npm run test:data-table` from the repository root. The runner builds and
packs Elements, installs isolated React 18.3.1 and React 19 consumers in temporary
directories, and exercises the public DataTable API with Vitest and jsdom.
Successful runs clean up; failed runs retain their fixtures for inspection.

Coverage includes the default button trigger, floating visibility and focus,
page selection versus all filtered rows, hidden selections, translated labels,
action ordering and callbacks, and removal of selected records from the data.
Visual placement, scrolling, wrapping and themes are checked in the docs example;
jsdom does not validate layout or contrast.

Row-link checks cover real hrefs, independent controls, one primary keyboard link, hidden-primary fallback, loading rows, native context-menu/middle-click events and clipped multiline tooltips. Full-cell hit areas and text selection require the browser docs example.

Scroll regression: render a tall DataTable inside a viewport-height SidebarInset
with `overflow-auto`. With 15 and 50 rows, the document must remain viewport
height, while SidebarInset scrolls vertically. Repeat with floating selection
actions and a horizontally overflowing table; the table container must scroll
only horizontally. Hidden loading/selection status text must not create a
second document scrollbar. This requires browser geometry checks, not jsdom.
