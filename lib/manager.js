const listTorrents = require('./listFetch')
const getSettings = require('./settingsFetch')
const listView = require('./listView')
const settingsView = require('./settingsView')
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
  bottomBar.setContent('s: settings    q: quit')
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
  const getsettingsAction = function(credentials) {
    getSettings(credentials, (err, settings) => {
      settingsView(err, settings, screen)
    })
  }

  listAction(credentials)
  setInterval(function() {
    listAction(credentials)
  }, 1000);


  screen.key(['s'], function(ch, key) {
    getsettingsAction(credentials)
  });


}
