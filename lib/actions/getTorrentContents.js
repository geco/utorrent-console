const uTorrent = require('library-utorrent');

module.exports = function (credentials, hash, cb) {
  var input = credentials;
  input.hash = hash;
  uTorrent.getTorrentDetails(input).exec({
    error: function (err){
      return cb(err)
    },
    success: function (torrents){
      return cb(null, torrents);
    },
	});

}
