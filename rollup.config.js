import fs from 'fs'
import path from 'path'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const plugins = [
	vue({
    css: true,
    completeTemplate: true
  }),
  json(),
  nodeResolve(),
  postcss({
    extract: true
  })
]

const isProduction = process.env.NODE_ENV === 'production'

const source = path.resolve(__dirname, '.', 'packages')

if (isProduction) {
  plugins.push(terser())
}

const targets = fs.readdirSync(source)
  .filter(dir => fs.existsSync(path.resolve(source, dir, 'package.json')))
  .map(dir => {
    const context = require(path.resolve(source, dir, 'package.json'), 'utf8')
    return {
      input: path.resolve(source, dir, 'index.js'),
      output: [
        {
          exports: 'auto',
          file: path.resolve(source, dir, context.main),
          format: 'cjs'
        },
        {
          exports: 'auto',
          file: path.resolve(source, dir, context.module),
          format: 'es'
        }
      ],
      plugins: plugins,
    }
  })


module.exports = targets
