# flow-bin [![Build Status](https://travis-ci.org/sindresorhus/flow-bin.svg?branch=master)](https://travis-ci.org/sindresorhus/flow-bin)

> Binary wrapper for [Flow](http://flowtype.org) - a static type checker for JavaScript

Only OS X and Linux (64-bit) binaries are currently [provided](http://flowtype.org/docs/getting-started.html#_).


## CLI

```sh
$ npm install --global flow-bin
```

```sh
$ flow --help
```


## API

```sh
$ npm install --save flow-bin
```

```js
var execFile = require('child_process').execFile;
var flow = require('flow-bin');

execFile(flow, ['check'], function (err, stdout, stderr) {
	console.log(stdout);
});
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
