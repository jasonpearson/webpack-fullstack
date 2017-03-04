import * as path from 'path';
import * as system from 'systemjs';
import * as fs from 'fs';

const config = fs.readFileSync( path.resolve(process.cwd(), 'webpack.fullstack.js') );

console.log(config.toString())