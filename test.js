/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import test from 'ava';
import binCheck from 'bin-check';
import flow from './';

test('returns path to binary and verify that it is working', async t => {
	t.true(await binCheck(flow, ['--version']));
});
