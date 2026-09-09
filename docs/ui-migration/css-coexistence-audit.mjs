import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const elements = process.argv[2];
const admin = process.argv[3];
const require = createRequire(path.join(elements, 'package.json'));
const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');
const postcss = require('postcss');
const { chromium } = require('playwright');
const source = path.join(elements, 'packages/ui/src/styles/globals.css');
const compiler = await compile(await fs.readFile(source, 'utf8'), {
  base: path.dirname(source), from: source, onDependency() {},
});
const scanner = new Scanner({ sources: compiler.sources });
const candidates = scanner.scan();
const css = compiler.build(candidates);
const legacy = await fs.readFile(path.join(admin, 'App/src/Styles/gecko-react-bootstrap.css'), 'utf8');
const simpleClasses = value => {
  const result = new Map();
  postcss.parse(value).walkRules(rule => {
    for (const selector of rule.selector.split(',')) {
      const match = selector.trim().match(/^\.([a-zA-Z_][\w-]*)$/);
      if (match) result.set(match[1], rule.toString());
    }
  });
  return result;
};
const oldClasses = simpleClasses(legacy);
const newClasses = simpleClasses(css);
const overlap = [...newClasses.keys()].filter(name => oldClasses.has(name)).sort();
const result = {
  methodology: 'Compile actual Elements globals using installed Tailwind and explicit source scanning; intersect exact simple class selectors with copied Admin CSS. Synthetic Chromium computed-style probes use actual stylesheets, no live product session. External requests blocked.',
  candidateCount: candidates.length,
  sources: compiler.sources,
  overlapCount: overlap.length,
  overlap,
  examples: Object.fromEntries(['p-2', 'gap-2', 'border', 'rounded'].map(name => [name, { legacy: oldClasses.get(name), elements: newClasses.get(name) }])),
};
try {
  await compile((await fs.readFile(source, 'utf8')).replace('@import "tailwindcss";', '@import "tailwindcss" prefix(ge);'), {base: path.dirname(source), from: source, onDependency() {}});
  result.naivePrefix = 'compiled';
} catch (error) { result.naivePrefix = error.message; }
const clean = value => {
  const root = postcss.parse(value.replace(/^\uFEFF/, ''));
  root.walkAtRules('import', rule => rule.remove());
  return root.toString();
};
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  const page = await browser.newPage();
  await page.route('**/*', route => route.abort());
  result.probes = {};
  for (const [name, styles] of Object.entries({elements: clean(css), legacy: clean(legacy), legacyThenElements: clean(legacy) + clean(css), elementsThenLegacy: clean(css) + clean(legacy), designRootRuleThenElements: 'html { font-size:87.5%; }' + clean(css)})) {
    await page.setContent('<!doctype html><html><head></head><body><div id="spacing" class="p-2 gap-2">Spacing</div><div id="size" class="h-8 text-sm">Size</div><h2 id="heading" class="text-sm">Heading</h2><div style="font-size:16px"><div id="wrappedSize" class="h-8 text-sm">Wrapped</div></div></body></html>');
    await page.addStyleTag({content: styles});
    result.probes[name] = await page.evaluate(() => Object.fromEntries(['html','#spacing','#size','#heading','#wrappedSize'].map(selector => {
      const s = getComputedStyle(document.querySelector(selector));
      return [selector, {fontSize:s.fontSize, height:s.height, padding:s.padding,gap:s.gap}];
    })));
  }
} finally { await browser.close(); }
const output = process.argv[4] ?? '/private/tmp/gecko-css-audit.json';
await fs.writeFile(output, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ output, overlapCount: result.overlapCount, naivePrefix: result.naivePrefix }, null, 2));
