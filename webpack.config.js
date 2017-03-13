const fs = require('fs');
const webpack = require('webpack');
const path = require('path');

var externals = {};

fs.readdirSync('node_modules')
  .filter( (x) => ['.bin'].indexOf(x) === -1 )
  .forEach( (mod) => externals[mod] = 'commonjs ' + mod );

module.exports = {
  entry: {
    'webpack-fullstack': './src/index.ts',
    'vm': './src/vm.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },

  target: 'node',

  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },

  externals,

  resolve: {
    extensions: ['.js', '.ts']
  },

  devtool: 'source-map',

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
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
        
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true
    })
  ]
};