import {readdir, readFile, writeFile, mkdir, copyFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';

// 使用例: node scripts/import-notion.mjs C:/path/to/shisha_notion_bkup
// 再実行すると docs と移行元の添付ファイルを上書きします。
const source = process.argv[2];
if (!source) throw new Error('Notion バックアップのディレクトリを指定してください。');
const root = path.resolve(import.meta.dirname, '..');
const pages = [
  {id: '7e840aedd38948b888ba3bfca937a7d9', slug: 'intro', title: 'このアセットについて', description: 'mikinel Shisha System の概要、モードの違い、用語とサンプルワールド。'},
  {id: '06379da24d4a4c4ca408f463ac017a82', slug: 'basic', title: '導入方法（Basic モード）', description: 'Basic モードのインポート、Prefab の配置、煙の色の設定と動作確認。'},
  {id: '4c591cbdc13a4804b9c07bc236d41ed3', slug: 'advanced', title: '導入方法（Advanced モード）', description: 'Advanced モードの各パーツの配置、炭とフレーバの設定、VR での動作確認。'},
  {id: '96795587e01e4a138844ec85477c8e70', slug: 'custom-design', title: 'カスタムデザインシーシャ作成手順', description: 'オリジナルモデルの各 Unit と、Basic・Advanced 用 Prefab の作成手順。'},
];
const entries = await readdir(source);
const report = {pages: [], assets: []};
const sha256 = buffer => createHash('sha256').update(buffer).digest('hex');

// Notion の入れ子の aside を読み、ナビゲーションだけを除去します。
function convertAsides(input, headingLevel = 3) {
  let output = '';
  let position = 0;
  while (position < input.length) {
    const start = input.indexOf('<aside>', position);
    if (start === -1) {
      output += adjustHeadings(input.slice(position), headingLevel);
      break;
    }
    output += adjustHeadings(input.slice(position, start), headingLevel);
    const tags = /<aside>|<\/aside>/g;
    tags.lastIndex = start + 7;
    let depth = 1;
    let end;
    while (depth && (end = tags.exec(input))) depth += end[0] === '<aside>' ? 1 : -1;
    if (depth) throw new Error('閉じられていない aside があります。');
    const content = input.slice(start + 7, end.index).trim();
    const [first, ...rest] = content.split('\n');
    let body = rest.join('\n').trim().replace(/^---\s*/, '');
    if (!first.startsWith('📎')) {
      if (/^[🧱🧊🟢🟠]/u.test(first)) {
        const title = first.replace(/^[^\p{L}\p{N}]+/u, '');
        output += `\n\n${'#'.repeat(headingLevel)} ${title}\n\n${convertAsides(body, headingLevel + 1)}\n\n`;
      } else {
        const type = first.startsWith('⚠') ? 'warning' : /^[💡🌟]/u.test(first) ? 'tip' : 'info';
        const label = type === 'warning' ? '注意' : type === 'tip' ? 'ヒント' : '補足';
        const text = content.replace(/^[^\p{L}\p{N}*`(]+/u, '');
        const converted = convertAsides(text, headingLevel);
        const fence = ':'.repeat(Math.max(3, ...Array.from(converted.matchAll(/^(:+)/gm), m => m[1].length + 1)));
        output += `\n\n${fence}${type}[${label}]\n\n${converted}\n\n${fence}\n\n`;
      }
    }
    position = tags.lastIndex;
  }
  return output;
}

function adjustHeadings(text, headingLevel) {
  return text.replace(/^### /gm, `${'#'.repeat(Math.min(6, headingLevel))} `);
}

await mkdir(path.join(root, 'docs'), {recursive: true});
for (const page of pages) {
  const filename = entries.find(name => name.endsWith(`${page.id}.md`));
  if (!filename) throw new Error(`ページが見つかりません: ${page.id}`);
  const original = await readFile(path.join(source, filename), 'utf8');
  let content = original.replace(/^# .*\r?\n/, '').replace(/\r\n/g, '\n');
  const folder = filename.replace(` ${page.id}.md`, '');
  const assets = await readdir(path.join(source, folder));
  for (const [index, asset] of assets.sort().entries()) {
    const extension = path.extname(asset).toLowerCase();
    const name = asset === 'Shisha_Reference.fbx' ? asset
      : page.slug === 'intro' ? (asset.startsWith('vlcsnap') ? 'preview.png' : 'parts.png')
      : `figure-${String(index + 1).padStart(2, '0')}${extension}`;
    const target = extension === '.fbx' ? `/downloads/${name}` : `/img/notion/${page.slug}/${name}`;
    const destination = path.join(root, 'static', target);
    await mkdir(path.dirname(destination), {recursive: true});
    await copyFile(path.join(source, folder, asset), destination);
    // Notion は括弧をエスケープせず、日本語と空白をエンコードします。
    const encoded = [folder, asset].map(encodeURIComponent).join('/');
    content = content.split(encoded).join(target);
    const buffer = await readFile(destination);
    report.assets.push({source: `${folder}/${asset}`, target: `static${target}`, bytes: buffer.length, sha256: sha256(buffer)});
  }
  content = convertAsides(content);
  for (const linked of pages) {
    content = content.replace(new RegExp(`https://app\\.notion\\.com/p/[^\\s)]*${linked.id}[^\\s)]*`, 'g'), `./${linked.slug}.md`);
  }
  content = content.replace(/Advenced|Advamced|Advanceモード/g, 'Advancedモード')
    .replaceAll('Advancedモードモード', 'Advancedモード')
    .replaceAll('小階層', '子階層').replaceAll('UseGraviry', 'UseGravity');
  content = content.replace(/^最終更新日時:.*\n?/gm, '');
  // 原稿内の明らかな転記ミスを修正。シーン名は実プロジェクトで存在を確認済み。
  if (page.slug === 'advanced') {
    content = content.replace('BasicモードのShishaが配置されたサンプルシーン', 'AdvancedモードのShishaが配置されたサンプルシーン')
      .replace('ShishaDemo_Basic.unity', 'ShishaDemo_Advanced.unity');
  }
  if (page.slug === 'intro') {
    const summary = content.match(/^:::info\[補足\]\s+\*\*tl;dr \(忙しい人のための導入方法\)\*\*\s+---\s+([\s\S]*?)\n:::/m);
    if (!summary) throw new Error('クイックインストールに移動する手順が見つかりません。');
    const quickContent = '---\nid: quick-installation\ntitle: クイックインストール\nsidebar_label: クイックインストール\ndescription: Basic・Advanced モードの導入に必要な手順をまとめています。\n---\n\n'
      + summary[1].trim()
      + '\n\n詳しい手順は、[Basic モードの導入方法](./basic.md)・[Advanced モードの導入方法](./advanced.md)をご覧ください。\n';
    await writeFile(path.join(root, 'docs', 'quick-installation.md'), quickContent, 'utf8');
    report.pages.push({source: filename, target: 'docs/quick-installation.md', images: 0, sourceSha256: sha256(Buffer.from(original))});
    content = content.replace(summary[0], '')
      .replace(/^## このアセットについて\n+/m, '')
      .replace('\n導入方法\n', '\n導入方法\n\n[クイックインストール](./quick-installation.md)\n');
    content = content.replace('![vlcsnap-2024-04-13-03h33m02s288.png]', '![VRChatでシーシャを楽しむ様子]')
      .replace('![アセット 1.png]', '![シーシャの各パーツの名称]')
      .replace('| シーシャ本体 | トップとヒートシステムで作られた煙を水を介してホースに流す部分。 |\n| --- | --- |', '| 用語 | 説明 |\n| --- | --- |\n| シーシャ本体 | トップとヒートシステムで作られた煙を水を介してホースに流す部分。 |');
  }
  if (page.slug === 'custom-design') {
    content = content.replace('#### h. Prefabの保存', '#### i. Prefabの保存');
    const sections = content.split(/(?=^#### .+Prefabの作成$)/m);
    content = sections.map(section => {
      if (section.startsWith('#### ヒートシステムPrefab')) {
        return section.replace('b. トップUnitの配置', 'b. ヒートシステムUnitの配置')
          .replace('先ほど作成したトップUnitを配置します。', '先ほど作成したヒートシステムUnitを配置します。')
          .replace('トップ自体の当たり判定', 'ヒートシステム自体の当たり判定');
      }
      if (section.startsWith('#### フタPrefab')) {
        return section.replace('a. テンプレートからヒートシステムのPrefabを作成する', 'a. テンプレートからフタのPrefabを作成する')
          .replace('d. 当たり判定の位置調整', 'c. 当たり判定の位置調整')
          .replace('e. Prefabの保存', 'd. Prefabの保存')
          .replace('トップ自体の当たり判定', 'フタ自体の当たり判定');
      }
      if (section.startsWith('#### シーシャ本体Prefab')) {
        return section.replace('トップ自体の当たり判定', 'シーシャ本体の当たり判定');
      }
      return section;
    }).join('');
  }
  content = content.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  const frontmatter = `---\nid: ${page.slug}\ntitle: ${page.title}\nsidebar_label: ${page.title}\ndescription: ${page.description}\n---\n\n`;
  await writeFile(path.join(root, 'docs', `${page.slug}.md`), frontmatter + content + '\n', 'utf8');
  const originalImages = [...original.matchAll(/!\[/g)].length;
  const migratedImages = [...content.matchAll(/!\[/g)].length;
  if (originalImages !== migratedImages) throw new Error(`画像数が一致しません: ${page.slug}`);
  if (/app\.notion\.com|<\/?aside>|\]\([^\n]*%[0-9A-F]{2}/i.test(content)) throw new Error(`未変換のリンクがあります: ${page.slug}`);
  report.pages.push({source: filename, target: `docs/${page.slug}.md`, images: migratedImages, sourceSha256: sha256(Buffer.from(original))});
}
await writeFile(path.join(root, 'scripts', 'notion-import-manifest.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`${report.pages.length} ページ、${report.assets.length} 添付ファイルを移行しました。`);
