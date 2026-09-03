import { ComponentExample } from "@/components/layout/component-example";
import { RequiredForm } from "@/components/layout/required-form";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";
import { Controller } from "react-hook-form";
import { z } from "zod";

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

const northAmerica = [
  { label: "Eastern Standard Time", value: "est" },
  { label: "Central Standard Time", value: "cst" },
  { label: "Mountain Standard Time", value: "mst" },
  { label: "Pacific Standard Time", value: "pst" },
  { label: "Alaska Standard Time", value: "akst" },
  { label: "Hawaii Standard Time", value: "hst" },
];

const europeAfrica = [
  { label: "Greenwich Mean Time", value: "gmt" },
  { label: "Central European Time", value: "cet" },
  { label: "Eastern European Time", value: "eet" },
  { label: "Western European Summer Time", value: "west" },
  { label: "Central Africa Time", value: "cat" },
  { label: "East Africa Time", value: "eat" },
];

const asia = [
  { label: "Moscow Time", value: "msk" },
  { label: "India Standard Time", value: "ist" },
  { label: "China Standard Time", value: "cst_china" },
  { label: "Japan Standard Time", value: "jst" },
  { label: "Korea Standard Time", value: "kst" },
  { label: "Indonesia Central Standard Time", value: "ist_indonesia" },
];

const australiaPacific = [
  { label: "Australian Western Standard Time", value: "awst" },
  { label: "Australian Central Standard Time", value: "acst" },
  { label: "Australian Eastern Standard Time", value: "aest" },
  { label: "New Zealand Standard Time", value: "nzst" },
  { label: "Fiji Time", value: "fjt" },
];

const southAmerica = [
  { label: "Argentina Time", value: "art" },
  { label: "Bolivia Time", value: "bot" },
  { label: "Brasilia Time", value: "brt" },
  { label: "Chile Standard Time", value: "clt" },
];

const timezones = [
  ...northAmerica,
  ...europeAfrica,
  ...asia,
  ...australiaPacific,
  ...southAmerica,
];

const selectFormSchema = z.object({
  fruit: z.string().min(1, "Select a fruit."),
});

