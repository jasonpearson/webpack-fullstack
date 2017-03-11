/// <reference path="./index.d.ts" />

import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as MemoryFS from 'memory-fs';
import * as childProcess from 'child_process';

import {WFSConfigInterface} from './index.d';
import processConfig from './process-config';

declare const __non_webpack_require__: (path: string) => any;

const devDir = path.resolve( process.cwd() );
const preConfigPath = path.join( devDir, 'webpack.fullstack.js' );
const preConfig = __non_webpack_require__( preConfigPath );
const config = processConfig( preConfig, devDir );

const compiler = webpack( config.server );
const mfs = new MemoryFS();
compiler.outputFileSystem = mfs;

fs.writeFile(
  path.resolve(devDir, 'node_modules/webpack-fullstack/dist/index.js'),
  `
    const configAsString = '${JSON.stringify(config.client, (key, val) =>
      val instanceof RegExp ? '_PxEgEr_' + val.toString().slice(2) : val )}';

    module.exports = JSON.parse(configAsString, (key, val) =>
      typeof val === 'string' && val.substring(0, 8) === '_PxEgEr_' ? new RegExp( '${String.raw`\\`}' + val.slice(8, -1)) : val);
  `,
  () => console.log('created client config')
);

let child;


compiler.watch(null, function startAppServer( err, stats: any ) {
  if (err) {
    // return console.log(err);
    console.log('err');
  }

  if (child) {
    child.kill();
  }

  console.log('COMPILED');

  const serverScriptPath = stats.compilation.assets['server.bundle.js'].existsAt;
  const serverScript = mfs.readFileSync(serverScriptPath);
  const vmPath = path.resolve(devDir, 'node_modules/webpack-fullstack/dist/vm.js');
  const serverEntryPath = path.resolve(devDir, 'src/server.ts');

  child = childProcess.spawn('node', [
    vmPath,
    serverScript,
    serverEntryPath
  ]);

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  child.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });

});
