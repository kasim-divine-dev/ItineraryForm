// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { readFileSync } from 'fs';
import json from '@rollup/plugin-json';

const pkg = JSON.parse(
    readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            inlineDynamicImports: true, // Add this line
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
            inlineDynamicImports: true, // Add this line
        },
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
    external: ['react', 'react-dom', 'cohere-ai', 'formdata-node'],
};