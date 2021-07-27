import { $ } from 'zx';

export default async function fish() {
  if ((await $`brew -v`.exitCode) !== 0) {
    await $`curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash /dev/stdin -c`;
  }

  // install fish
  await $`brew install fish`;

  // install oh-my-fish plugin
  await $`curl -L https://get.oh-my.fish | fish`;
  $`omf install spacefish`;

  // nvm.fish
  await $`curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher`;
  $`fisher install jorgebucaran/nvm.fish`;

  await $`fish`;
}
