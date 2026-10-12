import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
// Production client modules (including gtag) must not overwrite the files
// watched by a running development server in .docusaurus.
const result = spawnSync(process.execPath, [
  require.resolve('@docusaurus/core/bin/docusaurus.mjs'),
  'build',
  ...process.argv.slice(2),
], {
  stdio: 'inherit',
  env: {...process.env, DOCUSAURUS_GENERATED_FILES_DIR_NAME: '.docusaurus-build'},
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
