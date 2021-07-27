import { $ } from 'zx';

/**
 * @description fish first cmd
 */
export const chfish = async () => {
  const res = await $`which fish`;
  if (res.exitCode !== 0) {
    $.shell = res.toString();

    $.quote = arg => {
      if (/^[a-z0-9_.-/]+$/i.test(arg)) {
        return arg;
      }
      return arg
        .replace(/\\/g, '\\\\')
        .replace(/\f/g, '\\f')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\v/g, '\\v')
        .replace(/\0/g, '\\0');
    };
  }

  return $;
};

/**
 * @description macOS only
 */
export const notify = (title = '', content = '') => {
  const cmd = `osascript -e 'display notification "${content}" with title "${title}"'`;
  return $`${cmd}`;
};

/**
 * @description linkify by ascii hyper link
 */
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

export const linkify = (text: string, url: string) => {
  return [OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
};
