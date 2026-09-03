import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Code } from "@gecko/ui/components/code";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gecko/ui/components/accordion";

export function AccordionPage() {
  const importSnippet = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gecko/ui/components/accordion"`;

  const getControlsSnippet = (
    accordionProps: string,
  ) => `<Accordion${accordionProps}>
  <AccordionItem key={item.value} value={item.value}>
    <AccordionTrigger>{item.trigger}</AccordionTrigger>
    <AccordionContent>{item.content}</AccordionContent>
  </AccordionItem>
</Accordion>`;

  const basicExampleSnippet = `<Accordion multiple>
  <AccordionItem key={item.value} value={item.value}>
    <AccordionTrigger>{item.trigger}</AccordionTrigger>
    <AccordionContent>{item.content}</AccordionContent>
  </AccordionItem>
</Accordion>`;

  const sectionalExampleSnippet = `<Accordion
  variant="sectional"
  defaultValue={[item.value]}
  multiple
  keepMounted
>
  <AccordionItem key={item.value} value={item.value}>
    <AccordionTrigger>{item.trigger}</AccordionTrigger>
    <AccordionContent>{item.content}</AccordionContent>
  </AccordionItem>
</Accordion>`;

  const compositionSnippet = `Accordion
├─ AccordionItem
│  ├─ AccordionTrigger
│  └─ AccordionContent
└─ AccordionItem
   ├─ AccordionTrigger
   └─ AccordionContent`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Accordion"
        description={
          <>
            The Accordion component allows users to expand and collapse sections
            of content, helping manage dense or secondary information without
            overwhelming the page. It groups related content into discrete
            sections, revealing details only when needed while keeping the
            interface easy to scan.
          </>
        }
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Accordion sparingly. Prefer{" "}
            <Code>variant=&quot;sectional&quot;</Code> to break large setup
            forms into meaningful sections and reduce cognitive load. Page
            sub-navigation still belongs in Header tabs or standalone{" "}
            <DocsPageLink to="/components/tabs">Tabs</DocsPageLink>.
            <br />
            <br />
            Use the default variant for related secondary information in a dense
            panel. An Accordion must contain at least two related sections. Keep
            a single section visible rather than making it collapsible. Avoid
            using Accordion as a standard page pattern, or for critical content
            that must always stay visible.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description={
            <>
              Import the Accordion and its subcomponents to compose expandable
              sections. The component follows a compound pattern, where each
              part controls a specific piece of behaviour and structure.
            </>
          }
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
          description={
            <>
              The Accordion is built using a structured set of subcomponents.
              Each section is defined by an <Code>AccordionItem</Code>, with{" "}
              <Code>AccordionTrigger</Code> controlling the interactive header
              and <Code>AccordionContent</Code> containing the expandable
              content. This pattern allows multiple sections to be composed
              consistently while keeping behaviour predictable.
            </>
          }
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
        id="default"
        title="Default accordion"
        description="Use the default variant for related secondary information in a dense panel, such as contact details in the Inbox. Sections are independent, so allow more than one to remain open. Start with all sections closed unless one is clearly prioritised, and preserve the open sections for the lifetime of the panel."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Accordion multiple>
              <AccordionItem value="shipping">
                <AccordionTrigger>
                  What are your shipping options?
                </AccordionTrigger>
                <AccordionContent>
                  We offer standard (5-7 days), express (2-3 days), and
                  overnight shipping. Free shipping on international orders.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  Returns accepted within 30 days. Items must be unused and in
                  original packaging. Refunds processed within 5-7 business
                  days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="variants"
        title="Variants"
        description="The Accordion supports layout variations to adapt to different interface contexts. Variants affect visual structure and separation rather than behaviour."
      >
        <ChildSection
          id="variants-sectional"
          title="Sectional"
          description="Displays accordion items as clearly separated sections. Use this variant for large setup forms. Allow multiple sections to remain open, keep their fields mounted, and open the first or most relevant section initially. When validation fails, open every section containing an error and move focus to the first invalid control or error summary."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Accordion
                variant="sectional"
                defaultValue={["shipping"]}
                multiple
                keepMounted
              >
                <AccordionItem value="shipping">
                  <AccordionTrigger>
                    What are your shipping options?
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and
                    overnight shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>
                    What is your return policy?
                  </AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in
                    original packaging. Refunds processed within 5-7 business
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within
                    24 hours during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={sectionalExampleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="controls"
        title="Controls"
        description="Control which items are open by default and whether multiple items can be expanded at the same time. These props define the Accordion’s behaviour rather than its layout, allowing you to tailor how users interact with the content."
      >
        <ChildSection
          id="controls-closed"
          title="Closed"
          description="All items are collapsed by default. Use this when you want users to explicitly choose what to expand, or when no section should be prioritised on initial load."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Accordion>
                <AccordionItem value="shipping">
                  <AccordionTrigger>
                    What are your shipping options?
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and
                    overnight shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>
                    What is your return policy?
                  </AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in
                    original packaging. Refunds processed within 5-7 business
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within
                    24 hours during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={getControlsSnippet("")}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>

        <ChildSection
          id="controls-first-open"
          title="First open"
          description={
            <>
              Opens a single item by default using the <Code>defaultValue</Code>{" "}
              prop. Use this when one section should be prioritised or when you
              want to guide users toward a recommended starting point.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Accordion defaultValue={["shipping"]}>
                <AccordionItem value="shipping">
                  <AccordionTrigger>
                    What are your shipping options?
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and
                    overnight shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>
                    What is your return policy?
                  </AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in
                    original packaging. Refunds processed within 5-7 business
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within
                    24 hours during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={getControlsSnippet(' defaultValue={["shipping"]}')}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>

        <ChildSection
          id="controls-all-open"
          title="All open"
          description={
            <>
              Opens multiple items by default by passing an array of values to{" "}
              <Code>defaultValue</Code> while enabling <Code>multiple</Code>.
              Use this when all content should be immediately visible but still
              collapsible if needed.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Accordion
                defaultValue={["shipping", "returns", "support"]}
                multiple
              >
                <AccordionItem value="shipping">
                  <AccordionTrigger>
                    What are your shipping options?
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and
                    overnight shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>
                    What is your return policy?
                  </AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in
                    original packaging. Refunds processed within 5-7 business
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within
                    24 hours during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={getControlsSnippet(
                  ' defaultValue={["shipping", "returns", "support"]} multiple',
                )}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>

        <ChildSection
          id="controls-multiple"
          title="Multiple"
          description={
            <>
              Allows more than one item to remain open at the same time using
              the <Code>multiple</Code> prop. Use this when sections are not
              mutually exclusive and users may need to compare or reference
              multiple pieces of content simultaneously.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Accordion defaultValue={["shipping"]} multiple>
                <AccordionItem value="shipping">
                  <AccordionTrigger>
                    What are your shipping options?
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and
                    overnight shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>
                    What is your return policy?
                  </AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in
                    original packaging. Refunds processed within 5-7 business
                    days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within
                    24 hours during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={getControlsSnippet(
                  ' defaultValue={["shipping"]} multiple',
                )}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use the documented variants and behaviour props. Do not restyle the Accordion chrome or add variants or props without explicit consent."
      >
        <DocsDoDont
          doItems={[
            <>
              Put the heading in <Code>AccordionTrigger</Code> and the body in{" "}
              <Code>AccordionContent</Code>.
            </>,
            <>
              Give each <Code>AccordionItem</Code> a unique <Code>value</Code>.
            </>,
            <>
              Open a section on load with <Code>defaultValue</Code> as an array,
              for example <Code>{`defaultValue={["shipping"]}`}</Code>.
            </>,
            <>
              Set <Code>multiple</Code> when more than one section should stay
              open.
            </>,
            <>
              Use <Code>variant=&quot;sectional&quot;</Code> for large setup
              forms that need clearer section boundaries.
            </>,
            <>
              For sectional setup forms, set <Code>multiple</Code> and{" "}
              <Code>keepMounted</Code>. Control the open values when validation
              must reveal a section containing an error.
            </>,
          ]}
          dontItems={[
            <>Don’t use default Accordion as a standard page layout pattern.</>,
            <>
              Don’t override borders, padding, or radius with{" "}
              <Code>className</Code>. Use <Code>variant</Code>.
            </>,
            <>
              Don’t hide content that must stay visible. An accordion is for
              secondary detail.
            </>,
            <>
              Don’t pass several values in <Code>defaultValue</Code> without{" "}
              <Code>multiple</Code>.
            </>,
            <>
              Don’t reuse the same <Code>value</Code> on two items.
            </>,
            <>
              Don’t use Accordion for a single collapsible section. Keep that
              content visible.
            </>,
            <>
              Don’t add a new variant or behaviour prop without explicit
              consent.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Accordion."
      >
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"default" | "sectional"',
              defaultValue: '"default"',
              description:
                "Visual structure. Use sectional when items need a stronger boundary.",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: "false",
              description:
                "Allows more than one item to stay open. Required if defaultValue lists more than one item.",
            },
            {
              name: "defaultValue",
              type: "string[]",
              description:
                "Items open on first render. Pass the AccordionItem values as an array.",
            },
            {
              name: "value",
              type: "string[]",
              description:
                "Controlled open items. Use with onValueChange when validation or application state needs to open a section programmatically.",
            },
            {
              name: "onValueChange",
              type: "(value: string[]) => void",
              description:
                "Updates the controlled open items after a section is expanded or collapsed.",
            },
            {
              name: "keepMounted",
              type: "boolean",
              defaultValue: "false",
              description:
                "Keeps closed content in the DOM. Set this for sectional setup forms so collapsing a section does not unmount its fields.",
            },
            {
              name: "value",
              type: "string",
              description:
                "On AccordionItem. Unique id for the section. Referenced by defaultValue.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/accordion">
                Base UI Accordion API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/accordion">
                Shadcn Accordion documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different control when the Accordion is the wrong shape for the job."
      >
        <ul>
          <li>
            <DocsPageLink to="/components/tabs">Tabs</DocsPageLink> — when
            people choose between views, not extra detail in a list of sections.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
