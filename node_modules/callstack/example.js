var callstack = require('./index');

function hello () {
  console.log(callstack());
}

hello();
