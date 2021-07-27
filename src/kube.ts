import { chfish, notify } from './utils';

export default async function kube() {
  const $ = await chfish();

  // install gcloud cli
  await $`curl https://sdk.cloud.google.com | bash`;

  while ((await $`gcloud auth login`).exitCode !== 0) {}

  notify(
    `🔥  Google Cloud Login Successfully!`,
    `You are now authenticated with the Google Cloud SDK!`,
  );
  $`gcloud config set project ${process.env.GCLOUD_PORJECT_NAME}`;
  await $`gcloud components install kubectl`;
  await $`gcloud container clusters get-credentials ${process.env.GCLOUD_CLUSTER_NAME} --zone asia-east1-a --project ${process.env.GCLOUD_PORJECT_NAME}`;

  // install kubectx
  if ((await $`brew -v`.exitCode) !== 0) {
    await $`curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash /dev/stdin -c`;
  }

  await $`brew install kubectx`;
}
