'use strict';
var path = require('path');
var BinWrapper = require('bin-wrapper');

module.exports = new BinWrapper()
	.src('http://flowtype.org/downloads/flow-osx-latest.zip', 'darwin')
	.src('http://flowtype.org/downloads/flow-linux64-latest.zip', 'linux', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use('flow');
