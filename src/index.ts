/// <reference path="./index.d.ts" />

import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as MemoryFS from 'memory-fs';
import * as childProcess from 'child_process';
import {WFSConfigInterface} from './index.d';
import processConfig from './process-config';

declare const __non_webpack_require__: (path: string) => any;
const userDir = path.resolve( process.cwd() );
const userConfigPath = path.join( userDir, 'webpack.fullstack.js' );
const userConfig = __non_webpack_require__( userConfigPath );
const processedConfig = processConfig( userConfig, userDir );
const opts = {
  outputClient: process.argv[2] === '--output-client' ? true : false
};

export {
  opts,
  userDir,
  userConfigPath,
  userConfig,
  processedConfig
};
