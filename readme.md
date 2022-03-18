# flow-bin

> Binary wrapper for [Flow](https://flow.org) - A static type checker for JavaScript

macOS (x64), Linux (x64, arm64) and Windows (x64) binaries are currently [provided](https://flow.org/en/docs/install/).


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
