const fs = require('fs');
const webpack = require('webpack');

var externals = {};

fs.readdirSync('node_modules')
  .filter( (x) => ['.bin'].indexOf(x) === -1 )
  .forEach( (mod) => externals[mod] = 'commonjs ' + mod );

module.exports = {
  entry: {
    index: './src/index.ts',
    vm: './src/vm.js'
  },

  output: {
    path: './dist',
    filename: '[name].js'
  },

  target: 'node',

  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: "mock",
    __dirname: "mock",
    setImmediate: true
  },

  externals,

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'eslint-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true
    })
  ]
};