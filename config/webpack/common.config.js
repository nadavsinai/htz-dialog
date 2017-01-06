const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
  entry: {
    'lib': [
      './src/index.js'
    ]
  },
  node: {
    global: true,
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // test: /\.js$/, loader: 'eslint-loader', enforce: 'pre'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$/,
        loader: 'file',  // can replace with  loader: 'url?limit=10000' to make webpack inline assets into dataUrl up to the size limie
      }
    ]
  },
  plugins: [new LodashModuleReplacementPlugin()]
};
