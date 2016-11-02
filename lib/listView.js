const contrib = require('blessed-contrib');

module.exports = function (err, torrents, topBar, screen) {
  if (err) {topBar.setContent(err.message || err); screen.render(); return;}
  if (torrents.length === 0) return;
  const columnWidth = [45, 15,20, 10, 15];  /*in chars*/
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
   , columnSpacing: 5 //in chars
   , columnWidth:  columnWidth
  })
   var headers = [];
   headers.push('name', 'size', 'percentProgressMils','etaSec', 'status');
  //  Object.keys(torrents[0].parsed).forEach(function(key) {
  //    if (headers.length < 20) headers.push(key);
  //  });
   var data = []
   for (var i=0; i<torrents.length; i++) {
     data.push([])
     for (var j=0; j<headers.length; j++) {
       data[data.length-1].push((torrents[i].parsed[headers[j]]+'').substring(0, columnWidth[j]-2))
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

}
