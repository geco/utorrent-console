const contrib = require('blessed-contrib');
const numeral = require('numeral')

module.exports = function (err, torrents, topBar, screen, oldtable) {
  if (err) {topBar.setContent(err.message || err); screen.render(); return;}
  topBar.setContent((new Date()).toString());
  if (torrents.length === 0) return;
  const columnWidth = [3, 40, 7, 10, 10, 10, 20, 7, 10, 10, 10, 5];  /*in chars*/
  var table = {}
  if (!oldtable) table = contrib.table(
   { keys: true
   , fg: 'white'
   , selectedFg: 'white'
   , selectedBg: 'blue'
   , interactive: true
   , label: 'Torrent list',
   top: 1,
   left: 0,
   width: '100%',
   height: '50%-2'
   , border: {type: "line", fg: "cyan"}
   , columnSpacing: 2 //in chars
   , columnWidth:  columnWidth
  })
  else table = oldtable;
   var headers = [];
   headers.push('#','name', 'size', 'progress','etaSec', 'status', 'd/u/r total', 'ratio', 'd/u speed', 'peers', 'seeds', 'avail');
   var data = []
   for (var i=0; i<torrents.length; i++) {
     data.push([])
     let current = data[data.length-1];
     current.push((torrents[i].parsed['queueOrder']+'').substring(0, columnWidth[0]-1));
     current.push((torrents[i].parsed['name']).substring(0, columnWidth[1]-1));
     current.push(numeral((torrents[i].parsed['size'])).format('0.0b').substring(0, columnWidth[2]-1));
     current.push(numeral((torrents[i].parsed['percentProgressMils']/1000)).format('0.0%').substring(0, columnWidth[3]-1));
     current.push(numeral((torrents[i].parsed['etaSec'])).format('00:00:00').substring(0, columnWidth[4]-1));
     current.push((torrents[i].parsed['status']).substring(0, columnWidth[5]-1));
     current.push((numeral((torrents[i].parsed['downloadedBytes'])).format('0.0b')+'/'+numeral((torrents[i].parsed['uploadedBytes'])).format('0.0b')+'/'+numeral((torrents[i].parsed['remainingBytes'])).format('0.0b')).substring(0, columnWidth[6]-1));
     current.push(numeral((torrents[i].parsed['ratioMils']/1000)).format('0.00%').substring(0, columnWidth[7]-1));
     current.push((numeral((torrents[i].parsed['downloadspeedBytesSec'])).format('0b')+'/'+numeral((torrents[i].parsed['uploadspeedBytesSec'])).format('0b')).substring(0, columnWidth[8]-1));
     current.push((torrents[i].parsed['peersConnected'] + '/' +torrents[i].parsed['peersSwarm']).substring(0, columnWidth[9]-1));
     current.push((torrents[i].parsed['seedsConnected'] + '/' +torrents[i].parsed['seedsSwarm']).substring(0, columnWidth[10]-1));
     current.push((torrents[i].parsed['availability'] || 'na').substring(0, columnWidth[11]-1));
   }
   //bottomBar.setContent(JSON.stringify(data))
   table.setData({
     headers: headers,
     data: data
   })

   //allow control the table with the keyboard
   if (!oldtable) table.focus()
   if (!oldtable) screen.append(table)
   screen.render();
   return table;
}