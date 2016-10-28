const uTorrent = require('library-utorrent');
const listTorrents = require('./list')
const blessed = require('blessed');
const contrib = require('blessed-contrib');


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

  screen.key(['l'], function(ch, key) {
    listTorrents(credentials, (err, torrents) => {
      if (err) {topBar.setContent(err.message || err); screen.render(); return;}
      if (torrents.length === 0) return;
      const table = contrib.table(
       { keys: true
       , fg: 'white'
       , selectedFg: 'white'
       , selectedBg: 'blue'
       , interactive: true
       , label: 'Torrent list',
       top: 1,
       left: 0,
       width: '100%',
       height: '100%-2'
       , border: {type: "line", fg: "cyan"}
       , columnSpacing: 1 //in chars
       , columnWidth: [2, 20, 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] /*in chars*/
      })
       var headers = [];
       Object.keys(torrents[0].parsed).forEach(function(key) {
         if (headers.length < 20) headers.push(key);
       });
       var data = []
       for (var i=0; i<torrents.length; i++) {
         data.push([])
         for (var j=0; j<headers.length; j++) {
           data[data.length-1].push(torrents[i].parsed[headers[j]])
         }
       }
       //bottomBar.setContent(JSON.stringify(data))
       table.setData({
         headers: headers,
         data: data
       })

       //allow control the table with the keyboard
       table.focus()
       screen.append(table)
     });
  });

}
