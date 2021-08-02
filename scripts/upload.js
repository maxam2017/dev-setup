#!/usr/bin/env node

import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, '../.env.local') });

const beatifyStringify = obj => JSON.stringify(obj, null, 2);

const genPkg = () => {
  const json = fs.readFileSync(`${__dirname}/../package.json`);
  const pkg = JSON.parse(json);
  return beatifyStringify({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    type: pkg.type,
    bin: './index.js',
    dependencies: pkg.dependencies,
  });
};

(async () => {
  try {
    const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });
    const gist = await octokit.gists
      .get({ gist_id: process.env.GIST_ID })
      .catch(error => console.error(`Unable to update gist\n${error}`));
    if (!gist) return;

    await octokit.gists.update({
      gist_id: process.env.GIST_ID,
      description: 'pre-built script for maxam2017/dev-setup',
      files: {
        'dev-setup 🚀': {
          filename: 'dev-setup 🚀',
          content: fs.readFileSync(`${__dirname}/../README.md`, 'utf8'),
        },
        'package.json': {
          filename: 'package.json',
          content: genPkg(),
        },
        'index.js': {
          filename: 'index.js',
          content: fs.readFileSync(`${__dirname}/../build/index.js`, 'utf8'),
        },
      },
    });
  } catch {}
})();
