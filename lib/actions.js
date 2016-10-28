const uTorrent = require('library-utorrent');
const inquirer = require('inquirer')
const listTorrents = require('./list')

module.exports = function (credentials) {

  actionLoop({credentials: credentials})

}

function actionLoop(state) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose action',
      choices: [
        'List torrents',
        'Exit'
      ]
    }
  ]).then((answer) => {
    switch(answer.action) {
      case 'List torrents': listTorrents(state.credentials); break;
      case 'Exit': console.log('Bye'); process.exit(); break;
      default: console.log('No choice'); break;
    }
    actionLoop(state)
  });

}
