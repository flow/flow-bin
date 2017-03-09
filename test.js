#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
var fs = require('fs');

// linux
process.platform = 'linux';
process.arch = 'x64'
delete require.cache[require.resolve('./')];
fs.statSync(require('./'));
