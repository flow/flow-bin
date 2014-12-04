'use strict';
var log = require('logalot');
var bin = require('./');

bin.run(['--version'], function (err) {
	if (err) {
		log.warn(err.message);
		log.warn('flow binary test failed');
		return;
	}

	log.success('flow binary test passed successfully');
});
