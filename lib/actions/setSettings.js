const uTorrent = require('library-utorrent');

module.exports = function (credentials, name, value, cb) {
  var input = credentials;
  input.name = name;
  input.value = value;
  uTorrent.setSettings(input).exec({
    error: function (err){
      return cb(err)
    },
    success: function (settings){
      return cb(null, settings);
    },
	});

}
