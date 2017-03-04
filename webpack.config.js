const fs = require('fs');
const webpack = require('webpack');

var externals = {};

fs.readdirSync('node_modules')
  .filter( (x) => ['.bin'].indexOf(x) === -1 )
  .forEach( (mod) => externals[mod] = 'commonjs ' + mod );

module.exports = {
  entry: './src/index.ts',

  output: {
    path: './dist',
    filename: 'index.js'
  },

  target: 'node',

  node: {
    process: true,
    path: true
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