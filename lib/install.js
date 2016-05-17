/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var bin = require('./');

bin.run(['--version'], function (err) {
	if (err) {
		console.error(err.message);
		console.error('✖ Flow binary test failed!');
		return;
	}

	console.log('✔ Flow binary test passed successfully.');
});
