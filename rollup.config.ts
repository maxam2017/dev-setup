import typescript from '@rollup/plugin-typescript';

/**
 * https://github.com/rollup/plugins/tree/master/packages/typescript
 */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
  },
  plugins: [typescript()],
};
