var fs = require('fs');
var assert = require('assert');
var path = require('path');
var marked = require('../').setOptions({terminal: true, gfm: true, cols: 76});

function gather () {
  var dir = path.join(__dirname, 'terminal');

  var files = fs
    .readdirSync(dir)
    .filter(function (file) { return path.extname(file) == '.markdown'; });

  return files.map(function (item) {
    var output = path.join(dir, item.replace('markdown', 'out'));
    return {
      markdown: fs.readFileSync(path.join(dir, item), 'utf8'),
      output: fs.readFileSync(output, 'utf8'),
      name: item
    };
  });
}

var test = exports.test = function test () {
  var tests = gather();
  tests.forEach(function (item) {
    try {
      assert.equal('\n' + marked(item.markdown), item.output);
    } catch (e) {
      console.log("terminal test " + item.name + " failed");
    }
  });
};

if (!module.main) {
  test();
}
