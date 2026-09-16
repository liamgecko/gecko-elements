import { test } from "node:test";
import assert from "node:assert/strict";
import { checkSource } from "../../scripts/check-application-contracts.mjs";
const rules = (source) => checkSource(source).map((i) => i.rule);
test("reject direct UI imports, including dynamic imports and require", () => {
  for (const source of [
    'import {Button} from "@base-ui/react/button"',
    'import("tinymce")',
    'require("react-select")',
    'import {useReactTable} from "@tanstack/react-table"',
  ])
    assert.ok(rules(source).includes("public-ui-import"));
});
test("permit public wrappers, per-icon glyphs and table types", () => {
  assert.deepEqual(
    rules(
      'import {Button} from "@geckolabs/elements/components/button"; import Plus from "@hugeicons/core-free-icons/PlusIcon"; import type {ColumnDef} from "@tanstack/react-table";',
    ),
    [],
  );
});
test("block native application prompts, but permit beforeunload and unrelated methods", () => {
  assert.deepEqual(
    rules(
      'window.confirm("Leave?"); globalThis.alert("Error"); confirm("Go?");',
    ),
    ["native-dialog", "native-dialog", "native-dialog"],
  );
  assert.deepEqual(
    rules(
      'service.confirm(); window.addEventListener("beforeunload", event => event.preventDefault());',
    ),
    [],
  );
});
test("require explicit content card size, tracking renamed imports", () => {
  assert.deepEqual(
    rules(
      'import {Card as Block} from "@geckolabs/elements/components/card"; const a = <Block/>;',
    ),
    ["content-card-size"],
  );
  assert.deepEqual(
    rules(
      'import {Card} from "@geckolabs/elements/components/card"; const a = <Card size="sm"/>;',
    ),
    [],
  );
});
test("prove static required label associations without matching comments or strings", () => {
  const imports =
    'import {Input} from "@geckolabs/elements/components/input"; import {FieldLabel} from "@geckolabs/elements/components/field";';
  assert.deepEqual(
    rules(
      imports +
        'const a=<><FieldLabel htmlFor="name">Name</FieldLabel><Input id="name" required/></>;',
    ),
    ["required-label"],
  );
  assert.deepEqual(
    rules(
      imports +
        'const a=<><FieldLabel htmlFor="name" required>Name</FieldLabel><Input id="name" required/></>;',
    ),
    [],
  );
  assert.deepEqual(
    rules('const sample="window.confirm()"; // window.alert()'),
    [],
  );
});

test("dynamic and optional requiredness is left to runtime verification", () => {
  const imports =
    'import {Input} from "@geckolabs/elements/components/input"; import {FieldLabel} from "@geckolabs/elements/components/field";';
  assert.deepEqual(
    rules(imports + 'const a=<Input id="name" required={false}/>;'),
    [],
  );
  assert.deepEqual(
    rules(imports + 'const a=<Input id="name" required={condition}/>;'),
    [],
  );
  assert.deepEqual(
    rules(
      imports +
        'const a=<><FieldLabel htmlFor="name" required={false}>Name</FieldLabel><Input id="name" required/></>;',
    ),
    ["required-label"],
  );
});
