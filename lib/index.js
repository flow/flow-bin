/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var path = require('path');
var BinWrapper = require('bin-wrapper');

var VERSION = '0.29.0';
var BASE = 'https://github.com/facebook/flow/releases/download/v' + VERSION + '/';

module.exports = new BinWrapper()
	.src(BASE + 'flow-osx-v' + VERSION + '.zip', 'darwin')
	.src(BASE + 'flow-linux64-v' + VERSION + '.zip', 'linux', 'x64')
	.src('http://www.ocamlpro.com/pub/ocpwin/flow-builds/archives/flow-0.19.1-windows-20151211.zip', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'flow.exe' : 'flow');
