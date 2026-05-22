// Cross-post an article to all configured platforms (Dev.to + Hashnode).
//
// Runs each sub-script in parallel. Continues if one fails so a Dev.to
// outage doesn't block the Hashnode push (and vice versa).
//
// Usage:
//   npm run crosspost -- <slug>

import { spawn } from 'node:child_process';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run crosspost -- <slug>');
  process.exit(1);
}

function runScript(name, script) {
  return new Promise((resolve) => {
    const child = spawn('node', [script, slug], {
      stdio: 'inherit',
      env: process.env,
    });
    child.on('close', (code) => {
      resolve({ name, code });
    });
  });
}

const results = await Promise.all([
  runScript('Dev.to', 'scripts/crosspost-devto.mjs'),
  runScript('Hashnode', 'scripts/crosspost-hashnode.mjs'),
]);

console.log('\n=== Crosspost summary ===');
let anyFailed = false;
for (const r of results) {
  if (r.code === 0) {
    console.log(`  ✅ ${r.name}`);
  } else {
    console.log(`  ❌ ${r.name} (exit ${r.code})`);
    anyFailed = true;
  }
}

process.exit(anyFailed ? 1 : 0);
