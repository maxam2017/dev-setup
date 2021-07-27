import { chfish } from './utils';

export default async function git() {
  const $ = await chfish();

  // git config
  let resp = await fetch(
    'https://gist.githubusercontent.com/maxam2017/e519284bd4bf5f941ad4679b8cf34499/raw/afd89bc8885ca6fe147b0b2587c46cd6628274e9/.gitconfig',
  );
  if (resp.ok) {
    let gitConfig = await resp.text();
    await $`echo ${gitConfig} > ~/.gitconfig`;
  }

  $`git config --global user.name "${process.env.GIT_USER_NAME}"`;
  $`git config --global user.email "${process.env.GIT_USER_EMAIL}"`;
}
