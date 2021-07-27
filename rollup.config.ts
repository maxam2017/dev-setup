import typescript from '@rollup/plugin-typescript';
import shebang from 'rollup-plugin-preserve-shebang';
import { terser } from 'rollup-plugin-terser';

/**
 * https://github.com/rollup/plugins/tree/master/packages/typescript
 */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
  },
  plugins: [typescript(), shebang(), terser()],
  external: ['zx'],
};
