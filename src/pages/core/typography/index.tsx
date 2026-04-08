import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { ComponentExample } from "@/components/layout/component-example"
import { Code } from "@/components/ui/code"

export function TypographyPage() {
  return (
    <div className="flex gap-5.5">
      <div className="min-w-0 flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Typography</h1>
          <p className="text-sm text-muted-foreground">
            We offer two different text styles, each in seven sizes and four weights, providing a versatile balance of flexibility and structure while ensuring clear hierarchy and design harmony.
          </p>
        </PageSection>

        <PageSection id="font-families" label="Font families">
          <h2 className="text-lg font-semibold">Font families</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            We utilise Satoshi and Geist Mono, two modern, versatile fonts that offer a wide range of weights and sizes, perfect for creating a harmonious and consistent design system.
          </p>
          <div className="mb-8">
            <h3 id="satoshi" className="mb-2 text-base font-semibold gap-0.5 flex flex-col">Satoshi<span className="block text-xs text-muted-foreground font-mono font-normal">font-sans</span></h3>
            <ComponentExample className="space-y-2">
              <p className="text-3xl font-sans">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="text-3xl font-sans">abcdefghijklmnopqrstuvwxyz</p>
              <p className="text-3xl font-sans">0123456789</p>
              <p className="text-3xl font-sans">!@#$%^&*()_+</p>
            </ComponentExample>
          </div>
          <div className="mb-8">
            <h3 id="geist-mono" className="mb-2 text-base font-semibold gap-0.5 flex flex-col">Geist Mono<span className="block text-xs text-muted-foreground font-mono font-normal">font-mono</span></h3>
            <ComponentExample className="space-y-2">
              <p className="text-3xl font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="text-3xl font-mono">abcdefghijklmnopqrstuvwxyz</p>
              <p className="text-3xl font-mono">0123456789</p>
              <p className="text-3xl font-mono">!@#$%^&*()_+</p>
            </ComponentExample>
          </div>
        </PageSection>

        <PageSection id="weights" label="Weights">
          <h2 className="text-lg font-semibold">Weights</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            We offer four weights for each font family, providing a versatile balance of flexibility and structure while ensuring clear hierarchy and design harmony.
          </p>
          <ComponentExample className="space-y-2">
            <p className="text-3xl font-sans font-normal gap-1 flex flex-col">Regular 400<span className="block text-xs text-muted-foreground font-mono font-normal">font-normal</span></p>
            <p className="text-3xl font-sans font-medium gap-1 flex flex-col">Medium 500<span className="block text-xs text-muted-foreground font-mono font-normal">font-medium</span></p>
            <p className="text-3xl font-sans font-semibold gap-1 flex flex-col">Semibold 600<span className="block text-xs text-muted-foreground font-mono font-normal">font-semibold</span></p>
            <p className="text-3xl font-sans font-bold gap-1 flex flex-col">Bold 800<span className="block text-xs text-muted-foreground font-mono font-normal">font-bold</span></p>
          </ComponentExample>
        </PageSection>

        <PageSection id="type-scale" label="Type scale">
          <h2 className="text-lg font-semibold">Type scale</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            We offer a type scale of seven sizes, providing a versatile balance of flexibility and structure while ensuring clear hierarchy and design harmony.
          </p>
          <ComponentExample>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-xs font-semibold">Type scale</div>
              <div className="flex items-center min-h-12 text-xs font-semibold">Font size</div>
              <div className="flex items-center min-h-12 text-xs font-semibold">Line height</div>
              <div className="flex items-center min-h-12 text-xs font-semibold">Token</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-2xl">Type scale 2xl</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 24px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 32px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-2xl</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-xl">Type scale xl</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 20px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 28px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-xl</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-lg">Type scale lg</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 18px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 28px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-lg</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-base">Type scale md</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 16px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 24px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-base</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-sm">Type scale sm</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 14px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 20px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-sm</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-xs">Type scale xs</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 12px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 16px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-xs</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-2xs">Type scale 2xs</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 10px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 15px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-2xs</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-3xs">Type scale 3xs</div>
              <div className="flex items-center min-h-12 text-sm">Font size: 9px</div>
              <div className="flex items-center min-h-12 text-sm">Line height: 13px</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-3xs</Code></div>
            </div>
          </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="text-elements" label="Text elements">
          <h2 className="text-lg font-semibold">Text elements</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            We offer a text elements, providing a versatile balance of flexibility and structure while ensuring clear hierarchy and design harmony.
          </p>
          <ComponentExample>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-xs font-semibold">Text element</div>
              <div className="flex items-center min-h-12 text-xs font-semibold">Font size</div>
              <div className="flex items-center min-h-12 text-xs font-semibold">Font weight</div>
              <div className="flex items-center min-h-12 text-xs font-semibold">Token</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-2xl font-bold text-foreground">H1</div>
              <div className="flex items-center min-h-12 text-sm">text-2xl</div>
              <div className="flex items-center min-h-12 text-sm">font-bold</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-h1</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-lg font-semibold text-foreground">H2</div>
              <div className="flex items-center min-h-12 text-sm">text-lg</div>
              <div className="flex items-center min-h-12 text-sm">font-semibold</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-h2</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-base font-semibold text-foreground">H3</div>
              <div className="flex items-center min-h-12 text-sm">text-base</div>
              <div className="flex items-center min-h-12 text-sm">font-semibold</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-h3</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-sm font-normal text-foreground">Body</div>
              <div className="flex items-center min-h-12 text-sm">text-sm</div>
              <div className="flex items-center min-h-12 text-sm">font-normal</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-body</Code></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center min-h-12 text-xs font-normal text-muted-foreground">Caption</div>
              <div className="flex items-center min-h-12 text-sm">text-xs</div>
              <div className="flex items-center min-h-12 text-sm">font-normal</div>
              <div className="flex items-center min-h-12 text-sm"><Code>text-caption</Code></div>
            </div>
          </div>
          </ComponentExample>
        </PageSection>

      </div>
      <PageSectionNav />
    </div>
  )
}
