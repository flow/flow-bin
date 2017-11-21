#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fs = require('fs');

// osx
process.platform = 'darwin';
delete require.cache[require.resolve('./')];
fs.statSync(require('./'));

// linux
process.platform = 'linux';
process.arch = 'x64'
delete require.cache[require.resolve('./')];
fs.statSync(require('./'));

// windows
process.platform = 'win32';
process.arch = 'x64'
delete require.cache[require.resolve('./')];
fs.statSync(require('./'));
