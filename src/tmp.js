

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

