const listTorrents = require('./listFetch')
const getSettings = require('./settingsFetch')
const listView = require('./listView')
const settingsView = require('./settingsView')
const topbarView = require('./topbarView')
const bottombarView = require('./bottombarView')
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

  var movedCb = function(hashes) {
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
      table = listView(err, torrents, topBar, screen, table, movedCb)
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
