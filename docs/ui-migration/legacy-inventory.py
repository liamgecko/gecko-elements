#!/usr/bin/env python3
"""Read-only static inventory. Optional positional source root and output JSON."""
from pathlib import Path
import re
import json
import sys
from collections import Counter

root = Path(sys.argv[1] if len(sys.argv) > 1 else '/Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src')
output = Path(sys.argv[2] if len(sys.argv) > 2 else '/private/tmp/gecko-legacy-inventory.json')
sources = sorted(p for p in root.rglob('*') if p.suffix in {'.jsx', '.tsx', '.js', '.ts'})
pattern = re.compile(r'^import\s+((?:[^;\n]|\n(?!(?:import|export)\b))*?)\s+from\s+[\'"]([^\'"]+)[\'"]', re.M)

def production(path):
    return '.test.' not in path.name and '__mocks__' not in path.parts and not path.name.endswith('.d.ts')

imports = []
for path in sources:
    source = path.read_text()
    for match in pattern.finditer(source):
        imports.append({
            'file': str(path),
            'relative_file': str(path.relative_to(root)),
            'line': source.count('\n', 0, match.start()) + 1,
            'bindings': match[1].strip(),
            'specifier': match[2],
            'production': production(path),
        })
rb = [item for item in imports if item['specifier'] == 'react-bootstrap' or item['specifier'].startswith('react-bootstrap/')]
rb_files = sorted({item['file'] for item in rb})
families = Counter()
for item in rb:
    if item['specifier'] != 'react-bootstrap':
        family = item['specifier'].removeprefix('react-bootstrap/')
        families[family] += 1
    else:
        bindings = item['bindings'].strip('{} \n')
        for binding in bindings.split(','):
            original = binding.strip().split(' as ')[0].strip()
            if original:
                families[original] += 1
wrapper_reach = {}
for name in ['Buttons', 'Form', 'ListView', 'Modal', 'Drawer', 'Dropdown', 'Card', 'Ui']:
    values = [item for item in imports if re.search(r'/' + name + r'(?:/index(?:\.[jt]sx?)?)?$', item['specifier']) and (name == 'Ui' or '/Ui/' in item['specifier'])]
    wrapper_reach[name] = {
        'all_file_count': len({item['file'] for item in values}),
        'production_file_count': len({item['file'] for item in values if item['production']}),
        'files': sorted({item['file'] for item in values}),
        'production_files': sorted({item['file'] for item in values if item['production']}),
    }
class_literals = {}
for token in ['d-flex', 'p-2', 'p-3', 'p-4', 'm-0', 'gap-2', 'gap-3', 'border', 'rounded', 'text-primary', 'text-secondary', 'shadow-sm', 'position-relative']:
    occurrences = []
    for path in sources:
        if not production(path):
            continue
        classes = re.findall(r'className\s*=\s*[\'"]([^\'"]*)[\'"]', path.read_text())
        count = sum(value.split().count(token) for value in classes)
        if count:
            occurrences.append({'file': str(path), 'occurrences': count})
    class_literals[token] = {'occurrences': sum(item['occurrences'] for item in occurrences), 'file_count': len(occurrences), 'files': occurrences}
result = {
    'root': str(root),
    'methodology': {
        'source_extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'scan': 'Recursive App/src only; does not traverse node_modules or generated output outside src.',
        'import_pattern': pattern.pattern,
        'import_definition': "Anchored static import ... from 'specifier' declarations, including multiline named imports. Excludes dynamic import(), side-effect-only imports, re-exports, require(). Regex inventory, not a full AST parser; inspect per-import records for auditability.",
        'all_counts': 'Include tests, mocks and .d.ts declaration files.',
        'production_definition': 'Exclude file names containing .test., paths containing a __mocks__ segment, and names ending .d.ts.',
        'wrapper_reach': 'Distinct importing files matching a specifier ending /Ui/NAME or /Ui/NAME/index with optional JS/TS extension on index; Ui barrel similarly ends /Ui or /Ui/index. Excludes nested paths below named wrapper. Counts overlap, do not sum.',
        'family_definition': 'Each subpath import declaration counted once under its react-bootstrap subpath; grouped package-root imports split into original imported binding names before alias. Type import esm/types reported separately. Trailing comma empty binding excluded.',
        'class_literals': 'Production quoted className assignments only. Excludes template strings, expressions and object className properties; lower bound. Does not establish actual generated selector presence or runtime frequency.',
        'limits': 'Counts measure files and static import declarations, not routes, rendered instances or migration effort. No legacy mutations or runtime tests.'
    },
    'totals': {
        'source_files': len(sources),
        'production_source_files': sum(production(path) for path in sources),
        'test_files': sum('.test.' in path.name for path in sources),
        'css_scss_files': len([path for path in root.rglob('*') if path.suffix in {'.scss', '.css'}]),
        'react_bootstrap_import_statements': len(rb),
        'react_bootstrap_import_files': len(rb_files),
        'react_bootstrap_production_import_statements': sum(item['production'] for item in rb),
        'react_bootstrap_production_import_files': len({item['file'] for item in rb if item['production']}),
        'react_bootstrap_import_files_within_ui': sum('/Components/Ui/' in path for path in rb_files),
        'react_bootstrap_import_files_outside_ui': sum('/Components/Ui/' not in path for path in rb_files),
    },
    'react_bootstrap_imports': rb,
    'react_bootstrap_families': dict(sorted(families.items(), key=lambda pair: (-pair[1], pair[0]))),
    'wrapper_reach': wrapper_reach,
    'class_literals': class_literals,
}
output.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'output': str(output), 'totals': result['totals'], 'wrapper_reach': {name: {key: value[key] for key in ['all_file_count', 'production_file_count']} for name, value in wrapper_reach.items()}, 'families': result['react_bootstrap_families']}, indent=2))
