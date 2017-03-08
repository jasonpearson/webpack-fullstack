#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var fs = __webpack_require__(6);
var path = __webpack_require__(3);
var serverDefaults = {
    target: 'node',
    node: {
        __dirname: true
    },
    externals: {},
    plugins: []
};
var clientDefaults = {};
function processConfig(config, devDir) {
    fs.readdirSync(path.resolve(devDir, 'node_modules'))
        .filter(function (x) { return ['.bin'].indexOf(x) === -1; })
        .forEach(function (m) { return serverDefaults.externals[m] = 'commonjs ' + m; });
    serverDefaults.externals['react-dom/server'] = 'commonjs react-dom/server';
    for (var key in config) {
        if (key === 'server') {
            config.server = __assign({}, serverDefaults, config.server, { devtool: 'inline-source-map' });
        }
        else if (key === 'client') {
            config.client = __assign({}, clientDefaults, config.client);
        }
        else {
            config.server[key] = config[key];
            config.client[key] = config[key];
        }
    }
    return config;
}
;
exports["default"] = processConfig;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("memory-fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="./index.d.ts" />

exports.__esModule = true;
var path = __webpack_require__(3);
var webpack = __webpack_require__(5);
var MemoryFS = __webpack_require__(2);
var childProcess = __webpack_require__(1);
var process_config_1 = __webpack_require__(0);
var devDir = path.resolve(process.cwd());
var preConfigPath = path.join(devDir, 'webpack.fullstack.js');
var preConfig = require(preConfigPath);
var config = process_config_1["default"](preConfig, devDir);
var compiler = webpack(config.server);
var mfs = new MemoryFS();
compiler.outputFileSystem = mfs;
var child;
compiler.watch(null, function startAppServer(err, stats) {
    if (err) {
        // return console.log(err);
        console.log('err');
    }
    if (child) {
        child.kill();
    }
    console.log('COMPILED');
    var serverScriptPath = stats.compilation.assets['server.bundle.js'].existsAt;
    var serverScript = mfs.readFileSync(serverScriptPath);
    var vmPath = path.resolve(devDir, 'node_modules/webpack-fullstack/dist/vm.js');
    var serverEntryPath = path.resolve(devDir, 'src/server.ts');
    child = childProcess.spawn('node', [
        vmPath,
        serverScript,
        serverEntryPath
    ]);
    child.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    child.stderr.on('data', function (data) {
        console.log(data.toString());
    });
    child.on('exit', function (code) {
        console.log("Child exited with code " + code);
    });
});


/***/ })
/******/ ]);