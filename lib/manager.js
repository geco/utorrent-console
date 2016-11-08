const listTorrents = require('./listFetch')
const getSettings = require('./settingsFetch')
const startstopTorrents = require('./startstopTorrents')
const listView = require('./listView')
const settingsView = require('./settingsView')
const topbarView = require('./topbarView')
const bottombarView = require('./bottombarView')
const errorView = require('./errorView')
const blessed = require('blessed');


module.exports = function (credentials) {
  const screen = blessed.screen({
    smartCSR: true
  });
  screen.title = 'uTorrent console';
  screen.key(['q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  const topBar = topbarView(screen)
  const bottomBar = bottombarView(screen)

  var table = null;
  var currentHash = '';
  var hashes = [];

  var movedCb = function() {
    if (table && table.rows && Number.isInteger(table.rows.selected) && hashes.length > table.rows.selected) {
      if (currentHash != hashes[table.rows.selected]) {
        currentHash = hashes[table.rows.selected]
        topBar.setContent(table.rows.selected+' - '+currentHash);
        screen.render()
      }
    }
  }

  const listAction = function(credentials) {
    listTorrents(credentials, (err, torrents) => {
      var result = listView(err, torrents, topBar, screen, table, movedCb)
      table = result.table
      hashes = result.hashes
    })
  }
  const getsettingsAction = function(credentials) {
    getSettings(credentials, (err, settings) => {
      settingsView(err, settings, screen)
    })
  }
  const startstopAction = function(credentials, action, force) {
    var hash = hashes[table.rows.selected]
    startstopTorrents(credentials, action, hash, force, (err, torrents) => {
      if (err) return errorView(err, screen);
      listAction(credentials)
    })
  }

  listAction(credentials)
  setInterval(function() {
    listAction(credentials)
  }, 1000);


  screen.key(['s'], function(ch, key) {
    getsettingsAction(credentials)
  });
  screen.key(['p'], function(ch, key) {
    startstopAction(credentials, 'start', false)
  });
  screen.key(['f'], function(ch, key) {
    startstopAction(credentials, 'start', true)
  });
  screen.key(['o'], function(ch, key) {
    startstopAction(credentials, 'stop', false)
  });


}
