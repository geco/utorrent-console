const uTorrent = require('library-utorrent');

module.exports = function (credentials, action, hash, force, cb) {
  var input = credentials;
  input.hash = hash;
  if (force) input.force = true;
  if (action == 'start') { uTorrent.startTorrent(input).exec({
    error: function (err){
      //console.error(err.message || err);
      return cb(err)
    },
    success: function (output){
      return cb(null, output);
    }
	}) } else { uTorrent.stopTorrent(input).exec({
    error: function (err){
      //console.error(err.message || err);
      return cb(err)
    },
    success: function (output){
      return cb(null, output);
    },
	})}

}
