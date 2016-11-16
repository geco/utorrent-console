const uTorrent = require('library-utorrent');
const request = require('request');

module.exports = function (credentials, torrentUrl, cb) {
  var input = credentials;
  request({'uri': torrentUrl, 'encoding': null}, function (error, response, torrentFileBuffer) {
    if (error) return cb(error)
    if (!torrentFileBuffer) return cb('Url not found')
    input.torrentContents = torrentFileBuffer;
    uTorrent.addTorrent(input).exec({
      error: function (err){
        return cb(err)
      },
      success: function (output){
        if (output && output.error) return cb({message: output.error})
        return cb(null, output);
      }
    })
  });

}
