import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Code } from "@/components/ui/code"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionPage() {
  const importSnippet = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`

  const getControlsSnippet = (accordionProps: string) => `<Accordion${accordionProps}>
  <AccordionItem key={item.value} value={item.value}>
    <AccordionTrigger>{item.trigger}</AccordionTrigger>
    <AccordionContent>{item.content}</AccordionContent>
  </AccordionItem>
</Accordion>`

  const basicExampleSnippet = `<Accordion>
  <AccordionItem key={item.value} value={item.value}>
    <AccordionTrigger>{item.trigger}</AccordionTrigger>
    <AccordionContent>{item.content}</AccordionContent>
  </AccordionItem>
</Accordion>`

  const sectionalExampleSnippet = `<Accordion variant="sectional">
  <AccordionItem key={item.value} value={item.value}>
    <AccordionTrigger>{item.trigger}</AccordionTrigger>
    <AccordionContent>{item.content}</AccordionContent>
  </AccordionItem>
</Accordion>`

  const compositionSnippet = `Accordion
├─ AccordionItem
│  ├─ AccordionTrigger
│  └─ AccordionContent
└─ AccordionItem
   ├─ AccordionTrigger
   └─ AccordionContent`

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <PageOverviewHeader
            title="Accordion"
            description={
              <>
                The Accordion component allows users to expand and collapse sections of content, helping manage dense or secondary information without overwhelming the page. It groups related content into discrete sections, revealing details only when needed while keeping the interface easy to scan.
              </>
            }
          />
        </PageSection>

        <PageSection id="usage" label="Usage">
          <PageSectionHeader
            title="Usage"
            description={
              <>
                Use an Accordion when presenting multiple related sections of content where only one or a few need to be visible at a time. It is well suited to FAQs, grouped settings, or any interface where progressive disclosure improves readability.
                <br />
                <br />
                Avoid using accordions for critical content that must always be visible, or where hiding information would interrupt user flow or decision-making.
              </>
            }
          />
          <PageSubsectionHeader
            id="usage-import"
            title="Import"
            description={
              <>
                Import the Accordion and its subcomponents to compose expandable sections. The component follows a compound pattern, where each part controls a specific piece of behaviour and structure.
              </>
            }
          />
          <ComponentExample className="mb-6">
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>

          <PageSubsectionHeader
            id="usage-composition"
            title="Composition"
            description={
              <>
                The Accordion is built using a structured set of subcomponents. Each section is defined by an <Code>AccordionItem</Code>, with <Code>AccordionTrigger</Code> controlling the interactive header and <Code>AccordionContent</Code> containing the expandable content. This pattern allows multiple sections to be composed consistently while keeping behaviour predictable.
              </>
            }
          />
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="default" label="Default">
          <PageSectionHeader title="Default accordion" description="Demonstrates the baseline Accordion behaviour, where a single item can be expanded at a time and all items are collapsed by default. Use this pattern when content sections are mutually exclusive or when you want to guide users to focus on one section at a time." />
          <ComponentExample className="mb-6">
            <div className="space-y-6">
              <Accordion>
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight
                    shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
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
        </PageSection>

        <PageSection id="variants" label="Variants">
          <PageSectionHeader title="Variants" description="The Accordion supports layout variations to adapt to different interface contexts. Variants affect visual structure and separation rather than behaviour." />
          <PageSubsectionHeader
            id="variants-sectional"
            title="Sectional"
            description="Displays accordion items as clearly separated sections with additional visual boundaries between each item. Use this variant when content groups need stronger distinction or when the accordion is presented as a standalone list rather than embedded within surrounding content."
          />
          <ComponentExample>
            <div className="space-y-6">
              <Accordion variant="sectional">
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight
                    shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours
                    during business days.
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
        </PageSection>

        <PageSection id="controls" label="Controls">
          <PageSectionHeader
            title="Controls"
            description="Control which items are open by default and whether multiple items can be expanded at the same time. These props define the Accordion’s behaviour rather than its layout, allowing you to tailor how users interact with the content."
          />
          <PageSubsectionHeader
            id="controls-closed"
            title="Closed"
            description="All items are collapsed by default. Use this when you want users to explicitly choose what to expand, or when no section should be prioritised on initial load."
          />
          <ComponentExample className="mb-6">
            <div className="space-y-6">
              <Accordion>
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight
                    shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours
                    during business days.
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

          <PageSubsectionHeader
            id="controls-first-open"
            title="First open"
            description={
              <>
                Opens a single item by default using the <Code>defaultValue</Code> prop. Use this when one section should be prioritised or when you want to guide users toward a recommended starting point.
              </>
            }
          />
          <ComponentExample className="mb-6">
            <div className="space-y-6">
              <Accordion defaultValue={["shipping"]}>
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight
                    shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours
                    during business days.
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

          <PageSubsectionHeader
            id="controls-all-open"
            title="All open"
            description={
              <>
                Opens multiple items by default by passing an array of values to <Code>defaultValue</Code> while enabling <Code>multiple</Code>. Use this when all content should be immediately visible but still collapsible if needed.
              </>
            }
          />
          <ComponentExample className="mb-6">
            <div className="space-y-6">
              <Accordion defaultValue={["shipping", "returns", "support"]} multiple>
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight
                    shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours
                    during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={getControlsSnippet(
                  ' defaultValue={["shipping", "returns", "support"]} multiple'
                )}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>

          <PageSubsectionHeader
            id="controls-multiple"
            title="Multiple"
            description={
              <>
                Allows more than one item to remain open at the same time using the <Code>multiple</Code> prop. Use this when sections are not mutually exclusive and users may need to compare or reference multiple pieces of content simultaneously.
              </>
            }
          />
          <ComponentExample>
            <div className="space-y-6">
              <Accordion defaultValue={["shipping"]} multiple>
                <AccordionItem value="shipping">
                  <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                  <AccordionContent>
                    We offer standard (5-7 days), express (2-3 days), and overnight
                    shipping. Free shipping on international orders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    Returns accepted within 30 days. Items must be unused and in original
                    packaging. Refunds processed within 5-7 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                  <AccordionContent>
                    Reach us via email, live chat, or phone. We respond within 24 hours
                    during business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Code
                variant="block"
                language="tsx"
                code={getControlsSnippet(' defaultValue={["shipping"]} multiple')}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
