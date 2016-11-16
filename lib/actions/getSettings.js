const uTorrent = require('library-utorrent');

module.exports = function (credentials, cb) {
  uTorrent.getSettings(credentials).exec({
    error: function (err){
      //console.error(err.message || err);
      return cb(err)
    },
    success: function (settings){
      return cb(null, settings);
    },
	});

}
