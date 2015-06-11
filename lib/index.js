'use strict';
var path = require('path');
var BinWrapper = require('bin-wrapper');

var VERSION = '0.12.0';
var BASE = 'https://github.com/facebook/flow/releases/download/v' + VERSION + '/';

module.exports = new BinWrapper()
	.src(BASE + 'flow-osx-v' + VERSION + '.zip', 'darwin')
	.src(BASE + 'flow-linux64-v' + VERSION + '.zip', 'linux', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use('flow');
