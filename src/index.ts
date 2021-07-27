#!/usr/bin/env node

import fish from './fish';
import kube from './kube';
import github from './github';
import git from './git';

async function main() {
  await fish();
  await kube();
  await github();
  await git();
}

main();
