try {
  var colors = require('colors');
  var wordwrap = require('wordwrap');
} catch (e) {
  console.error([
    "terminal support in marked requires npm packages `colors` and `wordwrap`.",
    "it isn't in the package.json as a dependency because nobody really cares",
    "about markdown in the terminal apparently. Install them with",
    "`npm install colors wordwrap`."
  ].join('\n'));
}

var width = process.stdout.getWindowSize()[0];
width = Math.min(width, 100);
var wrap = wordwrap(3, width);
var indent = wordwrap(9, width);
var paragraph = wordwrap(6, width);

exports.inlineFmt = {
  escape: function (text) {
    return text;
  },

  autolink: function (href, text) {
    return text + ' (' + href + ')';
  },

  tag: function (text) {
    return text;
  },

  link: function (isImage, href, title, text) {
    return exports.inlinefmt.autolink(href, text);
  },

  strong: function (text) {
    return text.bold;
  },

  em: function (text) {
    return text.bold.underline;
  },

  code: function (text) {
    return text.grey;
  },

  br: function () {
    return '\n';
  },

  text: function (text) {
    return text;
  }
};

exports.fmt = {
  hr: function () { return '------------'; },

  heading: function (depth, text) {
    switch (depth) {
      case 1: return wrap(text.bold.blue.underline) + '\n\n';
      case 2: return wrap(text.bold.underline) + '\n\n';
      default: return wrap(text.bold) + '\n\n';
    }
  },

  code: function (lang, text) {
    text = text.split('\n').map(function (item) { return item.grey; }).join('\n');
    return indent(text).grey + '\n\n';
  },

  blockquote: function (body) {
    return indent(body).grey + '\n\n';
  },

  list: function (type, body) {
    return body + '\n\n';
  }, 

  listItem: function (body) {
    return indent(body).replace('         ', '       * ') + '\n';
  },

  paragraph: function (body) {
    return paragraph(body.replace(/\n/g, ' ')) + '\n\n';
  }
};
