'use strict';

var inquirer = require('inquirer');
var UTorrent = require('machinepack-utorrent');

inquirer.prompt([
  {
    type: 'input',
    name: 'user',
    message: 'Enter yout utorrent web gui username',
    default: function() {return 'admin';}
  },  {
    type: 'password',
    message: 'Enter your utorrent web gui password',
    name: 'password',
    default: function() {return '';}
  }
]).then(function (answers) {
 
	console.log('Listing torrents..');

	UTorrent.listTorrents({
		host: 'localhost',
		port: 8080,
		username: answers.user,
		password: answers.password,
	}).exec({
	 // An unexpected error occurred.
	 error: function (err){
	  console.error(err);
	 },
	 // OK.
	 success: function (torrents){
	  console.log(torrents);
	 },
	});

});
