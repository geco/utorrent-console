const uTorrent = require('library-utorrent');
const listTorrents = require('./list')
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
  bottomBar.setContent('l: list torrents    q: quit{/right}')
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
  screen.render();

  setInterval(function() {
    topBar.setContent((new Date()).toString());
    screen.render();
  }, 1000);

  const listAction = function(credentials) {
    listTorrents(credentials, (err, torrents) => {
      listView(err, torrents, topBar, screen)
    })
  }

  screen.key(['l'], function(ch, key) {
    listAction(credentials)
  });

  // startup action
  listAction(credentials)

}
