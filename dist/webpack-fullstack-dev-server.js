#!/usr/bin/env node
require("source-map-support").install();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="./index.d.ts" />

exports.__esModule = true;
var path = __webpack_require__(0);
var process_config_1 = __webpack_require__(4);
var userDir = path.resolve(process.cwd());
exports.userDir = userDir;
var userConfigPath = path.join(userDir, 'webpack.fullstack.js');
exports.userConfigPath = userConfigPath;
var userConfig = require(userConfigPath);
exports.userConfig = userConfig;
var processedConfig = process_config_1["default"](userConfig, userDir);
exports.processedConfig = processedConfig;
var opts = {
    outputClient: process.argv[2] === '--output-client' ? true : false
};
exports.opts = opts;


/***/ }),
/* 4 */
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
var fs = __webpack_require__(2);
var path = __webpack_require__(0);
var webpack = __webpack_require__(1);
var serverDefaults = {
    target: 'node',
    node: {
        __dirname: true
    },
    externals: {},
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: true
        })
    ]
};
var clientDefaults = {};
function processConfig(config, devDir) {
    fs.readdirSync(path.resolve(devDir, 'node_modules'))
        .filter(function (x) { return ['.bin'].indexOf(x) === -1; })
        .forEach(function (m) { return serverDefaults.externals[m] = 'commonjs ' + m; });
    serverDefaults.externals['react-dom/server'] = 'commonjs react-dom/server';
    serverDefaults.externals['history/createBrowserHistory'] = 'commonjs history/createBrowserHistory';
    for (var key in config) {
        if (key === 'server') {
            config.server = __assign({}, serverDefaults, config.server, { devtool: 'source-map' });
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("memory-fs");

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var path = __webpack_require__(0);
var fs = __webpack_require__(2);
var webpack = __webpack_require__(1);
var MemoryFS = __webpack_require__(6);
var childProcess = __webpack_require__(5);
var index_1 = __webpack_require__(3);
if (index_1.opts.outputClient) {
    fs.writeFile(path.resolve(index_1.userDir, 'node_modules/webpack-fullstack/dist/webpack.client.config.js'), "\n      // encode regex values as strings\n      const configAsString = '" + JSON.stringify(index_1.processedConfig.client, function (key, val) {
        return val instanceof RegExp ? '_PxEgEr_' + val.toString().slice(2) : val;
    }) + "';\n\n      // decode strings into regex values\n      module.exports = JSON.parse(configAsString, (key, val) =>\n        typeof val === 'string' && val.substring(0, 8) === '_PxEgEr_' ? new RegExp( '" + (_a = ["\\"], _a.raw = ["\\\\"], String.raw(_a)) + "' + val.slice(8, -1)) : val);\n    ", function () { return console.log('webpack client config created.'); });
}
var serverCompiler = webpack(index_1.processedConfig.server);
var mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;
var serverProcess;
console.log('webpack server is compiling and watching for changes...');
serverCompiler.watch({}, function startAppServer(err, stats) {
    if (err) {
        console.log('webpack server failed.');
        return console.log(err);
    }
    console.log('webpack server compiled succesfully.');
    if (serverProcess) {
        serverProcess.kill();
    }
    var serverScriptPath = stats.compilation.assets['server.bundle.js'].existsAt;
    var serverScript = mfs.readFileSync(serverScriptPath);
    var vmPath = path.resolve(index_1.userDir, 'node_modules/webpack-fullstack/dist/vm.js');
    var serverEntryPath = path.resolve(index_1.userDir, 'src/server.ts');
    serverProcess = childProcess.spawn('node', [
        vmPath,
        serverScript,
        serverEntryPath
    ]);
    serverProcess.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    serverProcess.stderr.on('data', function (data) {
        console.log(data.toString());
    });
    serverProcess.on('exit', function (code) {
        console.log("Child exited with code " + code);
    });
});
var _a;


/***/ })
/******/ ]);
//# sourceMappingURL=webpack-fullstack-dev-server.js.map