'use strict';
var log = require('logalot');
var bin = require('./');

bin.run(['--version'], function (err) {
	if (err) {
		log.error(err.message);
		log.error('flow binary test failed');
		return;
	}

	log.success('flow binary test passed successfully');
});
