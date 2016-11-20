const uTorrent = require('library-utorrent');

module.exports = function (credentials, magnet, cb) {
  var input = credentials;
  var shrinked = '';
  const limit = 950;
  if (magnet.length < limit) shrinked = magnet; else {
    var initialLength = magnet.length;
    var actualLength = initialLength;
    var splitted = magnet.split('&');
    for (var i=splitted.length-1; i>0; i--) {
      if (actualLength - splitted[i].length < limit) break;
      actualLength -= splitted[i].length;
    }
    for (var j = 0; j<i; j++) {
      if (j > 0) shrinked = shrinked + '&';
      shrinked = shrinked + splitted[j];
    }
  }
  input.torrentUrl = shrinked;
  uTorrent.addTorrentUrl(input).exec({
    error: function (err){
      return cb(err)
    },
    success: function (output){
      if (output && output.error) return cb({message: output.error})
      return cb(null, output);
    }
  })

}
