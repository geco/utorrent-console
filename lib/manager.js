const credentialsHandler = require('./credentials')

// actions
const listTorrents = require('./actions/listTorrents')
const getSettings = require('./actions/getSettings')
const startstopTorrents = require('./actions/startstopTorrents')
const removeTorrent = require('./actions/removeTorrent')
const addurl = require('./actions/addurl')
const addmagnet = require('./actions/addmagnet')
const getTorrentContents = require('./actions/getTorrentContents')

// views
const listView = require('./views/listView')
const settingsView = require('./views/settingsView')
const topbarView = require('./views/topbarView')
const speedbarView = require('./views/speedbarView')
const bottombarView = require('./views/bottombarView')
const errorView = require('./views/errorView')
const addurlView = require('./views/addurlView')
const confirmView = require('./views/confirmView')
const chartView = require('./views/chartView')
const filesView = require('./views/filesView')


// node modules
const blessed = require('blessed');

// main handler
module.exports = function (credentials) {
  var table = null;
  var currentHash = '';
  var currentFilesHash = 'init';
  var hashes = [];
  var chartData = null;
  var chart = null;
  var fileTable = null;
  var credentialsSaved = false;
  var globalSettings = null;
  const screen = blessed.screen({
    smartCSR: true
  });
  screen.title = 'uTorrent console';
  screen.key(['q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  const topBar = topbarView(screen)
  const speedBar = speedbarView(screen)
  const bottomBar1 = bottombarView(screen, 'left', '100%-2', '{bold}a{/bold}: add Torrent from Url  {bold}m{/bold}: add Magnet Link  {bold}s{/bold}: start  {bold}f{/bold}: force start  {bold}h{/bold}: stop  {bold}d{/bold}:delete torrent  {bold}shift+d{/bold}: delete torrent and data')
  const bottomBar2 = bottombarView(screen, 'right','100%-1','{bold}shift+c{/bold}: delete credentials  {bold}?{/bold}: settings  {bold}q{/bold}: quit')

  /* actions wrappers */

  const movedAction = function() {
      if (table && table.rows && hashes.length && Number.isInteger(table.rows.selected) && hashes.length > table.rows.selected) {
        if (currentHash != hashes[table.rows.selected].hash) {
          currentHash = hashes[table.rows.selected].hash
          chartAction(true)
          filesAction()
      }
    }
  }

  const listAction = function(credentials) {
    listTorrents(credentials, (err, torrents) => {
      if ((!credentialsSaved) && (!err)) {
        credentialsSaved = true;
        credentialsHandler.save(credentials)
      }
      getSettings(credentials, (err, settings) => {
        globalSettings = null; // reset
        if (!err) globalSettings = settings;
        var result = listView(err, torrents, topBar, screen, table, movedAction, speedBar, globalSettings)
        table = result.table
        hashes = result.hashes
        chartAction(false)
        filesAction()
      });
    })
  }
  const getsettingsAction = function(credentials) {
    getSettings(credentials, (err, settings) => {
      settingsView(err, settings, screen, credentials, () => {
        table.focus()
      })
    })
  }
  const startstopAction = function(credentials, action, force) {
    if (hashes.length == 0) return;
    var hash = hashes[table.rows.selected].hash
    startstopTorrents(credentials, action, hash, force, (err, result) => {
      if (err) return errorView(err, screen);
      listAction(credentials)
    })
  }
  const removeAction = function(credentials, removedata) {
    if (hashes.length == 0) return;
    var hash = hashes[table.rows.selected].hash
    removeTorrent(credentials, hash, removedata, (err, result) => {
      if (err) return errorView(err, screen);
      listAction(credentials)
    })
  }
  const removeCredentialsAction = function() {
    credentialsHandler.remove()
  }

  const chartAction = function(refresh) {
      if (!credentialsSaved) return;
      var result = chartView(screen, chart, chartData, table, hashes, refresh)
      chart = result.chart
      chartData = result.chartData
      currentHash = result.currentHash
  }
  const filesAction = function() {
      if (!credentialsSaved) return;
      if (table && table.rows && hashes.length && Number.isInteger(table.rows.selected) && hashes.length > table.rows.selected) {
          var hash = hashes[table.rows.selected].hash
          getTorrentContents(credentials, hash, (err, files) => {
            var result = filesView(err, screen, fileTable, files, hash)
            fileTable = result.table
            currentFilesHash = result.hash
          })
      } else {
        if ((hashes.length == 0) && currentFilesHash != '') {
          var result = filesView(null, screen, fileTable, [], '')
          fileTable = result.table
          currentFilesHash = result.hash
        }
      }

  }

  /* main loop */

    listAction(credentials);
    setInterval(function() {
      listAction(credentials)
    }, 1000);

  /* keybindings */

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
        listAction(credentials)
      });
    })
  });
  screen.key(['m'], function(ch, key) {
    addurlView(screen, 'Magnet Link', (magnet) => {
      table.focus();
      if (magnet) addmagnet(credentials, magnet, (err, result) => {
        if (err) return errorView(err, screen);
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
  screen.key(['S-c'], function(ch, key) {
    var message = 'Are you sure you want to delete saved encrypted credentials?';
    confirmView(screen, message, (confirmed) => {
      table.focus();
      if (confirmed) removeCredentialsAction()
    })
  });
  screen.key(['escape'], function(ch, key) {
    table.focus();
  });

}
