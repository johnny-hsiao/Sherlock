'use strict';

var callstack = require('./index');

describe('callstack()', function () {
  it('should return array', function () {
    var stack = callstack();
    stack.should.be.instanceOf(Array);
  });

  it('should return stack stace beginning at current function', function () {
    function hello () {
      var stack = callstack();
      stack[0].should.include('hello');
    }
    hello();
  });

  it('should contain function names and filepaths', function () {
    function hello1 () {
      hello2();
    }

    function hello2 () {
      var stack = callstack();
      stack[0].should.include('hello2');
      stack[0].should.include('test.js');
      stack[1].should.include('hello1');
      stack[1].should.include('test.js');
    }

    hello1();
  });
});
