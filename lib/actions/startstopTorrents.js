const uTorrent = require('library-utorrent');

module.exports = function (credentials, action, hash, force, cb) {
  var input = credentials;
  input.hash = hash;
  if (force) input.force = true;
    else input.force = false;
  if (action == 'start') { uTorrent.startTorrent(input).exec({
    error: function (err){
      //console.error(err.message || err);
      return cb(err)
    },
    success: function (output){
      if (output && output.error) return cb({message: output.error})
      return cb(null, output);
    }
	}) } else { uTorrent.stopTorrent(input).exec({
    error: function (err){
      //console.error(err.message || err);
      return cb(err)
    },
    success: function (output){
      if (output && output.error) return cb({message: output.error})
      return cb(null, output);
    },
	})}

}
