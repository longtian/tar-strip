# tar-strip
[![](https://img.shields.io/npm/v/tar-strip.svg)](https://www.npmjs.com/package/tar-strip)
![](https://img.shields.io/npm/dm/tar-strip.svg)
[![](https://img.shields.io/npm/l/tar-strip.svg)](https://raw.githubusercontent.com/wyvernnot/tar-strip/master/LICENSE)
[![](https://npm.taobao.org/badge/v/tar-strip.svg)](http://npm.taobao.org/package/tar-strip)

> Most tar package you download from github or gitlab will contain a root folder you may not want, this module will help you extract it out just like the `tar` command's `strip-components` option.

## Usage

```js
var rs = getReadStream();
var ws = getWriteStream();
var stripPack = require('../').createStripPack();

getReadStream()
  .pipe(stripPack)
  .pipe(getWriteStream())
```  

## Tar package structure

Before:

```
master/index.js
master/package.json
master/README.md
```

After:

```
index.js
package.json
README.md
```

## LICENSE

MIT