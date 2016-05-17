/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var path = require('path');
var fs = require('fs');
var os = require('os');
var spawnSync = require('spawn-sync');
var https = require('follow-redirects').https;
var unzip = require('unzip2');

var VERSION = '0.25.0';
var BASE = 'https://github.com/facebook/flow/releases/download/v' + VERSION + '/';
var DEST = path.join(__dirname, '..', 'vendor');
var downloadPaths = {
	linux: BASE + 'flow-linux64-v' + VERSION + '.zip',
	darwin: BASE + 'flow-osx-v' + VERSION + '.zip'
};

// Exports
var bin = module.exports.path = path.join(DEST, 'flow');
var runSync = module.exports.runSync = function (args) {
	return spawnSync(bin, args, {stdio: 'pipe'});
};
module.exports.run = function (args, cb) {
	var cp = runSync(args);
	if (cp.error) {
		return cb(cp.error);
	} else if (cp.status !== 0) {
		return cb(new Error('Nonzero status: ' + cp.status + ' (' + cp.stdout + ')'));
	}
	cb(null, cp);
};
module.exports.VERSION = VERSION;

function install(cb) {
	var osType = os.type().toLowerCase();
	var downloadPath = downloadPaths[osType];
	if (!downloadPath || (osType === 'linux' && os.arch() !== 'x64')) {
		throw new Error('Unsupported OS: ' + osType + '. Supported OSs are ' + Object.keys(downloadPaths) + '.');
	}

	try {
		fs.mkdirSync(DEST);
	} catch (e) {
		if (e.code !== 'EEXIST') {
			return cb(e);
		}
	}
	var request = https.get(downloadPath, function (response) {
		response
		.pipe(unzip.Parse()) // eslint-disable-line new-cap
		.on('entry', function (entry) {
			if (entry.type === 'File') {
				entry.pipe(fs.createWriteStream(path.join(DEST, path.basename(entry.path))));
			}
		})
		.on('close', function () {
			// Chmod so it's runnable.
			fs.chmodSync(path.join(DEST, 'flow'), 755);
			cb();
		});
	});

	request.on('error', function (err) {
		var installErr = new Error('Error receiving flow from ' + downloadPath + ': ' + err);
		cb(installErr);
	});
}

// Returns true iff flow is installed and the correct version.
function isInstalled() {
	var exists = fs.existsSync(path.join(DEST, 'flow'));
	return exists && doesVersionMatch();
}

function doesVersionMatch() {
	var cp = runSync(['version']);
	return cp.stdout.toString().trim().slice(-VERSION.length) === VERSION;
}

module.exports.install = function maybeInstall(cb) {
	if (isInstalled()) {
		console.log('✔ Flow already installed, skipping download.');
		cb();
	} else {
		console.log('ℹ Installing Flow binary...');
		install(cb);
	}
};
