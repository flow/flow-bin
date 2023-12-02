# flow-bin

> Binary wrapper for [Flow](https://flow.org) - A static type checker for JavaScript

macOS (x64), Linux (x64, arm64) and Windows (x64) binaries are currently [provided](https://flow.org/en/docs/install/).

Flow is a project that allows users to find errors in their code as they code. The typical debugging routine involves debugging after writing a piece of code, which could make it more difficult to identify which line of code is causing a problem. With Flow, you can identify bugs as you code, meaning that you know which line has the error right away, saving lots of time. Flow-Bin is a binary wrapper for Flow, which means that you can access fFlow in local dependencies, without having to change the original source code. 



## CLI

For Yarn:

```
$ yarn add --dev flow-bin
$ yarn run flow --help
```

For npm, add `{ "scripts": { "flow": "flow" } }` in package.json and run:

```
$ npm install --save-dev flow-bin
$ npm run flow --help
```


## API

```
$ npm install --save flow-bin
```

```js
const execFile = require('child_process').execFile;
const flow = require('flow-bin');

execFile(flow, ['check'], (err, stdout) => {
	console.log(stdout);
});
```


## License

flow-bin is MIT-licensed.


## Releases

### New Release

1. `make push VERSION=0.122.0` (use the same version as Flow)
2. Publish to npm: `make publish` (run `npm adduser` the first time to log in)

### Inspect a Release Before Publishing

```sh
npm pack
tar xf "flow-bin-$(node -p 'require("./package.json").version').tgz"
cd package
npm run verify
```
