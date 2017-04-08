/// <reference path="./index.d.ts" />

import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as MemoryFS from 'memory-fs';
import * as childProcess from 'child_process';
import {WFSConfigInterface} from './index.d';
import processConfig from './process-config';

declare const __non_webpack_require__: (path: string) => any;
const dev = process.argv[2] === '--dev' ? true : false;
const devDir = path.resolve( process.cwd() );
const fullstackConfigPath = path.join( devDir, 'webpack.fullstack.js' );
const fullstackConfig = __non_webpack_require__( fullstackConfigPath );
const config = processConfig( fullstackConfig, devDir );
const serverCompiler = webpack( config.server );
const mfs = new MemoryFS();

if (dev) {
  serverCompiler.outputFileSystem = mfs;
}

fs.writeFile(
  path.resolve(devDir, 'node_modules/webpack-fullstack/dist/webpack.client.config.js'),
  `
    // encode regex values as strings
    const configAsString = '${JSON.stringify(config.client, (key, val) =>
      val instanceof RegExp ? '_PxEgEr_' + val.toString().slice(2) : val )}';

    // decode strings into regex values
    module.exports = JSON.parse(configAsString, (key, val) =>
      typeof val === 'string' && val.substring(0, 8) === '_PxEgEr_' ? new RegExp( '${String.raw`\\`}' + val.slice(8, -1)) : val);
  `,
  () => console.log('webpack client config created.')
);

let serverProcess;

console.log('webpack server is compiling and watching for changes...');

serverCompiler.watch({
  // TODO: modify ignored to include all client files, but no server files
  ignored: fullstackConfig.client.entry.slice( 0, fullstackConfig.client.entry.lastIndexOf('/') )
}, function startAppServer( err, stats: any ) {
  if (err) {
    console.log('webpack server failed.');
    return console.log(err);
  }

  console.log('webpack server compiled succesfully.');

  if (serverProcess) {
    serverProcess.kill();
  }

  if (dev) {
    const serverScriptPath = stats.compilation.assets['server.bundle.js'].existsAt;
    const serverScript = mfs.readFileSync(serverScriptPath);
    const vmPath = path.resolve(devDir, 'node_modules/webpack-fullstack/dist/vm.js');
    const serverEntryPath = path.resolve(devDir, 'src/server.ts');

    serverProcess = childProcess.spawn('node', [
      vmPath,
      serverScript,
      serverEntryPath
    ]);

    serverProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    serverProcess.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    serverProcess.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
    });
  } else {
    process.exit();
  }
});
