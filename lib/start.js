const credentialsHandler = require('./credentials')
const manager = require('./manager')

module.exports = function () {
  credentialsHandler.load((result) => {
    if (result) { // we already have credentials stored
      manager(result)
    } else { // we need to ask for credentials
      var inquirer = require('inquirer')
      inquirer.prompt([
        {
          type: 'input',
          name: 'host',
          message: 'Enter your utorrent web host',
          default: function() {return 'localhost';}
        },  {
          type: 'input',
          name: 'port',
          message: 'Enter your utorrent web gui port',
          default: function() {return 8080;}
        },  {
          type: 'input',
          name: 'username',
          message: 'Enter your utorrent web gui username',
          default: function() {return 'admin';}
        },  {
          type: 'password',
          message: 'Enter your utorrent web gui password',
          name: 'password',
          default: function() {return '';}
        }
      ]).then((answers) => {

        // cleanup inquirer input handling
        inquirer = null;
        [process.stdin, process.stdout, process.stderr].every(s => s.removeAllListeners());

        // launch the main manager
        manager({
          host: answers.host,
          port: answers.port,
          password: answers.password,
          username: answers.username
        })
      });

    }

  })

}
