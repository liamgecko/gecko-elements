import * as React from "react";
import { createRoot } from "react-dom/client";
import "@geckolabs/elements/globals.css";
import "./exports";
import { Button } from "@geckolabs/elements/components/button";
import { Input } from "@geckolabs/elements/components/input";
import { Bar, BarChart } from "@geckolabs/elements/charts";
import { ChartContainer } from "@geckolabs/elements/components/chart";
import {
  Table,
  TableBody,
  TableDetailRow,
} from "@geckolabs/elements/components/table";
import {
  ReplyBox,
  ReplyBoxFooter,
} from "@geckolabs/elements/components/reply-box";
import { Textarea } from "@geckolabs/elements/components/textarea";
import { Search } from "@geckolabs/elements/components/search";
import { FileInput } from "@geckolabs/elements/components/file-input";
import { Checkbox } from "@geckolabs/elements/components/checkbox";
import { Switch } from "@geckolabs/elements/components/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@geckolabs/elements/components/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@geckolabs/elements/components/select";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from "@geckolabs/elements/components/combobox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@geckolabs/elements/components/dropdown-menu";
import { Toaster, toast } from "@geckolabs/elements/components/toast";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "@geckolabs/elements/components/message-scroller";

declare global {
  interface Window {
    compat: {
      refs: Record<string, Element | null>;
      calls: number;
      cleanups: number;
      version: string;
      unmount: () => void;
    };
  }
}
window.compat = {
  refs: {},
  calls: 0,
  cleanups: 0,
  version: React.version,
  unmount: () => {},
};
const refs: Record<string, (node: never) => void> = {};
function ref<T extends Element>(name: string): React.RefCallback<T> {
  return (refs[name] ??= (node: Element | null) => {
    window.compat.refs[name] = node;
  }) as React.RefCallback<T>;
}
const inputRef = React.createRef<HTMLInputElement>();
const cleanupRef: React.RefCallback<HTMLButtonElement> = (node) => {
  if (node && React.version.startsWith("19."))
    return () => {
      window.compat.cleanups++;
    };
  if (node === null && React.version.startsWith("18."))
    window.compat.cleanups++;
};
const choices = ["Apple", "Banana", "Cherry"];
function Scroller() {
  const [items, setItems] = React.useState(
    Array.from({ length: 20 }, (_, i) => i),
  );
  const { scrollToMessage, scrollToEnd } = useMessageScroller();
  const visibility = useMessageScrollerVisibility();
  return (
    <>
      <Button onClick={() => scrollToMessage("message-4")}>
        Jump to message
      </Button>
      <Button onClick={() => scrollToEnd()}>Latest message</Button>
      <Button
        onClick={() =>
          setItems((current) => [...current, current[current.length - 1] + 1])
        }
      >
        Append message
      </Button>
      <Button
        onClick={() => setItems((current) => [current[0] - 1, ...current])}
      >
        Prepend message
      </Button>
      <output data-testid="visible-messages">
        {visibility.visibleMessageIds.join(",")}
      </output>
      <MessageScroller
        ref={ref<HTMLDivElement>("scroller")}
        style={{ height: 240, width: 400 }}
      >
        <MessageScrollerViewport ref={ref<HTMLDivElement>("viewport")}>
          <MessageScrollerContent ref={ref<HTMLDivElement>("content")}>
            {items.map((i) => (
              <MessageScrollerItem
                key={i}
                messageId={`message-${i}`}
                scrollAnchor
                ref={i === 4 ? ref<HTMLDivElement>("item") : undefined}
              >
                <div style={{ height: 64 }}>Message {i}</div>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton
          ref={ref<HTMLButtonElement>("scroll-button")}
          behavior="auto"
        />
      </MessageScroller>
    </>
  );
}
function App() {
  const [value, setValue] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>(null);
  const [combo, setCombo] = React.useState<string | null>(null);
  return (
    <Toaster>
      <main style={{ padding: 32, display: "grid", gap: 16, maxWidth: 640 }}>
        <h1>React {React.version}</h1>
        <Button ref={cleanupRef}>Ref lifecycle</Button>
        <ChartContainer
          title="Compatibility chart"
          config={{ total: { label: "Total" } }}
          style={{ height: 180, width: 400 }}
        >
          <BarChart data={[{ total: 4 }, { total: 8 }]}>
            <>
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                isAnimationActive={false}
              />
            </>
          </BarChart>
        </ChartContainer>
        <Table>
          <TableBody>
            <TableDetailRow colSpan={1} open={false}>
              <Button data-testid="collapsed-action">Hidden action</Button>
            </TableDetailRow>
          </TableBody>
        </Table>
        <ReplyBox>
          <ReplyBoxFooter showTray />
        </ReplyBox>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            window.compat.calls++;
          }}
        >
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button
            type="button"
            ref={ref<HTMLButtonElement>("button")}
            onClick={() => inputRef.current?.focus()}
          >
            Focus name
          </Button>
          <Button type="submit">Save</Button>
          <Button loading type="submit">
            Saving
          </Button>
          <output data-testid="name-value">{value}</output>
          <Textarea
            aria-label="Notes"
            ref={ref<HTMLTextAreaElement>("textarea")}
          />
          <Search aria-label="Search" ref={ref<HTMLInputElement>("search")} />
          <FileInput aria-label="Upload" ref={ref<HTMLInputElement>("file")} />
          <Checkbox
            label="Enabled"
            name="enabled"
            ref={ref<HTMLElement>("checkbox")}
          />
          <Switch label="Notifications" ref={ref<HTMLElement>("switch")} />
        </form>
        <Dialog>
          <DialogTrigger
            render={<Button ref={ref<HTMLButtonElement>("dialog-trigger")} />}
          >
            Open dialog
          </DialogTrigger>
          <DialogContent ref={ref<HTMLDivElement>("dialog")}>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>Edit profile</DialogDescription>
            <Input aria-label="Dialog name" autoFocus />
            <DialogClose render={<Button />}>Done</DialogClose>
          </DialogContent>
        </Dialog>
        <Select<string>
          items={choices.map((value) => ({ value, label: value }))}
          value={selected}
          onValueChange={setSelected}
        >
          <SelectTrigger
            aria-label="Fruit"
            ref={ref<HTMLButtonElement>("select")}
          >
            <SelectValue placeholder="Choose fruit" />
          </SelectTrigger>
          <SelectContent>
            {choices.map((choice) => (
              <SelectItem key={choice} value={choice}>
                {choice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <output data-testid="selected">{selected}</output>
        <Combobox<string>
          items={choices}
          value={combo}
          onValueChange={setCombo}
        >
          <ComboboxInput
            aria-label="Find fruit"
            ref={ref<HTMLInputElement>("combobox")}
          />
          <ComboboxContent>
            <ComboboxList>
              {(choice: string) => (
                <ComboboxItem key={choice} value={choice}>
                  {choice}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <output data-testid="combo">{combo}</output>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button ref={ref<HTMLButtonElement>("menu-trigger")} />}
          >
            Actions
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                toast.add({ title: "Action completed", type: "success" })
              }
            >
              Notify
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <MessageScrollerProvider autoScroll>
          <Scroller />
        </MessageScrollerProvider>
      </main>
    </Toaster>
  );
}
const root = createRoot(document.getElementById("root")!);
window.compat.unmount = () => root.unmount();
root.render(
  <React.StrictMode>
    <>
      <span data-testid="consumer-utility" className="[padding-left:37px]" />
      <App />
    </>
  </React.StrictMode>,
);
