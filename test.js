'use strict';
var test = require('ava');
var binCheck = require('bin-check');
var flow = require('./');

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(flow, ['--version'], function (err, stdout) {
		t.assert(!err, err);
		t.assert(stdout);
	});
});
