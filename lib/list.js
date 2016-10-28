const uTorrent = require('library-utorrent');

module.exports = function (credentials) {
  uTorrent.listTorrents(credentials).exec({
    error: function (err){
      console.error(err.message || err);
    },
    success: function (torrents){
      for (let i=0; i<torrents.length; i++) {
        console.log(i+')')
        console.log(JSON.stringify(torrents[i].parsed))
      }
    },
	});

}
