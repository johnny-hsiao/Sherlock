var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: 'c6ee4fc2-ea8a-4d1f-b47c-987cf61b2da6',
  password: 'qgZq8Y77lVFu',
  version: 'v3-beta',
  version_date: '2016-02-11'
});

module.exports = tone_analyzer;