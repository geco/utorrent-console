const uTorrent = require('library-utorrent');
const listTorrents = require('./listFetch')
const listView = require('./listView')
const blessed = require('blessed');


module.exports = function (credentials) {
  const screen = blessed.screen({
    smartCSR: true
  });
  screen.title = 'uTorrent console';
  screen.key(['q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  const topBar = blessed.box({
    top: '0',
    left: 0,
    width: '100%',
    height: 1,
    align: 'right',
    tags: true,
    style: {
      fg: 'white',
      bg: 'blue'
    }
  });
  const bottomBar = blessed.box({
    top: '100%-1',
    left: 0,
    width: '100%',
    height: 1,
    tags: true,
    style: {
      fg: 'white',
      bg: 'red'
    }
  });
  bottomBar.setContent('q: quit')
  const body = blessed.box({
    top: 1,
    left: 0,
    tags: true,
    width: '100%',
    height: '100%-2'
  })
  screen.append(bottomBar);
  screen.append(topBar);
  //screen.append(body);
  //screen.render();
  var oldtable = null;

  const listAction = function(credentials) {
    listTorrents(credentials, (err, torrents) => {
      oldtable = listView(err, torrents, topBar, screen, oldtable)
    })
  }

  listAction(credentials)
  setInterval(function() {
    listAction(credentials)
  }, 1000);


  /*screen.key(['l'], function(ch, key) {
    listAction(credentials)
  });*/


}
