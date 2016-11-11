
// actions
const listTorrents = require('./listFetch')
const getSettings = require('./settingsFetch')
const startstopTorrents = require('./startstopTorrents')
const removeTorrent = require('./removeTorrent')
const addurl = require('./addurl')
const addmagnet = require('./addmagnet')

// views
const listView = require('./listView')
const settingsView = require('./settingsView')
const topbarView = require('./topbarView')
const bottombarView = require('./bottombarView')
const errorView = require('./errorView')
const infoView = require('./infoView')
const addurlView = require('./addurlView')
const confirmView = require('./confirmView')

// node modules
const blessed = require('blessed');

// main handler
module.exports = function (credentials) {

  // tmp
  /*var torrentUrl = 'http://releases.ubuntu.com/16.10/ubuntu-16.10-desktop-amd64.iso.torrent?_ga=1.196906479.298648904.1476106673';
  if (torrentUrl) addurl(credentials, torrentUrl, (err, result) => {
    if (err) return console.log(err)
  });

  return;*/
  // end tmp

  const screen = blessed.screen({
    smartCSR: true
  });
  screen.title = 'uTorrent console';
  screen.key(['q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  const topBar = topbarView(screen)
  const bottomBar1 = bottombarView(screen, 'left', '100%-2', '{bold}a{/bold}: add Torrent from Url  {bold}m{/bold}: add Magnet Link  {bold}s{/bold}: start  {bold}f{/bold}: force start  {bold}h{/bold}: stop  {bold}d{/bold}:delete torrent  {bold}shift+d{/bold}: delete torrent and data')
  const bottomBar2 = bottombarView(screen, 'right','100%-1','{bold}?{/bold}: settings  {bold}q{/bold}: quit')

  var table = null;
  var currentHash = '';
  var hashes = [];

  var movedCb = function() {
    if (table && table.rows && Number.isInteger(table.rows.selected) && hashes.length > table.rows.selected) {
      if (currentHash != hashes[table.rows.selected].hash) {
        currentHash = hashes[table.rows.selected].hash
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
    if (hashes.length == 0) return;
    var hash = hashes[table.rows.selected].hash
    startstopTorrents(credentials, action, hash, force, (err, result) => {
      if (err) return errorView(err, screen);
      infoView(result, screen)
      listAction(credentials)
    })
  }
  const removeAction = function(credentials, removedata) {
    if (hashes.length == 0) return;
    var hash = hashes[table.rows.selected].hash
    removeTorrent(credentials, hash, removedata, (err, result) => {
      if (err) return errorView(err, screen);
      infoView(result, screen)
      listAction(credentials)
    })
  }

  listAction(credentials)
  setInterval(function() {
    listAction(credentials)
  }, 1000);


  screen.key(['?'], function(ch, key) {
    getsettingsAction(credentials)
  });
  screen.key(['s'], function(ch, key) {
    startstopAction(credentials, 'start', false)
  });
  screen.key(['h'], function(ch, key) {
    screen.key(['f'], function(ch, key) {
      startstopAction(credentials, 'start', true)
    });
    startstopAction(credentials, 'stop', false)
  });
  screen.key(['a'], function(ch, key) {
    addurlView(screen, 'Torrent Url', (torrentUrl) => {
      table.focus();
      if (torrentUrl) addurl(credentials, torrentUrl, (err, result) => {
        if (err) return errorView(err, screen);
        infoView(result,screen)
        listAction(credentials)
      });
    })
  });
  screen.key(['m'], function(ch, key) {
    addurlView(screen, 'Magnet Link', (magnet) => {
      table.focus();
      if (magnet) addmagnet(credentials, magnet, (err, result) => {
        if (err) return errorView(err, screen);
        infoView(result,screen)
        listAction(credentials)
      });
    })
  });
  screen.key(['S-d', 'd'], function(ch, key) {
    if (hashes.length == 0) return;
    var hash = hashes[table.rows.selected].hash
    var name = hashes[table.rows.selected].name
    var message = 'Are you sure you want to delete torrent "'+ name +'"';
    if (key.shift) message+= ' and ALL DATA';
    message += '?';
    confirmView(screen, message, (confirmed) => {
      if (confirmed) removeAction(credentials, key.shift)
    })
  });
  screen.key(['escape'], function(ch, key) {
    table.focus();
  });


}
