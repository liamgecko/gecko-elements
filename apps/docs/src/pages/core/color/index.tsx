import { ColorChip } from "./color-chip"
import { ColorRow } from "./color-row"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"

export function ColorPage() {
  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <h1 className="text-2xl font-bold text-foreground mb-2">Color</h1>
        <p className="text-sm text-muted-foreground">
        Our colour system is designed to provide clarity, consistency, and accessibility across the product. Colours are used to communicate hierarchy, meaning, and interaction, while meeting WCAG 2.2 contrast standards to ensure content is legible for all users.
        </p>
      </PageSection>

      <PageSection id="base-color" label="Base colors">
        <h2 className="text-lg font-semibold">Base colors</h2>
        <p className="mb-4 text-sm text-muted-foreground">
        Base colours define the foundation of the system, including neutral surfaces and core brand colours. These are used across the majority of components and layouts.
        </p>
        <ComponentExample className="mb-6">
          <ColorRow>
            <ColorChip
              swatchClassName="bg-white"
              contrastLabel="AAA 17.74"
              contrastClassName="text-gray-900"
              name="White"
              value="oklch(1 0 0)"
              value2="#FFFFFF"
            />
            <ColorChip
              swatchClassName="bg-foreground"
              contrastLabel="AAA 17.74"
              contrastClassName="text-white dark:text-gray-900"
              name="Primary"
              value="oklch(0.21 0.034 264.665)"
              value2="#101828"
            />
            <ColorChip
              swatchClassName="bg-muted-foreground"
              contrastLabel="AAA 7.56"
              contrastClassName="text-white dark:text-gray-900"
              name="Secondary"
              value="oklch(0.446 0.03 256.802)"
              value2="#4A5565"
            />
          </ColorRow>
        </ComponentExample>
      </PageSection>

      <PageSection id="primary-colors" label="Primary colors">
        <h2 className="text-lg font-semibold">Primary colors</h2>
        <p className="mb-8 text-sm text-muted-foreground">
        Primary colours define the core UI surfaces and text hierarchy. Neutral tones are used extensively to create structure, support readability, and provide a consistent foundation for all components.
        </p>

        <h3 id="color-gray" className="mb-3 text-base font-semibold">Gray</h3>
        <ComponentExample className="mb-4">
          <ColorRow>
            <ColorChip
              swatchClassName="bg-gray-50"
              contrastLabel="AAA 17"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(98.5% .002 247.839)"
              value2="#F9FAFB"
            />
            <ColorChip
              swatchClassName="bg-gray-100"
              contrastLabel="AAA 16.12"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(96.7% .003 264.542)"
              value2="#F3F4F6"
            />
            <ColorChip
              swatchClassName="bg-gray-200"
              contrastLabel="AAA 14.35"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(92.8% .006 264.531)"
              value2="#E5E7EB"
            />
            <ColorChip
              swatchClassName="bg-gray-300"
              contrastLabel="AAA 12.05"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(87.2% .01 258.338)"
              value2="#D1D5DC"
            />
            <ColorChip
              swatchClassName="bg-gray-400"
              contrastLabel="AA 6.81"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(70.7% .022 261.325)"
              value2="#99A1AF"
            />
            <ColorChip
              swatchClassName="bg-gray-500"
              contrastLabel="AA 4.83"
              contrastClassName="text-white"
              name="500"
              value="oklch(55.1% .027 264.364)"
              value2="#6A7282"
            />
            <ColorChip
              swatchClassName="bg-gray-600"       
              contrastLabel="AAA 7.56"
              contrastClassName="text-white"
              name="600"
              value="oklch(44.6% .03 256.802)"
              value2="#4A5565"
            />
            <ColorChip
              swatchClassName="bg-gray-700"
              contrastLabel="AAA 10.3"
              contrastClassName="text-white"
              name="700"
              value="oklch(27.8% .033 256.848)"
              value2="#1E2939"
            />
            <ColorChip
              swatchClassName="bg-gray-800"
              contrastLabel="AAA 14.68"
              contrastClassName="text-white"
              name="800"
              value="oklch(37.3% .034 259.733)"
              value2="#364153"
            />
            <ColorChip
              swatchClassName="bg-gray-900"
              contrastLabel="AAA 17.74"
              contrastClassName="text-white"
              name="900"
              value="oklch(21% .034 264.665)"
              value2="#101828"
            />
            <ColorChip
              swatchClassName="bg-gray-950"
              showSwatchDivider
              contrastLabel="AAA 20.12"
              contrastClassName="text-white"
              name="950"
              value="oklch(13% .028 261.692)"
              value2="#030712"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use for layout, surfaces, and text hierarchy</li>
          <li className="text-sm">Apply to backgrounds, borders, and neutral UI elements</li>
          <li className="text-sm">Use different shades to create depth and structure</li>
          <li className="text-sm">Avoid relying on gray alone to communicate meaning</li>
        </ul>
      </PageSection>

      <PageSection id="secondary-colors" label="Secondary colors">
        <h2 className="text-lg font-semibold">Secondary colors</h2>
        <p className="mb-8 text-sm text-muted-foreground">
        Secondary colours are used to communicate meaning and draw attention to key elements. Each colour has a defined semantic purpose. Always use colours consistently according to their meaning.
        </p>

        <h3 id="color-red" className="mb-3 text-base font-semibold">Red</h3>
        <ComponentExample className="mb-4">
          <ColorRow className="dark:hidden">
            <ColorChip
              swatchClassName="bg-red-50"
              contrastLabel="AAA 16.24"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(97.1% .013 17.38)"
              value2="#FEF2F2"
            />
            <ColorChip
              swatchClassName="bg-red-100"
              contrastLabel="AAA 14.53"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(93.6% .032 17.717)"
              value2="#FFE2E2"
            />
            <ColorChip
              swatchClassName="bg-red-200"
              contrastLabel="AAA 12.27"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(88.5% .062 18.334)"
              value2="#FFC9C9"
            />
            <ColorChip
              swatchClassName="bg-red-300"
              contrastLabel="AAA 9.31"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(80.8% .114 19.571)"
              value2="#FFA2A2"
            />
            <ColorChip
              swatchClassName="bg-red-400"
              contrastLabel="AA 6.18"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(70.4% .191 22.216)"
              value2="#FF6467"
            />
            <ColorChip
              swatchClassName="bg-red-500"
              contrastLabel="AA 4.64"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(63.7% .237 25.331)"
              value2="#FB2C36"
            />
            <ColorChip
              swatchClassName="bg-red-600"
              contrastLabel="AA 4.88"
              contrastClassName="text-white"
              name="600"
              value="oklch(57.7% .245 27.325)"
              value2="#E7000B"
            />
            <ColorChip
              swatchClassName="bg-red-700"
              contrastLabel="AA 6.55"
              contrastClassName="text-white"
              name="700"
              value="oklch(50.5% .213 27.518)"
              value2="#C10007"
            />
            <ColorChip
              swatchClassName="bg-red-800"
              contrastLabel="AAA 8.37"
              contrastClassName="text-white"
              name="800"
              value="oklch(44.4% .177 26.899)"
              value2="#9F0712"
            />
            <ColorChip
              swatchClassName="bg-red-900"
              contrastLabel="AAA 10.05"
              contrastClassName="text-white"
              name="900"
              value="oklch(39.6% .141 25.723)"
              value2="#82181A"
            />
            <ColorChip
              swatchClassName="bg-red-950"
              contrastLabel="AAA 16.14"
              contrastClassName="text-white"
              name="950"
              value="oklch(25.8% .092 26.042)"
              value2="#460809"
            />
          </ColorRow>
          <ColorRow className="hidden dark:grid">
            <ColorChip
              swatchClassName="bg-rose-50"
              contrastLabel="AAA 16.13"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(96.9% .015 12.422)"
              value2="#FFF1F2"
            />
            <ColorChip
              swatchClassName="bg-rose-100"
              contrastLabel="AAA 14.76"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(94.1% .03 12.58)"
              value2="#FFE4E6"
            />
            <ColorChip
              swatchClassName="bg-rose-200"
              contrastLabel="AAA 12.55"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(89.2% .058 10.001)"
              value2="#FFCCD3"
            />
            <ColorChip
              swatchClassName="bg-rose-300"
              contrastLabel="AAA 9.35"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(81% .117 11.638)"
              value2="#FFA1AD"
            />
            <ColorChip
              swatchClassName="bg-rose-400"
              contrastLabel="AA 6.33"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(71.2% .194 13.428)"
              value2="#FF637E"
            />
            <ColorChip
              swatchClassName="bg-rose-500"
              contrastLabel="AA 4.75"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(64.5% .246 16.439)"
              value2="#FF2056"
            />
            <ColorChip
              swatchClassName="bg-rose-600" 
              contrastLabel="AA 4.67"
              contrastClassName="text-white"
              name="600"
              value="oklch(58.6% .253 17.585)"
              value2="#EC003F"
            />
            <ColorChip
              swatchClassName="bg-rose-700"
              contrastLabel="AA 6.28"
              contrastClassName="text-white"
              name="700"
              value="oklch(51.4% .222 16.935)"
              value2="#C70036"
            />
            <ColorChip
              swatchClassName="bg-rose-800"
              contrastLabel="AAA 8.07"
              contrastClassName="text-white"
              name="800"
              value="oklch(45.5% .188 13.697)"
              value2="#A50036"
            />
            <ColorChip
              swatchClassName="bg-rose-900"
              contrastLabel="AAA 9.62"
              contrastClassName="text-white"
              name="900"
              value="oklch(41% .159 10.272)"
              value2="#8B0836"
            />
            <ColorChip
              swatchClassName="bg-rose-950"
              contrastLabel="AAA 115.65"
              contrastClassName="text-white"
              name="950"
              value="oklch(27.1% .105 12.094)"
              value2="#4D0218"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use for error states and destructive actions</li>
          <li className="text-sm">Apply to validation messages and critical alerts</li>
          <li className="text-sm">Use for destructive buttons (e.g. delete)</li>
          <li className="text-sm">Avoid using red for non-critical UI elements</li>
        </ul>

        <h3 id="color-orange" className="mb-3 text-base font-semibold">Orange</h3>
        <ComponentExample className="mb-4">
          <ColorRow>
            <ColorChip
              swatchClassName="bg-orange-50"
              contrastLabel="AAA 16.73"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(98% .016 73.684)"
              value2="#FFF7ED"
            />
            <ColorChip
              swatchClassName="bg-orange-100"
              contrastLabel="AAA 15.47"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(95.4% .038 75.164)"
              value2="#FFEDD4"
            />
            <ColorChip
              swatchClassName="bg-orange-200"
              contrastLabel="AAA 13.08"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(90.1% .076 70.697)"
              value2="#FFD6A7"
            />
            <ColorChip
              swatchClassName="bg-orange-300"
              contrastLabel="AAA 10.51"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(83.7% .128 66.29)"
              value2="#FFB86A"
            />
            <ColorChip
              swatchClassName="bg-orange-400"
              contrastLabel="AAA 7.56"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(75% .183 55.934)"
              value2="#FF8904"
            />
            <ColorChip
              swatchClassName="bg-orange-500"
              contrastLabel="AA 6.27"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(70.5% .213 47.604)"
              value2="#FF6900"
            />
            <ColorChip
              swatchClassName="bg-orange-600"
              contrastLabel="AA 4.92"
              contrastClassName="text-gray-900"
              name="600"
              value="oklch(64.6% .222 41.116)"
              value2="#F54900"
            />
            <ColorChip
              swatchClassName="bg-orange-700"
              contrastLabel="AA 5.24"
              contrastClassName="text-white"
              name="700"
              value="oklch(55.3% .195 38.402)"
              value2="#CA3500"
            />
            <ColorChip
              swatchClassName="bg-orange-800"
              contrastLabel="AAA 7.35"
              contrastClassName="text-white"
              name="800"
              value="oklch(47% .157 37.304)"
              value2="#9F2D00"
            />
            <ColorChip
              swatchClassName="bg-orange-900"
              contrastLabel="AAA 9.41"
              contrastClassName="text-white"
              name="900"
              value="oklch(40.8% .123 38.172)"
              value2="#7E2A0C"
            />
            <ColorChip
              swatchClassName="bg-orange-950"
              contrastLabel="AAA 15.66"
              contrastClassName="text-white"
              name="950"
              value="oklch(26.6% .079 36.259)"
              value2="#441306"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use for warning states and important alerts</li>
          <li className="text-sm">Apply to situations requiring user attention</li>
          <li className="text-sm">Use for non-critical but important feedback</li>
          <li className="text-sm">Avoid using orange for success or neutral content</li>
        </ul>

        <h3 id="color-yellow" className="mb-3 text-base font-semibold">Yellow</h3>
        <ComponentExample className="mb-4">
          <ColorRow>
            <ColorChip
              swatchClassName="bg-yellow-50"
              contrastLabel="AAA 17.14"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(98.7% .026 102.212)"
              value2="#FEFCE8"
            />
            <ColorChip
              swatchClassName="bg-yellow-100"
              contrastLabel="AAA 16.52"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(97.3% .071 103.193)"
              value2="#FEF9C2"
            />
            <ColorChip
              swatchClassName="bg-yellow-200"
              contrastLabel="AAA 15.24"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(94.5% .129 101.54)"
              value2="#FFF085"
            />
            <ColorChip
              swatchClassName="bg-yellow-300"
              contrastLabel="AAA 13.44"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(90.5% .182 98.111)"
              value2="#FFDF20"
            />
            <ColorChip
              swatchClassName="bg-yellow-400"
              contrastLabel="AAA 11.29"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(85.2% .199 91.936)"
              value2="#FDC700"
            />
            <ColorChip
              swatchClassName="bg-yellow-500"
              contrastLabel="AAA 9.24"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(79.5% .184 86.047)"
              value2="#F0B100"
            />
            <ColorChip
              swatchClassName="bg-yellow-600"
              contrastLabel="AA 6.03"
              contrastClassName="text-gray-900"
              name="600"
              value="oklch(68.1% .162 75.834)"
              value2="#D08700"
            />
            <ColorChip
              swatchClassName="bg-yellow-700"
              contrastLabel="AA 4.93"
              contrastClassName="text-white"
              name="700"
              value="oklch(55.4% .135 66.442)"
              value2="#A65F00"
            />
            <ColorChip
              swatchClassName="bg-yellow-800"
              contrastLabel="AA 6.88"
              contrastClassName="text-white"
              name="800"
              value="oklch(47.6% .114 61.907)"
              value2="#894B00"
            />
            <ColorChip
              swatchClassName="bg-yellow-900"
              contrastLabel="AAA 8.68"
              contrastClassName="text-white"
              name="900"
              value="oklch(42.1% .095 57.708)"
              value2="#733E0A"
            />
            <ColorChip
              swatchClassName="bg-yellow-950"
              contrastLabel="AAA 14.56"
              contrastClassName="text-white"
              name="950"
              value="oklch(28.6% .066 53.813)"
              value2="#432004"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use for cautionary messaging and highlights</li>
          <li className="text-sm">Apply to low-severity warnings and notices</li>
          <li className="text-sm">Use to draw attention to important information</li>
          <li className="text-sm">Ensure sufficient contrast when used with text</li>
        </ul>

        <h3 id="color-emerald" className="mb-3 text-base font-semibold">Green</h3>
        <ComponentExample className="mb-4">
          <ColorRow className="dark:hidden">
            <ColorChip
              swatchClassName="bg-emerald-50"
              contrastLabel="AAA 16.83"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(97.9% .021 166.113)"
              value2="#ECFDF5"
            />
            <ColorChip
              swatchClassName="bg-emerald-100"
              contrastLabel="AAA 15.63"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(95% .052 163.051)"
              value2="#D0FAE5"
            />
            <ColorChip
              swatchClassName="bg-emerald-200"
              contrastLabel="AAA 13.85"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(90.5% .093 164.15)"
              value2="#A4F4CF"
            />
            <ColorChip
              swatchClassName="bg-emerald-300"              
              contrastLabel="AAA 11.69"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(84.5% .143 164.978)"
              value2="#5EE9B5"
            />
            <ColorChip
              swatchClassName="bg-emerald-400"
              contrastLabel="AAA 9.12"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(76.5% .177 163.223)"
              value2="#00D492"
            />
            <ColorChip
              swatchClassName="bg-emerald-500"
              contrastLabel="AAA 7.14"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(69.6% .17 162.48)"
              value2="#00BC7D"
            />
            <ColorChip
              swatchClassName="bg-emerald-600"
              contrastLabel="AA 4.79"
              contrastClassName="text-gray-900"
              name="600"
              value="oklch(59.6% .145 163.225)"
              value2="#009966"
            />
            <ColorChip
              swatchClassName="bg-emerald-700"
              contrastLabel="AA 5.42"
              contrastClassName="text-white"
              name="700"
              value="oklch(50.8% .118 165.612)"
              value2="#007A55"
            />
            <ColorChip
              swatchClassName="bg-emerald-800"
              contrastLabel="AAA 7.63"
              contrastClassName="text-white"
              name="800"
              value="oklch(43.2% .095 166.913)"
              value2="#006045"
            />
            <ColorChip
              swatchClassName="bg-emerald-900"
              contrastLabel="AAA 9.7"
              contrastClassName="text-white"
              name="900"
              value="oklch(37.8% .077 168.94)"
              value2="#004F3B"
            />
            <ColorChip
              swatchClassName="bg-emerald-950"
              contrastLabel="AAA 15.14"
              contrastClassName="text-white"
              name="950"
              value="oklch(26.2% .051 172.552)"
              value2="#002C22"
            />
          </ColorRow>
          <ColorRow className="hidden dark:grid">
            <ColorChip
              swatchClassName="bg-teal-50"
              contrastLabel="AAA 17.03"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(98.4% .014 180.72)"
              value2="#F0FDFA"
            />
            <ColorChip
              swatchClassName="bg-teal-100"
              contrastLabel="AAA 15.77"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(95.3% .051 180.801)"
              value2="#CBFBF1"
            />
            <ColorChip
              swatchClassName="bg-teal-200"
              contrastLabel="AAA 14.09"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(91% .096 180.426)"
              value2="#96F7E4"
            />
            <ColorChip
              swatchClassName="bg-teal-300"
              contrastLabel="AAA 12.06"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(85.5% .138 181.071)"
              value2="#46ECD5"
            />
            <ColorChip
              swatchClassName="bg-teal-400"
              contrastLabel="AAA 9.45"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(77.7% .152 181.912)"
              value2="#00D5BE"
            />
            <ColorChip
              swatchClassName="bg-teal-500"
              contrastLabel="AAA 7.26"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(70.4% .14 182.503)"
              value2="#00BBA7"
            />
            <ColorChip
              swatchClassName="bg-teal-600"
              contrastLabel="AA 4.8"
              contrastClassName="text-gray-900"
              name="600"
              value="oklch(60% .118 184.704)"
              value2="#009689"
            />
            <ColorChip
              swatchClassName="bg-teal-700"
              contrastLabel="AA 5.43"
              contrastClassName="text-white"
              name="700"
              value="oklch(51.1% .096 186.391)"
              value2="#00786F"
            />
            <ColorChip
              swatchClassName="bg-teal-800"
              contrastLabel="AAA 7.55"
              contrastClassName="text-white"
              name="800"
              value="oklch(43.7% .078 188.216)"
              value2="#005F5A"
            />
            <ColorChip
              swatchClassName="bg-teal-900"
              contrastLabel="AAA 9.45"
              contrastClassName="text-white"
              name="900"
              value="oklch(38.6% .063 188.416)"
              value2="#0B4F4A"
            />
            <ColorChip
              swatchClassName="bg-teal-950"
              contrastLabel="AAA 14.47"
              contrastClassName="text-white"
              name="950"
              value="oklch(27.7% .046 192.524)"
              value2="#022F2E"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use for success states and confirmations</li>
          <li className="text-sm">Apply to completed actions and positive feedback</li>
          <li className="text-sm">Use for status indicators where appropriate</li>
          <li className="text-sm">Avoid using for primary actions unless tied to success</li>
        </ul>

        <h3 id="color-blue" className="mb-3 text-base font-semibold">Blue</h3>
        <ComponentExample className="mb-4">
          <ColorRow>
            <ColorChip
              swatchClassName="bg-blue-50"
              contrastLabel="AAA 16.28"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(97% .014 254.604)"
              value2="#EFF6FF"
            />
            <ColorChip
              swatchClassName="bg-blue-100"
              contrastLabel="AAA 14.55"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(93.2% .032 255.585)"
              value2="#DBEAFE"
            />
            <ColorChip
              swatchClassName="bg-blue-200"
              contrastLabel="AAA 12.47"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(88.2% .059 254.128)"
              value2="#BEDBFF"
            />
            <ColorChip
              swatchClassName="bg-blue-300"
              contrastLabel="AAA 9.83"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(80.9% .105 251.813)"
              value2="#8EC5FF"
            />
            <ColorChip
              swatchClassName="bg-blue-400"
              contrastLabel="AA 6.78"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(70.7% .165 254.624)"
              value2="#51A2FF"
            />
            <ColorChip
              swatchClassName="bg-blue-500"
              contrastLabel="AA 4.78"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(62.3% .214 259.815)"
              value2="#2B7FFF"
            />
            <ColorChip
              swatchClassName="bg-blue-600"
              contrastLabel="AA 5.25"
              contrastClassName="text-white"
              name="600"
              value="oklch(54.6% .245 262.881)"
              value2="#155DFC"
            />
            <ColorChip
              swatchClassName="bg-blue-700"
              contrastLabel="AA 6.82"
              contrastClassName="text-white"
              name="700"
              value="oklch(48.8% .243 264.376)"
              value2="#1447E6"
            />
            <ColorChip
              swatchClassName="bg-blue-800"
              contrastLabel="AAA 8.83"
              contrastClassName="text-white"
              name="800"
              value="oklch(42.4% .199 265.638)"
              value2="#193CB8"
            />
            <ColorChip
              swatchClassName="bg-blue-900"
              contrastLabel="AAA 10.4"
              contrastClassName="text-white"
              name="900"
              value="oklch(37.9% .146 265.522)"
              value2="#1C398E"
            />
            <ColorChip
              swatchClassName="bg-blue-950"
              contrastLabel="AAA 14.72"
              contrastClassName="text-white"
              name="950"
              value="oklch(28.2% .091 267.935)"
              value2="#162456"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use for informational content and messaging</li>
          <li className="text-sm">Apply to links and navigation elements</li>
          <li className="text-sm">Use for primary actions where appropriate</li>
          <li className="text-sm">Maintain consistent usage across interactive elements</li>
        </ul>

        <h3 id="color-violet" className="mb-3 text-base font-semibold">Violet</h3>
        <ComponentExample className="mb-4">
          <ColorRow>
            <ColorChip
              swatchClassName="bg-violet-50"
              contrastLabel="AAA 16.17"
              contrastClassName="text-gray-900"
              name="50"
              value="oklch(96.9% .016 293.756)"
              value2="#F5F3FF"
            />
            <ColorChip
              swatchClassName="bg-violet-100"
              contrastLabel="AAA 14.93"
              contrastClassName="text-gray-900"
              name="100"
              value="oklch(94.3% .029 294.588)"
              value2="#EDE9FE"
            />
            <ColorChip
              swatchClassName="bg-violet-200"
              contrastLabel="AAA 12.76"
              contrastClassName="text-gray-900"
              name="200"
              value="oklch(89.4% .057 293.283)"
              value2="#DDD6FF"
            />
            <ColorChip
              swatchClassName="bg-violet-300"
              contrastLabel="AAA 9.57"
              contrastClassName="text-gray-900"
              name="300"
              value="oklch(81.1% .111 293.571)"
              value2="#C4B4FF"
            />
            <ColorChip
              swatchClassName="bg-violet-400"
              contrastLabel="AA 6.28"
              contrastClassName="text-gray-900"
              name="400"
              value="oklch(70.2% .183 293.541)"
              value2="#A684FF"
            />
            <ColorChip
              swatchClassName="bg-violet-500"
              contrastLabel="AA 4.86"
              contrastClassName="text-gray-900"
              name="500"
              value="oklch(60.6% .25 292.717)"
              value2="#8E51FF"
            />
            <ColorChip
              swatchClassName="bg-violet-600"
              contrastLabel="AA 6.88"
              contrastClassName="text-white"
              name="600"
              value="oklch(54.1% .281 293.009)"
              value2="#7F22FE"
            />
            <ColorChip
              swatchClassName="bg-violet-700"
              contrastLabel="AAA 7.28"
              contrastClassName="text-white"
              name="700"
              value="oklch(49.1% .27 292.581)"
              value2="#7008E7"
            />
            <ColorChip
              swatchClassName="bg-violet-800"
              contrastLabel="AAA 9.15"
              contrastClassName="text-white"
              name="800"
              value="oklch(43.2% .232 292.759)"
              value2="#5D0EC0"
            />
            <ColorChip
              swatchClassName="bg-violet-900"
              contrastLabel="AAA 11.03"
              contrastClassName="text-white"
              name="900"
              value="oklch(38% .189 293.745)"
              value2="#4D179A"
            />
            <ColorChip
              swatchClassName="bg-violet-950"
              contrastLabel="AAA 15.27"
              contrastClassName="text-white"
              name="950"
              value="oklch(28.3% .141 291.089)"
              value2="#2F0D68"
            />
          </ColorRow>
        </ComponentExample>
        <h3 className="text-sm font-semibold mb-2">
          Guidelines:
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
          <li className="text-sm">Use as an accent colour for emphasis</li>
          <li className="text-sm">Apply to highlight key elements or sections</li>
          <li className="text-sm">Use sparingly to avoid visual noise</li>
          <li className="text-sm">Avoid using for core semantic meanings</li>
        </ul>

        </PageSection>

        <PageSection id="accessibility" label="Accessibility">
        <h2 className="text-lg font-semibold">Accessibility</h2>
        <p className="mb-4 text-sm text-muted-foreground">
        Accessibility is a core requirement of our colour system. All colours meet WCAG 2.2 contrast standards to ensure readability across text and UI elements. Each colour is displayed with its contrast ratio to support informed usage.
        </p>
        <p className="text-sm text-muted-foreground">
          All colors are shown with accompanying text color, with their accessibility score stated.
        </p>
      </PageSection>
    </div>
  )
}
