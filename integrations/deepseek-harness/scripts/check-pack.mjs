import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';
const dir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts', dir], { cwd: dir, encoding: 'utf8', timeout: 90_000, maxBuffer: 1024 * 1024 }))[0];
const names = manifest.files.map((file) => file.path).sort();
assert.deepEqual(names, ['README.md', 'cordis.patch.yml', 'package.json'], `Unexpected bundle archive contents: ${names}`);
console.log(`Verified ${manifest.filename}: ${names.join(', ')}`);
