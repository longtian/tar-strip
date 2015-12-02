/**
 * Created by yan on 15-12-1.
 */

var inherits = require('util').inherits;
var tar = require('tar-stream');
var Stream = require('stream');

/**
 * strip leading components in filename
 *
 * @param str
 * @param stripLevel
 * @returns {string}
 */
var stripName = function (str, stripLevel) {
  return str.split('/').slice(stripLevel).join('/');
};


// inheriance
inherits(StripPack, Stream.Transform);

function StripPack(options) {

  Stream.Transform.call(this);

  var stripLevel = 1;

  if (options) {
    stripLevel = parseInt(options.strip, 10);
  }

  var extract = this.extract = tar.extract();
  var pack = this.pack = tar.pack();

  var self = this;

  extract.on('entry', function (header, stream, done) {
    var originalName = header.name;
    header.name = stripName(originalName, stripLevel);
    stream.pipe(pack.entry(header, done));
  });

  extract.on('finish', function () {
    pack.finalize();
  });

  pack.on('data', function (buf) {
    self.push(buf);
  });

  pack.on('end', function () {
    self.push(null);
  });

}

StripPack.prototype._transform = function (buffer, enc, next) {
  this.extract.write(buffer);
  // @todo speed control
  next();
};

StripPack.prototype.end = function () {
  this.extract.end();
};

module.exports = StripPack;