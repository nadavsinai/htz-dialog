const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const webpackCommon = require('./common.config.js');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkgName = require('../getPackageName');


module.exports = function (env) {
  return webpackMerge(webpackCommon, {
    bail: true,
    devtool: 'source-map',
    output: {
      library: pkgName.camelCase,
      libraryTarget: 'umd',
      path: path.resolve(env.root, 'dist'),
      filename: '[name].min.js',
      sourceMapFilename: '[name].map',
      umdNamedDefine: true,
      chunkFilename: '[name]-[id]-chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader?modules&localIdentName=[name]__[local]&minimize&sourceMap&importLoaders=2',
              'postcss-loader',
              'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
            ]
          })
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{ from: './static/test.*', to: '', flatten: true }]),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(env.root, 'static/index.html'),
        favicon: path.resolve(env.root, 'static/favicon.ico'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(env.root),
        exclude: ['.gitignore', '.npmignore']
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new ExtractTextPlugin('lib.css'),
      new UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        },
        sourceMap: true
      }),
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: '/',
          sassLoader: {
            includePaths: [path.resolve(__dirname, '../src')]
          },
          postcss: function () {
            return [autoprefixer];
          }
        }
      })
    ],
    externals: [{
      'jquery': "jQuery"
    }],
  })
};
