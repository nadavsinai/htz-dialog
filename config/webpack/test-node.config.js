
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config.js');
const nodeExternals = require('webpack-node-externals');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const testGlobals = require('./eslint-test-globals.js');
process.env.BABEL_ENV='test';
module.exports = webpackMerge(webpackCommon, {
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  target: 'node',
  plugins: [new LoaderOptionsPlugin({
    minimize: false,
    debug: false,
    options: {
      eslint: {
        globals: testGlobals
      }
    }
  })]
});
