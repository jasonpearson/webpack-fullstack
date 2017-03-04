

// PROCESS STARTED BY WEBPACK-GO CLI

const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const mfs = new MemoryFS();


// PROCESS CONFIG FILE PROVIDED BY USER
const configFile = fs.readFileSync('../../PROJECT_DIRECTORY/webpack.go.js');
const config = processWebpackGoConfig(configFile);
const compiler = require('webpack')(config.server)
compiler.outputFileSystem = mfs;

let child;

compiler.watch(null, startAppServer);





function processWebpackGoConfig(config) {

  var nodeModules = {};

  nodeModules['react-dom/server'] = 'commonjs react-dom/server'

  fs.readdirSync('node_modules')
    .filter( (x) => ['.bin'].indexOf(x) === -1 )
    .forEach( (mod) => nodeModules[mod] = 'commonjs ' + mod );


  // ADD TO SERVER CONFIG
  // externals: nodeModules,
  // target: 'node',
  // node: {
  //   __dirname: true
  // }


  return {
    server,
    client
  }
};



function startAppServer(err, stats) => {
  if (err) {
    return console.log(err)
  }

  if (child) {
    child.kill();
  }

  console.log('COMPILED')

  const serverScript = mfs.readFileSync(stats.compilation.assets['server.bundle.js'].existsAt)

  child = spawn('node', ['./src/server/vm.js', serverScript]);

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  child.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });

}
