const uTorrent = require('library-utorrent');

module.exports = function (credentials, cb) {
  uTorrent.listTorrents(credentials).exec({
    error: function (err){
      return cb(err)
    },
    success: function (torrents){
      return cb(null, torrents);
    },
	});

}
