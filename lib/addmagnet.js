const uTorrent = require('library-utorrent');

module.exports = function (credentials, magnet, cb) {
  var input = credentials;
  input.torrentUrl = magnet;
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
