/**
 * Created by yan on 15-12-1.
 */
var fs = require('fs');
var gunzip = require('zlib').createGunzip();
var gzip = require('zlib').createGzip();
var path = require('path');
var stripPack = require('../').createStripPack();

var rs = getReadStream();
var ws = getWriteStream();

getReadStream()
  .pipe(gunzip)
  .pipe(stripPack)
  .pipe(gzip)
  .pipe(getWriteStream())

function getReadStream() {
  return fs.createReadStream(path.join('before.tar.gz'))
}

function getWriteStream() {
  return fs.createWriteStream(path.join('after.tar.gz'));
}