# @36node/32960

[![NPM version](https://img.shields.io/npm/v/@36node/32960.svg?style=flat)](https://npmjs.com/package/@36node/32960)
[![NPM downloads](https://img.shields.io/npm/dm/@36node/32960.svg?style=flat)](https://npmjs.com/package/@36node/32960)
[![CircleCI](https://circleci.com/gh/36node/@36node/32960/tree/master.svg?style=shield)](https://circleci.com/gh/36node/@36node/32960/tree/master)
[![codecov](https://codecov.io/gh/36node/@36node/32960/branch/master/graph/badge.svg)](https://codecov.io/gh/36node/@36node/32960)
[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/36node/donate)

## Usage

### use this @36node/32960 as a parser or builder

```js
import { Protocol } from "@36node/protocol-32960";

// buffer: origin data
const protocol = new Protocol({ encrypt: { key: "xx", iv: "xxx", method: "AES128" } });
const data = protocol.parse(buffer);
const buf = protocol.build(data);
```

### use as a default server

Provide a simple default server, which power the 100% standard 32960 protocol.

```js
import { server } from "@36node/protocol-32960";

server.listen(3000, () => console.log(`app started at port 3000`));
```

### use in cli

```sh
yarn global add @36node/protocol-32960
APP_PORT=3000 32960

## platform AUTH
APP_AUTH="yutong:222,wanxiang:455" APP_PORT=3000 32960
```

### use in whisper

whisper is a koa style tcp server, get more from [36node/whisper](https://github.com/36node/whisper)

please follow the code in `src/server.js`

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**@36node/32960** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/@36node/32960/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)
