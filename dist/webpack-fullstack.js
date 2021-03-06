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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var webpack = __webpack_require__(1);
var index_1 = __webpack_require__(3);
webpack([index_1.processedConfig.client, index_1.processedConfig.server], function (err, stats) {
    if (err || stats.hasErrors()) {
        console.log(err || stats.hasErrors);
    }
    console.log(stats.toString());
});


/***/ })
/******/ ]);
//# sourceMappingURL=webpack-fullstack.js.map