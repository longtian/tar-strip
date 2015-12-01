/**
 * Created by yan on 15-12-1.
 */
var StripPack = require('./StripPack.js');
module.exports.createStripPack = function (options) {
  return new StripPack(options);
}