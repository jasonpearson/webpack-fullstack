import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import {WFSConfigInterface} from './index.d';

var serverDefaults = {
  target: 'node',
  node: {
    __dirname: true
  },
  externals : {},
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: true
    })
  ]
};

var clientDefaults = {

};

function processConfig(
  config: WFSConfigInterface,
  devDir: string
): any {

  fs.readdirSync( path.resolve(devDir, 'node_modules') )
    .filter( (x) => ['.bin'].indexOf(x) === -1 )
    .forEach( (m) => serverDefaults.externals[m] = 'commonjs ' + m );

  serverDefaults.externals['react-dom/server'] = 'commonjs react-dom/server';

  for (let key in config) {
    if (key === 'server') {
      config.server = {
        ...serverDefaults,
        ...config.server,
        devtool: 'inline-source-map'
      };

    } else if (key === 'client') {
      config.client = {
        ...clientDefaults,
        ...config.client
      };

    } else {
      config.server[key] = config[key];
      config.client[key] = config[key];
    }
  }

  return config;
};

export default processConfig;
