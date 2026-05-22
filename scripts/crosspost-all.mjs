// Cross-post an article to all configured platforms.
//
// Each platform runs only when its env vars are present, so adding/removing
// a platform is a config change, not a code change. Per-platform failures
// log as warnings and don't block the others.
//
// Usage:
//   npm run crosspost -- <slug>
//
// Platforms wired today:
//   Dev.to    — requires DEVTO_API_KEY
//   Hashnode  — requires HASHNODE_PAT + HASHNODE_PUBLICATION_ID
//               (Hashnode API now requires Pro plan on the publication;
//                free publications get 401 — leave env vars unset to skip.)

import { spawn } from 'node:child_process';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run crosspost -- <slug>');
  process.exit(1);
}

const platforms = [
  {
    name: 'Dev.to',
    script: 'scripts/crosspost-devto.mjs',
    requiredEnv: ['DEVTO_API_KEY'],
  },
  {
    name: 'Hashnode',
    script: 'scripts/crosspost-hashnode.mjs',
    requiredEnv: ['HASHNODE_PAT', 'HASHNODE_PUBLICATION_ID'],
  },
];

function runScript(platform) {
  const missing = platform.requiredEnv.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    console.log(`⊘ Skipping ${platform.name} (missing env: ${missing.join(', ')})`);
    return Promise.resolve({ name: platform.name, code: -1, skipped: true });
  }
  return new Promise((resolve) => {
    const child = spawn('node', [platform.script, slug], {
      stdio: 'inherit',
      env: process.env,
    });
    child.on('close', (code) => {
      resolve({ name: platform.name, code, skipped: false });
    });
  });
}

const results = await Promise.all(platforms.map(runScript));

console.log('\n=== Crosspost summary ===');
let anyAttemptedFailed = false;
for (const r of results) {
  if (r.skipped) {
    console.log(`  ⊘  ${r.name} (skipped)`);
  } else if (r.code === 0) {
    console.log(`  ✅ ${r.name}`);
  } else {
    console.log(`  ⚠️  ${r.name} (exit ${r.code})`);
    anyAttemptedFailed = true;
  }
}

// Exit 0 even when one platform failed, AS LONG AS at least one succeeded.
// This means: if both fail (no platforms succeeded), we surface the error
// so CI catches it. If at least one succeeded, the run is "good enough."
const anySucceeded = results.some((r) => !r.skipped && r.code === 0);
if (!anySucceeded) {
  console.error('\n❌ All configured platforms failed.');
  process.exit(1);
}
process.exit(0);
