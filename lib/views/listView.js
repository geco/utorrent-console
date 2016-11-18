const contrib = require('blessed-contrib');
const numeral = require('numeral')
const errorView = require('./errorView')


module.exports = function (err, torrents, topBar, screen, oldtable, movedCb, speedBar, settings) {
  if (err) {errorView(err, screen, true); return {table:{}, hashes:[]};}
  topBar.setContent((new Date()).toString());

  //if (torrents.length === 0) return {table:{}, hashes:[]};
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
   var hashes = []
   var totalDownSpeed = 0;
   var totalUpSpeed = 0;
   for (var i=0; i<torrents.length; i++) {
     hashes.push({hash: torrents[i].parsed['hash'], name: torrents[i].parsed['name'], all: torrents[i].parsed})
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
     current.push(((torrents[i].parsed['availability'] || 'na')+'').substring(0, columnWidth[11]-1));
     totalDownSpeed += torrents[i].parsed['downloadspeedBytesSec'];
     totalUpSpeed += torrents[i].parsed['uploadspeedBytesSec'];
   }
   table.setData({
     headers: headers,
     data: data
   })

   if (!oldtable) {
     table.focus()
     screen.append(table)
     // override contrib.table (which is a blessed list object) up and down method to get notified
     // cause listening on('select item') generates too much false positives
     var savedUp = table.rows.up;
     var savedDown = table.rows.down;
     table.rows.up = function(offset) {
       savedUp.call(table.rows, offset) // invoke original call binded to the right context
       movedCb();
     };
     table.rows.down = function(offset) {
       savedDown.call(table.rows, offset) // invoke original call binded to the right context
       movedCb();
     };
   }
   var uploadLimit = '';
   var downloadLimit = '';
   if (settings && settings.settings) {
     var dl = settings.settings.find(el => el[0] == 'max_dl_rate');
     if (dl && dl.length > 1) downloadLimit = '/'+dl[2]+'K';
     var ul = settings.settings.find(el => el[0] == 'max_ul_rate');
     if (ul && ul.length > 1) uploadLimit = '/'+ul[2]+'K';
   }
   speedBar.setContent('D: '+numeral(totalDownSpeed).format('0b')+downloadLimit+' - U: '+ numeral(totalUpSpeed).format('0b')+uploadLimit)
   screen.render();

   return {table: table, hashes: hashes};
}
