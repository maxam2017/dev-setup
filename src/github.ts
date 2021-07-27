import { chalk } from 'zx';
import { chfish, linkify } from './utils';

export default async function github() {
  const $ = await chfish();

  // GitHub SSH keys setting
  if ((await $`cat ~/.ssh/id_rsa.pub`.exitCode) !== 0) {
    await $`ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<<y >/dev/null 2>&1`;
  }

  const desc = `Copy below public key and paste into ${chalk.hex('#006aa6')(
    linkify('GitHub SSH keys Setting', 'https://github.com/settings/ssh/new'),
  )}`;
  const key = chalk.cyan(await $`cat ~/.ssh/id_rsa.pub`);
  console.log(desc + '\n' + key);
}
