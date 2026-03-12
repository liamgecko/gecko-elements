import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const northAmerica = [
  { label: "Eastern Standard Time", value: "est" },
  { label: "Central Standard Time", value: "cst" },
  { label: "Mountain Standard Time", value: "mst" },
  { label: "Pacific Standard Time", value: "pst" },
  { label: "Alaska Standard Time", value: "akst" },
  { label: "Hawaii Standard Time", value: "hst" },
]

const europeAfrica = [
  { label: "Greenwich Mean Time", value: "gmt" },
  { label: "Central European Time", value: "cet" },
  { label: "Eastern European Time", value: "eet" },
  { label: "Western European Summer Time", value: "west" },
  { label: "Central Africa Time", value: "cat" },
  { label: "East Africa Time", value: "eat" },
]

const asia = [
  { label: "Moscow Time", value: "msk" },
  { label: "India Standard Time", value: "ist" },
  { label: "China Standard Time", value: "cst_china" },
  { label: "Japan Standard Time", value: "jst" },
  { label: "Korea Standard Time", value: "kst" },
  { label: "Indonesia Central Standard Time", value: "ist_indonesia" },
]

const australiaPacific = [
  { label: "Australian Western Standard Time", value: "awst" },
  { label: "Australian Central Standard Time", value: "acst" },
  { label: "Australian Eastern Standard Time", value: "aest" },
  { label: "New Zealand Standard Time", value: "nzst" },
  { label: "Fiji Time", value: "fjt" },
]

const southAmerica = [
  { label: "Argentina Time", value: "art" },
  { label: "Bolivia Time", value: "bot" },
  { label: "Brasilia Time", value: "brt" },
  { label: "Chile Standard Time", value: "clt" },
]

export function SelectPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Select</h1>
          <p className="text-sm text-muted-foreground">
            A form control that lets users choose a single option from a
            dropdown list.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Select
            </code>{" "}
            with a trigger and content to render a simple dropdown.
          </p>
          <ComponentExample>
            <Select>
              <SelectTrigger className="w-full max-w-64">
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
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Show disabled and invalid states to communicate availability and
            validation errors.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Select defaultValue="apple" disabled>
              <SelectTrigger className="w-full max-w-64" disabled>
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
          </ComponentExample>

          <h3 id="states-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <Select>
              <SelectTrigger
                className="w-full max-w-64"
                aria-invalid="true"
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
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Adjust the trigger height to match other controls using the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              size
            </code>{" "}
            prop on <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">SelectTrigger</code>.
          </p>

          <h3 id="sizes-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <Select defaultValue="apple">
              <SelectTrigger size="sm" className="w-full max-w-64">
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
          </ComponentExample>

          <h3 id="sizes-default" className="mb-3 text-base font-semibold">Default</h3>
          <ComponentExample className="mb-6">
            <Select defaultValue="apple">
              <SelectTrigger className="w-full max-w-64">
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
          </ComponentExample>

          <h3 id="sizes-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <Select defaultValue="apple">
              <SelectTrigger size="lg" className="w-full max-w-64">
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
          </ComponentExample>
        </PageSection>

        <PageSection id="groups" label="Groups">
          <h2 className="text-lg font-semibold">Groups</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              SelectGroup
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              SelectLabel
            </code>{" "}
            to visually group related options, separated with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              SelectSeparator
            </code>
            .
          </p>
          <ComponentExample>
            <Select>
              <SelectTrigger className="w-full max-w-64">
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {fruits.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ComponentExample>
        </PageSection>

        <PageSection id="scrollable" label="Scrollable">
          <h2 className="text-lg font-semibold">Scrollable</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Longer lists of options automatically become scrollable inside the
            popup. Group related items with labels to keep the menu easy to
            scan.
          </p>
          <ComponentExample>
            <Select>
              <SelectTrigger className="w-full max-w-64">
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
          </ComponentExample>
        </PageSection>

        <PageSection id="alignment" label="Alignment">
          <h2 className="text-lg font-semibold">Alignment</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Control whether the popup aligns to the trigger or to its content
            using the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              alignItemWithTrigger
            </code>{" "}
            prop on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              SelectContent
            </code>
            .
          </p>
          <ComponentExample>
            <Select defaultValue="apple">
              <SelectTrigger className="w-full max-w-64">
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
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
