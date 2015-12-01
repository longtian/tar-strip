/**
 * Created by yan on 15-12-1.
 */

var inherits = require('util').inherits;
var tar = require('tar-stream');
var Pack = tar.pack;

var stripName = function (str, stripLevel) {
  return str.split('/').slice(stripLevel).join('/')
}

inherits(StripPack, Pack);

function StripPack(options) {
  var stripLevel = 1;

  if (options) {
    stripLevel = parseInt(options.strip, 10);
  }

  Pack.call(this, options);
  var self = this;

  var extract = this.extract = tar.extract();

  extract.on('entry', function (header, stream, callback) {
    var originalName = header.name;
    header.name = stripName(originalName, stripLevel);

    //console.log('strip:%d %s => %s', stripLevel, originalName, header.name);

    stream.pipe(self.entry(header, callback));
  });

}

StripPack.prototype.write = function (buffer) {
  this.extract.write(buffer);
}

StripPack.prototype.end = function (buffer) {
  this.finalize();
}

module.exports = StripPack;