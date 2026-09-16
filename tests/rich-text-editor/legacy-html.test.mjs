import assert from 'node:assert/strict';
import { test } from 'node:test';
import { preserveLegacyStyles } from '../../packages/ui/dist/lib/rich-text-editor-runtime.js';

function serialiseStyle(value) {
  let filter;
  preserveLegacyStyles({ serializer: { addNodeFilter(names, callback) {
    assert.equal(names, 'script,style');
    filter = callback;
  } } });
  const nodes = [{ firstChild: { value } }, {}, { firstChild: { value: '' } }];
  filter(nodes);
  return nodes[0].firstChild.value;
}

test('legacy CDATA wrappers are removed without changing email CSS', () => {
  const css = '.email { color: #123456; }\n@media screen { .email { width: 100%; } }';
  assert.equal(serialiseStyle(`/* <![CDATA[ */\n${css}\n/* ]]> */`), css);
});

test('ordinary styles and template tokens remain intact', () => {
  const css = '.email::before { content: "{{contact.first_name}} — café"; }';
  assert.equal(serialiseStyle(css), css);
});

test('empty legacy nodes and repeated serialisation are safe', () => {
  assert.equal(serialiseStyle(''), '');
  const css = '.email { font-family: "Arial", sans-serif; }';
  assert.equal(serialiseStyle(serialiseStyle(css)), css);
});
