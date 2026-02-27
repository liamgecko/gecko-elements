import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Accordion</h1>
          <p className="text-sm text-muted-foreground">
            The accordion component is a dynamic user interface element that
            allows users to expand and collapse content sections. It improves
            the user experience by providing an organised and interactive way to
            present information in a space-efficient manner.
          </p>
        </PageSection>
        <PageSection id="examples" label="Examples">
          <h2 className="text-lg font-semibold">Examples</h2>
          <p className="text-sm text-muted-foreground mb-8">
            The accordion component is used to display content in a way that is easy to understand and use. It is a great way to present information in a way that is easy to understand and use.
          </p>
          <h3 className="mb-3 text-base font-semibold">Basic</h3>
          <ComponentExample className="mb-6">
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
          </ComponentExample>
          <h3 className="mb-3 text-base font-semibold">Layout</h3>
          <ComponentExample>
            <Accordion defaultValue={["shipping"]} variant="layout">
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
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
