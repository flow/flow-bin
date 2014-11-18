#!/usr/bin/env node
'use strict';
var spawn = require('child_process').spawn;
var input = process.argv.slice(2);
var bin = require('./');

spawn(bin, input, {stdio: 'inherit'})
	.on('exit', process.exit);