export function SelectPage() {
  const importSnippet = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"`;

  const compositionSnippet = `Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    └── SelectSeparator`;

  const basicSnippet = `const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

<Select items={items}>
  <SelectTrigger aria-label="Fruit">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="select-states-disabled">Fruit</FieldLabel>
  <Select items={items} defaultValue="apple" disabled>
    <SelectTrigger id="select-states-disabled">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="select-states-error">Fruit</FieldLabel>
  <Select items={items}>
    <SelectTrigger
      id="select-states-error"
      aria-invalid="true"
      aria-describedby="select-states-error-msg"
    >
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <FieldError id="select-states-error-msg">
    Please select a valid fruit to continue.
  </FieldError>
</Field>`;

  const sizesSnippet = `<Select items={items} defaultValue="apple">
  <SelectTrigger
    aria-label="Fruit"
    size="sm|default|lg"
  >
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="apple">Apple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

  const groupsSnippet = `<Select items={items} defaultValue="apple">
  <SelectTrigger aria-label="Fruit">
    <SelectValue placeholder="Pick a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Tree fruit</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Berries</SelectLabel>
      <SelectItem value="blueberry">Blueberry</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Other</SelectLabel>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

  const scrollableSnippet = `<Select items={timezones}>
  <SelectTrigger aria-label="Timezone">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time</SelectItem>
      <SelectItem value="cst">Central Standard Time</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe & Africa</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
      <SelectItem value="cet">Central European Time</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

  const alignmentSnippet = `<Select items={items} defaultValue="apple">
  <SelectTrigger aria-label="Fruit">
    <SelectValue />
  </SelectTrigger>
  <SelectContent align="start" alignItemWithTrigger={false}>
    <SelectGroup>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

  const withinFormSnippet = `const formSchema = z.object({
  fruit: z.string().min(1, "Select a fruit."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { fruit: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="fruit"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Fruit</FieldLabel>
        <Select name={field.name} value={field.value} onValueChange={field.onChange} required>
          <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
  <Button type="submit">Save selection</Button>
</form>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Select"
        description="The Select component is a form control that lets people choose one option from a dropdown list."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use a Select when the list is short and fixed. People open the menu
            and pick one option without typing. Pair it with a{" "}
            <DocsPageLink to="/components/field">Field</DocsPageLink> when the
            control needs a label, help text, or errors.
            <br />
            <br />
            Avoid using Select when the list is searchable — use a{" "}
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink>{" "}
            instead. Avoid using Select on student-facing surfaces where native
            mobile menus are preferred — use{" "}
            <DocsPageLink to="/components/native-select">
              Native select
            </DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the Select and its parts to compose a dropdown."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="The trigger shows the current value. Content holds the available options and their visual grouping."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="basic"
        title="Basic"
        description="A simple dropdown for choosing one option from a short list."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Select items={items}>
              <SelectTrigger aria-label="Fruit">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="Communicate when the field is unavailable or when its current value needs attention."
      >
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description="Use this when the choice is not available yet."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-disabled>
                <FieldLabel htmlFor="select-states-disabled">Fruit</FieldLabel>
                <Select items={items} defaultValue="apple" disabled>
                  <SelectTrigger id="select-states-disabled">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={disabledSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-error"
          title="Error"
          description="Use this when the current choice prevents the person from continuing."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid>
                <FieldLabel htmlFor="select-states-error">Fruit</FieldLabel>
                <Select items={items}>
                  <SelectTrigger
                    id="select-states-error"
                    aria-invalid="true"
                    aria-describedby="select-states-error-msg"
                  >
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError id="select-states-error-msg">
                  Please select a valid fruit to continue.
                </FieldError>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={errorSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="sizes"
        title="Sizes"
        description="Match the trigger height to neighbouring controls."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Select items={items} defaultValue="apple">
              <SelectTrigger aria-label="Small fruit select" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={items} defaultValue="apple">
              <SelectTrigger aria-label="Default fruit select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select items={items} defaultValue="apple">
              <SelectTrigger aria-label="Large fruit select" size="lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="groups"
        title="Groups"
        description="Organise a longer list into labelled sections when categories make it easier to scan."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Select items={items} defaultValue="apple">
              <SelectTrigger aria-label="Fruit">
                <SelectValue placeholder="Pick a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tree fruit</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Berries</SelectLabel>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Other</SelectLabel>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Code
              variant="block"
              language="tsx"
              code={groupsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="scrollable"
        title="Scrollable"
        description="Keep a longer list contained and group related options to make it easier to scan."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Select items={timezones}>
              <SelectTrigger aria-label="Timezone">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  {northAmerica.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Europe &amp; Africa</SelectLabel>
                  {europeAfrica.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Asia</SelectLabel>
                  {asia.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Australia &amp; Pacific</SelectLabel>
                  {australiaPacific.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>South America</SelectLabel>
                  {southAmerica.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Code
              variant="block"
              language="tsx"
              code={scrollableSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="alignment"
        title="Alignment"
        description="Use ordinary anchored positioning when the popup should not overlap the trigger’s selected value."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Select items={items} defaultValue="apple">
              <SelectTrigger aria-label="Fruit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start" alignItemWithTrigger={false}>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Code
              variant="block"
              language="tsx"
              code={alignmentSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="within-form"
        title="Within form"
        description="Give the field a submitted name and visible label, then validate it in the form submit handler."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              className="space-y-6"
              schema={selectFormSchema}
              defaultValues={{ fruit: "" }}
            >
              {(form) => (
                <>
                  <Controller
                    name="fruit"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="select-form-fruit">
                          Fruit
                        </FieldLabel>
                        <Select
                          items={items}
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                          required
                        >
                          <SelectTrigger
                            id="select-form-fruit"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select a fruit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit">Save selection</Button>
                </>
              )}
            </RequiredForm>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Keep a fixed option list easy to scan and consistent with its form."
      >
        <DocsDoDont
          doItems={[
            <>Use Select for one choice from a short, fixed list.</>,
            <>
              Match <Code>SelectTrigger</Code> size to neighbouring controls.
            </>,
            <>
              Use <Code>SelectGroup</Code>, <Code>SelectLabel</Code>, and{" "}
              <Code>SelectSeparator</Code> to organise longer lists.
            </>,
            <>
              Pair the trigger with{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> for a
              label and validation.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Select when people need to type to filter. Use a{" "}
              <DocsPageLink to="/components/combobox">Combobox</DocsPageLink>.
            </>,
            <>Don’t group a short list when grouping adds no meaning.</>,
            <>Don’t use placeholder text as the field’s only label.</>,
            <>
              Don’t change popup alignment unless the default placement does not
              fit the layout.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Select."
      >
        <ChildSection
          id="api-select"
          title="Select"
          description="Controls the selected value, available items and form behaviour."
        >
          <DocsApiTable
            rows={[
              {
                name: "items",
                type: "Item[]",
                description: "Maps stored values to their visible labels.",
              },
              {
                name: "name",
                type: "string",
                description: "Sets the native form field name.",
              },
              {
                name: "value | defaultValue",
                type: "Item | null",
                description: "Controls or initializes the selected value.",
              },
              {
                name: "onValueChange",
                type: "(value: Item | null) => void",
                description: "Reports selection changes.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes the complete field unavailable.",
              },
              {
                name: "required",
                type: "boolean",
                defaultValue: "false",
                description: "Requires a value for native form submission.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-trigger"
          title="SelectTrigger"
          description="Opens the popup and presents the current value."
        >
          <DocsApiTable
            rows={[
              {
                name: "size",
                type: '"sm" | "default" | "lg"',
                defaultValue: '"default"',
                description: "Controls the trigger height and text size.",
              },
              {
                name: "aria-invalid",
                type: "boolean",
                defaultValue: "false",
                description: "Exposes the invalid state.",
              },
              {
                name: "aria-describedby",
                type: "string",
                description: "Connects supporting or validation content.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-value"
          title="SelectValue"
          description="Presents the selected label or the unselected hint."
        >
          <DocsApiTable
            rows={[
              {
                name: "placeholder",
                type: "React.ReactNode",
                description: "Provides a hint while no value is selected.",
              },
              {
                name: "children",
                type: "React.ReactNode | function",
                description: "Customizes the selected value rendering.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-content"
          title="SelectContent"
          description="Positions and contains the popup list."
        >
          <DocsApiTable
            rows={[
              {
                name: "alignItemWithTrigger",
                type: "boolean",
                defaultValue: "true",
                description: "Aligns the selected item over the trigger value.",
              },
              {
                name: "side",
                type: '"top" | "right" | "bottom" | "left"',
                defaultValue: '"bottom"',
                description:
                  "Sets the preferred side for ordinary positioning.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end"',
                defaultValue: '"center"',
                description: "Aligns the popup across the trigger.",
              },
              {
                name: "sideOffset",
                type: "number",
                defaultValue: "4",
                description: "Sets the distance from the trigger.",
              },
              {
                name: "alignOffset",
                type: "number",
                defaultValue: "0",
                description: "Offsets the popup across the trigger.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-item"
          title="SelectItem"
          description="Defines one selectable option."
        >
          <DocsApiTable
            rows={[
              {
                name: "value",
                type: "Item",
                description:
                  "Provides the stable selected and submitted value.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes one option unavailable.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/select">
                Shadcn Select documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/select">
                Base UI Select API
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose a selection control based on list length and browser behaviour."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink> —
            when people need to type to filter.
          </li>
          <li>
            <DocsPageLink to="/components/native-select">
              Native select
            </DocsPageLink>{" "}
            — when native browser behaviour is preferred.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
