import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: { index: 'src/index.ts' },
  plugins: [
    nodeResolve({ moduleDirectories: ['node_modules'] }),
    commonjs({ include: [/\/node_modules\//], extensions: ['.ts', '.js'] }),
    json(),
    typescript({ sourceMap: true })
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true
  }
})
