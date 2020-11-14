import { createBabelInputPluginFactory } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import filesize from 'rollup-plugin-filesize'
import size from 'rollup-plugin-sizes'
import visualize from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const dev = !!process.env.DEV
const analyzeBundle = !!process.env.ANALYZE_BUNDLE
const minimize = !!process.env.MINIMIZE

const babelPluginForUMDBundle = createBabelInputPluginFactory()
const babelPluginForESMBundle = createBabelInputPluginFactory()
const babelPluginOptions = {
  presets: [['@babel/preset-env', { modules: false }]],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
}
const servePluginOptions = {
  contentBase: ['dist', 'public'],
  host: '0.0.0.0',
  port: '8080',
}
const livereloadPluginOptions = { watch: ['dist', 'public'] }
const visualizePluginOptions = { open: true }

const plugins = [
  size(),
  filesize(),
  dev && serve(servePluginOptions),
  dev && livereload(livereloadPluginOptions),
  analyzeBundle && visualize(visualizePluginOptions),
]

const UMDBundle = {
  input: 'src/hls-observer.js',
  output: [
    {
      name: 'HLSObserver',
      file: pkg.main,
      format: 'umd',
    },
    minimize && {
      name: 'HLSObserver',
      file: 'dist/hls-observer.min.js',
      format: 'iife',
      plugins: terser(),
    },
  ],
  plugins: [
    babelPluginForUMDBundle(babelPluginOptions),
    resolve(),
    commonjs(),
    ...plugins,
  ],
}

const ESMBundle = {
  input: 'src/hls-observer.js',
  external: [/@babel\/runtime/],
  output: {
    name: 'HLSObserver',
    file: pkg.module,
    format: 'esm',
  },
  plugins: [
    babelPluginForESMBundle({
      ...babelPluginOptions,
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime',
    }),
    ...plugins,
  ],
}

export default [UMDBundle, ESMBundle]
