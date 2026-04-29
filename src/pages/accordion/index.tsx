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
                The accordion component is a dynamic user interface element that allows users to expand and collapse content sections. It improves the user experience by providing an organised and interactive way to present information in a space-efficient manner.
              </>
            }
          />
        </PageSection>

        <PageSection id="usage" label="Usage">
          <PageSectionHeader
            title="Usage"
            description={
              <>
                Use an <Code>Accordion</Code> when you need to present multiple
                related sections of content but want to keep the page scannable by
                showing only the most important information up front. It works best
                for content that is not critical and can be hidden until needed.
                <br />
                <br />
                Avoid accordions for critical content that must be visible at all
                times.
              </>
            }
          />
          <PageSubsectionHeader
            id="usage-import"
            title="Import"
            description={
              <>
                Copy the import below to get started.
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
                Use the following composition to build an <Code>Accordion</Code>.
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
          <PageSectionHeader title="Default accordion" description="A basic accordion that shows one item at a time. By default, all items are closed." />
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
          <PageSectionHeader title="Variants" description="The accordion component supports two variants: default and sectional." />
          <PageSubsectionHeader
            id="variants-sectional"
            title="Sectional"
            description="The sectional variant displays the accordion items in a vertical list, with each item separated by a horizontal line and used for compartmentalised content to reduce visual noise."
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
            description="Control which items are open by default and whether multiple items can stay open. Use the following controls to customise the accordion behavior."
          />
          <PageSubsectionHeader
            id="controls-closed"
            title="Closed"
            description="All items are closed by default."
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
                The first item is open by default. Use the <Code>defaultValue</Code>{" "}
                prop to set the default open item.
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
                All items are open by default. Use the <Code>defaultValue</Code>{" "}
                prop while stipulating all of the item values.
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
                Keep the first item open by default and allow additional items to
                remain open. Use the <Code>multiple</Code> prop to allow multiple
                items to be open at the same time.
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
