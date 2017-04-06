/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

var VERSION = require('./package.json').version;

var path = require('path');
var fs = require('fs');

function isLibcMusl() {
  try {
    var contents = fs.readFileSync(process.execPath);

    // Buffer.indexOf was added in v1.5.0 so cast to string for old node
    // Delay contents.toStrings because it's expensive
    if (!contents.indexOf) {
      contents = contents.toString();
    }

    if (contents.indexOf('libc.musl-x86_64.so.1') !== -1) {
      return true;
    }
  } catch (err) { } // eslint-disable-line no-empty
  return false;
}

module.exports =
  process.platform === 'darwin'
    ? path.join(__dirname, 'flow-osx-v' + VERSION, 'flow') :
  process.platform === 'linux' && isLibcMusl() && process.arch === 'x64'
    ? path.join(__dirname, 'flow-linux64-musl-v' + VERSION, 'flow') :
  process.platform === 'linux' && process.arch === 'x64'
    ? path.join(__dirname, 'flow-linux64-v' + VERSION, 'flow') :
  process.platform === 'win32' &&  process.arch === 'x64'
    ? path.join(__dirname, 'flow-win64-v' + VERSION, 'flow.exe') :
  null;
