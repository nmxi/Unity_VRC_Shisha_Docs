import {readFile, access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(path.join(import.meta.dirname, 'notion-import-manifest.json'), 'utf8'));
const assetTargets = new Set(manifest.assets.map(asset => '/' + asset.target.replace(/^static\//, '')));
const linkedAssets = new Set();
for (const asset of manifest.assets) {
  const data = await readFile(path.join(root, asset.target));
  assert.equal(data.length, asset.bytes, `${asset.target}: ファイルサイズが一致しません`);
  assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256, `${asset.target}: 元データと一致しません`);
}
for (const page of manifest.pages) {
  const text = await readFile(path.join(root, page.target), 'utf8');
  assert(!text.includes('\uFFFD'), `${page.target}: 文字化けの疑いがあります`);
  assert(!/app\.notion\.com|<\/?aside>/.test(text), `${page.target}: Notion の要素が残っています`);
  assert.equal([...text.matchAll(/!\[/g)].length, page.images, `${page.target}: 画像数が一致しません`);
  for (const [, href] of text.matchAll(/\]\(([^)\n]+)\)/g)) {
    if (/^https?:\/\//.test(href) || href.startsWith('#')) continue;
    const file = href.startsWith('/') ? path.join(root, 'static', href) : path.resolve(root, 'docs', href);
    await access(file);
    if (assetTargets.has(href)) linkedAssets.add(href);
  }
}
// Migrated assets can also be used by the homepage, outside Markdown documents.
for (const file of manifest.assetReferenceFiles ?? []) {
  const text = await readFile(path.join(root, file), 'utf8');
  for (const href of assetTargets) {
    if (text.includes(`'${href}'`) || text.includes(`"${href}"`)) linkedAssets.add(href);
  }
}
assert.equal(linkedAssets.size, assetTargets.size, 'ページから参照されていない添付ファイルがあります');
console.log(`移行検証成功: ${manifest.pages.length} ページ、${manifest.assets.length} 添付ファイル。リンク・画像数・SHA-256 一致を確認。`);
