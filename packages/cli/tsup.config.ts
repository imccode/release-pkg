import { defineConfig } from 'tsup'

export default defineConfig([
  {
    clean: true,
    entry: {
      index: 'src/index.ts'
    },
    format: 'esm',
    dts: true
  },
  {
    entry: {
      index: 'src/index.ts',
      cli: 'src/cli.ts'
    },
    noExternal: ['chalk-animation', 'execa'],
    format: ['cjs']
  }
])
