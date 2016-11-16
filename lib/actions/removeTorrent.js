const uTorrent = require('library-utorrent');

module.exports = function (credentials, hash, removedata, cb) {
  var input = credentials;
  input.hash = hash;
  if (removedata) input.removedata = true;
  else input.removedata = false;
  uTorrent.removeTorrent(input).exec({
    error: function (err){
      return cb(err)
    },
    success: function (output){
      if (output && output.error) return cb({message: output.error})
      return cb(null, output);
    }
	})
}
