const contrib = require('blessed-contrib');
const errorView = require('./errorView')
const numeral = require('numeral')

module.exports = function (err, screen, fileTable, fileData, hash) {
  if (err) {errorView(err, screen, false); return {table: fileTable, hash: hash}}
  const columnWidth = [24, 8, 8, 2];  /*in chars*/
  var table = {}
  if (!fileTable) {
    table = contrib.table(
       {  fg: 'white',
       label: 'Torrent contents',
       top: '50%',
       left: '70%',
       width: '30%',
       height: '50%-1',
       selectedFg: 'white',
       selectedBg: 'black'
       , border: {type: "line", fg: "cyan"}
       , columnSpacing: 1 //in chars
       , columnWidth:  columnWidth
      })
      screen.append(table)
 } else {
   table = fileTable;
 }
 var headers = ['Name', 'Size', 'Done', 'P']
 var data = []
 if (fileData && fileData.files && fileData.files.length > 0) {
   for (var i=0; i<fileData.files[1].length; i++) {
     data.push([])
     let current = data[data.length-1];
     let currentInput = fileData.files[1][i];
     current.push((currentInput[0]).substring(0, columnWidth[0]-1));
     current.push(numeral((currentInput[1])).format('0.0b').substring(0, columnWidth[1]-1));
     current.push(numeral((currentInput[2])).format('0.0b').substring(0, columnWidth[2]-1));
     current.push((currentInput[3]));
   }
 }

 table.setData({
   headers: headers,
   data: data
 })
 screen.render();

 return {table: table, hash: hash}


}
