/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import path from 'path';
import test from 'ava';
import rimraf from 'rimraf';
import flow from './lib';

test.serial.cb('installs', t => {
	rimraf.sync(path.join(__dirname, 'vendor'));
	t.plan(1);
	flow.install(err => {
		t.true(!err);
		t.end();
	});
});

test('returns path to binary and verify that it is working', t => {
	const cp = flow.runSync(['version']);
	t.true(cp.error === undefined);
	t.true(cp.status === 0);
	const output = cp.stdout.toString().trim();
	t.true(output.slice(-flow.VERSION.length) === flow.VERSION);
});
