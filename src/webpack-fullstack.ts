import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import {processedConfig} from './index';

webpack([processedConfig.client, processedConfig.server], (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err || stats.hasErrors);
  }
  console.log(stats.toString());
});
