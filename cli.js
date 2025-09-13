#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
var spawn = require('child_process').spawn;

var input = process.argv.slice(2);
var bin = require('./');

if (bin !== null) {
  var child = spawn(bin, input, {stdio: 'inherit'})
    .on('exit', process.exit);
  process.on('SIGTERM', function() {
    child.kill();
  });
} else {
  throw new Error('Platform not supported.');
}
