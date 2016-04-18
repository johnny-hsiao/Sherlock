# node-callstack
*The simplest possible callstack fetcher.*

[![Build Status](https://travis-ci.org/nailgun/node-callstack.png?branch=master)](https://travis-ci.org/nailgun/node-callstack)

```npm install callstack```

## Usage

```js
var callstack = require('callstack');

function hello () {
  console.log(callstack());
}

hello();
```

Produces output:

```
[ '    at hello (/Users/nailgun/workspace/callstack/example.js:4:15)',
  '    at Object.<anonymous> (/Users/nailgun/workspace/callstack/example.js:7:1)',
  '    at Module._compile (module.js:449:26)',
  '    at Object.Module._extensions..js (module.js:467:10)',
  '    at Module.load (module.js:356:32)',
  '    at Function.Module._load (module.js:312:12)',
  '    at Module.runMain (module.js:492:10)',
  '    at process.startup.processNextTick.process._tickCallback (node.js:245:9)' ]
```
